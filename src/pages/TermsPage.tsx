import React from 'react';
import { FileText, Scale, CreditCard, Download, Shield, AlertTriangle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsPage = () => {
  const sections = [
    {
      icon: Scale,
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using AppSellPoint, you accept and agree to be bound by these Terms and Conditions',
        'If you do not agree to these terms, you may not use our services',
        'We reserve the right to modify these terms at any time with notice to users',
        'Continued use of our services after changes constitutes acceptance of new terms'
      ]
    },
    {
      icon: CreditCard,
      title: 'Purchases and Payments',
      content: [
        'All purchases are final and non-refundable unless otherwise specified',
        'Prices are subject to change without notice',
        'Payment processing is handled by secure third-party providers',
        'You are responsible for all charges incurred under your account'
      ]
    },
    {
      icon: Download,
      title: 'Digital Products and Licensing',
      content: [
        'Upon purchase, you receive a non-exclusive license to use the mobile app source code',
        'You may modify and customize the code for your own commercial use',
        'Redistribution or resale of the original source code is strictly prohibited',
        'All intellectual property rights remain with AppSellPoint'
      ]
    },
    {
      icon: Shield,
      title: 'User Responsibilities',
      content: [
        'You must provide accurate and complete information when creating an account',
        'You are responsible for maintaining the security of your account credentials',
        'You agree not to use our services for any illegal or unauthorized purposes',
        'You must comply with all applicable laws and regulations in your use of our products'
      ]
    }
  ];

  return (
    <div className="pt-16">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-300 text-lg">
            Please read these terms carefully before using our services.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-8">
          <div className="flex items-start mb-6">
            <AlertTriangle className="h-6 w-6 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Important Notice</h2>
              <p className="text-gray-300">
                These Terms and Conditions were last updated on January 15, 2025. By using our services, 
                you agree to be bound by these terms. Please review them carefully.
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
          <h2 className="text-2xl font-bold text-white mb-6">Limitation of Liability</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              AppSellPoint provides digital products "as is" without any warranties, express or implied. 
              We make no guarantees about the performance, reliability, or suitability of our products 
              for any particular purpose.
            </p>
            <p>
              In no event shall AppSellPoint be liable for any indirect, incidental, special, 
              consequential, or punitive damages, including but not limited to loss of profits, 
              data, or business interruption.
            </p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">Support and Updates</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              We provide the following support for our digital products:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3">•</span>
                <span><strong>6 months of free updates:</strong> Bug fixes and minor improvements</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3">•</span>
                <span><strong>Email support:</strong> Technical assistance and installation guidance</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3">•</span>
                <span><strong>Documentation:</strong> Comprehensive guides and API references</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3">•</span>
                <span><strong>Community forum:</strong> Connect with other developers and share knowledge</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">Prohibited Uses</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              You agree not to use our products or services for:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start">
                <span className="text-red-400 mr-3">•</span>
                <span>Any illegal or unauthorized purposes</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3">•</span>
                <span>Redistributing or reselling our source code</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3">•</span>
                <span>Creating competing products or services</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3">•</span>
                <span>Reverse engineering for competitive purposes</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">Governing Law</h2>
          <p className="text-gray-300 mb-4">
            These Terms and Conditions are governed by and construed in accordance with the laws of 
            the State of California, United States. Any disputes arising from these terms shall be 
            resolved in the courts of San Francisco County, California.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
          <p className="text-gray-300 mb-4">
            If you have any questions about these Terms and Conditions, please contact us:
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

export default TermsPage;