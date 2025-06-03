import React from 'react';
import { Leaf, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-teal-400" />
            <span className="font-semibold text-xl text-white">
              Acorn Therapy Centre
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm">
            <a href="#" className="hover:text-teal-300 transition-colors duration-200">
              Home
            </a>
            <a href="#" className="hover:text-teal-300 transition-colors duration-200">
              About Us
            </a>
            <a href="#" className="hover:text-teal-300 transition-colors duration-200">
              Services
            </a>
            <a href="#" className="hover:text-teal-300 transition-colors duration-200">
              Resources
            </a>
            <a href="#" className="hover:text-teal-300 transition-colors duration-200">
              Contact
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Acorn Therapy Centre. All rights reserved.
          </p>
          
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-pink-500" fill="currentColor" />
            <span>for better mental health</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;