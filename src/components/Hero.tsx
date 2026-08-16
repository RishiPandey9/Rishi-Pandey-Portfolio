"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { personalInfo, heroStats, socialLinks } from "@/lib/data";
import { useRef } from "react";
import Image from "next/image";
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
  const reduceMotion = useReducedMotion();
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "16%"]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.12]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.92, 0.5]);
  const frameRotate = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -5]);

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
        style={{ background: "radial-gradient(circle, rgba(232,98,88,0.28) 0%, rgba(116,32,35,0.12) 38%, transparent 72%)" }}
      />
      <div
        className="absolute top-[5%] right-[18%] w-[340px] h-[340px] rounded-full pointer-events-none border border-[#e86258]/20"
        style={{ background: "transparent" }}
      />

      <motion.div
        style={{ opacity: sceneOpacity }}
        className="absolute inset-0 pointer-events-none hero-scanlines"
      />

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
                  className="text-white/30 hover:text-[#e86258] transition-colors duration-200"
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
              <motion.p variants={item} className="text-[#e86258] text-xs font-mono tracking-[0.3em] uppercase flex items-center gap-3">
                <span className="w-6 h-px bg-[#e86258]" />
                HELLO, I&apos;M
              </motion.p>

              <motion.h1 variants={item} className="font-black leading-[0.88] tracking-tighter">
                <span className="block text-[clamp(3.5rem,8vw,6.5rem)] text-white">
                  {personalInfo.firstName}
                </span>
                <span className="block text-[clamp(3.5rem,8vw,6.5rem)] text-[#e86258]">
                  {personalInfo.lastName.toUpperCase()}
                </span>
              </motion.h1>

              <motion.div variants={item} className="flex flex-col gap-1">
                <p className="text-[clamp(1.4rem,3.5vw,2.6rem)] font-bold text-white tracking-tight leading-tight">
                  I BUILD INTELLIGENT
                </p>
                <p className="text-[clamp(1.4rem,3.5vw,2.6rem)] font-bold tracking-tight leading-tight">
                  DIGITAL <span className="text-[#e86258]">EXPERIENCES.</span>
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
                  className="group flex items-center gap-3 rounded-full bg-[#e86258] px-5 py-2.5 text-xs font-bold tracking-widest text-[#150b0b] transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#f0786d] active:scale-[0.98]"
                >
                  VIEW MY WORK
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/10 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1 group-hover:-translate-y-px">
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  </span>
                </a>
                <a
                  href={personalInfo.resume}
                  className="group flex items-center gap-3 rounded-full border border-white/20 px-5 py-2.5 text-xs font-bold tracking-widest text-white/65 transition-[border-color,color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-white/50 hover:text-white active:scale-[0.98]"
                >
                  DOWNLOAD RESUME
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0.5">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M6.5 1v8M6.5 9l-3-3M6.5 9l3-3M1 12h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  </span>
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: product system visual + Focus Areas card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative hidden lg:flex items-end justify-center h-[calc(100dvh-5rem)]"
          >
            {/* Warm editorial light field */}
            <div className="hero-light absolute -right-10 top-[2%] h-[520px] w-[520px] rounded-full pointer-events-none" />
            <div className="absolute right-[8%] top-[12%] h-[390px] w-[390px] rounded-full border border-[#e86258]/25 pointer-events-none" />
            <div className="absolute right-[17%] top-[21%] h-[250px] w-[250px] rounded-full border border-white/[0.08] pointer-events-none" />

            {/* Abstract product system visual. A Firebase video can replace it through heroVideoUrl. */}
            <motion.div
              style={{ y: sceneY, scale: sceneScale, rotate: frameRotate }}
              className="absolute inset-0 flex items-end justify-center pb-10 will-change-transform"
            >
              <div className="relative h-[82%] w-[88%] max-w-[520px] hero-frame">
                {personalInfo.heroVideoUrl ? (
                  <video
                    src={personalInfo.heroVideoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster=""
                    aria-label="Cinematic hero reel"
                    className="h-full w-full rounded-[2rem] object-cover opacity-85"
                  />
                ) : (
                  <div className="hero-portrait-shell h-full w-full rounded-[2rem] border border-white/15 bg-white/[0.04] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.38)]">
                    <div className="relative h-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#242424]">
                      <Image src="/profile.png" alt="Portrait of Rishi Pandey" fill priority className="object-cover object-top grayscale-[0.18] contrast-[1.04]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090707] via-transparent to-[#e86258]/10" />
                      <div className="absolute inset-x-5 top-5 flex items-center justify-between text-[9px] font-mono tracking-[0.2em] text-white/55">
                        <span>RISHI / 01</span>
                        <span className="flex items-center gap-2"><i className="h-1.5 w-1.5 rounded-full bg-[#e86258]" /> AVAILABLE</span>
                      </div>
                      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                        <div>
                          <p className="text-[clamp(1.7rem,3vw,2.7rem)] font-black tracking-[-0.06em] text-white">BUILD WITH INTENT.</p>
                          <p className="mt-1 text-[10px] font-mono tracking-[0.18em] text-white/50">AI · WEB · PRODUCT ENGINEERING</p>
                        </div>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-[#e86258]">↗</span>
                      </div>
                    </div>
                  </div>
                )}
                {/* Overlay gradient to blend image bottom */}
                <div className="absolute inset-x-[14%] top-[12%] bottom-[20%] border border-white/[0.08]" />
                <div className="absolute left-[14%] top-[12%] h-10 w-px bg-[#e86258]" />
                <div className="absolute right-[14%] bottom-[20%] h-10 w-px bg-[#e86258]" />
              </div>
            </motion.div>

            <motion.div
              style={{ opacity: sceneOpacity }}
              className="absolute left-5 bottom-20 flex items-center gap-3 text-[9px] font-mono tracking-[0.25em] text-white/35 uppercase"
            >
              <span className="h-px w-10 bg-[#e86258]" />
              Scroll / enter the frame
            </motion.div>

            {/* Focus Areas card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="absolute top-[20%] right-0 w-48 border border-white/10 bg-[#111] p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-[9px] font-mono tracking-[0.2em] text-white/40 uppercase">Focus Areas</p>
                <span className="text-[#e86258] text-xs">+</span>
              </div>
              <ul className="flex flex-col gap-2">
                {["AI Development", "Web Applications", "Automation", "Product Engineering"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[11px] text-white/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e86258]" />
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
              <div className="w-8 h-8 border border-white/10 flex items-center justify-center text-[#e86258] opacity-60">
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
