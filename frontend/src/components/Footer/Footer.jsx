import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';

const PRIMARY_COLOR = 'indigo-700'; // Primary text color
const SECONDARY_COLOR = 'amber-600'; // Accent color

export default function Footer() {
  return (
    // Footer Container - Light background for contrast
    <footer className="bg-gray-50 border-t border-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-12">
          
          {/* 1. Address / Brand Info (Unchanged) */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className={`text-3xl font-extrabold text-${PRIMARY_COLOR} tracking-wider`}>
              YOUR <span className={`text-${SECONDARY_COLOR}`}>STORE</span>
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              400 University Drive Suite 200, Coral Gables, FL 33134 USA
            </p>
          </div>

          {/* 2. Links Section (Unchanged) */}
          <div>
            <h4 className={`text-lg font-bold mb-5 text-${PRIMARY_COLOR} uppercase tracking-wider`}>
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              <Link to="/" className={`text-gray-600 hover:text-${SECONDARY_COLOR} transition flex items-center`}>
                <ArrowRight className="w-4 h-4 mr-2 opacity-0 hover:opacity-100 transition-opacity"/> Home
              </Link>
              <Link to="/shop" className={`text-gray-600 hover:text-${SECONDARY_COLOR} transition flex items-center`}>
                <ArrowRight className="w-4 h-4 mr-2 opacity-0 hover:opacity-100 transition-opacity"/> Shop
              </Link>
              <Link to="/about" className={`text-gray-600 hover:text-${SECONDARY_COLOR} transition flex items-center`}>
                <ArrowRight className="w-4 h-4 mr-2 opacity-0 hover:opacity-100 transition-opacity"/> About
              </Link>
              <Link to="/contact" className={`text-gray-600 hover:text-${SECONDARY_COLOR} transition flex items-center`}>
                <ArrowRight className="w-4 h-4 mr-2 opacity-0 hover:opacity-100 transition-opacity"/> Contact
              </Link>
            </div>
          </div>

          {/* 3. Help Section (Unchanged) */}
          <div>
            <h4 className={`text-lg font-bold mb-5 text-${PRIMARY_COLOR} uppercase tracking-wider`}>
              Help & Support
            </h4>
            <div className="flex flex-col gap-3">
              <Link to="#" className={`text-gray-600 hover:text-${SECONDARY_COLOR} transition flex items-center`}>
                <ArrowRight className="w-4 h-4 mr-2 opacity-0 hover:opacity-100 transition-opacity"/> Payment Options
              </Link>
              <Link to="#" className={`text-gray-600 hover:text-${SECONDARY_COLOR} transition flex items-center`}>
                <ArrowRight className="w-4 h-4 mr-2 opacity-0 hover:opacity-100 transition-opacity"/> Shipping & Returns
              </Link>
              <Link to="#" className={`text-gray-600 hover:text-${SECONDARY_COLOR} transition flex items-center`}>
                <ArrowRight className="w-4 h-4 mr-2 opacity-0 hover:opacity-100 transition-opacity"/> Privacy Policy
              </Link>
              <Link to="#" className={`text-gray-600 hover:text-${SECONDARY_COLOR} transition flex items-center`}>
                <ArrowRight className="w-4 h-4 mr-2 opacity-0 hover:opacity-100 transition-opacity"/> FAQs
              </Link>
            </div>
          </div>

          {/* 4. Newsletter Section (FIXED: Using flexible row layout for desktop) */}
          <div className="lg:col-span-1 space-y-4">
            <h4 className={`text-lg font-bold mb-5 text-${PRIMARY_COLOR} uppercase tracking-wider`}>
              Stay Connected
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe for 10% off your first order!
            </p>
            
            {/* FIX: Using flex-col by default for full width stacking on mobile.
              Using sm:flex-row to make it inline on wider mobile/tablet screens.
            */}
            <form className="flex flex-col sm:flex-row gap-3">
              
              {/* Input Field (takes most of the space on row layout) */}
              <div className="relative flex-1"> 
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  // Ensure w-full is inside flex-1 to utilize space correctly
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-${SECONDARY_COLOR} focus:border-${SECONDARY_COLOR} transition outline-none"
                  aria-label="Email address for newsletter"
                  required
                />
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-${PRIMARY_COLOR}`} />
              </div>
              
              {/* Button (Use w-full for stacking, then w-auto for inline to prevent overflow) */}
              <button 
                type="submit" 
                className={`w-full sm:w-auto px-6 bg-${SECONDARY_COLOR} hover:bg-amber-700 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex-shrink-0`}
                // flex-shrink-0 ensures the button keeps its size and doesn't get squished
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Separator and Copyright (Unchanged) */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Your Store Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
