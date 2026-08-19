"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Mail, FileText, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { Chakra_Petch, Space_Grotesk, Inter } from "next/font/google";

// Heavy display font matching the chamfered/angled block style in image
const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-chakra",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Scroll Reveal Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] } 
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const textFadeIn: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function FooterSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // GSAP Continuous Floating Motion for Portrait Image
  useGSAP(
    () => {
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -10,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <footer
      ref={containerRef}
      className={`relative w-full bg-[#0a0a0c] text-neutral-300 pt-20 pb-0 px-4 sm:px-8 lg:px-12 overflow-hidden select-none ${chakraPetch.variable} ${spaceGrotesk.variable} ${inter.variable}`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      <div className="max-w-[1300px] mx-auto relative z-10">

        {/* TOP SECTION: GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

          {/* LEFT SIDE CONTENT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="lg:col-span-7 flex flex-col items-start w-full"
          >
            {/* Title Text */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white leading-[1.05]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              LET'S WORK <br />
              <span className="text-neutral-500 italic font-serif tracking-normal lowercase">
                together..
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeInUp}
              className="mt-6 text-base sm:text-xl text-neutral-200 max-w-lg leading-relaxed"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              <span className="font-bold text-white">Frontend developer</span>{" "}
              <span className="text-neutral-500 italic">
                crafting responsive, high-performance & cinematic experiences...
              </span>
            </motion.p>

            {/* Social Links (Stagger Animated Single Row) */}
            <motion.div
              variants={staggerContainer}
              className="mt-8 flex flex-row items-center justify-between sm:justify-start gap-1.5 sm:gap-2 md:gap-3 w-full"
            >
              {[
                { name: "GitHub", icon: FaGithub, href: "https://github.com" },
                { name: "LinkedIn", icon: FaLinkedin, href: "https://linkedin.com" },
                { name: "Twitter", icon: FaTwitter, href: "https://twitter.com" },
                { name: "Email", icon: Mail, href: "mailto:contact@example.com" },
                { name: "Resume", icon: FileText, href: "#resume" },
              ].map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    variants={fadeInUp}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.95 }}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative inline-flex w-full sm:w-28 md:w-32 lg:w-36 max-w-[140px] items-center gap-1.5 sm:gap-2.5 rounded-lg bg-[#121214] border border-white/10 p-1 sm:p-1.5 pr-2 sm:pr-4 shadow-xl transition-all duration-300 hover:border-red-500/50"
                  >
                    {/* Sliding Background Layer */}
                    <span className="absolute inset-y-1 sm:inset-y-1.5 left-1 sm:left-1.5 w-7 sm:w-9 rounded-md bg-gradient-to-r from-red-600 to-rose-600 shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all duration-300 ease-out group-hover:w-[calc(100%-8px)] sm:group-hover:w-[calc(100%-12px)]" />

                    {/* Icon Container: Handles sliding out primary icon & sliding in Arrow */}
                    <span className="relative flex h-7 w-7 sm:h-9 sm:w-9 overflow-hidden shrink-0 items-center justify-center text-white z-10">
                      {/* Left Icon: Slides right out of view */}
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 transform transition-transform duration-300 group-hover:translate-x-12" />

                      {/* Arrow Icon: Slides into view from the left */}
                      <ArrowUpRight className="absolute h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-x-12 transform transition-transform duration-300 group-hover:translate-x-0" />
                    </span>

                    {/* Label */}
                    <span className="relative text-[10px] xs:text-xs sm:text-sm font-medium text-neutral-300 z-10 transition-colors duration-300 group-hover:text-white truncate">
                      {link.name}
                    </span>
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE: PORTRAIT WITH SCROLL REVEAL & NO-BORDER FADE */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={imageReveal}
            className="lg:col-span-5 flex justify-center lg:justify-end relative"
          >
            <div className="relative w-64 h-80 sm:w-72 sm:h-96">
              <div
                className="w-full h-full relative z-10"
                style={{
                  maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                }}
              >
                <Image
                  ref={imageRef}
                  src="/profile.png"
                  alt="Portrait"
                  width={600}
                  height={800}
                  className="object-cover object-bottom w-full h-full filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                  priority
                />
              </div>
            </div>
          </motion.div>

        </div>

        {/* MIDDLE TAGLINE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-20px" }}
          className="mt-16 border-t border-neutral-800/80 pt-6 text-center"
        >
          <p
            className="text-xs sm:text-sm tracking-[0.3em] uppercase text-neutral-400 font-semibold"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            CODE • DESIGN • BUILD • REPEAT
          </p>
        </motion.div>
      </div>

      {/* FULL-WIDTH "PRADHAN" (SCROLL UP REVEAL) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        variants={textFadeIn}
        className="w-full text-center overflow-hidden pt-6 pb-0 leading-none -mb-2 sm:-mb-4"
      >
        <h1
          className="text-[17vw] font-bold uppercase leading-[0.82] tracking-tighter select-none pointer-events-none text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 via-50% to-neutral-700/80 block w-full whitespace-nowrap"
          style={{
            fontFamily: "var(--font-chakra), sans-serif",
          }}
        >
          PRADHAN
        </h1>
      </motion.div>
    </footer>
  );
}