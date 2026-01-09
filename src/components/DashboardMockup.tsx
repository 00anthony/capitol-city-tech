'use client'
import React, { useState } from 'react';
import ConsultationForm from './ConsultationForm';

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

const DashboardMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Dashboard' | 'My Task'>('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const businessCards = {
    todo: [
      { id: 'b1', title: 'Solaris Energy', desc: 'Sustainable energy infrastructure platform.', tag: 'Medium', tagColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
      { id: 'b2', title: 'Vanguard Legal', desc: 'Automated legal compliance and document filing.', tag: 'Low', tagColor: 'bg-green-500/10 text-green-400 border-green-500/20' }
    ],
    inProgress: [
      { id: 'b3', title: 'Aether Shoes', desc: 'Direct-to-consumer e-commerce scaling.', tag: 'High', tagColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20', gradient: 'from-purple-600 to-blue-500' },
      { id: 'b4', title: 'Nebula AI', desc: 'Generative AI integration for enterprise workflows.', tag: 'High', tagColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20' }
    ],
    inReview: [
      { id: 'b5', title: 'Lumina Realty', desc: 'PropTech platform for virtual property tours.', tag: 'Medium', tagColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20' }
    ],
    complete: [
      { id: 'b6', title: 'Pulse Health', desc: 'Advanced patient telemetry and data analysis.', tag: 'Low', tagColor: 'bg-green-500/10 text-green-400 border-green-500/20', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&auto=format&fit=crop&q=60', link: 'https://pulsehealth.example.com' },
      { id: 'b7', title: 'Gravity Finance', desc: 'Decentralized asset management dashboard.', tag: 'High', tagColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20', link: 'https://gravity.io' }
    ]
  };

  const internalTasks = {
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

  const filterCards = (cards: any[]) => {
    if (!searchQuery) return cards;
    return cards.filter(c => 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const currentData = activeTab === 'Dashboard' ? businessCards : internalTasks;

  const renderCard = (card: any, isTask: boolean = true) => {
    const CardWrapper = card.link ? 'a' : 'div';
    const wrapperProps = card.link ? { href: card.link, target: "_blank", rel: "noopener noreferrer" } : {};

    return (
      <CardWrapper 
        {...wrapperProps}
        key={card.id} 
        className={`bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/5 hover:border-white/20 transition-all group cursor-pointer shadow-lg shadow-black/20 block ${card.link ? 'hover:bg-white/10 hover:-translate-y-1' : 'hover:bg-white/[0.07]'}`}
      >
        {card.img && (
          <div className="w-full h-24 rounded-lg bg-slate-800/50 mb-3 overflow-hidden relative">
            <img src={card.img} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={card.title} />
            {card.link && (
              <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="bg-white text-black text-[9px] font-bold px-2 py-1 rounded uppercase tracking-tighter">Visit Site</span>
              </div>
            )}
          </div>
        )}
        {card.gradient && <div className={`w-full h-16 rounded-lg bg-linear-to-r ${card.gradient} mb-3 opacity-60 group-hover:opacity-80 transition-opacity`}></div>}
        
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            {card.title}
            {card.link && <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>}
          </h3>
        </div>
        <p className="text-[10px] text-slate-400 mb-4 leading-relaxed line-clamp-2">{card.desc}</p>
        
        <div className="flex items-center justify-between">
          <span className={`px-2 py-0.5 rounded text-[9px] font-medium border ${card.tagColor || 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
            {card.tag}
          </span>
          {isTask && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-[10px] text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> 2
              </div>
              <img className="w-5 h-5 rounded-full border border-white/10" src={`https://ui-avatars.com/api/?name=${card.title[0]}&background=random`} alt="Assignee" />
            </div>
          )}
        </div>
      </CardWrapper>
    );
  };

  const sidebarContent = (
    <>
      <div className="flex items-center gap-2 mb-10 text-white font-medium">
        <div className="w-6 h-6 rounded bg-lineaer-to-tr from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
        </div>
        <span className="text-xs">capitol_city</span>
        {isMobileMenuOpen && (
          <button onClick={() => setIsMobileMenuOpen(false)} className="ml-auto p-2 text-slate-400 hover:text-white">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </button>
        )}
      </div>
      
      <div className="mb-8">
        <div className="space-y-1">
          {[
            { id: 'tab-dash', name: 'Dashboard', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg> },
            { id: 'tab-tasks', name: 'My Task', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg> },
            { id: 'tab-agenda', name: 'Agenda', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>, locked: true },
            { id: 'tab-inbox', name: 'Inbox', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>, locked: true },
            { id: 'tab-reports', name: 'Reports', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>, locked: true }
          ].map((item) => (
            <button 
              key={item.id} 
              disabled={item.locked}
              onClick={() => {
                if (!item.locked) {
                  setActiveTab(item.name as any);
                  setIsMobileMenuOpen(false);
                }
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-xs font-medium group/btn ${activeTab === item.name ? 'text-white bg-white/10 border border-white/5 shadow-inner' : 'text-slate-400 hover:text-white hover:bg-white/5'} ${item.locked ? 'cursor-not-allowed opacity-40' : ''}`}
            >
              {item.icon}
              {item.name}
              {item.name === 'Inbox' && !item.locked && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500"></span>}
              {item.locked && (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-slate-600 group-hover/btn:text-slate-400 transition-colors"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto flex items-center gap-3 px-3 py-2 border-t border-white/5 pt-6">
        <div className="w-8 h-8 rounded-full bg-blue-600 overflow-hidden ring-2 ring-white/5">
          <img src="https://ui-avatars.com/api/?name=C+C&background=0066FF&color=fff" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xs font-medium text-white">Project Admin</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-tighter">Capitol City Tech</span>
        </div>
      </div>
    </>
  );

  return (
    <div className="relative max-w-6xl mx-auto transform hover:scale-[1.005] transition-transform duration-700">
      <ConsultationForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      
      <div className="-inset-1 bg-linear-to-r from-blue-500/20 to-purple-600/20 opacity-30 rounded-3xl absolute blur-2xl"></div>
      
      {/* Translucent Main Window */}
      <div className="relative rounded-2xl bg-slate-950/60 backdrop-blur-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col text-left h-150 md:h-175">
        
        {/* macOS Titlebar - Frosted */}
        <div className="h-10 flex items-center px-4 bg-white/3 backdrop-blur-xl border-b border-white/5 z-30 shrink-0">
          <div className="flex gap-2 w-20">
            <div className="w-3 h-3 rounded-full bg-red-500/70 border border-red-600/10 shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/70 border border-yellow-600/10 shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/70 border border-green-600/10 shadow-sm"></div>
          </div>
          <div className="flex-1 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-medium text-slate-400 tracking-tight">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
              CapitolCityTech.com/live-updates
            </div>
          </div>
          <div className="w-20"></div>
        </div>

        <div className="flex flex-1 overflow-hidden relative">
          
          {/* Mobile Sidebar Overlay */}
          <div className={`fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md transition-opacity lg:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
             <div className={`w-72 h-full bg-[#0F1219] p-6 border-r border-white/10 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {sidebarContent}
             </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="w-64 border-r border-white/5 bg-white/2 backdrop-blur-md hidden lg:flex flex-col p-6">
            {sidebarContent}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col bg-transparent relative overflow-hidden">
            {/* Header */}
            <div className="h-20 border-b border-white/5 flex items-center justify-between px-6 md:px-8 bg-white/1 backdrop-blur-sm z-20">
              <div className="flex items-center gap-3 flex-1">
                {/* Hamburger Button (Mobile Only) */}
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
                </button>
                
                <div className="relative w-full max-w-xs md:max-w-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search in ${activeTab.toLowerCase()}...`} 
                    className="w-full bg-white/3 border border-white/5 rounded-full pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-white/20 placeholder:text-slate-600 transition-all" 
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4 ml-4">
                {/* Call To Action Button (Plus sign) */}
                <button 
                  onClick={() => setIsFormOpen(true)}
                  aria-label="start your project"
                  className="cursor-pointer flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white w-9 h-9 rounded-lg transition-all shadow-lg shadow-blue-500/20 active:scale-90"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"></path></svg>
                </button>
                
                {/* Notifications Widget (Desktop Only) */}
                <button className="hidden md:flex w-8 h-8 rounded-lg border border-white/5 items-center justify-center text-slate-400 cursor-not-allowed relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                </button>
                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                    <img src="https://ui-avatars.com/api/?name=Admin&background=random" className="w-full h-full object-cover cursor-not-allowed" alt="Profile" />
                </div>
              </div>
            </div>

            <div className="px-8 py-6 flex-1 overflow-hidden flex flex-col">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 shrink-0">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">{activeTab === 'Dashboard' ? 'Ecosystem' : 'Board'}</div>
                  <h2 className="text-2xl font-semibold text-white">{activeTab === 'Dashboard' ? 'Client Partners' : 'Internal Roadmap'}</h2>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <img key="u1" className="w-8 h-8 rounded-full border-2 border-slate-900/50" src="https://ui-avatars.com/api/?name=1&background=random" alt="User" />
                    <img key="u2" className="w-8 h-8 rounded-full border-2 border-slate-900/50" src="https://ui-avatars.com/api/?name=2&background=random" alt="User" />
                    <div key="u-more" className="w-8 h-8 rounded-full border-2 border-slate-900/50 bg-white/10 flex items-center justify-center text-[10px] text-white">12+</div>
                  </div>
                  
                  {/* Non-clickable Restricted Widgets */}
                  <div className="hidden lg:flex items-center gap-1.5 pl-4 border-l border-white/6 ml-2">
                    <div title="Restricted access" className="w-7 h-7 rounded-lg border border-white/5 flex items-center justify-center text-slate-400 cursor-not-allowed">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                    </div>
                    <div title="Restricted access" className="w-7 h-7 rounded-lg border border-white/5 flex items-center justify-center text-slate-400 cursor-not-allowed ">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Columns */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-1 overflow-hidden overflow-y-auto dashboard-scroll pb-10 pr-2">
                
                {/* Column Render Helper */}
                {[
                  { title: 'To do', key: 'todo', color: 'bg-pink-500', shadow: 'rgba(236,72,153,0.5)' },
                  { title: 'In progress', key: 'inProgress', color: 'bg-yellow-500', shadow: 'rgba(234,179,8,0.5)' },
                  { title: 'In review', key: 'inReview', color: 'bg-blue-500', shadow: 'rgba(59,130,246,0.5)' },
                  { title: 'Complete', key: 'complete', color: 'bg-green-500', shadow: 'rgba(34,197,94,0.5)' }
                ].map((col) => {
                  const filtered = filterCards(currentData[col.key as keyof typeof currentData]);
                  return (
                    <div key={col.key} className="flex flex-col gap-4">
                      <div className="flex items-center gap-2 mb-2 sticky top-0 bg-slate-950/20 backdrop-blur-sm py-1 z-10">
                        <div className={`w-1 h-4 rounded-full ${col.color}`} style={{ boxShadow: `0 0 8px ${col.shadow}` }}></div>
                        <span className="text-xs font-medium text-white">{col.title}</span>
                        <span className="w-5 h-5 rounded bg-white/5 flex items-center justify-center text-[10px] text-slate-500">
                          {filtered.length}
                        </span>
                      </div>
                      {filtered.length > 0 ? (
                        filtered.map(card => renderCard(card, activeTab === 'My Task'))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-10 opacity-20 border border-dashed border-white/10 rounded-xl">
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                           <span className="text-[10px] mt-2 tracking-tight">No results</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;
