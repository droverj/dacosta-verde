// Products.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-configs/firebase-config';
import Product from './Product';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';
import ChangeProductImage from './ChangeProductImage';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [actionProductId, setActionProductId] = useState(null);
  const [actionType, setActionType] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsData = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  const handleAction = (productId, type) => {
    setActionProductId(productId);
    setActionType(type);
  };

  const handleCloseAction = () => {
    setActionProductId(null);
    setActionType(null);
  };

  return (
    <div className="product-list">
      <h2>All Products</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <Product key={product.id} product={product} onAction={handleAction} />
          ))}
        </ul>
      )}

      {/* Render appropriate component based on actionType */}
      {actionType === 'image' && <ChangeProductImage productId={actionProductId} onClose={handleCloseAction} />}
      {actionType === 'edit' && <EditProduct productId={actionProductId} onClose={handleCloseAction} />}
      {actionType === 'delete' && <DeleteProduct productId={actionProductId} onClose={handleCloseAction} />}
    </div>
  );
};

export default Products;
