import React from 'react'

const ItemSender = ({name, message}) => {
  return (
    <div className='sender_div'>
        <h4>{name}</h4>
        <p>{message}</p>
    </div>
  )
}

export default ItemSender