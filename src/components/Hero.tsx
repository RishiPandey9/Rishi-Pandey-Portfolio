"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { GithubLogo, LinkedinLogo, TwitterLogo } from "@phosphor-icons/react";
import { personalInfo, heroStats, socialLinks } from "@/lib/data";
import { useRef } from "react";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  github: <GithubLogo size={15} weight="light" />,
  linkedin: <LinkedinLogo size={15} weight="light" />,
  twitter: <TwitterLogo size={15} weight="light" />,
};

const labels = [
  { text: "AI SYSTEMS", tone: "green", className: "left-[2%] top-[19%] -rotate-6" },
  { text: "FULL-STACK", tone: "cream", className: "right-[4%] top-[11%] rotate-3" },
  { text: "PRODUCT THINKING", tone: "orange", className: "right-[-2%] top-[42%] rotate-6" },
  { text: "MOTION & UI", tone: "cream", className: "left-[-2%] top-[52%] -rotate-3" },
  { text: "FROM SCHEMA TO SHIP", tone: "green", className: "left-[8%] bottom-[16%] rotate-3" },
];

const entry = {
  hidden: { opacity: 0, transform: "translateY(24px)" },
  visible: {
    opacity: 1,
    transform: "translateY(0px)",
    transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as const },
  },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "18%"]);
  const visualY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "-10%"]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.08]);
  const fade = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.9, 0.35]);

  return (
    <section ref={ref} id="home" className="hero-reference relative min-h-[100dvh] overflow-hidden bg-[#040403] text-[#f3eee8]">
      <div className="hero-reference-grid pointer-events-none absolute inset-0" />
      <div className="hero-reference-glow pointer-events-none absolute left-[38%] top-[17%] h-[48vw] w-[48vw] max-h-[720px] max-w-[720px] rounded-full" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1440px] flex-col px-6 pb-7 pt-24 md:px-10 md:pt-28">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 text-[9px] font-mono tracking-[0.22em] text-white/45 uppercase">
          <span>JAN 07 — 2026</span>
          <span className="hidden md:block">RISHI PANDEY / PORTFOLIO 02</span>
          <span className="flex items-center gap-2 text-[#69a65b]"><i className="h-1.5 w-1.5 rounded-full bg-[#69a65b]" /> AVAILABLE FOR WORK</span>
        </div>

        <div className="relative flex flex-1 flex-col justify-center py-12 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-4 lg:py-0">
          <motion.div style={{ y: copyY }} className="relative z-20 max-w-[720px]">
            <motion.p variants={entry} initial="hidden" animate="visible" className="mb-6 flex items-center gap-3 text-[10px] font-mono tracking-[0.25em] text-[#e5d3c9] uppercase">
              <span className="h-px w-8 bg-[#d63d21]" />
              Full-stack developer / AI engineer
            </motion.p>
            <motion.h1 variants={entry} initial="hidden" animate="visible" transition={{ delay: 0.08 }} className="max-w-[760px] text-[clamp(4.2rem,10.5vw,10.5rem)] font-black leading-[0.78] tracking-[-0.09em] uppercase">
              <span className="block text-[#f3eee8]">Build</span>
              <span className="block pl-[9vw] text-[#69a65b]">Better</span>
              <span className="block text-[#f3eee8]">Systems<span className="text-[#d63d21]">.</span></span>
            </motion.h1>
            <motion.div variants={entry} initial="hidden" animate="visible" transition={{ delay: 0.16 }} className="mt-9 flex max-w-[470px] items-start justify-between gap-8 border-t border-white/10 pt-5">
              <p className="text-sm leading-relaxed text-white/55">I design and ship intelligent digital products that turn complex systems into clear, useful experiences.</p>
              <a href="#projects" className="group flex shrink-0 items-center gap-2 text-[10px] font-bold tracking-[0.18em] text-[#e5d3c9] uppercase transition-colors duration-200 hover:text-[#69a65b]">
                Explore work <span className="transition-transform duration-200 group-hover:translate-x-1">↗</span>
              </a>
            </motion.div>
          </motion.div>

          <motion.div style={{ y: visualY, scale: visualScale, opacity: fade }} className="relative mx-auto mt-12 aspect-[0.86] w-[min(86vw,480px)] lg:mt-0 lg:mr-[8%] lg:w-[min(38vw,500px)]">
            <div className="absolute inset-[7%] rounded-[48%_48%_42%_42%] bg-[#d9c7bd] opacity-90" />
            <div className="hero-reference-portrait absolute inset-[9%] overflow-hidden rounded-[48%_48%_42%_42%] border border-white/20 bg-[#8d979d]">
              <Image src="/profile.png" alt="Portrait of Rishi Pandey" fill priority sizes="(max-width: 768px) 100vw, 48vw" className="object-cover object-top grayscale-[0.28] contrast-[1.02]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040403]/75 via-transparent to-[#69a65b]/10" />
              <div className="absolute inset-x-7 top-7 flex items-center justify-between text-[9px] font-mono tracking-[0.2em] text-white/60">
                <span>RP / 01</span>
                <span className="flex items-center gap-2"><i className="h-1.5 w-1.5 rounded-full bg-[#69a65b]" /> AVAILABLE</span>
              </div>
              <div className="absolute bottom-8 left-7 right-7 flex items-end justify-between">
                <div><p className="text-[10px] font-mono tracking-[0.2em] text-white/60">ENGINEER / BUILDER</p><p className="mt-2 text-2xl font-black tracking-[-0.06em] text-white">RISHI<br />PANDEY</p></div>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-[#e5d3c9]">↗</span>
              </div>
            </div>
            {labels.map((label, index) => (
              <motion.span key={label.text} initial={{ opacity: 0, transform: "translateY(10px) scale(0.96)" }} animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }} transition={{ duration: 0.55, delay: 0.45 + index * 0.08, ease: [0.23, 1, 0.32, 1] }} className={`hero-label hero-label-${label.tone} absolute ${label.className}`}>{label.text}</motion.span>
            ))}
          </motion.div>
        </div>

        <div className="hero-reference-footer flex flex-col gap-5 border-t border-white/10 pt-5 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-4 md:w-1/3">
            {socialLinks.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} className="text-white/45 transition-colors duration-200 hover:text-[#e5d3c9]">{SOCIAL_ICONS[social.icon]}</a>)}
            <span className="ml-2 text-[9px] font-mono tracking-[0.2em] text-white/25">SCROLL TO EXPLORE ↓</span>
          </div>
          <div className="hidden text-center text-[9px] font-mono tracking-[0.24em] text-white/30 uppercase md:block md:w-1/3">Selected capabilities / 2026</div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 md:w-1/3 md:grid-cols-4 md:justify-items-end">
            {heroStats.map((stat) => <div key={stat.label}><p className="text-lg font-black tracking-[-0.04em] text-[#e5d3c9]">{stat.value}</p><p className="mt-0.5 text-[8px] font-mono tracking-[0.16em] text-white/30">{stat.label}</p></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
