"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { GitBranch, Maximize2 } from "lucide-react";

const STATS = [
  { label: "PRIMARY STACK", value: "NEXT / NODE" },
  { label: "DATABASE", value: "POSTGRES" },
  { label: "UI ENGINE", value: "TAILWIND" },
];

export default function ProjectShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  // --- RESPONSIVE BOX EXPANSION TIMINGS ---
  // Expands closer to 95vw / 75vh on mobile screens to fit all stacked content
  const boxWidth = useTransform(smoothProgress, [0.1, 0.5], ["85vw", "95vw"]);
  const boxHeight = useTransform(smoothProgress, [0.1, 0.5], ["40vh", "75vh"]);
  const boxY = useTransform(smoothProgress, [0.0, 0.5], ["60px", "0px"]);
  const borderRadius = useTransform(smoothProgress, [0.1, 0.5], ["20px", "16px"]);

  // --- CONTENT REVEAL TIMINGS ---
  const contentY = useTransform(smoothProgress, [0.25, 0.5], [15, 0]);
  const contentOpacity = useTransform(smoothProgress, [0.25, 0.5], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[130vh] sm:h-[100vh] bg-[#0b0b0c] text-white selection:bg-red-500 selection:text-white"
    >
      {/* Sticky Container for centered scroll effect */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-3 sm:px-6">
        
        {/* Main Floating Charcoal Box */}
        <motion.div
          style={{
            width: boxWidth,
            height: boxHeight,
            y: boxY,
            borderRadius: borderRadius,
          }}
          className="relative z-30 flex flex-col justify-between overflow-hidden border border-white/10 bg-[#0d0d0f] p-5 sm:p-8 md:p-12 shadow-[0_0_60px_rgba(239,68,68,0.1)]"
        >
          {/* Subtle Ambient Red Glow */}
          <div className="absolute -top-24 -left-24 h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-red-600/10 blur-[70px] sm:blur-[90px] pointer-events-none" />

          {/* TOP BAR: BADGE & EXPAND BUTTON */}
          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            className="relative z-10 flex items-center justify-between gap-2"
          >
            {/* Top-Left Tag/Badge */}
            <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider sm:tracking-widest text-zinc-400 uppercase">
              <GitBranch size={14} className="text-zinc-300 shrink-0 sm:w-4 sm:h-4" />
              <span className="truncate">DEVELOPMENT WORKFLOW</span>
            </div>

            {/* Top-Right Circular Action Icon */}
            <button
              aria-label="Expand Showcase"
              className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-zinc-200/90 text-black hover:bg-white hover:scale-105 transition-all shadow-md"
            >
              <Maximize2 size={14} className="rotate-45 sm:w-4 sm:h-4" />
            </button>
          </motion.div>

          {/* MIDDLE SECTION: MAIN HEADLINE & SIDE DESCRIPTION */}
          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            className="relative z-10 my-auto grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center py-2 sm:py-0"
          >
            {/* Left Big Heading */}
            <div className="lg:col-span-8">
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] sm:leading-[1.1]">
                Modern Stack, <br className="hidden sm:block" />
                zero <span className="text-red-500 underline decoration-red-500/40">compromises.</span> 🛠️
              </h2>
            </div>

            {/* Right Side Description */}
            <div className="lg:col-span-4">
              <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
                Leveraging type-safe architecture, component-driven UI, and robust CI/CD pipelines to ship code efficiently.
              </p>
            </div>
          </motion.div>

          {/* BOTTOM SECTION: STAT METRICS */}
          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            className="relative z-10 flex flex-wrap items-center gap-6 sm:gap-10 md:gap-16 pt-2 sm:pt-4"
          >
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-red-500 tracking-tight">
                  {stat.value}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}