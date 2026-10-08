import React from "react";
import {
  CheckCircle2,
  Calendar,
  Users,
  AlertCircle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { eventData } from "../data/hackathonData";
import { useCms } from "../context/CmsContext";

export const Eligibility: React.FC = () => {
  const { registration } = useCms();
  const criteria = [
    {
      title: "Open to All UG Students",
      desc: "Currently enrolled Undergraduate students pursuing B.E., B.Tech, BCA, B.Sc, or equivalent degree programs.",
    },
    {
      title: "Students From Any College",
      desc: "Engineering, technology, and science colleges from across India are eligible to enter teams.",
    },
    {
      title: "Participants Across the Nation",
      desc: "National level scope welcoming inter-college and pan-India student participation.",
    },
    {
      title: "Team Size: 3–4 Members",
      desc: "Strictly 3 to 4 members per team. Cross-branch and multi-disciplinary teams encouraged.",
    },
    {
      title: "No Prior Coding Experience Mandatory",
      desc: "Enthusiasm and genuine interest in problem solving are the only prerequisites. All skill levels welcome.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#060d1a] relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Criteria Checkmarks */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950/60 text-emerald-300 mb-3 border border-emerald-500/30">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>PARTICIPATION GUIDELINES</span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                WHO CAN PARTICIPATE?
              </h2>
              <div className="w-16 h-1.5 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full mt-3 mb-6"></div>
            </div>

            <div className="space-y-3.5">
              {criteria.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md hover:border-emerald-500/40 transition-colors"
                >
                  <div className="p-1 rounded-full bg-emerald-950/80 text-emerald-400 flex-shrink-0 mt-0.5 border border-emerald-500/30">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm sm:text-base text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Registration Card & Deadline */}
          <div className="lg:col-span-5">
            <div className="relative max-w-md mx-auto">
              <div className="bg-gradient-to-br from-[#071329] via-[#0b1f44] to-[#122e5c] text-white rounded-3xl p-6 sm:p-8 border border-sky-400/30 shadow-2xl relative overflow-hidden">
                {/* Tech background element */}
                <div className="absolute inset-0 tech-grid-pattern opacity-20 pointer-events-none"></div>

                <div className="relative z-10 text-center space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-mono font-semibold uppercase">
                    <Calendar className="w-3.5 h-3.5 text-rose-400" />
                    <span>MANDATORY REGISTRATION</span>
                  </div>

                  <div>
                    <span className="text-xs uppercase font-mono text-slate-400 tracking-widest block mb-1">
                      REGISTRATION DEADLINE
                    </span>
                    <div className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
                      25 OCTOBER 2026
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-300">Registration Fee</span>
                      <strong className="text-white font-mono font-bold text-base">
                        ₹500 / Team
                      </strong>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-300">Team Size</span>
                      <strong className="text-sky-300 font-bold">
                        3–4 Members
                      </strong>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-300">Policy</span>
                      <span className="text-rose-300 text-xs font-medium">
                        Non-refundable
                      </span>
                    </div>
                  </div>

                  <a
                    href={
                      registration?.registrationUrl || eventData.registrationUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-heading font-extrabold text-sm text-white uppercase bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-xl shadow-rose-500/30 transition-all"
                  >
                    <span>REGISTER ON GOOGLE FORMS</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <p className="text-[11px] text-slate-400">
                    Official form hosted by Dept. of CSE, CIT Gubbi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
