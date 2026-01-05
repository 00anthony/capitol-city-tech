
import React from 'react';

const projects = [
  {
    title: 'FinTech Dashboard',
    desc: 'Real-time data visualization platform',
    tag: 'React',
    colorClass: 'bg-blue-900/20',
    hoverClass: 'group-hover:text-blue-400',
    visual: (
      <div className="absolute inset-4 top-10 bg-[#0f172a] rounded-t-lg shadow-2xl transform translate-y-4 group-hover:translate-y-2 transition-transform duration-500 border border-white/5 flex flex-col">
        <div className="h-8 border-b border-white/5 flex items-center px-4 gap-2">
          <div className="w-2 h-2 rounded-full bg-slate-700"></div>
          <div className="w-2 h-2 rounded-full bg-slate-700"></div>
        </div>
        <div className="flex-1 p-4 grid grid-cols-3 gap-4">
          <div className="col-span-2 h-20 bg-slate-800/50 rounded"></div>
          <div className="col-span-1 h-20 bg-slate-800/30 rounded"></div>
          <div className="col-span-3 h-32 bg-slate-800/30 rounded"></div>
        </div>
      </div>
    )
  },
  {
    title: 'E-Commerce Mobile App',
    desc: 'Cross-platform retail experience',
    tag: 'React Native',
    colorClass: 'bg-emerald-900/20',
    hoverClass: 'group-hover:text-emerald-400',
    visual: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-full bg-[#0f172a] border-x border-white/5 transform translate-y-12 group-hover:translate-y-8 transition-transform duration-500">
          <div className="p-4 space-y-4">
            <div className="w-12 h-12 rounded bg-emerald-500/20"></div>
            <div className="w-full h-2 bg-slate-800 rounded"></div>
            <div className="w-2/3 h-2 bg-slate-800 rounded"></div>
            <div className="w-full h-24 bg-slate-800/50 rounded mt-8"></div>
          </div>
        </div>
      </div>
    )
  }
];

const Portfolio: React.FC = () => {
  return (
    <section id="work" className="py-24 border-t border-white/5 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-3xl font-medium tracking-tighter text-white z-1">Selected Work</h2>
          <a href="#" className="hidden md:flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors z-10">
            View full archive <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7l7 7l-7 7"></path></svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl bg-slate-900 aspect-video border border-white/10">
                <div className={`absolute inset-0 ${project.colorClass} group-hover:opacity-50 transition-colors`}></div>
                {project.visual}
              </div>
              <div className="mt-4 flex justify-between items-start">
                <div>
                  <h3 className={`text-lg font-medium text-white ${project.hoverClass} transition-colors`}>{project.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{project.desc}</p>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 border border-white/10 px-2 py-1 rounded">{project.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
