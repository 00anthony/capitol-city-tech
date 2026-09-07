import React from 'react';
import Image from 'next/image';
import type { DashboardTab } from '@/types';
import { SidebarNav } from './SidebarNav';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose, activeTab, onSelectTab }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 lg:hidden">
      <div onClick={onClose} className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />
      <div className="absolute left-0 top-0 bottom-0 w-64 bg-slate-950/95 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2 text-white font-medium">
            <Image src="/logo-white.png" alt="logo" height={32} width={32} />
            <span className="text-xs">Capitol City Tech</span>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
        <SidebarNav activeTab={activeTab} onSelectTab={onSelectTab} onNavigate={onClose} />
      </div>
    </div>
  );
};
