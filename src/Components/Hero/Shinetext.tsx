"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ShineTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  speed?: "slow" | "fast";
}

/**
 * Wraps text in a chrome/metallic gradient that continuously sweeps,
 * plus a one-time reveal (clip + rise) when it first mounts.
 */
export default function ShineText({
  children,
  className = "",
  delay = 0,
  speed = "slow",
}: ShineTextProps) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        className={`shine-text inline-block ${
          speed === "fast" ? "animate-shine-fast" : "animate-shine"
        } ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );
}