import './Cart.css'
import React from 'react';
import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../store/CartContext';
import CartItem from './CartItem.js';
import CheckOut from './CheckOut';
const Cart = props=>{
    const cartCtx = useContext(CartContext)
    const [isSubmitting, setIsSubmitting]= useState(false)
    const [isCheckOut, setIsCheckOut] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)
    //chang into 2 desimal place 
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const cartHasItems = cartCtx.item.length > 0

    const cartItemRemoveHandler = id =>{
       cartCtx.removeItem(id)

    }

    const cartItemAddHandler = item =>{
        cartCtx.addItem({...item,amount:1})
        console.log(cartCtx)
    }

    const orderHandler =()=>{
        setIsCheckOut(true)

    }

    const submitOrderHandler = async (userData)=>{
        setIsSubmitting(true)
        await fetch('https://react-hook-1048d-default-rtdb.asia-southeast1.firebasedatabase.app/oder.json',{
            method:'POST',
            body: JSON.stringify({
                user:userData,
                orderItem : cartCtx.item
            })
            
        });
        setIsSubmitting(false)
        setDidSubmit(true)
        cartCtx.clearCart();
        
        
    }

    if(isSubmitting){
        return <section> is Loading . . .</section>
    }
    
    const cartItems = <ul className='cart-items'>{cartCtx.item.map(item=>
        <CartItem 
        key = {item.id} 
        name = {item.name} 
        amount = {item.amount} 
        price = {item.price} 
        onRemove = {cartItemRemoveHandler.bind(null,item.id)} 
        onAdd = {cartItemAddHandler.bind(null,item)}/>
    )}</ul>;

    const modalActions =  <div className='actions'>
                                <button className='button--alt' onClick={props.onClose} >Close</button>
                                {cartHasItems && <button className='button' onClick={orderHandler}>Order</button>}
                        </div>

    
    const carModelContent = <React.Fragment>

            {cartItems}
            <div className='total'>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>

           { isCheckOut && <CheckOut onHandle = {submitOrderHandler} onCancel = {props.onClose}/>}
           {! isCheckOut && modalActions}

    </React.Fragment>

        const isSubmittingContent = <p> is sending data </p>
        const didSubmitingContent = <p>Data upload success </p>
    return(
        <Modal onClose = {props.onClose}>
                {! isSubmitting && ! didSubmit && carModelContent}
                {isSubmitting && isSubmittingContent}
                {!isSubmitting && didSubmit && didSubmitingContent}
        </Modal>
    )
}

export default Cart