import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-configs/firebase-config';
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
      <li key={product.id}>
        {product.soldInBulk && <p>Bulk Discount</p>}
        <h3>{product.title}</h3>
        <p>Price: ${product.price}</p>{product.pricePerPound && <p>/lb.</p>}
        {product.bulkPrice && <p>Bulk Price: ${product.bulkPrice}</p>}
        
        {product.averageWeight ? (
          <p>Average weight: {product.weight} {product.weightUnit}</p>
        ) : (
          <p>Weight: {product.weight} {product.weightUnit}</p>
        )}
        
        <img src={product.image} alt={product.title} style={{ maxWidth: '100%', maxHeight: '150px' }} />
        <br />
        <button onClick={() => handleAction(product.id, 'image')}>Change Image</button>
        <button onClick={() => handleAction(product.id, 'edit')}>Edit</button>
        <button onClick={() => handleAction(product.id, 'delete')}>Delete</button>
      </li>
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
