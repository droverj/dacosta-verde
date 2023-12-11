import React, { useState, useEffect } from 'react';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { storage, db } from '../../firebase-configs/firebase-config';

const DeleteProduct = ({ productId, onClose }) => {
  const [product, setProduct] = useState({
    label: '',
    price: 0,
    image: null,
    oldImage: null,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const productDocRef = doc(db, 'products', productId);
      const productSnapshot = await getDoc(productDocRef);
      if (productSnapshot.exists()) {
        const productData = productSnapshot.data();
        const oldImage = productData.image || null;
        setProduct({ ...productData, oldImage });
      }
    };

    fetchProduct();
  }, [productId]);

  const handleDeleteProduct = async () => {
    const productDocRef = doc(db, 'products', productId);
    const inventoryDocRef = doc(db, 'inventory', productId); // Reference to the corresponding inventory document

    try {
      // Delete the product from the products collection
      await deleteDoc(productDocRef);

      // Delete the product from the inventory collection
      await deleteDoc(inventoryDocRef);

      // Delete the product image from Storage (if it exists)
      if (product.oldImage) {
        const imageRef = ref(storage, product.oldImage);
        await deleteObject(imageRef);
        console.log('Product image deleted successfully');
      }

      onClose(); // Close the edit modal or navigate back
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="delete-product">
      <h2>Delete Product</h2>
      <p>Are you sure you want to delete this product? This action is irreversible.</p>
      <button onClick={handleDeleteProduct}>Confirm Delete</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default DeleteProduct;
