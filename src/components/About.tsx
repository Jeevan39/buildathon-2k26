import React from "react";
import {
  ShieldCheck,
  Cpu,
  Code2,
  Sparkles,
  Trophy,
  Users,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { useCms } from "../context/CmsContext";
import { eventData } from "../data/hackathonData";

interface AboutProps {
  onLearnMore?: () => void;
  onOpenPosterModal?: () => void;
}

export const About: React.FC<AboutProps> = ({
  onLearnMore,
  onOpenPosterModal,
}) => {
  const { about, event, registration } = useCms();

  const sectionLabel =
    about?.sectionLabel || "Department of Computer Science & Engineering";
  const heading = about?.heading || "ABOUT BUILDATHON 2.0";
  const description =
    about?.description ||
    `Channabasaveshwara Institute of Technology, Department of Computer Science and Engineering, proudly presents ${event?.name || "Buildathon 2.0 – 2K26"} — a National Level Hackathon and a premier platform to innovate, collaborate, and compete!`;
  const supportingText =
    about?.supportingText ||
    `Join us on ${event?.datesFormatted || "30 & 31 October 2026"} at the CIT Campus to build intelligent, real-world solutions and showcase your skills over ${event?.durationHours || 24} hours. Open to all UG students, regardless of skill level — exciting prizes worth ${event?.prizePool || "₹30K"} await!`;
  const quote = about?.quote || "“Let’s build the future together.”";
  const organizingNote =
    about?.organizingNote ||
    "Organized in connection with KNEW-2K26 in association with ISTE, IEI, IEEE, SPARK-IT Technical Club, and the Institution’s Innovation Council.";
  const badges = about?.badges || [
    "National Level",
    "24-Hour Hackathon",
    "Open to All UG Students",
    "Prize Pool ₹30K",
  ];
  const cardTitle = about?.cardTitle || "Where Smart Minds Build";
  const cardHighlight = about?.cardHighlight || "Intelligent Solutions";
  const cardDescription =
    about?.cardDescription ||
    "Collaborate with passionate developers from across colleges nationwide. Choose from 5 multidisciplinary domains and transform high-impact concepts into working code.";
  return (
    <section
      id="about"
      className="py-16 md:py-24 bg-[#060d1a] relative overflow-hidden border-b border-slate-800"
    >
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-600/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-600/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT: About Text */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-950/60 text-sky-300 mb-3 border border-sky-500/30">
                <Code2 className="w-3.5 h-3.5 text-sky-400" />
                <span>{sectionLabel}</span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                {heading}
              </h2>
              <div className="w-16 h-1.5 bg-gradient-to-r from-sky-500 via-blue-600 to-rose-500 rounded-full mt-3 mb-6"></div>
            </div>

            {/* Official Description */}
            <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed">
              <p className="font-medium text-slate-100">{description}</p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {supportingText}
              </p>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-sky-300 font-heading font-semibold italic text-base">
                {quote}
              </div>
            </div>

            {/* Badges as specified */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {badges.map((badge: string, bIdx: number) => {
                const colors = [
                  "bg-blue-950/50 text-blue-300 border-blue-800/60 text-blue-400",
                  "bg-emerald-950/50 text-emerald-300 border-emerald-800/60 text-emerald-400",
                  "bg-amber-950/50 text-amber-300 border-amber-800/60 text-amber-400",
                  "bg-rose-950/50 text-rose-300 border-rose-800/60 text-rose-400",
                ];
                const cls = colors[bIdx % colors.length];
                return (
                  <span
                    key={badge}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border ${cls.split(" ").slice(0, 3).join(" ")}`}
                  >
                    <CheckCircle2
                      className={`w-3.5 h-3.5 ${cls.split(" ")[3]}`}
                    />
                    {badge}
                  </span>
                );
              })}
            </div>

            {/* Organizing note */}
            <p className="text-xs text-slate-400 pt-2 border-t border-slate-800">
              {organizingNote}
            </p>
          </div>

          {/* RIGHT: Modern Buildathon Visual / Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 via-blue-600 to-rose-500 rounded-3xl blur-md opacity-30"></div>

              {/* Institutional Card Container */}
              <div className="relative bg-[#071329] text-white rounded-3xl p-6 sm:p-8 border border-sky-400/30 shadow-2xl overflow-hidden">
                {/* Tech background elements */}
                <div className="absolute inset-0 tech-grid-pattern opacity-20 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-40 h-40 bg-sky-500/10 rounded-full blur-2xl pointer-events-none"></div>

                {/* Card Top Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                    <span className="font-mono text-xs uppercase tracking-widest text-sky-400 font-semibold">
                      EDITION {event?.edition || "2.0"} • 2K26
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                    {event?.datesFormatted || "OCT 30–31"}
                  </span>
                </div>

                {/* Card Content Highlight */}
                <div className="space-y-4">
                  <div className="text-xs text-sky-300 font-mono uppercase tracking-wider">
                    {event?.collegeName ||
                      "Channabasaveshwara Institute of Technology"}
                  </div>

                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                    {cardTitle}{" "}
                    <span className="text-rose-400">{cardHighlight}</span>
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {cardDescription}
                  </p>
                </div>

                {/* Micro specs table inside card */}
                <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-[10px] uppercase font-mono">
                      Team Composition
                    </div>
                    <div className="font-bold text-white mt-0.5">
                      {event?.teamSize || "3–4 Members"}
                    </div>
                  </div>
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-[10px] uppercase font-mono">
                      Total Rounds
                    </div>
                    <div className="font-bold text-white mt-0.5">
                      2 Evals + Finals
                    </div>
                  </div>
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-[10px] uppercase font-mono">
                      Registration Fee
                    </div>
                    <div className="font-bold text-sky-300 mt-0.5">
                      {event?.registrationFee || "₹500 / Team"}
                    </div>
                  </div>
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-[10px] uppercase font-mono">
                      Prize Pool
                    </div>
                    <div className="font-bold text-rose-400 mt-0.5">
                      {event?.prizePool
                        ? `${event.prizePool} Cash + Perks`
                        : "₹30K Cash + Perks"}
                    </div>
                  </div>
                </div>

                {/* Register Now button inside card */}
                <a
                  href={
                    registration?.registrationUrl ||
                    event?.registrationUrl ||
                    eventData.registrationUrl ||
                    "https://forms.gle/YN35pBeytcHqmPHj7"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-6 py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-rose-600/30 hover:shadow-lg hover:shadow-rose-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  <span>{registration?.buttonText || "REGISTER NOW"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
