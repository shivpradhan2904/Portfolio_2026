"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { Allura } from "next/font/google";

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
});

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const headlineZoomVariants: Variants = {
  hidden: {
    scale: 0.9,
    opacity: 0,
    y: 20,
  },
  show: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.045,
      delayChildren: 0.1,
    },
  },
};

const wordVariant: Variants = {
  hidden: { y: "100%", opacity: 0, filter: "blur(8px)" },
  show: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HeroStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within this component section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Dynamic transforms based on scrolling down
  const lineOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  // Headline scroll effects (smooth parallax transform)
  const headlineScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const headlineY = useTransform(scrollYProgress, [0, 0.6], [0, -40]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);

  // Content grid scroll effects
  const gridY = useTransform(scrollYProgress, [0, 0.6], [0, -20]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.3]);

  const renderAnimatedText = (text: string, opacityClass = "text-white") => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="inline-block overflow-hidden align-top mr-[0.28em]">
        <motion.span variants={wordVariant} className={`inline-block ${opacityClass}`}>
          {word}
        </motion.span>
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0b0b0c] text-white overflow-hidden py-8 sm:py-12"
    >
      {/* Corner accents */}
      <span className="absolute left-3 top-3 sm:left-4 sm:top-4 h-1.5 w-1.5 rounded-full bg-rose-600 z-10" />
      <span className="absolute right-3 top-3 sm:right-4 sm:top-4 h-1.5 w-1.5 rounded-full bg-rose-600/60 z-10" />
      <span className="absolute left-3 bottom-3 sm:left-4 sm:bottom-4 h-1.5 w-1.5 rounded-full bg-rose-600/60 z-10" />
      <span className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 h-1.5 w-1.5 rounded-full bg-rose-600 z-10" />

      {/* Frame line */}
      <motion.div
        style={{ opacity: lineOpacity }}
        className="pointer-events-none absolute inset-2 sm:inset-4 border border-white/10"
      />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        {/* Eyebrow row */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.8 }}
          variants={containerVariants}
          className="mb-6 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] tracking-[0.2em]"
        >
          <motion.span
            variants={fadeUp}
            className="flex items-center gap-2 font-semibold uppercase text-rose-500"
          >
            <span className="text-rose-500">❝</span> I Believe
          </motion.span>
          <motion.span variants={fadeUp} className="uppercase text-white/40">
            Systems &amp; Software Engineering
          </motion.span>
        </motion.div>

        {/* HEADLINE: Scroll wrapper isolates useTransform from initial whileInView trigger */}
        <motion.div
          style={{
            scale: headlineScale,
            y: headlineY,
            opacity: headlineOpacity,
          }}
          className="max-w-5xl origin-left will-change-transform"
        >
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            variants={headlineZoomVariants}
          >
            <h2 className="font-bold leading-[1.1] sm:leading-[1.05] tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-[5.2rem] xl:text-[5.6rem]">
              <span className="text-white/70 mr-1">&quot;</span>
              {renderAnimatedText("Applied", "text-white")}
              {renderAnimatedText("intelligence..", "text-white/40")}
              <br className="hidden sm:inline" />
              {renderAnimatedText("because modern", "text-white")}
              {renderAnimatedText("engineering...", "italic font-medium text-white/85")}
              <span className="text-white/70 ml-1">&quot;</span>
            </h2>
          </motion.div>
        </motion.div>

        {/* Dynamic Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ transformOrigin: "left" }}
          className="my-8 sm:my-10 h-px w-full bg-white/15"
        />

        {/* Content Grid */}
        <motion.div
          style={{
            y: gridY,
            opacity: gridOpacity,
          }}
          className="will-change-transform"
        >
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            variants={containerVariants}
            className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-[1.1fr_1fr_1fr]"
          >
            {/* Intro paragraph */}
            <motion.p
              variants={fadeUp}
              className="text-sm leading-relaxed text-white/70 sm:text-base"
            >
              I build full-stack tools and the{" "}
              <span className="italic text-white underline decoration-white/30 underline-offset-4">
                scalable APIs
              </span>{" "}
              that keep applications fast and reliable.
            </motion.p>

            {/* Scope & Platform */}
            <motion.div variants={fadeUp} className="border-t border-white/15 pt-4">
              <h3 className="mb-3 text-xs font-bold tracking-[0.15em]">
                CRAFT &amp; FOCUS
              </h3>
              <p className="text-sm leading-relaxed text-white/50">
                Focusing on reusable components, performance fixes, and
                cross-browser layout consistency designed to deliver reliable
                features every sprint.
              </p>
              <a
                href="#projects"
                className="mt-3 inline-block text-sm italic text-rose-500 hover:text-rose-400 transition-colors"
              >
                Turning ideas into live products
              </a>
            </motion.div>

            {/* Integration & Responsive Signature */}
            <motion.div variants={fadeUp} className="border-t border-white/15 pt-4">
              <h3 className="mb-3 text-xs font-bold tracking-[0.15em]">
                WORKFLOW
              </h3>
              <p className="text-sm leading-relaxed text-white/50">
                Across the stack, I connect sleek frontends with clean backends,
                reliable database queries, and structured API endpoints.
              </p>

              {/* Signature Block */}
              <div className="mt-6 flex flex-col items-center gap-3 sm:items-start text-center sm:text-left">
                <span className="flex items-center gap-1.5 text-[10px] font-medium tracking-[0.2em] text-white/40 uppercase">
                  <span className="h-px w-3 bg-rose-500/80 inline-block" />
                  By
                </span>
                <p className={`${allura.className} text-8xl text-white/90 select-none -mt-1 sm:-mt-2`}>
                  Shiv
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}