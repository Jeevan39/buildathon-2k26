import React from "react";
import { Award } from "lucide-react";
import { associations } from "../data/hackathonData";

export const AssociationLogos: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-[#060d1a] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-mono font-bold tracking-widest text-sky-400 uppercase">
            <Award className="w-3.5 h-3.5 text-sky-400" />
            In Association With Official Technical Societies & Clubs
          </span>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto">
            Recognized national & international student chapters and technical
            bodies driving Buildathon 2.0
          </p>
        </div>

        {/* Association Badges Grid - 4 Columns for 4 Associations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {associations.map((assoc) => (
            <div
              key={assoc.name}
              className="bg-[#09152a] p-6 rounded-2xl border border-slate-800/90 shadow-md hover:border-sky-500/50 hover:shadow-xl hover:shadow-sky-500/5 transition-all text-center flex flex-col justify-between items-center group"
            >
              <div className="w-full flex flex-col items-center">
                {/* Logo Image housed in high-contrast crisp white badge with generous height so all emblems & text are clearly readable */}
                <div className="w-full h-28 sm:h-32 flex items-center justify-center mb-4 rounded-2xl bg-white p-4 shadow-sm border border-slate-200 group-hover:shadow-md transition-all duration-300">
                  <img
                    src={assoc.logoUrl}
                    alt={assoc.fullName}
                    className="max-h-20 sm:max-h-22 max-w-[90%] sm:max-w-[85%] w-auto h-auto object-contain select-none transition-transform group-hover:scale-105 duration-200"
                    loading="lazy"
                  />
                </div>
                <h4 className="font-heading font-bold text-sm sm:text-base text-white leading-snug">
                  {assoc.fullName}
                </h4>
              </div>

              <div className="text-xs text-slate-300 italic leading-relaxed mt-3.5 pt-3 border-t border-slate-800/80 w-full">
                {assoc.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
