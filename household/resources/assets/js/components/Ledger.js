import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'

export default class Ledger extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        const notebooks = this.props.notebooks.map( notebook => 
            <li key={notebook.id}>{notebook.title}</li>
        )

        return (
            <div>
                <ul>
                    {notebooks}
                </ul>
            </div>
        )
    }
}
