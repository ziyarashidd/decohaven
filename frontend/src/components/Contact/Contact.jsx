import React, { useState } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function Contact() {
  const { user } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-80 bg-cover bg-center" style={{backgroundImage: "url('/logoback.jpg')"}}>
        <div className="absolute inset-0  bg-opacity-60 flex flex-col items-center justify-center">
          <div className="w-18 h-14 rounded mb-2">
            <img src="a2.png" alt="" />
          </div>
          <h1 className="text-5xl font-bold mb-2">Contact</h1>
          <p className="text-sm">
            <span className="font-semibold">Home</span> <span className="mx-2">›</span> <span>Contact</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header Text */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Get In Touch With Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
          </p>
          {user && (
            <div className="mt-8">
              <a
                href="/myorders"
                className="inline-block bg-yellow-600 text-white px-8 py-3 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                My Orders
              </a>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side - Contact Info */}
          <div className="space-y-8">
            {/* Address */}
            <div className="flex gap-4">
              <MapPin className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Address</h3>
                <p className="text-gray-600">
                  236 5th SE Avenue, New<br />
                  York NY10000, United<br />
                  States
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <Phone className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Phone</h3>
                <p className="text-gray-600">
                  Mobile: +(84) 546-6789<br />
                  Hotline: +(84) 456-6789
                </p>
              </div>
            </div>

            {/* Working Time */}
            <div className="flex gap-4">
              <Clock className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Working Time</h3>
                <p className="text-gray-600">
                  Monday-Friday: 9:00 -<br />
                  22:00<br />
                  Saturday-Sunday: 9:00 -<br />
                  21:00
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div>
            <div className="space-y-6">
              {/* Your name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Abc"
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
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Abc@def.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="This is an optional"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi! I'd like to ask about"
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full md:w-auto px-12 py-3 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors duration-300"
              >
                Submit
              </button>
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