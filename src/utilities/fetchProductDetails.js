import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-configs/firebase-config';

export const fetchProductDetails = async (productId) => {
  try {
    const productDocRef = doc(db, 'products', productId);
    const productDocSnapshot = await getDoc(productDocRef);

    if (productDocSnapshot.exists()) {
      return productDocSnapshot.data();
    } else {
      console.error('Product not found in Firestore:', productId);
      return null;
    }
  } catch (error) {
    console.error('Error fetching product details from Firestore:', error);
    throw error;
  }
};

