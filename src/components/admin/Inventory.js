import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc as firestoreDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase-configs/firebase-config';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      const inventoryCollection = collection(db, 'inventory');
      const inventorySnapshot = await getDocs(inventoryCollection);
      const inventoryData = inventorySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInventory(inventoryData);
    };

    fetchInventory();
  }, []);

  const handleButtonClick = async (productId) => {
    const productDocRef = firestoreDoc(db, 'products', productId);
    const productDocSnapshot = await getDoc(productDocRef);

    if (productDocSnapshot.exists()) {
      const productData = {
        id: productDocSnapshot.id,
        ...productDocSnapshot.data(),
      };

      setSelectedProduct(productData);
    }
  };

  return (
    <div>
      <h2>Inventory</h2>
      {inventory.length === 0 ? (
        <p>No items in inventory.</p>
      ) : (
        <ul>
          {inventory.map((item) => (
            <li key={item.id}>
              <button onClick={() => handleButtonClick(item.id)}>ID: {item.id}</button>
              <p>Units Available: {item.unitsAvailable}</p>
              <p>Units Sold: {item.unitsSold}</p>
            </li>
          ))}
        </ul>
      )}

      {selectedProduct && (
        <div>
          <h3>Associated Product</h3>
          <p>ID: {selectedProduct.id}</p>
          <p>Title: {selectedProduct.title}</p>
          <p>Price: ${selectedProduct.price}</p>
          {/* Add other product details as needed */}
        </div>
      )}
    </div>
  );
};

export default Inventory;

