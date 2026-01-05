
import React from 'react';

const BackgroundEffects: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#020617]">
      {/* Layer 1: Base Vibrant Blobs (The "Engine" of the colors) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-125 h-125 bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob"></div>
        <div className="absolute top-1/4 -right-24 w-150 h-150 bg-indigo-600 rounded-full mix-blend-screen filter blur-[120px] opacity-15 animate-blob [animation-delay:3s]"></div>
        <div className="absolute -bottom-48 left-1/4 w-175 h-175 bg-cyan-600 rounded-full mix-blend-screen filter blur-[140px] opacity-10 animate-blob [animation-delay:6s]"></div>
      </div>

      {/* Layer 2: The Liquid Glass Surface */}
      {/* Heavy blur creates the "glass" look, while the tint maintains depth */}
      <div className="absolute inset-0 backdrop-blur-[100px] bg-slate-950/40 z-10">
        {/* Layer 2.1: Floating "Liquid" Accents (Internal light shifts) */}
        <div className="absolute inset-0 opacity-40">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.05)_0%,transparent_50%)] animate-liquid"></div>
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.03)_0%,transparent_50%)] animate-liquid [animation-delay:5s]"></div>
        </div>
      </div>

      {/* Layer 3: Technical Grid (On top of the glass) */}
      <div className="absolute inset-0 bg-grid opacity-30 z-20"></div>

      {/* Layer 4: Subtle Noise Texture (Optional enhancement for premium feel) */}
      <div className="absolute inset-0 opacity-[0.03] z-30 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
    </div>
  );
};

export default BackgroundEffects;
