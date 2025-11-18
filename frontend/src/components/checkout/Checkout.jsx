import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'India',
    streetAddress: '',
    city: '',
    province: '',
    zipCode: '',
    phone: '',
    email: '',
    additionalInfo: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('bank');

  const handleChange = (e) => {
    setBillingDetails({
      ...billingDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const orderData = {
        items: cartItems.map(item => ({
          product: item.id || item._id,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: subtotal,
        shippingAddress: {
          street: billingDetails.streetAddress,
          city: billingDetails.city,
          state: billingDetails.province,
          zipCode: billingDetails.zipCode,
          country: billingDetails.country
        },
        billingDetails: {
          firstName: billingDetails.firstName,
          lastName: billingDetails.lastName,
          companyName: billingDetails.companyName,
          country: billingDetails.country,
          streetAddress: billingDetails.streetAddress,
          city: billingDetails.city,
          province: billingDetails.province,
          zipCode: billingDetails.zipCode,
          phone: billingDetails.phone,
          email: billingDetails.email,
          additionalInfo: billingDetails.additionalInfo
        }
      };

      const response = await fetch('https://decohaven-mr5s.onrender.com/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        alert('Order placed successfully!');
        // Clear cart after successful order
        clearCart();
        // Redirect to home or orders page
        navigate('/');
      } else {
        const error = await response.json();
        alert(`Order failed: ${error.message}`);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    }
  };

  const subtotal = getCartTotal();
  const total = subtotal;

  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString('en-IN')}.00`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-64 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&h=400&fit=crop')"}}>
        <div className="absolute inset-0  bg-opacity-60 flex flex-col items-center justify-center">
           <div className="w-18 h-14 rounded mb-2">
            <img src="a2.png" alt="" />
          </div>
          <h1 className="text-5xl font-bold mb-2">Checkout</h1>
          <p className="text-sm">
            <span className="font-semibold">Home</span> <span className="mx-2">›</span> <span>Checkout</span>
          </p>
        </div>
      </div>

      {/* Checkout Form */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Billing Details */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Billing details</h2>
            
            <div className="space-y-6">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={billingDetails.firstName}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={billingDetails.lastName}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600"
                  />
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={billingDetails.companyName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600"
                />
              </div>

              {/* Country / Region */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Country / Region *
                </label>
                <select
                  name="country"
                  value={billingDetails.country}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600 bg-white"
                >
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                </select>
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Street address *
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  value={billingDetails.streetAddress}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600"
                />
              </div>

              {/* Town / City */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Town / City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={billingDetails.city}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600"
                />
              </div>

              {/* Province */}
              <div>
                <label className="block text-sm font-medium mb-2">Province</label>
                <select
                  name="province"
                  value={billingDetails.province}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600 bg-white"
                >
                  <option value="">Select a province</option>
                  <option value="Western Province">Western Province</option>
                  <option value="Central Province">Central Province</option>
                  <option value="Southern Province">Southern Province</option>
                </select>
              </div>

              {/* ZIP Code */}
              <div>
                <label className="block text-sm font-medium mb-2">ZIP code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={billingDetails.zipCode}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={billingDetails.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={billingDetails.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600"
                />
              </div>

              {/* Additional Information */}
              <div>
                <input
                  type="text"
                  name="additionalInfo"
                  placeholder="Additional information"
                  value={billingDetails.additionalInfo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600"
                />
              </div>
            </div>
          </div>

          {/* Right - Order Summary */}
          <div>
            <div className="space-y-6">
              {/* Product Details */}
              <div className="space-y-4">
                <div className="flex justify-between text-lg font-semibold pb-4 border-b">
                  <span>Product</span>
                  <span>Subtotal</span>
                </div>
                
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex justify-between items-center text-gray-600">
                    <span>{item.name} <span className="text-black font-medium">× {item.quantity}</span></span>
                    <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}

                <div className="flex justify-between items-center pt-4 border-t">
                  <span>Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between items-center text-lg pt-4 border-t">
                  <span>Total</span>
                  <span className="text-2xl font-bold text-yellow-600">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="pt-6 border-t space-y-4">
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    id="bank"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1 accent-black"
                  />
                  <label htmlFor="bank" className="flex-1 cursor-pointer">
                    <span className="font-medium block mb-2">Direct Bank Transfer</span>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                    </p>
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="cod"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-black"
                  />
                  <label htmlFor="cod" className="font-medium cursor-pointer">
                    Cash On Delivery
                  </label>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed pt-4">
                  Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <span className="font-semibold text-black">privacy policy</span>.
                </p>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                className="w-full border-2 border-black hover:bg-black hover:text-white rounded-lg py-4 text-lg transition mt-6"
              >
                Place order
              </button>
            </div>
          </div>
          </div>
        </form>
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

