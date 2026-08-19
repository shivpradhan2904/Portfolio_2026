"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = ["INITIALIZING", "AI", "DATA", "ENGINEERING"];

export default function LoadingScreen({
  onDone,
}: {
  onDone: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    // cycle through words, ~380ms each
    if (index < WORDS.length - 1) {
      const t = setTimeout(() => setIndex((i) => i + 1), 380);
      return () => clearTimeout(t);
    }
    // hold on the last word briefly, then trigger exit
    const t = setTimeout(() => setExit(true), 500);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!exit && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="relative flex items-center gap-3 font-display text-sm tracking-[0.3em] text-neutral-400">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-blue-500" />
            <AnimatePresence mode="wait">
              <motion.span
                key={WORDS[index]}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {WORDS[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}