import React from 'react';
import { Users, Target, Award, Zap, Shield, Heart } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      description: 'Visionary leader with 15+ years in mobile technology'
    },
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
      description: 'Technical expert specializing in scalable app architecture'
    },
    {
      name: 'Mike Davis',
      role: 'Lead Developer',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg',
      description: 'Full-stack developer with expertise in React Native and Node.js'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Innovation',
      description: 'We constantly push the boundaries of mobile technology to deliver cutting-edge solutions.'
    },
    {
      icon: Shield,
      title: 'Quality',
      description: 'Every app we create undergoes rigorous testing to ensure the highest standards.'
    },
    {
      icon: Heart,
      title: 'Customer Focus',
      description: 'Our customers success is our priority. We provide ongoing support and updates.'
    },
    {
      icon: Zap,
      title: 'Speed',
      description: 'Fast deployment and quick customization to get your app to market rapidly.'
    }
  ];

  return (
    <div className="pt-16">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About AppSellPoint
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            We're a passionate team of developers and designers dedicated to creating 
            premium mobile app solutions that help businesses thrive in the digital world.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                To democratize mobile app development by providing high-quality, 
                ready-made solutions that businesses can deploy instantly and customize 
                to their unique needs.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We believe that every business deserves access to professional mobile 
                applications without the complexity and cost of custom development from scratch.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg" 
                alt="Our Mission"
                className="w-full h-80 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-gray-300 text-lg">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center hover:border-white/20 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-gray-300 text-lg">
              The talented individuals behind AppSellPoint
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-blue-400 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-300">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-300">Mobile Apps</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">99%</div>
              <div className="text-gray-300">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-300">Support</div>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Founded in 2020, AppSellPoint started with a simple idea: make professional 
              mobile app development accessible to businesses of all sizes. What began as 
              a small team of passionate developers has grown into a trusted platform 
              serving hundreds of clients worldwide.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Today, we continue to innovate and expand our catalog of premium mobile 
              solutions, always with the goal of helping our clients succeed in the 
              ever-evolving digital landscape.
            </p>
          </div>
        </div>
        
      </div>
     <div className="pt-16">
       <Footer />
     </div>
    </div>
  );
};

export default AboutPage;