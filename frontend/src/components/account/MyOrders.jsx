import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { ordersAPI } from '../../api';

export default function MyOrders() {
  const { user } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userOrders = await ordersAPI.getUserOrders();
        setOrders(userOrders);
      } catch (error) {
        setError('Failed to load orders');
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return 'text-yellow-600 bg-yellow-100';
      case 'shipped':
        return 'text-blue-600 bg-blue-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to view your orders</h2>
          <a href="/account" className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-80 bg-cover bg-center" style={{backgroundImage: "url('/logoback.jpg')"}}>
        <div className="absolute inset-0 bg-opacity-60 flex flex-col items-center justify-center">
          <div className="w-18 h-14 rounded mb-2">
            <img src="a2.png" alt="" />
          </div>
          <h1 className="text-5xl font-bold mb-2">My Orders</h1>
          <p className="text-sm">
            <span className="font-semibold">Home</span> <span className="mx-2">›</span> <span>My Orders</span>
          </p>
        </div>
      </div>

      {/* Orders Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {error && (
          <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold mb-4">No orders found</h2>
            <p className="text-gray-600 mb-8">You haven't placed any orders yet.</p>
            <a href="/shop" className="bg-yellow-600 text-white px-8 py-3 rounded-lg hover:bg-yellow-700">
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold mb-8">Your Orders ({orders.length})</h2>

            {orders.map((order) => (
              <div key={order._id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Order #{order._id.slice(-8)}</h3>
                    <p className="text-gray-600 text-sm">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Items:</h4>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.product.image || '/placeholder.jpg'}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-600">Total Amount:</p>
                      <p className="text-2xl font-bold">Rs.{order.totalAmount.toFixed(2)}</p>
                    </div>
                    {order.shippingAddress && (
                      <div className="text-right">
                        <p className="text-gray-600 text-sm">Shipping Address:</p>
                        <p className="text-sm">
                          {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-amber-50 py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">Free Delivery</h3>
            <p className="text-gray-600 text-sm">For all orders over $50, consectetur adipiscing elit.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">90 Days Return</h3>
            <p className="text-gray-600 text-sm">If goods have problems, consectetur adipiscing elit.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
            <p className="text-gray-600 text-sm">100% secure payment, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
