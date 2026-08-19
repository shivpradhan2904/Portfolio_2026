"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Space_Grotesk } from "next/font/google";
import TargetCursor from "../Animations/TargetCursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

type HoldToUnlockProps = {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  initialProgress?: number; // Starting percentage (0 to 100)
  holdSpeed?: number; // Speed multiplier for filling up
  onUnlock: () => void;
};

export default function HoldToUnlock({
  title = "Ready to Experience?",
  subtitle = "Press and hold the button below — release early and it drains back down.",
  buttonText = "CLICK & HOLD TO UNLOCK",
  initialProgress = 0,
  holdSpeed = 10,
  onUnlock,
}: HoldToUnlockProps) {
  const [progress, setProgress] = useState(initialProgress);
  const [isHolding, setIsHolding] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Progressive filling / smooth draining logic
  useEffect(() => {
    if (isHolding) {
      holdIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(holdIntervalRef.current!);
            onUnlock();
            return 100;
          }
          return prev + holdSpeed;
        });
      }, 30);
    } else {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
      // Drains progress smoothly if released early
      const drainInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= initialProgress) {
            clearInterval(drainInterval);
            return initialProgress;
          }
          return prev - 8;
        });
      }, 20);
    }

    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, [isHolding, holdSpeed, initialProgress, onUnlock]);

  return (
    <div
      className={`${spaceGrotesk.className} relative flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-[#38bdf8] via-[#7dd3fc] to-[#bae6fd] p-6 sm:p-8 text-[#0f172a] select-none`}
    >
      {/* Custom Target Cursor */}
      <TargetCursor
        targetSelector=".cursor-target"
        spinDuration={2}
        cursorColor="#0f172a"
        cursorColorOnTarget="#0ea5e9"
      />

      {/* Spacer for vertical balance */}
      <div className="h-4" />

      {/* 1. ORIGINAL CENTER CONTENT BOX */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center gap-4 text-center my-auto z-10"
      >
        {/* Small lock badge above the title */}
        <div className="cursor-target flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/25 backdrop-blur-md shadow-md">
          <svg
            className="h-5 w-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <h2 className="text-3xl font-bold uppercase tracking-wider text-white drop-shadow-sm md:text-5xl">
          {title}
        </h2>

        <p className="max-w-sm text-sm font-medium text-white/85 md:text-base">
          {subtitle}
        </p>

        {/* ORIGINAL CLICK AND HOLD BUTTON CONTAINER */}
        <div
          onMouseDown={() => setIsHolding(true)}
          onMouseUp={() => setIsHolding(false)}
          onMouseLeave={() => setIsHolding(false)}
          onTouchStart={() => setIsHolding(true)}
          onTouchEnd={() => setIsHolding(false)}
          className="cursor-target relative mt-2 flex h-16 w-80 cursor-pointer select-none items-center justify-center overflow-hidden rounded-2xl bg-white/30 p-1 shadow-lg backdrop-blur-md border border-white/60 transition-transform active:scale-[0.98]"
        >
          {/* Internal Progress bar fill */}
          <div
            className="absolute left-0 top-0 h-full bg-white transition-all ease-linear"
            style={{ width: `${progress}%` }}
          />

          {/* Button Text */}
          <div className="relative z-10 flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-widest text-slate-800">
            <svg
              className={`h-4 w-4 transition-transform duration-300 ${
                isHolding ? "scale-125 text-sky-600" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>
              {progress > initialProgress
                ? `HOLDING... ${Math.round(progress)}%`
                : buttonText}
            </span>
          </div>
        </div>

        <span className="mt-1 text-[11px] font-medium uppercase tracking-widest text-white/70">
          Your custom cursor will lock onto the badge and button
        </span>
      </motion.div>

      {/* 2. NOOMO BOTTOM SECTION (FLOATING GLASS BOXES + BOTTOM BAR) */}
      <div className="w-full flex flex-col gap-6">
        {/* FLOATING GLASS GRID BOXES (5 Dynamic Interactive Cards) */}
        <div className="flex justify-around items-center w-full max-w-6xl mx-auto px-4 gap-3">
          {[
            { id: 1, label: "BOX 01", sub: "SYS.INIT" },
            { id: 2, label: "BOX 02", sub: "GLAS.FX" },
            { id: 3, label: "BOX 03", sub: "CORE.OBJ" },
            { id: 4, label: "BOX 04", sub: "SYNC.HUD" },
            { id: 5, label: "BOX 05", sub: "DATA.RAW" },
          ].map((box, i) => (
            <motion.div
              key={box.id}
              animate={{
                y: isHolding ? [0, -14, 0] : [0, -5, 0],
                scale: isHolding ? 1.05 : 1,
                rotate: isHolding ? (i % 2 === 0 ? 4 : -4) : 0,
              }}
              transition={{
                duration: isHolding ? 0.5 : 3 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="cursor-target group relative w-20 h-20 sm:w-28 sm:h-28 flex flex-col justify-between p-2.5 sm:p-3 rounded-2xl border border-white/60 bg-white/25 backdrop-blur-md shadow-lg hover:bg-white/40 transition-colors"
            >
              {/* Box Top Subtext */}
              <div className="flex justify-between items-center opacity-70">
                <span className="text-[9px] font-mono font-bold tracking-tight text-slate-800">
                  {box.sub}
                </span>
                <svg className="w-2.5 h-2.5 fill-slate-800" viewBox="0 0 10 10">
                  <rect width="3" height="3" />
                  <rect x="5" y="5" width="3" height="3" />
                </svg>
              </div>

              {/* Central Box Specular Cube SVG */}
              <div className="flex justify-center items-center my-auto opacity-80 group-hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7 sm:w-9 sm:h-9 text-slate-900"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>

              {/* Bottom Label */}
              <span className="text-[9px] sm:text-[10px] font-mono font-black text-slate-900 tracking-widest text-center">
                {box.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* FULL-WIDTH NOOMO HUD BOTTOM BAR */}
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-2">
          {/* BAR HEADER ROW */}
          <div className="flex flex-wrap justify-between items-end gap-3 text-slate-900 font-mono text-xs font-bold uppercase tracking-tight px-1">
            {/* Left: Sound Wave Pill Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="cursor-target flex items-center gap-2 bg-slate-900 text-white px-3 py-1 rounded-full hover:bg-slate-800 transition-all active:scale-95 shadow-md"
            >
              <svg
                className="w-7 h-3 text-white fill-current"
                viewBox="0 0 32 12"
              >
                <path
                  d="M0 6 Q2 0, 4 6 T8 6 T12 6 T16 6 T20 6 T24 6 T28 6 T32 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <span className="text-[10px] tracking-widest font-sans font-bold">
                {isMuted ? "OFF" : "ON"}
              </span>
            </button>

            {/* Center Heading Subtext */}
            <span className="text-xs sm:text-sm font-black tracking-wide text-slate-900 uppercase">
              ARE YOU READY TO STEP INTO THE FUTURE?
            </span>

            {/* Right: Status Text + Jellyfish Badge */}
            <div className="flex items-center gap-2.5">
              <span className="text-xs sm:text-sm font-black tracking-tight">
                {progress > initialProgress
                  ? `HOLDING... ${Math.round(progress)}%`
                  : "CLICK AND HOLD"}
              </span>

              {/* Jellyfish Icon Badge */}
              <div className="cursor-target w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center p-1.5 shadow-md">
                <svg
                  className="w-5 h-5 stroke-current"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.8"
                >
                  <path
                    d="M12 3C7 3 4 7 4 11C7 12 17 12 20 11C20 7 17 3 12 3Z"
                    fill="currentColor"
                    fillOpacity="0.25"
                  />
                  <path d="M8 12C7.5 15 9 17 8 20" strokeLinecap="round" />
                  <path d="M12 12C11.5 15 12.5 17 12 20" strokeLinecap="round" />
                  <path d="M16 12C15.5 15 17 17 16 20" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* FULL-WIDTH SECONDARY PROGRESS BAR */}
          <div
            onMouseDown={() => setIsHolding(true)}
            onMouseUp={() => setIsHolding(false)}
            onMouseLeave={() => setIsHolding(false)}
            onTouchStart={() => setIsHolding(true)}
            onTouchEnd={() => setIsHolding(false)}
            className="cursor-target relative w-full h-3 sm:h-3.5 border-2 border-slate-900 rounded-full p-[1px] cursor-pointer bg-white/30 backdrop-blur-sm shadow-inner transition-transform active:scale-[0.99]"
          >
            {/* Syncs directly to the same progress state */}
            <div
              className="h-full bg-slate-900 rounded-full transition-all ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}