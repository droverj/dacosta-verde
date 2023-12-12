// UpdateInventory.js
import React, { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase-configs/firebase-config';

const UpdateInventory = ({ itemId, currentUnits, onCancel, onUpdate }) => {
  const [newUnitsAvailable, setNewUnitsAvailable] = useState('');

  const handleUpdate = async (action) => {
    if (newUnitsAvailable !== '') {
      const inventoryRef = doc(db, 'inventory', itemId);

      try {
        // Perform the action based on the parameter
        const updatedUnits =
          action === 'increase'
            ? currentUnits + parseInt(newUnitsAvailable, 10)
            : currentUnits - parseInt(newUnitsAvailable, 10);

        await updateDoc(inventoryRef, {
          unitsAvailable: updatedUnits,
        });

        // Trigger parent component update callback with the new value
        onUpdate(itemId, updatedUnits);
      } catch (error) {
        console.error('Error updating units available:', error);
      }
    }
  };

  return (
    <form>
      <p>Current Units Available: {currentUnits}</p>
      <label>
        New Units Available:
        <input
          type="number"
          value={newUnitsAvailable}
          onChange={(e) => setNewUnitsAvailable(e.target.value)}
        />
      </label>
      <button type="button" onClick={() => handleUpdate('increase')}>
        Add
      </button>
      <button type="button" onClick={() => handleUpdate('decrease')}>
        Remove
      </button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default UpdateInventory;
