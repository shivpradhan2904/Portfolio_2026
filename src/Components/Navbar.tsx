"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sacramento, Poppins } from "next/font/google";
import {
  HiOutlineBriefcase,
  HiOutlineUser,
  HiOutlineDocumentText,
  HiOutlineEnvelope,
  HiOutlineXMark,
  HiBars3,
  HiCheckBadge,
  HiArrowDownTray,
} from "react-icons/hi2";

const sacramento = Sacramento({ subsets: ["latin"], weight: "400" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const NAV_ITEMS = [
  {
    name: "Work",
    desc: "Explore past projects & case studies",
    category: "Portfolio",
    meta: "5+ Projects",
    href: "#projects",
    icon: HiOutlineBriefcase,
    isDownload: false,
  },
  {
    name: "About",
    desc: "Background, skills & philosophy",
    category: "Profile",
    meta: "1.5+ Yrs Exp",
    href: "#about",
    icon: HiOutlineUser,
    isDownload: false,
  },
  {
    name: "Resume",
    desc: "Qualifications & career history",
    category: "Document",
    meta: "PDF Document",
    href: "/resume.pdf",
    icon: HiOutlineDocumentText,
    isDownload: true,
  },
  {
    name: "Contact",
    desc: "Get in touch for collaborations",
    category: "Connect",
    meta: "Let's Talk",
    href: "#contact",
    icon: HiOutlineEnvelope,
    isDownload: false,
  },
];

const AVATAR_URL =
  "https://api.dicebear.com/7.x/lorelei/svg?seed=Mason&backgroundColor=171717";
const NAME = "Shiv";

const RADIUS = 110;
function arcPosition(index: number, total: number) {
  const startDeg = 160;
  const endDeg = 20;
  const t = total === 1 ? 0.5 : index / (total - 1);
  const deg = startDeg + (endDeg - startDeg) * t;
  const rad = (deg * Math.PI) / 180;
  return { x: Math.cos(rad) * RADIUS, y: -Math.sin(rad) * RADIUS };
}

export function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

export default function CombinedNavbar() {
  const scrolled = useScrolled(60);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [topHoveredItem, setTopHoveredItem] = useState<typeof NAV_ITEMS[0] | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [direction, setDirection] = useState(0);
  const lastIndexRef = useRef<number | null>(null);

  useEffect(() => {
    if (!scrolled) {
      setIsOpen(false);
      setHoveredItem(null);
      lastIndexRef.current = null;
    } else {
      setMobileMenuOpen(false);
    }
  }, [scrolled]);

  const closeAll = useCallback(() => {
    setIsOpen(false);
    setHoveredItem(null);
    setMobileMenuOpen(false);
    lastIndexRef.current = null;
  }, []);

  const handleIconEnter = (index: number, name: string) => {
    if (lastIndexRef.current !== null && index !== lastIndexRef.current) {
      setDirection(index > lastIndexRef.current ? 1 : -1);
    }
    lastIndexRef.current = index;
    setHoveredItem(name);
  };

const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof NAV_ITEMS[0]) => {
  if (item.isDownload) {
    closeAll();
    return;
  }

  if (item.href.startsWith("#")) {
    e.preventDefault();
    const targetElement = document.querySelector(item.href);
    
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.warn(`Target section ${item.href} not found in DOM.`);
    }
    
    // Close menu after triggering scroll event
    setTimeout(() => {
      closeAll();
    }, 100);
  }
};

  const hoveredData = NAV_ITEMS.find((i) => i.name === hoveredItem);

  return (
    <>
      {/* 1. TOP NAVBAR */}
      <AnimatePresence>
        {!scrolled && (
          <motion.nav
            initial={{ y: -90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -90, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-2 h-[48px] sm:h-[64px] px-2.5 sm:pl-3.5 sm:pr-6 rounded-full bg-neutral-900/95 border border-white/20 backdrop-blur-md max-w-4xl w-[90vw] md:w-full"
          >
            {/* Brand Logo */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              <div className="relative">
                <img
                  src={AVATAR_URL}
                  alt="Avatar"
                  className="w-6 h-6 sm:w-10 sm:h-10 rounded-full border border-white/80 object-cover bg-black"
                />
                <HiCheckBadge className="absolute -bottom-0.5 -right-0.5 text-white text-[9px] sm:text-xs bg-neutral-900 rounded-full" />
              </div>
              <span className={`${sacramento.className} text-base sm:text-3xl pt-0.5 sm:pt-1 font-bold text-white tracking-wide whitespace-nowrap`}>
                {NAME}
              </span>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-6 list-none relative">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.name}
                    className="relative py-2"
                    onMouseEnter={() => setTopHoveredItem(item)}
                    onMouseLeave={() => setTopHoveredItem(null)}
                  >
                    <a
                      href={item.href}
                      download={item.isDownload ? "Shiv_Resume.pdf" : undefined}
                      onClick={(e) => handleNavClick(e, item)}
                      className={`${poppins.className} flex items-center gap-1.5 text-sm font-semibold text-neutral-300 hover:text-white transition-colors duration-200 group`}
                    >
                      <Icon className="text-white group-hover:text-neutral-400 transition-colors" size={16} />
                      <span>{item.name}</span>
                    </a>

                    {/* Desktop Hover Card */}
                    <AnimatePresence>
                      {topHoveredItem?.name === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 pointer-events-auto min-w-[210px]"
                        >
                          <a
                            href={item.href}
                            download={item.isDownload ? "Shiv_Resume.pdf" : undefined}
                            onClick={(e) => handleNavClick(e, item)}
                            className="block relative rounded-xl border border-white/20 bg-neutral-900 p-3.5 text-left backdrop-blur-xl shadow-xl hover:border-white/40 transition-colors group/card"
                          >
                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-t border-l border-white/20 bg-neutral-900 group-hover/card:border-white/40 transition-colors" />

                            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                              <span className={`${poppins.className} text-[10px] font-bold text-neutral-300 uppercase tracking-wider`}>
                                {item.category}
                              </span>
                              <span className={`${poppins.className} text-[10px] font-medium text-neutral-300 bg-white/10 px-1.5 py-0.5 rounded border border-white/15 flex items-center gap-1`}>
                                {item.isDownload && <HiArrowDownTray size={10} />}
                                {item.meta}
                              </span>
                            </div>

                            <div className="flex items-start gap-2">
                              <Icon className="text-white mt-0.5 shrink-0 group-hover/card:scale-110 transition-transform" size={16} />
                              <div>
                                <p className={`${poppins.className} text-xs font-semibold text-white group-hover/card:text-neutral-200 transition-colors`}>
                                  {item.name}
                                </p>
                                <p className={`${poppins.className} text-[11px] text-neutral-400 mt-0.5 leading-snug`}>
                                  {item.desc}
                                </p>
                              </div>
                            </div>
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden text-neutral-300 hover:text-white p-1 rounded-full focus:outline-none transition-colors"
              aria-label="Toggle Mobile Navigation"
            >
              {mobileMenuOpen ? <HiOutlineXMark size={20} /> : <HiBars3 size={20} />}
            </button>

            {/* Rubber Opening Mobile Navigation Drawer */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scaleY: 0.2, scaleX: 0.8 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1, scaleX: 1 }}
                  exit={{ opacity: 0, y: -15, scaleY: 0.4, scaleX: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 18,
                    mass: 0.8,
                  }}
                  style={{ transformOrigin: "top center" }}
                  className="absolute top-[calc(100%+8px)] left-0 right-0 w-full bg-neutral-900/98 border border-white/20 rounded-2xl p-2.5 backdrop-blur-2xl shadow-2xl md:hidden overflow-hidden z-50"
                >
                  <div className="flex flex-col gap-1.5">
                    {NAV_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          download={item.isDownload ? "Shiv_Resume.pdf" : undefined}
                          onClick={(e) => handleNavClick(e, item)}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10 active:bg-white/10 transition-colors"
                        >
                          <Icon className="text-white mt-0.5 shrink-0" size={16} />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className={`${poppins.className} text-xs font-semibold text-white`}>
                                {item.name}
                              </span>
                              <span className={`${poppins.className} text-[8px] font-medium text-neutral-300 bg-white/10 px-1 py-0.5 rounded border border-white/15 flex items-center gap-1`}>
                                {item.isDownload && <HiArrowDownTray size={8} />}
                                {item.meta}
                              </span>
                            </div>
                            <p className={`${poppins.className} text-[10px] text-neutral-400 mt-0.5 leading-snug`}>
                              {item.desc}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* 2. BACKDROP */}
      <AnimatePresence>
        {scrolled && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md pointer-events-auto cursor-pointer"
            onClick={closeAll}
          />
        )}
      </AnimatePresence>

      {/* 3. BOTTOM DOCK */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 flex items-end justify-center w-[320px] h-[200px] select-none pointer-events-auto pb-6"
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            onMouseLeave={() => {
              setIsOpen(false);
              setHoveredItem(null);
              if (lastIndexRef.current) lastIndexRef.current = null;
            }}
          >
            {/* Tooltip */}
<AnimatePresence>
  {isOpen && hoveredItem && hoveredData && (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: arcPosition(NAV_ITEMS.indexOf(hoveredData), NAV_ITEMS.length).x,
        y: arcPosition(NAV_ITEMS.indexOf(hoveredData), NAV_ITEMS.length).y - 56,
      }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="absolute bottom-6 left-1/2 -ml-[52px] z-50 pointer-events-none" // ensure z-50 & pointer-events-none
    >
      {/* ... tooltip contents ... */}
    </motion.div>
  )}
</AnimatePresence>

            {/* Arc Navigation Icons */}
            <AnimatePresence>
              {isOpen && (
                <div className="absolute bottom-6 flex items-center justify-center w-full h-full pointer-events-none z-20">
                  {NAV_ITEMS.map((item, i) => {
                    const pos = arcPosition(i, NAV_ITEMS.length);
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
                        animate={{ opacity: 1, scale: 1, x: pos.x, y: pos.y }}
                        exit={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22, delay: i * 0.03 }}
                        className="absolute bottom-0 flex flex-col items-center pointer-events-auto z-30"
                      >
                        <motion.a
                          href={item.href}
                          download={item.isDownload ? "Shiv_Resume.pdf" : undefined}
                          onClick={(e) => handleNavClick(e, item)}
                          onMouseEnter={() => handleIconEnter(i, item.name)}
                          onMouseLeave={() => setHoveredItem(null)}
                          whileHover={{ scale: 1.15, rotateY: 180 }}
                          whileTap={{ scale: 0.92 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="relative flex items-center justify-center w-12 h-12 rounded-full bg-black/90 border border-white/20 text-neutral-300 shadow-[0_8px_20px_rgba(0,0,0,0.9)] backdrop-blur-xl hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300 group overflow-hidden cursor-pointer"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity" />
                          <Icon size={19} className="relative z-10" />
                        </motion.a>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </AnimatePresence>

            {/* Bottom Trigger Button */}
            <motion.button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              onMouseEnter={() => setIsOpen(true)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="relative z-30 flex items-center justify-center w-14 h-14 rounded-full border border-white/30 bg-black/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.95)] overflow-hidden cursor-pointer group focus:outline-none pointer-events-auto"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div
                    key="close-icon"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex items-center justify-center w-full h-full bg-white text-black font-bold"
                  >
                    <HiOutlineXMark size={22} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="profile-avatar"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="w-full h-full bg-black"
                  >
                    <img
                      src={AVATAR_URL}
                      alt="Profile Avatar"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}