"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface SiteIntroLoaderProps {
  onDone?: () => void;
}

const GREETINGS = [
  "HELLO",
  "BONJOUR",
  "HOLA",
  "NAMASTE",
  "CIAO",
  "KONNICHIWA",
  "HELLO",
];

export default function SiteIntroLoader({ onDone }: SiteIntroLoaderProps) {
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const expandingRectRef = useRef<HTMLDivElement>(null);
  const contentFadeRef = useRef<HTMLDivElement>(null);
  const helloTextRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const crossGroupRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);

  // SVG Line Segment Refs
  const lineTopRef = useRef<SVGLineElement>(null);
  const lineRightRef = useRef<SVGLineElement>(null);
  const lineBottomRef = useRef<SVGLineElement>(null);
  const lineLeftRef = useRef<SVGLineElement>(null);

  // Cross Mark Refs
  const topLeftRef = useRef<HTMLSpanElement>(null);
  const topRightRef = useRef<HTMLSpanElement>(null);
  const bottomLeftRef = useRef<HTMLSpanElement>(null);
  const bottomRightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Cycle through greetings during load
    const greetingInterval = setInterval(() => {
      setCurrentGreetingIndex((prev) => {
        if (prev < GREETINGS.length - 1) return prev + 1;
        return prev;
      });
    }, 350);

    const ctx = gsap.context(() => {
      const expandingRect = expandingRectRef.current;
      const helloText = helloTextRef.current;
      const progressBar = progressBarRef.current;
      const lines = [
        lineTopRef.current,
        lineRightRef.current,
        lineBottomRef.current,
        lineLeftRef.current,
      ];

      if (!expandingRect || !progressBar || lines.some((l) => !l)) return;

      const isMobile = window.innerWidth < 640;
      const initialOffset = isMobile ? 120 : 180;

      // 1. Setup SVG stroke path lengths for frame lines
      lines.forEach((line) => {
        if (!line) return;
        const length = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      });

      // 2. Initial position for "+" marks in the center
      gsap.set(
        [
          topLeftRef.current,
          topRightRef.current,
          bottomLeftRef.current,
          bottomRightRef.current,
        ],
        { x: 0, y: 0 }
      );

      // 3. Initial states for Hello text & progress bar
      gsap.set(helloText, { opacity: 0, scale: 0.85, y: 10 });
      gsap.set(progressBar, { scaleX: 0, transformOrigin: "left center" });

      // 4. Initial state for expanding curved charcoal screen container
      gsap.set(expandingRect, {
        width: "0vw",
        height: "0vh",
        borderRadius: "24px",
      });

      // --- EARTHQUAKE / VIBRATION EFFECT ---
      // Micro-shakes the entire component wrapper randomly while loading
      const shakeTween = gsap.to(containerRef.current, {
        x: "random(-3, 3)",
        y: "random(-3, 3)",
        rotation: "random(-0.5, 0.5)",
        duration: 0.04,
        repeat: -1,
        yoyo: true,
        ease: "none",
      });

      const tl = gsap.timeline({
        onComplete: () => {
          shakeTween.kill();
          gsap.set(containerRef.current, { x: 0, y: 0, rotation: 0 });
          clearInterval(greetingInterval);
          if (onDone) onDone();
        },
      });

      // --- STEP 1: Fade in Hello Text & Move "+" marks to form the box corners ---
      tl.to(helloText, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      tl.to(
        topLeftRef.current,
        { x: -initialOffset, y: -initialOffset, duration: 1.4, ease: "power3.inOut" },
        "<"
      );
      tl.to(
        topRightRef.current,
        { x: initialOffset, y: -initialOffset, duration: 1.4, ease: "power3.inOut" },
        "<"
      );
      tl.to(
        bottomLeftRef.current,
        { x: -initialOffset, y: initialOffset, duration: 1.4, ease: "power3.inOut" },
        "<"
      );
      tl.to(
        bottomRightRef.current,
        { x: initialOffset, y: initialOffset, duration: 1.4, ease: "power3.inOut" },
        "<"
      );

      // --- STEP 2: Draw white connecting lines & Fill Progress Bar + Counter ---
      tl.to(
        lines,
        {
          strokeDashoffset: 0,
          duration: 1.4,
          stagger: 0.12,
          ease: "power2.inOut",
        },
        "-=0.4"
      );

      // Progress bar fill & numeric percentage count up
      const progressObj = { value: 0 };
      tl.to(
        progressBar,
        {
          scaleX: 1,
          duration: 1.8,
          ease: "power2.inOut",
        },
        "<"
      );

      tl.to(
        progressObj,
        {
          value: 100,
          duration: 1.8,
          ease: "power2.inOut",
          onUpdate: () => {
            setPercentage(Math.floor(progressObj.value));
          },
        },
        "<"
      );

      tl.to({}, { duration: 0.3 });

      // Stop shake right before fade out & expansion
      tl.add(() => {
        shakeTween.pause();
        gsap.to(containerRef.current, { x: 0, y: 0, rotation: 0, duration: 0.1 });
      });

      // --- STEP 3: Fade out inner text, lines & progress section ---
      tl.to([contentFadeRef.current, helloTextRef.current, ...lines], {
        opacity: 0,
        y: -10,
        duration: 0.4,
        ease: "power2.inOut",
      });

      // --- STEP 4: Expand Rectangle & Move "+" symbols together toward screen edges ---
      const viewportHalfWidth = window.innerWidth / 2 - 20;
      const viewportHalfHeight = window.innerHeight / 2 - 20;

      tl.to(
        expandingRect,
        {
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
          duration: 1.6,
          ease: "expo.inOut",
        },
        "expand"
      );

      // Drive "+" symbols out synchronously with expanding rectangle
      tl.to(
        topLeftRef.current,
        { x: -viewportHalfWidth, y: -viewportHalfHeight, duration: 1.6, ease: "expo.inOut" },
        "expand"
      );
      tl.to(
        topRightRef.current,
        { x: viewportHalfWidth, y: -viewportHalfHeight, duration: 1.6, ease: "expo.inOut" },
        "expand"
      );
      tl.to(
        bottomLeftRef.current,
        { x: -viewportHalfWidth, y: viewportHalfHeight, duration: 1.6, ease: "expo.inOut" },
        "expand"
      );
      tl.to(
        bottomRightRef.current,
        { x: viewportHalfWidth, y: viewportHalfHeight, duration: 1.6, ease: "expo.inOut" },
        "expand"
      );

      // --- FADE OUT "+" SYMBOLS JUST BEFORE THEY REACH SCREEN CORNERS ---
      tl.to(
        [
          topLeftRef.current,
          topRightRef.current,
          bottomLeftRef.current,
          bottomRightRef.current,
        ],
        { opacity: 0, duration: 0.45, ease: "power2.out" },
        "-=0.7"
      );
    }, containerRef);

    return () => {
      clearInterval(greetingInterval);
      ctx.revert();
    };
  }, [onDone]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#18181b] select-none font-sans overflow-hidden px-4"
    >
      {/* ---------------- EXPANDING DEEP CHARCOAL SCREEN FILL ---------------- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div
          ref={expandingRectRef}
          className="bg-[#09090b] will-change-[width,height,border-radius] border border-zinc-700/30"
        />
      </div>

      {/* CENTER INTRO CONTAINER */}
      <div className="relative flex flex-col items-center justify-center z-10 pointer-events-none w-full max-w-[480px]">
        {/* RESPONSIVE SQUARE FRAME CONTAINER */}
        <div className="relative flex h-[380px] w-[380px] sm:h-[540px] sm:w-[540px] md:h-[600px] md:w-[600px] items-center justify-center transition-all duration-300">
          {/* SVG PERIMETER LINES (CRISP WHITE) */}
          <svg
            className="absolute inset-0 h-full w-full pointer-events-none overflow-visible"
            viewBox="0 0 500 500"
          >
            {/* Top Line */}
            <line
              ref={lineTopRef}
              x1="70"
              y1="70"
              x2="430"
              y2="70"
              stroke="#ffffff"
              strokeWidth="2.5"
            />
            {/* Right Line */}
            <line
              ref={lineRightRef}
              x1="430"
              y1="70"
              x2="430"
              y2="430"
              stroke="#ffffff"
              strokeWidth="2.5"
            />
            {/* Bottom Line */}
            <line
              ref={lineBottomRef}
              x1="430"
              y1="430"
              x2="70"
              y2="430"
              stroke="#ffffff"
              strokeWidth="2.5"
            />
            {/* Left Line */}
            <line
              ref={lineLeftRef}
              x1="70"
              y1="430"
              x2="70"
              y2="70"
              stroke="#ffffff"
              strokeWidth="2.5"
            />
          </svg>

          {/* DYNAMIC HELLO TEXT ANIMATION */}
          <div
            ref={helloTextRef}
            className="relative flex flex-col items-center justify-center select-none text-center px-4"
          >
            <span className="font-mono text-[10px] sm:text-xs text-zinc-400 tracking-[0.4em] mb-2 sm:mb-3 uppercase">
              Welcome
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-widest text-white font-mono transition-all duration-300">
              {GREETINGS[currentGreetingIndex]}
            </h1>
            <div className="mt-2 sm:mt-3 h-[2px] w-12 sm:w-16 bg-zinc-500/50 rounded-full" />
          </div>

          {/* 4 CORNER PLUS SYMBOLS (+), FADING JUST BEFORE SCREEN CORNERS */}
          <div ref={crossGroupRef} className="absolute inset-0 pointer-events-none z-20">
            <span
              ref={topLeftRef}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-2xl sm:text-3xl font-bold text-white leading-none drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
            >
              +
            </span>
            <span
              ref={topRightRef}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-2xl sm:text-3xl font-bold text-white leading-none drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
            >
              +
            </span>
            <span
              ref={bottomLeftRef}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-2xl sm:text-3xl font-bold text-white leading-none drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
            >
              +
            </span>
            <span
              ref={bottomRightRef}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-2xl sm:text-3xl font-bold text-white leading-none drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
            >
              +
            </span>
          </div>
        </div>

        {/* BOTTOM PROGRESS BAR & PERCENTAGE */}
        <div
          ref={contentFadeRef}
          className="mt-6 sm:mt-8 w-full max-w-[200px] sm:max-w-[280px] flex flex-col items-center gap-2"
        >
          <div className="h-[3px] w-full bg-zinc-800/80 rounded-full overflow-hidden border border-zinc-700/40">
            <div
              ref={progressBarRef}
              className="h-full w-full bg-gradient-to-r from-zinc-500 via-zinc-200 to-white rounded-full"
            />
          </div>

          {/* DYNAMIC PERCENTAGE DISPLAY */}
          <div
            ref={numberRef}
            className="font-mono text-xs sm:text-sm text-zinc-400 tracking-widest"
          >
            {percentage}%
          </div>
        </div>
      </div>
    </div>
  );
}