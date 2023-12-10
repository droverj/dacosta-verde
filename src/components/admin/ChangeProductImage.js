import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { uploadBytes, ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage, db } from '../../firebase-configs/firebase-config';

const ChangeProductImage = ({ productId, onClose }) => {
  const [product, setProduct] = useState({
    title: '',
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleUpdateDetails = async () => {
    const productDocRef = doc(db, 'products', productId);

    // Update the product without changing the image
    await updateDoc(productDocRef, {
      title: product.title,
      price: product.price,
      // Add other fields as needed
    });

    onClose(); // Close the edit modal or navigate back
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: file,
    }));
  };

  const handleUpdateImage = async () => {
    const productDocRef = doc(db, 'products', productId);

    if (product.image) {
      // Upload the new image to Storage
      const newImageRef = ref(storage, `product-images/${product.image.name}`);
      await uploadBytes(newImageRef, product.image);
      const newImageUrl = await getDownloadURL(newImageRef);

      // Delete the old image from Storage (if it exists)
      if (product.oldImage) {
        const oldImageRef = ref(storage, product.oldImage);
        deleteObject(oldImageRef)
          .then(() => {
            console.log('Old image deleted successfully');
          })
          .catch((error) => {
            console.error('Error deleting old image:', error);
          });
      }

      // Update the product with the new image URL
      await updateDoc(productDocRef, { ...product, image: newImageUrl, oldImage: newImageRef.fullPath });
    }

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
        <label>
          Product Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <button type="button" onClick={handleUpdateDetails}>
          Update Details
        </button>
        <button type="button" onClick={handleUpdateImage}>
          Update Image
        </button>
      </form>
    </div>
  );
};

export default ChangeProductImage;
