import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase-configs/firebase-config';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Initial state
const initialState = {
  items: [],
};

// Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(initialState);
  const { user } = useAuth();

  // Fetch cart data on component mount
  useEffect(() => {
    const fetchCartData = async () => {
      if (user) {
        const userDocRef = doc(db, 'carts', user.uid);

        try {
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const cartDataFromFirestore = userDocSnap.data();
            setCart(cartDataFromFirestore || initialState);
          }
        } catch (error) {
          console.error('Error fetching cart data from Firestore:', error);
        }
      }
    };

    fetchCartData();
  }, [user]);

  // Function to add an item to the cart
  const addItem = (item) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart, items: [...prevCart.items, item] };
      if (user) {
        const userDocRef = doc(db, 'carts', user.uid);
        setDoc(userDocRef, updatedCart); // Update the cart in Firestore
      }
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart: cart.items,
        addItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
