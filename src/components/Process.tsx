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
  const [mobileOpen, setMobileOpen] = useState<number | null>(null);
  const [mobileTab, setMobileTab] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  const handleMobileTabClick = (idx: number) => {
    setMobileTab(idx);
    setMobileOpen(null);
    if (carouselRef.current) {
      const cards = carouselRef.current.querySelectorAll<HTMLElement>('[data-card]');
      cards[idx]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  useEffect(() => {
    if (!carouselRef.current) return;
    const cards = carouselRef.current.querySelectorAll<HTMLElement>('[data-card]');
    cards[mobileTab]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [mobileTab]);

  return (
    <section id="process" className="py-24 relative z-10 border-b border-white/5 ">
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
            Eight stages, no surprises. Every handoff is documented, every decision shared, and you're never left wondering what comes next.
          </p>
        </div>

        {/* ── DESKTOP: staggered wave of cards ─────────────────────────── */}
        <div ref={sectionRef} className="hidden md:block overflow-visible pb-10 -ml-26 px-6">
          {/* Padding-bottom so the tallest stagger + card doesn't clip */}
          <div
            style={{
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
              minWidth: 'max-content',
              // Enough vertical room for stagger max (140) + card content
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
                  // Slide-up + fade entrance, staggered per card
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
                {/* Circular visual */}
                <StepVisual icon={step.icon} num={step.num} />

                {/* Subtle divider */}
                <div style={{ height: 1, background: 'rgba(255,255,255,0.04)', margin: '0 14px' }} />

                {/* Text content */}
                <div className="px-4 pt-3 pb-5">
                  <h3
                    className="
                      text-white text-sm font-medium tracking-tight leading-snug mb-3
                      group-hover:text-blue-400 transition-colors duration-300
                    "
                  >
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

        {/* ── MOBILE: tabbed carousel ───────────────────────────────────── */}
        <div className="md:hidden">

          {/* Tab strip */}
          <div className="flex overflow-x-auto gap-2 pb-4 mb-3 scrollbar-hide">
            {steps.map((step, idx) => (
              <button
                key={step.num}
                onClick={() => handleMobileTabClick(idx)}
                className={`
                  shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium font-mono tracking-wide
                  transition-all duration-250 border
                  ${mobileTab === idx
                    ? 'bg-blue-500/12 border-blue-500/38 text-blue-400'
                    : 'bg-white/3 border-white/8 text-slate-500 hover:text-slate-300 hover:border-white/14'
                  }
                `}
              >
                {step.num}
              </button>
            ))}
          </div>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-4 snap-x snap-mandatory scrollbar-hide -mx-2 px-2"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {steps.map((step, idx) => {
              const isOpen = mobileOpen === idx;
              return (
                <div
                  key={step.num}
                  data-card
                  className="shrink-0 w-full snap-center"
                >
                  <div
                    className="rounded-xl border border-white/5 overflow-hidden transition-all duration-300"
                    style={{
                      background: 'rgba(15,23,42,0.40)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                    }}
                  >
                    {/* Card header */}
                    <div className="flex items-center gap-3 p-5">
                      <div
                        className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
                        style={{
                          background: 'rgba(15,23,42,0.7)',
                          border: '1px solid rgba(255,255,255,0.09)',
                        }}
                      >
                        <span className="text-[10px] font-mono font-bold text-blue-400">
                          {step.num}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <span className="text-blue-400/65 flex-shrink-0">{step.icon}</span>
                        <h3 className="text-white font-medium text-base truncate">{step.title}</h3>
                      </div>
                      <button
                        onClick={() =>
                          setMobileOpen(prev => (prev === idx ? null : idx))
                        }
                        className={`
                          shrink-0 w-8 h-8 flex items-center justify-center rounded-lg
                          border transition-all duration-250
                          ${isOpen
                            ? 'border-blue-500/30 text-blue-400'
                            : 'border-white/8 text-slate-400 hover:text-blue-400 hover:border-blue-500/25'
                          }
                        `}
                        aria-label={isOpen ? 'Collapse' : 'Expand'}
                      >
                        <svg
                          width="13" height="13" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    </div>

                    {/* Expandable body */}
                    <div
                      className={`transition-all duration-500 ease-out overflow-hidden ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-5 pb-5 border-t border-white/5 pt-4">
                        <p className="text-slate-400 text-sm leading-relaxed mb-4">{step.desc}</p>
                        <ul className="space-y-2">
                          {step.detail.map((d) => (
                            <li key={d} className="flex items-center gap-2.5 text-xs text-slate-500">
                              <span
                                className="w-1 h-1 rounded-full flex-shrink-0"
                                style={{ background: 'rgba(59,130,246,0.60)' }}
                              />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dot indicator */}
          <div className="flex justify-center gap-1.5 mt-5">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleMobileTabClick(idx)}
                aria-label={`Go to step ${idx + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  mobileTab === idx ? 'w-4 h-1.5 bg-blue-500' : 'w-1.5 h-1.5 bg-white/14'
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Process;