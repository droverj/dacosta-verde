import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase-configs/firebase-config';

const productsCollection = collection(db, 'products');

export const addProduct = async (productData) => {
  try {
    await addDoc(productsCollection, productData);
  } catch (error) {
    console.error('Error adding product:', error.message);
  }
};

export const getAllProducts = async () => {
  const querySnapshot = await getDocs(productsCollection);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateProduct = async (productId, updatedData) => {
  const productDoc = doc(productsCollection, productId);
  try {
    await updateDoc(productDoc, updatedData);
  } catch (error) {
    console.error('Error updating product:', error.message);
  }
};

export const deleteProduct = async (productId) => {
  const productDoc = doc(productsCollection, productId);
  try {
    await deleteDoc(productDoc);
  } catch (error) {
    console.error('Error deleting product:', error.message);
  }
};
