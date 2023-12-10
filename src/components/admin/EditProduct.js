import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-configs/firebase-config';

const EditProduct = ({ productId, onClose }) => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    weight: '',
    weightUnit: 'oz.',
    soldInBulk: false,
    pricePerPound: false,
    averageWeight: false,
    bulkPrice: '',
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

    // Update the product details without changing the image
    await updateDoc(productDocRef, {
      title: product.title,
      price: product.price,
      weight: product.weight,
      weightUnit: product.weightUnit,
      soldInBulk: product.soldInBulk,
      averageWeight: product.averageWeight,
      pricePerPound: product.pricePerPound,
      bulkPrice: product.soldInBulk ? product.bulkPrice : null,
      // Add other fields as needed
    });

    onClose(); // Close the edit modal or navigate back
  };

  return (
    <div className="edit-product">
      <h2>Edit Product</h2>
      <form>
        <label>
          Title:
          <input type="text" name="title" value={product.title} onChange={handleInputChange} />
        </label>
        <label>
          Price:
          <input type="text" name="price" value={product.price} onChange={handleInputChange} />
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
          <input type="number" name="weight" value={product.weight} onChange={handleInputChange} />
        </label>
        <label>
          Weight Unit:
          <select name="weightUnit" value={product.weightUnit} onChange={handleInputChange}>
            <option value="oz.">oz.</option>
            <option value="Lbs.">Lbs.</option>
          </select>
        </label>
        <label>
          Sold in bulk
          <input type="checkbox" name="soldInBulk" checked={product.soldInBulk} onChange={handleInputChange} />
        </label>
        {product.soldInBulk && (
          <label>
            Bulk Price:
            <input type="text" name="bulkPrice" value={product.bulkPrice} onChange={handleInputChange} />
          </label>
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
