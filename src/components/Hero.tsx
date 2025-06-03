import React from 'react';
import { Phone, ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo-section');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            AI Phone Assistant Demo
            <span className="block text-indigo-500 mt-2">Balance Physio & Acupuncture</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience how our AI assistant helps manage client calls and inquiries while we focus on providing exceptional care to our patients.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-12">
          <button 
            onClick={scrollToDemo}
            className="px-8 py-4 bg-indigo-500 text-white rounded-full flex items-center gap-2 hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Phone className="h-5 w-5" />
            <span className="font-medium">Try the Demo</span>
          </button>
          
          <button 
            onClick={scrollToDemo}
            className="px-8 py-4 bg-white text-indigo-600 border border-indigo-500 rounded-full flex items-center gap-2 hover:bg-gray-50 transition-all duration-300"
          >
            <ArrowDown className="h-5 w-5" />
            <span className="font-medium">Learn More</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero