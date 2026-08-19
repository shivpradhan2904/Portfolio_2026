"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Black_Ops_One } from "next/font/google";

const blackOpsOne = Black_Ops_One({
  weight: "400",
  subsets: ["latin"],
});

// Structured into [Top Line, Bottom Line] pairs
const DUMMY_TEXT_PAIRS = [
  ["INITIALIZING", "PORTFOLIO"],
  ["LOADING", "ASSETS"],
  ["CONFIGURING", "CORE"],
  ["BUILDING", "INTERFACE"],
  ["COMPILING", "CODE"],
  ["OPTIMIZING", "DATA"],
  ["INTEGRATING", "AI"],
  ["PORTFOLIO", "READY"],
];

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  // 1. Counter logic (0 to 100)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 3) + 1;
      });
    }, 55);

    return () => clearInterval(interval);
  }, []);

  // 2. Text sequence timer & completion trigger
  useEffect(() => {
    if (progress === 100) {
      const exitTimer = setTimeout(() => {
        onDone();
      }, 1000);
      return () => clearTimeout(exitTimer);
    }

    const textTimer = setTimeout(() => {
      setTextIndex((prev) => (prev + 1) % DUMMY_TEXT_PAIRS.length);
    }, 800);

    return () => clearTimeout(textTimer);
  }, [progress, textIndex, onDone]);

  const [topText, bottomText] = DUMMY_TEXT_PAIRS[textIndex];

  return (
    <motion.div
      className={`fixed inset-0 z-[100] flex flex-col justify-between bg-[#121214] p-6 sm:p-10 md:p-16 text-white select-none overflow-hidden ${blackOpsOne.className}`}
      initial={{ y: 0 }}
      exit={{
        y: "-100%",
        transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      {/* Subtle Charcoal Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] opacity-20 pointer-events-none" />

      {/* TOP-LEFT: Big 2-Row Animated Text */}
      <div className="relative z-10 pt-2 sm:pt-4 w-full max-w-7xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={textIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col space-y-0 sm:space-y-1"
          >
            {/* ROW 1: Smaller Action Text */}
            <div className="overflow-hidden h-8 sm:h-14 md:h-20 flex items-center">
              <motion.span
                initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
                animate={{ y: "0%", opacity: 0.7, filter: "blur(0px)" }}
                exit={{ y: "-100%", opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-[6vw] sm:text-[4.5vw] md:text-[3.5vw] leading-none uppercase text-neutral-400 tracking-wider whitespace-nowrap"
              >
                {topText}
              </motion.span>
            </div>

            {/* ROW 2: Massive Target Text */}
            <div className="overflow-hidden h-16 sm:h-28 md:h-40 flex items-center">
              <motion.h1
                initial={{ y: "100%", opacity: 0, filter: "blur(12px)" }}
                animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                exit={{ y: "-100%", opacity: 0, filter: "blur(12px)" }}
                transition={{
                  duration: 0.45,
                  delay: 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-[12vw] sm:text-[9.5vw] md:text-[8.5vw] leading-none uppercase text-white tracking-normal whitespace-nowrap"
              >
                {bottomText}
              </motion.h1>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOTTOM-RIGHT: Counter & Status Bar */}
      <div className="relative z-10 flex flex-col items-end space-y-3 sm:space-y-4">
        <div className="flex items-baseline space-x-2">
          <span className="text-7xl sm:text-8xl md:text-9xl tracking-tight text-white leading-none">
            {progress}
          </span>
          <span className="text-xl sm:text-3xl font-bold text-neutral-500">
            %
          </span>
        </div>

        {/* Bottom Progress Bar Track */}
        <div className="w-full max-w-xs sm:max-w-md h-1.5 bg-[#1f1f23] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.2 }}
          />
        </div>

        <div className="flex w-full max-w-xs sm:max-w-md justify-between text-[10px] sm:text-xs tracking-widest text-neutral-500 uppercase font-mono">
          <span>PORTFOLIO // INTERACTION</span>
          <span>{progress === 100 ? "COMPLETE" : "LOADING..."}</span>
        </div>
      </div>
    </motion.div>
  );
}