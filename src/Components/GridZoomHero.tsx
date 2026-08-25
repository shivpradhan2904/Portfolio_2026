"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GRID_ITEMS = [
  {
    id: 1,
    title: "NIGHTSCAPE",
    img: "/img/i6.png",
    style: "left-[2vw] md:left-[3vw] bottom-[6vh] md:bottom-[8vh] w-[42vw] md:w-[18vw] h-[28vh] md:h-[40vh]",
    flyTo: { x: "-100vw", y: "0vh" },
  },
  {
    id: 2,
    title: "LABORATORY",
    img: "/f1.jpg",
    style: "left-[48vw] md:left-[36vw] top-[6vh] w-[48vw] md:w-[32vw] h-[22vh] md:h-[28vh]",
    flyTo: { x: "0vw", y: "-100vh" },
  },
  {
    id: 3,
    title: "COMMUNITY",
    img: "/img/temp-image.jpg",
    style: "right-[2vw] md:right-[3vw] top-[28vh] md:top-[34vh] w-[42vw] md:w-[24vw] h-[25vh] md:h-[30vh]",
    flyTo: { x: "100vw", y: "0vh" },
  },
  {
    id: 4,
    title: "EVENT HALL",
    img: "/img/i4.jpg",
    style: "left-[48vw] md:left-[24vw] bottom-[6vh] md:bottom-[6vh] w-[44vw] md:w-[28vw] h-[20vh] md:h-[22vh]",
    flyTo: { x: "0vw", y: "100vh" },
  },
  {
    id: 5,
    title: "TEAM MEET",
    img: "/img/i9.jpeg",
    style: "right-[2vw] md:right-[3vw] bottom-[6vh] md:bottom-[6vh] w-[48vw] md:w-[20vw] h-[20vh] md:h-[22vh]",
    flyTo: { x: "100vw", y: "100vh" },
  },
  {
    id: 6,
    title: "TELEMETRY",
    img: "/img/i.jpeg",
    style: "hidden md:block right-[3vw] top-[8vh] w-[15vw] h-[20vh]",
    flyTo: { x: "100vw", y: "-100vh" },
  },
];

const CENTER_FEATURED = {
  title: "CHAPTERS & CITIES",
  video: "/f3.MOV",
};

