import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTractor } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../../hooks/CartContext';
import '../../styles/CartTracker.scss';

const CartTracker = () => {
  const { getTotalItems } = useCart();

  return (
    <div className="cart-tracker">
      <span className="cart-count">{getTotalItems()}</span>
      <Link to="/cart">
        <FontAwesomeIcon icon={faTractor} className="cart-icon" style={{ color: 'red' }} size="2x" />
      </Link>
    </div>
  );
};

export default CartTracker;
