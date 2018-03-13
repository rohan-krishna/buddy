import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { isKeyHotkey } from 'is-hotkey';


/**
 * Define Default Hotkey
 */

const DEFAULT_NODE = 'paragraph'

/**
 * Define Hotkey Matchers
 */

 const isBoldKey = isKeyHotkey('mod+b')
 const isItalicHotkey = isKeyHotkey('mod+i')
 const isUnderlinedHotkey = isKeyHotkey('mod+u')
 const isCodeHotkey = isKeyHotkey('mod+`')

const existingValue = JSON.parse(localStorage.getItem('content'))
// Create our initial value...
const initialValue = Value.fromJSON(existingValue) || Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: 'A line of text in a paragraph.',
                            },
                        ],
                    },
                ],
            },
        ],
    },
})

// const MarkHotkey = (options) => {
//     const { type, key } = options

//     // Return our "plugin" object, containing the `onKeyDown` handler.
//     return {
//         onKeyDown(event, change) {
//             // Check that the key pressed matches our `key` option.
//             if (event.ctrlKey && event.key == key) {
//                 // Prevent the default characters from being inserted.
//                 event.preventDefault()

//                 // Toggle the mark `type`.
//                 change.toggleMark(type)
//                 return true
//             }
        
//         },
//     }
// }

// const boldPlugin = MarkHotkey({
//     type: 'bold',
//     key: 'b',
// })

// const plugins = [boldPlugin]

export default class Writer extends Component {

    constructor(props) {
        super(props)
        this.state = { value : initialValue }
    }

    hasMark = type => {
        const { value } = this.state
        return value.activeMarks.some(mark => mark.type == type)
    }

    hasBlock = type => {
        const { value } = this.state
        return value.blocks.some(node => node.type == type)
    }

    onChange = ({ value }) => {

        // Check to see if the document has changed before saving.
        if (value.document != this.state.value.document) {
            const content = JSON.stringify(value.toJSON())
            localStorage.setItem('content', content)
            console.log(content)
        }

        this.setState({ value })

    }

    onKeyDown = (event, change) => {
        
        let mark

        if(isBoldKey(event)) {
            mark = 'bold'
        } else if(isItalicHotkey(event)) {
            mark = 'italic'
        } else if (isUnderlinedHotkey(event)) {
            mark = 'underlined'
        } else if (isCodeHotkey(event)) {
            mark = 'code'
        } else {
            return
        }


        event.preventDefault()
        change.toggleMark(mark)
        return true
    }

    onClickMark = (event, type) => {
        
        event.preventDefault()
        const { value } = this.state
        const change = value.change().toggleMark(type)
        this.onChange(change)

    }


    onClickBlock = (event, type) => {
        event.preventDefault()
        const { value } = this.state
        const change = value.change()
        const { document } = value

        // Handle everything but list buttons.
        if (type != 'bulleted-list' && type != 'numbered-list') {
            const isActive = this.hasBlock(type)
            const isList = this.hasBlock('list-item')

            if (isList) {
                change
                    .setBlocks(isActive ? DEFAULT_NODE : type)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            } else {
                change.setBlocks(isActive ? DEFAULT_NODE : type)
            }
        } else {
            // Handle the extra wrapping required for list buttons.
            const isList = this.hasBlock('list-item')
            const isType = value.blocks.some(block => {
                return !!document.getClosest(block.key, parent => parent.type == type)
            })

            if (isList && isType) {
                change
                    .setBlocks(DEFAULT_NODE)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            } else if (isList) {
                change
                    .unwrapBlock(
                    type == 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
                    )
                    .wrapBlock(type)
            } else {
                change.setBlocks('list-item').wrapBlock(type)
            }
        }

        this.onChange(change)
    }


    renderToolbar = () => {
        return (
            <div className="ui icon menu toolbar">
                {this.renderMarkButton('bold', 'bold')}
                {this.renderMarkButton('italic', 'italic')}
                {this.renderMarkButton('underlined', 'underline')}
                {this.renderMarkButton('code', 'code')}
                {this.renderBlockButton('heading-one', 'font')}
                {this.renderBlockButton('block-quote', 'quote left')}
                {this.renderBlockButton('numbered-list', 'ordered list')}
                {this.renderBlockButton('bulleted-list', 'unordered list')}
                <div className="ui dropdown item">
                    Notebook
                    <i className="dropdown icon"></i>
                    <div className="menu">
                        <a className="item">Electronics</a>
                        <a className="item">Automotive</a>
                        <a className="item">Home</a>
                    </div>
                </div>
            </div>
        )
    }

    renderMarkButton = (type, icon) => {
        const isActive = this.hasMark(type)
        const onMouseDown = event => this.onClickMark(event, type)

        return (
            // eslint-disable-next-line react/jsx-no-bind
            <a className="item" data-active={isActive} onMouseDown={onMouseDown}>
                <i className={'icon ' + icon}></i>
            </a>
        )
    }

    renderBlockButton = (type, icon) => {
        const isActive = this.hasBlock(type)
        const onMouseDown = event => this.onClickBlock(event, type)

        return (
            // eslint-disable-next-line react/jsx-no-bind
            <a className={"item"} data-active={isActive} onMouseDown={onMouseDown}>
                <i className={'icon ' + icon}></i>
            </a>
        )
    }

    renderEditor = () => {
        return (
            <div className="editor">
                <Editor
                    placeholder="Compose an Epic..."
                    value={this.state.value}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    renderNode={this.renderNode}
                    renderMark={this.renderMark}
                    spellCheck
                />
            </div>
        )
    }


    renderNode = props => {
        const { attributes, children, node } = props
        switch (node.type) {
            case 'block-quote':
                return <blockquote {...attributes}>{children}</blockquote>
            case 'bulleted-list':
                return <ul {...attributes}>{children}</ul>
            case 'heading-one':
                return <h1 {...attributes}>{children}</h1>
            case 'heading-two':
                return <h2 {...attributes}>{children}</h2>
            case 'list-item':
                return <li {...attributes}>{children}</li>
            case 'numbered-list':
                return <ol {...attributes}>{children}</ol>
        }
    }




    renderMark = props => {
        const { children, mark } = props
        switch (mark.type) {
            case 'bold':
                return <strong>{children}</strong>
            case 'code':
                return <code>{children}</code>
            case 'italic':
                return <em>{children}</em>
            case 'underlined':
                return <u>{children}</u>
        }
    }

    render() {
        return (
            <div>
                
                {this.renderToolbar()}

                <div className="editor-wrapper">
                    {this.renderEditor()}
                </div>
            </div>
        )
    }
}

