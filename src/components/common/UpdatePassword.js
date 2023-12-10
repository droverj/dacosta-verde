import React, { useState } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

const UpdatePassword = ({ setChangePassword }) => {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);

  const handlePasswordUpdate = async () => {
    try {
      // Reauthenticate the user with their current password
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update the user's password
      await updatePassword(user, newPassword);

      // Password updated successfully
      setError(null);
      setCurrentPassword('');
      setNewPassword('');
      console.log('Password updated successfully!');
    } catch (error) {
      // Handle password update error
      setError(error.message);
      console.error('Error updating password:', error);
    }
  };

  return (
    <div className='update-password'>
      <div className='change-password-container'>
        <p>Change your password?</p>
        <label>
          Current Password:
          <input
            type='password'
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </label>
        <label>
          New Password:
          <input
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <button onClick={handlePasswordUpdate}>Update Password</button>
        <button onClick={() => setChangePassword(false)}>Cancel</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default UpdatePassword;
