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
            <Ledger notebooks={this.state.notebooks} />
        )
    }
}

render(<App />, document.querySelector('#reactApp'))


