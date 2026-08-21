"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Fraunces, JetBrains_Mono, Inter } from "next/font/google";
import IrisPortal, { IrisPortalHandle } from "./Irisportal";

gsap.registerPlugin(ScrollTrigger);

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

type Project = {
  index: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  accent: string;
  image?: string;
  gradient?: string;
};

const PROJECTS: Project[] = [
  {
    index: "01",
    title: "Stemify",
    category: "Video & Social Platform",
    description:
      "A next-gen video calling and social platform built for STEM enthusiasts — featuring real-time video streaming, interactive code snippet sharing, and community-driven topic hubs.",
    tags: ["React", "Tailwind CSS", "MongoDB", "Daisy UI", "Stream"],
    accent: "#ef4444",
    gradient: "from-red-600 via-zinc-900 to-black",
    image:
      "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&q=80", // Video conference call UI theme
  },
  {
    index: "02",
    title: "DineEase",
    category: "Food Experience UI",
    description:
      "A sleek, highly intuitive frontend UI for an online dining platform — complete with interactive menu discovery, smooth order flows, and responsive motion design.",
    tags: ["React", "Framer Motion", "Tailwind CSS", "TypeScript"],
    accent: "#ffffff",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80", // Modern gourmet dish presentation
  },
  {
    index: "03",
    title: "QRDine",
    category: "Contactless Dining System",
    description:
      "A smart QR-based contactless dining & ordering solution enabling instant table menus, seamless digital payments, and real-time order status tracking for modern restaurants.",
    tags: ["Next.js", "Node.js", "MongoDB"],
    accent: "#ef4444",
    gradient: "from-zinc-800 via-red-950 to-neutral-950",
   image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
  },
];

const HEADING = "DIVE INTO THE WORK";

