import React from 'react';
import { Search } from 'lucide-react';

export default function About() {
  const blogPosts = [
    {
      img: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&h=400&fit=crop',
      title: 'Going all-in with millennial design',
      date: '14 Oct 2022',
      category: 'Wood'
    },
    {
      img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop',
      title: 'Exploring new ways of decorating',
      date: '14 Oct 2022',
      category: 'Handmade'
    },
    {
      img: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600&h=400&fit=crop',
      title: 'Handmade pieces that took time to make',
      date: '14 Oct 2022',
      category: 'Wood'
    }
  ];

  const recentPosts = [
    {
      img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=100&h=100&fit=crop',
      title: 'Going all-in with millennial design',
      date: '03 Aug 2022'
    },
    {
      img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop',
      title: 'Exploring new ways of decorating',
      date: '03 Aug 2022'
    },
    {
      img: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=100&h=100&fit=crop',
      title: 'Handmade pieces that took time to make',
      date: '03 Aug 2022'
    },
    {
      img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop',
      title: 'Modern home in Milan',
      date: '03 Aug 2022'
    },
    {
      img: 'https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=100&h=100&fit=crop',
      title: 'Colorful office redesign',
      date: '03 Aug 2022'
    }
  ];

  const categories = [
    { name: 'Crafts', count: 2 },
    { name: 'Design', count: 8 },
    { name: 'Handmade', count: 7 },
    { name: 'Interior', count: 1 },
    { name: 'Wood', count: 6 }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-80 bg-cover bg-center" style={{backgroundImage: "url('/logoback.jpg')"}}>
        <div className="absolute inset-0  bg-opacity-60 flex flex-col items-center justify-center">
           <div className="w-18 h-14 rounded mb-2">
            <img src="a2.png" alt="" />
          </div>
          <h1 className="text-5xl font-bold mb-2">Blog</h1>
          <p className="text-sm">
            <span className="font-semibold">Home</span> <span className="mx-2">›</span> <span>Blog</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Blog Posts */}
          <div className="md:col-span-2">
            {blogPosts.map((post, idx) => (
              <article key={idx} className="mb-12">
                <img 
                  src={post.img}
                  alt={post.title}
                  className="w-full h-96 object-cover rounded-lg mb-6"
                />
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>👤 Admin</span>
                  <span>📅 {post.date}</span>
                  <span>🏷️ {post.category}</span>
                </div>
                <h2 className="text-3xl font-semibold mb-4">{post.title}</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.
                </p>
                <button className="underline font-medium hover:text-yellow-600">
                  Read more
                </button>
              </article>
            ))}

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-12">
              <button className="px-4 py-2 bg-amber-100 rounded hover:bg-amber-200">1</button>
              <button className="px-4 py-2 bg-amber-50 rounded hover:bg-amber-100">2</button>
              <button className="px-4 py-2 bg-amber-50 rounded hover:bg-amber-100">3</button>
              <button className="px-4 py-2 bg-amber-50 rounded hover:bg-amber-100">Next</button>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Search */}
            <div className="mb-8">
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Search..."
                  className="w-full border rounded-lg px-4 py-3 pr-12 outline-none focus:border-yellow-600"
                />
                <Search className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6">Categories</h3>
              <div className="space-y-4">
                {categories.map((cat, idx) => (
                  <div key={idx} className="flex justify-between items-center text-gray-600">
                    <span className="hover:text-yellow-600 cursor-pointer">{cat.name}</span>
                    <span className="text-sm">{cat.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Posts */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Recent Posts</h3>
              <div className="space-y-4">
                {recentPosts.map((post, idx) => (
                  <div key={idx} className="flex gap-4 cursor-pointer group">
                    <img 
                      src={post.img}
                      alt={post.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium mb-1 group-hover:text-yellow-600 leading-tight">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500">{post.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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