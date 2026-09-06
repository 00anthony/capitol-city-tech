import React from 'react';
import type { DashboardTab } from '@/types';
import { SIDEBAR_ITEMS } from './sidebarItems';

interface SidebarNavProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  onNavigate?: () => void; // called after any nav action — used by the mobile drawer to close itself
}

/* ─── Shared nav list, reused by the desktop sidebar and the mobile drawer ── */
export const SidebarNav: React.FC<SidebarNavProps> = ({ activeTab, onSelectTab, onNavigate }) => (
  <div className="space-y-1">
    {SIDEBAR_ITEMS.map(item => {
      if (item.href) {
        return (
          <a
            key={item.id}
            href={item.href}
            onClick={onNavigate}
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
            onSelectTab(item.name as DashboardTab);
            onNavigate?.();
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
);
