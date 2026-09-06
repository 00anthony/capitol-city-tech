
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#050811] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-medium tracking-wide uppercase mb-6">
              About Us
            </div>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-white mb-6">
              One engineer, <br /><span className="text-slate-500">no hand-offs.</span>
            </h2>
            <div className="space-y-4 text-slate-400 font-light text-sm md:text-base leading-relaxed">
              <p>
                Capitol City Tech is a boutique web development practice — you work directly with the engineer building your site, from the first call to the last deploy. No account managers, no outsourced dev queue, no telephone game.
              </p>
              <p>
                Every project is built with React, Next.js, and TypeScript: clean code, fast pages, and a site that&apos;s actually maintainable after launch — not just a design mockup wired together to demo well.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 flex gap-12">
              <div>
                <div className="text-3xl font-bold text-white mb-1">1:1</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500">Direct Access, Start to Finish</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500">Custom-Built, No Templates</div>
              </div>
            </div>
          </div>

          <div className="relative h-full min-h-100 w-full">
            <div className="absolute inset-0 bg-linear-to-tr from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl"></div>
            <div className="relative h-full rounded-2xl border border-white/10 bg-slate-900/50 overflow-hidden backdrop-blur-sm p-12 flex items-center justify-center">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
              
              {/* Floating Code Card */}
              <div className="relative z-10 w-64 bg-[#0B0E14] border border-white/10 rounded-lg shadow-2xl p-4 animate-blob [animation-delay:2s]">
                <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-2 font-mono text-[10px] text-slate-400">
                  <div className="flex"><span className="text-purple-400 mr-2">const</span> <span className="text-blue-400">future</span> = <span className="text-yellow-300">await</span> build();</div>
                  <div className="flex"><span className="text-purple-400 mr-2">if</span> (success) {"{"}</div>
                  <div className="pl-4 flex"><span className="text-blue-400">scale</span>(<span className="text-orange-400">'infinity'</span>);</div>
                  <div className="flex">{"}"}</div>
                </div>
              </div>

              {/* Decorative Orbits */}
              <div className="absolute top-10 right-10 w-16 h-16 border border-blue-500/30 rounded-full animate-spin-slow"></div>
              <div className="absolute bottom-10 left-10 w-24 h-24 border border-dashed border-indigo-500/30 rounded-full animate-spin-slow-reverse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
