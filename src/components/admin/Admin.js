import React, { useState } from 'react';
import CreateProduct from './CreateProduct';
import Products from './Products';
import Inventory from './Inventory';
import Users from './Users';

const Admin = () => {
  const [pageView, setPageView] = useState('');

  const renderPage = () => {
    switch (pageView) {
      case 'Products':
        return <Products />;
      case 'CreateProduct':
        return <CreateProduct />;
      case 'Inventory':
        return <Inventory />;
      case 'Users':
        return <Users />;
      default:
        return null;
    }
  };

  return (
    <div className='admin'>
      <button onClick={() => setPageView('Products')}>View All Products</button>
      <button onClick={() => setPageView('CreateProduct')}>Add Product</button>
      <button onClick={() => setPageView('Inventory')}>Inventory</button>
      <button onClick={() => setPageView('Users')}>Users</button>

      {renderPage()}
    </div>
  );
};

export default Admin;
