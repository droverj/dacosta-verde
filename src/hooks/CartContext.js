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
      const existingItem = prevCart.items.find((cartItem) => cartItem.id === item.id);
      const updatedItems = existingItem
        ? prevCart.items.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
          )
        : [...prevCart.items, { ...item, quantity: 1 }];

      const updatedCart = { ...prevCart, items: updatedItems };
      user && updateFirestoreCart(user.uid, updatedItems);
      return updatedCart;
    });
  };

  const deleteItem = (itemId) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter((item) => item.id !== itemId);
      const updatedCart = { ...prevCart, items: updatedItems };
      user && updateFirestoreCart(user.uid, updatedItems);
      return updatedCart;
    });
  };

  const decrementItem = (itemId) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: Math.max(1, cartItem.quantity - 1) }
          : cartItem
      );

      const updatedCart = { ...prevCart, items: updatedItems };
      user && updateFirestoreCart(user.uid, updatedItems);
      return updatedCart;
    });
  };

  // Asynchronous function to update Firestore document
  const updateFirestoreCart = async (userId, items) => {
    const userDocRef = doc(db, 'carts', userId);

    try {
      // Use setDoc to update only the 'items' field in the Firestore document
      await setDoc(userDocRef, { items }, { merge: true });
    } catch (error) {
      console.error('Error updating cart data in Firestore:', error);
    }
  };

  // Function to get the total number of items in the cart
  const getTotalItems = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart: cart.items,
        addItem,
        deleteItem,
        decrementItem,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
