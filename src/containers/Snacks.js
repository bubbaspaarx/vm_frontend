import React from 'react'

import SnackCard from '../components/SnackCard'

export default class Snacks extends React.Component {

render() {
  const { snacks, addSnack } = this.props
  return(
  <div className="ui four column grid snacks">
    <div className="row">
      {snacks.map(snack =>
        <div key={snack.id} className="snack-card">
          <SnackCard snack={snack} addSnack={addSnack}/>
          <button className="ui positive basic button" onClick={() => addSnack(snack)}>Select</button>
        </div>
        )
      }
    </div>
  </div>
  )}
}
