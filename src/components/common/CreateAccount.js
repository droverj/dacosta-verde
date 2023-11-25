import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase-configs/firebase-config'

const CreateAccount = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Perform password validation
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      // Create user in Firebase Authentication
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Add user to Firestore with role "user"
      const usersCollection = collection(db, 'users');
      await addDoc(usersCollection, {
        uid: userCredential.user.uid,
        firstName,
        lastName,
        email,
        roles: ['user'], // Assign "user" role to the user
      });

      // Reset form fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      console.log('User created:', userCredential.user.uid);
    } catch (error) {
      console.error('Error creating user: ', error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      {errorMessage && <div> {errorMessage} </div>}
      <label>
        First Name:
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <label>
        Confirm Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Create Account</button>
    </form>
  );
};

export default CreateAccount;
