import React from 'react';

interface ResumeSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ title, children, className }) => (
  <section className={className}>
    <h2 className="text-blue-400 text-xs font-medium tracking-[0.2em] uppercase mb-4">{title}</h2>
    {children}
  </section>
);
