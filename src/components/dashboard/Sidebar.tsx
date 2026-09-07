import React from 'react';
import Image from 'next/image';
import type { DashboardTab } from '@/types';
import { SidebarNav } from './SidebarNav';
import { UserSilhouette } from './ClientAvatar';

interface SidebarProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => (
  <div className="w-64 border-r border-white/5 bg-white/2 backdrop-blur-md hidden lg:flex flex-col p-6 shrink-0">
    <div className="flex items-center gap-2 mb-10 -mt-2 text-white font-medium">
      <Image src="/logo-white.png" alt="logo" height={40} width={40} className="mb-2" />
      <span className="text-xs">Capitol City Tech</span>
    </div>

    <SidebarNav activeTab={activeTab} onSelectTab={onSelectTab} />

    <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-3">
      <div className="cursor-not-allowed w-8 h-8 rounded-full overflow-hidden bg-slate-800"><UserSilhouette /></div>
      <div className="flex flex-col text-[10px] ">
        <span className="text-white font-medium">Guest Admin</span>
        <span className="text-slate-500 uppercase">CCT_INTERNAL</span>
      </div>
    </div>
  </div>
);
