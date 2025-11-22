// ... (Previous imports and components)

const PRIMARY_COLOR = 'indigo-700';
const SECONDARY_COLOR = 'amber-600';

export default function Footer() {
  return (
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
              {/* ... Links content ... */}
            </div>
          </div>

          {/* 3. Help Section (Unchanged) */}
          <div>
            <h4 className={`text-lg font-bold mb-5 text-${PRIMARY_COLOR} uppercase tracking-wider`}>
              Help & Support
            </h4>
            <div className="flex flex-col gap-3">
              {/* ... Help content ... */}
            </div>
          </div>

          {/* 4. Newsletter Section (FIXED FOR RESPONSIVENESS) */}
          <div className="lg:col-span-1 space-y-4">
            <h4 className={`text-lg font-bold mb-5 text-${PRIMARY_COLOR} uppercase tracking-wider`}>
              Stay Connected
            </h4>
            <p className="text-sm text-gray-600 mb-4">
                Subscribe for 10% off your first order!
            </p>
            
            {/* Newsletter Form: Using flex-col (default for mobile) and adding w-full */}
            <form className="flex flex-col sm:flex-row gap-3"> 
                <div className="relative flex-1 w-full"> 
                    <input
                      type="email"
                      placeholder="Enter Your Email"
                      // Removed w-full from input as flex-1 handles it in flex row
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-${SECONDARY_COLOR} focus:border-${SECONDARY_COLOR} transition outline-none"
                      aria-label="Email address for newsletter"
                      required
                    />
                    <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-${PRIMARY_COLOR}`} />
                </div>
                
                {/* Button: Use w-full on mobile, then shrink on sm:flex-row */}
                <button 
                  type="submit" 
                  className={`w-full sm:w-auto px-6 bg-${SECONDARY_COLOR} hover:bg-amber-700 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.01]`}
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
