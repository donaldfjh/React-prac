import '../Layout/HeaderCartButton.css'
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/CartContext';
import { useContext,useEffect, useState } from 'react';

const CartButton = (props)=>{
   const cartCtx =  useContext(CartContext);


    //calculate number of item 
    const initialValue = 0 ;
    const [btnMove,setBtnMove] = useState(false)
    let numberOfCartItems = 0
    if(cartCtx.item !== undefined){
         numberOfCartItems =  cartCtx.item.reduce((curNumber, item)=>{
             return curNumber + item.amount
          }, initialValue)

        
    }
    const {item} = cartCtx
   
 const btnClass = `${'button'} ${btnMove ? 'bump': ''}`

    useEffect(()=>{
        if(item.length === 0 ){
            return ;
        }
        setBtnMove(true)
        const timer = setTimeout(()=>{
            setBtnMove(false)
        },300)
        return ()=>{
            clearTimeout(timer)
        }

    },[item])

    return <button className={btnClass}  onClick={props.onClick}>
        <span className='icon'>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className='badge' >{numberOfCartItems}</span>
    </button>
}

export default CartButton;