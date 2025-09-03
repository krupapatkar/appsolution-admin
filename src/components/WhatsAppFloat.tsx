import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppFloat = () => {
  const handleWhatsAppClick = () => {
    // const phoneNumber = '+1234567890'; // Replace with your WhatsApp number
    // const message = 'Hi! I\'m interested in your mobile app solutions.';
    // const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    const whatsappUrl =
      "https://api.whatsapp.com/send/?phone=918758432204&text=Explore+Flutter+Ready-Made+App+Solutions+%26+Templates%0D%0AGet+high-quality%2C+customizable+on-demand+app+source+codes+for+Android+and+iOS%E2%80%94ideal+for+startups+and+developers.+Visit+https%3A%2F%2Fwww.initiotechmedia.com%2F+for+more+info.&type=phone_number&app_absent=0";
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-pulse"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
};

export default WhatsAppFloat;