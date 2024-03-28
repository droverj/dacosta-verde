import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import Contact from './components/Contact';
import './App.scss';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
      <Header />
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/checkout" element={<Checkout userId={userId} />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App