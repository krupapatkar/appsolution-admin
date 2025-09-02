import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Download, Mail, Home } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PaymentSuccess = () => {
  const [purchaseData, setPurchaseData] = useState(null);

  useEffect(() => {
    const savedPurchase = localStorage.getItem('lastPurchase');
    if (savedPurchase) {
      setPurchaseData(JSON.parse(savedPurchase));
    }
  }, []);

  const handleDownload = () => {
    // Simulate file download
    const link = document.createElement('a');
    link.href = '#'; // In real implementation, this would be the actual download URL
    link.download = `${purchaseData?.productName.replace(/\s+/g, '-').toLowerCase()}-source.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('Download started! Check your downloads folder.');
  };

  if (!purchaseData) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">No Purchase Data Found</h2>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          >
            <Home className="h-5 w-5 mr-2" />
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16  min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
            <CheckCircle className="h-12 w-12 text-green-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Payment Successful!
          </h1>
          <p className="text-gray-300 text-lg">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Order Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Purchase Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Product:</span>
                  <span className="text-white font-medium">{purchaseData.productName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount:</span>
                  <span className="text-white font-medium">${purchaseData.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Transaction ID:</span>
                  <span className="text-white font-mono text-sm">{purchaseData.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date:</span>
                  <span className="text-white">{new Date(purchaseData.purchaseDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Customer Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white">{purchaseData.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white">{purchaseData.customerEmail}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-6">
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-white font-semibold mb-2">Check Your Email</h4>
                <p className="text-gray-300">
                  We've sent a confirmation email to <strong>{purchaseData.customerEmail}</strong> with your 
                  purchase details and download instructions. If you don't see it in your inbox, 
                  please check your spam folder.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-semibold transition-all duration-300"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Now
            </button>
            
            <Link
              to="/products"
              className="flex-1 flex items-center justify-center px-6 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg font-semibold transition-all duration-300"
            >
              Browse More Products
            </Link>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">What's Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-400 font-bold text-xl">1</span>
              </div>
              <p className="font-medium">Download the source code</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-400 font-bold text-xl">2</span>
              </div>
              <p className="font-medium">Follow the installation guide</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-400 font-bold text-xl">3</span>
              </div>
              <p className="font-medium">Customize and deploy</p>
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

export default PaymentSuccess;