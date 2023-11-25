import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './components/home/Home';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Shop from './components/shop/Shop';
import Cart from './components/cart/Cart';
import CreateAccount from './components/common/CreateAccount';
import Profile from './components/common/Profile';
import './App.css';

function App() {

  return (
    <div className="App">
      <h1>DaCosta Verde eComme Store Landing Page</h1>
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
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
