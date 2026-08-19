"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

export type IrisPortalHandle = {
  bladeInners: SVGGElement[];
  ring: SVGCircleElement | null;
  glow: SVGCircleElement | null;
};

const BLADE_COUNT = 10;

/**
 * Camera-iris aperture in Charcoal, Red, and White:
 * Uses deep charcoal blade fills (#121214), sharp white/gray outer ring,
 * and a red radial glow gradient (#ef4444) matching the rest of the site.
 */
const IrisPortal = forwardRef<IrisPortalHandle>((_props, ref) => {
  const bladeInnerRefs = useRef<SVGGElement[]>([]);
  const ringRef = useRef<SVGCircleElement | null>(null);
  const glowRef = useRef<SVGCircleElement | null>(null);

  useImperativeHandle(ref, () => ({
    bladeInners: bladeInnerRefs.current,
    ring: ringRef.current,
    glow: glowRef.current,
  }));

  const blades = Array.from({ length: BLADE_COUNT }, (_, i) => {
    const angle = (360 / BLADE_COUNT) * i;
    return (
      <g key={i} transform={`rotate(${angle} 150 150)`}>
        <g
          ref={(el) => {
            if (el) bladeInnerRefs.current[i] = el;
          }}
        >
          <path
            d="M150,150 C139,121 137,92 150,62 C163,92 161,121 150,150 Z"
            fill="#121214"
            stroke="#ef4444"
            strokeOpacity="0.4"
            strokeWidth="0.75"
          />
        </g>
      </g>
    );
  });

  return (
    <svg viewBox="0 0 300 300" className="h-full w-full overflow-visible">
      <defs>
        {/* Red Radial Ambient Glow */}
        <radialGradient id="irisGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Center Red Glow Background */}
      <circle ref={glowRef} cx="150" cy="150" r="95" fill="url(#irisGlow)" opacity="0" />
      
      {/* White Ring Border */}
      <circle
        ref={ringRef}
        cx="150"
        cy="150"
        r="88"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      
      {/* Aperture Blades */}
      {blades}
    </svg>
  );
});

IrisPortal.displayName = "IrisPortal";
export default IrisPortal;