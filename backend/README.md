# E-commerce Backend

Backend API for the e-commerce application built with Node.js, Express.js, and MongoDB.

## Features

- User authentication (register, login)
- Product management
- Shopping cart functionality
- Order processing
- JWT-based authentication

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env` file:
   ```
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

3. Start MongoDB locally or update MONGODB_URI to your MongoDB connection string.

4. Seed the database with sample products:
   ```bash
   npm run seed
   ```

5. Start the server:
   ```bash
   npm run dev  # for development with nodemon
   npm start    # for production
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires auth)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart
- `GET /api/cart` - Get user's cart (requires auth)
- `POST /api/cart` - Add item to cart (requires auth)
- `PUT /api/cart/:productId` - Update cart item quantity (requires auth)
- `DELETE /api/cart/:productId` - Remove item from cart (requires auth)
- `DELETE /api/cart` - Clear cart (requires auth)

### Orders
- `POST /api/orders` - Create order (requires auth)
- `GET /api/orders` - Get user's orders (requires auth)
- `GET /api/orders/:id` - Get single order (requires auth)

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests
