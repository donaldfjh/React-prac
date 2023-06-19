import './CheckOut.css'
import { useRef, useState} from 'react';

const isEmpty = value=>value.trim() === ''
const isFiveChart = value => value.trim().length >= 5 

const CheckOut = (props)=>{

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true
    })

    const confirmHandler = (event)=>{
        event.preventDefault();
        //console.log(event.target.name.value)
        const enterName = nameInputRef.current.value
        const enterStreet = streetInputRef.current.value
        const enterPostalCode = postalCodeInputRef.current.value
        const enterCity = cityInputRef.current.value

        //check if the enter is valid or not 
        const isValidName = !isEmpty(enterName)
        const isValidStreet = !isEmpty(enterStreet)
        const isValidPostalCode = isFiveChart(enterPostalCode)
        const isValidCity = !isEmpty(enterCity)


        setFormInputValidity({
            name:isValidName,
            street: isValidStreet,
            city : isValidCity,
            postalCode : isValidPostalCode

        })


        //only if four const here is true so the form can be update
       const formIsValid =  isValidCity && isValidName && isValidStreet && isValidPostalCode




       if(! formIsValid){
        return;
       }     
        props.onHandle({
            name: enterName,
            street: enterStreet,
            postalCode : enterPostalCode,
            city : enterCity
        });
        
    }
    return <form onSubmit={confirmHandler} className = 'form_CheckOut'>
        {/* 在control 样式的基础上 加上 invalid 样式，不然在空那边写control的话，invalid就没有control的样式了 */}
        <div className={`${'control'} ${formInputValidity.name ? '' : 'invalid'}`}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' ref={nameInputRef}/>
            {! formInputValidity.name && <p>Please enter valid name!!!!!</p>}
        </div>

        <div className={`${'control'} ${formInputValidity.street ? '' : 'invalid'}`}>
            <label htmlFor='street'>Street</label>
            <input type='text' id='street' ref={streetInputRef}/>
            {! formInputValidity.street && <p>Please enter valid street!!!!!</p>}
        </div>

        <div className={`${'control'} ${formInputValidity.postalCode ? '' : 'invalid'}`}>
            <label htmlFor='postal'>Postal code</label>
            <input type='text' id='postal' ref={postalCodeInputRef}/>
            {! formInputValidity.postalCode && <p>Please enter valid postalCode!!!!!</p>}
        </div>

        <div className={`${'control'} ${formInputValidity.city ? '' : 'invalid'}`}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' ref={cityInputRef}/>
            {! formInputValidity.city && <p>Please enter valid city!!!!!</p>}
        </div>
        <div className='actions'>
            <button className='submit'>confirm</button>
            <button type='button' onClick={props.onCancel}>Cancel</button>
        </div>
        
       

        
    </form>
};

export default CheckOut;