import React, { useState, useEffect } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { uploadBytes, ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage, db } from '../../firebase-configs/firebase-config';

const ChangeProductImage = ({ productId, onClose }) => {
  const [image, setImage] = useState(null);
  const [oldImagePath, setOldImagePath] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductImage = async () => {
      const productDocRef = doc(db, 'products', productId);
      const productSnapshot = await getDoc(productDocRef);
      if (productSnapshot.exists()) {
        const productData = productSnapshot.data();
        const oldImage = productData.image || null;
        setOldImagePath(oldImage);
      }
    };

    fetchProductImage();
  }, [productId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpdateImage = async () => {
    if (image) {
      setLoading(true);

      try {
        // Upload the new image to Storage
        const newImageRef = ref(storage, `product-images/${image.name}`);
        await uploadBytes(newImageRef, image);
        const newImageUrl = await getDownloadURL(newImageRef);

        // Delete the old image from Storage (if it exists)
        if (oldImagePath) {
          const oldImageRef = ref(storage, oldImagePath);
          await deleteObject(oldImageRef);
          console.log('Old image deleted successfully');
        }

        // Update the product with the new image URL
        const productDocRef = doc(db, 'products', productId);
        await updateDoc(productDocRef, { image: newImageUrl, oldImage: newImageRef.fullPath });

        onClose(); // Close the edit modal or navigate back
      } catch (error) {
        console.error('Error updating product image:', error);
        // You can handle the error, e.g., show a user-friendly message
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="edit-product">
      <h2>Edit Product Image</h2>
      <form>
        <label>
          Product Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <button type="button" onClick={handleUpdateImage} disabled={loading}>
          {loading ? 'Updating Image...' : 'Update Image'}
        </button>
        <button type="button" onClick={onClose} disabled={loading}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ChangeProductImage;
