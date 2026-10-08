import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  ExternalLink,
  Building2,
  Car,
  Bus,
  Train,
  Copy,
  Check,
  Compass,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { eventData } from "../data/hackathonData";

export const Venue: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const fullPostalAddress = `${eventData.college.name}, ${eventData.college.department}, ${eventData.college.campus}, ${eventData.college.road}, ${eventData.college.city}, ${eventData.college.district} – ${eventData.college.pincode}, ${eventData.college.state}, India`;

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(eventData.college.address)}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullPostalAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section
      id="venue"
      className="py-16 md:py-24 bg-[#060d1a] relative border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-950/60 text-sky-300 border border-sky-500/30 mb-3">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>EVENT VENUE & LOCATION</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            VENUE & CAMPUS ADDRESS
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-sky-500 via-rose-500 to-indigo-500 rounded-full mx-auto mt-3 mb-4"></div>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Hosted on the lush green, technology-driven campus of
            Channabasaveshwara Institute of Technology in Gubbi, Tumakuru.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Campus Overview & Transit Guides (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>CIT Campus Gubbi</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Karnataka, India
                </span>
              </div>

              <div>
                <h3 className="font-heading font-black text-2xl text-white leading-tight mb-1.5">
                  {eventData.college.name}
                </h3>
                <p className="text-xs font-heading font-bold text-sky-400 uppercase tracking-wider mb-2">
                  {eventData.college.department}
                </p>
                <span className="inline-block text-[11px] font-mono font-medium text-slate-300 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700 mb-4">
                  {eventData.college.accreditation}
                </span>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  The national 24-hour hackathon will take place within the
                  state-of-the-art computer labs, high-speed Wi-Fi research
                  centers, and air-conditioned auditoriums of the CSE
                  department.
                </p>
              </div>

              {/* Transit & Commute Highlights */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-sky-400" />
                  <span>Transit & Commute Access</span>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300">
                    <div className="p-2 rounded-lg bg-sky-950/80 text-sky-400 flex-shrink-0 mt-0.5 border border-sky-800/60">
                      <Car className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-white block font-heading font-bold">
                        Highway Access (NH 206)
                      </strong>
                      <span>
                        Directly situated on <strong>NH 206 (B.H. Road)</strong>
                        . Easy highway drive from Bengaluru via Nelamangala &
                        Tumakuru bypass.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300">
                    <div className="p-2 rounded-lg bg-indigo-950/80 text-indigo-400 flex-shrink-0 mt-0.5 border border-indigo-800/60">
                      <Bus className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-white block font-heading font-bold">
                        KSRTC & Inter-City Buses
                      </strong>
                      <span>
                        Frequent KSRTC express and local buses operate between
                        Tumakuru and Gubbi/Tiptur/Shimoga, stopping right at the{" "}
                        <strong>CIT Main Campus Gate</strong>.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300">
                    <div className="p-2 rounded-lg bg-teal-950/80 text-teal-400 flex-shrink-0 mt-0.5 border border-teal-800/60">
                      <Train className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-white block font-heading font-bold">
                        Rail Connectivity
                      </strong>
                      <span>
                        Gubbi Railway Station is just 3 km away. Tumakuru
                        Junction (18 km) connects to major trains nationwide
                        with frequent buses and autos.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* External Navigation Button */}
            <div className="pt-6 mt-6 border-t border-slate-800">
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl font-heading font-extrabold text-xs sm:text-sm text-white uppercase bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 shadow-md shadow-sky-600/20 hover:shadow-lg transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>OPEN DIRECTIONS IN MAPS APP</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Detailed Official College Address Card (Replacing Google Site Map) */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#071329] via-[#0b1f44] to-[#102d5a] rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
            {/* Background ambient decorative glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 space-y-6">
              {/* Header Badge & Copy Button */}
              <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-white/10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  <Building2 className="w-3.5 h-3.5 text-sky-300" />
                  <span>OFFICIAL POSTAL ADDRESS</span>
                </div>
                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer shadow-xs active:scale-95"
                  title="Copy full postal address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Address Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-300" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>

              {/* Main Institution & Address Content */}
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-sky-400 font-bold block mb-1">
                    Host Institution
                  </span>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                    {eventData.college.name}
                  </h3>
                  <p className="text-sm text-slate-300 font-mono mt-1">
                    {eventData.college.department}
                  </p>
                </div>

                {/* Structured Address Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                      Campus & Road
                    </span>
                    <p className="font-heading font-bold text-sm text-white">
                      {eventData.college.campus}
                    </p>
                    <p className="text-xs text-sky-200 mt-0.5">
                      {eventData.college.road}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                      City & Taluk
                    </span>
                    <p className="font-heading font-bold text-sm text-white">
                      {eventData.college.city}
                    </p>
                    <p className="text-xs text-sky-200 mt-0.5">
                      Tumkur (Tumakuru) District
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                      State & Country
                    </span>
                    <p className="font-heading font-bold text-sm text-white">
                      {eventData.college.state}, India
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5 font-mono">
                      PIN Code: <strong>{eventData.college.pincode}</strong>
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                      Highway Landmark
                    </span>
                    <p className="font-heading font-bold text-sm text-white">
                      NH 206 Highway Facing
                    </p>
                    <p className="text-xs text-emerald-300 mt-0.5">
                      CIT Main Campus Gate
                    </p>
                  </div>
                </div>

                {/* Distance Key Indicators */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-sky-300 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-sky-400" />
                    <span>Approximate Distances to Venue</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <div className="font-heading font-black text-lg text-white">
                        ~18 km
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                        from Tumakuru
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <div className="font-heading font-black text-lg text-white">
                        ~85 km
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                        from Bengaluru
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <div className="font-heading font-black text-lg text-white">
                        ~3 km
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                        from Gubbi Rly Stn
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Note & Quick Copy Action */}
            <div className="relative z-10 pt-4 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-mono text-[11px]">
                  Campus Entry: Physical college student ID is compulsory.
                </span>
              </div>
              <button
                onClick={handleCopyAddress}
                className="text-xs font-mono font-bold text-sky-300 hover:text-white transition-colors flex items-center gap-1 flex-shrink-0 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>
                  {copied ? "Address Copied!" : "Click to Copy Address"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
