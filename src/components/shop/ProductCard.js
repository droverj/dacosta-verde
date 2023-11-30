// ProductCard.js
import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    // You can pass the product ID or other details to the parent component (Shop)
    onAddToCart(product.id);
  };

  return (
    <div>
      <h3>{product.label}</h3>
      <p>Weight: {product.weight}</p>
      <p>Price per Pound: {product.pricePerPound}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;