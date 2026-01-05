
import React from 'react';

const steps = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'We deep dive into your business goals, user needs, and technical requirements to map out the perfect solution.'
  },
  {
    num: '02',
    title: 'Design',
    desc: 'Our UI/UX team creates high-fidelity prototypes. You\'ll see exactly how your product looks and feels before we write a line of code.'
  },
  {
    num: '03',
    title: 'Development',
    desc: 'We build your application using modern, scalable technologies. Regular sprint reviews keep you updated on progress.'
  },
  {
    num: '04',
    title: 'Launch',
    desc: 'We handle deployment, CI/CD setup, and final testing. We ensure a smooth launch and provide post-launch support.'
  }
];

const Process: React.FC = () => {
  return (
    <section id="process" className="py-24 relative z-10 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-white mb-4">How we work</h2>
          <p className="text-slate-400 text-sm md:text-base font-light">
            A streamlined, transparent process from idea to launch. We keep you in the loop at every stage.
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-8 left-0 w-full h-px bg-white/10 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
            {steps.map((step) => (
              <div key={step.num} className="relative group">
                <div className="md:mx-auto w-16 h-16 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center relative z-10 mb-6 group-hover:border-blue-500 transition-colors">
                  <span className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">{step.num}</span>
                  <div className="absolute inset-0 rounded-full border border-blue-500/50 scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </div>
                <div className="md:text-center">
                  <h3 className="text-lg font-medium text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
