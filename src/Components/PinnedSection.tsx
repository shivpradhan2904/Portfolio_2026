"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Allura } from "next/font/google";

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
});

export default function FullScreenStripFillInteractive() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 70%", "end start"],
  });

  // Tighter transform ranges reduce unnecessary pixel movement off-screen
  const xLine1 = useTransform(scrollYProgress, [0, 1], ["15%", "-45%"]);
  const xLine2 = useTransform(scrollYProgress, [0, 1], ["30%", "-35%"]);
  const xLine3 = useTransform(scrollYProgress, [0, 1], ["45%", "-25%"]);

  return (
    <section
      ref={targetRef}
      className="relative min-h-screen w-full bg-[#0b0b0c] text-white overflow-hidden py-4 sm:py-6 flex flex-col justify-between selection:bg-red-600 selection:text-white"
    >
      {/* 1. TOP HEADER ROW */}
      <div className="relative z-20 px-4 sm:px-6 md:px-10 flex justify-between items-center sm:items-start font-sans text-xs uppercase tracking-[0.2em] text-white/70">
        <div className="flex flex-col gap-0.5 sm:gap-1">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] text-red-500 font-semibold tracking-[0.15em] sm:tracking-[0.2em]">
              PORTFOLIO // 2026
            </span>
          </div>
          <p className="font-mono text-[9px] sm:text-[10px] text-white/40 tracking-[0.1em] sm:tracking-[0.15em]">
            ORIGIN: Bhubaneswar → Hyderabad
          </p>
        </div>

        <p className="max-w-xs text-center font-normal tracking-normal text-xs normal-case text-white/60 leading-relaxed hidden lg:block">
          Bridging architectural precision with creative exploration. Crafting
          high-level digital experiences &amp; scalable UI structures.
        </p>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] text-red-500 font-semibold uppercase hidden xs:inline-block">
            Creative Explorer
          </span>
          <span
            className={`${allura.className} text-2xl sm:text-3xl text-white/80 select-none leading-none`}
          >
            Shiv
          </span>
        </div>
      </div>

      {/* 2. THREE-LINE GIANT TEXT GRID TRACKS */}
      <div className="relative z-10 flex flex-col justify-center flex-1 w-full my-auto overflow-hidden py-4">
        
        {/* ROW 1 */}
        <div className="border-y border-white/10 overflow-hidden flex items-center h-[18vh] sm:h-[22vh] md:h-[25vh]">
          <motion.div
            style={{ x: xLine1 }}
            className="flex items-center whitespace-nowrap will-change-transform transform-gpu"
          >
            <div className="relative flex items-center px-6 sm:px-8 md:px-12 border-r border-white/10 h-full">
              <span className="absolute top-2 left-2 sm:left-3 font-mono text-[9px] sm:text-[10px] text-white/40 tracking-[0.2em]">01</span>
              <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-20 md:h-20 rounded-full bg-red-600 flex-shrink-0" />
            </div>

            <div className="relative flex items-center px-6 sm:px-8 md:px-12 border-r border-white/10 h-full">
              <span className="absolute top-2 left-2 sm:left-3 font-mono text-[9px] sm:text-[10px] text-white/40 tracking-[0.2em]">02</span>
              <h1 className="font-bold text-4xl sm:text-6xl md:text-[8.5vw] leading-[1.05] tracking-tight uppercase text-white">
                SIBA <span className="text-red-500">PRADHAN</span>
              </h1>
            </div>

            <div className="relative flex items-center px-6 sm:px-8 md:px-12 border-r border-white/10 h-full">
              <span className="absolute top-2 left-2 sm:left-3 font-mono text-[9px] sm:text-[10px] text-white/40 tracking-[0.2em]">03</span>
              <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-20 md:h-20 rounded-full bg-white/20 flex-shrink-0" />
            </div>

            <div className="relative flex items-center px-6 sm:px-8 md:px-12 border-r border-white/10 h-full">
              <span className="absolute top-2 left-2 sm:left-3 font-mono text-[9px] sm:text-[10px] text-white/40 tracking-[0.2em]">04</span>
              <h1 className="font-bold text-4xl sm:text-6xl md:text-[8.5vw] leading-[1.05] tracking-tight uppercase text-white/40">
                SIBA PRADHAN
              </h1>
            </div>
          </motion.div>
        </div>

        {/* ROW 2 */}
        <div className="border-b border-white/10 overflow-hidden flex items-center h-[18vh] sm:h-[22vh] md:h-[25vh]">
          <motion.div
            style={{ x: xLine2 }}
            className="flex items-center whitespace-nowrap will-change-transform transform-gpu"
          >
            <div className="relative flex items-center px-6 sm:px-8 md:px-12 border-r border-white/10 h-full">
              <span className="absolute top-2 left-2 sm:left-3 font-mono text-[9px] sm:text-[10px] text-white/40 tracking-[0.2em]">01</span>
              <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-20 md:h-20 rounded-full bg-white/10 flex-shrink-0" />
            </div>

            <div className="relative flex items-center px-6 sm:px-8 md:px-12 border-r border-white/10 h-full">
              <span className="absolute top-2 left-2 sm:left-3 font-mono text-[9px] sm:text-[10px] text-white/40 tracking-[0.2em]">02</span>
              <h1 className="font-bold text-4xl sm:text-6xl md:text-[8.5vw] leading-[1.05] tracking-tight uppercase text-white/70">
                CREATIVE
              </h1>
            </div>

            <div className="relative flex items-center px-6 sm:px-8 md:px-12 border-r border-white/10 h-full">
              <span className="absolute top-2 left-2 sm:left-3 font-mono text-[9px] sm:text-[10px] text-white/40 tracking-[0.2em]">03</span>
              <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-20 md:h-20 rounded-full bg-red-600 flex-shrink-0" />
            </div>

            <div className="relative flex items-center px-6 sm:px-8 md:px-12 border-r border-white/10 h-full">
              <span className="absolute top-2 left-2 sm:left-3 font-mono text-[9px] sm:text-[10px] text-white/40 tracking-[0.2em]">04</span>
              <h1 className="italic font-medium text-4xl sm:text-6xl md:text-[8.5vw] leading-[1.05] tracking-tight uppercase text-white/85">
                EXPLORER
              </h1>
            </div>
          </motion.div>
        </div>

        {/* ROW 3 */}
        <div className="border-b border-white/10 overflow-hidden flex items-center h-[18vh] sm:h-[22vh] md:h-[25vh]">
          <motion.div
            style={{ x: xLine3 }}
            className="flex items-center whitespace-nowrap will-change-transform transform-gpu"
          >
            <div className="relative flex items-center px-6 sm:px-8 md:px-12 border-r border-white/10 h-full">
              <span className="absolute top-2 left-2 sm:left-3 font-mono text-[9px] sm:text-[10px] text-white/40 tracking-[0.2em]">01</span>
              <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-20 md:h-20 rounded-full bg-red-600 flex-shrink-0" />
            </div>

            <div className="relative flex items-center px-6 sm:px-8 md:px-12 border-r border-white/10 h-full">
              <span className="absolute top-2 left-2 sm:left-3 font-mono text-[9px] sm:text-[10px] text-white/40 tracking-[0.2em]">02</span>
              <h1 className="font-bold text-4xl sm:text-6xl md:text-[8.5vw] leading-[1.05] tracking-tight uppercase text-red-500">
                HYDERABAD
              </h1>
            </div>

            <div className="relative flex items-center px-6 sm:px-8 md:px-12 border-r border-white/10 h-full">
              <span className="absolute top-2 left-2 sm:left-3 font-mono text-[9px] sm:text-[10px] text-white/40 tracking-[0.2em]">03</span>
              <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-20 md:h-20 rounded-full bg-white/10 flex-shrink-0" />
            </div>

            <div className="relative flex items-center px-6 sm:px-8 md:px-12 border-r border-white/10 h-full">
              <span className="absolute top-2 left-2 sm:left-3 font-mono text-[9px] sm:text-[10px] text-white/40 tracking-[0.2em]">04</span>
              <h1 className="font-bold text-4xl sm:text-6xl md:text-[8.5vw] leading-[1.05] tracking-tight uppercase text-white">
                TELANGANA
              </h1>
            </div>
          </motion.div>
        </div>

      </div>

      {/* 3. FOOTER PLATFORMS ROW */}
      <div className="relative z-20 px-4 sm:px-6 md:px-10 flex flex-wrap justify-between items-center text-[9px] sm:text-[11px] font-mono tracking-[0.12em] sm:tracking-[0.2em] text-white/50 border-t border-white/10 pt-3 gap-2">
        <span className="hover:text-red-500 transition-colors cursor-pointer">
          [01] DIGITAL EXPERIENCES
        </span>
        <span className="hover:text-red-500 transition-colors cursor-pointer hidden sm:inline">
          [02] STRATEGIC SYSTEMS
        </span>
        <span className="hover:text-red-500 transition-colors cursor-pointer hidden md:inline">
          [03] SCALABLE UI
        </span>
        <span className="text-red-500 font-bold ml-auto sm:ml-0">
          ★ HYD / TS
        </span>
      </div>
    </section>
  );
}