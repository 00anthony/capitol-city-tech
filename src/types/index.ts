export interface Client {
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
  portfolio?: {                // present only for clients featured in the Portfolio section
    tag: string;
    image: string;
    description: string;
    hoverClass: string;        // tailwind group-hover text color for the project title
  };
}

export interface TaskCard {
  id: string;
  title: string;
  desc: string;
  tag: 'Low' | 'Medium' | 'High';
  tagColor: string;
}

export type ProjectBoard = {
  todo: TaskCard[];
  inProgress: TaskCard[];
  inReview: TaskCard[];
  complete: TaskCard[];
};

export type DashboardTab = 'Dashboard' | 'My Task';
