'use client'
import React, { useState } from 'react';
import ConsultationForm from './ConsultationForm';

interface Client {
  id: string;
  name: string;
  industry: string;
  industryColor: string;       // tailwind bg + text classes, e.g. 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  status: 'Active' | 'Paused' | 'Pending' | 'Complete';
  progress: number;
  description: string;
  logoUrl?: string;            // avatar / logo shown in the circular image slot
  heroImage?: string;          // full-bleed background screenshot of the website
  heroOpacity?: number;        // 0–1, defaults to 0.15
  link?: string;               // external URL opened in a new tab
}

interface Card {
  id: string;
  title: string;
  desc: string;
  tag: 'Low' | 'Medium' | 'High';
  tagColor: string;
  img?: string;
  gradient?: string;
  link?: string;
}

/* ─── Fallback silhouette (used when no logoUrl is provided) ─────────────── */
const UserSilhouette = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-slate-500 bg-slate-800 p-1">
    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" fill="currentColor"/>
    <path d="M6 21C6 17.134 9.13401 14 13 14H11C7.13401 14 4 17.134 4 21" fill="currentColor"/>
    <path d="M18 21C18 17.134 14.866 14 11 14" fill="currentColor" opacity="0.5"/>
  </svg>
);

/* ─── Reusable avatar: image when available, silhouette otherwise ─────────── */
const ClientAvatar = ({ client, className }: { client: Client; className?: string }) => (
  <div className={`rounded-lg shrink-0 overflow-hidden flex items-center justify-center ${className ?? 'w-12 h-12'}`}>
    {client.logoUrl
      ? <img src={client.logoUrl} alt={client.name} className="w-full h-full object-cover" />
      : <div className="w-full h-full"><UserSilhouette /></div>
    }
  </div>
);

