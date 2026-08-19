"use client";

import { motion } from "framer-motion";
import { Zap, Bot, ArrowUpRight, Trophy } from "lucide-react";
import ShineText from "./Shinetext";
import { Black_Ops_One } from "next/font/google";

const blackOps = Black_Ops_One({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Hero() {
  return (
    <section
      className={`${blackOps.className} relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#0b0b0c] text-white select-none pt-20 pb-6 px-4 md:px-12`}
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1c1c1e_0%,_#0b0b0c_75%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,transparent_100%)]" />
      </div>

      {/* Left Vertical White Tab */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-r-2xl bg-white px-3 py-12 text-black shadow-[0_0_40px_rgba(255,255,255,0.12)] md:flex z-20"
      >
        <span className="font-mono text-[9px] font-bold tracking-[0.25em] uppercase [writing-mode:vertical-lr] rotate-180">
          BUILD • SCALE • DEPLOY • INNOVATION
        </span>
      </motion.div>

      {/* Top Right Trophy Icon */}
      <div className="absolute top-8 right-8 text-white/40 hidden md:block z-20">
        <Trophy size={18} strokeWidth={1.5} />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-[1550px] flex-col items-end justify-center space-y-1 md:space-y-2">
        
        {/* ROW 1: [Top Left Text] + [UI & CODE] */}
        <div className="flex w-full items-center justify-end space-x-3 sm:space-x-4 md:space-x-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="hidden lg:block w-[clamp(180px,18vw,270px)] font-mono text-[clamp(9.5px,0.9vw,14px)] leading-[1.5] tracking-[0.12em] text-white/40 uppercase text-left shrink-0 self-center"
          >
            I turn ideas into smart digital experiences with code, data, and AI — built to grow and designed with people in mind.
          </motion.p>

          <div className="flex items-center text-[12vw] xl:text-[11.5rem] font-extrabold uppercase tracking-tight leading-[0.85] whitespace-nowrap">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-white"
            >
              UI &amp;&nbsp;
            </motion.span>
            <ShineText delay={0.2}>CODE</ShineText>
          </div>
        </div>

        {/* ROW 2: [SOFT] + [Zap Icon] + [WARE] */}
        <div className="flex w-full items-center justify-end text-[12vw] xl:text-[11.5rem] font-extrabold uppercase tracking-tight leading-[0.85] whitespace-nowrap">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white"
          >
            SOFT
          </motion.span>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-center shrink-0 px-2 md:px-4"
          >
            <Zap className="h-[9vw] w-[9vw] max-h-[140px] max-w-[140px] fill-[#3894ff] stroke-none" />
          </motion.div>

          <ShineText delay={0.4}>WARE</ShineText>
        </div>

        {/* ROW 3: [EN] + [Robot Icon] + [GINEER] + [Bottom Right Text] */}
        <div className="flex w-full items-center justify-end space-x-3 sm:space-x-4 md:space-x-6">
          <div className="flex items-center text-[12vw] xl:text-[11.5rem] font-extrabold uppercase tracking-tight leading-[0.85] whitespace-nowrap">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-white"
            >
              EN
            </motion.span>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-center justify-center shrink-0 mx-2 md:mx-4"
            >
              <Bot className="h-[10vw] w-[10vw] max-h-[150px] max-w-[150px] text-[#f59e0b] stroke-[2]" />
            </motion.div>

            <ShineText delay={0.6}>GINEER</ShineText>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="hidden lg:block w-[clamp(180px,18vw,270px)] font-mono text-[clamp(9.5px,0.9vw,14px)] leading-[1.5] tracking-[0.12em] text-white/40 uppercase text-left shrink-0 self-center"
          >
            CODE IS A LANGUAGE OF COLLABORATION. TECHNOLOGY IS A CREATOR FOR TOMORROW. WE CRAFT FLUID INTERFACES WITH PURPOSE AND PRECISION. WE ENGINEER IT.
          </motion.p>
        </div>

      </div>

      {/* Footer Line */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="relative z-10 w-full"
      >
        <div className="mb-4 h-px w-full bg-white/10" />
        <div className="flex items-center justify-center sm:justify-end font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase space-x-4">
          <span>HYDERABAD, TELANGANA</span>
         <button
  aria-label="Scroll down"
  className="flex h-6 w-6 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white text-black transition-all duration-200 hover:scale-105 hover:bg-white/90 active:scale-95 shrink-0"
>
  <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
</button>
        </div>
      </motion.div>
    </section>
  );
}