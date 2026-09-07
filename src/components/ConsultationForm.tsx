
import React, { useEffect, useState } from 'react';

interface ConsultationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const initialFields = { name: '', email: '', projectType: 'Web Application', message: '', company: '' };

const ConsultationForm: React.FC<ConsultationFormProps> = ({ isOpen, onClose }) => {
  const [fields, setFields] = useState(initialFields);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Reset to a blank form shortly after it's closed, so a reopened modal doesn't show stale state.
  useEffect(() => {
    if (isOpen) return;
    const timeout = setTimeout(() => {
      setFields(initialFields);
      setStatus('idle');
      setErrorMessage('');
    }, 300);
    return () => clearTimeout(timeout);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (field: keyof typeof fields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setFields(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage('Could not reach the server. Check your connection and try again.');
    }
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

        {status === 'success' ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto text-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
            </div>
            <p className="text-sm text-white font-medium">Thanks — that&apos;s in.</p>
            <p className="text-xs text-slate-500">We&apos;ll reach out shortly to schedule your consultation.</p>
            <p className="text-[11px] text-slate-600 bg-white/3 border border-white/5 rounded-lg px-3 py-2 mt-1">
              We&apos;ve sent a confirmation to <span className="text-slate-400">{fields.email}</span> — if it&apos;s not in your inbox in a few minutes, check your spam or junk folder.
            </p>
            <button
              onClick={onClose}
              className="mt-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          /* Form Body */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Honeypot — hidden from real users, bots tend to fill every field */}
            <input
              type="text"
              name="company"
              value={fields.company}
              onChange={handleChange('company')}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] w-px h-px opacity-0"
            />

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Full Name</label>
              <input
                required
                type="text"
                placeholder="John Doe"
                value={fields.name}
                onChange={handleChange('name')}
                className="w-full bg-white/3 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-700"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Email Address</label>
              <input
                required
                type="email"
                placeholder="john@example.com"
                value={fields.email}
                onChange={handleChange('email')}
                className="w-full bg-white/3 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-700"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Project Type</label>
              <select
                value={fields.projectType}
                onChange={handleChange('projectType')}
                className="w-full bg-[#0F1219] border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500/50 transition-all appearance-none"
              >
                <option>Website / Web App</option>
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
                value={fields.message}
                onChange={handleChange('message')}
                className="w-full bg-white/3 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-700 resize-none"
              ></textarea>
            </div>

            {status === 'error' && (
              <p className="text-xs text-red-400">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-2.5 rounded-lg text-xs font-semibold transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] mt-2"
            >
              {status === 'submitting' ? 'Sending…' : 'Send Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ConsultationForm;
