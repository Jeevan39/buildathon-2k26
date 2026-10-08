import React from "react";
import {
  Clock,
  Trophy,
  Users,
  Globe,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useCms } from "../context/CmsContext";

export const Stats: React.FC = () => {
  const cms = useCms();

  const getIconComponent = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case "trophy":
      case "award":
        return Trophy;
      case "users":
      case "user":
        return Users;
      case "globe":
      case "map":
        return Globe;
      case "clock":
      case "time":
      default:
        return Clock;
    }
  };

  const getStyleProps = (index: number) => {
    const styles = [
      {
        accentBg: "bg-sky-50 text-sky-600",
        badge: "Intensive",
        glow: "group-hover:border-sky-300",
      },
      {
        accentBg: "bg-rose-50 text-rose-600",
        badge: "Worth",
        glow: "group-hover:border-rose-300",
      },
      {
        accentBg: "bg-indigo-50 text-indigo-600",
        badge: "Per Team",
        glow: "group-hover:border-indigo-300",
      },
      {
        accentBg: "bg-emerald-50 text-emerald-600",
        badge: "Pan-India",
        glow: "group-hover:border-emerald-300",
      },
    ];
    return styles[index % styles.length];
  };

  const activeStats = (cms.stats || [])
    .filter((s: any) => s.active !== false)
    .sort((a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0));

  const itemsToRender =
    activeStats.length > 0
      ? activeStats
      : [
          {
            number: "24 HOURS",
            label: "Hackathon Duration",
            subtext: "Non-stop engineering & problem solving",
            icon: "Clock",
          },
          {
            number: "₹30K",
            label: "Prize Pool",
            subtext: "Cash rewards, awards & recognitions",
            icon: "Trophy",
          },
          {
            number: "3–4",
            label: "Team Members",
            subtext: "Collaborative squad innovation",
            icon: "Users",
          },
          {
            number: "NATIONAL",
            label: "Hackathon Scope",
            subtext: "Open to all UG students across India",
            icon: "Globe",
          },
        ];

  return (
    <section className="relative py-16 md:py-20 bg-[#081224] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {itemsToRender.map((stat: any, index: number) => {
            const Icon = getIconComponent(stat.icon);
            const style = getStyleProps(index);
            return (
              <div
                key={stat.id || stat.label || index}
                className={`group relative bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl hover:-translate-y-1 transition-all duration-300 ${style.glow}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl ${style.accentBg} transition-transform group-hover:scale-110 duration-200`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700/60">
                    {style.badge}
                  </span>
                </div>

                <div className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight mb-1">
                  {stat.number || stat.value}
                </div>

                <div className="font-heading font-bold text-sm text-slate-200 mb-1">
                  {stat.label}
                </div>

                <div className="text-xs text-slate-400 leading-relaxed">
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
