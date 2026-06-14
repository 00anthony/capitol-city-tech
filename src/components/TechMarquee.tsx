'use client';

import React from 'react';
import { motion } from 'framer-motion';

const reviews = [
  {
    name: 'Rachel Bos',
    avatar: '/avatars/rachel.jpg',
    date: 'Jun 21, 2022',
    review:
      'I\'m so pleased I chose Capitol City Tech to help build trust and increase sales on my website. Lots of options to customize and fantastic communication throughout the entire process.',
  },
  {
    name: 'Michael Carter',
    avatar: '/avatars/michael.jpg',
    date: 'Aug 14, 2023',
    review:
      'The website exceeded expectations. Fast turnaround, modern design, and our leads noticeably increased after launch.',
  },
  {
    name: 'Sarah Johnson',
    avatar: '/avatars/sarah.jpg',
    date: 'Jan 9, 2024',
    review:
      'Professional, responsive, and incredibly easy to work with. The final product feels like something a much larger agency would deliver.',
  },
  {
    name: 'David Thompson',
    avatar: '/avatars/david.jpg',
    date: 'Mar 3, 2024',
    review:
      'Great communication from start to finish. They took our rough ideas and turned them into a polished online presence.',
  },
  {
    name: 'Anthony Tijerina',
    avatar: '/avatars/sarah.jpg',
    date: 'Jan 9, 2024',
    review:
      'Professional, responsive, and incredibly easy to work with. The final product feels like something a much larger agency would deliver.',
  },
];

const marqueeContent = [...reviews, ...reviews];

export default function TechMarquee() {
  return (
    <section className="relative overflow-hidden py-10 border-y border-white/5">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10" />

      <motion.div
        className="flex w-max gap-6"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {marqueeContent.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </motion.div>
    </section>
  );
}

function ReviewCard({
  review,
}: {
  review: {
    name: string;
    avatar: string;
    date: string;
    review: string;
  };
}) {
  return (
    <div
      className="
        glass-panel
        relative
        w-[360px]
        rounded-2xl
        p-5
        shrink-0
        overflow-hidden
        group
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
          bg-blue-500/5
        "
      />

      {/* Top Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={review.avatar}
            alt={review.name}
            className="
              w-10 h-10
              rounded-full
              object-cover
              ring-2
              ring-blue-500/20
            "
          />

          <div>
            <p className="font-semibold text-white text-sm">
              {review.name}
            </p>
          </div>
        </div>

        {/* Google */}
        <div className="text-slate-400 text-xs font-medium">
          Google
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-yellow-400"
          >
            <path d="M12 2l3.09 6.26 6.91 1-5 4.87 1.18 6.87L12 17.77 5.82 21l1.18-6.87-5-4.87 6.91-1L12 2z" />
          </svg>
        ))}
      </div>

      {/* Review */}
      <p className="text-sm leading-relaxed text-slate-300 line-clamp-5">
        {review.review}
      </p>

      {/* Date */}
      <div className="mt-5 text-xs text-slate-500">
        {review.date}
      </div>

      {/* Blue glow border */}
      <div
        className="
          absolute
          inset-0
          rounded-2xl
          border
          border-blue-500/10
          pointer-events-none
        "
      />
    </div>
  );
}