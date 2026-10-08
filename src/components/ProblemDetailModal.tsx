import React, { useEffect } from "react";
import { ProblemStatement, getProblemDatasets } from "../data/hackathonData";
import {
  X,
  AlertTriangle,
  CheckCircle2,
  Shield,
  Layers,
  BookOpen,
  Cpu,
  Sparkles,
  Database,
  ExternalLink,
} from "lucide-react";

interface ProblemDetailModalProps {
  problem: ProblemStatement | null;
  onClose: () => void;
}

export const ProblemDetailModal: React.FC<ProblemDetailModalProps> = ({
  problem,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!problem) return null;

  const datasets = getProblemDatasets(problem);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-problem-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Container */}
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        <div className="relative w-full max-w-3xl transform overflow-hidden rounded-3xl bg-white dark:bg-slate-900 text-left shadow-2xl transition-all border border-slate-200 dark:border-slate-800">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-[#071329] via-[#0b1f44] to-[#102d5a] p-6 sm:p-8 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="font-mono text-xs font-bold text-sky-300 bg-sky-950/80 px-2.5 py-1 rounded-md border border-sky-400/30">
                {problem.problemId || "PS-CIT"}
              </span>
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded-md">
                {problem.domainName || problem.domain || "Technical Domain"}
              </span>
              {problem.isDemoData && (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-md border border-amber-400/40">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  DEMO SPECIFICATION DATA
                </span>
              )}
            </div>

            <h3
              id="modal-problem-title"
              className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-white tracking-tight leading-tight mt-2"
            >
              {problem.title}
            </h3>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-6 text-slate-700 dark:text-slate-200">
            {problem.isDemoData && (
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-700/40 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Architecture Note:</strong> The official Buildathon
                  2.0 – 2K26 rulebook does not release final competition problem
                  statements until closer to the event. This statement
                  represents the standardized data schema configured for direct
                  deployment via the college Admin Console.
                </p>
              </div>
            )}

            {/* Background */}
            {problem.background && (
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-sky-500" />
                  Context & Background
                </h4>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  {problem.background}
                </p>
              </div>
            )}

            {/* Problem Description */}
            {(problem.problemDescription || problem.fullDescription) && (
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-1 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-sky-500" />
                  Detailed Problem Description
                </h4>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800 whitespace-pre-line">
                  {problem.problemDescription || problem.fullDescription}
                </p>
              </div>
            )}

            {/* Dedicated Datasets & Reference Sources Section */}
            {datasets.length > 0 && (
              <div className="bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-slate-50 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-slate-800/40 p-5 rounded-2xl border border-emerald-200/90 dark:border-emerald-600/30 shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-emerald-500" />
                    <span>
                      Official Datasets & Resources ({datasets.length})
                    </span>
                  </h4>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/90 dark:bg-emerald-900/40 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-500/40">
                    Direct Access ↗
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                  Participants can directly access the benchmark datasets, APIs,
                  and open data sources configured for this problem statement:
                </p>
                <div className="space-y-2.5">
                  {datasets.map((ds, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-emerald-200/90 dark:border-emerald-500/25 hover:border-emerald-400 transition-all shadow-2xs"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0">
                          <Database className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-heading font-bold text-sm text-[#0b1d3a] dark:text-white truncate">
                            {ds.name || `Dataset #${idx + 1}`}
                          </div>
                          {ds.description && (
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                              {ds.description}
                            </div>
                          )}
                          <div className="text-[11px] font-mono text-slate-400 dark:text-slate-400 truncate mt-1 flex items-center gap-1">
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                              Direct Link:
                            </span>{" "}
                            {ds.url}
                          </div>
                        </div>
                      </div>
                      <a
                        href={ds.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-heading font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-sm flex-shrink-0"
                      >
                        <span>OPEN DATASET</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Expected Deliverables / Outcome */}
            {(problem.expectedOutcome || problem.expectedDeliverables) && (
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  Expected Deliverables & Outcome
                </h4>
                <div className="text-sm sm:text-base text-emerald-950 dark:text-emerald-200 bg-emerald-50/70 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-200/80 dark:border-emerald-600/30 leading-relaxed whitespace-pre-line">
                  {problem.expectedOutcome || problem.expectedDeliverables}
                </div>
              </div>
            )}

            {/* Requirements & Constraints Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {problem.requirements && problem.requirements.length > 0 && (
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
                    Key Requirements
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {problem.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-sky-500 font-bold">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {problem.constraints && problem.constraints.length > 0 && (
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-rose-500" />
                    Constraints & Guardrails
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {problem.constraints.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Resources */}
            {problem.resources && problem.resources.length > 0 && (
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-1 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-500" />
                  Suggested Open Resources & APIs
                </h4>
                <div className="flex flex-wrap gap-2">
                  {problem.resources.map((res, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700"
                    >
                      {res}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="bg-slate-50 dark:bg-slate-900/90 px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Department of CSE • CIT Gubbi
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-heading font-bold text-white bg-[#0b1d3a] dark:bg-sky-600 hover:bg-[#132d59] dark:hover:bg-sky-500 transition-colors shadow-sm"
            >
              Close Statement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
