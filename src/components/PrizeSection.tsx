import React from "react";
import {
  Trophy,
  Gift,
  Award,
  Sparkles,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { eventData } from "../data/hackathonData";

export const PrizeSection: React.FC = () => {
  return (
    <section
      id="prizes"
      className="py-16 md:py-24 bg-gradient-to-b from-[#071329] via-[#0b1f44] to-[#071329] text-white relative overflow-hidden border-b border-sky-950"
    >
      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute inset-0 tech-grid-pattern opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-rose-500/20 text-rose-300 border border-rose-500/30 mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>REWARDS & RECOGNITION</span>
          </div>

          <h2 className="font-heading font-black text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none mb-3">
            ₹30K{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-400 to-pink-400">
              PRIZE POOL
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mt-4">
            Celebrating technical ingenuity, practical implementation, and
            social impact across all 5 competition domains.
          </p>
        </div>

        {/* 3 Tier Prize Category Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          {/* Card 1: Cash Rewards */}
          <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="w-7 h-7 text-amber-400" />
              </div>
              <span className="text-[11px] font-mono text-amber-300 font-bold uppercase tracking-wider block mb-1">
                Primary Accolades
              </span>
              <h3 className="font-heading font-black text-2xl text-white mb-2">
                Cash Rewards
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Direct cash prizes awarded to top performing teams demonstrating
                outstanding innovation, execution, and presentation.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-amber-300 font-mono font-medium">
              ★ ₹30,000 Total Pool
            </div>
          </div>

          {/* Card 2: Goodies & Trophies */}
          <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-rose-400/50 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-rose-400/15 border border-rose-400/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Gift className="w-7 h-7 text-rose-400" />
              </div>
              <span className="text-[11px] font-mono text-rose-300 font-bold uppercase tracking-wider block mb-1">
                Perks & Swag
              </span>
              <h3 className="font-heading font-black text-2xl text-white mb-2">
                Goodies & Kits
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Exclusive commemorative merchandise, hacker stickers, technical
                club kits, and sponsor accessories.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-rose-300 font-mono font-medium">
              ★ Swag Kits for Finalists
            </div>
          </div>

          {/* Card 3: E-Certificates & Honors */}
          <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-sky-400/50 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-sky-400/15 border border-sky-400/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7 text-sky-400" />
              </div>
              <span className="text-[11px] font-mono text-sky-300 font-bold uppercase tracking-wider block mb-1">
                National Credential
              </span>
              <h3 className="font-heading font-black text-2xl text-white mb-2">
                E-Certificates
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Official institutional certificates of participation and merit
                verified by CIT Gubbi & partner technical societies.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-sky-300 font-mono font-medium">
              ★ Awarded to All Teams
            </div>
          </div>
        </div>

        {/* Note on distribution transparency */}
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-white/5 border border-white/10 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 text-sky-400 flex-shrink-0" />
          <span>
            Detailed category-wise cash prize allocations will be announced
            during the Inaugural Ceremony by the Organizers.
          </span>
        </div>
      </div>
    </section>
  );
};
