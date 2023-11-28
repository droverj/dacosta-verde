import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/AuthProvider';
import { getAuth, signOut } from "firebase/auth";
import SignOutConfirmation from './SignOutConfirmation';
import Login from './Login'
// import Logout from './Logout'

const Navbar = () => {
  const [showSignOutConfirmation, setShowSignOutConfirmation] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const { userData } = useAuth();
  const auth = getAuth();

  const handleSignOutClick = () => {
    setShowSignOutConfirmation(true);
  };

  const handleSignInClick = () => {
    setShowLogin(true);
  };

  const handleSignOutConfirm = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });

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

          {userData?.roles.includes('admin') && (
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          )}
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