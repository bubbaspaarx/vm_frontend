import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route, NavLink
} from 'react-router-dom';
import './App.scss';

import VendingMachine from './containers/VendingMachine'
import Restock from './containers/Restock'

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li><NavLink to="/">Vending Machine</NavLink></li>
              <li><NavLink to="/restock">Restock Machine</NavLink></li>
            </ul>
          </nav>
          <Route path="/"exact component={VendingMachine}></Route>
          <Route path="/restock" component={Restock}></Route>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
