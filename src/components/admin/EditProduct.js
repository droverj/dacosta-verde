import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-configs/firebase-config';

const EditProduct = ({ productId, onClose }) => {
  const [product, setProduct] = useState({
    SKU: '',
    label: '',
    price: '',
    weight: '',
    weightUnit: 'oz.',
    soldInBulk: false,
    pricePerPound: false,
    averageWeight: false,
    bulkPrice: '',
    bulkAmount: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const productDocRef = doc(db, 'products', productId);
      const productSnapshot = await getDoc(productDocRef);
      if (productSnapshot.exists()) {
        const productData = productSnapshot.data();
        setProduct(productData);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: inputValue,
    }));
  };

  const handleUpdateDetails = async () => {
    const productDocRef = doc(db, 'products', productId);

    // Fetch the existing product data
    const productSnapshot = await getDoc(productDocRef);
    const existingProductData = productSnapshot.data();

    // Update the product details without changing the image
    await updateDoc(productDocRef, {
      label: product.label,
      price: product.price,
      SKU: product.SKU,
      weight: product.weight,
      weightUnit: product.weightUnit,
      soldInBulk: product.soldInBulk,
      averageWeight: product.averageWeight,
      pricePerPound: product.pricePerPound,
      bulkPrice: product.soldInBulk ? product.bulkPrice : null,
      bulkAmount: product.soldInBulk ? product.bulkAmount : null,
      // Add other fields as needed
    });

    // Update the corresponding entry in the inventory database
    const inventoryDocRef = doc(db, 'inventory', productId);
    await updateDoc(inventoryDocRef, {
      label: product.label,
      price: product.price,
      SKU: product.SKU,
      // Add other fields as needed
    });

    onClose(); // Close the edit modal or navigate back
  };


  return (
    <div className="edit-product">
      <h2>Edit Product</h2>
      <form>
        <label>
          SKU:
          <input type="number" name="SKU" value={product.SKU} onChange={handleInputChange} />
        </label>
        <label>
          Product Label:
          <input type="text" name="label" value={product.label} onChange={handleInputChange} />
        </label>
        <label>
          Price: $
          <input type="number" name="price" value={product.price} step="0.01" onChange={handleInputChange} />
        </label>
        <label>
          Price is per pound
          <input type="checkbox" name="pricePerPound" checked={product.pricePerPound} onChange={handleInputChange} />
        </label>
        <label>
          Sold by average weight
          <input type="checkbox" name="averageWeight" checked={product.averageWeight} onChange={handleInputChange} />
        </label>
        <label>
          Weight:
          <input type="number" name="weight" value={product.weight} step="0.01" onChange={handleInputChange} />
        </label>
        <label>
          <select name="weightUnit" value={product.weightUnit} onChange={handleInputChange}>
            <option value="oz.">oz.</option>
            <option value="lbs">lbs</option>
          </select>
        </label>
        <label>
          Sold in bulk
          <input type="checkbox" name="soldInBulk" checked={product.soldInBulk} onChange={handleInputChange} />
        </label>
        {product.soldInBulk && (
          <>
            <label>
              Bulk Price: $
              <input type="number" name="bulkPrice" value={product.bulkPrice} step="0.01" onChange={handleInputChange} />
            </label>
            <label>
              Bulk Amount:
              <input type="number" name="bulkAmount" value={product.bulkAmount} onChange={handleInputChange} />
            </label>
          </>
        )}
        {/* Add other input fields for additional product details */}
        <button type="button" onClick={handleUpdateDetails}>
          Update Details
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
