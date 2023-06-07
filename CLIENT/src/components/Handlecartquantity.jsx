import { Badge } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'

const Handlecartquantity = () => {
    const quantity = useSelector(state => state.cart.quantity)
    console.log(quantity);
  return (
    <Badge badgeContent={quantity} color="primary">
    </Badge>
  )
}

export default Handlecartquantity