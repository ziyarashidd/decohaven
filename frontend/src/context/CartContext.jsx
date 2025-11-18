import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [likedItems, setLikedItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const productId = product.id || product._id;
      const existingItem = prevItems.find(item => (item.id || item._id) === productId);
      if (existingItem) {
        return prevItems.map(item =>
          (item.id || item._id) === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemToRemove) => {
    setCartItems(prevItems => prevItems.filter(item => item !== itemToRemove));
  };

  const updateQuantity = (itemToUpdate, quantity) => {
    if (quantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item === itemToUpdate ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const toggleLike = (product) => {
    setLikedItems(prevItems => {
      const productId = product.id || product._id;
      const existingItem = prevItems.find(item => (item.id || item._id) === productId);
      if (existingItem) {
        return prevItems.filter(item => (item.id || item._id) !== productId);
      } else {
        return [...prevItems, product];
      }
    });
  };

  const removeFromLikes = (itemToRemove) => {
    setLikedItems(prevItems => prevItems.filter(item => item !== itemToRemove));
  };

  const isLiked = (id) => {
    return likedItems.some(item => (item.id || item._id) === id);
  };

  const getLikedCount = () => {
    return likedItems.length;
  };

  const login = async (credentials) => {
    // If credentials is an object with token and user, it's from session restoration
    if (credentials.token && credentials.user) {
      setUser(credentials.user);
      localStorage.setItem('token', credentials.token);
      return { token: credentials.token, user: credentials.user };
    }

    // Otherwise, it's a login request
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    setUser(data.user);
    localStorage.setItem('token', data.token);
    return data;
  };

  const register = async (userData) => {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    setUser(data.user);
    localStorage.setItem('token', data.token);
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartCount,
      getCartTotal,
      likedItems,
      toggleLike,
      removeFromLikes,
      isLiked,
      getLikedCount,
      products,
      setProducts,
      user,
      login,
      register,
      logout
    }}>
      {children}
    </CartContext.Provider>
  );
};
