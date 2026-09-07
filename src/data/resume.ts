import type { WorkExperience, ResumeProject, SkillCategory, EducationEntry } from '@/types';

export const resumeContact = {
  name: 'Anthony Tijerina',
  title: 'Computer Science Student & Full-Stack Developer',
  email: 'anthonytij3@gmail.com',
  phone: '(512) 619-3137',
  location: 'Buda, TX',
  github: 'https://github.com/00anthony',
  linkedin: 'https://linkedin.com/in/anthony-tijerina-cs',
};

export const summary =
  "Computer Science student and full-stack developer with hands-on experience shipping production web apps and backend services for real clients — from RESTful APIs and relational databases to React/Next.js interfaces. Seeking a software engineering, web development, or backend-focused internship to bring strong problem-solving skills and full-lifecycle project experience to a collaborative engineering team.";

export const workHistory: WorkExperience[] = [
  {
    role: 'Owner & Lead Developer',
    company: 'Capitol City Tech (Freelance)',
    location: 'Austin, TX',
    period: '06/2025 – Current',
    bullets: [
      'Design, build, and ship full-stack web applications for small-business and nonprofit clients using React, Next.js, TypeScript, and TailwindCSS',
      'Built a custom booking/scheduling system (Prisma, PostgreSQL, Google Calendar API) with real-time availability sync; integrated payment processors and automated recurring backend jobs',
      'Improved Core Web Vitals and Lighthouse scores across client sites through performance profiling and rendering optimizations',
      'Own the full client lifecycle — requirements gathering, architecture, development, deployment on Vercel, and post-launch support',
    ],
  },
];

export const projects: ResumeProject[] = [
  {
    id: 'raffle',
    name: 'Charity Raffle Management Platform',
    stack: ['Next.js', 'TypeScript', 'Supabase (Postgres/Auth)', 'Stripe', 'TailwindCSS'],
    bullets: [
      'Architected a reusable, multi-event SaaS-style platform (not a single-event app) supporting concurrent raffle campaigns, each with its own page and admin controls',
      'Implemented Stripe payments plus manual payment options, and secured confirmation pages with signed HMAC tokens instead of guessable links',
      'Designed Postgres Row-Level Security policies and an audit-logged random drawing system for provable fairness',
      'Built an admin dashboard with role-scoped access, CSV export, and live stats; diagnosed and fixed production auth and RLS recursion bugs',
    ],
    link: 'https://raffle-ivory-gamma.vercel.app/',
    linkLabel: 'View Live',
  },
  {
    id: 'agencytax',
    name: 'AgencyTax Microservice API',
    stack: ['ASP.NET Core', 'C#', 'Entity Framework Core', 'SQL Server'],
    bullets: [
      'Built a RESTful microservice with layered architecture (Controller/Service/Repository) to manage agency invoice data',
      'Implemented input validation, global exception-handling middleware, and structured logging; wrote unit tests with xUnit/Moq and documented endpoints with Swagger',
    ],
  },
  {
    id: 'client-sites',
    name: 'Client Website Development — Multiple Brands',
    stack: ['React', 'Next.js', 'Framer Motion', 'GSAP', 'Three.js', 'TailwindCSS'],
    bullets: [
      'Built animated, production websites for skincare, real-estate investment, and home-renovation clients using GSAP-pinned scroll sequences, Framer Motion animations, and a drag-to-reveal before/after slider',
      "Modeled a 3D logo in Blender and rendered it live with Three.js for a renovation client; integrated Shopify's checkout API into a custom storefront for an e-commerce skincare brand",
      'Debugged and resolved scroll-performance issues by eliminating layout-thrashing CSS and offloading transforms to the GPU',
    ],
    link: '/#work',
    linkLabel: 'See Live Examples',
  },
];

export const skills: SkillCategory[] = [
  { category: 'Languages', items: ['C#', 'JavaScript/TypeScript', 'SQL', 'Python'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'TailwindCSS', 'Framer Motion', 'GSAP'] },
  { category: 'Backend', items: ['ASP.NET Core', 'Node.js', 'Entity Framework Core', 'Prisma', 'REST APIs', 'Microservices'] },
  { category: 'Databases', items: ['SQL Server', 'PostgreSQL', 'Supabase'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'Vercel', 'VS Code', 'Visual Studio', 'Swagger', 'Stripe API', 'Sanity CMS', 'Resend'] },
  { category: 'Concepts', items: ['Unit Testing', 'Dependency Injection', 'Row-Level Security', 'SEO & Web Performance'] },
];

export const education: EducationEntry = {
  school: 'Texas State University',
  location: 'San Marcos, TX',
  degree: 'Bachelor of Science, Computer Science',
  minor: 'Applied Mathematics',
  status: 'Expected 05/2027',
  coursework: ['Data Structures', 'Object-Oriented Design & Programming', 'Software Engineering', 'Computer Architecture', 'Discrete Math I & II'],
};

export const certifications = [
  { name: 'Microsoft Certified: Azure Fundamentals', detail: 'Exam AZ-900' },
];

export const volunteer = {
  org: 'Christian Life Austin',
  description:
    'Community service: school/church painting & landscaping, neighborhood cleanups, homeless outreach, and student ministry supervision.',
};
