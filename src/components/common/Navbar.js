import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/AuthProvider';
import SignOutConfirmation from './SignOutConfirmation';
import Login from './Login'
import Logout from './Logout'

const Navbar = () => {
  const { userData } = useAuth();
  const [showSignOutConfirmation, setShowSignOutConfirmation] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleSignOutClick = () => {
    setShowSignOutConfirmation(true);
  };

  const handleSignInClick = () => {
    setShowLogin(true);
  };

  const handleSignOutConfirm = () => {
    // Perform sign-out logic (e.g., call a signOut function)
    // ...

    // Close the confirmation modal
    setShowSignOutConfirmation(false);
  };

  const handleSignOutCancel = () => {
    // Close the confirmation modal
    setShowSignOutConfirmation(false);
  };

  const handleLoginClose = () => {
    // Close the login form
    setShowLogin(false);
  };

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

        {userData ? (
          <>
            <button onClick={handleSignOutClick}>Sign Out</button>
            {showSignOutConfirmation && (
              <SignOutConfirmation onConfirm={handleSignOutConfirm} onCancel={handleSignOutCancel} />
            )}
          </>
        ) : (
          <>
            <p>User is not signed in</p>
            <button onClick={handleSignInClick}>Sign In</button>
            {showLogin && <Login onClose={handleLoginClose} />}
          </>
        )}

        <Link to="/register">
          <button>Create Account</button>
        </Link>
        <Link to="/profile">
          <button>View Profile</button>
        </Link>
      </nav>
      <p>Logged in as: {userData?.email}</p>
    </div>
  )
}

export default Navbar