import React, { useState } from 'react';
import { useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'; // Create a separate component for the payment form

const Checkout = () => {
  return (
    <Elements>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
