import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError('Stripe.js has not loaded yet.');
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { token, error } = await stripe.createToken(cardElement);

      if (error) {
        setError(error.message);
      } else {
        // Call the serverless function to create a Checkout Session
        const response = await fetch('/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: token.id,
            productId: 'your-product-id', // Replace with your actual product ID
            quantity: 1, // Replace with the desired quantity
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create checkout session');
        }

        const session = await response.json();

        // Redirect to the Checkout Session URL
        window.location.href = session.url;
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setError('Error processing payment');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay Now
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default CheckoutForm;

