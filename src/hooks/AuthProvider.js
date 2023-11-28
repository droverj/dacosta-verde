import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase-configs/firebase-config'; // Make sure to adjust the path based on your project structure
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

// ... (imports)

export const AuthProvider = ({ children }) => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching data...');
      if (user) {
        console.log('User is signed in:', user);

        // User is signed in, fetch additional user data from Firestore
        const userDocRef = doc(db, 'users', user.uid);
        console.log('User document reference:', userDocRef);

        try {
          const userDocSnap = await getDoc(userDocRef);
          console.log('User document snapshot:', userDocSnap);

          if (userDocSnap.exists()) {
            // User document exists in Firestore
            const userDataFromFirestore = userDocSnap.data();
            console.log('User data from Firestore:', userDataFromFirestore);

            // Update userData with the fetched data, including roles
            setUserData({
              uid: user.uid,
              email: user.email,
              roles: userDataFromFirestore.roles || [],
              // Add more fields as needed
            });
          } else {
            // Handle the case where the user document doesn't exist
            console.log('User document does not exist in Firestore.');
            setUserData(null);
          }
        } catch (error) {
          console.error('Error fetching user data from Firestore:', error);
        }
      } else {
        // User is signed out
        console.log('User is signed out.');
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
