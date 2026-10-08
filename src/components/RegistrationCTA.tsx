import React from "react";
import {
  ExternalLink,
  QrCode,
  Calendar,
  Users,
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useCms } from "../context/CmsContext";
import { eventData } from "../data/hackathonData";

export const RegistrationCTA: React.FC = () => {
  const { registration, event } = useCms();

  const regStatus = registration?.status
    ? `REGISTRATION ${registration.status}`
    : "REGISTRATION OPEN";
  const eventName = event?.name || "BUILDATHON 2.0 – 2K26";
  const feeLabel =
    registration?.feePerTeam || event?.registrationFee || "₹500 / Team";
  const teamSize =
    registration?.teamSizeLabel || event?.teamSize || "3–4 Members";
  const deadline =
    registration?.deadline ||
    event?.registrationDeadline ||
    "25th October, 2026";
  const regUrl =
    registration?.registrationUrl ||
    event?.registrationUrl ||
    eventData.registrationUrl;
  const btnText = registration?.buttonText || "REGISTER ON GOOGLE FORMS";
  const policyNote =
    registration?.policyNote ||
    "The registration fee is non-refundable. College ID is compulsory for all members.";

  return (
    <section
      id="register"
      className="py-16 md:py-24 bg-gradient-to-br from-[#071329] via-[#0b1f44] to-[#0e2c5e] text-white relative overflow-hidden border-b border-sky-950"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 tech-grid-pattern opacity-15 pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl rounded-3xl border border-sky-400/30 p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="md:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-mono font-semibold uppercase">
                <Calendar className="w-3.5 h-3.5 text-rose-400" />
                <span>{regStatus}</span>
              </div>

              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                REGISTER FOR <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-300 to-rose-400">
                  {eventName}
                </span>
              </h2>

              <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10">
                  <IndianRupee className="w-4 h-4 text-amber-400" />
                  <span>
                    <strong>{feeLabel}</strong> (Non-refundable)
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10">
                  <Users className="w-4 h-4 text-sky-400" />
                  <span>
                    <strong>{teamSize}</strong> per Team
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-200 flex items-center gap-2">
                <span className="font-mono font-bold uppercase text-white">
                  LAST DATE FOR REGISTRATION:
                </span>
                <span className="font-bold underline text-white">
                  {deadline}
                </span>
              </div>

              {/* Primary Form CTA Button */}
              <div className="pt-2">
                <a
                  href={regUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-heading font-extrabold text-base text-white uppercase bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-xl shadow-rose-500/30 hover:shadow-rose-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  <span>{btnText}</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>

              <p className="text-[11px] text-slate-400">
                Opens the official Google Form in a new tab. Ensure all 3–4 team
                members' details and IDs are ready.
              </p>
            </div>

            {/* Right: Scan to Register QR Box matching official poster page 12 */}
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
              <div className="bg-white p-4 rounded-2xl shadow-xl border-4 border-sky-400/40 max-w-[210px] w-full">
                <div className="w-full aspect-square bg-slate-900 rounded-xl p-2.5 flex flex-col items-center justify-center relative overflow-hidden group">
                  {/* Clean SVG QR Code Representation */}
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full text-white"
                    fill="currentColor"
                  >
                    {/* Corner anchors */}
                    <rect x="10" y="10" width="28" height="28" rx="4" />
                    <rect
                      x="14"
                      y="14"
                      width="20"
                      height="20"
                      rx="2"
                      fill="#0b1d3a"
                    />
                    <rect
                      x="18"
                      y="18"
                      width="12"
                      height="12"
                      rx="1"
                      fill="#38bdf8"
                    />

                    <rect x="62" y="10" width="28" height="28" rx="4" />
                    <rect
                      x="66"
                      y="14"
                      width="20"
                      height="20"
                      rx="2"
                      fill="#0b1d3a"
                    />
                    <rect
                      x="70"
                      y="18"
                      width="12"
                      height="12"
                      rx="1"
                      fill="#38bdf8"
                    />

                    <rect x="10" y="62" width="28" height="28" rx="4" />
                    <rect
                      x="14"
                      y="66"
                      width="20"
                      height="20"
                      rx="2"
                      fill="#0b1d3a"
                    />
                    <rect
                      x="18"
                      y="70"
                      width="12"
                      height="12"
                      rx="1"
                      fill="#38bdf8"
                    />

                    {/* Data dots */}
                    <rect x="44" y="12" width="6" height="6" fill="#f43f5e" />
                    <rect x="52" y="12" width="6" height="6" fill="#ffffff" />
                    <rect x="44" y="24" width="6" height="6" fill="#ffffff" />
                    <rect x="52" y="32" width="6" height="6" fill="#38bdf8" />
                    <rect
                      x="44"
                      y="44"
                      width="12"
                      height="12"
                      rx="2"
                      fill="#38bdf8"
                    />
                    <rect x="12" y="44" width="6" height="6" fill="#ffffff" />
                    <rect x="24" y="44" width="6" height="6" fill="#f43f5e" />
                    <rect x="64" y="44" width="8" height="8" fill="#ffffff" />
                    <rect x="78" y="44" width="6" height="6" fill="#38bdf8" />
                    <rect x="44" y="64" width="6" height="6" fill="#ffffff" />
                    <rect x="52" y="72" width="6" height="6" fill="#f43f5e" />
                    <rect x="64" y="64" width="10" height="10" fill="#ffffff" />
                    <rect x="78" y="78" width="8" height="8" fill="#38bdf8" />
                  </svg>
                </div>
                <div className="mt-2 text-[10px] font-mono font-bold text-slate-700 uppercase tracking-wider">
                  SCAN TO REGISTER
                </div>
              </div>

              <div className="mt-3 text-xs text-slate-300">
                Or access directly via URL
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
