import React from "react";
import {
  Award,
  Trophy,
  Coffee,
  Home,
  Gift,
  Check,
  Sparkles,
} from "lucide-react";
import { benefits as defaultBenefits } from "../data/hackathonData";
import { useCms } from "../context/CmsContext";

export const Benefits: React.FC = () => {
  const cms = useCms();
  const benefitList = cms.isLoaded
    ? Array.isArray(cms.benefits)
      ? cms.benefits.filter((b: any) => b.status !== "DRAFT")
      : []
    : cms.benefits && cms.benefits.length > 0
      ? cms.benefits.filter((b: any) => b.status !== "DRAFT")
      : defaultBenefits;
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Award":
        return <Award className="w-8 h-8 text-sky-500" />;
      case "Trophy":
        return <Trophy className="w-8 h-8 text-amber-500" />;
      case "Coffee":
        return <Coffee className="w-8 h-8 text-rose-500" />;
      case "Home":
        return <Home className="w-8 h-8 text-emerald-500" />;
      default:
        return <Gift className="w-8 h-8 text-sky-500" />;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-[#060d1a] relative border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>HOSPITALITY & PERKS</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#0b1d3a] dark:text-white tracking-tight">
            WHAT PARTICIPANTS GET
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-sky-500 via-rose-500 to-indigo-500 rounded-full mx-auto mt-3 mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Every participating team receives comprehensive campus support,
            verifiable credentials, and exciting competitive incentives.
          </p>
        </div>

        {/* 4 Premium Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefitList.map((benefit: any, index: number) => (
            <div
              key={benefit.title}
              className="group relative bg-slate-50/70 hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-800/90 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-500/40 shadow-sm hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {getIcon(benefit.icon)}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300 bg-sky-100/80 dark:bg-sky-950/70 px-2.5 py-1 rounded-lg border border-sky-200 dark:border-sky-500/30">
                    {benefit.tag}
                  </span>
                </div>

                <h3 className="font-heading font-black text-xl text-[#0b1d3a] dark:text-white tracking-tight mb-2 group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors">
                  {benefit.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 leading-relaxed font-normal">
                  {benefit.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Confirmed Benefit</span>
              </div>
            </div>
          ))}
        </div>

        {/* Official Highlights Badges */}
        <div className="mt-12 p-4 rounded-2xl bg-sky-50/70 dark:bg-slate-900 border border-sky-200/80 dark:border-sky-500/30 flex items-center justify-center flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 shadow-sm">
          <span className="flex items-center gap-1.5 text-slate-800 dark:text-white font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]"></span>
            Real-World Problems
          </span>
          <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">
            •
          </span>
          <span className="flex items-center gap-1.5 text-slate-800 dark:text-white font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            Expert Mentorship
          </span>
          <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">
            •
          </span>
          <span className="flex items-center gap-1.5 text-slate-800 dark:text-white font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"></span>
            Amazing Prizes
          </span>
          <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">
            •
          </span>
          <span className="flex items-center gap-1.5 text-slate-800 dark:text-white font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span>
            E-Certificates for All
          </span>
          <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">
            •
          </span>
          <span className="flex items-center gap-1.5 text-slate-800 dark:text-white font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"></span>
            Network & Opportunities
          </span>
        </div>
      </div>
    </section>
  );
};
