import React from "react";
const arr = [];
const CartContext = React.createContext({
    items: arr,
    totalAmount:0,
    addItem:(item)=>{},
    removeItem:(id)=>{},
    clearCart:()=>{}
})

export default CartContext;