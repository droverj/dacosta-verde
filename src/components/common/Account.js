import React from 'react';
import { useAuth } from '../../hooks/AuthProvider';

const Account = () => {
  const { user, userData, isAdmin } = useAuth();

  // Declare creationTime within the if (user) block
  let creationTime = null;

  // Check if the user is available
  if (user) {
    // Access the creationTime value from the user's metadata
    creationTime = user.metadata.creationTime;

    // Convert creationTime to a JavaScript Date object
    const creationDate = new Date(creationTime);

    // Format the date to display only month and year
    const formattedDate = creationDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });

    // Update creationTime with the formatted date
    creationTime = formattedDate;
  }

  return (
    <div className='account'>
      <h1>Profile</h1>
      {user && <p>Member since {creationTime}.</p>}
      {userData && (
        <>
          <p>{userData.firstName} {userData.lastName}</p>
          <p>{userData.email}</p>
          <p>{userData.phoneNumber}</p>
        </>
      )}
      <div className='change-password-container'>
        <p>Change your password?</p>
        <button>change password</button>
      </div>
      <h3>Your Previous Orders</h3>
      <div className='delete-account-container'>
        <p>Delete your account?</p>
        <button>delete</button>
      </div>
    </div>
  );
};

export default Account;
