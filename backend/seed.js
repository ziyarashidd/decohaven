const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');
require('dotenv').config();

const products = [
  {
    name: 'Asgaard sofa',
    price: 250000,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop',
    description: 'The Asgaard sofa is a masterpiece of comfort and style. With its plush cushions and sturdy frame, it provides the perfect spot for relaxation. The leather upholstery adds a touch of elegance, while the modular design allows for customization to fit your space.',
    thumbnails: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=150&h=150&fit=crop'
    ]
  },
  {
    name: 'Trenton modular sofa_3',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop',
    description: 'The Trenton modular sofa offers versatility and comfort. Its modular pieces can be arranged in various configurations to suit your living space. The neutral color palette makes it easy to match with any decor.',
    thumbnails: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=150&h=150&fit=crop'
    ]
  },
  {
    name: 'Granite dining table with dining chair',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=600&h=600&fit=crop',
    description: 'This granite dining table set combines durability and style. The solid granite top provides a sturdy surface for meals, while the accompanying chairs offer comfortable seating for family gatherings.',
    thumbnails: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=150&h=150&fit=crop'
    ]
  },
  {
    name: 'Outdoor bar table and stool',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aed79?w=600&h=600&fit=crop',
    description: 'Perfect for outdoor entertaining, this bar table and stool set is weather-resistant and stylish. The compact design makes it ideal for patios, balconies, or small outdoor spaces.',
    thumbnails: [
      'https://images.unsplash.com/photo-1600210491892-03d54c0aed79?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=150&h=150&fit=crop'
    ]
  },
  {
    name: 'Plain console with teak mirror',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=600&h=600&fit=crop',
    description: 'The plain console with teak mirror adds a touch of sophistication to any room. The clean lines and natural wood finish create a timeless look that complements various interior styles.',
    thumbnails: [
      'https://images.unsplash.com/photo-1503602642458-232111445657?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aed79?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop'
    ]
  },
  {
    name: 'Modern armchair',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop',
    description: 'This modern armchair combines sleek design with ultimate comfort. The ergonomic shape provides excellent support for reading or relaxing, while the minimalist aesthetic fits seamlessly into contemporary interiors.',
    thumbnails: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=150&h=150&fit=crop'
    ]
  },
  {
    name: 'Wooden bookshelf',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
    description: 'A sturdy wooden bookshelf that adds both functionality and style to your space. With multiple shelves for organizing books, decor, and personal items, it\'s perfect for creating a cozy reading nook.',
    thumbnails: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=150&h=150&fit=crop'
    ]
  },
  {
    name: 'Floor lamp',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
    description: 'This elegant floor lamp provides ambient lighting for any room. The adjustable height and warm light make it perfect for reading corners or living room accents.',
    thumbnails: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aed79?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop'
    ]
  },
  {
    name: 'Coffee table',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop',
    description: 'A sleek coffee table that serves as both a functional piece and a statement in your living room. The glass top and metal frame create a modern, sophisticated look.',
    thumbnails: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=150&h=150&fit=crop'
    ]
  },
  {
    name: 'Bedroom nightstand',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=600&h=600&fit=crop',
    description: 'This compact nightstand provides storage and surface space next to your bed. With a drawer for essentials and a clean design, it complements any bedroom decor.',
    thumbnails: [
      'https://images.unsplash.com/photo-1503602642458-232111445657?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aed79?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop'
    ]
  },
  {
    name: 'Dining chair set',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=600&h=600&fit=crop',
    description: 'A set of four comfortable dining chairs with upholstered seats and sturdy wooden frames. Perfect for completing your dining room setup with style and comfort.',
    thumbnails: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=150&h=150&fit=crop'
    ]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'https://decohaven-mr5s.onrender.com');

    // Seed products
    await Product.deleteMany({});
    const seededProducts = await Product.insertMany(products);

    // Create admin user
    await User.deleteMany({ role: 'admin' });
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@meubel.com',
      password: 'admin123',
      role: 'admin'
    });
    await adminUser.save();

    // Create sample customers
    await User.deleteMany({ role: 'user' });
    const customers = [
      { name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'user' },
      { name: 'Jane Smith', email: 'jane@example.com', password: 'password123', role: 'user' },
      { name: 'Bob Johnson', email: 'bob@example.com', password: 'password123', role: 'user' },
      { name: 'Alice Brown', email: 'alice@example.com', password: 'password123', role: 'user' },
      { name: 'Charlie Wilson', email: 'charlie@example.com', password: 'password123', role: 'user' }
    ];
    const seededCustomers = await User.insertMany(customers);

    // Create sample orders
    await Order.deleteMany({});
    const orders = [
      {
        user: seededCustomers[0]._id,
        items: [
          { product: seededProducts[0]._id, quantity: 1, price: seededProducts[0].price },
          { product: seededProducts[1]._id, quantity: 2, price: seededProducts[1].price }
        ],
        status: 'Completed',
        totalAmount: seededProducts[0].price + (seededProducts[1].price * 2)
      },
      {
        user: seededCustomers[1]._id,
        items: [
          { product: seededProducts[2]._id, quantity: 1, price: seededProducts[2].price },
          { product: seededProducts[3]._id, quantity: 1, price: seededProducts[3].price }
        ],
        status: 'Processing',
        totalAmount: seededProducts[2].price + seededProducts[3].price
      },
      {
        user: seededCustomers[2]._id,
        items: [
          { product: seededProducts[4]._id, quantity: 3, price: seededProducts[4].price }
        ],
        status: 'Pending',
        totalAmount: seededProducts[4].price * 3
      },
      {
        user: seededCustomers[3]._id,
        items: [
          { product: seededProducts[5]._id, quantity: 1, price: seededProducts[5].price },
          { product: seededProducts[6]._id, quantity: 1, price: seededProducts[6].price },
          { product: seededProducts[7]._id, quantity: 2, price: seededProducts[7].price }
        ],
        status: 'Completed',
        totalAmount: seededProducts[5].price + seededProducts[6].price + (seededProducts[7].price * 2)
      },
      {
        user: seededCustomers[4]._id,
        items: [
          { product: seededProducts[8]._id, quantity: 1, price: seededProducts[8].price }
        ],
        status: 'Cancelled',
        totalAmount: seededProducts[8].price
      }
    ];
    await Order.insertMany(orders);

    console.log('Database seeded successfully with admin user, sample customers, and orders');
    console.log('Admin credentials: admin@meubel.com / admin123');
    console.log(`Seeded ${seededProducts.length} products, ${seededCustomers.length} customers, and ${orders.length} orders`);
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

