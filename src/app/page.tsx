"use client";

import { useState, useEffect } from "react";
  import ProjectDiveScroll from "../Components/Project/Projectdivescroll";
 import Loader from "../Helpers/Loader";
import LoadingScreen from "../Components/Hero/Loadingscreen";
import Navbar from "../Components/Hero/Navbar";
import Hero from "../Components/Hero/Hero";
import HeroStatement from "../Components/Hero/Herostatement";
import CombinedNavbar from "../Components/Navbar";
import ProjectShowcase from "../Components/ProjectShowcase";
import GridZoomHero from "../Components/GridZoomHero";
import QualificationsSection from "../Components/QualificationsSection";
import PerspectiveMarqueeHero from "../Components/PerspectiveMarqueeHero";
import ProfileHeroSection from "../Components/ProfileHeroSection";
import FooterSection from "../Components/FooterSection";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(true);

  useEffect(() => {
    document.body.style.overflow = ready ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [ready]);

  return (
    <main className="min-h-screen bg-black">
      <>
        {/* {loading && <LoadingScreen onDone={() => setLoading(false)} />} */}
        <CombinedNavbar />
        <Hero />
        <HeroStatement />
        <ProjectShowcase /> 
        <div id="projects">
          <ProjectDiveScroll />
        </div>
        {/* Step 1: Parallax Grid + Center Image Zoom to Black */}
      <GridZoomHero />

      {/* Step 2: Dark Theme Qualifications Dashboard with Loading Indicator */}
      <QualificationsSection />
      <PerspectiveMarqueeHero />
      <FooterSection />

      </>
    </main>
  );
}