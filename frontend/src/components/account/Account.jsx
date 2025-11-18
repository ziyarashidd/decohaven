import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Account() {
  const navigate = useNavigate();
  const { login, register, user, logout } = useCart();
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(loginData);
      alert('Login successful!');
      // Navigate to admin dashboard if user is admin
      if (result.user && result.user.role === 'admin') {
        navigate('/admin');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(registerData);
      alert('Registration successful!');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/account';
  };

  if (user) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Banner */}
        <div className="relative h-80 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=400&fit=crop')"}}>
          <div className="absolute inset-0 bg-opacity-60 flex flex-col items-center justify-center">
             <div className="w-18 h-14 rounded mb-2">
              <img src="a2.png" alt="" />
            </div>
            <h1 className="text-5xl font-bold mb-2">My Account</h1>
            <p className="text-sm">
              <span className="font-semibold">Home</span> <span className="mx-2">›</span> <span>My account</span>
            </p>
          </div>
        </div>

        {/* User Profile */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-8">Welcome, {user.name}!</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <p className="text-gray-600">{user.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <p className="text-gray-600 capitalize">{user.role}</p>
              </div>
            </div>
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleLogout}
                className="border-2 border-black rounded-lg px-8 py-3 hover:bg-black hover:text-white transition"
              >
                Logout
              </button>
              {user.role === 'admin' && (
                <button
                  onClick={() => navigate('/admin')}
                  className="bg-yellow-600 text-white rounded-lg px-8 py-3 hover:bg-yellow-700 transition"
                >
                  Admin Dashboard
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-80 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=400&fit=crop')"}}>
        <div className="absolute inset-0 bg-opacity-60 flex flex-col items-center justify-center">
           <div className="w-18 h-14 rounded mb-2">
            <img src="a2.png" alt="" />
          </div>
          <h1 className="text-5xl font-bold mb-2">My Account</h1>
          <p className="text-sm">
            <span className="font-semibold">Home</span> <span className="mx-2">›</span> <span>My account</span>
          </p>
        </div>
      </div>

      {/* Login and Register Forms */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {error && (
          <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12">
          {/* Log In Section */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Log In</h2>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600"
                />
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-yellow-600 cursor-pointer"
                />
                <label htmlFor="remember" className="text-sm cursor-pointer">
                  Remember me
                </label>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="border-2 border-black rounded-lg px-12 py-3 hover:bg-black hover:text-white transition disabled:opacity-50"
                >
                  {loading ? 'Logging In...' : 'Log In'}
                </button>
                <button className="text-sm hover:text-yellow-600">
                  Lost Your Password?
                </button>
              </div>
            </form>
          </div>

          {/* Register Section */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Register</h2>

            <form onSubmit={handleRegister} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600"
                />
              </div>

              {/* Email address */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600"
                />
              </div>

              {/* Description Text */}
              <div className="text-sm text-gray-600 leading-relaxed">
                <p className="mb-4">
                  Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <span className="font-semibold text-black">privacy policy</span>.
                </p>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className="border-2 border-black rounded-lg px-12 py-3 hover:bg-black hover:text-white transition disabled:opacity-50"
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>
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