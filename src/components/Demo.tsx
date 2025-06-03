import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, AlertCircle, ChevronDown } from 'lucide-react';
import { QuestionCategory } from '../types';
import Vapi from '@vapi-ai/web';

const Demo = () => {
  const [activeTab, setActiveTab] = useState('questions');
  const [isCallActive, setIsCallActive] = useState(false);
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  useEffect(() => {
    const vapiInstance = new Vapi("a74aeeee-0668-4269-8b7f-f249f24fa303");
    setVapi(vapiInstance);

    return () => {
      if (vapiInstance) {
        vapiInstance.stop();
      }
    };
  }, []);
  
  const questionCategories: QuestionCategory[] = [
    {
      title: "Lead Qualification & Booking",
      emoji: "🎯",
      description: "Shows how the assistant captures leads, filters intent, and handles missed call scenarios.",
      questions: [
        "Can you take my name and number if I want to book an appointment?",
        "I'm not sure what kind of therapy I need — what's the first step?",
        "Can you check if there are appointments next week for new clients?",
        "I've called a few times and no one answered — can you help me now?"
      ]
    },
    {
      title: "Automation Value",
      emoji: "🤖",
      description: "Reveals how much admin time and manual explanation the assistant can eliminate.",
      questions: [
        "What types of questions can you help with automatically?",
        "Do you know what services are offered without me speaking to someone?",
        "Can you send me a link to book online?",
        "Can you explain the difference between counselling and psychotherapy?"
      ]
    },
    {
      title: "Client Experience Simulation",
      emoji: "🧠",
      description: "Simulates emotional client scenarios and shows how the assistant maintains calm, helpful tone.",
      questions: [
        "I'm feeling overwhelmed and don't know where to start — can you guide me?",
        "Do you have someone who works with teens dealing with anxiety?",
        "Can you tell me what to expect on the first visit?",
        "What should I bring to my first appointment?"
      ]
    },
    {
      title: "After-Hours Handling",
      emoji: "⏰",
      description: "Highlights 24/7 coverage and reassurance to potential clients calling after hours.",
      questions: [
        "Is anyone available to talk right now?",
        "Can you get someone to call me back tomorrow?",
        "It's late — can I still book or leave a message?"
      ]
    },
    {
      title: "Boundary Testing",
      emoji: "🛑",
      description: "Shows how well the assistant avoids clinical advice and stays compliant while being helpful.",
      questions: [
        "How much will my treatment cost exactly?",
        "Can you tell me what diagnosis I might have?",
        "Should I see a psychologist or a counsellor?"
      ]
    }
  ];

  const handleCallStart = async () => {
    if (!vapi || isCallActive) return;
    
    try {
      setIsCallActive(true);
      await vapi.start({
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en-US",
        },
        model: {
          provider: "openai",
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `⚡️ This is a demo VAPI agent.
It's here to show what's possible. The final version will be fully customized to your business—tone, answers, booking flow, everything. It'll understand your services, speak like your brand, and only offer available time slots from your calendar.

You control what it says and how it works.

Provide direct answers to questions. Be helpful and concise.

Key Functions:
1. Lead Qualification & Booking:
- Collect contact details (name, phone) for callbacks
- Ask about preferred contact times
- Explain the initial consultation process
- Note that specific appointment times need therapist confirmation

2. Service Information:
- Explain our therapy services (counseling, psychotherapy, CBT)
- Describe the differences between therapy types
- Share session duration (50 minutes) and frequency options
- Mention we have both in-person and online options

3. First Visit Guidance:
- Explain the initial assessment process
- Mention what to bring (ID, payment method, relevant medical info)
- Describe the therapy center environment
- Reassure about confidentiality

4. Crisis & After-Hours:
- For urgent support, provide crisis helpline numbers
- Take messages for next-day callback
- Explain emergency procedures

Important Guidelines:
- Never provide clinical advice or diagnoses
- Don't quote exact prices (say we'll discuss during callback)
- Maintain professional, warm, and reassuring tone
- Always offer to take contact details for follow-up
- For clinical questions, note they'll be discussed with the therapist

Location: Central London (fictional address)
Hours: Monday-Friday 9am-8pm, Saturday 9am-5pm`
            },
          ],
        },
        voice: {
          provider: "deepgram",
          voiceId: "stella"
        },
        name: "Acorn Therapy Assistant",
      });

      vapi.on("call-end", () => {
        setIsCallActive(false);
      });

      vapi.on("error", (error) => {
        console.error("Call error:", error);
        setIsCallActive(false);
      });
    } catch (error) {
      console.error("Failed to start call:", error);
      setIsCallActive(false);
    }
  };

  const handleCallEnd = () => {
    if (vapi && isCallActive) {
      vapi.stop();
      setIsCallActive(false);
    }
  };

  return (
    <section id="demo-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Try the Demo
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience how our AI assistant handles client calls and inquiries
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Tab navigation for mobile */}
            <div className="flex md:hidden">
              <button
                onClick={() => setActiveTab('call')}
                className={`flex-1 py-4 text-center font-medium ${
                  activeTab === 'call' 
                    ? 'bg-teal-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Call Demo
              </button>
              <button
                onClick={() => setActiveTab('questions')}
                className={`flex-1 py-4 text-center font-medium ${
                  activeTab === 'questions' 
                    ? 'bg-teal-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Sample Questions
              </button>
            </div>
            
            {/* Left side (Call section) */}
            <div className={`md:w-1/2 p-8 ${activeTab === 'call' ? 'block' : 'hidden md:block'}`}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-teal-100 mb-6">
                  <Phone className="h-10 w-10 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Call Our AI Assistant
                </h3>
                <p className="text-gray-600 mb-8">
                  Experience firsthand how our AI phone assistant handles client inquiries with professionalism and empathy.
                </p>
                <button 
                  onClick={isCallActive ? handleCallEnd : handleCallStart}
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md ${
                    isCallActive 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-teal-500 hover:bg-teal-600 text-white'
                  }`}
                >
                  <Phone className="h-5 w-5" />
                  <span className="font-medium">
                    {isCallActive ? 'End Call' : 'Start Call'}
                  </span>
                </button>
              </div>
              
              <div className="mt-12 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold block text-gray-800 mb-1">Note:</span>
                    This is a demo version only. It's designed to show how AI can support real client needs, not replace clinical conversations.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right side (Questions section) */}
            <div className={`md:w-1/2 bg-blue-50 p-8 ${activeTab === 'questions' ? 'block' : 'hidden md:block'}`}>
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="h-6 w-6 text-teal-600" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Sample Questions to Ask
                </h3>
              </div>
              
              <div className="space-y-4">
                {questionCategories.map((category, index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                    <button
                      onClick={() => setActiveCategory(activeCategory === category.title ? null : category.title)}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{category.emoji}</span>
                        <span className="font-medium text-gray-800">{category.title}</span>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                          activeCategory === category.title ? 'transform rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    {activeCategory === category.title && (
                      <div className="px-4 pb-4">
                        <p className="text-sm text-gray-600 mb-4 pt-2 border-t border-gray-100">
                          {category.description}
                        </p>
                        <div className="space-y-3">
                          {category.questions.map((question, qIndex) => (
                            <div
                              key={qIndex}
                              className="p-3 bg-blue-50 rounded-lg text-gray-700 hover:bg-blue-100 transition-colors duration-200"
                            >
                              "{question}"
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;