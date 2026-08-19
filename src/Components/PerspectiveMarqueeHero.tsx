"use client";

import React from "react";

const TICKER_ITEMS_1 = [
  "CREATIVE DEVELOPER",
  "UI/UX DESIGN",
  "FULL STACK ENGINEERING",
  "SYSTEM ARCHITECTURE",
  "AI INTEGRATION",
  "WEBGL & GSAP",
];

const TICKER_ITEMS_2 = [
  "NEXT.JS",
  "FRAMER MOTION",
  "GSAP",
  "TYPESCRIPT",
  "NODE.JS",
  "GITHUB",
  "REACT",
  "EXPRESS",
  "MONGODB",
  "TAILWIND CSS",
   "DOCKER",
];

export default function PerspectiveMarqueeHero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0c] text-white flex flex-col justify-between pt-16 pb-20 select-none">
      
      {/* ========================================================= */}
      {/* 3D PERSPECTIVE MARQUEE RIBBONS LAYER                     */}
      {/* ========================================================= */}
      <div 
        className="relative w-full h-[320px] sm:h-[400px] flex flex-col justify-center gap-6 overflow-hidden pointer-events-none"
        style={{
          perspective: "1000px",
        }}
      >
        {/* TOP MARQUEE BELT - Tilted Right & Moving Left */}
        <div 
          className="w-[140%] -ml-[20%] py-3 bg-zinc-900/80 border-y border-white/10 shadow-2xl backdrop-blur-md flex overflow-hidden whitespace-nowrap"
          style={{
            transform: "rotateX(25deg) rotateY(-12deg) rotateZ(-6deg) translateZ(20px)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="flex animate-marquee gap-8 items-center shrink-0">
            {[...TICKER_ITEMS_1, ...TICKER_ITEMS_1, ...TICKER_ITEMS_1].map((item, idx) => (
              <span key={idx} className="flex items-center gap-8 font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-zinc-200 uppercase">
                <span>{item}</span>
                <span className="text-red-500 font-bold">•</span>
              </span>
            ))}
          </div>
          <div className="flex animate-marquee gap-8 items-center shrink-0" aria-hidden="true">
            {[...TICKER_ITEMS_1, ...TICKER_ITEMS_1, ...TICKER_ITEMS_1].map((item, idx) => (
              <span key={`dup-${idx}`} className="flex items-center gap-8 font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-zinc-200 uppercase">
                <span>{item}</span>
                <span className="text-red-500 font-bold">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* BOTTOM MARQUEE BELT - Tilted Left & Moving Right */}
        <div 
          className="w-[140%] -ml-[20%] py-3 bg-zinc-950/90 border-y border-white/10 shadow-2xl backdrop-blur-md flex overflow-hidden whitespace-nowrap"
          style={{
            transform: "rotateX(20deg) rotateY(15deg) rotateZ(5deg) translateZ(-10px)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="flex animate-marquee-reverse gap-8 items-center shrink-0">
            {[...TICKER_ITEMS_2, ...TICKER_ITEMS_2, ...TICKER_ITEMS_2].map((item, idx) => (
              <span key={idx} className="flex items-center gap-8 font-mono text-xs sm:text-sm font-medium tracking-[0.2em] text-zinc-400 uppercase">
                <span>{item}</span>
                <span className="text-zinc-600">•</span>
              </span>
            ))}
          </div>
          <div className="flex animate-marquee-reverse gap-8 items-center shrink-0" aria-hidden="true">
            {[...TICKER_ITEMS_2, ...TICKER_ITEMS_2, ...TICKER_ITEMS_2].map((item, idx) => (
              <span key={`dup-${idx}`} className="flex items-center gap-8 font-mono text-xs sm:text-sm font-medium tracking-[0.2em] text-zinc-400 uppercase">
                <span>{item}</span>
                <span className="text-zinc-600">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Vignette Gradients for Vignette Edge Blur */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0c] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0c] to-transparent pointer-events-none z-10" />
      </div>

      {/* ========================================================= */}
      {/* HERO HERO SECTION CONTENT                                */}
      {/* ========================================================= */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center mt-4">
        
        {/* Subtle Icon Pointer */}
        <div className="mb-6 opacity-60">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white animate-bounce">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
          Let's Build Something <br />
          <span className="text-zinc-400 font-serif italic">Intelligent</span> Together
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-xl text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed tracking-wide">
          Open to strategic collaborations in AI-driven systems and scalable Full Stack Engineering. Let's transform ambitious ideas into production-ready solutions.
        </p>

        {/* Action CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button className="px-7 py-3 rounded-full bg-white text-[#0a0a0c] text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-zinc-200 transition-all duration-300 hover:scale-105 flex items-center gap-2">
            <span>Hire Me</span>
            <span className="text-sm">↗</span>
          </button>

          <button className="px-7 py-3 rounded-full border border-zinc-800 bg-zinc-950/80 text-zinc-300 text-xs font-semibold uppercase tracking-wider hover:border-zinc-700 hover:text-white transition-all duration-300 hover:scale-105 flex items-center gap-2">
            <span>View My Resume</span>
          </button>
        </div>

      </div>

    </section>
  );
}