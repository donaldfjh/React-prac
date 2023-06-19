import React from 'react'
import { Fragment } from 'react'
import mealImage from '../../assets/meals.jpg'
import CartButton from './HeaderCartButton'
// import classes from './headerStyle.css'
import './headerStyle.css'
const Header = props =>{
  
    return (
      <Fragment>
        <header className='header'>
          <div className='header-h1'><h1>DonaldMeals</h1></div>
          
          <CartButton onClick = {props.onShowCart}/>
        </header>
        <div className='main-image'>
          <img src={mealImage} alt = 'Fighting'/>
        </div>
        
      </Fragment>
    )
  
}

export default Header