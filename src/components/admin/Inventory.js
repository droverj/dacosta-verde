import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-configs/firebase-config';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const inventoryCollection = collection(db, 'inventory');
        const inventorySnapshot = await getDocs(inventoryCollection);
        const inventoryData = inventorySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInventory(inventoryData);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchInventory();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredInventory = inventory.filter((item) =>
  item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
  (item.SKU && item.SKU.toLowerCase().startsWith(searchQuery.toLowerCase()))
);

  return (
    <div>
      <h2>Inventory</h2>
      <input
        type="text"
        placeholder="Search by label or SKU..."
        value={searchQuery}
        onChange={handleSearch}
      />
      {filteredInventory.length === 0 ? (
        <p>No items in inventory.</p>
      ) : (
        <ul>
          {filteredInventory.map((item) => (
            <li key={item.id}>
              <p>SKU: {item.SKU || 'N/A'}</p>
              <p>Label: {item.label || 'N/A'}</p>
              <p>Price: {item.price || 'N/A'}</p>
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
