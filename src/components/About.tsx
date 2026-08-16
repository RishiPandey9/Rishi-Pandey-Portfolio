"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { At, Check, Crosshair, MapPin, Translate, Clock } from "@phosphor-icons/react";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#f3eee8] text-[#040403]">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
            backgroundImage:
            "linear-gradient(rgba(4,4,3,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(4,4,3,0.10) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-10 px-6 py-32 md:px-10 md:py-40 lg:grid-cols-[420px_1fr_280px] lg:gap-16">
        {/* Left: portrait */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          className="relative h-[500px] rounded-[2rem] border border-black/10 bg-black/[0.03] p-2 lg:h-[560px]"
        >
          <div className="about-system-sheet relative h-full overflow-hidden rounded-[1.5rem] bg-[#101010] p-7 text-white">
            <div className="absolute right-[-18%] top-[8%] h-64 w-64 rounded-full border border-[#69a65b]/30" />
            <div className="absolute right-[-7%] top-[19%] h-40 w-40 rounded-full border border-white/10" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-start justify-between text-[9px] font-mono tracking-[0.2em] text-white/35">
                <span>ABOUT / 02</span>
                <span>RP</span>
              </div>
              <div>
                <p className="mb-4 text-[10px] font-mono tracking-[0.2em] text-[#d63d21]">THE WORKING METHOD</p>
                <p className="max-w-full text-[clamp(2.25rem,4vw,4rem)] font-black leading-[0.84] tracking-[-0.08em]">CLARITY<br />BEFORE<br />COMPLEXITY<span className="text-[#d63d21]">.</span></p>
              </div>
              <div className="flex items-end justify-between border-t border-white/10 pt-4">
                <div className="flex flex-col gap-1 text-[9px] font-mono tracking-[0.15em] text-white/35">
                  <span>01 / THINK</span><span>02 / BUILD</span><span>03 / SHIP</span>
                </div>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d63d21]/60 text-[#d63d21]">↗</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Center: bio */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-6 pt-2"
        >
          <motion.p variants={reveal} className="flex items-center gap-3 text-[10px] font-mono tracking-[0.3em] uppercase text-[#d63d21]">
            <span className="h-px w-5 bg-[#d63d21]" />
            ABOUT ME
          </motion.p>

          <motion.h2 variants={reveal} className="text-[clamp(1.9rem,3.5vw,2.8rem)] font-black leading-tight tracking-tighter">
            TURNING IDEAS INTO<br />
            INTELLIGENT <span className="text-[#69a65b]">DIGITAL PRODUCTS.</span>
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
          className="rounded-[1.5rem] border border-[#040403]/10 bg-[#fffdfa] p-6 flex flex-col gap-4"
        >
          {[
            { icon: MapPin, label: "BASED IN", value: personalInfo.location },
            { icon: Check, label: "AVAILABLE FOR", value: personalInfo.availability },
            { icon: At, label: "EMAIL", value: personalInfo.email },
            { icon: Crosshair, label: "FOCUS", value: personalInfo.focus },
            { icon: Translate, label: "LANGUAGES", value: personalInfo.languages },
            { icon: Clock, label: "TIMEZONE", value: personalInfo.timezone },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-3 items-start pb-4 border-b border-black/[0.06] last:border-0 last:pb-0">
              <Icon size={17} weight="light" className="mt-0.5 shrink-0 text-[#69a65b]" />
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
