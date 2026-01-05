
import React from 'react';

const TechMarquee: React.FC = () => {
  const techs = [
    { name: 'React', color: '#00D8FF' },
    { name: 'Next.js', color: '#FFFFFF' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'Tailwind CSS', color: '#2298BD' },
    { name: 'Node.js', color: '#539E43' },
    { name: 'PostgreSQL', color: '#336791' },
  ];

  const marqueeContent = [...techs, ...techs, ...techs, ...techs]; // Duplicate for smooth looping

  return (
    <div className="w-full border-y border-white/5 bg-slate-950/50 py-8 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-[#020617] to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-[#020617] to-transparent z-10"></div>
      <div className="flex gap-16 items-center whitespace-nowrap animate-scroll">
        {marqueeContent.map((tech, idx) => (
          <div key={idx} className="flex items-center gap-3 text-slate-500 hover:text-white transition-colors cursor-default">
            <div className="w-6 h-6 flex items-center justify-center opacity-70 group-hover:opacity-100">
               {/* Simplified representation with colored dots or generic icons */}
               <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tech.color }}></div>
            </div>
            <span className="text-sm font-semibold tracking-tight uppercase">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;
