import React from "react";
import { chiefPatrons as defaultChiefPatrons } from "../data/hackathonData";
import { User, Award, Shield, Sparkles } from "lucide-react";
import { useCms } from "../context/CmsContext";

export const PatronCard: React.FC = () => {
  const cms = useCms();
  const patronList = Array.isArray(cms.patrons)
    ? cms.patrons.filter((p: any) => p.status !== "DRAFT")
    : [];

  return (
    <section
      id="patrons"
      className="py-16 md:py-24 bg-[#060d1a] relative border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-950/60 text-sky-300 border border-sky-500/30 mb-3">
            <Award className="w-3.5 h-3.5 text-sky-400" />
            <span>INSTITUTIONAL LEADERSHIP</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            CHIEF PATRONS & LEADERSHIP
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-sky-500 via-rose-500 to-indigo-500 rounded-full mx-auto mt-3 mb-4"></div>
          <p className="text-slate-300 text-sm sm:text-base italic leading-relaxed">
            “With heartfelt gratitude to our generous patrons, whose invaluable
            support has made this event possible.”
          </p>
        </div>

        {/* Patrons Grid: Dynamic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {patronList.map((patron: any) => (
            <div
              key={patron.id || patron.name}
              className="bg-slate-900/90 hover:bg-slate-900 rounded-3xl p-6 border border-slate-800 hover:border-sky-500/40 shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
            >
              {/* Photo Display: Uploaded image if exists, else the official photo placeholder */}
              <div className="relative mb-5">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-[#0b1d3a] to-[#1e3a8a] p-1 shadow-md group-hover:scale-105 transition-transform duration-300">
                  {patron.imageUrl || patron.image || patron.photo ? (
                    <img
                      src={patron.imageUrl || patron.image || patron.photo}
                      alt={patron.name}
                      className="w-full h-full rounded-[14px] object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-[14px] bg-[#0c1e3d] flex flex-col items-center justify-center text-slate-300 relative overflow-hidden">
                      <User className="w-10 h-10 text-sky-400/80 mb-1" />
                      <span className="text-[9px] font-mono tracking-wider text-slate-400 uppercase">
                        OFFICIAL PHOTO
                      </span>
                    </div>
                  )}
                </div>
                {/* Role Pill */}
                <span className="absolute -bottom-2 inset-x-0 mx-auto w-max px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-slate-800 text-sky-300 border border-slate-700 shadow-xs">
                  {patron.category}
                </span>
              </div>

              {/* Name */}
              <h3 className="font-heading font-black text-lg text-white mt-2 mb-1 group-hover:text-sky-300 transition-colors">
                {patron.name}
              </h3>

              {/* Role */}
              <p className="font-medium text-xs sm:text-sm text-slate-200 mb-1.5">
                {patron.role}
              </p>

              {/* Designation */}
              <p className="text-xs text-slate-400 leading-snug">
                {patron.designation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
