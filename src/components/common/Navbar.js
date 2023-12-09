import React from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import { Link } from 'react-router-dom'
import Logout from './Logout'; 
import '../../styles/Navbar.scss';

const Navbar = () => {
  const { isAdmin, user } = useAuth();

  return (
    <div className='navbar'>
      <nav>
        <h1><Link to='/'>DaCosta Verde</Link></h1>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='contact'>Contact</Link>
          </li>
          <li>
            <Link to='/shop'>Shop</Link>
          </li>
          <li>
            <Link to='/account'>Account</Link>
          </li>
          <li>
            <Link to='/cart'>Cart</Link>
          </li>
          {isAdmin &&
            <li className='admin'>
              <Link to='/Admin'>Admin</Link>
            </li>
          }
        </ul>
      </nav>
      {user ? (
        // If the user is authenticated, show the Logout component
        <Logout />
      ) : (
        // If the user is not authenticated, show the Sign In button
        <button>
          <Link to='/auth'>Sign In</Link>
        </button>
      )}
    </div>
  )
}

export default Navbar