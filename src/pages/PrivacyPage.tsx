import React from 'react';
import { Shield, Eye, Lock, Database, UserCheck, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPage = () => {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Personal information you provide when creating an account or making a purchase',
        'Payment information processed securely through our payment partners',
        'Usage data and analytics to improve our services',
        'Communication preferences and support interactions'
      ]
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'To process your orders and deliver purchased products',
        'To provide customer support and respond to inquiries',
        'To send important updates about your purchases and account',
        'To improve our products and services based on usage patterns'
      ]
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: [
        'All data is encrypted in transit and at rest using industry-standard protocols',
        'Payment information is processed through PCI-compliant payment processors',
        'Regular security audits and vulnerability assessments',
        'Access controls and authentication measures for our systems'
      ]
    },
    {
      icon: UserCheck,
      title: 'Your Rights',
      content: [
        'Access and review your personal information',
        'Request corrections to inaccurate data',
        'Delete your account and associated data',
        'Opt-out of marketing communications at any time'
      ]
    }
  ];

  return (
    <div className="pt-16">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-300 text-lg">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-8">
          <div className="flex items-start mb-6">
            <AlertCircle className="h-6 w-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Last Updated</h2>
              <p className="text-gray-300">
                This Privacy Policy was last updated on January 15, 2024. We may update this policy 
                from time to time, and we will notify you of any significant changes.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-4">
                  <section.icon className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              </div>
              
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start text-gray-300">
                    <span className="text-blue-400 mr-3 mt-2">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">Third-Party Services</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              We use trusted third-party services to provide our platform functionality:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3">•</span>
                <span><strong>PayPal:</strong> For secure payment processing (subject to PayPal's privacy policy)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3">•</span>
                <span><strong>Analytics Services:</strong> To understand how our platform is used and improve user experience</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3">•</span>
                <span><strong>Email Services:</strong> To send transactional emails and important updates</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">Cookies and Tracking</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              We use cookies and similar technologies to enhance your experience on our platform:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3">•</span>
                <span><strong>Essential Cookies:</strong> Required for basic site functionality and security</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3">•</span>
                <span><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3">•</span>
                <span><strong>Preference Cookies:</strong> Remember your settings and preferences</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>
          <p className="text-gray-300 mb-4">
            If you have any questions about this Privacy Policy or how we handle your data, please contact us:
          </p>
          <div className="space-y-2 text-gray-300">
            <p><strong>Email:</strong> contact@initiotechmedia.com</p>
            <p><strong>Phone:</strong> (+91) 9316147661</p>
            <p><strong>Address:</strong>  908, B Square 2, Ambli Rd, near Hotel Double tree Hilton, Vikram Nagar, Ahmedabad, Gujarat 380054</p>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default PrivacyPage;