export default function GridZoomHero() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const centerCardRef = useRef<HTMLDivElement | null>(null);
  const sideCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const portalExpandRef = useRef<HTMLDivElement | null>(null);
  const portalTextRef = useRef<HTMLDivElement | null>(null);
  const textContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop & Tablet Animations
      mm.add("(min-width: 768px)", () => {
        gsap.set(portalExpandRef.current, { clipPath: "circle(0% at 50% 50%)" });
        gsap.set(portalTextRef.current, { opacity: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=300%",
            scrub: 1.2,
            pin: pinRef.current,
            pinSpacing: true,
          },
        });

        // 1. Fade & Slide Headline to Left
        tl.to(
          textContentRef.current,
          { opacity: 0, x: -80, duration: 0.6, ease: "power2.in" },
          0
        );

        // 2. Disperse surrounding cards outwards
        GRID_ITEMS.forEach((item, index) => {
          const card = sideCardsRef.current[index];
          if (card) {
            tl.to(
              card,
              {
                x: item.flyTo.x,
                y: item.flyTo.y,
                opacity: 0,
                scale: 0.6,
                duration: 1.2,
                ease: "power2.inOut",
              },
              0
            );
          }
        });

        // 3. Zoom Center Video Card to full screen viewport
        tl.to(
          centerCardRef.current,
          {
            width: "100vw",
            height: "100vh",
            left: "0vw",
            top: "0vh",
            borderRadius: "0px",
            boxShadow: "0 0 0px rgba(0,0,0,0)",
            duration: 1.5,
            ease: "power3.inOut",
          },
          0
        );

        tl.to(".center-overlay-content", { opacity: 0, duration: 0.4 }, 0);

        // 4. Expand Portal Overlay
        tl.to(
          portalExpandRef.current,
          {
            clipPath: "circle(150% at 50% 50%)",
            duration: 1.2,
            ease: "power2.inOut",
          },
          "-=0.6"
        );

        // 5. Fade out Portal Text
        tl.to(
          portalTextRef.current,
          {
            opacity: 0,
            duration: 0.6,
            ease: "power1.out",
          },
          "+=0.2"
        );
      });

      // Mobile Animation Fallback
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=200%",
            scrub: 1,
            pin: pinRef.current,
            pinSpacing: true,
          },
        });

        tl.to(textContentRef.current, { opacity: 0, y: -20, duration: 0.5 }, 0);

        tl.to(
          sideCardsRef.current,
          {
            opacity: 0,
            scale: 0.5,
            duration: 1,
          },
          0
        );

        tl.to(
          centerCardRef.current,
          {
            width: "100vw",
            height: "100vh",
            left: "0",
            top: "0",
            borderRadius: "0px",
            duration: 1.2,
          },
          0
        );

        tl.to(portalTextRef.current, { opacity: 0, duration: 0.5 });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hidden md:block relative z-0 h-[350vh] bg-[#0b0b0c] text-zinc-100">
      <div
        ref={pinRef}
        className="relative z-10 flex h-screen w-full items-center justify-center overflow-hidden bg-[#0b0b0c]"
      >
        {/* LEFT-ALIGNED HEADLINE OVERLAY */}
        <div
          ref={textContentRef}
          className="pointer-events-none absolute z-30 top-[8vh] md:top-[12vh] left-[4vw] md:left-[5vw] max-w-xl flex flex-col items-start text-left pr-4"
        >
          {/* Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
            <span className="font-mono text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-red-500">
              DEVELOPER LOG / CITIES & CODE
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="relative font-sans text-3xl sm:text-4xl md:text-6xl font-black tracking-tight uppercase leading-[0.95] text-zinc-100 mb-4 pl-4 border-l-4 border-red-600">
            CODE, CITIES & <br />
            <span className="bg-gradient-to-r from-red-500 via-zinc-200 to-white bg-clip-text text-transparent">
              JOURNEYS
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs md:text-sm text-zinc-400 max-w-md font-mono leading-relaxed pl-4">
            1.5 years of engineering high-scale applications across diverse cities, tech hubs, and remote work environments.
          </p>
        </div>

        {/* SURROUNDING COLLAGE CARDS */}
        {GRID_ITEMS.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              if (el) sideCardsRef.current[index] = el;
            }}
            className={`absolute z-10 overflow-hidden rounded-[16px] md:rounded-[20px] border border-white/10 bg-zinc-900 shadow-2xl ${item.style}`}
          >
            <img
              src={item.img}
              alt={item.title}
              className="h-full w-full object-cover opacity-75 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        ))}

        {/* CENTER FEATURED VIDEO CARD */}
        <div
          ref={centerCardRef}
          className="absolute z-20 left-[28vw] md:left-[38vw] top-[40vh] md:top-[38vh] w-[44vw] md:w-[24vw] h-[24vh] md:h-[30vh] overflow-hidden rounded-[20px] md:rounded-[24px] bg-zinc-900 shadow-[0_0_30px_rgba(220,38,38,0.2)] flex items-center justify-center cursor-pointer group"
        >
          {/* Autoplay & Loop Video Element */}
          <video
            src={CENTER_FEATURED.video}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover object-[70%_60%] transition-transform duration-500 group-hover:scale-105"
          />

          <div className="center-overlay-content absolute inset-0 bg-zinc-950/60 backdrop-blur-[2px] flex flex-col items-center justify-between p-4 md:p-6 transition-opacity">
            {/* Tagline / Title at the top */}
            <span className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-red-400 uppercase font-semibold text-center drop-shadow">
              {CENTER_FEATURED.title}
            </span>

            {/* Scroll Indicator Button */}
            <div className="flex items-center gap-2 rounded-full px-4 md:px-5 py-2 text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:bg-red-500">
              <span className="flex gap-2">SCROLL <span className="hidden lg:block">TO EXPLORE </span></span>
              <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↓
              </span>
            </div>
          </div>
        </div>

        {/* TRANSITION PORTAL OVERLAY */}
        <div
          ref={portalExpandRef}
          className="absolute inset-0 z-30 flex h-full w-full flex-col items-center justify-center bg-[#0b0b0c] border border-white/20 pointer-events-none px-6 text-center"
        >
          {/* INNER TEXT CONTAINER FOR GSAP OPACITY FADE */}
          <div ref={portalTextRef} className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
              <p className="font-mono text-xs text-red-500 tracking-widest uppercase">
                JOURNEY ARCHIVE
              </p>
            </div>
            <h2 className="text-2xl md:text-5xl font-extrabold tracking-tight text-zinc-100 max-w-2xl uppercase">
              EXPERIENCE & JOURNEY <span className="text-red-600">EXPLORATION</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}