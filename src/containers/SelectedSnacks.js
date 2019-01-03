import React from 'react'

import SnackCard from '../components/SnackCard'

export default class SelectedSnacks extends React.Component {

  render() {
    const { snacks, removeSnack } = this.props
    return(
        <div className="ui segment inverted blue selected-snacks">
          <div className="ui five column grid">
            <div className="row ">
              {snacks.map(snack =>
                <div key={snack.attributes.name} className="snack-card">
                  <SnackCard snack={snack} removeSnack={removeSnack}/>
                  <button className="ui inverted basic button" onClick={() => removeSnack(snack)}>Deselect</button>
                </div>
                )
              }
            </div>
          </div>
        </div>
    )
  }
}
