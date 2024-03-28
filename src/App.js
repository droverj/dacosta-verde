import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import './App.scss';

const App = () => {
  return (
    <div className='App'>
      <Header />
      <Navbar />
      <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/checkout" element={<Checkout userId={userId} />} /> */}
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App