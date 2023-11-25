import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/AuthProvider'; // Make sure to adjust the path based on your project structure
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      // User is signed in, fetch user data
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        // Here, you can fetch additional user data from Firestore if needed
        setUserData({
          uid: user.uid,
          email: user.email,
          // Add more fields as needed
        });
      });

      return () => unsubscribe(); // Cleanup when the component unmounts
    } else {
      // User is signed out
      setUserData(null);
    }
  }, [user]);

  return (
    <div>
      <h2>User Profile</h2>
      {user ? (
        <div>
          <p>Email: {userData?.email}</p>
          {/* Display more user data as needed */}
        </div>
      ) : (
        <p>User not signed in</p>
      )}
    </div>
  );
};

export default Profile;
