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
    const sections = navItems
      .map((item) => item.href.startsWith("#") ? document.querySelector(item.href) : null)
      .filter((section): section is Element => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id.toUpperCase());
      }),
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="fixed left-0 right-0 top-4 z-50 px-4"
      >
        <div className={`mx-auto flex h-14 max-w-[1320px] items-center justify-between rounded-full border px-4 shadow-[0_14px_50px_rgba(0,0,0,0.18)] transition-[background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] md:px-6 ${scrolled ? "border-white/[0.12] bg-[#0a0a0a]/92 backdrop-blur-xl" : "border-white/[0.08] bg-[#0a0a0a]/65 backdrop-blur-xl"}`}>
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
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setActive(item.name)}
                className="relative flex flex-col items-center gap-0.5 group"
              >
                <span className={`text-[11px] font-semibold tracking-[0.15em] transition-colors duration-200 ${active === item.name || active === item.href.slice(1).toUpperCase() ? "text-foreground" : "text-foreground/45 group-hover:text-foreground/80"}`}>{item.name}</span>
                {active === item.name && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="w-1 h-1 rounded-full bg-[#dc2626]"
                  />
                )}
              </Link>
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
