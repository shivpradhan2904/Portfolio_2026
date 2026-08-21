"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ProjectDiveScroll from "../Components/Project/Projectdivescroll";
import LoadingScreen from "../Components/Hero/Loadingscreen";
import Hero from "../Components/Hero/Hero";
import HeroStatement from "../Components/Hero/Herostatement";
import CombinedNavbar from "../Components/Navbar";
import ProjectShowcase from "../Components/ProjectShowcase";
import GridZoomHero from "../Components/GridZoomHero";
import QualificationsSection from "../Components/QualificationsSection";
import PerspectiveMarqueeHero from "../Components/PerspectiveMarqueeHero";
import FooterSection from "../Components/FooterSection";
import { CustomCursor } from "../Components/CustomCursor";

export default function Page() {
  const [loading, setLoading] = useState(true);

  // 1. Reset scroll position on initial load
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // 2. Lock screen completely during loading state
  useEffect(() => {
    if (loading) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = "0";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      document.body.style.touchAction = "";
    };
  }, [loading]);

  return (
    <main className="min-h-screen bg-black">
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Hide and disable background components during loading */}
      <div 
        aria-hidden={loading} 
        className={loading ? "pointer-events-none select-none invisible" : "visible"}
      >
        <CombinedNavbar />
        
        <div id="home">
          <Hero startAnimation={!loading} />
        </div>

        <HeroStatement />

        <div id="about">
          <ProjectShowcase />
        </div>

        <div id="projects">
          <ProjectDiveScroll />
        </div>

        <GridZoomHero />
        <QualificationsSection />
        <PerspectiveMarqueeHero />

        <div id="contact">
          <FooterSection />
        </div>
      </div>
    </main>
  );
}