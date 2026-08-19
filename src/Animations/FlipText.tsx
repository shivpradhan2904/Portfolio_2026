"use client";

import React, { useMemo } from "react";
import { motion, Variants } from "framer-motion";
 
interface DiceFlipTextProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  stagger?: number;
}

export function DiceFlipText({
  children,
  className,
  duration = 0.8,
  delay = 0,
  stagger = 0.03,
}: DiceFlipTextProps) {
  const words = useMemo(() => children.split(" "), [children]);

  // Framer Motion variants mimicking a 3D Dice roll/tumble
  const charVariants: Variants = {
    hidden: {
      opacity: 0,
      rotateX: -180, // Rotates on X-axis like a rolling dice
      rotateY: -90,  // Rotates on Y-axis for multi-dimensional roll
      z: -50,        // Pushes character back in 3D space
      scale: 0.5,
    },
    visible: (i: number) => ({
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      z: 0,
      scale: 1,
      transition: {
        duration: duration,
        delay: delay + i * stagger,
        // High-friction spring ease for realistic dice bounce/land feel
        ease: [0.34, 1.56, 0.64, 1], 
      },
    }),
  };

  let charIndexCounter = 0;

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn("dice-container inline-flex flex-wrap leading-snug", className)}
    >
      {words.map((word, wordIdx) => {
        const chars = word.split("");

        return (
          <span key={wordIdx} className="inline-flex whitespace-nowrap">
            {chars.map((char, charIdx) => {
              const currentIdx = charIndexCounter++;

              return (
                <motion.span
                  key={charIdx}
                  custom={currentIdx}
                  variants={charVariants}
                  className="dice-char inline-block relative origin-center"
                >
                  {char}
                </motion.span>
              );
            })}
            {wordIdx < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        );
      })}
    </motion.span>
  );
}

export default DiceFlipText;
 
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}