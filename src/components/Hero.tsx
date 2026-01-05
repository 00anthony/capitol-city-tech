'use client'
import React from 'react';
import { motion } from 'framer-motion';
import DashboardMockup from './DashboardMockup';

const Hero: React.FC = () => {
  return (
    <section className="lg:pt-48 lg:pb-32 pt-32 pb-20 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-7xl mx-auto px-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-medium tracking-wide uppercase mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Accepting New Clients for Q4
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white via-white to-slate-500 mb-6 leading-[1.1]">
          Manage projects <br className="hidden md:block" />
          at the speed of <span className="text-blue-400 text-glow">thought.</span>
        </h1>

        <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          We don't just build software; we build the engine that drives your business. Experience real-time collaboration and transparency.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-20">
          <button className="group relative px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] flex items-center gap-2 overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            <span>Book Consultation</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14m-7-7l7 7l-7 7"></path></svg>
          </button>
          <button className="px-6 py-3 bg-slate-900 border border-slate-800 text-slate-300 text-sm font-medium rounded-lg hover:border-slate-600 transition-all flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500"><path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"></path><circle cx="12" cy="12" r="10"></circle></svg>
            View Showreel
          </button>
        </div>

        <DashboardMockup />
      </motion.div>
    </section>
  );
};

export default Hero;
