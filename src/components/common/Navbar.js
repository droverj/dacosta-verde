import React from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import { Link } from 'react-router-dom'
import '../../styles/Navbar.scss';

const Navbar = () => {
  const { isAdmin } = useAuth();

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
      <button><Link to='/auth'>Sign In</Link></button>
    </div>
  )
}

export default Navbar