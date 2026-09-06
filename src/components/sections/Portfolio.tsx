import React from 'react';
import Image from 'next/image';
import { clients } from '@/data/clients';

const projects = clients.filter(c => c.portfolio);

const Portfolio: React.FC = () => {
  return (
    <section id="work" className="py-24 border-t border-white/5 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-3xl font-medium tracking-tighter text-white z-1">Selected Work</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl bg-slate-900 aspect-video border border-white/10">
                <div
                  className={`absolute inset-0  group-hover:opacity-50 transition-colors z-10`}
                />
                <Image
                  src={project.portfolio!.image}
                  alt={project.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-4 flex justify-between items-start">
                <div>
                  <h3
                    className={`text-lg font-medium text-white ${project.portfolio!.hoverClass} transition-colors`}
                  >
                    {project.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{project.portfolio!.description}</p>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 border border-white/10 px-2 py-1 rounded">
                  {project.portfolio!.tag}
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