'use client'
import React from 'react';
import { motion } from 'framer-motion';

const BackgroundEffects: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#020617]">
      {/* Layer 1: Base Vibrant Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{
            x: [0, 50, -20, 0],
            y: [0, -70, 40, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-24 -left-24 w-125 h-125 bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-35"
        />
        <motion.div 
          animate={{
            x: [0, -40, 60, 0],
            y: [0, 50, -30, 0],
            scale: [1, 0.8, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/4 -right-24 w-150 h-150 bg-indigo-600 rounded-full mix-blend-screen filter blur-[120px] opacity-45"
        />
        <motion.div 
          animate={{
            x: [0, 30, -50, 0],
            y: [0, -20, 60, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute -bottom-48 left-1/4 w-175 h-175 bg-cyan-600 rounded-full mix-blend-screen filter blur-[140px] opacity-60"
        />
      </div>

      {/* Layer 2: The Liquid Glass Surface */}
      <div className="absolute inset-0 backdrop-blur-[100px] bg-slate-950/40 z-10">
        <div className="absolute inset-0 opacity-40">
           <motion.div 
            animate={{
              x: ["-5%", "5%"],
              y: ["-5%", "5%"],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.05)_0%,transparent_50%)]"
           />
           <motion.div 
            animate={{
              x: ["5%", "-5%"],
              y: ["5%", "-3%"],
              rotate: [0, -3, 0]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 5
            }}
            className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.03)_0%,transparent_50%)]"
           />
        </div>
      </div>

      {/* Layer 3: Technical Grid */}
      <div className="absolute inset-0 bg-grid opacity-30 z-20"></div>

      {/* Layer 4: Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] z-30 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
    </div>
  );
};

export default BackgroundEffects;
