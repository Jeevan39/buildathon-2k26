import React from "react";
import {
  Cpu,
  ShieldCheck,
  Leaf,
  Sparkles,
  Network,
  ArrowUpRight,
  Binary,
} from "lucide-react";
import { useCms } from "../context/CmsContext";
import { eventData } from "../data/hackathonData";

export const ThemeSection: React.FC = () => {
  const { theme, event } = useCms();

  const label = theme?.label || "CENTRAL FOCUS";
  const heading = theme?.heading || "THE HACKATHON THEME";
  const quote =
    theme?.quote ||
    "“Building Intelligent Solutions for a Smarter, Sustainable & Secure Tomorrow”";
  const description =
    theme?.description ||
    `Technology achieves greatness when applied towards real societal challenges. At ${event?.name || "Buildathon 2.0 – 2K26"}, teams harness algorithms, cloud infrastructure, AI models, and human-centric design to create scalable solutions.`;
  const pillars = theme?.pillars || [
    {
      title: "SMARTER",
      description:
        "Leveraging intelligent algorithms, automated decision support, edge computing, and predictive models.",
      icon: "Cpu",
      color: "sky",
    },
    {
      title: "SUSTAINABLE",
      description:
        "Conserving environmental resources, optimizing energy consumption, and architecting long-term scalable workflows.",
      icon: "Leaf",
      color: "emerald",
    },
    {
      title: "SECURE",
      description:
        "Safeguarding critical public infrastructure, ensuring data privacy, ethical boundaries, and resilient fault tolerance.",
      icon: "ShieldCheck",
      color: "rose",
    },
  ];
  return (
    <section className="py-16 md:py-24 bg-slate-50/60 dark:bg-[#060d1a] relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800">
      {/* Background circuit grid */}
      <div className="absolute inset-0 tech-grid-pattern opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
            <span>{label}</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#0b1d3a] dark:text-white tracking-tight">
            {heading}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-sky-500 via-rose-500 to-emerald-500 rounded-full mx-auto mt-3"></div>
        </div>

        {/* Central Futuristic Banner */}
        <div className="relative max-w-5xl mx-auto bg-gradient-to-br from-[#071329] via-[#0b1f44] to-[#0e2c5e] text-white rounded-3xl p-8 sm:p-12 md:p-14 border border-sky-400/40 shadow-2xl overflow-hidden">
          {/* Subtle animated circuit SVG overlay */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="circuit-wire"
                  width="120"
                  height="120"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 0 60 H 40 L 60 20 H 120 M 60 20 V 0 M 60 120 V 80 L 80 60 H 120"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="1.2"
                  />
                  <circle cx="40" cy="60" r="3" fill="#38bdf8" />
                  <circle cx="80" cy="60" r="3" fill="#f43f5e" />
                  <circle cx="60" cy="20" r="3" fill="#10b981" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit-wire)" />
            </svg>
          </div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-sky-100 font-extrabold mb-3 bg-sky-500/30 px-4 py-1.5 rounded-full border border-sky-400/40 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-sky-300" />
              <span>OFFICIAL THEME</span>
            </div>

            {/* Main Theme Headline */}
            <blockquote className="font-heading font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-tight leading-snug mb-6 drop-shadow-md">
              {quote}
            </blockquote>

            <p className="text-slate-100 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto font-medium">
              {description}
            </p>

            {/* Three Pillars Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {pillars.map((pillar: any, pIdx: number) => {
                const getIcon = () => {
                  if (pillar.icon === "Leaf")
                    return <Leaf className="w-5 h-5 text-emerald-400" />;
                  if (pillar.icon === "ShieldCheck")
                    return <ShieldCheck className="w-5 h-5 text-rose-400" />;
                  return <Cpu className="w-5 h-5 text-sky-400" />;
                };

                const colorStyles = [
                  {
                    border: "hover:border-sky-400/60",
                    iconBg: "bg-sky-500/20 text-sky-400",
                  },
                  {
                    border: "hover:border-emerald-400/60",
                    iconBg: "bg-emerald-500/20 text-emerald-400",
                  },
                  {
                    border: "hover:border-rose-400/60",
                    iconBg: "bg-rose-500/20 text-rose-400",
                  },
                ];
                const cs = colorStyles[pIdx % colorStyles.length];

                return (
                  <div
                    key={pillar.title}
                    className={`bg-slate-900/60 backdrop-blur-md p-5 rounded-2xl border border-white/20 ${cs.border} transition-all shadow-sm`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl ${cs.iconBg} flex items-center justify-center mb-3`}
                    >
                      {getIcon()}
                    </div>
                    <h4 className="font-heading font-extrabold text-lg text-white mb-1.5 tracking-wide">
                      {pillar.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
