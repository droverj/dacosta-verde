import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';
import { getAuth, signOut } from 'firebase/auth';
import SignOutConfirmation from './SignOutConfirmation';
import Login from './Login';

const Navbar = () => {
  const [showSignOutConfirmation, setShowSignOutConfirmation] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const { user, isAdmin } = useAuth();
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSignOutClick = () => setShowSignOutConfirmation(true);
  const handleSignInClick = () => setShowLogin(true);

  const handleSignOutConfirm = async () => {
    try {
      if (user) {
        await signOut(auth);
        navigate('/');
      }
    } catch (error) {
      console.error('Sign-out error:', error.message);
    } finally {
      setShowSignOutConfirmation(false);
    }
  };

  const handleSignOutCancel = () => setShowSignOutConfirmation(false);
  const handleLoginClose = () => setShowLogin(false);

  return (
    <div className="navbar">
      <nav>
        <h1>
          <Link to="/">DaCosta Verde</Link>
        </h1>
        <ul>
          {['Home', 'About', 'Contact', 'Shop', 'Cart'].map((link) => (
            <li key={link}>
              <Link to={`/${link.toLowerCase()}`}>{link}</Link>
            </li>
          ))}

          {isAdmin && (
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          )}
        </ul>

        {user?.email ? (
          <>
            <button onClick={handleSignOutClick} disabled={showSignOutConfirmation}>
              {showSignOutConfirmation ? 'Signing Out...' : 'Sign Out'}
            </button>
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
      <p>Logged in as: {user?.email}</p>
    </div>
  );
};

export default Navbar;