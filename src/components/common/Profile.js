import React from 'react';
import { useAuth } from '../../hooks/AuthProvider';

const Profile = () => {
  const { user, userData } = useAuth();

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
