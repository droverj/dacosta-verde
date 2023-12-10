import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-configs/firebase-config';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';
import ChangeProductImage from './ChangeProductImage';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [imageProductId, setImageProductId] = useState(null);

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

  const handleEditClick = (productId) => {
    setEditProductId(productId);
  };

  const handleCloseEdit = () => {
    setEditProductId(null);
  };

  const handleDeleteClick = (productId) => {
    setDeleteProductId(productId);
  };

  const handleCloseDelete = () => {
    setDeleteProductId(null);
  };

  const handleImageChange = (productId) => {
    setImageProductId(productId);
  };

  const handleCloseImageChange = () => {
    setImageProductId(null);
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
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <img src={product.image} alt={product.title} style={{ maxWidth: '100%', maxHeight: '150px' }} />
              {/* Add other product details as needed */}
              <button onClick={() => handleImageChange(product.id)}>Change Image</button>
              <button onClick={() => handleEditClick(product.id)}>Edit</button>
              <button onClick={() => handleDeleteClick(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      {/* Render EditProduct component when editProductId is set */}
      {imageProductId && <ChangeProductImage productId={imageProductId} onClose={handleCloseImageChange} />}
      {editProductId && <EditProduct productId={editProductId} onClose={handleCloseEdit} />}
      {deleteProductId && <DeleteProduct productId={deleteProductId} onClose={handleCloseDelete} />}
    </div>
  );
};

export default Products;
