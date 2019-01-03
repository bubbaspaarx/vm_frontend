import React, { Component } from 'react';
import './App.scss';

import VendingMachine from './containers/VendingMachine'

class App extends Component {
  render() {
    return (
      <div className="App">
        <VendingMachine />
      </div>
    );
  }
}

export default App;
