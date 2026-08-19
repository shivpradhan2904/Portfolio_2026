"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-space-grotesk",
});

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 1200;
    let raf: number;

    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setVisible(false), 200);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="loader"
          className={`${spaceGrotesk.variable} fixed inset-0 z-50 flex flex-col items-center justify-center bg-black`}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: "blur(20px)",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          <div className="relative flex items-center justify-center mb-8">
            <motion.div
              className="h-24 w-24 rounded-full border border-purple-500/20 border-t-purple-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute h-16 w-16 rounded-full border border-fuchsia-500/20 border-b-fuchsia-400"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <span className="absolute text-xs font-mono font-black text-purple-400">
              {progress}%
            </span>
          </div>

          <div className={`${spaceGrotesk.className} mb-3 text-xs font-bold tracking-[0.5em] text-zinc-400 uppercase`}>
            System Initialization
          </div>

          <div className="h-[2px] w-52 overflow-hidden rounded-full bg-zinc-800">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-400"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}