import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import Writer from './Writer'

export default class Ledger extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        const notebooks = this.props.notebooks.map( notebook => 
            <li key={notebook.id}>
                <a href="">
                    {notebook.title}
                </a>
            </li>
        )

        return (
            <div className="noteswrapper">
                <div className="notespanel">
                    <span className="noteslogo">
                        <h3>Notes</h3>
                        <img src={"/static/images/list.svg"} alt="" width="68" draggable="false" />
                    </span>
                    <ul>
                        {notebooks} 
                    </ul>
                </div>
            </div>
        )
    }
}
