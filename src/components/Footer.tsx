import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, Smartphone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/40 backdrop-blur-lg border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AppSellPoint</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Your premier destination for ready-made mobile app solutions. 
              Transform your business with our cutting-edge applications.
            </p>
            <div className="flex space-x-4">
              {/* <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors"> */}
              <a href="https://www.facebook.com/initiotechmediapvtltd"  target="_blank" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors"> */}
            <a href="https://x.com/InitioTechMedia"   target="_blank" className="text-gray-400 hover:text-blue-400 transition-colors">
    
     {/* <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-gray-400 hover:text-white"
    >
      <path d="M3 3l18 18M3 21L21 3" />
    </svg> */}

      <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1227"
      className="h-7 w-4 text-gray-400 hover:text-white"
      fill="currentColor"
    >
      <path d="M714.163 519.284 1160.89 0H1052.64L667.137 450.887 362.871 0H0L468.745 681.821 0 1226.37H108.248L515.392 744.642 837.129 1226.37H1200L714.137 519.284h.026Zm-182.729 211.79-47.506-67.92L147.704 79.805H309.44L575.97 460.726l47.506 67.92 356.059 507.31H817.799L531.434 731.074h-.026Z"/>
    </svg>
              </a>
            <a href="https://www.instagram.com/initiotechmediaofficial"  target="_blank" className="text-gray-400 hover:text-pink-400 transition-colors">
              {/* <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors"> */}
                <Instagram className="h-6 w-6" />
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors"> */}
            <a href="https://www.linkedin.com/company/initio-techmedia-pvt-ltd/?originalSubdomain=in"  target="_blank"  className="text-gray-400 hover:text-blue-600 transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/products" className="block text-gray-400 hover:text-white transition-colors">
                Products
              </Link>
              <Link to="/blog" className="block text-gray-400 hover:text-white transition-colors">
                Blog
              </Link>
              <Link to="/about" className="block text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal & Contact</h3>
            <div className="space-y-2 mb-4">
              <Link to="/privacy" className="block text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-gray-400 hover:text-white transition-colors">
                Terms & Conditions
              </Link>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@initiotechmedia.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-2" />
                <span>(+91) 9316147661</span>
              </div>
              
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 AppSellPoint. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;