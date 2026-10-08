import React, { useEffect } from "react";
import { X, Download, ExternalLink, Sparkles, ZoomIn } from "lucide-react";
import { useCms } from "../context/CmsContext";

interface OfficialPosterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfficialPosterModal: React.FC<OfficialPosterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { media, event } = useCms();
  const posterSrc = media?.activePosterUrl || "/official_poster.png";
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 text-center">
        <div className="relative w-full max-w-4xl transform overflow-hidden rounded-3xl bg-[#081326] text-left shadow-2xl transition-all border border-sky-400/40">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-[#0c1e3d]">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <div>
                <h3 className="font-heading font-black text-sm sm:text-base text-white">
                  Official Buildathon Poster
                </h3>
                <span className="text-[10px] font-mono text-slate-400">
                  Department of Computer Science and Engineering, CIT Gubbi
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={posterSrc}
                download="Buildathon-Official-Poster.png"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/30 text-xs font-mono transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Poster Image Container */}
          <div className="p-3 sm:p-6 flex items-center justify-center bg-slate-950/50 max-h-[80vh] overflow-y-auto">
            <img
              src={posterSrc}
              alt="Buildathon Official Event Poster"
              className="max-h-[72vh] w-auto object-contain rounded-xl shadow-2xl border border-slate-800"
            />
          </div>

          {/* Footer note */}
          <div className="p-4 border-t border-slate-800 bg-[#0c1e3d] flex items-center justify-between text-xs text-slate-400">
            <span className="truncate">
              CIT Campus • 30 & 31 October 2026 • 24 Hours • ₹30K Prize Pool
            </span>
            <a
              href="https://forms.gle/YN35pBeytcHqmPHj7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-400 font-bold hover:underline flex items-center gap-1 flex-shrink-0"
            >
              <span>Register Now</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
