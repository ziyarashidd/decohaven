import React from 'react';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Viewfulcart() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const formatPrice = (price) => {
    if (price === undefined || price === null) return 'Rs. 0.00';
    return `Rs. ${price.toLocaleString('en-IN')}.00`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-80 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&h=400&fit=crop')"}}>
        <div className="absolute inset-0  bg-opacity-60 flex flex-col items-center justify-center">
           <div className="w-18 h-14 rounded mb-2">
            <img src="a2.png" alt="" />
          </div>
          <h1 className="text-5xl font-bold mb-2">Cart</h1>
          <p className="text-sm">
            <span className="font-semibold">Home</span> <span className="mx-2">›</span> <span>Cart</span>
          </p>
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items Table */}
          <div className="lg:col-span-2">
            <div className="bg-amber-50 rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-4 font-semibold bg-amber-100">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Subtotal</div>
                <div className="col-span-1"></div>
              </div>

              {/* Cart Items */}
              {cartItems.length === 0 ? (
                <div className="px-6 py-12 text-center text-gray-500">
                  Your cart is empty
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="grid grid-cols-12 gap-4 px-6 py-6 items-center border-t border-amber-200">
                    {/* Product */}
                    <div className="col-span-5 flex items-center gap-4">
                      <div className="w-20 h-20 bg-amber-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-gray-600">{item.name}</span>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-center text-gray-600">
                      {formatPrice(item.price)}
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2 flex justify-center">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item, parseInt(e.target.value) || 1)}
                        className="w-16 border border-gray-300 rounded px-3 py-2 text-center outline-none focus:border-yellow-600"
                      />
                    </div>

                    {/* Subtotal */}
                    <div className="col-span-2 text-center font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </div>

                    {/* Delete */}
                    <div className="col-span-1 flex justify-center">
                      <button
                        onClick={() => removeFromCart(item)}
                        className="text-yellow-600 hover:text-yellow-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Cart Totals */}
          <div className="lg:col-span-1">
            <div className="bg-amber-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-center mb-8">Cart Totals</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center pb-4">
                  <span className="font-medium">Subtotal</span>
                  <span className="text-gray-600">{formatPrice(getCartTotal())}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="font-medium">Total</span>
                  <span className="text-xl font-semibold text-yellow-600">
                    {formatPrice(getCartTotal())}
                  </span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full border-2 border-black rounded-lg py-3 hover:bg-black hover:text-white transition text-center block"
                disabled={cartItems.length === 0}
              >
                Check Out
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
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