import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-configs/firebase-config';

const Products = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="product-list">
      <h2>All Products</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              {product.image && (
                <img src={product.image} alt={product.title} style={{ maxWidth: '100%', maxHeight: '200px' }} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Products;
