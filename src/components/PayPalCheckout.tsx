import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck } from 'lucide-react';
import { purchasesAPI } from '../services/api';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface PayPalCheckoutProps {
  product: Product;
  onClose: () => void;
}

const PayPalCheckout: React.FC<PayPalCheckoutProps> = ({ product, onClose }) => {
  const [processing, setProcessing] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: ''
  });

  const handlePayPalPayment = async () => {
    setProcessing(true);
    
    try {
      const purchaseData = {
        productId: product.id,
        amount: product.price,
        customerEmail: customerInfo.email,
        customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
        customerCompany: customerInfo.company
      };

      const response = await purchasesAPI.create(purchaseData);
      
      // Store purchase data for success page
      localStorage.setItem('lastPurchase', JSON.stringify({
        ...response.data,
        productName: product.name,
        customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
        customerEmail: customerInfo.email,
        purchaseDate: response.data.createdAt
      }));
      
      // Redirect to success page
      window.location.href = '/payment-success';
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl border border-white/20 w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">Complete Purchase</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Product Summary */}
          <div className="bg-white/5 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-white font-semibold">{product.name}</h3>
                <p className="text-gray-400 text-sm">Digital Download</p>
              </div>
              <div className="text-2xl font-bold text-white">${product.price}</div>
            </div>
          </div>

          {/* Customer Information */}
          <form className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={customerInfo.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={customerInfo.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                  placeholder="Doe"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={customerInfo.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Company (Optional)</label>
              <input
                type="text"
                name="company"
                value={customerInfo.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="Your Company"
              />
            </div>
          </form>

          {/* Security Notice */}
          <div className="flex items-center text-gray-300 text-sm mb-6">
            <ShieldCheck className="h-5 w-5 text-green-400 mr-2" />
            Secure payment processing powered by PayPal
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayPalPayment}
            disabled={processing || !customerInfo.email || !customerInfo.firstName || !customerInfo.lastName}
            className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all duration-300"
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white mr-2"></div>
                Processing Payment...
              </>
            ) : (
              <>
                <CreditCard className="h-5 w-5 mr-2" />
                Pay with PayPal - ${product.price}
              </>
            )}
          </button>

          <p className="text-gray-400 text-xs text-center mt-4">
            By completing your purchase, you agree to our Terms of Service and Privacy Policy.
            You will receive download instructions via email after payment confirmation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PayPalCheckout;