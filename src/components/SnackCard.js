import React from 'react'

export default (props) =>
  <>
    <img className="snack-image" src={props.snack.attributes.image} alt={props.snack.attributes.name}/>
    <h3>{props.snack.attributes.name}</h3>
    <div className="snack-details">
      <p>Price: £{Number((props.snack.attributes.price) / 100).toFixed(2)}</p>
      <p>Stock: {props.snack.attributes.quantity}</p>
    </div>
  </>
