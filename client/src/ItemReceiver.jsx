import React from 'react'

const ItemReceiver = ({name, message}) => {
  return (
    <div className='receiver_div'>
        <h4>{name}</h4>
        <p>{message}</p>
    </div>
  )
}

export default ItemReceiver