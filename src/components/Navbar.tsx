'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Process',   href: '#process'   },
  { label: 'Services',  href: '#services'  },
  { label: 'Portfolio', href: '#work'       },
  { label: 'About',     href: '#about'      },
  { label: 'FAQ',       href: '#faq'        },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  /* Lock / unlock body scroll when mobile menu opens */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 glass-panel backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2 ">
            <div className="w-12 h-12 bg-linear-to-tl from-blue-500/20 to-indigo-600/10 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Image
                src="/logo-white.png"
                alt='logo'
                height={50}
                width={50}
                className='mb-2'
              />
            </div>
            
            <span className="text-sm font-medium tracking-tight text-white">Capitol City Tech</span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-400">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={href} href={href} className="hover:text-blue-400 transition-colors">{label}</a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button className="cursor-not-allowed text-xs font-medium text-slate-700 transition-colors">
              Sign In
            </button>
            <button className="bg-white text-black text-xs font-medium px-4 py-2 rounded-full hover:bg-slate-200 transition-all shadow-[0_0_15px_-3px_rgba(255,255,255,0.3)]">
              Start Project
            </button>
          </div>

          {/* Mobile: CTA + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            

            {/* Animated hamburger → X */}
            <button
              onClick={() => setIsOpen(prev => !prev)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="relative w-8 h-8 flex flex-col items-center justify-center gap-[5px] focus:outline-none"
            >
              {/* Top bar: translates down + rotates to form the top arm of X */}
              <span className={`block h-px w-5 bg-white origin-center transition-all duration-300 ease-in-out
                ${isOpen ? 'translate-y-[6px] rotate-45' : ''}`}
              />
              {/* Middle bar: fades out */}
              <span className={`block h-px w-5 bg-white transition-all duration-200 ease-in-out
                ${isOpen ? 'opacity-0 scale-x-0' : ''}`}
              />
              {/* Bottom bar: translates up + rotates to form the bottom arm of X */}
              <span className={`block h-px w-5 bg-white origin-center transition-all duration-300 ease-in-out
                ${isOpen ? '-translate-y-[6px] -rotate-45' : ''}`}
              />
            </button>
          </div>

        </div>
      </nav>

      {/* ── Mobile menu overlay ── */}
      {/* Backdrop */}
      <div
        onClick={close}
        className={`fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden transition-opacity duration-300
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
      />

      {/* Slide-down panel */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 md:hidden border-b border-white/5 glass-panel backdrop-blur-lg
          transition-all duration-300 ease-in-out overflow-hidden
          ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={close}
              className="text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 px-3 py-3 rounded-lg transition-all"
            >
              {label}
            </a>
          ))}

          <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-3">
            <button className="text-sm font-medium text-slate-300 hover:text-white px-3 py-3 text-left transition-colors">
              Sign In
            </button>
            <button className="bg-white text-black text-sm font-medium px-4 py-3 rounded-full hover:bg-slate-200 transition-all shadow-[0_0_15px_-3px_rgba(255,255,255,0.3)]">
              Start Project
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
