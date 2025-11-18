import React, { useState, useEffect } from 'react';
import { Star, Facebook, Linkedin, Twitter, Heart } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Productdetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleLike, isLiked, products, user } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('purple');
  const [selectedSize, setSelectedSize] = useState('L');
  const [activeTab, setActiveTab] = useState('description');
  const [liked, setLiked] = useState(false);
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id) || p._id === id);
    setProduct(foundProduct);
  }, [id, products]);

  useEffect(() => {
    if (product) {
      setMainImage(product.image);
    }
  }, [product]);

  if (!product) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleLike = () => {
    toggleLike(product);
  };

  const thumbnails = product.thumbnails;

  const colors = [
    { name: 'purple', value: '#6366f1' },
    { name: 'black', value: '#000000' },
    { name: 'gold', value: '#d4af37' }
  ];

  const sizes = ['L', 'XL', 'XS'];

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4).map(p => ({
    id: p.id,
    name: p.name,
    price: `Rs. ${p.price.toLocaleString()}.00`,
    img: p.image
  }));

  const handleRelatedProductClick = (productId) => {
    navigate(`/productdetail/${productId}`);
  };

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(quantity + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };  

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-amber-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="hover:text-black cursor-pointer">Home</span>
            <span>›</span>
            <span className="hover:text-black cursor-pointer">Shop</span>
            <span>›</span>
            <span className="font-medium text-black border-l-2 border-black pl-3">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left - Images */}
          <div>
            <div className="flex gap-4">
              {/* Thumbnails */}
              <div className="flex flex-col gap-4">
                {thumbnails.map((thumb, idx) => (
                  <img
                    key={idx}
                    src={thumb}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-75 transition"
                    onClick={() => setMainImage(thumb.replace('150', '600'))}
                  />
                ))}
              </div>
              
              {/* Main Image */}
              <div className="flex-1">
                <img
                  src={mainImage || product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg bg-amber-50"
                />
              </div>
            </div>
          </div>

          {/* Right - Product Info */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-4xl font-medium">{product.name}</h1>
              <button onClick={handleLike} className="p-2">
                <Heart className={`w-6 h-6 ${isLiked(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>
            </div>
            <p className="text-2xl text-gray-600 mb-4">Rs. {product.price.toLocaleString()}</p>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-4 pb-4 border-b">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="w-5 h-5 text-gray-300" />
              </div>
              <span className="text-sm text-gray-600 border-l pl-4">5 Customer Review</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Size */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-3">Size</p>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-lg ${
                      selectedSize === size
                        ? 'bg-amber-100 border-2 border-amber-600'
                        : 'bg-amber-50 hover:bg-amber-100'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-3">Color</p>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full ${
                      selectedColor === color.name ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange('decrease')}
                  className="px-4 py-3 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-6 py-3 border-x">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange('increase')}
                  className="px-4 py-3 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              {user ? (
                <button
                  onClick={handleAddToCart}
                  className="flex-1 border-2 border-black rounded-lg px-8 py-3 hover:bg-black hover:text-white transition"
                >
                  Add To Cart
                </button>
              ) : (
                <button
                  className="flex-1 border-2 border-gray-300 rounded-lg px-8 py-3 bg-gray-100 text-gray-500 cursor-not-allowed"
                  disabled
                >
                  Login to Add to Cart
                </button>
              )}
            </div>

            {/* Additional Info */}
            <div className="border-t pt-6 space-y-3 text-sm text-gray-600">
              <div className="flex">
                <span className="w-24">SKU</span>
                <span>: SS001</span>
              </div>
              <div className="flex">
                <span className="w-24">Category</span>
                <span>: Sofas</span>
              </div>
              <div className="flex">
                <span className="w-24">Tags</span>
                <span>: Sofa, Chair, Home, Shop</span>
              </div>
              <div className="flex items-center">
                <span className="w-24">Share</span>
                <div className="flex gap-4 ml-2">
                  <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-600" />
                  <Linkedin className="w-5 h-5 cursor-pointer hover:text-blue-700" />
                  <Twitter className="w-5 h-5 cursor-pointer hover:text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Tab Headers */}
          <div className="flex justify-center gap-12 mb-8 border-b">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 text-lg ${
                activeTab === 'description'
                  ? 'font-semibold border-b-2 border-black'
                  : 'text-gray-500'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('additional')}
              className={`pb-4 text-lg ${
                activeTab === 'additional'
                  ? 'font-semibold border-b-2 border-black'
                  : 'text-gray-500'
              }`}
            >
              Additional Information
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-lg ${
                activeTab === 'reviews'
                  ? 'font-semibold border-b-2 border-black'
                  : 'text-gray-500'
              }`}
            >
              Reviews [5]
            </button>
          </div>

          {/* Tab Content */}
          <div className="text-gray-600 leading-relaxed max-w-4xl mx-auto">
            {activeTab === 'description' && (
              <div>
                <p className="mb-4">
                  Embodying the raw, wayward spirit of rock 'n' roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.
                </p>
                <p className="mb-8">
                  Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.
                </p>
                
                {/* Images */}
                <div className="grid md:grid-cols-2 gap-6">
                  <img
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=350&fit=crop"
                    alt="Product detail 1"
                    className="w-full rounded-lg bg-amber-50"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500&h=350&fit=crop"
                    alt="Product detail 2"
                    className="w-full rounded-lg bg-amber-50"
                  />
                </div>
              </div>
            )}
            {activeTab === 'additional' && (
              <p>Additional information about the product will be displayed here.</p>
            )}
            {activeTab === 'reviews' && (
              <p>Customer reviews will be displayed here.</p>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="border-t py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((product, idx) => (
              <div key={idx} className="group cursor-pointer" onClick={() => handleRelatedProductClick(product.id)}>
                <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-100">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-medium mb-2 text-sm">{product.name}</h3>
                <p className="text-lg font-semibold">{product.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="underline text-lg hover:text-yellow-600">View More</button>
          </div>
        </div>
      </div>
    </div>
  );
}