import React, { useState } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import { deleteUser } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase-configs/firebase-config';

const DeleteAccount = ({ setDeleteUser }) => {
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      // Delete the user from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await deleteDoc(userDocRef);

      // Delete the user from Firebase Authentication
      await deleteUser(user);

      // User deleted successfully
      setError(null);
      console.log('User deleted successfully!');
      navigate('/');
    } catch (error) {
      // Handle deletion error
      setError(error.message);
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className='delete-account'>
      <p>Are you sure you want to delete your account?</p>
      <p>All of your data will be lost.</p>
      <p>This action is final.</p>
      <button onClick={handleDeleteAccount}>Delete Account</button>
      <button onClick={() => setDeleteUser(false)}>Cancel</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default DeleteAccount;
