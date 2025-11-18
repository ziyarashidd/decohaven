import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString('en-IN')}.00`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Border */}
      <div className="h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400"></div>

      {/* Cart Header */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <div className="relative">
            <ShoppingBag className="w-8 h-8 text-gray-600" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </div>
        </div>

        <div className="border-t border-b py-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id || item._id} className="flex items-center gap-4 pb-6 border-b last:border-b-0">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-amber-50 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-2">{item.name}</h3>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">{item.quantity}</span>
                      <span className="text-sm text-gray-400">X</span>
                      <span className="text-yellow-600 font-medium">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item)}
                    className="w-8 h-8 rounded-full bg-gray-400 hover:bg-gray-500 flex items-center justify-center transition"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Subtotal */}
        {cartItems.length > 0 && (
          <>
            <div className="flex justify-between items-center py-6">
              <span className="text-lg">Subtotal</span>
              <span className="text-xl font-semibold text-yellow-600">
                {formatPrice(calculateSubtotal())}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Link to="/viewfulcart" className="flex-1 border-2 border-black rounded-full py-3 px-6 hover:bg-black hover:text-white transition text-center">
                View Cart
              </Link>
              <button className="flex-1 border-2 border-black rounded-full py-3 px-6 hover:bg-black hover:text-white transition text-center">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}