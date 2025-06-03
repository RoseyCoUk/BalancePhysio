import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, AlertCircle, ChevronDown } from 'lucide-react';
import { QuestionCategory } from '../types';
import Vapi from '@vapi-ai/web';

const Demo = () => {
  const [activeTab, setActiveTab] = useState('questions');
  const [isCallActive, setIsCallActive] = useState(false);
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showSpeakNotification, setShowSpeakNotification] = useState(false);
  
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
      title: "Treatment Information",
      emoji: "🏥",
      description: "Learn about our physiotherapy and acupuncture services.",
      questions: [
        "What treatments do you offer?",
        "How long is a typical session?",
        "What's the difference between physiotherapy and acupuncture?",
        "Do you treat lower back pain?"
      ]
    },
    {
      title: "Booking & Pricing",
      emoji: "📅",
      description: "Get information about appointments and fees.",
      questions: [
        "How much does a physiotherapy session cost?",
        "Can I book an appointment for next week?",
        "Do you offer combined physio and acupuncture treatments?",
        "What happens in the first consultation?"
      ]
    },
    {
      title: "Location & Availability",
      emoji: "📍",
      description: "Find out about our clinic location and hours.",
      questions: [
        "Where is your clinic located?",
        "What are your opening hours?",
        "Is parking available?",
        "Do you offer evening appointments?"
      ]
    },
    {
      title: "Treatment Specifics",
      emoji: "🔍",
      description: "Details about specific conditions and treatments.",
      questions: [
        "Can you help with sciatica?",
        "Do you treat sports injuries?",
        "What should I wear to my appointment?",
        "How many sessions might I need?"
      ]
    }
  ];

  const handleCallStart = async () => {
    if (!vapi || isCallActive) return;
    
    try {
      setIsCallActive(true);
      setShowSpeakNotification(true);
      
      setTimeout(() => {
        setShowSpeakNotification(false);
      }, 5000);

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

You are the AI assistant for Balance Physiotherapy & Acupuncture in Manchester.

Location: 1a Clarendon Road, Swinton, Manchester, M27 4BP, UK
Phone: 07783 670275
Email: balance.acup.physio@gmail.com

Services & Pricing:
- Initial Physiotherapy Consultation (1 hr) - £55
- Follow-Up Physiotherapy (30 min) - £40
- Acupuncture Treatment (1 hr) - £50
- Combined Physio & Acupuncture (1 hr) - £60
- Relaxation & Tension Relief (1 hr) - £45

We treat:
- Lower back pain
- Neck and shoulder tension
- Joint pain and mobility issues
- Sports injuries
- Chronic fatigue
- Stress and anxiety
- Women's health concerns
- Sciatica and nerve pain
- Posture-related discomfort

Key Functions:
1. Appointment Booking:
- Collect contact details for callbacks
- Explain consultation process
- Note that specific times need practitioner confirmation

2. Service Information:
- Explain treatments and differences
- Share session durations and prices
- Describe what to expect
- Mention both assessment and treatment options

3. First Visit Guidance:
- Explain initial assessment
- Advise on clothing (loose, comfortable)
- Describe clinic location and parking
- Discuss payment methods

4. After-Hours:
- Take messages for next-day callback
- Provide emergency guidance if needed
- Explain booking process

Guidelines:
- Be professional yet warm
- Always offer to take contact details
- Don't provide clinical advice
- Maintain a caring, supportive tone
- For urgent pain, suggest GP or NHS 111

Provide direct answers to questions. Be helpful and concise.`
            },
          ],
        },
        voice: {
          provider: "11labs",
          voiceId: "ZF6FPAbjXT4488VcRRnw"
        },
        name: "Balance Physio Assistant",
      });

      vapi.on("call-end", () => {
        setIsCallActive(false);
        setShowSpeakNotification(false);
      });

      vapi.on("error", (error) => {
        console.error("Call error:", error);
        setIsCallActive(false);
        setShowSpeakNotification(false);
      });
    } catch (error) {
      console.error("Failed to start call:", error);
      setIsCallActive(false);
      setShowSpeakNotification(false);
    }
  };

  const handleCallEnd = () => {
    if (vapi && isCallActive) {
      vapi.stop();
      setIsCallActive(false);
      setShowSpeakNotification(false);
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
            Experience how our AI assistant handles client inquiries and appointment requests
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
                    ? 'bg-indigo-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Call Demo
              </button>
              <button
                onClick={() => setActiveTab('questions')}
                className={`flex-1 py-4 text-center font-medium ${
                  activeTab === 'questions' 
                    ? 'bg-indigo-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Sample Questions
              </button>
            </div>
            
            {/* Left side (Call section) */}
            <div className={`md:w-1/2 p-8 ${activeTab === 'call' ? 'block' : 'hidden md:block'}`}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-indigo-100 mb-6">
                  <Phone className="h-10 w-10 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Call Our AI Assistant
                </h3>
                <p className="text-gray-600 mb-8">
                  Experience how our AI phone assistant handles treatment inquiries and booking requests.
                </p>
                {showSpeakNotification && (
                  <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg">
                    Please start speaking to begin the conversation
                  </div>
                )}
                <button 
                  onClick={isCallActive ? handleCallEnd : handleCallStart}
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md ${
                    isCallActive 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-indigo-500 hover:bg-indigo-600 text-white'
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
                    This is a demo version. It shows how AI can support client communication while maintaining our high standards of care.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right side (Questions section) */}
            <div className={`md:w-1/2 bg-indigo-50 p-8 ${activeTab === 'questions' ? 'block' : 'hidden md:block'}`}>
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="h-6 w-6 text-indigo-600" />
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
                              className="p-3 bg-indigo-50 rounded-lg text-gray-700 hover:bg-indigo-100 transition-colors duration-200"
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