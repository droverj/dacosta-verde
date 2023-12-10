import React, { useState } from 'react';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase-configs/firebase-config';

const CreateProduct = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

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

  return (
    <div className="image-upload">
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>

      {uploadProgress > 0 && (
        <div>
          <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>
        </div>
      )}

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

