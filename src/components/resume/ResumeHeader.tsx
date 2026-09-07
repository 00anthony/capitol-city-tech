import React from 'react';
import Link from 'next/link';
import { resumeContact } from '@/data/resume';

export const ResumeHeader: React.FC = () => (
  <header className="mb-12">
    <div className="no-print flex items-center justify-between mb-10">
      <Link href="/" className="text-xs font-medium text-slate-500 hover:text-white transition-colors flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
        Capitol City Tech
      </Link>
      <a
        href="/Anthony_Tijerina_Resume.pdf"
        download="Anthony_Tijerina_Resume.pdf"
        className="flex items-center gap-2 bg-white text-black text-xs font-medium px-4 py-2 rounded-full hover:bg-slate-200 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        Download PDF
      </a>
    </div>

    <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-white mb-2">{resumeContact.name}</h1>
    <p className="text-slate-400 text-sm md:text-base font-light mb-6">{resumeContact.title}</p>

    <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500">
      <a href={`mailto:${resumeContact.email}`} className="hover:text-blue-400 transition-colors">{resumeContact.email}</a>
      <span>{resumeContact.phone}</span>
      <span>{resumeContact.location}</span>
      <a href={resumeContact.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
        github.com/00anthony
      </a>
      <a href={resumeContact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
        linkedin.com/in/anthony-tijerina-cs
      </a>
    </div>
  </header>
);
