import React from 'react';

const FooterTest = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-black text-gray-300 py-8">
    <div className="container mx-auto px-4">
      <h2 className="text-center text-gray-400 uppercase text-sm font-medium mb-4">SPONZOŘI</h2>
      <div className="border-t border-gray-800 my-4"></div>
      <div className="flex flex-col md:flex-row justify-between items-center mt-6">
        <div className="text-sm mb-4 md:mb-0">© {new Date().getFullYear()} scratch All Rights Reserved.</div>
        <div className="flex space-x-4">
          <Link href="#" className="text-gray-400 hover:text-white transition-colors">
           
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white transition-colors">
           
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white transition-colors">
          
            
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white transition-colors">
           
          
          </Link>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default FooterTest;