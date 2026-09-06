'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ConsultationForm from '@/components/ConsultationForm';
import type { DashboardTab } from '@/types';
import { clients } from '@/data/clients';
import { getProjectBoard } from '@/lib/projectBoard';
import { Sidebar } from './Sidebar';
import { MobileDrawer } from './MobileDrawer';
import { ClientCard } from './ClientCard';
import { ClientDirectoryModal } from './ClientDirectoryModal';
import { KanbanBoard } from './KanbanBoard';

const DashboardMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  const handleSelectTab = (tab: DashboardTab) => {
    setActiveTab(tab);
    if (tab === 'My Task') setSelectedClientId(null);
  };

  const handleSelectClient = (clientId: string) => {
    setSelectedClientId(clientId);
    setActiveTab('My Task');
    setIsClientModalOpen(false);
  };

  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedClient = selectedClientId ? clients.find(c => c.id === selectedClientId) ?? null : null;
  const projectBoard = selectedClient ? getProjectBoard(selectedClient) : null;

  /* Lock body scroll while an overlay (client directory or mobile nav) is open */
  useEffect(() => {
    const shouldLock = isClientModalOpen || isMobileMenuOpen;
    document.body.style.overflow = shouldLock ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isClientModalOpen, isMobileMenuOpen]);

  return (
    <div className="relative max-w-6xl mx-auto transform transition-transform duration-700">
      <ConsultationForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

      <ClientDirectoryModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        clients={clients}
        onSelectClient={handleSelectClient}
      />

      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
      />

      <div className="-inset-1 bg-linear-to-r from-blue-500/20 to-purple-600/20 opacity-30 rounded-3xl absolute blur-2xl"></div>

      <div className="relative rounded-2xl bg-slate-950/60 backdrop-blur-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col text-left h-150 md:h-175">
        {/* macOS Titlebar */}
        <div className="h-10 flex items-center px-4 bg-white/3 backdrop-blur-xl border-b border-white/5 shrink-0 z-30">
          <div className="flex gap-2 w-20">
            <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
          </div>
          <div className="flex-1 text-center text-[10px] text-slate-500 font-medium">CapitolCity.Tech/workflow</div>
          <div className="w-20"></div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <Sidebar activeTab={activeTab} onSelectTab={handleSelectTab} />

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
                  className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white w-9 h-9 rounded-lg transition-all shadow-lg active:scale-90 cursor-pointer"
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
                <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800/10 border border-white/10 flex items-center text-slate-800 justify-center cursor-not-allowed">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <rect x="4" y="4" width="16" height="16" rx="4" />
                    <path d="M8 12l3 3 5-6" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 flex-1 overflow-hidden flex flex-col">
              {/* Contextual Header */}
              <div className="flex items-center justify-between mb-8 shrink-0">
                <div className="flex items-center gap-3">
                  {selectedClientId && activeTab === 'My Task' && (
                    <button
                      onClick={() => { setSelectedClientId(null); setActiveTab('Dashboard'); }}
                      className="p-2 -ml-2 text-slate-500 hover:text-white transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6"></path>
                      </svg>
                    </button>
                  )}
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                      {activeTab === 'Dashboard'
                        ? 'Client Partners'
                        : selectedClient
                          ? selectedClient.name
                          : 'Internal Roadmap'}
                    </div>
                    <h2 className="text-2xl font-semibold text-white">
                      {activeTab === 'Dashboard' ? 'Ecosystem' : selectedClient ? 'Project Roadmap' : 'Select a Client'}
                    </h2>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div onClick={() => setIsClientModalOpen(true)} className="flex -space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
                    {clients.slice(0, 3).map(client => (
                      <div key={client.id} className="relative w-8 h-8 rounded-full border-2 border-slate-950 overflow-hidden">
                        {client.logoUrl && <Image src={client.logoUrl} alt={client.name} fill sizes="32px" className="object-cover" />}
                      </div>
                    ))}
                    {clients.length > 3 && (
                      <div className="w-8 h-8 rounded-full border-2 border-slate-950 bg-neutral-800 flex items-center justify-center text-[10px] text-white">
                        {clients.length - 3}+
                      </div>
                    )}
                  </div>
                  <div className="hidden lg:flex items-center gap-1.5 pl-4 border-l border-white/5 opacity-30">
                    <div className="cursor-not-allowed w-7 h-7 rounded-lg border border-white/5 flex items-center justify-center text-slate-700">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                      </svg>
                    </div>
                    <div className="cursor-not-allowed w-7 h-7 rounded-lg border border-white/5 flex items-center justify-center text-slate-700">
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
                    {filteredClients.map(client => (
                      <ClientCard key={client.id} client={client} onSelect={handleSelectClient} />
                    ))}
                  </div>
                ) : !selectedClient ? (
                  <div className="max-w-2xl">
                    <p className="text-xs text-slate-500 mb-4">Select a client below to view their project roadmap.</p>
                    <div className="space-y-2">
                      {filteredClients.map(client => (
                        <ClientCard key={client.id} client={client} condensed onSelect={handleSelectClient} />
                      ))}
                    </div>
                  </div>
                ) : (
                  projectBoard && <KanbanBoard board={projectBoard} />
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
