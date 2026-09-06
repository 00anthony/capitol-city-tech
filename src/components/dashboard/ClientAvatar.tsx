import React from 'react';
import Image from 'next/image';
import type { Client } from '@/types';

/* ─── Fallback silhouette (used when no logoUrl is provided) ─────────────── */
export const UserSilhouette = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-slate-500 bg-slate-800 p-1">
    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" fill="currentColor"/>
    <path d="M6 21C6 17.134 9.13401 14 13 14H11C7.13401 14 4 17.134 4 21" fill="currentColor"/>
    <path d="M18 21C18 17.134 14.866 14 11 14" fill="currentColor" opacity="0.5"/>
  </svg>
);

/* ─── Reusable avatar: image when available, silhouette otherwise ─────────── */
export const ClientAvatar = ({ client, className }: { client: Client; className?: string }) => (
  <div className={`relative rounded-lg shrink-0 overflow-hidden flex items-center justify-center ${className ?? 'w-12 h-12'}`}>
    {client.logoUrl
      ? <Image src={client.logoUrl} alt={client.name} fill sizes="48px" className="object-cover" />
      : <div className="w-full h-full"><UserSilhouette /></div>
    }
  </div>
);
