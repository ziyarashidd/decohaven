import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div>
          <p className="text-gray-600">
            400 University Drive Suite 200 Coral<br />
            Gables,<br />
            FL 33134 USA
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-gray-400">Links</h4>
          <div className="flex flex-col gap-3">
            <Link to="/" className="hover:text-yellow-600">Home</Link>
            <Link to="/shop" className="hover:text-yellow-600">Shop</Link>
            <Link to="/about" className="hover:text-yellow-600">About</Link>
            <Link to="/contact" className="hover:text-yellow-600">Contact</Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-gray-400">Help</h4>
          <div className="flex flex-col gap-3">
            <Link to="#" className="hover:text-yellow-600">Payment Options</Link>
            <Link to="#" className="hover:text-yellow-600">Returns</Link>
            <Link to="#" className="hover:text-yellow-600">Privacy Policies</Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-gray-400">Newsletter</h4>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="border-b border-black px-2 py-1 flex-1 outline-none"
            />
            <button className="underline font-semibold hover:text-yellow-600">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t text-center text-gray-600">
        <p>© 2022 Meubeltroom. All rights reserved</p>
      </div>
    </footer>
  );
}
