import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Login from './Login';
import Home from './Home';
import SignUp from './SignUp';
import Cart from './Cart';
import Checkout from './Checkout';
import PaymentSuccess from './PaymentSuccess';


function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/hello')
      .then(response => response.text())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
