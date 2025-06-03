import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Activity 
            className={`h-8 w-8 ${isScrolled ? 'text-indigo-600' : 'text-indigo-500'}`} 
            strokeWidth={2}
          />
          <span className={`font-semibold text-xl ${isScrolled ? 'text-gray-800' : 'text-gray-700'}`}>
            Balance Physio & Acupuncture
          </span>
        </div>
        <nav>
          <button className="px-4 py-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
            Book Now
          </button>
        </nav>
      </div>
    </header>
  );
};