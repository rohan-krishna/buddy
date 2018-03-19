import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import Writer from './Writer'

export default class Ledger extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        const notes = this.props.notes.map( note => 
            <li key={note.id}>
                <a href="">
                    {note.title}
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
                        {notes} 
                    </ul>
                </div>
            </div>
        )
    }
}
