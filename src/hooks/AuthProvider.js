import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase-configs/firebase-config';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user] = useAuthState(auth);
  console.log(user);
  const [userData, setUserData] = useState(null);
  console.log(userData)

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        console.log('User document reference:', userDocRef);
        
        console.log('User UID:', user.uid);
        console.log('User Object:', user);

        try {
          const userDocSnap = await getDoc(userDocRef);
          console.log('User document snapshot:', userDocSnap);
  
          if (userDocSnap.exists()) {
            const userDataFromFirestore = userDocSnap.data();
            console.log('User data from Firestore:', userDataFromFirestore);

            setUserData({
              uid: user.uid,
              email: user.email,
              roles: userDataFromFirestore.roles || [],
              // Add more fields as needed
            });
          } else {
            console.log('User document does not exist in Firestore.');
            setUserData(null);
          }
        } catch (error) {
          console.error('Error fetching user data from Firestore:', error);
        }
      } else {
        setUserData(null);
      }
    };
  
    fetchData();
  }, [user]);
  

  return <AuthContext.Provider value={{ user, userData }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

