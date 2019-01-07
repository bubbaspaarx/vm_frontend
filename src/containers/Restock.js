import React, { Component } from 'react'

import StockSnacks from './StockSnacks'
import SelectedSnacks from './SelectedSnacks'

export default class VendingMachine extends Component {
  state = {
    snacks: [],
    denominations: []
  }

  componentDidMount() {
    return fetch(`https://vm-cleo-backend.herokuapp.com/api/v1/machines/1/snacks/`)
      .then(resp => resp.json())
      .then(data => this.setState({snacks: data.data}))
      .then(fetch(`https://vm-cleo-backend.herokuapp.com/api/v1/machines/1/money`)
        .then(resp => resp.json())
        .then(data => this.setState({denominations: data.data})))
  }


  restockCash = (denom) => {
    const { denominations } = this.state
    denom.attributes.quantity = 100
    return fetch(`https://vm-cleo-backend.herokuapp.com/api/v1/machines/1/money/${denom.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(denom)
    })
    .then(resp => resp.json())
    .then(data => this.setState({
      denominations:
        [...this.state.denominations.filter(d => d.id !== data.data.id), data.data]
      })
    )
  }

  restockSnack = (snack) => {
    const { snacks } = this.state
    snack.attributes.quantity = 20
    console.log('restock me!!!', snack)
    return fetch(`https://vm-cleo-backend.herokuapp.com/api/v1/machines/1/snacks/${snack.id}/`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(snack)
    })
    .then(resp => resp.json())
    .then(data => this.setState({
      snacks:
        [...this.state.snacks.filter(s => s.id !== data.data.id), data.data]
      })
    )
  }

  render(){
    const { snacks, denominations } = this.state
    const { restockCash, restockSnack } = this
    return (
      <div className="vending-machine">
        <div className="price">
          <h1>Money</h1>
          {denominations.map(d =>
            <button key={d.id} onClick={() => restockCash(d)}>{d.attributes.denomination} - Stock: {d.attributes.quantity}</button>
          )}
        </div>
        <StockSnacks snacks={snacks} restockSnack={restockSnack}/>
      </div>
    )
  }
}
