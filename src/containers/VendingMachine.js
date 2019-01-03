import React, { Component } from 'react'

import Snacks from './Snacks'
import SelectedSnacks from './SelectedSnacks'

export default class VendingMachine extends Component {
  state = {
    snacks: [],
    selectedSnacks: [],
    denominations: [],
    insertedCoins: [],
    total: 0,
    paid: 0
  }

  componentDidMount() {
    return fetch(`http://localhost:3000/api/v1/machines/1/snacks/`)
      .then(resp => resp.json())
      .then(data => this.setState({snacks: data.data}))
      .then(fetch(`http://localhost:3000/api/v1/machines/1/money`)
        .then(resp => resp.json())
        .then(data => this.setState({denominations: data.data})))
  }

  addSnack = (snack) => {
    let {selectedSnacks, total} = this.state
    selectedSnacks = [...selectedSnacks, snack]
    total = total + snack.attributes.price
    this.setState({selectedSnacks, total }, () => console.log(this.state))
  }

  removeSnack = (snack) => {
    let {selectedSnacks, total} = this.state
    total = total -= snack.attributes.price
    selectedSnacks = selectedSnacks.filter(sSnack => sSnack !== snack)
    this.setState({selectedSnacks, total})
  }

  insertCash = (coin) => {
    let {paid, insertedCoins} = this.state
    paid = paid += coin.attributes.value
    insertedCoins = [...insertedCoins, coin]
    this.setState({paid, insertedCoins})
  }

  buySnacks = () => {
    let {selectedSnacks, denominations, paid, total} = this.state
    fetch(`http://localhost:3000/api/v1/machines/1/snacks/`)
  }

  render(){
    const { snacks, selectedSnacks, total, denominations, paid } = this.state
    const { addSnack, removeSnack, insertCash, buySnacks } = this
    return (
      <div className="vending-machine">
        <SelectedSnacks snacks={selectedSnacks} removeSnack={removeSnack}/>
        <div className="price">
          <h1>Total: £{Number(total / 100).toFixed(2)}</h1>
          <h1>Money Paid: £{Number(paid / 100).toFixed(2)}</h1>
          {denominations.map(d =>
            <button key={d.id} onClick={() => insertCash(d)}>{d.attributes.denomination}</button>
          )}
        </div>
        {paid >= total && selectedSnacks.length > 0 ?
               <button className="ui primary button" onClick={() => buySnacks()}>Buy Snacks</button> : null}
        {selectedSnacks.length > 0 && paid < total ?
               <p>Please insert £{Number((total - paid) / 100).toFixed(2)} more</p> : <p>Change due £{Number((paid - total) / 100).toFixed(2)}</p>}
        <Snacks snacks={snacks} addSnack={addSnack}/>
      </div>
    )
  }
}
