import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase-configs/firebase-config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      // User is signed in, fetch additional user data if needed
      setUserData({
        uid: user.uid,
        email: user.email,
        // Add more fields as needed
      });
    } else {
      // User is signed out
      setUserData(null);
    }
  }, [user]);

  return <AuthContext.Provider value={{ user, userData }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};