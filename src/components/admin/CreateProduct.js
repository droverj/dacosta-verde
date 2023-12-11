import React, { useState } from 'react';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, getFirestore, doc as firestoreDoc } from 'firebase/firestore';
import { storage } from '../../firebase-configs/firebase-config';
import HighlandCow from '../../images/highland-cow-cartoon.jpeg';

const CreateProduct = () => {
  const [product, setProduct] = useState({
    label: '',
    price: '',
    weight: '',
    weightUnit: 'oz.',
    soldInBulk: false,
    pricePerPound: false,
    averageWeight: false,
    bulkPrice: '',
    bulkAmount: '',
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: inputValue,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = async () => {
    if (selectedImage) {
      const imageRef = ref(storage, `product-images/${selectedImage.name}`);
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

    const db = getFirestore();
    const productsCollection = collection(db, 'products');
    const inventoryCollection = collection(db, 'inventory');

    try {
      // Add the product to the products collection
      const productDocRef = await addDoc(productsCollection, {
        label: product.label,
        price: product.price,
        weight: product.weight,
        weightUnit: product.weightUnit,
        soldInBulk: product.soldInBulk,
        pricePerPound: product.pricePerPound,
        averageWeight: product.averageWeight,
        bulkPrice: product.soldInBulk ? product.bulkPrice : null,
        bulkAmount: product.soldInBulk ? product.bulkAmount : null,
        image: imageUrl || HighlandCow, // Use default image if imageUrl is null
      });

      // Add the product to the inventory collection with the same document ID
      await addDoc(inventoryCollection, {
        id: productDocRef.id,
        unitsAvailable: 0,
        unitsSold: 0,
      });

      console.log('Product added with ID:', productDocRef.id);

      // Clear form after submission
      setProduct({
        label: '',
        price: '',
        weight: '',
        weightUnit: 'oz.',
        soldInBulk: false,
        pricePerPound: false,
        averageWeight: false,
        bulkPrice: '',
        bulkAmount: '',
      });
      setSelectedImage(null);
      setImageUrl(null);
      setUploadProgress(0);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="create-product">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Product Label:
          <input type="text" name="label" value={product.label} onChange={handleInputChange} required />
        </label>
        <label>
          Price: $
          <input type="number" name="price" value={product.price} step="0.01" onChange={handleInputChange} required />
        </label>
        <label>
          Price is per pound
          <input type="checkbox" name="pricePerPound" checked={product.pricePerPound} onChange={handleInputChange} />
        </label>
        <label>
          Sold by average weight
          <input type="checkbox" name="averageWeight" checked={product.averageWeight} onChange={handleInputChange} />
        </label>
        <label>
          Weight:
          <input type="number" name="weight" value={product.weight} step="0.01" onChange={handleInputChange} />
        </label>
        <label>
          <select name="weightUnit" value={product.weightUnit} onChange={handleInputChange}>
            <option value="oz.">oz.</option>
            <option value="lbs">lbs</option>
          </select>
        </label>
        <label>
          Sold in bulk
          <input type="checkbox" name="soldInBulk" checked={product.soldInBulk} onChange={handleInputChange} />
        </label>
        {product.soldInBulk && (
          <>
            <label>
              Bulk Price: $
              <input type="number" name="bulkPrice" value={product.bulkPrice} step="0.01" onChange={handleInputChange} />
            </label>
            <label>
              Bulk Amount:
              <input type="number" name="bulkAmount" value={product.bulkAmount} onChange={handleInputChange} />
            </label>
          </>
        )}
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

      {/* Display default image if imageUrl is null */}
      {!imageUrl && (
        <div>
          <p>Default Image</p>
          <img src={HighlandCow} alt="Default" style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </div>
      )}

      {/* Display uploaded image if imageUrl is not null */}
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
