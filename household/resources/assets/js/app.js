/*
 * Bootstrap required modules and imports.
*/

require('./bootstrap')

import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import Writer from './components/Writer';
import Ledger from './components/Ledger';
import axios from 'axios';


class App extends Component {

    state = {
        notes: [],
        notebooks: [],
        currentlySelectedNotebook: {},
        currentlySelectedNote: {}
    }

    componentDidMount() {
        axios.get( base_url + 'notes')
            .then( (res) => {
                this.setState({ notes : res.data })
                this.setState({ currentlySelectedNote : this.state.notes[0]})
            })
    }

    saveNote() {
        console.log("The parent component is now handling this!")
    }

    render() {
        return (
            <div className="app wrapper">
                
                <div className="app side navigation">
                    <span className="logo">
                        <h3>Reichstagung</h3>
                        <img src={"/static/images/reichstagung.svg"} alt="" width="128" draggable="false" />
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
                <Ledger notes={this.state.notes} />
                <Writer notes={this.state.notes} currentlySelectedNote={this.state.currentlySelectedNote} /> 
            </div>
        )
    }
}

render(<App />, document.querySelector('#reactApp'))


