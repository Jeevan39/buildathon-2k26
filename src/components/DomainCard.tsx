import React from "react";
import { DomainItem } from "../data/hackathonData";
import {
  HeartPulse,
  Sprout,
  Building2,
  GraduationCap,
  Leaf,
  ArrowRight,
  Layers,
  Cpu,
  Code2,
  Sparkles,
  ShieldCheck,
  Network,
} from "lucide-react";

interface DomainCardProps {
  domain: DomainItem;
  index?: number;
  className?: string;
  onSelectDomain: (domainId: string) => void;
}

export const DomainCard: React.FC<DomainCardProps> = ({
  domain,
  index,
  className = "",
  onSelectDomain,
}) => {
  const domainNumberDisplay = domain.domainNumber
    ? String(domain.domainNumber).padStart(2, "0")
    : typeof index === "number"
      ? String(index + 1).padStart(2, "0")
      : "01";

  const getIcon = () => {
    switch (domain.iconName) {
      case "HeartPulse":
        return <HeartPulse className="w-7 h-7 text-rose-500" />;
      case "Sprout":
        return <Sprout className="w-7 h-7 text-emerald-500" />;
      case "Building2":
        return <Building2 className="w-7 h-7 text-sky-500" />;
      case "GraduationCap":
        return <GraduationCap className="w-7 h-7 text-indigo-500" />;
      case "Leaf":
        return <Leaf className="w-7 h-7 text-teal-500" />;
      case "Cpu":
        return <Cpu className="w-7 h-7 text-blue-500" />;
      case "Code2":
        return <Code2 className="w-7 h-7 text-purple-500" />;
      case "Sparkles":
        return <Sparkles className="w-7 h-7 text-amber-500" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-7 h-7 text-emerald-500" />;
      case "Network":
        return <Network className="w-7 h-7 text-indigo-500" />;
      case "Layers":
      default:
        return <Layers className="w-7 h-7 text-sky-500" />;
    }
  };

  return (
    <div
      className={`group relative bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-card-soft hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between ${domain.borderColor || "hover:border-sky-300 dark:hover:border-sky-500"} ${className}`}
    >
      {/* Top accent badge */}
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
          DOMAIN {domainNumberDisplay}
        </span>
        <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300 shadow-sm">
          {getIcon()}
        </div>
      </div>

      {/* Domain Title & Content */}
      <div className="mb-6 flex-1">
        <h3 className="font-heading font-black text-xl text-[#0b1d3a] dark:text-white tracking-tight mb-2 group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors">
          {domain.name}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
          {domain.shortDescription}
        </p>

        {/* Tags */}
        {(() => {
          const tagsList = Array.isArray(domain.tags)
            ? domain.tags
            : (domain as any).tag
              ? [(domain as any).tag]
              : [];
          if (tagsList.length === 0) return null;
          return (
            <div className="flex flex-wrap gap-1.5">
              {tagsList.map((tag: string) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium text-slate-600 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-transparent dark:border-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          );
        })()}
      </div>

      {/* View Problems Button */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => onSelectDomain(domain.id)}
          className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-bold text-[#0b1d3a] dark:text-white bg-slate-50 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 hover:text-sky-700 dark:hover:text-sky-300 border border-slate-200/80 dark:border-slate-700 hover:border-sky-200 transition-all duration-200 group-hover:shadow-sm"
        >
          <span>View Problems</span>
          <ArrowRight className="w-4 h-4 text-sky-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
