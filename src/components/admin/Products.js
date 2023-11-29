import React from 'react';
import { useForm } from 'react-hook-form';
import { collection, addDoc, getFirestore, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getStorage, getDownloadURL } from 'firebase/storage';

const AddProductForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Extract the File object from the FileList
      const imageFile = data.image[0];

      // Add product data to Firestore
      const db = getFirestore();
      const productsCollection = collection(db, 'products');
      const productRef = await addDoc(productsCollection, {
        label: data.label,
        weight: data.weight,
        quantity: data.quantity,
        pricePerPound: data.pricePerPound,
      });

      // Upload image to Firebase Storage
      const storage = getStorage();
      const imageRef = ref(storage, `product-images/${productRef.id}`);
      await uploadBytes(imageRef, imageFile);

      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(imageRef);

      // Update the product document with the image URL using set with merge
      await setDoc(productRef, { imageUrl }, { merge: true });

      console.log('Product added successfully!');

      // Clear form fields
      reset();
    } catch (error) {
      console.error('Error adding product:', error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Label:
        <input type="text" {...register('label')} />
      </label>

      <label>
        Weight:
        <input type="text" {...register('weight')} />
      </label>

      <label>
        Quantity:
        <input type="text" {...register('quantity')} />
      </label>

      <label>
        Price per Pound:
        <input type="text" {...register('pricePerPound')} />
      </label>

      <label>
        Image:
        <input type="file" {...register('image')} />
      </label>

      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
