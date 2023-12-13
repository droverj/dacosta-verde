import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/AuthProvider';
import { CartProvider } from './hooks/CartContext';
import Navbar from './components/common/Navbar';
import Home from './components/Home';
import Contact from './components/Contact';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Auth from './components/common/Auth';
import Account from './components/common/Account';
import Admin from './components/admin/Admin';
import './App.scss';

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar />

            <div className='main-container'>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/account" element={<Account />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </div>

          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
