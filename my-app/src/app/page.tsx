"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Code, 
  Rocket, 
  Lock, 
  ArrowRight, 
  CheckCircle, 
  Shield 
} from 'lucide-react';
import Link from 'next/link';

// Define type interfaces
interface Feature {
  icon: React.ReactElement;
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

const NoCodeSmartContractLanding: React.FC = () => {

  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const features: Feature[] = [
    {
      icon: <Zap className="w-12 h-12 text-blue-500" />,
      title: "Rapid Development",
      description: "Build smart contracts in minutes without writing complex code"
    },
    {
      icon: <Code className="w-12 h-12 text-green-500" />,
      title: "No Coding Required",
      description: "Intuitive drag-and-drop interface for blockchain development"
    },
    {
      icon: <Lock className="w-12 h-12 text-purple-500" />,
      title: "Secure by Design",
      description: "Built-in security checks and best practices"
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Alex Rodriguez",
      role: "Blockchain Developer",
      quote: "ContractCraft has revolutionized how we build smart contracts!",
      avatar: "https://www.profilebakery.com/wp-content/uploads/2023/04/LINKEDIN-Profile-Picture-AI.jpg"
    },
    {
      name: "Emily Chen",
      role: "Startup Founder",
      quote: "The no-code platform made blockchain development accessible for our team.",
      avatar: "https://imgv3.fotor.com/images/gallery/AI-3D-Female-Profile-Picture.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-gray-100">
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gray-800/70 backdrop-blur-md shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-100 flex items-center">
            <Rocket className="mr-2 text-blue-400" />
            ContractCraft
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
            >
              <Link href="/Dashboard">Get Started</Link>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="pt-20 overflow-y-auto">
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="min-h-screen flex items-center justify-center px-4 py-24"
        >
          <div className="max-w-4xl text-center">
            <motion.h1 
              variants={itemVariants}
              className="text-6xl font-extrabold text-gray-100 mb-6 leading-tight"
            >
              Build Smart Contracts
              <br />
              <span className="text-blue-400">Without Writing Code</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              A powerful no-code platform to create, deploy, and manage blockchain smart contracts with unprecedented ease and efficiency
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex justify-center space-x-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition flex items-center"
              >
                <Link href="/Dashboard">Get Started</Link>
                {/* Start Building */}
                <ArrowRight className="ml-2" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border-2 border-blue-500 text-blue-400 rounded-lg hover:bg-blue-800/30 transition"
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="py-24 px-4 bg-gray-800/70 backdrop-blur-md"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2 
                variants={itemVariants}
                className="text-4xl font-bold text-gray-100 mb-4"
              >
                Why ContractCraft?
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="text-xl text-gray-400 max-w-2xl mx-auto"
              >
                Revolutionize your blockchain development with our cutting-edge no-code platform
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="bg-gray-800 p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition group"
                >
                  <div className="flex justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-100 group-hover:text-blue-400 transition">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="py-24 px-4"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              variants={itemVariants}
              className="text-4xl font-bold text-gray-100 mb-16"
            >
              What Our Users Say
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="bg-gray-800 p-8 rounded-xl shadow-lg"
                >
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-bold text-gray-100">{testimonial.name}</h3>
                      <p className="text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <Rocket className="mr-2 text-blue-400" />
                ContractCraft
              </h4>
              <p className="text-gray-400">Democratizing blockchain development</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Products</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Smart Contract Builder</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Deployment Tools</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Security Checks</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Community</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center">
            <p className="text-gray-500">
              © 2024 ContractCraft. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default NoCodeSmartContractLanding;