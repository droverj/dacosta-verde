import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-configs/firebase-config';
import ShopItem from './ShopItem';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.SKU && product.SKU.toLowerCase().startsWith(searchQuery.toLowerCase()))
  );

  return (
    <div className="product-list">
      <h2>All Products</h2>
      <input
        type="text"
        placeholder="Search by label or SKU..."
        value={searchQuery}
        onChange={handleSearch}
      />
      {filteredProducts.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {filteredProducts.map((product) => (
            <ShopItem key={product.id} product={product} />
          ))}
        </ul>
      )}

    </div>
  );
};

export default Shop;
