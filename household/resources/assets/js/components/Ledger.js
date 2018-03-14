import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'

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
            <div>
                <div className="notespanel">
                    <span className="noteslogo">
                        <h3>Notes</h3>
                    </span>
                    <ul>
                        {notebooks}
                        {notebooks}
                        {notebooks}
                        {notebooks}
                        {notebooks}
                        {notebooks}
                        {notebooks}
                        {notebooks}
                        {notebooks}
                        {notebooks}
                        {notebooks}
                        {notebooks}
                        {notebooks}
                        {notebooks}
                        {notebooks}
                        {notebooks}
                        {notebooks}
                        {notebooks}
                    </ul>
                </div>
            </div>
        )
    }
}
