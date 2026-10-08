import React from "react";
import { ProblemStatement, getProblemDatasets } from "../data/hackathonData";
import {
  ArrowRight,
  Tag,
  AlertCircle,
  FileText,
  CheckCircle,
  Database,
  ExternalLink,
} from "lucide-react";

interface ProblemCardProps {
  problem: ProblemStatement;
  onOpenDetails: (problem: ProblemStatement) => void;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
  problem,
  onOpenDetails,
}) => {
  const datasets = getProblemDatasets(problem);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-card-soft hover:shadow-card-hover hover:border-sky-300 transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200/80">
            {problem.problemId || "PS-CIT"}
          </span>
          {problem.isDemoData && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              <AlertCircle className="w-3 h-3 text-amber-600" />
              DEMO ARCHITECTURE DATA
            </span>
          )}
        </div>

        {/* Domain indicator */}
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
          {problem.domainName || problem.domain || "Technical Domain"}
        </div>

        {/* Title */}
        <h4 className="font-heading font-bold text-lg text-[#0b1d3a] tracking-tight mb-2.5 group-hover:text-sky-700 transition-colors line-clamp-2">
          {problem.title}
        </h4>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
          {problem.shortDescription}
        </p>

        {/* Datasets Section (Direct Access) */}
        {datasets.length > 0 && (
          <div className="mb-4 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-slate-500 mb-2">
              <span className="flex items-center gap-1.5 text-emerald-800">
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {datasets.length > 1
                    ? `Datasets Available (${datasets.length})`
                    : "Dataset Available"}
                  :
                </span>
              </span>
              <span className="text-[10px] text-emerald-600 font-mono">
                Click to Open ↗
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {datasets.map((ds, idx) => (
                <a
                  key={idx}
                  href={ds.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-900 border border-emerald-200/90 transition-all hover:shadow-xs group/link"
                  title={`Open external dataset: ${ds.name || ds.url}`}
                >
                  <Database className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                  <span className="truncate max-w-[160px]">
                    {ds.name ||
                      (datasets.length === 1
                        ? "Dataset Link"
                        : `Dataset ${idx + 1}`)}
                  </span>
                  <ExternalLink className="w-3 h-3 text-emerald-600 opacity-70 group-hover/link:opacity-100 flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Action */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <span className="text-[11px] font-mono text-slate-400">
          Status:{" "}
          <strong className="text-emerald-600 font-semibold">
            {problem.status || "Ready"}
          </strong>
        </span>
        <button
          onClick={() => onOpenDetails(problem)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-heading font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 hover:text-sky-800 transition-colors cursor-pointer"
        >
          <span>VIEW DETAILS</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
