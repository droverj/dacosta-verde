import React, { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';

const Logout = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = async () => {
    const auth = getAuth();

    try {
      await signOut(auth);
      // Additional logic after successful logout (e.g., redirect)
    } catch (error) {
      console.error('Error during logout:', error.message);
      // Handle error (e.g., display an error message)
    }
  };

  const handleConfirmation = (confirmed) => {
    if (confirmed) {
      handleLogout();
    }
    setShowConfirmation(false);
  };

  return (
    <div>
      <button onClick={() => setShowConfirmation(true)}>Logout</button>

      {showConfirmation && (
        <div className="confirmation-modal">
          <p>Sign out of DaCosta Verde?</p>
          <button onClick={() => handleConfirmation(true)}>Yes</button>
          <button onClick={() => handleConfirmation(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default Logout;