export default function ProjectDiveScroll() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);

  const skyRef = useRef<HTMLDivElement | null>(null);
  const floodRef = useRef<HTMLDivElement | null>(null);

  const headingWrapRef = useRef<HTMLDivElement | null>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const portalWrapRef = useRef<HTMLDivElement | null>(null);
  const irisRef = useRef<IrisPortalHandle | null>(null);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [railVisible, setRailVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const flood = floodRef.current;
      const portalWrap = portalWrapRef.current;
      const iris = irisRef.current;
      if (!flood || !portalWrap || !iris || !iris.ring || !iris.glow) return;

      gsap.set(charRefs.current, { yPercent: 120, opacity: 0 });
      gsap.set(flood, { clipPath: "circle(0% at 50% 50%)" });
      gsap.set(portalWrap, { opacity: 0, scale: 0.5 });
      gsap.set(iris.bladeInners, { y: 0, rotate: 0, opacity: 1 });
      gsap.set(iris.ring, { scale: 0.7, transformOrigin: "150px 150px" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          pin: pinRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(charRefs.current, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.025,
        duration: 0.8,
        ease: "power3.out",
      }).to({}, { duration: 0.2 });

      tl.to(headingWrapRef.current, {
        opacity: 0,
        scale: 0.85,
        y: -30,
        duration: 0.5,
        ease: "power2.inOut",
      })
        .to(
          portalWrap,
          { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.6)" },
          "<0.1"
        )
        .to(iris.glow, { opacity: 1, duration: 0.5 }, "<")
        .to(iris.ring, { scale: 1, duration: 0.7, ease: "power2.out" }, "<");

      tl.to(
        iris.bladeInners,
        {
          y: -60,
          rotate: (i) => (i % 2 === 0 ? 18 : -18),
          opacity: 0.15,
          duration: 1,
          stagger: 0.025,
          ease: "power2.inOut",
        },
        "+=0.1"
      )
        .to(
          flood,
          {
            clipPath: "circle(150% at 50% 50%)",
            duration: 1.3,
            ease: "power2.inOut",
          },
          "<0.15"
        )
        .to(skyRef.current, { opacity: 0, duration: 0.6 }, "<0.3")
        .to(
          portalWrap,
          { opacity: 0, duration: 0.4, onComplete: () => setRailVisible(true) },
          "-=0.3"
        )
        .set(portalWrap, { pointerEvents: "none" });

      PROJECTS.forEach((_, i) => {
        const card = cardRefs.current[i];
        const panel = panelRefs.current[i];
        if (!card || !panel) return;

        const itemGroup = [card, panel];

        gsap.set(itemGroup, {
          x: "70vw",
          y: "50vh",
          rotation: 10,
          opacity: 0,
        });

        tl.addLabel(`project-${i}`)
          .call(() => setActiveIndex(i))
          .to(itemGroup, {
            keyframes: [
              { x: "25vw", y: "12vh", rotation: 4, opacity: 0.8, duration: 0.5 },
              { x: "0vw", y: "0vh", rotation: 0, opacity: 1, duration: 0.5 },
            ],
            ease: "power1.out",
          })
          .to({}, { duration: 0.7 });

        const isLast = i === PROJECTS.length - 1;
        if (!isLast) {
          tl.to(itemGroup, {
            x: "-80vw",
            y: "-5vh",
            rotation: -6,
            opacity: 0,
            duration: 0.7,
            ease: "power1.in",
          });
        }
      });

      tl.to({}, { duration: 0.3 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ height: `${140 + PROJECTS.length * 140}vh` }}
      className={`relative ${fraunces.variable} ${mono.variable} ${inter.variable}`}
    >
      <div
        ref={pinRef}
        className="relative h-screen w-full overflow-hidden select-none bg-[#0b0b0c]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <div ref={skyRef} className="absolute inset-0" />

        <div
          ref={floodRef}
          className="absolute inset-0 bg-[#0b0b0c]"
          style={{ clipPath: "circle(0% at 50% 50%)" }}
        />

        <div
          ref={headingWrapRef}
          className="absolute inset-0 z-30 flex items-center justify-center px-4"
        >
          <h1
            className="flex flex-wrap justify-center gap-x-5 text-center text-4xl font-black uppercase tracking-tight text-white sm:text-6xl md:text-8xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {HEADING.split(" ").map((word, wIdx) => (
              <span key={wIdx} className="inline-block overflow-hidden py-2">
                {word.split("").map((char, cIdx) => (
                  <span
                    key={cIdx}
                    ref={(el) => {
                      if (el) charRefs.current.push(el);
                    }}
                    className="inline-block"
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>
        </div>

        <div
          ref={portalWrapRef}
          className="absolute left-1/2 top-1/2 z-20 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 sm:h-[300px] sm:w-[300px]"
        >
          <IrisPortal ref={irisRef} />
        </div>

        <div
          className={`pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 transition-opacity duration-500 sm:right-10 md:flex ${
            railVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {PROJECTS.map((p, i) => (
            <div key={p.index} className="flex items-center gap-3">
              <span
                className="text-xs tracking-widest transition-colors duration-300 font-mono"
                style={{
                  color: i === activeIndex ? "#ef4444" : "rgba(255,255,255,0.3)",
                }}
              >
                {p.index}
              </span>
              <span
                className="h-px transition-all duration-300"
                style={{
                  width: i === activeIndex ? "32px" : "14px",
                  backgroundColor:
                    i === activeIndex ? "#ef4444" : "rgba(255,255,255,0.2)",
                }}
              />
            </div>
          ))}
        </div>

        {PROJECTS.map((project, i) => (
          <div
            key={project.title}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-10 px-[6%] md:flex-row md:gap-16 md:px-[10%]"
          >
            <div
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={`relative h-[260px] w-[260px] shrink-0 overflow-hidden rounded-[24px] border border-red-500/30 bg-[#121214] sm:h-[340px] sm:w-[340px] md:h-[400px] md:w-[400px] ${
                project.gradient
                  ? `bg-gradient-to-br ${project.gradient}`
                  : "bg-zinc-950"
              }`}
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-80"
                  draggable={false}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div
                className="absolute inset-0 rounded-[24px]"
                style={{ boxShadow: "inset 0 0 0 1px rgba(239,68,68,0.3)" }}
              />
            </div>

            <div
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              className="relative max-w-md text-white"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-12 left-0 select-none font-mono text-[8rem] font-black leading-none opacity-10 text-red-500 sm:text-[10rem]"
              >
                {project.index}
              </span>

              <div className="relative z-10">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-500 font-bold">
                  // {project.category}
                </span>

                <h3
                  className="mt-2 text-3xl font-black uppercase leading-tight sm:text-4xl md:text-5xl tracking-tight text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {project.title}
                </h3>

                <p className="mt-4 font-sans text-sm leading-relaxed text-zinc-400 sm:text-base">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-red-500/30 bg-red-950/20 px-3.5 py-1 font-mono text-xs text-red-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}