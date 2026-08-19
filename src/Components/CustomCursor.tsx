import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <>
      {/* Hide the default system cursor globally */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Smooth trailing white border circle */}
      <motion.div
        className="pointer-events-none hidden sm:block fixed top-0 left-0 z-[9999] rounded-full border-2 border-white"
        animate={{
          x: mousePosition.x - 20, // Center offset (half of width)
          y: mousePosition.y - 20, // Center offset (half of height)
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 250,
          mass: 0.5,
        }}
        style={{
          width: 40,
          height: 40,
        }}
      />
    </>
  );
};