import React from "react";
import {
  ShieldCheck,
  FileCheck,
  Sparkles,
  Compass,
  AlertOctagon,
  UserCheck,
} from "lucide-react";
import { codeOfConductItems } from "../data/hackathonData";

export const CodeOfConduct: React.FC = () => {
  const getConductIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-sky-600" />;
      case "FileCheck":
        return <FileCheck className="w-6 h-6 text-emerald-600" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-teal-600" />;
      case "Compass":
        return <Compass className="w-6 h-6 text-indigo-600" />;
      case "AlertOctagon":
        return <AlertOctagon className="w-6 h-6 text-rose-600" />;
      case "IdCard":
        return <UserCheck className="w-6 h-6 text-amber-600" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-sky-600" />;
    }
  };

  return (
    <section
      id="code-of-conduct"
      className="py-16 md:py-24 bg-[#060d1a] relative border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-950/60 text-rose-300 border border-rose-500/30 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
            <span>INSTITUTIONAL INTEGRITY</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            CODE OF CONDUCT
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-500 via-sky-500 to-indigo-500 rounded-full mx-auto mt-3 mb-4"></div>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            All attendees, hackers, mentors, and staff are expected to uphold
            the highest standards of ethics, mutual respect, and collegiate
            sportsmanship.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {codeOfConductItems.map((item, index) => (
            <div
              key={item.title}
              className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 hover:border-sky-500/40 shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 shadow-xs">
                  {getConductIcon(item.icon)}
                </div>
                <h3 className="font-heading font-bold text-base sm:text-lg text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500">
                Rule Item #{index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* College ID Compulsory Callout */}
        <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-sky-900 to-blue-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-base">
                Mandatory Verification
              </h4>
              <p className="text-xs text-slate-300">
                Physical college ID is compulsory for entry into the CIT Campus
                and during all evaluation rounds.
              </p>
            </div>
          </div>
          <span className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-rose-500 text-white flex-shrink-0">
            Strict Policy
          </span>
        </div>
      </div>
    </section>
  );
};
