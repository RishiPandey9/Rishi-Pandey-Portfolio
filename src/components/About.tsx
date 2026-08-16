"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };

export function About() {
  return (
    <section id="about" className="relative bg-[#f5f5f5] text-[#0a0a0a] overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Japanese kanji */}
      <div
        className="absolute right-12 top-1/2 -translate-y-1/2 text-black/[0.03] font-bold pointer-events-none select-none hidden xl:block"
        style={{ writingMode: "vertical-rl", fontSize: "9rem", letterSpacing: "0.1em", fontFamily: "serif" }}
      >
        侍
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 py-24 grid grid-cols-1 lg:grid-cols-[420px_1fr_280px] gap-10 lg:gap-16 items-start">
        {/* Left: portrait placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          className="relative h-[500px] lg:h-[560px] overflow-hidden bg-[#ebe8e0]"
        >
          {/* Cherry blossom atmosphere */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 70%, rgba(255,182,193,0.25) 0%, transparent 65%)" }} />
          {/* Floating petals */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-pink-200/60"
              style={{ left: `${10 + i * 11}%`, top: `${5 + (i % 4) * 20}%` }}
              animate={{ y: [0, 20, 0], rotate: [0, 180, 360], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4 + i * 0.6, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
          {/* Silhouette */}
          <div className="absolute inset-0 flex items-end justify-center pb-0">
            <div
              className="w-full h-full opacity-[0.08]"
              style={{
                background: "radial-gradient(ellipse 50% 65% at 50% 40%, rgba(0,0,0,0.9) 0%, transparent 70%)",
              }}
            />
          </div>
          <svg viewBox="0 0 300 480" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 opacity-[0.07]" fill="#0a0a0a">
            <ellipse cx="150" cy="100" rx="50" ry="55" />
            <path d="M75 190 Q150 155 225 190 L248 478 Q150 490 52 478 Z" />
          </svg>
          {/* Watermark text */}
          <p className="absolute bottom-4 left-4 text-[9px] font-mono tracking-[0.2em] text-black/20 uppercase">About · Rishi Pandey</p>
        </motion.div>

        {/* Center: bio */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-6 pt-2"
        >
          <motion.p variants={reveal} className="text-[#dc2626] text-[10px] font-mono tracking-[0.3em] uppercase flex items-center gap-3">
            <span className="w-5 h-px bg-[#dc2626]" />
            ABOUT ME
          </motion.p>

          <motion.h2 variants={reveal} className="text-[clamp(1.9rem,3.5vw,2.8rem)] font-black leading-tight tracking-tighter">
            TURNING IDEAS INTO<br />
            INTELLIGENT <span className="text-[#dc2626]">DIGITAL PRODUCTS.</span>
          </motion.h2>

          <motion.p variants={reveal} className="text-[#0a0a0a]/55 text-[0.95rem] leading-relaxed max-w-[52ch]">
            {personalInfo.about}
          </motion.p>

          {/* Signature */}
          <motion.div variants={reveal} className="pt-2">
            <p
              className="text-[#0a0a0a]/50 text-2xl"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic" }}
            >
              {personalInfo.signature}
            </p>
          </motion.div>
        </motion.div>

        {/* Right: info card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="border border-[#0a0a0a]/10 bg-white/70 backdrop-blur-sm p-6 flex flex-col gap-4"
        >
          {[
            { icon: "📍", label: "BASED IN", value: personalInfo.location },
            { icon: "✅", label: "AVAILABLE FOR", value: personalInfo.availability },
            { icon: "✉️", label: "EMAIL", value: personalInfo.email },
            { icon: "🎯", label: "FOCUS", value: personalInfo.focus },
            { icon: "💬", label: "LANGUAGES", value: personalInfo.languages },
            { icon: "🕐", label: "TIMEZONE", value: personalInfo.timezone },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex gap-3 items-start pb-4 border-b border-black/[0.06] last:border-0 last:pb-0">
              <span className="text-base shrink-0 opacity-70">{icon}</span>
              <div>
                <p className="text-[9px] font-mono tracking-[0.18em] text-black/30 uppercase mb-0.5">{label}</p>
                <p className="text-[13px] font-semibold text-[#0a0a0a]">{value}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
