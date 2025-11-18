import React, { useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Home() {
  const navigate = useNavigate();
  const { products } = useCart();

  const topPicks = products.slice(0, 4).map(product => ({
    id: product.id || product._id,
    name: product.name,
    price: `Rs. ${product.price.toLocaleString()}.00`,
    img: product.image
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
    <>
      {/* Hero Section */}
      <section className="bg-amber-50 py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-4">Rocket single seater</h1>
            <button className="text-lg underline hover:text-yellow-600">Shop Now</button>
          </div>
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=400&fit=crop"
              alt="Rocket single seater"
              className="w-full max-w-md object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Side Tables */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=400&fit=crop"
              alt="Side table"
              className="w-full h-80 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2">Side table</h3>
            <button className="underline hover:text-yellow-600">View More</button>
          </div>
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop"
              alt="Side table"
              className="w-full h-80 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2">Side table</h3>
            <button className="underline hover:text-yellow-600">View More</button>
          </div>
        </div>
      </section>

      {/* Top Picks */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Top Picks For You</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {topPicks.map((item, idx) => (
              <div key={idx} className="text-center cursor-pointer" onClick={() => handleProductClick(item.id)}>
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-60 object-cover rounded-lg mb-4"
                />
                <h4 className="font-medium mb-2">{item.name}</h4>
                <p className="text-lg font-semibold">{item.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="underline text-lg hover:text-yellow-600" onClick={() => navigate('/shop')}>View More</button>
          </div>
        </div>
      </section>

      {/* Asgaard Sofa Banner */}
      <section className="bg-amber-50 py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop"
              alt="Asgaard sofa"
              className="w-full max-w-lg object-cover rounded-lg"
            />
          </div>
          <div className="text-center md:text-left">
            <p className="text-lg mb-2">New Arrivals</p>
            <h2 className="text-4xl font-bold mb-6">Asgaard sofa</h2>
            <button className="border-2 border-black px-8 py-3 hover:bg-black hover:text-white transition">
              Order Now
            </button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Blogs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((blog, idx) => (
              <div key={idx} className="text-center">
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h4 className="text-xl font-medium mb-2">{blog.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{blog.date} • {blog.category}</p>
                <button className="underline hover:text-yellow-600 flex items-center gap-2 mx-auto">
                  Read More <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="underline text-lg hover:text-yellow-600">View All Post</button>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-16 bg-amber-50 text-center">
        <h2 className="text-4xl font-bold mb-4">Our Instagram</h2>
        <p className="text-gray-600 mb-6">Follow our store on Instagram</p>
        <button className="bg-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition">
          Follow Us
        </button>
      </section>
    </>
  );
}
