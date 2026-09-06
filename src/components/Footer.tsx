
import React from 'react';
import { Instagram, Facebook, } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-[#020617] pt-20 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8  flex items-center justify-center text-white">
                <img 
                  src='/logo-white.webp'
                />
              </div>
              <span className="text-sm font-medium tracking-tight text-white">Capitol City Tech</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm mb-6">
              Building the digital infrastructure for tomorrow's industry leaders. High-performance web development and strategic consulting.
            </p>
            <div className="flex gap-4">
              <a 
                href='https://www.instagram.com/capitolcitytech/'
                target='_blank'
                rel="noopener noreferrer"
                aria-label='instagram'
                className="w-7 h-7 rounded flex items-center justify-center hover:text-blue-400 transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href='https://www.facebook.com/p/Capitol-City-Tech-61553727423033/'
                target='_blank'
                rel="noopener noreferrer"
                aria-label='instagram'
                className="w-7 h-7 rounded flex items-center justify-center hover:text-blue-400 transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Services</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Web Development</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Mobile Apps</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">UI/UX Design</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#about" className="hover:text-blue-400 transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <div>© {new Date().getFullYear()} Capitol City Tech. All rights reserved.</div>
          <div className="flex gap-6">
            <span className="cursor-not-allowed text-slate-700" title="Coming soon">Privacy Policy</span>
            <span className="cursor-not-allowed text-slate-700" title="Coming soon">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
