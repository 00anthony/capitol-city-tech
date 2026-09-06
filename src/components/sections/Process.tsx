'use client'
import React, { useState, useRef, useEffect } from 'react';

/* ─── Data ─────────────────────────────────────────────────────────────── */

const steps = [
  {
    num: '01',
    title: 'Strategy & Planning',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    desc: 'We align on vision before touching a single pixel. Stakeholder interviews, competitive analysis, and KPI definition give you a clear roadmap and zero surprises.',
    detail: ['Stakeholder interviews', 'Competitive landscape audit', 'KPI definition', 'Project roadmap'],
  },
  {
    num: '02',
    title: 'Content Gathering',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    desc: "Great design needs great raw material. We collect copy, photography, and brand assets — then audit what's missing so the build never stalls.",
    detail: ['Asset audit & checklist', 'Copywriting & editing', 'Photography coordination', 'Brand asset organization'],
  },
  {
    num: '03',
    title: 'Design Mockups',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    desc: 'High-fidelity Figma mockups for every breakpoint. You see your product before any code is written. Two feedback rounds included.',
    detail: ['Wireframes & architecture', 'High-fidelity Figma designs', 'Mobile & desktop breakpoints', 'Interactive prototype'],
  },
  {
    num: '04',
    title: 'Development',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    desc: 'We build with React, Next.js, and TypeScript. Bi-weekly sprints and a live staging environment keep you informed at every step.',
    detail: ['React / Next.js development', 'CMS integration', 'API & third-party connections', 'Bi-weekly sprint reviews'],
  },
  {
    num: '05',
    title: 'Revisions',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    desc: "Structured feedback loops that don't drag on. Consolidated rounds keep changes precise and fast — never waiting weeks for a tweak.",
    detail: ['Structured feedback rounds', 'Figma annotation tools', 'Fast turnaround SLA', 'Change log tracking'],
  },
  {
    num: '06',
    title: 'QA & Testing',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    desc: 'Cross-browser testing, WCAG 2.1 AA accessibility audits, Lighthouse performance profiles, and full security review before anything goes live.',
    detail: ['Cross-browser & device testing', 'WCAG 2.1 AA accessibility', 'Lighthouse performance audit', 'Security & form validation'],
  },
  {
    num: '07',
    title: 'Launch',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    desc: 'Deploy day is a non-event by design. CI/CD pipelines, DNS cutover, CDN configuration, and monitoring — all handled by us.',
    detail: ['CI/CD pipeline setup', 'DNS & CDN configuration', 'Uptime & error monitoring', '24h & 72h post-launch check'],
  },
  {
    num: '08',
    title: 'Ongoing Support',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    desc: 'Your site is a living product. Retainer plans give you priority access for features, content updates, and performance improvements.',
    detail: ['Priority support retainer', 'Feature development', 'Performance optimization', 'Monthly analytics reports'],
  },
];

// Organic wave stagger (px of marginTop per card)
const STAGGER = [80, 140, 55, 0, 65, 130, 40, 100];

/* ─── Step Visual (circular orbital diagram) ───────────────────────────── */

const StepVisual: React.FC<{ icon: React.ReactNode; num: string }> = ({ icon, num }) => (
  <div className="relative flex items-center justify-center" style={{ height: 120 }}>
    {/* Ambient glow */}
    <div
      className="absolute rounded-full"
      style={{
        width: 96, height: 96,
        background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)',
      }}
    />
    {/* Outer ring */}
    <div
      className="absolute rounded-full"
      style={{ width: 92, height: 92, border: '1px solid rgba(59,130,246,0.10)' }}
    />
    {/* Middle dashed ring */}
    <div
      className="absolute rounded-full"
      style={{ width: 64, height: 64, border: '1px dashed rgba(59,130,246,0.18)' }}
    />
    {/* Center icon circle */}
    <div
      className="relative z-10 flex items-center justify-center rounded-full"
      style={{
        width: 42, height: 42,
        background: 'rgba(15,23,42,0.90)',
        border: '1px solid rgba(59,130,246,0.32)',
        boxShadow: '0 0 20px rgba(59,130,246,0.12), inset 0 0 8px rgba(59,130,246,0.04)',
        color: '#60a5fa',
      }}
    >
      {icon}
    </div>
    {/* Orbital dots at 60° intervals */}
    {[0, 60, 120, 180, 240, 300].map((deg, i) => (
      <div
        key={i}
        className="absolute"
        style={{
          width: 92, height: 92,
          transform: `rotate(${deg}deg)`,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: i % 2 === 0 ? 4 : 3,
            height: i % 2 === 0 ? 4 : 3,
            borderRadius: '50%',
            marginTop: 2,
            background: `rgba(59,130,246,${i % 2 === 0 ? 0.30 : 0.14})`,
          }}
        />
      </div>
    ))}
    {/* Step number badge */}
    <div
      className="absolute font-mono font-bold"
      style={{
        top: 8, right: 18,
        fontSize: 9,
        letterSpacing: '0.08em',
        color: '#60a5fa',
        background: 'rgba(15,23,42,0.88)',
        border: '1px solid rgba(59,130,246,0.22)',
        borderRadius: 4,
        padding: '2px 5px',
      }}
    >
      {num}
    </div>
  </div>
);

