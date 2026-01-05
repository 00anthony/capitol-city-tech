'use client'

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Code, TrendingUp, Zap, Check } from 'lucide-react';

export default function CapitolCityTech() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Custom Website Development",
      description: "Beautiful, responsive websites built with cutting-edge technology that convert visitors into customers.",
      features: ["React & Next.js", "Mobile-First Design", "SEO Optimized", "Lightning Fast"]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Lead Generation",
      description: "Strategic digital solutions that drive qualified leads and grow your business consistently.",
      features: ["Marketing Automation", "Analytics & Tracking", "Conversion Optimization", "A/B Testing"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Software Solutions",
      description: "Complete software development and integration services tailored to your unique business needs.",
      features: ["Custom Applications", "API Integration", "Database Design", "Ongoing Support"]
    }
  ];

  const portfolio = [
    { title: "E-Commerce Platform", category: "Web Development", color: "bg-gradient-to-br from-purple-500 to-pink-500" },
    { title: "SaaS Dashboard", category: "Software Solution", color: "bg-gradient-to-br from-blue-500 to-cyan-500" },
    { title: "Marketing Campaign", category: "Lead Generation", color: "bg-gradient-to-br from-orange-500 to-red-500" },
    { title: "Mobile App", category: "Software Solution", color: "bg-gradient-to-br from-green-500 to-emerald-500" },
    { title: "Corporate Website", category: "Web Development", color: "bg-gradient-to-br from-indigo-500 to-purple-500" },
    { title: "Analytics Platform", category: "Lead Generation", color: "bg-gradient-to-br from-yellow-500 to-orange-500" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-lg py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Capitol City Tech
          </div>
          
          <div className="hidden md:flex space-x-8">
            {['Services', 'Work', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-400 transition-colors cursor-pointer">
                {item}
              </a>
            ))}
          </div>

          <button className="hidden md:block bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-full hover:scale-105 transition-transform">
            Get Started
          </button>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-lg">
            <div className="px-6 py-4 space-y-4">
              {['Services', 'Work', 'About', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="block hover:text-blue-400 transition-colors">
                  {item}
                </a>
              ))}
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-full">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in">
            Build Your Digital Future
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            We create stunning websites, drive qualified leads, and deliver custom software solutions that transform businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2">
              Start Your Project <ArrowRight />
            </button>
            <button className="border-2 border-white/20 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/5 transition-colors">
              View Our Work
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">What We Do</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Full-service digital solutions designed to elevate your brand and accelerate growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="group relative bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                onMouseEnter={() => setActiveService(idx)}
              >
                <div className="text-blue-400 mb-6 transform group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <Check className="w-5 h-5 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="work" className="py-32 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Our Work</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Success stories from clients who trusted us to bring their vision to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((project, idx) => (
              <div
                key={idx}
                className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer"
              >
                <div className={`absolute inset-0 ${project.color} transition-transform duration-300 group-hover:scale-110`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <p className="text-sm text-gray-300 mb-2">{project.category}</p>
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Let's build something extraordinary together. Get in touch and let's discuss your project.
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-12 py-5 rounded-full text-xl font-semibold hover:scale-105 transition-transform inline-flex items-center gap-3">
            Schedule a Consultation <ArrowRight />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Capitol City Tech
          </div>
          <div className="flex gap-8 text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-gray-400">© 2024 Capitol City Tech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}