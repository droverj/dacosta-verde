import React, { useState } from 'react';
import UpdatePassword from './UpdatePassword'
import Profile from './Profile'
import DeleteAccount from './DeleteAccount'
const Account = () => {
  const [changePassword, setChangePassword] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);

  return (
    <div className='account'>
      <Profile />
      <h3>Your Previous Orders...</h3>
      {changePassword ? (
        <UpdatePassword setChangePassword={setChangePassword} />
      ) : (
        <div className='change-password-container'>
          <p>Change your password?</p>
          <button onClick={() => setChangePassword(true)}>change password</button>
        </div>
      )}

      {deleteUser ? (
        <DeleteAccount setDeleteUser={setDeleteUser} />
      ) : (
        <div className='delete-account-container'>
          <p>Delete your account?</p>
          <button onClick={() => setDeleteUser(true)}>delete</button>
        </div>
      )}
    </div>
  );
};

export default Account;
