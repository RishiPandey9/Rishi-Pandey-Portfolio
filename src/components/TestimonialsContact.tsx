"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";
import ContactFormClient from "./ContactFormClient";

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.23, 1, 0.32, 1] as const } },
};

export function TestimonialsContact() {
  return (
    <section id="testimonials" className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        {/* LEFT: dark testimonials */}
        <div className="relative bg-[#0a0a0a] text-foreground py-20 px-8 md:px-14 overflow-clip">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(220,38,38,0.12) 0%, transparent 65%)" }}
          />
          {/* Decorative Japanese circle */}
          <div className="absolute right-8 top-12 opacity-[0.06]">
            <svg viewBox="0 0 200 200" className="w-36 h-36" fill="none" stroke="#dc2626" strokeWidth="2">
              <circle cx="100" cy="100" r="80"/>
              <circle cx="100" cy="100" r="60"/>
              <path d="M100 20 L120 80 L180 80 L135 120 L155 180 L100 145 L45 180 L65 120 L20 80 L80 80 Z" strokeWidth="1" opacity="0.5"/>
            </svg>
          </div>

          <div className="relative z-10">
            <p className="text-[#dc2626] text-[10px] font-mono tracking-[0.3em] uppercase flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
              WORDS FROM
            </p>
            <h2 className="text-[clamp(2rem,3.5vw,2.8rem)] font-black tracking-tighter text-white mb-10">
              AMAZING PEOPLE
            </h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ staggerChildren: 0.12 }}
              className="flex flex-col gap-5"
            >
              {testimonials.map((t) => (
                <motion.div
                  key={t.name}
                  variants={cardVariant}
                  className="border border-white/[0.08] bg-[#111]/80 p-6 flex flex-col gap-4"
                >
                  <div className="text-[#dc2626] opacity-60">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                  <p className="text-[13px] text-white/60 leading-relaxed italic">{t.quote}</p>
                  <div className="flex items-center gap-3 pt-1 border-t border-white/[0.06]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-[11px] font-bold text-white/50">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-white">{t.name}</p>
                      <p className="text-[10px] text-white/30">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* RIGHT: contact form */}
        <div className="relative bg-[#f5f5f5] text-[#0a0a0a] py-20 px-8 md:px-14 flex flex-col justify-center overflow-clip">
          {/* Red circle decoration */}
          <div
            className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full pointer-events-none opacity-20"
            style={{ background: "radial-gradient(circle, rgba(220,38,38,0.6) 0%, transparent 65%)" }}
          />

          <div className="relative z-10">
            <ContactFormInner />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactFormInner() {
  return (
    <div>
      <p className="text-[#dc2626] text-[10px] font-mono tracking-[0.3em] uppercase flex items-center gap-2 mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
        GET IN TOUCH
      </p>
      <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-black tracking-tighter text-[#0a0a0a] mb-8">
        START A PROJECT
      </h2>
      <ContactFormClient />
    </div>
  );
}
