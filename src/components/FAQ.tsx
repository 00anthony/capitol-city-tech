
import React from 'react';

const faqs = [
  {
    q: "What is your typical project timeline?",
    a: "Timelines vary based on complexity. A standard MVP typically takes 4-8 weeks, while complex platforms may take 3-6 months. We work in 2-week sprints."
  },
  {
    q: "Do you provide post-launch support?",
    a: "Absolutely. We offer maintenance packages that include monitoring, security updates, bug fixes, and minor feature additions."
  },
  {
    q: "Can you work with our existing design team?",
    a: "Yes, we love collaboration. We can take designs from Figma, Sketch, or Adobe XD and turn them into pixel-perfect, responsive code."
  }
];

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-24 relative z-10">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-medium tracking-tighter text-white mb-4">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-slate-900/30 border border-white/5 rounded-xl overflow-hidden transition-all duration-300 open:bg-slate-900/60 open:border-blue-500/30">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none text-slate-200 font-medium hover:text-white transition-colors">
                <span>{faq.q}</span>
                <span className="transition-transform group-open:rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-sm text-slate-400 leading-relaxed border-t border-white/5 mt-2 pt-4">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
