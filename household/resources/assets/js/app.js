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
                    <span className="logo">
                        <h3>Führer Kumpel</h3>
                    </span>
                    <ul>
                        <li>
                            <a href="">Home</a>
                        </li>
                        <li>
                            <a href="">Notebooks</a>
                        </li>
                        <li>
                            <a href="">Notes</a>
                        </li>
                        <li>
                            <a href="">Profile</a>
                        </li>
                    </ul>
                </div>
                <Ledger notebooks={this.state.notebooks} />
            </div>
        )
    }
}

render(<App />, document.querySelector('#reactApp'))


