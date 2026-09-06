import React from 'react';
import type { Client } from '@/types';
import { ClientCard } from './ClientCard';

interface ClientDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  clients: Client[];
  onSelectClient: (clientId: string) => void;
}

export const ClientDirectoryModal: React.FC<ClientDirectoryModalProps> = ({ isOpen, onClose, clients, onSelectClient }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md">
      <div className="bg-slate-900/90 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Client Directory</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
        <div className="p-4 overflow-y-auto space-y-2 dashboard-scroll">
          {clients.map(client => (
            <ClientCard key={client.id} client={client} condensed onSelect={onSelectClient} />
          ))}
        </div>
      </div>
    </div>
  );
};
