import React from 'react'
import { Link } from 'react-router-dom'
import Confirmation from './Confirmation'
import Login from './Login'
import Logout from './Logout'

const Navbar = () => {
  return (
    <div className='navbar'>
      <nav>
        <h1>
          <Link to="/">DaCosta Verde</Link>
        </h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
        <button>Sign In</button>
        <Link to="/register"> <button>Create Account</button></Link>
        <Link to="/profile"> <button>View Profile</button></Link>
      </nav>

      <Login />

      <Confirmation />
      <Logout />
    </div>
  )
}

export default Navbar