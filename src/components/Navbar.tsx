
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 glass-panel">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
          </div>
          <span className="text-sm font-medium tracking-tight text-white">Capitol City Tech</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-400">
          <a href="#process" className="hover:text-blue-400 transition-colors">Process</a>
          <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
          <a href="#work" className="hover:text-blue-400 transition-colors">Portfolio</a>
          <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
          <a href="#faq" className="hover:text-blue-400 transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white transition-colors">
            Sign In
          </button>
          <button className="bg-white text-black text-xs font-medium px-4 py-2 rounded-full hover:bg-slate-200 transition-all shadow-[0_0_15px_-3px_rgba(255,255,255,0.3)]">
            Start Project
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
