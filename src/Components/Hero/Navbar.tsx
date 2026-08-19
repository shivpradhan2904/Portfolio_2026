"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, ChevronDown, Globe, Maximize2 } from "lucide-react";

function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour12: false,
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Navbar() {
  const time = useClock();

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-10"
    >
      {/* live clock, top left, monospace/digital style */}
      <span className="font-mono text-xs tracking-widest text-neutral-400">
        {time}
      </span>

      {/* centered pill nav */}
      <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md md:flex">
        <a
          href="#home"
          className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-white"
        >
          Home
        </a>
        <a
          href="#about"
          className="flex items-center gap-1 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-neutral-300 transition-colors hover:text-white"
        >
          About
          <ChevronDown size={12} />
        </a>
        <a
          href="#contact"
          className="rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-neutral-300 transition-colors hover:text-white"
        >
          Contact
        </a>
      </nav>

      {/* right icon cluster */}
      <div className="flex items-center gap-2">
        <button
          aria-label="Close"
          className="grid h-7 w-7 place-items-center rounded-full text-neutral-400 transition-colors hover:text-white"
        >
          <X size={14} />
        </button>
        <button
          aria-label="Language"
          className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-neutral-200 transition-colors hover:text-white"
        >
          <Globe size={13} />
        </button>
        <button
          aria-label="Expand"
          className="grid h-7 w-7 place-items-center rounded-full text-neutral-400 transition-colors hover:text-white"
        >
          <Maximize2 size={13} />
        </button>
      </div>
    </motion.header>
  );
}