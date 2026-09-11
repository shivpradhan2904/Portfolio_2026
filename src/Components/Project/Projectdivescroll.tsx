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
  image: string;
  quoteLabel?: string;
  bigText: string;
  githubUrl: string;
  architectureDetails: string[];
};

const PROJECTS: Project[] = [
  {
    index: "01",
    title: "Reposense AI",
    category: "AI & Vector Search",
    description:
      "Intelligent repository analyzer utilizing Gemini LLM, Qdrant vector database, and MERN stack for deep code insights.",
    tags: ["React", "Node.js", "Gemini LLM", "Qdrant", "Express"],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80",
    quoteLabel: "SEMANTIC REPOSITORY SEARCH POWERED BY VECTOR EMBEDDINGS",
    bigText: "Reposense AI",
    githubUrl: "https://github.com/yourusername/reposense-ai",
    architectureDetails: [
      "Vector Storage: Integrated Qdrant Cloud for storing embeddings of AST code nodes.",
      "LLM Pipeline: Google Gemini Pro API for contextual code summaries and chat completion.",
      "Backend: Node.js/Express service for chunking codebase and generating embeddings asynchronously.",
    ],
  },
  {
    index: "02",
    title: "Steamify",
    category: "WebRTC Communication",
    description:
      "Real-time video calling and collaboration platform built with MERN and WebSockets for low-latency streaming.",
    tags: ["React", "Node.js", "WebRTC", "Socket.io", "MongoDB"],
    image:
      "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=1400&q=80",
    quoteLabel: "REAL-TIME PEER-TO-PEER VIDEO STREAMING INFRASTRUCTURE",
    bigText: "Steamify",
    githubUrl: "https://github.com/yourusername/Steamify",
    architectureDetails: [
      "Signaling Server: Custom Socket.io implementation handling ICE candidate swaps & SDP offer/answers.",
      "Media Pipeline: Native Browser WebRTC API for sub-100ms P2P audio/video streaming.",
      "Database: MongoDB storing room histories, user auth states, and call logs.",
    ],
  },
  {
    index: "03",
    title: "DineEase Web",
    category: "Food Delivery Platform",
    description:
      "Modern, high-performance web dashboard and ordering UI for seamless restaurant reservation and food delivery.",
    tags: ["React", "Tailwind CSS", "Redux Toolkit", "Node.js"],
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1400&q=80",
    quoteLabel: "FRICTIONLESS DINING & ONLINE ORDERING EXPERIENCE",
    bigText: "DineEase UI",
    githubUrl: "https://github.com/yourusername/dineease-web",
    architectureDetails: [
      "State Management: Redux Toolkit for complex cart mutations and live order status synchronization.",
      "REST API: Express backend with JWT auth, payment gateway mock, and order queue system.",
      "Design System: Tailored Tailwind UI components with accessible dark theme patterns.",
    ],
  },
{
  index: "04",
  title: "QRDine",
  category: "Contactless QR Ordering & KDS Platform",
  description:
    "Instant table-side dining platform allowing customers to scan QR codes, customize menu items, and place orders directly to the Kitchen Display System (KDS) with real-time socket updates.",
  tags: ["Next.js", "Node.js", "Socket.io", "MongoDB", "Tailwind CSS"],
  image:
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1400&q=80",
  quoteLabel: "NO APP DOWNLOADS · TABLE-SCOPED REAL-TIME ORDERING",
  bigText: "QRDine System",
  githubUrl: "https://github.com/yourusername/qrdine-contactless-ordering",
  architectureDetails: [
    "Table Session Auth: Signed QR tokens for secure, location-validated table ordering without login.",
    "Real-time KDS: WebSocket connections via Socket.io for instant order dispatching to kitchen screens.",
    "Dynamic Menu Engine: Real-time inventory toggles to instantly update item availability across active customer devices.",
  ],
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

  const projectsTrackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [railVisible, setRailVisible] = useState(false);

  // Ref storing the GSAP timeline & scroll trigger references
  const mainTlRef = useRef<gsap.core.Timeline | null>(null);
  const horizontalTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const flood = floodRef.current;
      const portalWrap = portalWrapRef.current;
      const iris = irisRef.current;
      const track = projectsTrackRef.current;

      if (!flood || !portalWrap || !iris || !iris.ring || !iris.glow || !track)
        return;

      const isMobile = window.innerWidth < 768;

      gsap.set(charRefs.current, { yPercent: 120, opacity: 0 });
      gsap.set(flood, { clipPath: "circle(0% at 50% 50%)" });
      gsap.set(portalWrap, { opacity: 0, scale: 0.5 });
      gsap.set(iris.bladeInners, { y: 0, rotate: 0, opacity: 1 });
      gsap.set(iris.ring, { scale: 0.7, transformOrigin: "150px 150px" });
      gsap.set(track, { opacity: 0, x: "0px" });

      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.set(card, {
          opacity: 0,
          x: isMobile ? 180 : 350,
          y: isMobile ? 160 : 300,
          scale: 0.85,
          rotate: isMobile ? 4 : 8,
          transformOrigin: "bottom right",
        });
      });

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

      mainTlRef.current = tl;

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

      tl.to(track, { opacity: 1, duration: 0.4 });

      const firstCard = cardRefs.current[0];
      if (firstCard) {
        tl.to(
          firstCard,
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 1.4,
            ease: "power3.out",
          },
          "-=0.1"
        );
      }

      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const horizontalTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        duration: 3 * PROJECTS.length,
        onUpdate: () => {
          const progress = horizontalTween.progress();
          const totalProjects = PROJECTS.length;
          const curr = Math.min(
            totalProjects - 1,
            Math.floor(progress * totalProjects * 1.1)
          );
          setActiveIndex(curr);
        },
      });

      horizontalTweenRef.current = horizontalTween;
      tl.add(horizontalTween);

      cardRefs.current.forEach((card, i) => {
        if (!card || i === 0) return;
        gsap.to(card, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontalTween,
            start: "left 100%",
            end: "left 50%",
            scrub: 1,
          },
        });
      });

      tl.to({}, { duration: 0.5 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handler to smoothly scroll to a target project index
  const scrollToProject = (targetIndex: number) => {
    if (!sectionRef.current || !mainTlRef.current) return;

    const st = mainTlRef.current.scrollTrigger;
    if (!st) return;

    const totalProjects = PROJECTS.length;
    const safeIndex = targetIndex % totalProjects;

    // Calculate progress ratio corresponding to card index within the timeline
    // Intro sequence occupies ~25% of total scroll duration
    const introProgressRatio = 0.25; 
    const step = (1 - introProgressRatio) / (totalProjects - 1 || 1);
    const targetProgress = introProgressRatio + safeIndex * step;

    const startY = st.start;
    const endY = st.end;
    const targetY = startY + (endY - startY) * Math.min(targetProgress, 1);

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      style={{ height: `${220 + PROJECTS.length * 120}vh` }}
      className={`relative ${fraunces.variable} ${mono.variable} ${inter.variable}`}
    >
      <div
        ref={pinRef}
        className="relative h-screen w-full overflow-hidden select-none bg-[#0b0b0c]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <div ref={skyRef} className="absolute inset-0 bg-[#0b0b0c]" />

        <div
          ref={floodRef}
          className="absolute inset-0 bg-[#0b0b0c]"
          style={{ clipPath: "circle(0% at 50% 50%)" }}
        />

        {/* INITIAL TITLE HEADING */}
        <div
          ref={headingWrapRef}
          className="absolute inset-0 z-30 flex items-center justify-center px-4"
        >
          <h1
            className="flex flex-wrap justify-center gap-x-3 sm:gap-x-5 text-center text-3xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {HEADING.split(" ").map((word, wIdx) => (
              <span key={wIdx} className="inline-block overflow-hidden py-1 sm:py-2">
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

        {/* IRIS PORTAL OVERLAY */}
        <div
          ref={portalWrapRef}
          className="absolute left-1/2 top-1/2 z-20 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 sm:h-[260px] sm:w-[260px] md:h-[300px] md:w-[300px]"
        >
          <IrisPortal ref={irisRef} />
        </div>

        {/* ACTIVE RAIL INDICATOR (Interactive Click to Navigate) */}
        <div
          className={`fixed right-4 sm:right-6 md:right-10 top-1/2 z-40 flex -translate-y-1/2 flex-col items-end gap-3 sm:gap-4 transition-opacity duration-500 ${
            railVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {PROJECTS.map((p, i) => (
            <button
              key={p.index}
              onClick={() => scrollToProject(i)}
              className="group flex items-center gap-2 sm:gap-3 cursor-pointer outline-none"
            >
              <span
                className="font-mono text-[10px] sm:text-xs tracking-widest transition-colors duration-300 group-hover:text-white"
                style={{
                  color: i === activeIndex ? "#ef4444" : "rgba(255,255,255,0.3)",
                }}
              >
                {p.index}
              </span>
              <span
                className="h-px transition-all duration-300 group-hover:bg-white"
                style={{
                  width: i === activeIndex ? "24px" : "10px",
                  backgroundColor:
                    i === activeIndex ? "#ef4444" : "rgba(255,255,255,0.2)",
                }}
              />
            </button>
          ))}
        </div>

        {/* HORIZONTAL SLIDING PROJECTS TRACK */}
        <div
          ref={projectsTrackRef}
          className="absolute inset-0 z-10 flex h-full w-max items-center bg-[#0b0b0c]"
        >
          {/* STATIC TITLE COLUMN */}
          <div className="flex h-full w-[85vw] sm:w-[60vw] md:w-[38vw] flex-shrink-0 flex-col justify-center px-6 sm:px-12 md:pl-20">
            <h2 className="text-3xl font-normal leading-[1.1] tracking-tight text-white sm:text-5xl md:text-7xl">
              Selected work <br /> &amp; explorations
            </h2>

            <div className="mt-8 sm:mt-12 flex items-center gap-3">
              <button
                onClick={() => scrollToProject(0)}
                className="border-b border-white/30 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/70 pb-1 hover:text-red-500 hover:border-red-500 transition-colors cursor-pointer text-left"
              >
                Visit All Projects <span>→</span>
              </button>
            </div>
          </div>

          {/* PROJECT CARDS HORIZONTAL LIST */}
          <div className="flex h-full items-center gap-8 sm:gap-16 md:gap-24 pr-12 sm:pr-24">
            {PROJECTS.map((project, i) => (
              <div
                key={project.index}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="flex-shrink-0 w-[88vw] sm:w-[70vw] md:w-[48vw]"
              >
                {/* IMAGE TILE */}
                <div className="relative h-[42vh] sm:h-[50vh] md:h-[56vh] w-full overflow-hidden rounded-sm bg-black">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />

                  <div className="pointer-events-none absolute inset-3 sm:inset-6 border border-white/25" />

                  {project.quoteLabel && (
                    <div className="absolute left-6 top-6 sm:left-10 sm:top-10 max-w-[70%] sm:max-w-[55%]">
                      <span className="mb-1 sm:mb-3 block font-serif text-2xl sm:text-3xl leading-none text-white/90">
                        &ldquo;
                      </span>
                      <p className="font-mono text-[9px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.15em] text-white/85 leading-relaxed line-clamp-2">
                        {project.quoteLabel}
                      </p>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8">
                    <h3
                      className="text-2xl font-light tracking-tight text-white sm:text-4xl md:text-6xl"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {project.bigText}
                    </h3>
                  </div>
                </div>

                {/* META ROW BELOW THE IMAGE */}
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6 border-t border-white/10 pt-4 sm:pt-5">
                  <div>
                    <h4 className="text-xl sm:text-2xl font-medium text-white">
                      {project.title}
                    </h4>
                    <p className="mt-1 max-w-md text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2 sm:line-clamp-none">
                      {project.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 sm:px-3 sm:py-1 font-mono text-[9px] sm:text-[10px] text-white/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* NEXT PROJECT BUTTON ACTION */}
                  <div className="flex items-center gap-4 flex-shrink-0 self-start sm:self-auto pt-1">
                    <button
                      onClick={() => scrollToProject(i + 1)}
                      className="flex items-center gap-2 border-b border-red-500 pb-0.5 font-mono text-[10px] sm:text-xs font-semibold tracking-wider text-red-500 hover:text-white transition-colors cursor-pointer group"
                    >
                      <span>
                        {i === PROJECTS.length - 1
                          ? "BACK TO FIRST"
                          : "NEXT PROJECT"}
                      </span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}