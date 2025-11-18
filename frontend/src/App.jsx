import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Shop from './components/Shop/Shop';
import Productdetail from './components/Shop/Productdetail';
import Cart from './components/Shop/Cart';
import Viewfulcart from './components/Shop/Viewfulcart';
import Account from './components/account/Account';
import MyOrders from './components/account/MyOrders';
import Checkout from './components/checkout/Checkout';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Admin from './components/admin/Admin';

function AppContent() {
  const { setProducts, login } = useCart();

  useEffect(() => {
    // Check for existing token and restore user session
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and restore user session
      fetch('http://localhost:5000/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.user) {
          // Restore user state
          login({ token, user: data.user });
        }
      })
      .catch(error => {
        console.error('Token verification failed:', error);
        // Do not remove token to avoid logout loops; just skip setting user
      });
    }

    // Fetch products from backend
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        // Fallback to static data if backend is not available
        import('./data/products.js').then(module => {
          setProducts(module.products);
        });
      });
  }, [setProducts, login]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/productdetail/:id" element={<Productdetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/viewfulcart" element={<Viewfulcart />} />
        <Route path="/account" element={<Account />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}
