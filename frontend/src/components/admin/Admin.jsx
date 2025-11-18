import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Settings,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  MoreVertical,
  Edit,
  Trash2,
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: ''
  });
  const [profileForm, setProfileForm] = useState({
    name: '',
    profileImage: ''
  });
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useCart();

  // Check if user is admin and token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!user || user.role !== 'admin' || !token) {
      navigate('/account');
      return;
    }
    fetchDashboardData();
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/account');
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };

      // Fetch stats
      const statsRes = await fetch('https://decohaven-mr5s.onrender.com/api/admin/stats', { headers });
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats([
          { title: 'Total Revenue', value: `Rs. ${statsData.totalRevenue?.toLocaleString('en-IN') || 0}.00`, change: '+12.5%', icon: DollarSign, color: 'bg-blue-500' },
          { title: 'Total Orders', value: statsData.totalOrders || 0, change: '+8.2%', icon: ShoppingCart, color: 'bg-green-500' },
          { title: 'Total Products', value: statsData.totalProducts || 0, change: '+3.1%', icon: Package, color: 'bg-purple-500' },
          { title: 'Total Customers', value: statsData.totalUsers || 0, change: '+15.3%', icon: Users, color: 'bg-orange-500' }
        ]);
      }

      // Fetch orders
      const ordersRes = await fetch('https://decohaven-mr5s.onrender.com/api/admin/orders', { headers });
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData);
      }

      // Fetch products
      const productsRes = await fetch('https://decohaven-mr5s.onrender.comapi/admin/products', { headers });
      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(productsData);
      }

      // Fetch users
      const usersRes = await fetch('https://decohaven-mr5s.onrender.com/api/admin/users', { headers });
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData);
      }

      // Fetch notifications
      const notificationsRes = await fetch('https://decohaven-mr5s.onrender.com/api/admin/notifications', { headers });
      if (notificationsRes.ok) {
        const notificationsData = await notificationsRes.json();
        setNotifications(notificationsData);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://decohaven-mr5s.onrender.com/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchDashboardData(); // Refresh data
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const deleteProduct = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://decohaven-mr5s.onrender.com/api/admin/products/${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        fetchDashboardData(); // Refresh data
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      price: '',
      category: '',
      image: '',
      description: ''
    });
    setShowProductModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      description: product.description || ''
    });
    setShowProductModal(true);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editingProduct
        ? `https://decohaven-mr5s.onrender.com/api/admin/products/${editingProduct._id}`
        : 'https://decohaven-mr5s.onrender.com/api/admin/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productForm)
      });

      if (response.ok) {
        setShowProductModal(false);
        fetchDashboardData(); // Refresh data
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEditProfile = () => {
    setProfileForm({
      name: user?.name || '',
      profileImage: user?.profileImage || ''
    });
    setShowProfileModal(true);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://decohaven-mr5s.onrender.com/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profileForm)
      });

      if (response.ok) {
        setShowProfileModal(false);
        // Refresh user data in context
        const updatedUser = await response.json();
        // You might need to update the context here
        fetchDashboardData(); // Refresh data
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const filteredOrders = orders.filter(order =>
    order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.orderStatus.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'orders', icon: ShoppingBag, label: 'Orders' },
    { id: 'products', icon: Package, label: 'Products' },
    { id: 'customers', icon: Users, label: 'Customers' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-6 flex items-center justify-between border-b border-gray-800">
          {sidebarOpen && <h1 className="text-xl font-bold">Meubeltroom</h1>}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg mb-2 transition ${
                  activeTab === item.id 
                    ? 'bg-yellow-600 text-white' 
                    : 'hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-yellow-600"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
                  className="relative p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>

                {showNotificationsDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                    <div className="p-4 border-b">
                      <h3 className="text-lg font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification, idx) => (
                          <div
                            key={idx}
                            className="p-4 border-b hover:bg-gray-50 cursor-pointer"
                            onClick={async () => {
                              try {
                                const token = localStorage.getItem('token');
                                await fetch(`https://decohaven-mr5s.onrender.com/api/admin/notifications/${notification.id}/view`, {
                                  method: 'PUT',
                                  headers: { Authorization: `Bearer ${token}` }
                                });
                                fetchDashboardData(); // Refresh notifications
                              } catch (error) {
                                console.error('Error marking notification as viewed:', error);
                              }
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">{notification.title}</p>
                                <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {notification.createdAt ? new Date(notification.createdAt).toLocaleDateString() : 'Just now'}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          No notifications
                        </div>
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="p-3 border-t">
                        <button className="w-full text-sm text-yellow-600 hover:text-yellow-700">
                          View All Notifications
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-3 pl-4 border-l">
                <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{user?.name || 'Admin User'}</p>
                  <p className="text-xs text-gray-500">{user?.email || 'admin@meubel.com'}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-lg">Loading...</div>
            </div>
          ) : activeTab === 'dashboard' ? (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`${stat.color} p-3 rounded-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-green-600 text-sm font-medium">{stat.change}</span>
                      </div>
                      <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  );
                })}
              </div>

              {/* Charts and Tables Row */}
              <div className="grid lg:grid-cols-3 gap-6 mb-8">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border">
                  <div className="p-6 border-b flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Recent Orders</h2>
                    <button className="text-sm text-yellow-600 hover:text-yellow-700">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {filteredOrders.slice(0, 5).map((order) => (
                          <tr key={order._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium">{order._id.slice(-8)}</td>
                            <td className="px-6 py-4 text-sm">{order.user?.name || 'N/A'}</td>
                            <td className="px-6 py-4 text-sm">
                              {order.items?.map(item => item.product?.name).join(', ') || 'N/A'}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium">
                              Rs. {order.items?.reduce((sum, item) => sum + (item.product?.price * item.quantity), 0)?.toLocaleString('en-IN') || 0}.00
                            </td>
                            <td className="px-6 py-4">
                              <select
                                value={order.orderStatus}
                                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                className={`px-2 py-1 text-xs font-medium rounded-full border-0 ${getStatusColor(order.orderStatus)}`}
                              >
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="px-6 py-4">
                              <button className="text-gray-400 hover:text-gray-600">
                                <MoreVertical className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="p-6 border-b">
                    <h2 className="text-lg font-semibold">Top Products</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    {filteredProducts.slice(0, 4).map((product, idx) => (
                      <div key={product._id} className="flex items-center gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium mb-1">{product.name}</h4>
                          <p className="text-xs text-gray-500">Rs. {product.price.toLocaleString('en-IN')}.00</p>
                        </div>
                        <div className="text-right">
                          <button
                            onClick={() => deleteProduct(product._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : activeTab === 'orders' ? (
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">All Orders</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Products</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium">{order._id.slice(-8)}</td>
                        <td className="px-6 py-4 text-sm">{order.user?.name || 'N/A'}</td>
                        <td className="px-6 py-4 text-sm">
                          {order.items?.map(item => `${item.product?.name} (${item.quantity})`).join(', ') || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          Rs. {order.items?.reduce((sum, item) => sum + (item.product?.price * item.quantity), 0)?.toLocaleString('en-IN') || 0}.00
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={order.orderStatus}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            className={`px-2 py-1 text-xs font-medium rounded-full border-0 ${getStatusColor(order.orderStatus)}`}
                          >
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={async () => {
                              try {
                                const token = localStorage.getItem('token');
                                const response = await fetch(`https://decohaven-mr5s.onrender.com/api/orders/admin/${order._id}`, {
                                  headers: { Authorization: `Bearer ${token}` }
                                });
                                if (response.ok) {
                                  const orderDetails = await response.json();
                                  setSelectedOrder(orderDetails);
                                  setShowOrderModal(true);
                                }
                              } catch (error) {
                                console.error('Error fetching order details:', error);
                              }
                            }}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === 'products' ? (
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold">All Products</h2>
                <button onClick={handleAddProduct} className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700">
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add Product
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredProducts.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">{product.name}</td>
                        <td className="px-6 py-4 text-sm">Rs. {product.price.toLocaleString('en-IN')}.00</td>
                        <td className="px-6 py-4 text-sm">{product.category}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button onClick={() => handleEditProduct(product)} className="text-blue-500 hover:text-blue-700">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteProduct(product._id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === 'customers' ? (
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">All Customers</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium">{user.name}</td>
                        <td className="px-6 py-4 text-sm">{user.email}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium mb-2">Profile Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={user?.name || ''}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={handleEditProfile}
                      className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="text-md font-medium mb-2">System Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Email Notifications</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Order Updates</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Product Alerts</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setShowProductModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Order Details</h3>
              <button
                onClick={() => setShowOrderModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Order ID</h4>
                  <p className="text-sm font-medium">{selectedOrder._id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Date</h4>
                  <p className="text-sm">{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Customer</h4>
                  <p className="text-sm">{selectedOrder.user?.name || 'N/A'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Status</h4>
                  <select
                    value={selectedOrder.orderStatus}
                    onChange={(e) => updateOrderStatus(selectedOrder._id, e.target.value)}
                    className={`px-2 py-1 text-xs font-medium rounded-full border-0 ${getStatusColor(selectedOrder.orderStatus)}`}
                  >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <h4 className="text-lg font-medium mb-4">Customer Information</h4>
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h5 className="text-sm font-medium text-gray-500">Name</h5>
                    <p className="text-sm">
                      {selectedOrder.billingDetails ? `${selectedOrder.billingDetails.firstName} ${selectedOrder.billingDetails.lastName}` : selectedOrder.user?.name || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-500">Email</h5>
                    <p className="text-sm">{selectedOrder.billingDetails?.email || selectedOrder.user?.email || 'N/A'}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-500">Phone</h5>
                    <p className="text-sm">{selectedOrder.billingDetails?.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-500">Company</h5>
                    <p className="text-sm">{selectedOrder.billingDetails?.companyName || 'N/A'}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-500">Country</h5>
                    <p className="text-sm">{selectedOrder.billingDetails?.country || 'N/A'}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-500">Street Address</h5>
                    <p className="text-sm">{selectedOrder.billingDetails?.streetAddress || 'N/A'}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-500">City</h5>
                    <p className="text-sm">{selectedOrder.billingDetails?.city || 'N/A'}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-500">Province</h5>
                    <p className="text-sm">{selectedOrder.billingDetails?.province || 'N/A'}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-500">ZIP Code</h5>
                    <p className="text-sm">{selectedOrder.billingDetails?.zipCode || 'N/A'}</p>
                  </div>
                  <div className="col-span-2">
                    <h5 className="text-sm font-medium text-gray-500">Additional Information</h5>
                    <p className="text-sm">{selectedOrder.billingDetails?.additionalInfo || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="text-lg font-medium mb-4">Order Items</h4>
                <div className="space-y-4">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                        src={item.product?.image}
                        alt={item.product?.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium">{item.product?.name}</h5>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-sm text-gray-600">Price: Rs. {item.product?.price?.toLocaleString('en-IN')}.00</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Rs. {(item.product?.price * item.quantity)?.toLocaleString('en-IN')}.00</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Total Amount:</span>
                  <span className="text-xl font-bold">
                    Rs. {selectedOrder.items?.reduce((sum, item) => sum + (item.product?.price * item.quantity), 0)?.toLocaleString('en-IN')}.00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

