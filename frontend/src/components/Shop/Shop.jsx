import React, { useState, useEffect } from 'react';
import { Grid, List, SlidersHorizontal, Heart, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Shop() {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('default');
  const navigate = useNavigate();
  const { addToCart, toggleLike, isLiked, products, user } = useCart();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const shopProducts = filteredProducts;

  const handleProductClick = (productId) => {
    navigate(`/productdetail/${productId}`);
  };

  const handleLike = (productId) => {
    const product = shopProducts.find(p => p.id === productId || p._id === productId);
    if (product) {
      toggleLike(product);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-80 bg-cover bg-center" style={{ backgroundImage: "url('/logoback.jpg')" }}>
        <div className="absolute inset-0  bg-opacity-50 flex flex-col items-center justify-center">
           <div className="w-18 h-14 rounded mb-2">
            <img src="a2.png" alt="" />
          </div>
          <h1 className="text-5xl font-bold mb-2">Shop</h1>
          <p className="text-sm">
            <span className="font-semibold">Home</span> <span className="mx-2">›</span> <span>Shop</span>
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-amber-50 py-4 border-y">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 hover:text-yellow-600">
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filter</span>
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`${viewMode === 'grid' ? 'text-yellow-600' : ''} hover:text-yellow-600`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`${viewMode === 'list' ? 'text-yellow-600' : ''} hover:text-yellow-600`}
            >
              <List className="w-5 h-5" />
            </button>
            <span className="text-sm border-l pl-6">Showing 1-16 of 32 results</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm">Show</label>
              <select className="border px-3 py-2 bg-white">
                <option>16</option>
                <option>32</option>
                <option>48</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm">Sort by</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border px-3 py-2 bg-white"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {shopProducts.map((product) => (
            <div key={product.id || product._id} className="group relative">
              <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-100 cursor-pointer" onClick={() => handleProductClick(product.id || product._id)}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Like Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(product.id || product._id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition"
                >
                  <Heart
                    className={`w-5 h-5 ${isLiked(product.id || product._id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                  />
                </button>
              </div>
              <h3 className="font-medium mb-2 text-sm">{product.name}</h3>
              <p className="text-lg font-semibold">Rs. {product.price.toLocaleString()}</p>
              {/* Add to Cart Button */}
              {user ? (
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full mt-2 flex items-center justify-center gap-2 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              ) : (
                <button
                  className="w-full mt-2 flex items-center justify-center gap-2 bg-gray-100 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed"
                  disabled
                >
                  <ShoppingCart className="w-4 h-4" />
                  Login to Add to Cart
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <button className="px-4 py-2 bg-amber-100 rounded hover:bg-amber-200">1</button>
          <button className="px-4 py-2 bg-amber-50 rounded hover:bg-amber-100">2</button>
          <button className="px-4 py-2 bg-amber-50 rounded hover:bg-amber-100">3</button>
          <button className="px-4 py-2 bg-amber-50 rounded hover:bg-amber-100">Next</button>
        </div>
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