import React, { createContext } from 'react';
import all_product from "../assets/Frontend_Assets/all_product.js";


export const TryContext = createContext();

const TryContextProvider = (props) =>{
    const contextValue = {all_product};


  return (
    <TryContext.Provider value={contextValue}>
            {props.children}
    </TryContext.Provider>
  )
}

export default TryContextProvider;