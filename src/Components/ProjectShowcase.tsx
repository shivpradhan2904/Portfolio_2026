"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Compass, Music, Gamepad2, Sparkles, ArrowRight, Terminal } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PERSONAL_DATA = {
  name: "SIBA PRADHAN",
  subtitle: "CREATIVE EXPLORER & BUILDER",
  origin: "Bhubaneswar, Odisha",
  location: "Hyderabad, TS",
  bio: "Bridging architectural precision with creative exploration. Based in Hyderabad, focused on crafting high-level digital experiences, strategic systems, and scalable UI structures.",
  tracks: [
    {
      id: "01",
      title: "EXPLORATION",
      subtitle: "Wanderlust & Travel",
      desc: "Navigating new routes across Entire India.",
      icon: Compass,
      tag: "DESTINATIONS",
    },
    {
      id: "02",
      title: "SOUNDSCAPES",
      subtitle: "Music & Audio",
      desc: "Curating ambient, high-energy, and tactical soundscapes.",
      icon: Music,
      tag: "BEATS & AUDIO",
    },
    {
      id: "03",
      title: "TACTICS",
      subtitle: "Chess & Strategy",
      desc: "Endgame analysis, tactical positioning, and strategic thinking.",
      icon: Gamepad2,
      tag: "CHESS ♟️",
    },
  ],
};

export default function CharcoalRedShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
  });

  const progressBar = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

useEffect(() => {
  const ctx = gsap.context(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".horizontal-panel");

    if (sections.length > 0 && horizontalRef.current) {
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          invalidateOnRefresh: true,
          // CHANGE HERE: Replace offsetWidth with exact horizontal translation distance
          end: () => `+=${(sections.length - 1) * window.innerWidth}`,
        },
      });
    }

    // ... rest of your GSAP logic ...
  }, containerRef);

  return () => ctx.revert();
}, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#0b0b0c] text-zinc-100 selection:bg-red-600 selection:text-white font-sans overflow-x-hidden"
    >
      {/* Top Progress Bar */}
      {/* <motion.div
        style={{ width: progressBar }}
        className="fixed top-0 left-0 h-1 bg-red-600 z-50 shadow-[0_0_10px_#dc2626]"
      /> */}

      {/* Background Mesh */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#1f1f23_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* SECTION 1: HERO */}
      <section className="relative h-screen w-full flex flex-col justify-between p-6 sm:p-12 border-b border-zinc-800/60">
        <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-600 animate-ping" />
            <span className="text-zinc-200 tracking-wider">PORTFOLIO // 2026</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-zinc-500">ORIGIN: {PERSONAL_DATA.origin}</span>
            <span className="flex items-center gap-1 text-red-500 border border-red-900/40 bg-red-950/20 px-2.5 py-1 rounded">
              <MapPin size={12} /> {PERSONAL_DATA.location}
            </span>
          </div>
        </div>

        <div className="my-auto space-y-6 max-w-5xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-red-500 tracking-widest uppercase">
            <Sparkles size={14} />
            <span>{PERSONAL_DATA.subtitle}</span>
          </div>

          <h1
            ref={textRef}
            className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase text-zinc-100 leading-none"
          >
            {PERSONAL_DATA.name.split(" ")[0]} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-zinc-400 hero-text-glow">
              {PERSONAL_DATA.name.split(" ")[1]}
            </span>
          </h1>

          <p className="text-base sm:text-xl text-zinc-400 max-w-2xl font-light leading-relaxed">
            {PERSONAL_DATA.bio}
          </p>
        </div>

        <div className="flex items-center justify-between font-mono text-xs text-zinc-500 pt-4 border-t border-zinc-900">
          <span className="flex items-center gap-2">
            <Terminal size={14} className="text-red-600" /> SCROLL DOWN TO EXPLORE
          </span>
          <ArrowRight size={16} className="text-red-500 animate-pulse" />
        </div>
      </section>

      {/* SECTION 2: HORIZONTAL TRACK PANELS */}
      <section ref={horizontalRef} className="relative h-screen w-full overflow-hidden bg-[#0b0b0c]">
        <div className="flex h-full w-[300vw]">
          {PERSONAL_DATA.tracks.map((track, idx) => {
            const Icon = track.icon;
            return (
              <div
                key={idx}
                className="horizontal-panel w-screen h-full flex flex-col justify-between p-8 sm:p-16 border-r border-zinc-800/80 relative"
              >
                <span className="absolute right-8 bottom-4 text-[18vw] font-black text-zinc-900/40 select-none pointer-events-none font-mono">
                  {track.id}
                </span>

                <div className="flex items-center justify-between relative z-10">
                  <span className="font-mono text-xs text-red-500 tracking-widest border-b border-red-600/40 pb-1">
                    //{track.tag}
                  </span>
                  <Icon size={32} className="text-red-500" />
                </div>

                <div className="relative z-10 max-w-2xl space-y-4">
                  <span className="font-mono text-sm text-zinc-400">{track.subtitle}</span>
                  <h2 className="text-4xl sm:text-7xl font-bold tracking-tight text-white uppercase">
                    {track.title}
                  </h2>
                  <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed">
                    {track.desc}
                  </p>
                </div>

                <div className="relative z-10 flex items-center gap-4 font-mono text-xs text-zinc-500">
                  <span className="h-1.5 w-1.5 bg-red-600 rounded-full" />
                  <span>PANEL {idx + 1} OF 3</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: OUTRO */}
      <section className="relative min-h-[60vh] w-full p-8 sm:p-16 flex flex-col justify-between bg-[#08080a] border-t border-zinc-800/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-auto">
          <div className="space-y-2 border-l-2 border-red-600 pl-4">
            <span className="font-mono text-xs text-zinc-500 uppercase">Hometown</span>
            <p className="text-xl font-bold text-white uppercase">{PERSONAL_DATA.origin}</p>
          </div>
          <div className="space-y-2 border-l-2 border-red-600 pl-4">
            <span className="font-mono text-xs text-zinc-500 uppercase">Current Base</span>
            <p className="text-xl font-bold text-white uppercase">{PERSONAL_DATA.location}</p>
          </div>
          <div className="space-y-2 border-l-2 border-red-600 pl-4">
            <span className="font-mono text-xs text-zinc-500 uppercase">Focus Game</span>
            <p className="text-xl font-bold text-white uppercase">Chess ♟️</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-12 border-t border-zinc-900 font-mono text-xs text-zinc-500">
          <span>SIBA PRADHAN — DIGITAL PROFILE</span>
          <span className="text-red-500">AVAILABLE FOR COLLABORATION</span>
        </div>
      </section>
    </div>
  );
}