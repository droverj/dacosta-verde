import React from 'react'
import '../styles/Header.scss';
import Logo from '../images/leaf-border-logo.jpg';

const Header = () => {
  return (
    <div className='Header'>
      <img className='logo' src={Logo} alt="Logo" /> 
      <h3>Farm Raised Grass-Fed Beef</h3>
    </div>
  )
}

export default Header