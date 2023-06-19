import '../Meals/AvailableMeals.css'
import MealItem from './MealsItem/MealItem';
import Card from '../UI/Card';
import { useEffect, useState } from 'react';


const AvailableMeals = ()=>{
  const [meals, setMeals] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState()
  useEffect(()=>{

    const fetchMeals = async()=> {
      
      const response = await fetch('https://react-hook-1048d-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');

      if(! response.ok){
        throw new Error('Somthing go wrong!!!!!')
      }

      const data = await response.json()
      const loadItem =[]
      for(const key in data){
        loadItem.push({
          id: key,
          description: data[key].description,
          price: data[key].price,
          name: data[key].name
        })
      }
     setMeals(loadItem);
     setIsLoading(false);
    };

    const ErrorHandler = async ()=>{
      try{
        await fetchMeals()
      }catch(error){
        setIsLoading(false)
        setHttpError(error.message) //we can get the error object, it have default attribute 'message'
        console.log(error.message)
      }
    }
    
    ErrorHandler()
    
  
  },[])// we only need to run at very first time, so we don't need dependency 


    if(isLoading){
      return <section className='mealsLoading'>
        <p> Loading ....</p>
      </section>
    }

    if(httpError){
      return <section className='mealsError'>
      <p> {httpError}</p>
    </section>
    }
    const mealsList = meals.map((meals) =>
        (<MealItem 
            id = {meals.id} 
            key={meals.id} 
            name = {meals.name} 
            price = {meals.price} 
            desc = {meals.description}
            />)
            );
    return <section className='meals'>
        <Card>
            {mealsList}
        </Card>
            
        
    </section>
}

export default AvailableMeals