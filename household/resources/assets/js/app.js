/*
 * Bootstrap required modules and imports.
*/

require('./bootstrap')


import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import Writer from './components/Writer';
import Ledger from './components/Ledger';


class App extends Component {

    state = {
        notebooks : [],
        notes: [],
        currentlySelectedNotebook: {},
        currentlySelectedNote: {}
    }

    componentDidMount() {
        axios.get( base_url + 'notebooks')
            .then( (res) => {
                this.setState({ notebooks : res.data })
                console.log(res.data)
            })
    }

    render() {
        return (
            <div className="app wrapper">
                <div className="app side navigation">
                    <ul>
                        <li>Home</li>
                        <li>Notebooks</li>
                        <li>Notes</li>
                        <li>Profile</li>
                    </ul>
                </div>
                <Ledger notebooks={this.state.notebooks} />
            </div>
        )
    }
}

render(<App />, document.querySelector('#reactApp'))


