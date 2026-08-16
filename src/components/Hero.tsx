"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { personalInfo, heroStats, socialLinks } from "@/lib/data";
import { useRef } from "react";
import { GithubLogo, LinkedinLogo, TwitterLogo } from "@phosphor-icons/react";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  github: <GithubLogo size={16} weight="bold" />,
  linkedin: <LinkedinLogo size={16} weight="bold" />,
  twitter: <TwitterLogo size={16} weight="bold" />,
};

const item = {
  hidden: { y: 32, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.85, ease: [0.23, 1, 0.32, 1] as const } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-[100dvh] flex flex-col overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Red circular glow background */}
      <div
        className="absolute top-[-10%] right-[8%] w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(220,38,38,0.22) 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-[5%] right-[18%] w-[340px] h-[340px] rounded-full pointer-events-none border border-[#dc2626]/10"
        style={{ background: "transparent" }}
      />

      {/* Japanese kanji decoration — far right */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/[0.04] font-bold pointer-events-none select-none hidden xl:block"
        style={{ writingMode: "vertical-rl", fontSize: "7rem", letterSpacing: "0.1em", fontFamily: "serif" }}>
        サムライ
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#dc2626] pointer-events-none"
          style={{ top: `${20 + i * 12}%`, right: `${25 + (i % 3) * 8}%`, opacity: 0.4 }}
          animate={{ y: [0, -12, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.5 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        />
      ))}

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 flex-1 flex flex-col">
        {/* Main content row */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-0 items-center pt-20 pb-4">
          {/* Left: Social rail + Content */}
          <div className="flex gap-6 items-center">
            {/* Vertical social rail */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hidden md:flex flex-col items-center gap-4 shrink-0"
            >
              <div className="w-px h-12 bg-white/10" />
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="text-white/30 hover:text-[#dc2626] transition-colors duration-200"
                >
                  {SOCIAL_ICONS[s.icon]}
                </a>
              ))}
              <div className="w-px h-12 bg-white/10" />
              <span
                className="text-[9px] font-mono tracking-[0.3em] text-white/20 uppercase"
                style={{ writingMode: "vertical-rl" }}
              >
                SCROLL
              </span>
            </motion.div>

            {/* Hero text */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-5 max-w-[600px]"
            >
              <motion.p variants={item} className="text-[#dc2626] text-xs font-mono tracking-[0.3em] uppercase flex items-center gap-3">
                <span className="w-6 h-px bg-[#dc2626]" />
                HELLO, I&apos;M
              </motion.p>

              <motion.h1 variants={item} className="font-black leading-[0.88] tracking-tighter">
                <span className="block text-[clamp(3.5rem,8vw,6.5rem)] text-white">
                  {personalInfo.firstName}
                </span>
                <span className="block text-[clamp(3.5rem,8vw,6.5rem)] text-[#dc2626]">
                  {personalInfo.lastName.toUpperCase()}
                </span>
              </motion.h1>

              <motion.div variants={item} className="flex flex-col gap-1">
                <p className="text-[clamp(1.4rem,3.5vw,2.6rem)] font-bold text-white tracking-tight leading-tight">
                  I BUILD INTELLIGENT
                </p>
                <p className="text-[clamp(1.4rem,3.5vw,2.6rem)] font-bold tracking-tight leading-tight">
                  DIGITAL <span className="text-[#dc2626]">EXPERIENCES.</span>
                </p>
              </motion.div>

              <motion.p variants={item} className="text-[11px] font-mono tracking-[0.2em] text-white/35 flex items-center gap-2 flex-wrap">
                {personalInfo.roles.map((role, i) => (
                  <span key={role} className="flex items-center gap-2">
                    {i > 0 && <span className="w-1 h-1 rounded-full bg-white/20" />}
                    {role}
                  </span>
                ))}
              </motion.p>

              <motion.div variants={item} className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#projects"
                  className="group flex items-center gap-2 px-6 py-3 bg-[#dc2626] text-white text-xs font-bold tracking-widest hover:bg-[#b91c1c] transition-colors duration-200"
                >
                  VIEW MY WORK
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                    <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a
                  href={personalInfo.resume}
                  className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white/65 text-xs font-bold tracking-widest hover:border-white/50 hover:text-white transition-all duration-200"
                >
                  DOWNLOAD RESUME
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M6.5 1v8M6.5 9l-3-3M6.5 9l3-3M1 12h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Hero image placeholder + Focus Areas card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            style={{ y: imgY }}
            className="relative hidden lg:flex items-end justify-center h-[calc(100dvh-5rem)]"
          >
            {/* Red circle backdrop */}
            <div className="absolute top-[5%] right-[5%] w-[420px] h-[420px] rounded-full border-2 border-[#dc2626]/20 pointer-events-none" />
            <div className="absolute top-[8%] right-[8%] w-[360px] h-[360px] rounded-full bg-[#dc2626]/08 pointer-events-none" />

            {/* Silhouette placeholder — cinematic dark shape with red glow */}
            <div className="relative w-[420px] h-full max-h-[calc(100dvh-6rem)] flex items-end">
              <div
                className="absolute inset-0 rounded-none"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 80% at 50% 60%, rgba(220,38,38,0.18) 0%, transparent 70%), linear-gradient(to top, #0a0a0a 0%, transparent 50%)",
                }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center opacity-10"
                style={{
                  background:
                    "radial-gradient(ellipse 40% 60% at 50% 45%, rgba(220,38,38,0.6) 0%, transparent 60%)",
                }}
              />
              {/* Silhouette shape */}
              <svg
                viewBox="0 0 300 500"
                className="w-full h-full opacity-[0.06]"
                fill="white"
                preserveAspectRatio="xMidYMax meet"
              >
                <ellipse cx="150" cy="120" rx="55" ry="60" />
                <path d="M70 200 Q150 160 230 200 L260 480 Q150 500 40 480 Z" />
              </svg>
            </div>

            {/* Focus Areas card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="absolute top-[20%] right-0 w-48 bg-[#111]/90 backdrop-blur-md border border-white/10 p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-[9px] font-mono tracking-[0.2em] text-white/40 uppercase">Focus Areas</p>
                <span className="text-[#dc2626] text-xs">+</span>
              </div>
              <ul className="flex flex-col gap-2">
                {["AI Development", "Web Applications", "Automation", "Product Engineering"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[11px] text-white/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="border-t border-white/[0.07] py-5 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="w-8 h-8 border border-white/10 flex items-center justify-center text-[#dc2626] opacity-60">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M7 4v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="text-lg font-black tracking-tight text-white">{stat.value}</p>
                <p className="text-[9px] font-mono tracking-[0.15em] text-white/30 uppercase">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
