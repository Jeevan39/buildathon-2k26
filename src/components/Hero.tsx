import React from "react";
import { Countdown } from "./Countdown";
import {
  ArrowRight,
  ExternalLink,
  Calendar,
  MapPin,
  Clock,
  Trophy,
  Sparkles,
  Shield,
  Cpu,
  Terminal,
} from "lucide-react";
import { useCms } from "../context/CmsContext";
import { eventData } from "../data/hackathonData";

interface HeroProps {
  onExploreClick: () => void;
  onOpenPosterModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onOpenPosterModal,
}) => {
  const { hero, event } = useCms();

  const smallLabel =
    hero?.smallLabel ||
    "Channabasaveshwara Institute of Technology, Gubbi, Tumkur";
  const title = hero?.title || "BUILDATHON";
  const editionBadge = hero?.editionBadge || "2.0";
  const yearBadge = hero?.yearBadge || "2K26";
  const subtitle =
    hero?.subtitle ||
    "Department of Computer Science & Engineering • In Connection with KNEW-2K26";
  const tagline = hero?.tagline || "INNOVATE • CODE • IMPACT";
  const description =
    hero?.description ||
    "Building Intelligent Solutions for a Smarter, Sustainable & Secure Tomorrow";
  const primaryBtnText = hero?.primaryButtonText || "REGISTER NOW";
  const primaryBtnUrl =
    hero?.primaryButtonUrl ||
    event?.registrationUrl ||
    eventData.registrationUrl;
  const secondaryBtnText = hero?.secondaryButtonText || "EXPLORE HACKATHON";
  const showCountdown = hero?.showCountdown !== false;

  const datesFormatted = event?.datesFormatted || "30 & 31 Oct 2026";
  const venueDisplay = event?.venueName
    ? `${event.venueName}${event.locationCity ? `, ${event.locationCity}` : ""}`
    : "CIT Campus, Gubbi";
  const durationText = event?.durationHours
    ? `${event.durationHours} Hours Non-Stop`
    : "24 Hours Non-Stop";
  const prizePoolText = event?.prizePool
    ? `${event.prizePool} Worth`
    : "₹30K Worth";

  const departmentName =
    event?.department ||
    eventData.college.department ||
    "Department of Computer Science and Engineering";

  const inConnectionWithRaw =
    event?.inConnectionWith || eventData.connectionWith || "Knew-2K26";

  const inConnectionWithText = inConnectionWithRaw
    .toLowerCase()
    .startsWith("in connection")
    ? inConnectionWithRaw
    : `In connection with ${inConnectionWithRaw}`;
  return (
    <section className="relative overflow-hidden hero-mesh-gradient pt-12 pb-16 md:pt-16 md:pb-24 border-b border-slate-800">
      {/* Background Tech Elements: Grids, Nodes, Circuit traces */}
      <div className="absolute inset-0 tech-grid-pattern opacity-60 pointer-events-none"></div>

      {/* Decorative floating circuits & subtle node circles */}
      <div className="absolute top-12 left-10 w-72 h-72 rounded-full bg-sky-300/10 blur-3xl pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-rose-400/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Institutional Department Header pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs md:text-sm font-medium mb-3.5">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
            <span>{smallLabel}</span>
          </div>

          {/* National Level Hackathon Badge */}
          <div className="flex items-center justify-center gap-2 mb-2.5">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-widest bg-gradient-to-r from-sky-500/15 via-blue-500/15 to-indigo-500/15 dark:from-sky-950/70 dark:via-blue-950/70 dark:to-indigo-950/70 text-sky-900 dark:text-sky-200 border border-sky-300/40 dark:border-sky-500/40 shadow-xs">
              <Shield className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              NATIONAL LEVEL HACKATHON
            </span>
          </div>

          {/* Department of Computer Science and Engineering */}
          <div className="flex items-center justify-center mb-2">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 border border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-300 text-xs sm:text-sm font-semibold shadow-xs">
              <Cpu
                className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 animate-spin"
                style={{ animationDuration: "10s" }}
              />
              <span>{departmentName}</span>
            </span>
          </div>

          {/* After that: In connection with Knew-2K26 */}
          <div className="flex items-center justify-center mb-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs sm:text-[13px] font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
              <span>{inConnectionWithText}</span>
            </span>
          </div>

          {/* Main Title: dynamic from CMS */}
          <h1 className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#0b1d3a] dark:text-white mb-2 leading-[1.05]">
            {title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-800 dark:from-sky-400 dark:via-blue-400 dark:to-indigo-300">
              {editionBadge}
            </span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600 dark:from-rose-400 dark:to-pink-400 font-black">
              {yearBadge}
            </span>
          </h1>

          {/* Official Tagline */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 my-3 text-xs sm:text-sm md:text-base font-heading font-extrabold tracking-[0.25em] text-slate-600 dark:text-slate-300 uppercase">
            <span className="text-[#0b1d3a] dark:text-white">INNOVATE</span>
            <span className="text-sky-500">•</span>
            <span className="text-sky-700 dark:text-sky-400">CODE</span>
            <span className="text-rose-500">•</span>
            <span className="text-rose-600 dark:text-rose-400">IMPACT</span>
          </div>

          {/* Official Theme Card: High Visibility & Prominent Font */}
          <div className="relative max-w-3xl mx-auto my-6 p-5 sm:p-7 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-2 border-sky-400/40 dark:border-sky-500/50 shadow-lg dark:shadow-[0_0_30px_rgba(56,189,248,0.2)] transition-all">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-black uppercase tracking-widest bg-sky-100 dark:bg-sky-950/90 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-500/50 mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>OFFICIAL THEME</span>
            </div>
            <p className="font-heading font-black text-slate-900 dark:text-white text-base sm:text-lg md:text-xl lg:text-2xl leading-snug drop-shadow-xs">
              “{description.replace(/^“|”$/g, "")}”
            </p>
          </div>

          {/* 4 Core Pillars Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-3xl mx-auto my-6 text-left">
            <div className="bg-white/90 dark:bg-slate-900/90 rounded-xl p-3 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">
                  Dates
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-[#0b1d3a] dark:text-white">
                  {datesFormatted}
                </div>
              </div>
            </div>

            <div className="bg-white/90 dark:bg-slate-900/90 rounded-xl p-3 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">
                  Venue
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-[#0b1d3a] dark:text-white">
                  {venueDisplay}
                </div>
              </div>
            </div>

            <div className="bg-white/90 dark:bg-slate-900/90 rounded-xl p-3 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">
                  Duration
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-[#0b1d3a] dark:text-white">
                  {durationText}
                </div>
              </div>
            </div>

            <div className="bg-white/90 dark:bg-slate-900/90 rounded-xl p-3 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">
                  Prize Pool
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-rose-600 dark:text-rose-400">
                  {prizePoolText}
                </div>
              </div>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-7 mb-9">
            <a
              href={primaryBtnUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-heading font-extrabold text-sm md:text-base tracking-wide text-white uppercase bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-xl shadow-rose-500/30 hover:shadow-rose-500/40 hover:-translate-y-0.5 transition-all"
            >
              <span>{primaryBtnText}</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-heading font-bold text-sm md:text-base tracking-wide text-slate-800 dark:text-white bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 shadow-sm hover:shadow transition-all"
            >
              <span>{secondaryBtnText}</span>
              <ArrowRight className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            </button>

            {onOpenPosterModal && (
              <button
                onClick={onOpenPosterModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-heading font-semibold text-xs md:text-sm text-sky-700 dark:text-sky-300 bg-sky-50/80 dark:bg-sky-950/40 hover:bg-sky-100/90 dark:hover:bg-sky-900/50 border border-sky-200 dark:border-sky-500/30 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <span>View Official Poster</span>
              </button>
            )}
          </div>

          {/* Real-Time Countdown Timer */}
          {showCountdown && (
            <div className="pt-2">
              <Countdown />
            </div>
          )}
        </div>
      </div>

      {/* Abstract city silhouette at bottom matching poster theme */}
      <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-slate-200/50 dark:from-[#060d1a] to-transparent pointer-events-none"></div>
    </section>
  );
};
