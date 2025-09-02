import React, { useState } from 'react';
import { Send, RefreshCw } from 'lucide-react';
import { contactsAPI } from '../services/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    captcha: ''
  });
  const [captchaValue, setCaptchaValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const captcha = `${num1} + ${num2}`;
    setCaptchaValue(captcha);
    return num1 + num2;
  };

  const [captchaAnswer, setCaptchaAnswer] = useState(() => generateCaptcha());

  const handleRefreshCaptcha = () => {
    setCaptchaAnswer(generateCaptcha());
    setFormData(prev => ({ ...prev, captcha: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (parseInt(formData.captcha) !== captchaAnswer) {
      alert('Incorrect captcha. Please try again.');
      handleRefreshCaptcha();
      return;
    }

    setLoading(true);
    
    try {
      console.log('Submitting contact form:', formData);
      await contactsAPI.create(formData);
      console.log('Contact form submitted successfully');
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '', captcha: '' });
      handleRefreshCaptcha();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Error submitting form. Please try again.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (submitted) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
        <div className="text-green-400 text-6xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
        <p className="text-gray-300">Your message has been sent successfully. We'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-white font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
            placeholder="your@email.com"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-white font-semibold mb-2">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          rows={5}
          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors resize-none"
          placeholder="Tell us about your project..."
        ></textarea>
      </div>

      <div className="mb-6">
        <label className="block text-white font-semibold mb-2">Captcha Verification</label>
        <div className="flex items-center gap-4">
          <div className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white font-mono">
            {captchaValue} = ?
          </div>
          <input
            type="number"
            name="captcha"
            value={formData.captcha}
            onChange={handleInputChange}
            required
            className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
            placeholder="Answer"
          />
          <button
            type="button"
            onClick={handleRefreshCaptcha}
            className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-colors"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 transition-all duration-300"
      >
        {loading ? (
          <>
            <RefreshCw className="animate-spin h-5 w-5 mr-2" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-5 w-5 mr-2" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;