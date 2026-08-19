"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type AnimatedHeroTextProps = {
  line1?: string;
  words?: string[];
  interval?: number;
};

const PixelArrowUp = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" className="text-white/80">
    <path d="M7 15h2V7h2V5h-2V3H7v2H5v2h2v8z" />
    <path d="M3 9h2V7H3v2zm10 0h-2V7h2v2zm-2-4h-2V3h2v2zM7 3h2V1H7v2z" />
  </svg>
);

export default function AnimatedHeroText({
  line1 = "DESIGN",
  words = ["THAT FUNCTIONS", "THAT INSPIRES", "THAT CONNECTS", "THAT EVOLVES"],
  interval = 4000,
}: AnimatedHeroTextProps) {
  const [index, setIndex] = useState(0);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentWord = words[index];
  const dateString = now ? now.toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Today";
  const hours = now ? String(now.getHours()).padStart(2, "0") : "00";
  const minutes = now ? String(now.getMinutes()).padStart(2, "0") : "00";
  const seconds = now ? String(now.getSeconds()).padStart(2, "0") : "00";

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`${spaceGrotesk.className} relative flex h-full w-full flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-[#38bdf8] via-[#7dd3fc] to-[#bae6fd] px-6 py-8 text-[#0f172a] selection:bg-white selection:text-[#0284c7]`}
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-white/35 blur-[140px] rounded-full" />

      {/* HERO HEADLINE */}
      <div className="relative z-10 my-auto flex w-full max-w-7xl items-center justify-between px-2 md:px-10">
        <span className="text-[7rem] font-extralight leading-none text-white/90 sm:text-[11rem] md:text-[14rem] drop-shadow-sm select-none">
          (
        </span>

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <h1 className="m-0 text-[clamp(2.8rem,8vw,7rem)] font-bold tracking-tight uppercase text-white drop-shadow-[0_4px_16px_rgba(255,255,255,0.4)]">
            {line1}
          </h1>

          <div className="relative flex items-center justify-center text-[clamp(2.8rem,8vw,7rem)] font-bold tracking-tight uppercase">
            <span className="relative inline-flex h-[1.1em] items-center justify-center overflow-hidden">
              <AnimatePresence mode="popLayout">
                <div key={currentWord} className="inline-flex whitespace-nowrap">
                  {currentWord.split("").map((char, i) => {
                    const centerIndex = (currentWord.length - 1) / 2;
                    const distanceFromCenter = Math.abs(i - centerIndex);

                    return (
                      <motion.span
                        key={`${char}-${i}`}
                        initial={{ y: "-120%", opacity: 0, filter: "blur(4px)" }}
                        animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: "120%", opacity: 0, filter: "blur(4px)" }}
                        transition={{
                          duration: 0.9,
                          ease: [0.22, 1, 0.36, 1],
                          delay: distanceFromCenter * 0.045,
                        }}
                        className="inline-block text-[#0f2847] drop-shadow-sm"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    );
                  })}
                </div>
              </AnimatePresence>
            </span>
          </div>
        </div>

        <span className="text-[7rem] font-extralight leading-none text-white/90 sm:text-[11rem] md:text-[14rem] drop-shadow-sm select-none">
          )
        </span>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-4">
        <div className="flex w-full items-center justify-between text-xs font-mono tracking-widest uppercase text-[#0f2847]/80 md:text-sm">
          <span className="hidden sm:inline-block font-semibold">PRECISE. INNOVATIVE.</span>

          <div className="mx-auto flex h-12 w-64 items-center justify-between gap-2 rounded-2xl bg-white/40 px-5 text-[11px] font-mono text-slate-800 shadow-md backdrop-blur-md border border-white/60">
            <span className="font-medium">↳ {dateString}</span>
            <div className="flex items-center gap-1 font-bold tracking-widest text-[#0284c7]">
              <span>{hours}</span>
              <span className="animate-pulse">:</span>
              <span>{minutes}</span>
              <span className="animate-pulse">:</span>

              <div className="relative inline-block h-[1.2em] w-[2ch] overflow-hidden align-middle perspective-[200px]">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={seconds}
                    initial={{ rotateX: -90, y: "100%", opacity: 0 }}
                    animate={{ rotateX: 0, y: "0%", opacity: 1 }}
                    exit={{ rotateX: 90, y: "-100%", opacity: 0 }}
                    transition={{
                      duration: 0.55,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    className="absolute inset-0 flex items-center justify-center text-[#0284c7]"
                    style={{ transformOrigin: "50% 50% -10px", backfaceVisibility: "hidden" }}
                  >
                    {seconds}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <span className="hidden sm:inline-block font-semibold">FUTURISTIC. EXPRESSIVE.</span>
        </div>

        <PixelArrowUp />
      </div>
    </motion.section>
  );
}