import './MealItem.css'
import MealItemForm from './MealItemForm'
import CartContext from '../../../store/CartContext'

import { useContext } from 'react'
const MealItem = props=>{
    
    const price = `$${props.price.toFixed(2)}`
    const carCtx = useContext(CartContext) 

    const addToCartHandler = amount=>{
        carCtx.addItem({
            id:props.id,
            name: props.name,
            amount: amount,
            price:props.price
        })
    }
    return(
        <li className='meal'>
            <div>
                
                <h3>{props.name}</h3>
                <div className='description'>{props.desc}</div>
                <div className='price'>{price}</div>
            
            </div>
            <div>
                <MealItemForm id ={props.id} onAddToCart = {addToCartHandler}/>
            </div>
        </li>
    )
}
export default MealItem