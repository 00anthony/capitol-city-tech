import React from 'react';

const projects = [
  {
    title: 'Luvera',
    desc: 'Advanced interactive visual rebrand built to match luxery aesthetic',
    tag: 'E-commerce',
    colorClass: 'bg-violet-900/10',
    hoverClass: 'group-hover:text-violet-400',
    imageSrc: '/portfolio/luvera.png',
    href: 'https://useluvera.com',
  },
  {
    title: 'Design by Evangelina',
    desc: 'Custom scrapbook themed portfolio web app for graphic designer',
    tag: 'Lead-generator',
    colorClass: 'bg-orange-900/20',
    hoverClass: 'group-hover:text-orange-400',
    imageSrc: '/portfolio/designbyevangelina.png',
    href: 'https://designbyevangelina.com',
  },
];

const Portfolio: React.FC = () => {
  return (
    <section id="work" className="py-24 border-t border-white/5 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-3xl font-medium tracking-tighter text-white z-1">Selected Work</h2>
          <a
            href="#"
            className="hidden md:flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors z-10"
          >
            View full archive{' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14m-7-7l7 7l-7 7"></path>
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <a
              key={i}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl bg-slate-900 aspect-video border border-white/10">
                <div
                  className={`absolute inset-0  group-hover:opacity-50 transition-colors z-10`}
                />
                <img
                  src={project.imageSrc}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-4 flex justify-between items-start">
                <div>
                  <h3
                    className={`text-lg font-medium text-white ${project.hoverClass} transition-colors`}
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{project.desc}</p>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 border border-white/10 px-2 py-1 rounded">
                  {project.tag}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;