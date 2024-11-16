import React from 'react'
import './Hero.css'
import handIcon from '../assets/Frontend_Assets/hand_icon.png'
import arrowIcon from '../assets/Frontend_Assets/arrow.png'
import heroImage from '../Assets/Frontend_Assets/hero_image.png'

const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            
                <img src={handIcon} alt="handIcon" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />

        <div className="hero-latest-btn">
            <div className="Latest collection"></div>
            <img src={arrowIcon} alt="arrowIcon" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
        </div>
    </div>
    <div className="hero-right">
        <img src={heroImage} alt="HeroImage"  style={{ width: '70px', height: '70px', objectFit: 'cover' }}  />

    </div>
        
        

    </div>
    
  )
}

export default Hero