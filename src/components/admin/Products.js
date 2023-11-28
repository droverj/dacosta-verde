import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import { addProduct, getAllProducts, updateProduct, deleteProduct } from '../functions/product-functions';

const Products = () => {
  const { userData } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getAllProducts();
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    // Check if the user is an admin
    if (userData?.roles.includes('admin')) {
      const newProduct = {
        price: 0, // Set default values
        weight: 0,
        label: '',
        image: '',
      };

      // Add the new product to Firestore
      await addProduct(newProduct);

      // Fetch and update the products list
      const updatedProducts = await getAllProducts();
      setProducts(updatedProducts);
    } else {
      // User is not authorized to add a product
      console.log('User is not authorized to add a product');
    }
  };

  // Similar functions for handling update and delete

  return (
    <div>
      <h2>Products</h2>
      {userData?.roles.includes('admin') && <button onClick={handleAddProduct}>Add Product</button>}
      {/* Display products and provide options for editing and deleting */}
    </div>
  );
};

export default Products;
