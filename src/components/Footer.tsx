import React from "react";
import {
  ExternalLink,
  Phone,
  MapPin,
  Mail,
  ArrowUp,
  Sparkles,
  Shield,
} from "lucide-react";
import { InstagramIcon } from "./InstagramIcon";
import {
  eventData,
  facultyCoordinators as defaultFaculty,
  studentCoordinators as defaultStudents,
} from "../data/hackathonData";
import { useCms } from "../context/CmsContext";

interface FooterProps {
  onNavigate: (tabId: string) => void;
  onOpenPosterModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPosterModal,
}) => {
  const { event, hero, navbar, registration, coordinators } = useCms();

  const collegeName =
    event?.collegeName || "Channabasaveshwara Institute of Technology";
  const eventName = event?.name || "BUILDATHON 2.0 – 2K26";
  const tagline = hero?.tagline || "INNOVATE. CODE. IMPACT.";
  const regUrl =
    registration?.registrationUrl ||
    event?.registrationUrl ||
    eventData.registrationUrl;
  const deadline =
    registration?.deadline || event?.registrationDeadline || "25 Oct 2026";
  const feeText =
    registration?.feePerTeam || event?.registrationFee || "₹500 / Team";
  const facultyList = Array.isArray(coordinators)
    ? coordinators.filter(
        (c: any) =>
          c.category?.toUpperCase() === "FACULTY" ||
          c.category?.toUpperCase() === "MANAGEMENT" ||
          c.role?.toLowerCase().includes("faculty") ||
          c.role?.toLowerCase().includes("convener"),
      )
    : [];
  const studentList = Array.isArray(coordinators)
    ? coordinators.filter(
        (c: any) =>
          c.category?.toUpperCase() === "STUDENT" ||
          c.role?.toLowerCase().includes("student"),
      )
    : [];
  const contactList =
    facultyList.length > 0
      ? facultyList
      : studentList.length > 0
        ? studentList
        : Array.isArray(coordinators)
          ? coordinators
          : [];
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#071224] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-white text-lg tracking-tight">
                  CIT GUBBI
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 uppercase tracking-wider">
                  CSE DEPT
                </span>
              </div>
              <span className="text-xs text-slate-400 font-medium mt-0.5">
                {collegeName}
              </span>
            </div>

            <div className="pt-2">
              <h3 className="font-heading font-black text-2xl text-white tracking-tight">
                {eventName}
              </h3>
              <p className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-slate-400 mt-1">
                {tagline}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              National Level 24-Hour Hackathon organized by Department of
              Computer Science & Engineering, {collegeName}.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={eventData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 text-rose-400 border border-slate-700 hover:border-rose-400/40 text-xs font-mono transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>{eventData.social.instagramHandle}</span>
              </a>

              {onOpenPosterModal && (
                <button
                  onClick={onOpenPosterModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-sky-500/20 text-sky-300 border border-slate-700 hover:border-sky-400/40 text-xs font-mono transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Official Poster</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-slate-200">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {(navbar && navbar.length > 0
                ? navbar.filter((n: any) => n.enabled)
                : [
                    { target: "home", label: "Home" },
                    { target: "about", label: "About Buildathon" },
                    { target: "domains", label: "5 Core Domains" },
                    { target: "problems", label: "Problem Statements" },
                    { target: "event-flow", label: "Event Flow & Schedule" },
                    { target: "rules", label: "Rules & Regulations" },
                    { target: "prizes", label: "₹30K Prize Pool" },
                    { target: "faq", label: "Frequently Asked Questions" },
                    { target: "contact", label: "Contact Coordinators" },
                  ]
              ).map((link: any) => (
                <li key={link.target || link.id}>
                  <button
                    onClick={() => onNavigate(link.target || link.id)}
                    className="hover:text-sky-400 transition-colors text-slate-400 hover:underline"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Registration (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-slate-200">
              Official Registration
            </h4>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="text-xs text-slate-300">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">
                  Status:
                </span>
                <span className="font-bold text-white">
                  Registrations Open (Closes {deadline})
                </span>
              </div>
              <div className="text-xs text-slate-300">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">
                  Fee:
                </span>
                <span className="font-bold text-emerald-400 font-mono">
                  {feeText} (3–4 Members)
                </span>
              </div>
              <a
                href={regUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-heading font-bold text-xs text-white uppercase bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-sm transition-all"
              >
                <span>OPEN OFFICIAL GOOGLE FORM</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="pt-2">
              <h5 className="font-heading font-semibold text-xs text-slate-300 mb-2">
                {facultyList.length > 0
                  ? "Faculty Conveners:"
                  : "Event Coordinators:"}
              </h5>
              <div className="space-y-1 text-xs text-slate-400 font-mono">
                {contactList.slice(0, 2).map((fc: any) => (
                  <div
                    key={fc.name}
                    className="flex items-center justify-between"
                  >
                    <span>{fc.name}</span>
                    {fc.phone && (
                      <a
                        href={`tel:${fc.phone}`}
                        className="text-sky-400 hover:underline"
                      >
                        {fc.formattedPhone || fc.phone}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="text-center sm:text-left">
            <p className="font-medium text-slate-300">
              © 2026 Channabasaveshwara Institute of Technology. All Rights
              Reserved.
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              NH 206 (B.H. Road), Gubbi, Tumkur – 572216, Karnataka • Dept. of
              CSE
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
