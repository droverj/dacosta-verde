import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/AuthProvider';
import Navbar from './components/common/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Shop from './components/Shop';
import Cart from './components/Cart';
import CreateAccount from './components/common/Register';
import Profile from './components/common/Profile';
import Admin from './components/admin/Admin';
import './App.css';

function App() {

  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
