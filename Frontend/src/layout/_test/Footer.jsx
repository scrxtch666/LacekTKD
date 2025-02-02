import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content wrapper */}
      <div className="flex-grow">
        {/* Your main content goes here */}
      </div>
      
      <footer className="bg-white dark:bg-customBlack text-black w-full border-t border-gray-200 dark:border-gray-600">
        <div className="mx-auto w-full max-w-screen-xl p-6 py-6 lg:py-8">
          <h3 className="text-customWhite font-bold opacity-45 flex justify-center">SPONZOŘI</h3>
          
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              {/* Carousel content */}
              <div id="animation-carousel" className="relative w-full" data-carousel="static">
                {/* Carousel buttons */}
                <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                    </svg>
                    <span className="sr-only">Previous</span>
                  </span>
                </button>
                <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="sr-only">Next</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
          
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © {currentYear} <a href="https://flowbite.com/" className="hover:underline font-bold">scrxtch</a>. All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              {/* Social media links */}
              <a href="https://www.facebook.com/profile.php?id=100063625778484" target="_blank" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                  <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd"/>
                </svg>
                <span className="sr-only">Facebook page</span>
              </a>
              {/* Add other social media links similarly */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;