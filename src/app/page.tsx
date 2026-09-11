"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ProjectDiveScroll from "../Components/Project/Projectdivescroll";
import Hero from "../Components/Hero/Hero";
import HeroStatement from "../Components/Hero/Herostatement";
import CombinedNavbar from "../Components/Navbar";
import ProjectShowcase from "../Components/ProjectShowcase";
import GridZoomHero from "../Components/GridZoomHero";
import QualificationsSection from "../Components/QualificationsSection";
import PerspectiveMarqueeHero from "../Components/PerspectiveMarqueeHero";
import FooterSection from "../Components/FooterSection";
import { CustomCursor } from "../Components/CustomCursor";
import SmoothScroll from "../Helpers/SmoothScroll";
import FullScreenStripFillInteractive from "../Components/PinnedSection";
import SiteIntroLoader from "../Components/Hero/SiteIntroLoader";

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-black">
      <SmoothScroll />
      <CustomCursor />

      <AnimatePresence mode="wait">
        {loading ? (
          <SiteIntroLoader key="loader" onDone={() => setLoading(false)} />
        ) : (
          <div key="page-content">
            <CombinedNavbar />

            <div id="home">
              <Hero startAnimation={true} />
            </div>

            <HeroStatement />

            <div id="about">
              <ProjectShowcase />
            </div>

            <FullScreenStripFillInteractive />

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
        )}
      </AnimatePresence>
    </main>
  );
}