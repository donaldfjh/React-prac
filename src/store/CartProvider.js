import CartContext from "./CartContext";
import { useReducer } from "react";
const arrDefault = [];
const defaultCartState = {
    item: arrDefault,
    totalAmount:0
}
const cartReducer = (state,action)=>{
    if(action.type === 'ADD_ITEM'){

            //check whether the item is in car or not 
            let updateItems
            const existCartItemIndex = state.item.findIndex(item => item.id === action.item.id)
            const existCartItem = state.item[existCartItemIndex]
        
            if(existCartItem){
                const updateItem ={
                     ...existCartItem,
                    amount : action.item.amount + existCartItem.amount
                }
                updateItems = [...state.item]
                updateItems[existCartItemIndex] = updateItem
            }else{
                 updateItems = state.item.concat(action.item)
            }

            const updateTotalAmount = state.totalAmount + action.item.price * action.item.amount

            return {
                item:updateItems,
                totalAmount:updateTotalAmount

            }

        
       
        
    }
        if(action.type === 'REMOVE_ITEM'){
            //find the item which going to delete through id 
            const existCartItemIndex = state.item.findIndex(item => item.id === action.id)
            
            const existCartItem = state.item[existCartItemIndex]

            const updateTotalAmount = state.totalAmount - existCartItem.price
            let updateItems
            console.log(state,'state')
            console.log(action,'action')
            if(existCartItem.amount ===1){
                //Delete the item which id !== action.id, because m1 === m1 but here is m1 !== m1 so its false ,then this argument not going to show
                updateItems = state.item.filter(item => item.id !== action.id)
                
            }else{
                const updateItem = {...existCartItem,amount: existCartItem.amount - 1 }
                //copy of state item to create a new array with old item 
                updateItems = [...state.item];
                updateItems[existCartItemIndex] = updateItem

            }

            return {
                item:updateItems,
                totalAmount:updateTotalAmount
            }
        }

        if(action.type === 'CLEAR'){

            return defaultCartState
        }
        return defaultCartState
    }

    


const CartProvider = props=>{

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)
    

    const addItemToCartHandler = (item)=>{
        dispatchCartAction({type:'ADD_ITEM', item:item})
    };

    const removeItemFromCartHandler=(id)=>{
        dispatchCartAction({type:'REMOVE_ITEM', id:id})
    };

    const clearItemFromCartHandler = ()=>{
        dispatchCartAction({type:'CLEAR'})
    }


    const cartContext = {
        item:cartState.item,
        totalAmount:cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearItemFromCartHandler 
    }
    
    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider