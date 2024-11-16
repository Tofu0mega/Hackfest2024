import React from 'react'
import './Footer.css'
import footer_logo from '../assets/Frontend_Assets/logo_big.png'
import instagram_icon from '../assets/Frontend_Assets/instagram_icon.png'
import pintester_icon from '../assets/Frontend_Assets/pintester_icon.png'
import whatsapp_icon from '../assets/Frontend_Assets/whatsapp_icon.png'


const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src="" alt={footer_logo} />
            <p>Virtual Changing Room</p>
        </div>
        <ul className="footer-links">
            <li>Products</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icons-container">
                <img src={instagram_icon} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={pintester_icon} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={whatsapp_icon} alt="" />
            </div>
            <div className="footer-copyright">
                <hr/>
                <p>Copyright @ 2023 </p>
            </div>
        </div>
    </div>
  )
}

export default Footer