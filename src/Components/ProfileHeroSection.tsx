"use client";

import React from "react";
import Image from "next/image";

export default function ProfileHeroSection() {
  return (
    <section className="relative min-h-screen w-full bg-[#0a0a0c] text-white flex items-center justify-center py-16 px-6 overflow-hidden">
      
      {/* BACKGROUND AMBIENT GLOWS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-zinc-800/30 to-zinc-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: IMAGE PORTRAIT WITH CARD WRAPPER             */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-3xl bg-gradient-to-b from-zinc-800/80 to-zinc-950/90 border border-white/10 p-4 shadow-2xl overflow-hidden flex flex-col justify-end group">
            
            {/* Subtle Grid Pattern inside Card */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />

            {/* Profile Cutout Image */}
            <div className="absolute inset-0 flex items-end justify-center pt-8">
              <img
                src="/profile.png" // Replace with your image file path
                alt="Profile Portrait"
                className="h-full w-auto object-cover object-bottom filter grayscale contrast-110 transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* FLOATING STATUS BADGE (Top Left) */}
            <div className="absolute top-6 left-6 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/80 px-3.5 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="font-mono text-[10px] font-semibold tracking-wider text-zinc-300 uppercase">
                Available for work
              </span>
            </div>

            {/* FLOATING QUICK INFO (Bottom Overlay) */}
            <div className="relative z-20 w-full rounded-2xl bg-zinc-900/90 border border-white/10 p-4 backdrop-blur-xl shadow-lg mt-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-sans font-bold text-base text-white tracking-wide">
                    Alex Rivers
                  </h3>
                  <p className="font-mono text-xs text-zinc-400">
                    Full-Stack & Systems Dev
                  </p>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-[10px] bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-lg border border-white/5">
                  🎧 Music & Code
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: BIO & DETAILED CONTENT                      */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8 text-left">
          
          {/* Subheading / Tag */}
          <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-widest">
            <span className="h-px w-8 bg-zinc-600" />
            <span>Passionate Creator & Engineer</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            Engineering Experiences That <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-600">Resonate</span>.
          </h1>

          {/* Bio Description */}
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans max-w-xl">
            Hey there! I’m a developer who thrives at the intersection of slick UI design, modern web architecture, and creative problem solving. Whether building AI-driven web applications or crafting interactive 3D web experiences, I bring precision and high energy to every project.
          </p>

          {/* QUICK STATS / METRICS */}
          <div className="grid grid-cols-3 gap-4 border-y border-white/10 py-6 max-w-lg">
            <div>
              <p className="font-mono text-2xl sm:text-3xl font-bold text-white">03+</p>
              <p className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider mt-1">
                Years Exp.
              </p>
            </div>
            <div>
              <p className="font-mono text-2xl sm:text-3xl font-bold text-white">25+</p>
              <p className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider mt-1">
                Projects
              </p>
            </div>
            <div>
              <p className="font-mono text-2xl sm:text-3xl font-bold text-white">99%</p>
              <p className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider mt-1">
                Satisfaction
              </p>
            </div>
          </div>

          {/* TECH STACK CHIPS */}
          <div className="space-y-3">
            <p className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
              Core Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP / Three.js", "Node.js", "Python"].map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:border-zinc-500 hover:text-white transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button className="px-7 py-3.5 rounded-full bg-white text-[#0a0a0c] font-mono text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-zinc-200 transition-all duration-300 hover:scale-105 flex items-center gap-2">
              <span>Let's Connect</span>
              <span className="text-sm">↗</span>
            </button>

            <button className="px-7 py-3.5 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-300 font-mono text-xs font-semibold uppercase tracking-wider hover:border-zinc-600 hover:text-white transition-all duration-300 hover:scale-105">
              Download CV
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}