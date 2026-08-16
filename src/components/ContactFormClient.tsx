"use client";

import { useState } from "react";
import { submitContact, type ContactPayload } from "@/lib/firebase/contact";

const PROJECT_TYPES = ["Web Application", "AI Integration", "Full-Stack Product", "API / Backend", "Consulting", "Other"];
const BUDGETS = ["< $1K", "$1K – $5K", "$5K – $15K", "$15K+", "Let's discuss"];

export default function ContactFormClient() {
  const [form, setForm] = useState<ContactPayload>({
    name: "", email: "", projectType: "", budget: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set = (k: keyof ContactPayload) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");
    try {
      await submitContact(form);
      setStatus("success");
      setForm({ name: "", email: "", projectType: "", budget: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputCls =
    "w-full bg-white border border-black/[0.12] px-4 py-3 text-[13px] text-[#0a0a0a] placeholder:text-black/30 focus:outline-none focus:border-[#dc2626] transition-colors duration-200";
  const labelCls = "block text-[9px] font-mono tracking-[0.18em] text-black/40 uppercase mb-1.5";

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div className="w-12 h-12 bg-[#dc2626] flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="white" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="text-xl font-black tracking-tighter text-[#0a0a0a]">Message Sent!</h3>
        <p className="text-[13px] text-black/45 max-w-[30ch]">
          Thanks for reaching out. I&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-[11px] font-mono tracking-widest text-[#dc2626] underline underline-offset-4"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-name" className={labelCls}>Your Name</label>
          <input id="cf-name" type="text" placeholder="Enter your name" value={form.name}
            onChange={set("name")} required className={inputCls} />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelCls}>Your Email</label>
          <input id="cf-email" type="email" placeholder="Enter your email" value={form.email}
            onChange={set("email")} required className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-type" className={labelCls}>Project Type</label>
          <select id="cf-type" value={form.projectType} onChange={set("projectType")}
            className={`${inputCls} appearance-none cursor-pointer`}>
            <option value="">Select project type</option>
            {PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="cf-budget" className={labelCls}>Budget Range</label>
          <select id="cf-budget" value={form.budget} onChange={set("budget")}
            className={`${inputCls} appearance-none cursor-pointer`}>
            <option value="">Select budget</option>
            {BUDGETS.map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cf-msg" className={labelCls}>Message</label>
        <textarea id="cf-msg" rows={4} placeholder="Tell me about your project..."
          value={form.message} onChange={set("message")} required
          className={`${inputCls} resize-none`} />
      </div>

      {status === "error" && (
        <p className="text-[12px] text-[#dc2626] font-mono">
          Something went wrong. Check your Firebase config and try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex items-center justify-center gap-3 w-full py-4 bg-[#dc2626] text-white text-[11px] font-black tracking-widest hover:bg-[#b91c1c] disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {status === "loading" ? "SENDING..." : "START A CONVERSATION"}
        {status !== "loading" && (
          <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2">
            <path d="M1 13L13 1M13 1H5M13 1V9" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
    </form>
  );
}
