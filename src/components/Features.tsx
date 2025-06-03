import React from 'react';
import { Clock, Calendar, Phone, FileText, Award, Settings } from 'lucide-react';
import { Feature } from '../types';

const Features = () => {
  const features: Feature[] = [
    {
      icon: <Clock className="h-8 w-8 text-indigo-500" />,
      title: "24/7 Availability",
      description: "Handle appointment inquiries and provide service information any time, day or night."
    },
    {
      icon: <FileText className="h-8 w-8 text-indigo-500" />,
      title: "Treatment Information",
      description: "Explain our physiotherapy and acupuncture services to potential clients."
    },
    {
      icon: <Calendar className="h-8 w-8 text-indigo-500" />,
      title: "Appointment Booking",
      description: "Help schedule appointments and manage booking inquiries efficiently."
    },
    {
      icon: <Phone className="h-8 w-8 text-indigo-500" />,
      title: "Always Available",
      description: "Never miss a call, even during treatment sessions."
    },
    {
      icon: <Settings className="h-8 w-8 text-indigo-500" />,
      title: "Smart Automation",
      description: "Save time by automating responses to common questions about services and pricing."
    },
    {
      icon: <Award className="h-8 w-8 text-indigo-500" />,
      title: "Professional Care",
      description: "Maintain high standards of service even when handling automated responses."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            How Our AI Assistant Can Help
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enhancing patient care by managing inquiries intelligently while we focus on treatments
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-indigo-50 rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};