// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import ProductList from './components/ProductList/ProductList.js';
import ProductDetail from './components/ProductDetail/ProductDetail.js';
import Checkout from './components/Checkout/Checkout.js';
import PaymentOptions from './components/PaymentOptions/PaymentOptions.js';
import ConfirmPayment from './components/ConfirmPayment/ConfirmPayment.js';
import PaymentStatus from './components/PaymentStatus/PaymentStatus.js';
import MyOrders from './components/MyOrders/MyOrders.js';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment-options" element={<PaymentOptions />} />
            <Route path="/confirm-payment" element={<ConfirmPayment />} />
            <Route path="/payment-status" element={<PaymentStatus />} />
            <Route path="/my-orders" element={<MyOrders />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
