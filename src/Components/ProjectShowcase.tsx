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
      {/* Background Mesh */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#1f1f23_1px,transparent_1px)] [background-size:24px_24px]" />
 
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
 
    </div>
  );
}