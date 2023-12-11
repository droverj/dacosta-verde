// UpdateInventory.js
import React, { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase-configs/firebase-config';

const UpdateInventory = ({ itemId, onCancel, onUpdate }) => {
  const [newUnitsAvailable, setNewUnitsAvailable] = useState('');

  const handleUpdate = async () => {
    if (newUnitsAvailable !== '') {
      const inventoryRef = doc(db, 'inventory', itemId);

      try {
        await updateDoc(inventoryRef, {
          unitsAvailable: parseInt(newUnitsAvailable, 10),
        });

        // Trigger parent component update callback with the new value
        onUpdate(itemId, parseInt(newUnitsAvailable, 10));
      } catch (error) {
        console.error('Error updating units available:', error);
      }
    }
  };

  return (
    <form>
      <label>
        New Units Available:
        <input
          type="number"
          value={newUnitsAvailable}
          onChange={(e) => setNewUnitsAvailable(e.target.value)}
        />
      </label>
      <button type="button" onClick={handleUpdate}>
        Update
      </button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default UpdateInventory;
