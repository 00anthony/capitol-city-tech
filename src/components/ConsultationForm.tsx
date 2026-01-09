
import React, { useState } from 'react';

interface ConsultationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConsultationForm: React.FC<ConsultationFormProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    alert('Thank you! Our team will reach out to you shortly.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/2">
          <h3 className="text-sm font-semibold text-white">Book a Consultation</h3>
          <button 
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Full Name</label>
            <input 
              required
              type="text" 
              placeholder="John Doe"
              className="w-full bg-white/3 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-700"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Email Address</label>
            <input 
              required
              type="email" 
              placeholder="john@example.com"
              className="w-full bg-white/3 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-700"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Project Type</label>
            <select className="w-full bg-[#0F1219] border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500/50 transition-all appearance-none">
              <option>Web Application</option>
              <option>Mobile App</option>
              <option>UI/UX Overhaul</option>
              <option>AI Integration</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Brief Message</label>
            <textarea 
              rows={3}
              placeholder="Tell us about your project..."
              className="w-full bg-white/3 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-700 resize-none"
            ></textarea>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-lg text-xs font-semibold transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] mt-2"
          >
            Send Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConsultationForm;
