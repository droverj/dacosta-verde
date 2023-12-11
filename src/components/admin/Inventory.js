import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc as firestoreDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase-configs/firebase-config';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const inventoryCollection = collection(db, 'inventory');
      const inventorySnapshot = await getDocs(inventoryCollection);
      const inventoryData = inventorySnapshot.docs.map(async (doc) => {
        const inventoryItem = {
          id: doc.id,
          ...doc.data(),
        };

        // Fetch product details
        const productDocRef = firestoreDoc(db, 'products', inventoryItem.id);
        const productDocSnapshot = await getDoc(productDocRef);

        if (productDocSnapshot.exists()) {
          const productData = productDocSnapshot.data();
          // Include product details in the inventory item
          inventoryItem.label = productData.label || 'N/A';
          inventoryItem.price = productData.price || 'N/A';
          inventoryItem.weight = productData.weight || 'N/A';
          inventoryItem.weightUnit = productData.weightUnit || 'N/A';
        }

        return inventoryItem;
      });

      // Wait for all asynchronous operations to complete
      const updatedInventoryData = await Promise.all(inventoryData);
      setInventory(updatedInventoryData);
    };

    fetchInventory();
  }, []);

  return (
    <div>
      <h2>Inventory</h2>
      {inventory.length === 0 ? (
        <p>No items in inventory.</p>
      ) : (
        <ul>
          {inventory.map((item) => (
            <li key={item.id}>
              <p>ID: {item.id}</p>
              <p>Product: {item.label}</p>
              <p>Price: {item.price}</p>
              <p>Weight: {item.weight}</p>
              <p>Weight Unit: {item.weightUnit}</p>
              <p>Units Available: {item.unitsAvailable}</p>
              <p>Units Sold: {item.unitsSold}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Inventory;
