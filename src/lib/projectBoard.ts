import type { Client, TaskCard, ProjectBoard } from '@/types';

const TAG_COLOR: Record<TaskCard['tag'], string> = {
  Low: 'bg-green-500/10 text-green-400 border-green-500/20',
  Medium: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  High: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
};

/* ─── Generic phase templates, reused across every project's board ───────── */
const TASK_TEMPLATES: Record<string, { title: string; desc: string; tag: TaskCard['tag'] }> = {
  strategy: { title: 'Strategy & Discovery', desc: 'Stakeholder interviews, competitive audit, and roadmap.', tag: 'Low' },
  content: { title: 'Content & Asset Collection', desc: 'Copy, photography, and brand assets gathered.', tag: 'Low' },
  wireframes: { title: 'Wireframes & Architecture', desc: 'Low-fidelity structure for every core page.', tag: 'Low' },
  design: { title: 'High-Fidelity Design', desc: 'Figma mockups for desktop and mobile breakpoints.', tag: 'Medium' },
  development: { title: 'Core Development', desc: 'React / Next.js build of the primary page templates.', tag: 'Medium' },
  integrations: { title: 'API & CMS Integration', desc: 'Third-party services and content wired in.', tag: 'Medium' },
  revisions: { title: 'Client Revisions', desc: 'Feedback round incorporated into the build.', tag: 'Medium' },
  qa: { title: 'QA & Accessibility Pass', desc: 'Cross-browser testing and a WCAG audit.', tag: 'High' },
  launch: { title: 'Launch Prep', desc: 'DNS cutover, monitoring, and a final smoke test.', tag: 'High' },
};

const taskCard = (clientId: string, key: keyof typeof TASK_TEMPLATES): TaskCard => {
  const t = TASK_TEMPLATES[key];
  return { id: `${clientId}-${key}`, title: t.title, desc: t.desc, tag: t.tag, tagColor: TAG_COLOR[t.tag] };
};

/**
 * Derives a client's kanban board from their real status/progress fields,
 * using a shared pool of generic phase templates rather than one project
 * board hardcoded for every client.
 */
export const getProjectBoard = (client: Client): ProjectBoard => {
  if (client.status === 'Complete') {
    return {
      todo: [],
      inProgress: [],
      inReview: [],
      complete: [{
        id: `${client.id}-launched`,
        title: `${client.name} — Launched`,
        desc: 'Delivered and live in production.',
        tag: 'Low',
        tagColor: TAG_COLOR.Low,
      }],
    };
  }

  const p = client.progress;
  let done: (keyof typeof TASK_TEMPLATES)[] = [];
  let review: (keyof typeof TASK_TEMPLATES)[] = [];
  let progress: (keyof typeof TASK_TEMPLATES)[] = [];
  let todo: (keyof typeof TASK_TEMPLATES)[] = [];

  if (p < 20) {
    progress = ['strategy'];
    todo = ['wireframes', 'design'];
  } else if (p < 45) {
    done = ['strategy', 'content'];
    progress = ['wireframes'];
    todo = ['design'];
  } else if (p < 70) {
    done = ['strategy', 'content', 'wireframes'];
    review = ['design'];
    progress = ['development'];
  } else if (p < 90) {
    done = ['strategy', 'content', 'wireframes', 'design'];
    review = ['development'];
    progress = ['integrations'];
    todo = ['revisions'];
  } else {
    done = ['strategy', 'content', 'wireframes', 'design', 'development'];
    review = ['qa'];
    todo = ['launch'];
  }

  return {
    todo: todo.map(k => taskCard(client.id, k)),
    inProgress: progress.map(k => taskCard(client.id, k)),
    inReview: review.map(k => taskCard(client.id, k)),
    complete: done.map(k => taskCard(client.id, k)),
  };
};
