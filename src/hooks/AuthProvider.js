import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase-configs/firebase-config';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);

        try {
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userDataFromFirestore = userDocSnap.data();

            setUserData({
              uid: user.uid,
              email: user.email,
              phoneNumber: userDataFromFirestore.phoneNumber,
              firstName: userDataFromFirestore.firstName,
              lastName: userDataFromFirestore.lastName,
              roles: userDataFromFirestore.roles || [],
              // Add more fields as needed
            });

            // Check if the user has the 'admin' role in Firestore
            setIsAdmin(userDataFromFirestore.roles && userDataFromFirestore.roles.includes('admin'));
          } else {
            setUserData(null);
            setIsAdmin(false);
            console.error('User document does not exist in Firestore.');
          }
        } catch (error) {
          console.error('Error fetching user data from Firestore:', error);
          setUserData(null);
          setIsAdmin(false);
        }
      } else {
        setUserData(null);
        setIsAdmin(false);
      }
    };

    fetchData();
  }, [user]);


  return <AuthContext.Provider value={{ user, userData, isAdmin }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
