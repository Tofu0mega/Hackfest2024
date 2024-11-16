import React , { useContext } from 'react'
import './CSS/TryCategory.css'
import {TryContext} from '../Components/Context/TryContext'
import dropdown_icon from '../Components/assets/Frontend_Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'
import ProductListing from '../Product/product'


const TryCategory = (props) => {
 
  return (
    <>
    <div className='try-Category'>
      <img className= 'trycategory-banner' src={props.banner} alt="" />
      
    </div>
     <ProductListing/>
    </>
      
  
    
  )
}

export default TryCategory