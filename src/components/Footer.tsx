"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { personalInfo, navItems, socialLinks } from "@/lib/data";
import { GithubLogo, LinkedinLogo, TwitterLogo } from "@phosphor-icons/react";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  github: <GithubLogo size={18} weight="bold" />,
  linkedin: <LinkedinLogo size={18} weight="bold" />,
  twitter: <TwitterLogo size={18} weight="bold" />,
};

const RESOURCES = [
  { name: "Resume", href: personalInfo.resume },
  { name: "Services", href: "#services" },
  { name: "Case Studies", href: "#projects" },
  { name: "Testimonials", href: "#contact" },
];

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-[#f5f5f5] text-[#0a0a0a] border-t border-black/[0.08]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 pb-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-black/[0.08]">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#dc2626] flex items-center justify-center rounded-sm">
                <span className="text-white font-black text-sm tracking-tight">RP</span>
              </div>
              <span className="font-black text-sm tracking-wide text-[#0a0a0a] uppercase">{personalInfo.name}</span>
            </Link>
            <p className="text-[11px] font-mono tracking-[0.15em] text-black/35 uppercase">
              {personalInfo.roles.join(" · ")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[9px] font-mono tracking-[0.25em] text-black/30 uppercase mb-5">Navigation</p>
            <ul className="flex flex-col gap-2.5">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[12px] text-black/50 hover:text-[#dc2626] transition-colors duration-200 font-medium"
                  >
                    {item.name[0] + item.name.slice(1).toLowerCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-[9px] font-mono tracking-[0.25em] text-black/30 uppercase mb-5">Resources</p>
            <ul className="flex flex-col gap-2.5">
              {RESOURCES.map((r) => (
                <li key={r.name}>
                  <a
                    href={r.href}
                    className="text-[12px] text-black/50 hover:text-[#dc2626] transition-colors duration-200 font-medium"
                  >
                    {r.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-[9px] font-mono tracking-[0.25em] text-black/30 uppercase mb-5">Follow Me</p>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="w-9 h-9 border border-black/[0.12] flex items-center justify-center text-black/40 hover:text-[#dc2626] hover:border-[#dc2626]/40 transition-colors duration-200"
                >
                  {SOCIAL_ICONS[s.icon]}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-[11px] font-mono text-black/30">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <button
            onClick={scrollTop}
            aria-label="Back to top"
            className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-black/35 hover:text-[#dc2626] transition-colors uppercase group"
          >
            BACK TO TOP
            <span className="w-6 h-6 border border-current flex items-center justify-center group-hover:border-[#dc2626] transition-colors">
              <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5" stroke="currentColor" strokeWidth="1.8">
                <path d="M5 8V2M2 5l3-3 3 3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
