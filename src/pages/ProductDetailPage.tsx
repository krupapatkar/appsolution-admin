import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Download, Play, ShoppingCart, Check, Code, Smartphone, Globe } from 'lucide-react';
import { productsAPI } from '../services/api';
import PayPalCheckout from '../components/PayPalCheckout';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log('Fetching product with ID:', id);
        const response = await productsAPI.getById(id);
        console.log('Product detail response:', response.data);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        console.error('Product ID that failed:', id);
        setProduct(null);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return (
      <div className="pt-24 pb-20 flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-96 object-cover rounded-2xl"
            />
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span className="text-white font-semibold">{product.rating}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Download className="h-4 w-4 mr-1" />
                {product.sales} sales
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {product.name}
            </h1>
            
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {product.technologies.map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-lg border border-blue-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between mb-8">
              <div className="text-4xl font-bold text-white">
                ${product.price}
              </div>
              <button
                onClick={() => setShowCheckout(true)}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 flex items-center"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
          <div className="flex border-b border-white/10">
            {[
              { id: 'overview', label: 'Overview', icon: Globe },
              { id: 'features', label: 'Features', icon: Check },
              { id: 'screenshots', label: 'Screenshots', icon: Smartphone },
              { id: 'video', label: 'Demo Video', icon: Play },
              { id: 'tech', label: 'Technical', icon: Code }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center px-6 py-4 font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'text-white bg-white/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Product Overview</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {product.fullDescription}
                </p>
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-300">
                      <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'screenshots' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Screenshots</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {product.screenshots.map((screenshot, index) => (
                    <img
                      key={index}
                      src={screenshot}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'video' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Demo Video</h3>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={product.videoUrl}
                    title="Product Demo"
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {activeTab === 'tech' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Technical Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Requirements</h4>
                    <ul className="space-y-2 text-gray-300">
                      {product.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">What's Included</h4>
                    <ul className="space-y-2 text-gray-300">
                      {product.support.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PayPal Checkout Modal */}
        {showCheckout && (
          <PayPalCheckout
            product={product}
            onClose={() => setShowCheckout(false)}
          />
        )}
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default ProductDetailPage;