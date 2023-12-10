import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { storage, db } from '../../firebase-configs/firebase-config';

const EditProduct = ({ productId, onClose }) => {
  const [product, setProduct] = useState({
    title: '',
    price: 0,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const productDocRef = doc(db, 'products', productId);
      const productSnapshot = await getDoc(productDocRef);
      if (productSnapshot.exists()) {
        const productData = productSnapshot.data();
        setProduct(productData);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleUpdateDetails = async () => {
    const productDocRef = doc(db, 'products', productId);

    // Update the product details without changing the image
    await updateDoc(productDocRef, {
      title: product.title,
      price: product.price,
      // Add other fields as needed
    });

    onClose(); // Close the edit modal or navigate back
  };

  return (
    <div className="edit-product">
      <h2>Edit Product</h2>
      <form>
        <label>
          Title:
          <input type="text" name="title" value={product.title} onChange={handleInputChange} />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={product.price} onChange={handleInputChange} />
        </label>
        {/* Add other input fields for additional product details */}
        <button type="button" onClick={handleUpdateDetails}>
          Update Details
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
