// Shop.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import ProductCard from './ProductCard';
import Cart from '../cart/Cart';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const productsCollection = collection(db, 'products');
        const querySnapshot = await getDocs(productsCollection);

        const productsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (productId) => {
    // Find the selected product from the products array
    const selectedProduct = products.find((product) => product.id === productId);

    // Update the cartItems state with the selected product
    setCartItems((prevItems) => [
      ...prevItems,
      {
        id: selectedProduct.id,
        label: selectedProduct.label,
        quantity: 1, // You can modify this based on your requirements
      },
    ]);
  };

  const handleRemoveFromCart = (productId) => {
    // Remove the selected product from the cartItems state
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  return (
    <div>
      <h1>Shop</h1>
      <div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
      <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
    </div>
  );
};

export default Shop;
