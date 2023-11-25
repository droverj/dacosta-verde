import React from 'react';

const SignOutConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <div>
      <p>Are you sure you want to sign out?</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel}>No</button>
    </div>
  );
};

export default SignOutConfirmation;
