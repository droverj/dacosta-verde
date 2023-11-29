import React, { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import AddProductForm from './AddProductForm';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products data from Firestore
        const db = getFirestore();
        const productsCollection = collection(db, 'products');
        const querySnapshot = await getDocs(productsCollection);

        // Process each product and get image URL
        const productsData = [];
        for (const doc of querySnapshot.docs) {
          const productData = doc.data();

          // Get the download URL of the product image
          const imageUrl = await getImageUrl(doc.id);

          productsData.push({ ...productData, imageUrl });
        }

        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const getImageUrl = async (productId) => {
    try {
      // Get image URL from Firebase Storage
      const storage = getStorage();
      const imageRef = ref(storage, `product-images/${productId}`);
      const imageUrl = await getDownloadURL(imageRef);
      return imageUrl;
    } catch (error) {
      console.error('Error fetching image:', error.message);
      return null;
    }
  };

  return (
    <div>
      <AddProductForm />
      <br />
      <h1>View Your Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.label}>
            <p>Label: {product.label}</p>
            <p>Weight: {product.weight}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Price per Pound: {product.pricePerPound}</p>
            {product.imageUrl && <img src={product.imageUrl} alt={product.label} style={{ maxWidth: '100px' }} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
