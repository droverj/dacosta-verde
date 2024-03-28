import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Navbar.scss'

const Navbar = () => {
  return (
    <div className='Navbar'>
      <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {/* <li><Link to="/about">About</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/contact">Contact</Link></li> */}
      </ul>
      </nav>
    </div>
  )
}

export default Navbar