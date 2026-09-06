import React from 'react';
import type { Client } from '@/types';
import { ClientAvatar } from './ClientAvatar';

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

interface ClientCardProps {
  client: Client;
  condensed?: boolean;
  onSelect: (clientId: string) => void;
}

/* ─── Client card — used in the Dashboard grid, the "select a client" list,
   and the condensed Client Directory modal list ────────────────────────── */
export const ClientCard: React.FC<ClientCardProps> = ({ client, condensed = false, onSelect }) => {
  const heroOpacity = client.heroOpacity ?? 0.15;

  return (
    <div
      className={`relative overflow-hidden bg-black/10 rounded-xl border border-white/5
        hover:border-white/20 hover:bg-white/[0.07] transition-all group cursor-pointer
        ${condensed ? 'flex items-center gap-4 p-4' : 'flex flex-col p-4'}`}
      onClick={() => onSelect(client.id)}
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
