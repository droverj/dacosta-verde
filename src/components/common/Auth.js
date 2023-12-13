import React, { useState } from 'react';
// import { ShoppingCartProvider } from '../../hooks/ShoppingCartContext';
import Login from './Login';
import Register from './Register';

const Auth = () => {
  const [createAccount, setCreateAccount] = useState(false);

  return (
    <div>
      {!createAccount ? (
        <>
          <Login />
          <div className='register'>
            Don't have an account?
            <button onClick={() => setCreateAccount(true)}>Sign Up!</button>
          </div>
        </>
      ) : (
        <Register createAccount={setCreateAccount} />
      )}
    </div>
  );
};

export default Auth;
