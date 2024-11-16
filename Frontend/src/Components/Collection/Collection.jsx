import React from 'react'
import './Collection.css'
import new_collection from '../Assets/Frontend_Assets/new_collections.js'
import Item from '../Item/Item.jsx'

const Collection = () => {
  return (
    <div className="new-collections">
        <h1>COLLECTION</h1>
        
            <div className="collections">
                {new_collection.map((item,i)=>{
                    return <Item key={i} id={item.id}name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}

            </div>
    </div>
  )
}

export default Collection