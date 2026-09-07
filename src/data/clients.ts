import type { Client } from '@/types';

/**
 * Single source of truth for real client data — feeds the dashboard
 * mockup, the Portfolio section, and (eventually) the resume's project
 * directory, so every surface stays in sync on name/link/status.
 */
export const clients: Client[] = [
  {
    id: 'c1',
    name: 'Luvera',
    industry: 'Skincare',
    industryColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    status: 'Active',
    progress: 90,
    description: 'Luxury skincare brand specializing in moisturizers.',
    logoUrl: '/dashboard-cards/luvera-icon.png',
    heroImage: '/dashboard-cards/luvera-hero.png',
    heroOpacity: 0.18,
    link: 'https://useluvera.com',
    portfolio: {
      tag: 'E-commerce',
      image: '/portfolio/luvera.png',
      description: 'Advanced interactive visual rebrand built to match luxury aesthetic.',
      hoverClass: 'group-hover:text-violet-400',
    },
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
    portfolio: {
      tag: 'Lead-generator',
      image: '/portfolio/designbyevangelina.png',
      description: 'Custom scrapbook themed portfolio web app for graphic designer.',
      hoverClass: 'group-hover:text-orange-400',
    },
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
    logoUrl: '/dashboard-cards/mastodon-hero.jpg',
    heroImage: '/dashboard-cards/mastodon-hero.jpg',
    heroOpacity: 0.1,
    // link: 'https://mastodonventures.com',
  },
  {
    id: 'c6',
    name: 'Trez Construction Group',
    industry: 'Concrete Contracting',
    industryColor: 'bg-red-500/10 text-red-400 border-red-500/20',
    // status/progress are a best guess (site is live and fully built) — adjust to reflect the actual current relationship.
    status: 'Active',
    progress: 95,
    description: 'Premium concrete and general contracting serving Greater Central Texas.',
    // No logoUrl/heroImage yet — falls back to the silhouette avatar until real
    // logo/screenshot assets are added to public/dashboard-cards/.
    link: 'https://www.trezconstruction.com',
  },
  {
    id: 'c7',
    name: 'Charity Raffle Platform',
    industry: 'Nonprofit Fundraising',
    industryColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    // progress reflects: core platform + domain migration verified working end-to-end;
    // Stripe going live and demo polish still pending per your own plan — adjust as that lands.
    status: 'Active',
    progress: 80,
    description: 'Multi-event raffle and ticketing platform for charity fundraising, with Stripe payments and audited fair drawings.',
    // No logoUrl/heroImage yet — falls back to the silhouette avatar until real
    // logo/screenshot assets are added to public/dashboard-cards/.
    link: 'https://raffles.capitolcity.tech',
  },
];
