import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase-configs/firebase-config'; // Make sure to adjust the path based on your project structure
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        // User is signed in, fetch additional user data from Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          // User document exists in Firestore
          const userDataFromFirestore = userDocSnap.data();

          // Update userData with the fetched data, including roles
          setUserData({
            uid: user.uid,
            email: user.email,
            roles: userDataFromFirestore.roles || [], // Assuming roles is an array
            // Add more fields as needed
          });
        } else {
          // Handle the case where the user document doesn't exist
          setUserData(null);
        }
      } else {
        // User is signed out
        setUserData(null);
      }
    };

    fetchData(); // Call the function to fetch data
  }, [user]);

  return <AuthContext.Provider value={{ user, userData }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
