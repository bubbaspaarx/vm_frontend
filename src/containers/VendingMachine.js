import React, { Component } from 'react'

import Snacks from './Snacks'
import SelectedSnacks from './SelectedSnacks'

export default class VendingMachine extends Component {
  state = {
    snacks: [],
    selectedSnacks: [],
    denominations: [],
    insertedCoins: [],
    change: [],
    total: 0,
    paid: 0
  }

  componentDidMount() {
    return fetch(`https://vm-cleo-backend.herokuapp.com//api/v1/machines/1/snacks/`)
      .then(resp => resp.json())
      .then(data => this.setState({snacks: data.data}))
      .then(fetch(`https://vm-cleo-backend.herokuapp.com//api/v1/machines/1/money`)
        .then(resp => resp.json())
        .then(data => this.setState({denominations: data.data})))
  }

  addSnack = (snack) => {
    let {selectedSnacks, total, change} = this.state
    const newSnack = JSON.parse(JSON.stringify(snack))
    newSnack.keyNum = selectedSnacks.length
    console.log(newSnack.keyNum)
    change = []
    total = total + newSnack.attributes.price
    selectedSnacks = [...selectedSnacks, newSnack]
    this.setState({selectedSnacks, total, change }, () => console.log(this.state))
  }

  removeSnack = (snack) => {
    let {selectedSnacks, total} = this.state
    total = total -= snack.attributes.price
    selectedSnacks = selectedSnacks.filter(sSnack => sSnack.keyNum !== snack.keyNum)
    this.setState({selectedSnacks, total})
  }

  insertCash = (coin) => {
    let {paid, insertedCoins} = this.state
    paid = paid += coin.attributes.value
    insertedCoins = [...insertedCoins, coin]
    this.setState({paid, insertedCoins})
  }

  buySnacks = () => {
    let {selectedSnacks, insertedCoins, paid, total, denominations} = this.state
    fetch(`https://vm-cleo-backend.herokuapp.com//api/v1/machines/1`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        selectedSnacks,
        insertedCoins,
        paid,
        total
      })
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      const change = []
      for(const val in data.change){
        let coin = denominations.find(d => d.attributes.value === Number(val))
        coin = coin.attributes.denomination
        change.push({denomination: coin, value: data.change[val]})
      }
      const snacks = data.snacks.map(sn => {
        return {id: sn.id, attributes: {
          name: sn.name,
          image: sn.image,
          price: sn.price,
          quantity: sn.quantity
        }}
      })
      const selectedSnacks = []
      const paid = 0
      const total = 0
      this.setState({change, snacks, selectedSnacks, paid, total})
    })
  }

  // renderCoins = (change) =>{
  //   for(const coin in change){
  //     return <li>{coin}: x {change[coin]}</li>
  //   }
  // }

  render(){
    const { snacks, selectedSnacks, total, denominations, paid, change } = this.state
    const { addSnack, removeSnack, insertCash, buySnacks } = this
    return (
      <div className="vending-machine">
        <SelectedSnacks snacks={selectedSnacks} removeSnack={removeSnack}/>
        <div className="price">
          <h1>Total: £{Number(total / 100).toFixed(2)}</h1>
          <h1>Money Paid: £{Number(paid / 100).toFixed(2)}</h1>
          {paid < total || total === 0 ? denominations.map(d =>
            <button key={d.id} onClick={() => insertCash(d)}>{d.attributes.denomination}</button>
          ) : null}
        </div>
        {paid >= total && selectedSnacks.length > 0 ?
               <button className="ui primary button" onClick={() => buySnacks()}>Buy Snacks</button> : null}
        {selectedSnacks.length > 0 && paid < total ?
               <p>Please insert £{Number((total - paid) / 100).toFixed(2)} more</p> :
               <div>
                 <p>Change due £{Number((paid - total) / 100).toFixed(2)}</p>
                 <ul style={{ listStyleType: "none" }}>
                  {change ? change.map(coin => {
                     return <li key={coin.denomination}>{coin.denomination} x {coin.value}</li>
                  }) : null}
                 </ul>
               </div>
             }
        <Snacks snacks={snacks} addSnack={addSnack}/>
      </div>
    )
  }
}
