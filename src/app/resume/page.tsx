import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ResumeHeader } from '@/components/resume/ResumeHeader';
import { ResumeSection } from '@/components/resume/ResumeSection';
import {
  resumeContact,
  summary,
  workHistory,
  projects,
  skills,
  education,
  certifications,
  volunteer,
} from '@/data/resume';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Resume for Anthony Tijerina — Computer Science student and full-stack developer with production experience in React, Next.js, TypeScript, and ASP.NET Core.',
  alternates: {
    canonical: '/resume',
  },
  openGraph: {
    title: `${resumeContact.name} — Resume`,
    description: resumeContact.title,
    url: 'https://capitolcity.tech/resume',
    type: 'profile',
  },
};

const BulletList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
        <span className="mt-[7px] w-1 h-1 rounded-full flex-shrink-0 bg-blue-400/60" />
        {item}
      </li>
    ))}
  </ul>
);

const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-[10px] px-2 py-1 rounded border border-white/10 bg-white/3 text-slate-400">
    {children}
  </span>
);

const ResumePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <ResumeHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-12">
            <ResumeSection title="Professional Summary">
              <p className="text-sm text-slate-400 leading-relaxed">{summary}</p>
            </ResumeSection>

            <ResumeSection title="Work History">
              <div className="space-y-8">
                {workHistory.map((job) => (
                  <div key={job.company}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                      <h3 className="text-white font-medium text-sm">{job.role} — {job.company}</h3>
                      <span className="text-[11px] text-slate-500">{job.period}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mb-3">{job.location}</p>
                    <BulletList items={job.bullets} />
                  </div>
                ))}
              </div>
            </ResumeSection>

            <ResumeSection title="Projects">
              <div className="space-y-8">
                {projects.map((project) => (
                  <div key={project.id} className="bg-slate-900/40 border border-white/5 rounded-2xl backdrop-blur-xl p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <h3 className="text-white font-medium text-sm">{project.name}</h3>
                      {project.link && (
                        <a
                          href={project.link}
                          target={project.link.startsWith('/') ? undefined : '_blank'}
                          rel={project.link.startsWith('/') ? undefined : 'noopener noreferrer'}
                          className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 border border-blue-500/20 hover:border-blue-500/40 rounded px-2 py-1"
                        >
                          {project.linkLabel}
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </a>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.stack.map((tech) => <Pill key={tech}>{tech}</Pill>)}
                    </div>
                    <BulletList items={project.bullets} />
                  </div>
                ))}
              </div>
            </ResumeSection>
          </div>

          {/* Sidebar */}
          <div className="space-y-12">
            <ResumeSection title="Skills">
              <div className="space-y-4">
                {skills.map((group) => (
                  <div key={group.category}>
                    <h4 className="text-[11px] uppercase tracking-wider text-slate-500 font-medium mb-2">{group.category}</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => <Pill key={item}>{item}</Pill>)}
                    </div>
                  </div>
                ))}
              </div>
            </ResumeSection>

            <ResumeSection title="Education">
              <h3 className="text-white font-medium text-sm mb-0.5">{education.school}</h3>
              <p className="text-[11px] text-slate-600 mb-2">{education.location}</p>
              <p className="text-sm text-slate-400">{education.degree}</p>
              {education.minor && <p className="text-sm text-slate-400 mb-1">Minor: {education.minor}</p>}
              <p className="text-[11px] text-slate-500 mb-3">{education.status}</p>
              {education.coursework && (
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <span className="text-slate-500">Relevant coursework: </span>
                  {education.coursework.join(', ')}
                </p>
              )}
            </ResumeSection>

            <ResumeSection title="Certifications">
              <ul className="space-y-2">
                {certifications.map((cert) => (
                  <li key={cert.name}>
                    <p className="text-sm text-slate-300">{cert.name}</p>
                    <p className="text-[11px] text-slate-600">{cert.detail}</p>
                  </li>
                ))}
              </ul>
            </ResumeSection>

            <ResumeSection title="Volunteer Work">
              <h3 className="text-white font-medium text-sm mb-1">{volunteer.org}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{volunteer.description}</p>
            </ResumeSection>
          </div>
        </div>

        <footer className="no-print mt-20 pt-8 border-t border-white/5 text-center text-[11px] text-slate-600">
          <Link href="/" className="hover:text-slate-400 transition-colors">capitolcity.tech</Link>
        </footer>
      </div>
    </div>
  );
};

export default ResumePage;
