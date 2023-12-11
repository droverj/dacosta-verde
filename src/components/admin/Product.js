// Product.js
import React from 'react';

const Product = ({ product, onAction }) => {
  const handleAction = (type) => {
    onAction(product.id, type);
  };

  return (
    <li key={product.id}>
      {product.soldInBulk && <p>Bulk Discount</p>}
      <h3>{product.title}</h3>
      <p>Price: ${product.price}</p>{product.pricePerPound && <p>/lb.</p>}
      {product.bulkPrice && <p>Bulk Price: ${product.bulkPrice}</p>}
      {product.bulkPrice && product.pricePerPound ? (
        <p>/lb.</p>
      ) : null}

      {product.averageWeight ? (
        <p>Average weight: {product.weight} {product.weightUnit} per package.</p>
      ) : product.weight ? (
        <p>Weight: {product.weight} {product.weightUnit}</p>
      ) : null}

      {product.soldInBulk && product.weight ? (
        <p>{product.bulkAmount} x {product.weight} {product.weightUnit} package.</p>
      ) : product.soldInBulk ? (
        <p>{product.bulkAmount} packages.</p>
      ) : null}

      <img src={product.image} alt={product.title} style={{ maxWidth: '100%', maxHeight: '150px' }} />
      <br />
      <button onClick={() => handleAction('image')}>Change Image</button>
      <button onClick={() => handleAction('edit')}>Edit</button>
      <button onClick={() => handleAction('delete')}>Delete</button>
    </li>
  );
};

export default Product;
