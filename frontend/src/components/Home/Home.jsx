import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ShoppingCart, Star } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

// Define the core color palette
const PRIMARY_COLOR = 'indigo-700'; // Dark Blue/Indigo for main elements
const SECONDARY_COLOR = 'amber-600'; // Warm Amber for accents/buttons

const heroSlides = [
  {
    title: 'OFFICE FURNITURE, & PORTA CABIN',
    subtitle: 'ALL YOUR NEED',
    description: 'Discover premium furniture, electronics, and building materials crafted to elevate your spaces, combining smart functionality, lasting quality, and contemporary design for every project.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop',
    bgColor: 'bg-gradient-to-br from-indigo-700 to-indigo-900', // Deep Indigo Gradient
    buttonColor: 'bg-white text-indigo-700 hover:bg-gray-100',
  },
  {
    title: 'LUXURY COMFORT SOFA COLLECTION',
    subtitle: 'PREMIUM QUALITY',
    description: 'Experience ultimate comfort with our handcrafted sofas. Designed with precision and style, perfect for modern living spaces that demand elegance and functionality.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
    bgColor: 'bg-gradient-to-br from-blue-700 to-blue-900', // Deep Blue Gradient
    buttonColor: 'bg-white text-blue-700 hover:bg-gray-100',
  },
  {
    title: 'MODERN DINING FURNITURE',
    subtitle: 'ELEGANT DESIGN',
    description: 'Transform your dining space with our contemporary furniture collection. Combining aesthetics with durability for memorable family gatherings.',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=600&fit=crop',
    bgColor: 'bg-gradient-to-br from-teal-600 to-teal-800', // Teal Gradient
    buttonColor: 'bg-white text-teal-600 hover:bg-gray-100',
  },
  {
    title: 'PREMIUM BEDROOM COLLECTION',
    subtitle: 'SLEEP IN STYLE',
    description: 'Create your dream bedroom with our luxurious furniture collection. Designed for comfort, style, and peaceful nights.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop',
    bgColor: 'bg-gradient-to-br from-purple-700 to-purple-900', // Deep Purple Gradient
    buttonColor: 'bg-white text-purple-700 hover:bg-gray-100',
  },
  {
    title: 'WORKSPACE SOLUTIONS',
    subtitle: 'WORK SMART',
    description: 'Boost productivity with our ergonomic office furniture. Designed for professionals who value comfort and efficiency.',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=600&fit=crop',
    bgColor: 'bg-gradient-to-br from-slate-700 to-slate-900', // Dark Slate Gradient
    buttonColor: 'bg-white text-slate-700 hover:bg-gray-100',
  }
];

