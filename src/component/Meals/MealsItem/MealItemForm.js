import '../MealsItem/MealItemForm.css'
import Input from '../../UI/Input'
import { useRef, useState } from 'react'
const MealItemForm = props=>{
    // console.log(props,'Add to Cart')
    const amountInputRef = useRef()
    const [amountIsValid,setAmountIsValid] = useState(true)
    const submitHandler = event=>{
        event.preventDefault();
        //input is always string 
        const enteredAmount = amountInputRef.current.value;
       // console.log(enteredAmount,'enteramount is ')
        // transfer into number 
        const enteredAmountNumber = + enteredAmount;
        //check enter amount to encase there were no space in it or conform the rules 
        if(enteredAmount.trim().length ===0 || enteredAmount < 1 || enteredAmount> 5 ){
            setAmountIsValid(false)
            return ;
        }
        //console.log(enteredAmountNumber,'final one')

        props.onAddToCart(enteredAmountNumber)
    }
    return(
        <form className='form' onSubmit={submitHandler}>
            <Input 
            label = 'Amount' 
            ref = {amountInputRef}
            input = {{    
                id:'amount_'+props.id,
                type:'number',
                min:'1',
                max:'5',
                step:'1',
                defaultValue:'1'
            }}/>
            <button>+</button>
            {! amountIsValid && <p>Please enter a valid number which between 1 to 5 </p>}
        </form>
    )
}

export default MealItemForm