/* ─── Component ─────────────────────────────────────────────────────────── */

const Process: React.FC = () => {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Trigger stagger animation when section enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="py-24 relative z-10 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-blue-400 text-xs font-medium tracking-[0.2em] uppercase mb-3">
            How we work
          </p>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-white mb-4">
            A process built for clarity
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed">
            Eight stages, no surprises. Every handoff is documented, every decision shared, and you&apos;re never left wondering what comes next.
          </p>
        </div>

        {/* ── DESKTOP: staggered wave of cards ─────────────────────────── */}
        {/*
          FIX 1: overflow-x-auto on THIS wrapper so the max-content inner div
          can scroll horizontally instead of being clipped.
          FIX 2: removed invalid -ml-26 (not a Tailwind utility).
        */}
        <div
          className="hidden md:block md:-ml-24"
          style={{
            // Hide scrollbar cross-browser via inline styles so it's
            // guaranteed to apply regardless of CSS load order.
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            paddingBottom: 10,
          }}
        >
          {/* Suppress webkit scrollbar inline since pseudo-elements
              can't be set via style prop — a tiny <style> tag handles it */}
          <style>{`
            #process-desktop-scroll::-webkit-scrollbar { display: none; }
          `}</style>
          <div
            id="process-desktop-scroll"
            style={{
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
              minWidth: 'max-content',
              // Extra bottom padding so tallest staggered card (140px offset)
              // + card body doesn't get clipped by overflow.
              paddingBottom: 8,
            }}
          >
            {steps.map((step, idx) => (
              <div
                key={step.num}
                style={{
                  width: 172,
                  flexShrink: 0,
                  marginTop: STAGGER[idx],
                  opacity: animated ? 1 : 0,
                  transform: animated ? 'translateY(0px)' : 'translateY(32px)',
                  transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${idx * 105}ms,
                               transform 0.65s cubic-bezier(0.16,1,0.3,1) ${idx * 105}ms`,
                  background: 'rgba(15,23,42,0.40)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 16,
                  overflow: 'hidden',
                }}
                className="
                  group cursor-default
                  hover:border-blue-500/20
                  hover:shadow-[0_0_32px_rgba(59,130,246,0.07)]
                  hover:-translate-y-1
                  transition-all duration-300
                "
              >
                <StepVisual icon={step.icon} num={step.num} />
                <div style={{ height: 1, background: 'rgba(255,255,255,0.04)', margin: '0 14px' }} />
                <div className="px-4 pt-3 pb-5">
                  <h3 className="text-white text-sm font-medium tracking-tight leading-snug mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {step.detail.map((d) => (
                      <li key={d} className="flex items-start gap-2">
                        <span
                          className="mt-[5px] w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: 'rgba(59,130,246,0.55)' }}
                        />
                        <span className="text-slate-500 text-[11px] leading-snug">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MOBILE: scrollable carousel ───────────────────────────────── */}
        {/*
          FIX 3: scrollbar-hide class kept, but also set the three scrollbar-
          hiding properties inline to guarantee they apply even if the Tailwind
          plugin class loses the race against a CSS reset or purge.
        */}
        <div
          className="md:hidden"
          style={{
            overflowX: 'auto',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: 8,
          }}
        >
          <style>{`#process-mobile-scroll::-webkit-scrollbar { display: none; }`}</style>
          <div
            id="process-mobile-scroll"
            className="flex gap-3 w-max px-2"
            style={{ alignItems: 'flex-start', paddingBottom: 24 }}
          >
            {steps.map((step, idx) => (
              <div
                key={step.num}
                data-card
                style={{
                  width: 200,
                  flexShrink: 0,
                  marginTop: STAGGER[idx] * 0.55,
                  opacity: animated ? 1 : 0,
                  transform: animated ? 'translateY(0px)' : 'translateY(24px)',
                  transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${idx * 90}ms,
                               transform 0.65s cubic-bezier(0.16,1,0.3,1) ${idx * 90}ms`,
                }}
                className="rounded-2xl border border-white/5 overflow-hidden bg-slate-900/40 backdrop-blur-xl"
              >
                <StepVisual icon={step.icon} num={step.num} />
                <div style={{ height: 1, background: 'rgba(255,255,255,0.04)', margin: '0 14px' }} />
                <div className="px-4 pt-3 pb-5">
                  <h3 className="text-white text-sm font-medium tracking-tight leading-snug mb-3">
                    {step.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {step.detail.map((d) => (
                      <li key={d} className="flex items-start gap-2">
                        <span
                          className="mt-[5px] w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: 'rgba(59,130,246,0.55)' }}
                        />
                        <span className="text-slate-500 text-[11px] leading-snug">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="md:hidden text-xs text-slate-500 text-center mt-2">
          Swipe to explore our process →
        </p>

      </div>
    </section>
  );
};

export default Process;