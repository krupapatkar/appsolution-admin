import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage = () => {
  return (
    <div className="pt-16">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Get in touch with our team. We're here to help you find the perfect mobile app solution for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Get In Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="p-3 bg-blue-500/20 rounded-lg mr-4">
                  <Mail className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Email</h3>
                  <p className="text-gray-300">contact@initiotechmedia.com</p>
                  {/* <p className="text-gray-300">sales@AppSellPoint.com</p> */}
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 bg-green-500/20 rounded-lg mr-4">
                  <Phone className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Phone</h3>
                  <p className="text-gray-300">(+91) 9316147661</p>
                  {/* <p className="text-gray-300">+1 (555) 987-6543</p> */}
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 bg-purple-500/20 rounded-lg mr-4">
                  <MapPin className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Address</h3>
                  <p className="text-gray-300"> 908, B Square 2, Ambli Rd, near Hotel Double Tree Hilton</p>
                  <p className="text-gray-300">Vikram Nagar, Ahmedabad, Gujarat 380054</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 bg-orange-500/20 rounded-lg mr-4">
                  <Clock className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Business Hours</h3>
                  <p className="text-gray-300">Monday - Friday: 10:00 AM - 7:00 PM</p>
                 <p className="text-gray-300">Saturday & Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">How do I get started?</h3>
              <p className="text-gray-300">Simply browse our products, select the app that fits your needs, and complete the purchase. You'll receive download instructions immediately.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Do you offer customization?</h3>
              <p className="text-gray-300">Yes! We offer customization services for all our apps. Contact us to discuss your specific requirements and get a quote.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">What's included with purchase?</h3>
              <p className="text-gray-300">You get complete source code, documentation, installation guide, and 6 months of free updates and support.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Do you provide support?</h3>
              <p className="text-gray-300">Absolutely! We provide email support for all our customers and offer premium support packages for extended assistance.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-16">
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;