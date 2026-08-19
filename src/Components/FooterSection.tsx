"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Mail, FileText, ArrowUpRight, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { Chakra_Petch, Space_Grotesk, Inter } from "next/font/google";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
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

export default function FooterSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const bigTextRef = useRef<HTMLHeadingElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (imageWrapperRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          { y: 30 },
          {
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      ScrollTrigger.refresh();
    },
    { scope: containerRef }
  );

  return (
    <footer
      ref={containerRef}
      className={`relative w-full bg-[#0a0a0c] text-neutral-300 pt-16 pb-0 px-4 sm:px-8 lg:px-12 ${chakraPetch.variable} ${spaceGrotesk.variable} ${inter.variable}`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      <div className="max-w-[1600px] mx-auto relative z-10">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* LEFT SIDE CONTENT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            variants={staggerContainer}
            className="lg:col-span-6 flex flex-col items-center text-center lg:items-start lg:text-left w-full"
          >
            {/* Title Text */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold uppercase tracking-tight text-white leading-[1.05]"
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

            {/* Social Links */}
            <motion.div
              variants={staggerContainer}
              className="mt-8 flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 w-full"
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
                    className="group relative inline-flex w-[110px] sm:w-[125px] xl:w-[135px] items-center justify-start gap-1.5 sm:gap-2.5 rounded-lg bg-[#121214] border border-white/10 p-1 sm:p-1.5 pr-2 sm:pr-3 shadow-xl transition-all duration-300 hover:border-red-500/50"
                  >
                    <span className="absolute inset-y-1 sm:inset-y-1.5 left-1 sm:left-1.5 w-7 sm:w-8 rounded-md bg-gradient-to-r from-red-600 to-rose-600 shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all duration-300 ease-out group-hover:w-[calc(100%-8px)] sm:group-hover:w-[calc(100%-12px)]" />

                    <span className="relative flex h-7 w-7 sm:h-8 sm:w-8 overflow-hidden shrink-0 items-center justify-center text-white z-10">
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 transform transition-transform duration-300 group-hover:translate-x-12" />
                      <ArrowUpRight className="absolute h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-x-12 transform transition-transform duration-300 group-hover:translate-x-0" />
                    </span>

                    <span className="relative text-[11px] xs:text-xs sm:text-xs xl:text-sm font-medium text-neutral-300 z-10 transition-colors duration-300 group-hover:text-white truncate">
                      {link.name}
                    </span>
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE: PORTRAIT */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end relative pointer-events-none">
            <div
              ref={imageWrapperRef}
              className="relative w-72 h-[24rem] sm:w-[22rem] sm:h-[28rem] md:w-[26rem] md:h-[32rem] lg:w-[28rem] lg:h-[34rem]"
            >
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
                  width={800}
                  height={1000}
                  className="object-cover object-bottom w-full h-full filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700 pointer-events-auto"
                  priority
                />
              </div>
            </div>
          </div>

        </div>

        {/* MIDDLE TAGLINE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: "-20px" }}
          className="mt-12 border-t border-neutral-800/80 pt-6 text-center"
        >
          <p
            className="text-xs sm:text-sm tracking-[0.3em] uppercase text-neutral-400 font-semibold"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            CODE • DESIGN • BUILD • REPEAT
          </p>
        </motion.div>

        {/* COPYRIGHT & BOTTOM BAR */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
          className="mt-6 border-t border-neutral-900 pt-6 pb-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          <p className="tracking-wider text-center sm:text-left">
            © {new Date().getFullYear()} <span className="text-neutral-300 font-semibold uppercase">Pradhan</span>. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 hover:text-white transition-colors duration-300 focus:outline-none"
          >
            <span className="uppercase tracking-widest text-[11px]">Back to top</span>
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-900 border border-neutral-800 group-hover:border-neutral-600 transition-colors duration-300">
              <ArrowUp className="w-3 h-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </div>
          </button>
        </motion.div>

      </div>

      {/* FULL-WIDTH "PRADHAN" */}
      <div className="w-full text-center overflow-hidden pt-4 pb-0 leading-none pointer-events-none">
        <h1
          ref={bigTextRef}
          className="text-[18vw] font-bold uppercase leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 via-50% to-neutral-700/80 block w-full whitespace-nowrap"
          style={{
            fontFamily: "var(--font-chakra), sans-serif",
          }}
        >
          PRADHAN
        </h1>
      </div>
    </footer>
  );
}