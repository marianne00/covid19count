import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Header from './Header'
import Countries from './Countries'


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

class App extends Component {
  
  render() {
    return (
      <HashRouter basename="/">
        <Header/>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Countries} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default hot(module)(App);