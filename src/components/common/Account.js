import React, { useState } from 'react';
import UpdatePassword from './UpdatePassword'
import Profile from './Profile'
const Account = () => {
  const [changePassword, setChangePassword] = useState(false);

  return (
    <div className='account'>
      <Profile />
      {changePassword ? (
        <UpdatePassword setChangePassword={setChangePassword} />
      ) : (
        <div className='change-password-container'>
          <p>Change your password?</p>
          <button onClick={() => setChangePassword(true)}>change password</button>
        </div>
      )}
      <h3>Your Previous Orders</h3>
      <div className='delete-account-container'>
        <p>Delete your account?</p>
        <button>delete</button>
      </div>
    </div>
  );
};

export default Account;
