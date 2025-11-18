import React, { useState } from 'react';
import { ShoppingCart, User, Search, Menu, X, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [likesOpen, setLikesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems, removeFromCart, getCartTotal, getCartCount, likedItems, removeFromLikes, getLikedCount, user, logout } = useCart();

  const formatPrice = (price) => {
    if (price === undefined || price === null) return 'Rs. 0.00';
    return `Rs. ${price.toLocaleString('en-IN')}.00`;
  };

  const handleSearch = () => {
    // For now, just close the modal and clear the search query
    setSearchQuery('');
    setSearchOpen(false);
  };

  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo Left */}
        <div className="flex items-center">
          <img
            src="logo.png"
            alt="DecoHaven"
            className="w-[350px] h-auto m-[-25%] object-contain"
          />
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-yellow-600">Home</Link>
          <Link to="/shop" className="hover:text-yellow-600">Shop</Link>
          <Link to="/about" className="hover:text-yellow-600">About</Link>
          <Link to="/contact" className="hover:text-yellow-600">Contact</Link>
          <Link to="/myorders" className="hover:text-yellow-600">My Orders</Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-6">
          <Link to="/admin">
            <span className="text-sm hover:text-yellow-600">Admin</span>
          </Link>
          <Link to="/account">
            <User className="w-5 h-5 cursor-pointer hover:text-yellow-600" />
          </Link>
          <Search className="w-5 h-5 cursor-pointer hover:text-yellow-600" onClick={() => setSearchOpen(!searchOpen)} />
          <div className="relative">
            <Heart
              className="w-5 h-5 cursor-pointer hover:text-yellow-600"
              onClick={() => setLikesOpen(!likesOpen)}
            />
            {likedItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {getLikedCount()}
              </span>
            )}
          </div>
          <div className="relative">
            <ShoppingCart
              className="w-5 h-5 cursor-pointer hover:text-yellow-600"
              onClick={() => setCartOpen(!cartOpen)}
            />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </div>
          <Menu
            className="w-5 h-5 md:hidden cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden px-4 py-2 border-t flex flex-col gap-4">
          <Link to="/" className="hover:text-yellow-600" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/shop" className="hover:text-yellow-600" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/about" className="hover:text-yellow-600" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact" className="hover:text-yellow-600" onClick={() => setMenuOpen(false)}>Contact</Link>
        </nav>
      )}

      {/* Slide-in Cart */}
      {cartOpen && (
        <div className="fixed right-0 top-0 h-screen w-96 bg-white shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                Your cart is empty
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex gap-4">
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
                      <h3 className="font-medium mb-2">{item.name}</h3>
                      <div className="flex items-center gap-3 text-sm">
                        <span>{item.quantity}</span>
                        <span className="text-gray-400">X</span>
                        <span className="text-yellow-600 font-medium">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item)}
                      className="w-6 h-6 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center flex-shrink-0 transition"
                    >
                      <X className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-6 space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between items-center pb-4">
                <span className="text-lg">Subtotal</span>
                <span className="text-lg font-semibold text-yellow-600">
                  {formatPrice(getCartTotal())}
                </span>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <Link
                  to="/viewfulcart"
                  className="w-full border border-black rounded-full py-2.5 hover:bg-gray-50 transition block text-center"
                  onClick={() => setCartOpen(false)}
                >
                  View Cart
                </Link>
                <Link
                  to="/checkout"
                  className="w-full border border-black rounded-full py-2.5 hover:bg-gray-50 transition block text-center"
                  onClick={() => setCartOpen(false)}
                >
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md mx-4 rounded-lg shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Search Products</h2>
              <button onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 pb-6">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                onClick={handleSearch}
                className="w-full mt-4 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slide-in Likes */}
      {likesOpen && (
        <div className="fixed right-0 top-0 h-screen w-96 bg-white shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold">Liked Products</h2>
            <button onClick={() => setLikesOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Liked Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {likedItems.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                No liked products yet
              </div>
            ) : (
              <div className="space-y-6">
                {likedItems.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex gap-4">
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
                      <h3 className="font-medium mb-2">{item.name}</h3>
                      <span className="text-yellow-600 font-medium">
                        {formatPrice(item.price)}
                      </span>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromLikes(item)}
                      className="w-6 h-6 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center flex-shrink-0 transition"
                    >
                      <X className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
