import React, { useState } from 'react';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { storage } from '../../firebase-configs/firebase-config';

const CreateProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = async () => {
    if (selectedImage) {
      const imageRef = ref(storage, `images/${selectedImage.name}`);
      const uploadTask = uploadBytesResumable(imageRef, selectedImage);

      uploadTask.on('state_changed', (snapshot) => {
        // Track the upload progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      });

      try {
        // Wait for the upload to complete
        await uploadTask;

        // Get the download URL for the uploaded image
        const downloadURL = await getDownloadURL(imageRef);
        setImageUrl(downloadURL);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product.title && product.price && imageUrl) {
      // Add product to Firestore
      const db = getFirestore();
      const productsCollection = collection(db, 'products');

      try {
        const docRef = await addDoc(productsCollection, {
          title: product.title,
          price: product.price,
          image: imageUrl,
        });

        console.log('Product added with ID:', docRef.id);

        // Clear form after submission
        setProduct({
          title: '',
          price: '',
        });
        setSelectedImage(null);
        setImageUrl(null);
        setUploadProgress(0);
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
  };

  return (
    <div className="create-product">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={product.title} onChange={handleInputChange} required />
        </label>
        <label>
          Price:
          <input type="text" name="price" value={product.price} onChange={handleInputChange} required />
        </label>
        <label>
          Product Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <button type="button" onClick={handleUpload}>
          Upload Image
        </button>

        {uploadProgress > 0 && (
          <div>
            <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>
          </div>
        )}

        <button type="submit">Add Product</button>
      </form>

      {imageUrl && (
        <div>
          <p>Image uploaded successfully!</p>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default CreateProduct;


