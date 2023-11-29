import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL, deleteObject } from 'firebase/storage';
import AddProductForm from './AddProductForm';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    label: '',
    weight: '',
    quantity: '',
    pricePerPound: '',
    image: null,
  });

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

          productsData.push({ ...productData, id: doc.id, imageUrl });
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

  const handleDeleteClick = (productId) => {
    setSelectedProduct(productId);
    setShowConfirmationModal(true);
  };
  const handleDeleteConfirm = async () => {
    try {
      // Delete product document from Firestore
      const db = getFirestore();
      const productDocRef = doc(db, 'products', selectedProduct);
      await deleteDoc(productDocRef);

      // Delete product image from Firebase Storage
      const storage = getStorage();
      const imageRef = ref(storage, `product-images/${selectedProduct}`);
      await deleteObject(imageRef);

      // Remove the deleted product from the state
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== selectedProduct));

      // Reset selected product and hide the confirmation modal
      setSelectedProduct(null);
      setShowConfirmationModal(false);

      console.log('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };

  const handleEditClick = async (product) => {
    setSelectedProduct(product.id);
    setShowEditModal(true);

    // Fetch the current product data from Firestore
    const db = getFirestore();
    const productDocRef = doc(db, 'products', product.id);
    const productDoc = await getDoc(productDocRef);

    if (productDoc.exists()) {
      const productData = productDoc.data();
      setEditedProduct({
        label: productData.label || '',
        weight: productData.weight || '',
        quantity: productData.quantity || '',
        pricePerPound: productData.pricePerPound || '',
        image: null, // Note: To be updated if needed
      });
    }
  };

  const handleEditConfirm = async () => {
    try {
      // Update product document in Firestore
      const db = getFirestore();
      const productDocRef = doc(db, 'products', selectedProduct);
      await setDoc(productDocRef, {
        label: editedProduct.label,
        weight: editedProduct.weight,
        quantity: editedProduct.quantity,
        pricePerPound: editedProduct.pricePerPound,
      });

      // Reset edited product and hide the edit modal
      setEditedProduct({
        label: '',
        weight: '',
        quantity: '',
        pricePerPound: '',
        image: null,
      });
      setSelectedProduct(null);
      setShowEditModal(false);

      console.log('Product edited successfully!');
    } catch (error) {
      console.error('Error editing product:', error.message);
    }
  };

  const handleEditCancel = () => {
    // Reset edited product and hide the edit modal
    setEditedProduct({
      label: '',
      weight: '',
      quantity: '',
      pricePerPound: '',
      image: null,
    });
    setSelectedProduct(null);
    setShowEditModal(false);
  };

  return (
    <div>
      <AddProductForm />
      <br />
      <h1>View Your Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <p>Label: {product.label}</p>
            <p>Weight: {product.weight}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Price per Pound: {product.pricePerPound}</p>
            {product.imageUrl && <img src={product.imageUrl} alt={product.label} style={{ maxWidth: '100px' }} />}
            <button onClick={() => handleDeleteClick(product.id)}>Delete</button>
            <button onClick={() => handleEditClick(product)}>Edit</button>
          </li>
        ))}
      </ul>

      {showConfirmationModal && (
        <div>
          <p>Are you sure you want to delete this product?</p>
          <button onClick={handleDeleteConfirm}>Yes</button>
          <button onClick={handleEditCancel}>No</button>
        </div>
      )}

      {showEditModal && (
        <div>
          <h2>Edit Product</h2>
          <label>
            Label:
            <input
              type="text"
              value={editedProduct.label}
              onChange={(e) => setEditedProduct((prev) => ({ ...prev, label: e.target.value }))}
            />
          </label>

          <label>
            Weight:
            <input
              type="text"
              value={editedProduct.weight}
              onChange={(e) => setEditedProduct((prev) => ({ ...prev, weight: e.target.value }))}
            />
          </label>

          <label>
            Quantity:
            <input
              type="text"
              value={editedProduct.quantity}
              onChange={(e) => setEditedProduct((prev) => ({ ...prev, quantity: e.target.value }))}
            />
          </label>

          <label>
            Price per Pound:
            <input
              type="text"
              value={editedProduct.pricePerPound}
              onChange={(e) => setEditedProduct((prev) => ({ ...prev, pricePerPound: e.target.value }))}
            />
          </label>

          <button onClick={handleEditConfirm}>Save Changes</button>
          <button onClick={handleEditCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Products;