
import React from 'react';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-white mb-4">Full-stack mastery.</h2>
          <p className="text-slate-400 text-sm md:text-base font-light">
            We don't just build websites. We build scalable, interactive digital ecosystems tailored to your business logic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Service Card */}
          <div className="col-span-1 md:col-span-2 row-span-2 group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 hover:bg-slate-900/60 transition-colors p-8">
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8m-2 4v-3.96v3.15M7 19h5"></path><rect width="6" height="10" x="16" y="12" rx="2"></rect></svg>
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Web Application Development</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                  From PWAs to complex SaaS platforms, we utilize Next.js and React to deliver lightning-fast, SEO-optimized applications. Full CRUD capabilities, real-time data sync, and secure authentication flows included.
                </p>
              </div>
              <div className="mt-8 flex gap-2">
                {['SSR', 'API Routes', 'Postgres'].map(tag => (
                  <div key={tag} className="px-3 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-slate-400">{tag}</div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Service Card */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 hover:bg-slate-900/60 transition-colors p-8">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2m16 0h2m-7-1v2m-6-2v2"></path></svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">AI Integration</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Embed LLMs and Chatbots directly into your platform. Vector database integration and custom training models.
            </p>
          </div>

          {/* Design Service Card */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 hover:bg-slate-900/60 transition-colors p-8">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a1 1 0 0 1 0-20a10 9 0 0 1 10 9a5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"></path><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle></svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">UI/UX Design Systems</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pixel-perfect implementation of designs. We build reusable component libraries for consistency and speed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
