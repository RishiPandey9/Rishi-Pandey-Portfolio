"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { personalInfo, navItems } from "@/lib/data";
import { List, X } from "@phosphor-icons/react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("HOME");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0a]/92 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_2px_24px_rgba(0,0,0,0.6)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 bg-[#dc2626] flex items-center justify-center rounded-sm">
              <span className="text-white font-black text-sm tracking-tight">RP</span>
            </div>
            <span className="text-[13px] font-semibold tracking-wider text-foreground/90 uppercase hidden sm:block">
              {personalInfo.name}
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActive(item.name)}
                className="relative flex flex-col items-center gap-0.5 group"
              >
                <Link
                  href={item.href}
                  className={`text-[11px] font-semibold tracking-[0.15em] transition-colors duration-200 ${
                    active === item.name ? "text-foreground" : "text-foreground/45 hover:text-foreground/80"
                  }`}
                >
                  {item.name}
                </Link>
                {active === item.name && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="w-1 h-1 rounded-full bg-[#dc2626]"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contact"
              className="flex items-center gap-2 px-5 py-2 text-[11px] font-bold tracking-widest border border-white/25 text-foreground hover:border-[#dc2626] hover:text-[#dc2626] transition-all duration-200 rounded-none"
            >
              LET&apos;S TALK
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-9 h-9 flex items-center justify-center border border-white/15 text-foreground/60 hover:text-foreground hover:border-white/30 transition-all"
            aria-label="Toggle menu"
          >
            {open ? <X size={16} weight="bold" /> : <List size={16} weight="bold" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a]/97 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 lg:hidden"
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 12, opacity: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
              >
                <Link
                  href={item.href}
                  onClick={() => { setOpen(false); setActive(item.name); }}
                  className="text-3xl font-bold tracking-tighter text-foreground/60 hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <motion.a
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              transition={{ duration: 0.35, delay: navItems.length * 0.05 }}
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 px-8 py-3 bg-[#dc2626] text-white font-bold text-sm tracking-widest"
            >
              LET&apos;S TALK
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
