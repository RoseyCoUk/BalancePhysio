import React from 'react';
import { Clock, Calendar, Phone, FileText, Award, Settings } from 'lucide-react';
import { Feature } from '../types';

const Features = () => {
  const features: Feature[] = [
    {
      icon: <Clock className="h-8 w-8 text-teal-500" />,
      title: "24/7 Availability",
      description: "Answer calls with empathy and professionalism any time of day or night."
    },
    {
      icon: <FileText className="h-8 w-8 text-teal-500" />,
      title: "Service Explanation",
      description: "Clearly explain therapy services and how new clients can get started."
    },
    {
      icon: <Calendar className="h-8 w-8 text-teal-500" />,
      title: "Appointment Scheduling",
      description: "Help schedule appointments or take contact details for callbacks."
    },
    {
      icon: <Phone className="h-8 w-8 text-teal-500" />,
      title: "No Missed Calls",
      description: "Ensure no call goes unanswered, even during busy hours."
    },
    {
      icon: <Settings className="h-8 w-8 text-teal-500" />,
      title: "Automation",
      description: "Save admin time by automating responses to routine questions."
    },
    {
      icon: <Award className="h-8 w-8 text-teal-500" />,
      title: "Professional Image",
      description: "Enhance your practice's professional appearance with consistent service."
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
            This smart voice agent enhances your therapy practice's client experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-blue-50 rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105"
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

export default Features;