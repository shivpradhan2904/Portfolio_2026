"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

export type HexPortalHandle = {
  cells: SVGPathElement[];
  ring: SVGCircleElement | null;
  glow: SVGCircleElement | null;
};

const hexPoints = (cx: number, cy: number, r: number) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" L ");

export const HexPortal = forwardRef<HexPortalHandle>((_props, ref) => {
  const cellRefs = useRef<SVGPathElement[]>([]);
  const ringRef = useRef<SVGCircleElement | null>(null);
  const glowRef = useRef<SVGCircleElement | null>(null);

  useImperativeHandle(ref, () => ({
    cells: cellRefs.current,
    ring: ringRef.current,
    glow: glowRef.current,
  }));

  const r = 34;
  const centers = [
    [150, 150],
    ...Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 180) * (60 * i);
      return [150 + r * 1.75 * Math.cos(a), 150 + r * 1.75 * Math.sin(a)];
    }),
  ];

  return (
    <svg viewBox="0 0 300 300" className="h-full w-full overflow-visible">
      <defs>
        <radialGradient id="hexGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle ref={glowRef} cx="150" cy="150" r="95" fill="url(#hexGlow)" opacity="0" />
      <circle
        ref={ringRef}
        cx="150"
        cy="150"
        r="88"
        fill="none"
        stroke="#f4f1ea"
        strokeOpacity="0.3"
        strokeWidth="1"
      />
      {centers.map(([cx, cy], i) => (
        <path
          key={i}
          ref={(el) => {
            if (el) cellRefs.current[i] = el;
          }}
          d={`M ${hexPoints(cx, cy, r * 0.92)} Z`}
          fill="#101218"
          stroke="#3a3d47"
          strokeWidth="0.75"
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
    </svg>
  );
});
HexPortal.displayName = "HexPortal";

/* ============================================================
   2. PETAL BLOOM PORTAL
   8 rounded petals rotate outward and fade, like a flower
   opening in reverse to expose the center.
============================================================ */

export type PetalBloomHandle = {
  petals: SVGGElement[];
  ring: SVGCircleElement | null;
  glow: SVGCircleElement | null;
};

const PETAL_COUNT = 8;

export const PetalBloomPortal = forwardRef<PetalBloomHandle>((_props, ref) => {
  const petalRefs = useRef<SVGGElement[]>([]);
  const ringRef = useRef<SVGCircleElement | null>(null);
  const glowRef = useRef<SVGCircleElement | null>(null);

  useImperativeHandle(ref, () => ({
    petals: petalRefs.current,
    ring: ringRef.current,
    glow: glowRef.current,
  }));

  const petals = Array.from({ length: PETAL_COUNT }, (_, i) => {
    const angle = (360 / PETAL_COUNT) * i;
    return (
      <g key={i} transform={`rotate(${angle} 150 150)`}>
        <g
          ref={(el) => {
            if (el) petalRefs.current[i] = el;
          }}
          style={{ transformOrigin: "150px 150px" }}
        >
          <path
            d="M150,150 C130,130 122,100 150,58 C178,100 170,130 150,150 Z"
            fill="#101218"
            stroke="#3a3d47"
            strokeWidth="0.75"
          />
        </g>
      </g>
    );
  });

  return (
    <svg viewBox="0 0 300 300" className="h-full w-full overflow-visible">
      <defs>
        <radialGradient id="petalGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fca5a5" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle ref={glowRef} cx="150" cy="150" r="95" fill="url(#petalGlow)" opacity="0" />
      <circle
        ref={ringRef}
        cx="150"
        cy="150"
        r="88"
        fill="none"
        stroke="#f4f1ea"
        strokeOpacity="0.3"
        strokeWidth="1"
      />
      {petals}
    </svg>
  );
});
PetalBloomPortal.displayName = "PetalBloomPortal";

/* ============================================================
   3. SPIRAL VORTEX PORTAL
   12 curved arm slivers, each rotated and skewed into a
   pinwheel; GSAP can rotate + fade them to spin open.
============================================================ */

export type SpiralVortexHandle = {
  arms: SVGPathElement[];
  ring: SVGCircleElement | null;
  glow: SVGCircleElement | null;
};

const ARM_COUNT = 12;

export const SpiralVortexPortal = forwardRef<SpiralVortexHandle>((_props, ref) => {
  const armRefs = useRef<SVGPathElement[]>([]);
  const ringRef = useRef<SVGCircleElement | null>(null);
  const glowRef = useRef<SVGCircleElement | null>(null);

  useImperativeHandle(ref, () => ({
    arms: armRefs.current,
    ring: ringRef.current,
    glow: glowRef.current,
  }));

  const arms = Array.from({ length: ARM_COUNT }, (_, i) => {
    const angle = (360 / ARM_COUNT) * i;
    return (
      <path
        key={i}
        ref={(el) => {
          if (el) armRefs.current[i] = el;
        }}
        d="M150,150 Q170,120 150,60 Q140,110 150,150 Z"
        fill="#101218"
        stroke="#3a3d47"
        strokeWidth="0.75"
        transform={`rotate(${angle} 150 150)`}
        style={{ transformOrigin: "150px 150px" }}
      />
    );
  });

  return (
    <svg viewBox="0 0 300 300" className="h-full w-full overflow-visible">
      <defs>
        <radialGradient id="spiralGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle ref={glowRef} cx="150" cy="150" r="95" fill="url(#spiralGlow)" opacity="0" />
      <circle
        ref={ringRef}
        cx="150"
        cy="150"
        r="88"
        fill="none"
        stroke="#f4f1ea"
        strokeOpacity="0.3"
        strokeWidth="1"
      />
      {arms}
    </svg>
  );
});
SpiralVortexPortal.displayName = "SpiralVortexPortal";

/* ============================================================
   4. SHARD BURST PORTAL
   16 triangular shards packed edge-to-edge in a disc;
   GSAP translates each outward along its own angle + fades.
============================================================ */

export type ShardBurstHandle = {
  shards: SVGPathElement[];
  ring: SVGCircleElement | null;
  glow: SVGCircleElement | null;
};

const SHARD_COUNT = 16;

export const ShardBurstPortal = forwardRef<ShardBurstHandle>((_props, ref) => {
  const shardRefs = useRef<SVGPathElement[]>([]);
  const ringRef = useRef<SVGCircleElement | null>(null);
  const glowRef = useRef<SVGCircleElement | null>(null);

  useImperativeHandle(ref, () => ({
    shards: shardRefs.current,
    ring: ringRef.current,
    glow: glowRef.current,
  }));

  const shards = Array.from({ length: SHARD_COUNT }, (_, i) => {
    const step = 360 / SHARD_COUNT;
    const a1 = (Math.PI / 180) * (step * i - 90);
    const a2 = (Math.PI / 180) * (step * (i + 1) - 90);
    const r = 88;
    const x1 = 150 + r * Math.cos(a1);
    const y1 = 150 + r * Math.sin(a1);
    const x2 = 150 + r * Math.cos(a2);
    const y2 = 150 + r * Math.sin(a2);
    const angle = step * i + step / 2;
    return (
      <path
        key={i}
        ref={(el) => {
          if (el) shardRefs.current[i] = el;
        }}
        d={`M150,150 L${x1.toFixed(2)},${y1.toFixed(2)} L${x2.toFixed(2)},${y2.toFixed(2)} Z`}
        fill={i % 2 === 0 ? "#101218" : "#181b22"}
        stroke="#3a3d47"
        strokeWidth="0.5"
        data-angle={angle}
        style={{ transformOrigin: "150px 150px" }}
      />
    );
  });

  return (
    <svg viewBox="0 0 300 300" className="h-full w-full overflow-visible">
      <defs>
        <radialGradient id="shardGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle ref={glowRef} cx="150" cy="150" r="95" fill="url(#shardGlow)" opacity="0" />
      <circle
        ref={ringRef}
        cx="150"
        cy="150"
        r="88"
        fill="none"
        stroke="#f4f1ea"
        strokeOpacity="0.3"
        strokeWidth="1"
      />
      {shards}
    </svg>
  );
});
ShardBurstPortal.displayName = "ShardBurstPortal";
// Note: each shard carries a data-angle attribute so your GSAP setup can do
// gsap.to(shard, { x: Math.cos(rad)*40, y: Math.sin(rad)*40, opacity: 0 })
// per-shard without recomputing trig in the animation code.

/* ============================================================
   5. ORBIT RING PORTAL
   3 concentric rings, each carrying a small dot; rings scale
   outward and dots orbit before the whole thing fades.
============================================================ */

export type OrbitRingHandle = {
  rings: SVGCircleElement[];
  dots: SVGCircleElement[];
  glow: SVGCircleElement | null;
};

const ORBIT_RADII = [50, 70, 88];

export const OrbitRingPortal = forwardRef<OrbitRingHandle>((_props, ref) => {
  const ringRefs = useRef<SVGCircleElement[]>([]);
  const dotRefs = useRef<SVGCircleElement[]>([]);
  const glowRef = useRef<SVGCircleElement | null>(null);

  useImperativeHandle(ref, () => ({
    rings: ringRefs.current,
    dots: dotRefs.current,
    glow: glowRef.current,
  }));

  return (
    <svg viewBox="0 0 300 300" className="h-full w-full overflow-visible">
      <defs>
        <radialGradient id="orbitGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle ref={glowRef} cx="150" cy="150" r="95" fill="url(#orbitGlow)" opacity="0" />
      {ORBIT_RADII.map((r, i) => (
        <g key={i} style={{ transformOrigin: "150px 150px" }}>
          <circle
            ref={(el) => {
              if (el) ringRefs.current[i] = el;
            }}
            cx="150"
            cy="150"
            r={r}
            fill="none"
            stroke="#f4f1ea"
            strokeOpacity={0.35 - i * 0.08}
            strokeWidth="1"
          />
          <circle
            ref={(el) => {
              if (el) dotRefs.current[i] = el;
            }}
            cx={150 + r}
            cy="150"
            r="3.5"
            fill="#67e8f9"
            style={{ transformOrigin: "150px 150px" }}
          />
        </g>
      ))}
    </svg>
  );
});
OrbitRingPortal.displayName = "OrbitRingPortal";

/* ============================================================
   6. GRID DISSOLVE PORTAL
   A 6x6 grid of small squares over the disc area; GSAP
   staggers their fade/scale for a pixel-dissolve reveal.
============================================================ */

export type GridDissolveHandle = {
  cells: SVGRectElement[];
  ring: SVGCircleElement | null;
  glow: SVGCircleElement | null;
};

const GRID_SIZE = 6;

export const GridDissolvePortal = forwardRef<GridDissolveHandle>((_props, ref) => {
  const cellRefs = useRef<SVGRectElement[]>([]);
  const ringRef = useRef<SVGCircleElement | null>(null);
  const glowRef = useRef<SVGCircleElement | null>(null);

  useImperativeHandle(ref, () => ({
    cells: cellRefs.current,
    ring: ringRef.current,
    glow: glowRef.current,
  }));

  const cellSize = 176 / GRID_SIZE;
  const origin = 150 - 88;

  const cells = [];
  let idx = 0;
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const cx = origin + col * cellSize + cellSize / 2;
      const cy = origin + row * cellSize + cellSize / 2;
      const dist = Math.hypot(cx - 150, cy - 150);
      if (dist > 92) continue; // keep it circular, skip corner cells
      cells.push(
        <rect
          key={idx}
          ref={(el) => {
            if (el) cellRefs.current[idx] = el;
          }}
          x={origin + col * cellSize}
          y={origin + row * cellSize}
          width={cellSize - 2}
          height={cellSize - 2}
          fill="#101218"
          stroke="#3a3d47"
          strokeWidth="0.5"
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      );
      idx++;
    }
  }

  return (
    <svg viewBox="0 0 300 300" className="h-full w-full overflow-visible">
      <defs>
        <radialGradient id="gridGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a3e635" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle ref={glowRef} cx="150" cy="150" r="95" fill="url(#gridGlow)" opacity="0" />
      <circle
        ref={ringRef}
        cx="150"
        cy="150"
        r="88"
        fill="none"
        stroke="#f4f1ea"
        strokeOpacity="0.3"
        strokeWidth="1"
      />
      {cells}
    </svg>
  );
});
GridDissolvePortal.displayName = "GridDissolvePortal";

/* ============================================================
   7. WAVE RIPPLE PORTAL
   4 concentric rings that GSAP can stagger-scale outward
   with fading opacity, like a ripple radiating from center.
============================================================ */

export type WaveRippleHandle = {
  waves: SVGCircleElement[];
  core: SVGCircleElement | null;
  glow: SVGCircleElement | null;
};

const WAVE_COUNT = 4;

export const WaveRipplePortal = forwardRef<WaveRippleHandle>((_props, ref) => {
  const waveRefs = useRef<SVGCircleElement[]>([]);
  const coreRef = useRef<SVGCircleElement | null>(null);
  const glowRef = useRef<SVGCircleElement | null>(null);

  useImperativeHandle(ref, () => ({
    waves: waveRefs.current,
    core: coreRef.current,
    glow: glowRef.current,
  }));

  return (
    <svg viewBox="0 0 300 300" className="h-full w-full overflow-visible">
      <defs>
        <radialGradient id="waveGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5eead4" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#5eead4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle ref={glowRef} cx="150" cy="150" r="95" fill="url(#waveGlow)" opacity="0" />
      {Array.from({ length: WAVE_COUNT }, (_, i) => (
        <circle
          key={i}
          ref={(el) => {
            if (el) waveRefs.current[i] = el;
          }}
          cx="150"
          cy="150"
          r={30 + i * 16}
          fill="none"
          stroke="#f4f1ea"
          strokeOpacity="0.28"
          strokeWidth="1"
          style={{ transformOrigin: "150px 150px" }}
        />
      ))}
      <circle ref={coreRef} cx="150" cy="150" r="18" fill="#101218" stroke="#3a3d47" strokeWidth="0.75" />
    </svg>
  );
});
WaveRipplePortal.displayName = "WaveRipplePortal";

/* ============================================================
   8. APERTURE SLIDE PORTAL
   8 flat rectangular blades that slide radially outward
   (translate, not curve) — a simpler, more mechanical shutter
   than IrisPortal's curved petals.
============================================================ */

export type ApertureSlideHandle = {
  blades: SVGRectElement[];
  ring: SVGCircleElement | null;
  glow: SVGCircleElement | null;
};

const SLIDE_BLADE_COUNT = 8;

export const ApertureSlidePortal = forwardRef<ApertureSlideHandle>((_props, ref) => {
  const bladeRefs = useRef<SVGRectElement[]>([]);
  const ringRef = useRef<SVGCircleElement | null>(null);
  const glowRef = useRef<SVGCircleElement | null>(null);

  useImperativeHandle(ref, () => ({
    blades: bladeRefs.current,
    ring: ringRef.current,
    glow: glowRef.current,
  }));

  const blades = Array.from({ length: SLIDE_BLADE_COUNT }, (_, i) => {
    const angle = (360 / SLIDE_BLADE_COUNT) * i;
    return (
      <g key={i} transform={`rotate(${angle} 150 150)`}>
        <rect
          ref={(el) => {
            if (el) bladeRefs.current[i] = el;
          }}
          x="142"
          y="60"
          width="16"
          height="88"
          rx="2"
          fill="#101218"
          stroke="#3a3d47"
          strokeWidth="0.75"
          style={{ transformOrigin: "150px 150px" }}
        />
      </g>
    );
  });

  return (
    <svg viewBox="0 0 300 300" className="h-full w-full overflow-visible">
      <defs>
        <radialGradient id="apertureGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f9a8d4" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f9a8d4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle ref={glowRef} cx="150" cy="150" r="95" fill="url(#apertureGlow)" opacity="0" />
      <circle
        ref={ringRef}
        cx="150"
        cy="150"
        r="88"
        fill="none"
        stroke="#f4f1ea"
        strokeOpacity="0.3"
        strokeWidth="1"
      />
      {blades}
    </svg>
  );
});
ApertureSlidePortal.displayName = "ApertureSlidePortal";