export default function Home() {
  const navigate = useNavigate();
  const { products } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const topPicks = products.slice(0, 4).map(product => ({
    id: product.id || product._id,
    name: product.name,
    price: `Rs. ${product.price.toLocaleString()}.00`,
    img: product.image,
    rating: product.rating || 4.5, // Added dummy rating for appeal
  }));

  const handleProductClick = (productId) => {
    navigate(`/productdetail/${productId}`);
  };

  const blogs = [
    {
      title: 'Going all-in with millennial design',
      img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      date: '22 Oct 2022',
      category: 'Furniture'
    },
    {
      title: 'Exploring new ways of decorating',
      img: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=300&fit=crop',
      date: '28 Oct 2022',
      category: 'Handmade'
    },
    {
      title: 'Handmade pieces that took time to make',
      img: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop',
      date: '15 Nov 2022',
      category: 'Wood'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Banner Slider - Enhanced */}
      <section className="relative w-full h-[550px] overflow-hidden shadow-xl">
        <div 
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ 
          transform: `translateX(-${currentSlide * 100}%)`,
          willChange: 'transform'
        }}
        >
          {heroSlides.map((slide, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-full h-full relative"
            >
              {/* Background with Premium Gradient */}
              <div className={`absolute inset-0 w-full h-full ${slide.bgColor}`}>
                {/* Decorative Pattern - Subtle and modern */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full transform translate-x-32 -translate-y-32 blur-sm"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-white opacity-5 rounded-full transform -translate-x-32 translate-y-32 blur-sm"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center z-20">
                <div className="max-w-7xl mx-auto px-8 w-full">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Text */}
                    <div className="text-white space-y-6">
                      <p className="text-sm md:text-md font-extrabold tracking-[0.3em] uppercase text-amber-300">
                        {slide.subtitle}
                      </p>
                      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
                        {slide.title}
                      </h1>
                      <div className={`w-20 h-1 bg-${SECONDARY_COLOR}`}></div>
                      <p className="text-sm md:text-base leading-relaxed opacity-90 max-w-lg pb-4">
                        {slide.description}
                      </p>
                      <button className={`px-10 py-3 font-semibold text-lg rounded-full transition-all duration-300 transform hover:scale-105 ${slide.buttonColor}`}
                        onClick={() => navigate('/shop')}
                      >
                        Shop Collection
                      </button>
                    </div>

                    {/* Right Side - Product Image - More stylized */}
                    <div className="relative hidden md:flex justify-center items-center h-full py-10">
                      
                      {/* Main Product Image Container */}
                      <div className="relative w-80 h-96">
                          <div className={`absolute inset-0 bg-${SECONDARY_COLOR} opacity-20 rounded-xl transform -rotate-6 translate-x-2 translate-y-2`}></div>
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="relative w-full h-full object-cover rounded-xl shadow-2xl transform hover:scale-[1.03] transition-transform duration-500"
                          />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Sleeker design */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 p-3 rounded-full transition-all duration-300 shadow-lg z-30"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 p-3 rounded-full transition-all duration-300 shadow-lg z-30"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Dots Indicator - More pronounced active state */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 transition-all duration-300 ${
                currentSlide === idx ? `bg-${SECONDARY_COLOR} w-8 rounded-full` : 'bg-white/50 w-2 rounded-full'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Categories/Side Banners - Refined look */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500">
            <img
              src="https://images.unsplash.com/photo-1503602642458-232111445657?w=800&h=800&fit=crop"
              alt="Elegant Side Table"
              className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-8 text-white transition duration-500 group-hover:bg-black/40">
                <h3 className="text-3xl font-bold mb-2 drop-shadow-md">Small Wonders</h3>
                <button 
                    className="flex items-center text-lg font-semibold hover:text-amber-300 transition"
                    onClick={() => navigate('/shop?category=side_tables')}
                >
                    Explore Side Tables <ChevronRight className="w-5 h-5 ml-1" />
                </button>
            </div>
          </div>
          <div className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500">
            <img
              src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&h=800&fit=crop"
              alt="Comfort Sofa"
              className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
            />
             <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-8 text-white transition duration-500 group-hover:bg-black/40">
                <h3 className="text-3xl font-bold mb-2 drop-shadow-md">Ultimate Comfort</h3>
                <button 
                    className="flex items-center text-lg font-semibold hover:text-amber-300 transition"
                    onClick={() => navigate('/shop?category=sofas')}
                >
                    View Sofa Collection <ChevronRight className="w-5 h-5 ml-1" />
                </button>
            </div>
          </div>
        </div>
      </section>

      {/* Top Picks - Product Cards Enhanced */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className={`text-4xl font-extrabold text-${PRIMARY_COLOR} text-center mb-4`}>Top Picks For You</h2>
          <p className="text-center text-lg text-gray-600 mb-12">Handpicked for your perfect living space.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {topPicks.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden" 
                onClick={() => handleProductClick(item.id)}
              >
                <div className="relative">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-60 object-cover"
                    />
                    <div className={`absolute top-0 right-0 m-3 px-3 py-1 text-xs font-bold rounded-full bg-${SECONDARY_COLOR} text-white`}>
                        NEW
                    </div>
                </div>
                <div className="p-4 text-left">
                    <h4 className="font-semibold text-lg mb-1 truncate">{item.name}</h4>
                    <div className="flex items-center mb-2">
                        <span className="flex text-yellow-400">
                            {Array.from({ length: 5 }, (_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'fill-yellow-400' : 'text-gray-300'}`} />
                            ))}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">({item.rating})</span>
                    </div>
                    <p className={`text-xl font-bold text-${PRIMARY_COLOR}`}>{item.price}</p>
                    <button className={`mt-3 w-full flex items-center justify-center bg-gray-100 text-${PRIMARY_COLOR} border border-gray-200 py-2 rounded-lg hover:bg-${PRIMARY_COLOR} hover:text-white transition duration-300`}>
                        <ShoppingCart className="w-5 h-5 mr-2" /> Quick View
                    </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button 
              className={`text-xl font-semibold border-b-2 border-${SECONDARY_COLOR} text-${PRIMARY_COLOR} py-2 px-4 transition hover:bg-${SECONDARY_COLOR} hover:text-white rounded`} 
              onClick={() => navigate('/shop')}
            >
                View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Asgaard Sofa Banner - Premium Promotion */}
      <section className={`bg-${PRIMARY_COLOR} py-24`}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left text-white">
            <p className="text-lg mb-2 text-amber-300 font-medium uppercase tracking-widest">New Arrivals</p>
            <h2 className="text-5xl font-extrabold mb-6 leading-tight">The Asgaard Sofa</h2>
            <p className="text-gray-300 mb-8 max-w-md">Experience timeless design and superior craftsmanship with our new Asgaard Sofa. Limited stock available.</p>
            <button className={`bg-${SECONDARY_COLOR} text-white px-10 py-3 font-semibold text-lg rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-amber-700 shadow-xl`}>
              Order Now
            </button>
          </div>
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop"
              alt="Asgaard sofa"
              className="w-full max-w-lg object-cover rounded-xl shadow-2xl transition duration-500 hover:rotate-1 hover:scale-[1.02]"
            />
          </div>
        </div>
      </section>

      {/* Blog Section - Card Design */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className={`text-4xl font-extrabold text-${PRIMARY_COLOR} text-center mb-4`}>Our Latest Reads</h2>
          <p className="text-center text-lg text-gray-600 mb-12">Inspiration and insights from the world of design.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((blog, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 overflow-hidden">
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5 text-left">
                  <h4 className="text-xl font-bold mb-3 hover:text-amber-600 transition cursor-pointer">{blog.title}</h4>
                  <p className="text-sm text-gray-500 mb-4 font-medium">
                    <span className={`text-${SECONDARY_COLOR} font-bold`}>{blog.date}</span> • {blog.category}
                  </p>
                  <button className={`flex items-center gap-2 font-semibold text-${PRIMARY_COLOR} hover:text-${SECONDARY_COLOR} transition`}>
                    Read More <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className={`text-xl font-semibold border-b-2 border-${SECONDARY_COLOR} text-${PRIMARY_COLOR} py-2 px-4 transition hover:bg-${SECONDARY_COLOR} hover:text-white rounded`}>
                <Link to="/about">View All Posts</Link> 
            </button>
          </div>
        </div>
      </section>

      {/* Instagram Section - Simple and clean CTA */}
      <section className="py-16 bg-gray-100 text-center border-t border-b border-gray-200">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">#InteriorGoals on Instagram</h2>
        <p className="text-lg text-gray-600 mb-8">Follow our store on Instagram for daily dose of design inspiration!</p>
        <button className={`bg-${SECONDARY_COLOR} text-white px-10 py-3 rounded-full shadow-lg font-semibold hover:bg-amber-700 hover:shadow-xl transition transform hover:scale-105`}>
          Follow Us 
        </button>
      </section>
    </div>
  );
}
