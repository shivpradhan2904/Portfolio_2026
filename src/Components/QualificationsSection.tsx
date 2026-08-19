"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Briefcase, CheckCircle2, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Kept company names & positions untouched; updated descriptions, education & skills for 1.5 yrs exp & journey
const QUALIFICATIONS = {
  education: [
    { degree: "B.S. Science Zoology Hons", school: "Berhampur University", year: "2020 - 2023", gpa: "8.40" },
    { degree: "Masters In Computer Application", school: "IMIT Cuttack", year: "2024", gpa: "8.50" },
  ],
  experience: [
    {
      role: "Frontend Developer",
      company: "Gritty Tech",
      period: "2025 - PRESENT",
      desc: "Building reactive user interfaces, optimizing client-side performance, and integrating modern animation libraries across web products."
    },
    {
      role: "Junior IT Support",
      company: "Lavni Asirans",
      period: "2025",
      desc: "Maintained IT infrastructure, resolved hardware/software technical tickets, managed user accounts, and provided daily end-user desktop support."
    },
  ],
  skills: [
    { name: "NEXT.JS / REACT / TYPESCRIPT", level: 92 },
    { name: "NODE.JS / EXPRESS / APIS", level: 88 },
    { name: "GSAP / TAILWIND CSS", level: 95 },
    { name: "MONGODB / MYSQL", level: 85 },
  ],
};

export default function QualificationsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content Fade In & Slide Up
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Skill Bars Progress Animation
      gsap.utils.toArray<HTMLElement>(".skill-bar").forEach((bar) => {
        const targetWidth = bar.getAttribute("data-level") + "%";
        gsap.to(bar, {
          width: targetWidth,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 85%",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#0b0b0c] text-white px-4 sm:px-6 py-12 sm:py-16 md:py-24 selection:bg-red-500 selection:text-white overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">

        {/* MAIN CONTENT */}
        <div ref={contentRef} className="opacity-0 translate-y-8 space-y-10 sm:space-y-12 md:space-y-16">

          {/* HEADER */}
          <div className="flex flex-col gap-2 border-b border-white/10 pb-4 sm:pb-6">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-ping flex-shrink-0" />
              <span className="font-mono text-[10px] sm:text-xs text-red-500 uppercase tracking-wider sm:tracking-widest">
                1.5 YEARS / CAREER LOGS
              </span>
            </div>
            <h2 className="font-mono text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">
              JOURNEY <span className="text-red-500">&</span> EXPERIENCES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">

            {/* CAREER EXPERIENCE */}
            <div className="space-y-5 sm:space-y-6">
              <div className="flex items-center gap-3 font-mono text-base sm:text-lg font-bold text-red-500 border-b border-red-500/20 pb-2">
                <Briefcase size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                <h3>CAREER_EXPERIENCE</h3>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {QUALIFICATIONS.experience.map((exp, i) => (
                  <div key={i} className="relative border-l-2 border-red-500/40 pl-5 sm:pl-6 py-0.5 space-y-1">
                    <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-red-500 bg-[#0b0b0c]" />
                    <span className="font-mono text-[10px] text-red-400 tracking-widest block">
                      {exp.period}
                    </span>
                    <h4 className="font-mono text-base sm:text-lg font-bold text-white leading-snug">
                      {exp.role}
                    </h4>
                    <p className="font-mono text-xs text-zinc-400">{exp.company}</p>
                    <p className="font-sans text-xs text-zinc-500 leading-relaxed pt-1">
                      {exp.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* EDUCATION */}
            <div className="space-y-5 sm:space-y-6">
              <div className="flex items-center gap-3 font-mono text-base sm:text-lg font-bold text-red-500 border-b border-red-500/20 pb-2">
                <GraduationCap size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                <h3>ACADEMIC_FOUNDATION</h3>
              </div>

              <div className="space-y-4">
                {QUALIFICATIONS.education.map((edu, i) => (
                  <div key={i} className="border border-white/10 rounded-xl bg-[#121214] p-4 sm:p-5 space-y-2 hover:border-red-500/40 transition-all">
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <span className="font-mono text-[10px] text-zinc-500">{edu.year}</span>
                      <span className="font-mono text-[11px] text-red-500 bg-red-950/30 px-2 py-0.5 rounded border border-red-500/20">
                        SCORE: {edu.gpa}
                      </span>
                    </div>
                    <h4 className="font-mono text-sm sm:text-base font-bold text-white leading-snug">
                      {edu.degree}
                    </h4>
                    <p className="font-mono text-xs text-zinc-400">{edu.school}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* COMPETENCIES */}
          <div className="space-y-6 border-t border-white/10 pt-8 sm:pt-10">
            <div className="flex items-center gap-3 font-mono text-base sm:text-lg font-bold text-white">
              <Award size={18} className="text-red-500 sm:w-5 sm:h-5 flex-shrink-0" />
              <h3>TECH_STACK_MASTERY</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {QUALIFICATIONS.skills.map((skill, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center font-mono text-xs">
                    <span className="text-zinc-300 flex items-center gap-2 truncate pr-2">
                      <CheckCircle2 size={12} className="text-red-500 flex-shrink-0" />
                      <span className="truncate">{skill.name}</span>
                    </span>
                    <span className="text-red-500 font-bold flex-shrink-0">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-[#121214] rounded-full overflow-hidden border border-white/5">
                    <div
                      className="skill-bar h-full w-0 bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                      data-level={skill.level}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}