/* ─── External-link icon ─────────────────────────────────────────────────── */
const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const DashboardMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Dashboard' | 'My Task'>('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  /* ── Client data ── */
  const clients: Client[] = [
    {
      id: 'c1',
      name: 'Luvera',
      industry: 'Skincare',
      industryColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      status: 'Active',
      progress: 90,
      description: 'Luxury skincare brand specializing in moisturizers.',
      logoUrl: '/dashboard-cards/luvera-headshot.webp',
      heroImage: '/dashboard-cards/luvera-hero.png',
      heroOpacity: 0.18,
      link: 'https://useluvera.com',
    },
    {
      id: 'c2',
      name: 'Far Out Media',
      industry: 'Videography',
      industryColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      status: 'Complete',
      progress: 100,
      description: 'Industry-leading commercial, promotional, and event videography.',
      logoUrl: '/dashboard-cards/faroutmedia-logo.png',
      heroImage: '/dashboard-cards/faroutmedia-hero.png',
      heroOpacity: 0.15,
      link: 'https://faroutmediaco.com',
    },
    {
      id: 'c3',
      name: 'Design by Evangelina',
      industry: 'Marketing',
      industryColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      status: 'Complete',
      progress: 100,
      description: 'Versatile, enterprise-level design and marketing services.',
      logoUrl: '/dashboard-cards/designbyevangelina-headshot.png',
      heroImage: '/dashboard-cards/designbyevangelina-hero.png',
      heroOpacity: 0.12,
      link: 'https://designbyevangelina.com',
    },
    {
      id: 'c4',
      name: 'PT Roofing & Renovations',
      industry: 'Contracting',
      industryColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      status: 'Active',
      progress: 90,
      description: 'Local experts in residential roofing and renovations.',
      logoUrl: '/dashboard-cards/pt-logo.jpg',
      heroImage: '/dashboard-cards/pt-hero.png',
      heroOpacity: 0.15,
      link: 'https://ptroofingandrenovations.com',
    },
    {
      id: 'c5',
      name: 'Mastodon Ventures',
      industry: 'Investment Banking',
      industryColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      status: 'Pending',
      progress: 25,
      description: 'Expert financial advising in the restaurant industry.',
      logoUrl: '/dashboard-cards/mastodon-headshot.webp',
      heroImage: '/dashboard-cards/mastodon-hero.jpg',
      heroOpacity: 0.1,
      // link: 'https://mastodonventures.com',
    },
  ];

  const projectData = {
    todo: [
      { id: 't1', title: 'Revision Profile Page', desc: 'Create mobile wireframes & Website Task Management...', tag: 'Low', tagColor: 'bg-green-500/10 text-green-400 border-green-500/20' },
      { id: 't2', title: 'Gradient Style', desc: 'Create a gradient for the example from the wallpaper...', tag: 'Low', tagColor: 'bg-green-500/10 text-green-400 border-green-500/20', gradient: 'from-blue-600 to-purple-500' }
    ],
    inProgress: [
      { id: 't3', title: 'Sign In Page', desc: 'This sign in page will later be used for all products.', tag: 'Low', tagColor: 'bg-green-500/10 text-green-400 border-green-500/20' },
      { id: 't4', title: 'Wireframe', desc: 'Create wireframes mobile & Website Task Management...', tag: 'Medium', tagColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20', img: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg' }
    ],
    inReview: [
      { id: 't5', title: 'Mock Up', desc: 'Finalize high fidelity designs for client approval.', tag: 'High', tagColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20' }
    ],
    complete: [
      { id: 't6', title: 'Prototype', desc: 'Full interaction model ready for dev handoff...', tag: 'Medium', tagColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60' }
    ]
  };

  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ─── Client card (Dashboard grid + condensed modal list) ──────────────── */
  const renderClientCard = (client: Client, condensed = false) => {
    const heroOpacity = client.heroOpacity ?? 0.15;

    return (
      <div
        key={client.id}
        className={`relative overflow-hidden bg-black/10 rounded-xl border border-white/5
          hover:border-white/20 hover:bg-white/[0.07] transition-all group cursor-pointer
          ${condensed ? 'flex items-center gap-4 p-4' : 'flex flex-col p-4'}`}
        onClick={() => {
          setSelectedClientId(client.id);
          setActiveTab('My Task');
          setIsClientModalOpen(false);
        }}
      >
        {/* Hero image background */}
        {client.heroImage && !condensed && (
          <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none"
            style={{
              backgroundImage: `url(${client.heroImage})`,
              opacity: heroOpacity,
            }}
          />
        )}
        {/* Subtle gradient scrim so text stays readable over any hero */}
        {client.heroImage && !condensed && (
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
        )}

        {/* Avatar */}
        <ClientAvatar
          client={client}
          className={`relative z-10 bg-slate-800 ${condensed ? 'w-10 h-10' : 'w-12 h-12 mb-4'}`}
        />

        <div className="relative z-10 flex-1">
          <div className={`flex items-start ${condensed ? '' : 'justify-between'}`}>
            <h4 className="text-xs font-semibold text-white group-hover:text-blue-400 transition-colors">
              {client.name}
            </h4>
            {/* External link — only in full (non-condensed) mode */}
            {client.link && !condensed && (
              <a
                href={client.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title={`Visit ${client.name}`}
                className="ml-auto flex items-center gap-1 text-[9px] text-slate-500 hover:text-blue-400 transition-colors border border-white/5 hover:border-blue-500/30 rounded px-1.5 py-0.5"
              >
                Visit site&nbsp;<ExternalLinkIcon />
              </a>
            )}
          </div>

          {!condensed && (
            <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
              {client.description}
            </p>
          )}

          <div className={`flex items-center gap-2 mt-2 ${condensed ? 'hidden' : ''}`}>
            {/* Industry pill with custom color */}
            <span className={`text-[9px] px-1.5 py-0.5 mb-0.5 rounded border ${client.industryColor}`}>
              {client.industry}
            </span>
            
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 mb-1">
            <span>Development Progress</span>
            <span>{client.progress}%</span>
          </div>
          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden ">
            <div className="h-full bg-blue-500" style={{ width: `${client.progress}%` }}></div>
          </div>
        </div>
      </div>
    );
  };

  const renderCard = (card: any) => (
    <div key={card.id} className="bg-white/5  p-4 rounded-xl border border-white/5 hover:border-white/20 transition-all group cursor-pointer shadow-lg shadow-black/20 block hover:bg-white/[0.07]">
      {card.img && <div className="w-full h-24 rounded-lg bg-slate-800/50 mb-3 overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity"><img src={card.img} className="w-full h-full object-cover" alt={card.title} /></div>}
      {card.gradient && <div className={`w-full h-16 rounded-lg bg-linear-to-r ${card.gradient} mb-3 opacity-60 group-hover:opacity-80 transition-opacity`}></div>}
      <h3 className="text-xs font-semibold text-slate-200 mb-1">{card.title}</h3>
      <p className="text-[10px] text-slate-400 mb-4 leading-relaxed line-clamp-2">{card.desc}</p>
      <div className="flex items-center justify-between">
        <span className={`px-2 py-0.5 rounded text-[9px] font-medium border ${card.tagColor}`}>{card.tag}</span>
        <div className="w-5 h-5 rounded-full overflow-hidden border border-white/10"><UserSilhouette /></div>
      </div>
    </div>
  );

  /* ─── Sidebar nav items ────────────────────────────────────────────────── */
  const sidebarItems = [
    {
      id: 'tab-dash',
      name: 'Dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="7" height="9" x="3" y="3" rx="1"></rect>
          <rect width="7" height="5" x="14" y="3" rx="1"></rect>
          <rect width="7" height="9" x="14" y="12" rx="1"></rect>
          <rect width="7" height="5" x="3" y="16" rx="1"></rect>
        </svg>
      ),
    },
    {
      id: 'tab-tasks',
      name: 'My Task',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9"></path>
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
        </svg>
      ),
    },
    {
      id: 'tab-testimonials',
      name: 'Testimonials',
      href: '/#testimonials',       // anchor link — handled via <a> below
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Simple open-quote / speech-bubble style icon */}
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
        </svg>
      ),
    },
    {
      id: 'tab-agenda',
      name: 'Agenda',
      locked: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
          <line x1="16" x2="16" y1="2" y2="6"></line>
          <line x1="8" x2="8" y1="2" y2="6"></line>
          <line x1="3" x2="21" y1="10" y2="10"></line>
        </svg>
      ),
    },
    {
      id: 'tab-inbox',
      name: 'Inbox',
      locked: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
    },
    
  ];

  return (
    <div className="relative max-w-6xl mx-auto transform hover:scale-[1.002] transition-transform duration-700">
      <ConsultationForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

      {/* Client Directory Modal */}
      {isClientModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md">
          <div className="bg-slate-900/90 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Client Directory</h3>
              <button onClick={() => setIsClientModalOpen(false)} className="text-slate-500 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto space-y-2 dashboard-scroll">
              {clients.map(client => renderClientCard(client, true))}
            </div>
          </div>
        </div>
      )}

      <div className="-inset-1 bg-linear-to-r from-blue-500/20 to-purple-600/20 opacity-30 rounded-3xl absolute blur-2xl"></div>

      <div className="relative rounded-2xl bg-slate-950/60 backdrop-blur-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col text-left h-150 md:h-175">
        {/* macOS Titlebar */}
        <div className="h-10 flex items-center px-4 bg-white/3 backdrop-blur-xl border-b border-white/5 shrink-0 z-30">
          <div className="flex gap-2 w-20">
            <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
          </div>
          <div className="flex-1 text-center text-[10px] text-slate-500 font-medium">CapitolCityTech.workflow</div>
          <div className="w-20"></div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* ── Sidebar ── */}
          <div className="w-64 border-r border-white/5 bg-white/2 backdrop-blur-md hidden lg:flex flex-col p-6 shrink-0">
            <div className="flex items-center gap-2 mb-10 text-white font-medium">
              <div className="w-6 h-6 rounded bg-linear-to-tr from-blue-400 to-indigo-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                </svg>
              </div>
              <span className="text-xs">capitol_city</span>
            </div>

            <div className="space-y-1">
              {sidebarItems.map(item => {
                /* Testimonials: plain anchor navigating to /#testimonials */
                if (item.href) {
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5"
                    >
                      {item.icon}
                      {item.name}
                    </a>
                  );
                }

                return (
                  <button
                    key={item.id}
                    disabled={item.locked}
                    onClick={() => {
                      setActiveTab(item.name as any);
                      if (item.name === 'My Task') setSelectedClientId(null);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-xs font-medium
                      ${activeTab === item.name
                        ? 'text-white bg-white/10 border border-white/5'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'}
                      ${item.locked ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    {item.icon}
                    {item.name}
                    {item.locked && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800"><UserSilhouette /></div>
              <div className="flex flex-col text-[10px]">
                <span className="text-white font-medium">Project Admin</span>
                <span className="text-slate-500 uppercase">CCT_INTERNAL</span>
              </div>
            </div>
          </div>

          {/* ── Main content ── */}
          <div className="flex-1 flex flex-col relative overflow-hidden">
            {/* Header */}
            <div className="h-20 border-b border-white/5 flex items-center justify-between px-6 md:px-8 bg-white/1 backdrop-blur-sm z-20 shrink-0">
              <div className="flex items-center gap-3 flex-1">
                <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-slate-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" x2="20" y1="12" y2="12"></line>
                    <line x1="4" x2="20" y1="6" y2="6"></line>
                    <line x1="4" x2="20" y1="18" y2="18"></line>
                  </svg>
                </button>
                <div className="relative w-full max-w-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                    <circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path>
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full bg-white/3 border border-white/5 rounded-full pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-white/20 transition-all"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsFormOpen(true)}
                  aria-label="start your project"
                  className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white w-9 h-9 rounded-lg transition-all shadow-lg active:scale-90"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                </button>
                <button className="hidden md:flex w-8 h-8 rounded-lg border border-white/5 items-center justify-center text-slate-400 hover:text-white relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                  </svg>
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                </button>
                <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800 border border-white/10"><UserSilhouette /></div>
              </div>
            </div>

            <div className="px-8 py-6 flex-1 overflow-hidden flex flex-col">
              {/* Contextual Header */}
              <div className="flex items-center justify-between mb-8 shrink-0">
                <div className="flex items-center gap-3">
                  {selectedClientId && activeTab === 'My Task' && (
                    <button onClick={() => setSelectedClientId(null)} className="p-2 -ml-2 text-slate-500 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6"></path>
                      </svg>
                    </button>
                  )}
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                      {activeTab === 'Dashboard'
                        ? 'Client Partners'
                        : selectedClientId
                          ? clients.find(c => c.id === selectedClientId)?.name
                          : 'Internal Roadmap'}
                    </div>
                    <h2 className="text-2xl font-semibold text-white">
                      {activeTab === 'Dashboard' ? 'Ecosystem' : selectedClientId ? 'Project Roadmap' : 'Partner Directory'}
                    </h2>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div onClick={() => setIsClientModalOpen(true)} className="flex -space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-950 overflow-hidden"><UserSilhouette /></div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-slate-950 bg-white/10 flex items-center justify-center text-[10px] text-white">12+</div>
                  </div>
                  <div className="hidden lg:flex items-center gap-1.5 pl-4 border-l border-white/5 opacity-30">
                    <div className="w-7 h-7 rounded-lg border border-white/5 flex items-center justify-center text-slate-700">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                      </svg>
                    </div>
                    <div className="w-7 h-7 rounded-lg border border-white/5 flex items-center justify-center text-slate-700">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-hidden overflow-y-auto pr-2 dashboard-scroll pb-10">
                {activeTab === 'Dashboard' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredClients.map(client => renderClientCard(client))}
                  </div>
                ) : !selectedClientId ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredClients.map(client => (
                      <div
                        key={client.id}
                        onClick={() => setSelectedClientId(client.id)}
                        className="relative overflow-hidden bg-white/5 border border-white/5 rounded-xl p-5 hover:border-blue-500/30 transition-all cursor-pointer group flex flex-col"
                      >
                        {/* Hero image in partner directory cards too */}
                        {client.heroImage && (
                          <>
                            <div
                              className="absolute inset-0 bg-cover bg-center pointer-events-none"
                              style={{ backgroundImage: `url(${client.heroImage})`, opacity: client.heroOpacity ?? 0.15 }}
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                          </>
                        )}
                        <ClientAvatar client={client} className="relative z-10 w-10 h-10 mb-4 bg-slate-800" />
                        <h3 className="relative z-10 text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{client.name}</h3>
                        <p className="relative z-10 text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">{client.description}</p>
                        <div className="relative z-10 mt-auto pt-6">
                          <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                            <span>Development Progress</span>
                            <span>{client.progress}%</span>
                          </div>
                          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500" style={{ width: `${client.progress}%` }}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                      { title: 'To do', key: 'todo', color: 'bg-pink-500' },
                      { title: 'In progress', key: 'inProgress', color: 'bg-yellow-500' },
                      { title: 'In review', key: 'inReview', color: 'bg-blue-500' },
                      { title: 'Complete', key: 'complete', color: 'bg-green-500' }
                    ].map(col => (
                      <div key={col.key} className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 mb-2 sticky top-0 bg-slate-950/20 backdrop-blur-sm py-1 z-10">
                          <div className={`w-1 h-4 rounded-full ${col.color}`}></div>
                          <span className="text-xs font-medium text-white">{col.title}</span>
                          <span className="w-5 h-5 rounded bg-white/5 flex items-center justify-center text-[10px] text-slate-500">
                            {projectData[col.key as keyof typeof projectData].length}
                          </span>
                        </div>
                        {projectData[col.key as keyof typeof projectData].map(card => renderCard(card))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;