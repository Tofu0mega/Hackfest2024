import React , { useContext } from 'react'
import './CSS/TryCategory.css'
import {TryContext} from '../Components/Context/TryContext'
import dropdown_icon from '../Components/assets/Frontend_Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'


const TryCategory = (props) => {
  const {all_product} =useContext(TryContext);
  return (
    <div className='try-Category'>
      <img className= 'trycategory-banner' src={props.banner} alt="" />
      <div className="trycategory-indexSort">
     
    </div>
      <div className="trycategory-products">
        {all_product.map((item,i)=>{
          if(props.category===item.category){
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          }
          else{
            return null;
          }
        })}

      </div>
    </div>
    
  )
}

export default TryCategory