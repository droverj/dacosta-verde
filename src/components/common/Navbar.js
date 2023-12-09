import React from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import { Link } from 'react-router-dom'
import CartTracker from './CartTracker';
import Logout from './Logout';
import '../../styles/Navbar.scss';

const Navbar = () => {
  const { isAdmin, user } = useAuth();

  return (
    <nav>
      <div className='main-pages-container'>
        <h1><Link to='/'>DaCosta Verde</Link></h1>

        <div className='page-links'>
          <Link to='/'>Home</Link>
          <Link to='contact'>Contact</Link>
          <Link to='/shop'>Shop</Link>
        </div>
        <CartTracker />
      </div>

      <div className='user-links'>
        <Link to='/account'>Account</Link>

        {isAdmin &&
          <div className='admin-link'>
            <Link to='/Admin' className='admin-link'>Admin</Link>
          </div>
        }

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
    </nav>
  )
}

export default Navbar