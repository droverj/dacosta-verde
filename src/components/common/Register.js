import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Register = ({ createAccount }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      // Add user to Firestore database
      const db = getFirestore();
      const usersCollection = collection(db, 'users');
      const userDocRef = doc(usersCollection, user.uid); // Update this line

      await setDoc(userDocRef, {
        firstName,
        lastName,
        email,
        phoneNumber,
        roles: ['user'],
      });

      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleBack = () => {
    createAccount(false);
  };

  return (
    <div className='register'>
      <button onClick={handleBack}>Back</button>
      <form onSubmit={handleRegister}>
        <label>
          First Name:
          <input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            type='tel'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password:
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type='submit'>Register</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register;
