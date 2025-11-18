const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Products API
export const productsAPI = {
  getAll: () => apiCall('/products'),
  getById: (id) => apiCall(`/products/${id}`),
  create: (product) => apiCall('/products', {
    method: 'POST',
    body: JSON.stringify(product),
  }),
  update: (id, product) => apiCall(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(product),
  }),
  delete: (id) => apiCall(`/products/${id}`, {
    method: 'DELETE',
  }),
};

// Auth API
export const authAPI = {
  register: (userData) => apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  login: (credentials) => apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  getProfile: () => apiCall('/auth/profile'),
};

// Cart API
export const cartAPI = {
  getCart: () => apiCall('/cart'),
  addToCart: (item) => apiCall('/cart', {
    method: 'POST',
    body: JSON.stringify(item),
  }),
  updateQuantity: (productId, quantity) => apiCall(`/cart/${productId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  }),
  removeFromCart: (productId) => apiCall(`/cart/${productId}`, {
    method: 'DELETE',
  }),
  clearCart: () => apiCall('/cart', {
    method: 'DELETE',
  }),
};

// Orders API
export const ordersAPI = {
  create: (orderData) => apiCall('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  }),
  getUserOrders: () => apiCall('/orders'),
  getById: (id) => apiCall(`/orders/${id}`),
};
