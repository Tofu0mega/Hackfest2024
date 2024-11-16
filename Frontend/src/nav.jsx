import React, { useState } from "react";
import './Navbar.css'

import { Link } from 'react-router-dom'

const Navbar = () => {
    const [menu, setMenu] = useState(""); 
  return (
    <div className='navbar'>
     
            <p>VIRTUAL CHANGING ROOM</p>

    
        <ul className="nav-menu">
            <li onClick={()=>{setMenu("try")}}><Link to='/'>Try</Link>{menu==="Try"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Sunglasses")}}><Link to='/Sunglasses'>Sunglasses</Link>{menu==="Sunglasses"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Earrings")}}><Link to='/Earrings'>Earrings</Link>{menu==="Earrings"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Necklace")}}><Link to='/Necklace'>Necklace</Link>{menu==="Necklace"?<hr/>:<></>}</li>

        </ul>
        <div className="nav-login-cart">
            <Link to='/login'></Link><button>Login</button>
            <Link to='/cart'></Link><img src={cartIcon} alt="Cart" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
            <div className="nav-cart-count">0</div>
        </div>

    </div>
  )
}

export default Navbar