import React, { useState } from "react";
import {
  problemStatements as defaultProblems,
  ProblemStatement,
  domains as defaultDomains,
} from "../data/hackathonData";
import { ProblemCard } from "./ProblemCard";
import { ProblemDetailModal } from "./ProblemDetailModal";
import { Filter, Layers, AlertCircle, Sparkles } from "lucide-react";
import { useCms } from "../context/CmsContext";

interface ProblemSectionProps {
  initialFilter?: string;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({
  initialFilter = "all",
}) => {
  const cms = useCms();
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [selectedProblem, setSelectedProblem] =
    useState<ProblemStatement | null>(null);

  const domainList = cms.isLoaded
    ? Array.isArray(cms.domains)
      ? cms.domains.filter((d: any) => d.status !== "DRAFT")
      : []
    : cms.domains && cms.domains.length > 0
      ? cms.domains
      : defaultDomains;

  const problemList = cms.isLoaded
    ? Array.isArray(cms.problems)
      ? cms.problems
      : []
    : cms.problems && cms.problems.length > 0
      ? cms.problems
      : defaultProblems;

  const publishedProblems = problemList.filter(
    (p: any) => p.isPublished !== false && p.status !== "DRAFT",
  );

  const filterTabs = [
    { id: "all", label: "ALL DOMAINS" },
    ...domainList.map((d: any) => ({
      id: d.id,
      label: d.name.toUpperCase(),
    })),
  ];

  const filteredProblems =
    activeFilter === "all"
      ? publishedProblems
      : publishedProblems.filter(
          (p: any) => p.domainId === activeFilter || p.domain === activeFilter,
        );

  return (
    <section
      id="problems"
      className="py-16 md:py-24 bg-slate-50/60 dark:bg-[#060d1a] relative border-b border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30 mb-3">
            <Layers className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>REAL-WORLD PROBLEM REPOSITORY</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#0b1d3a] dark:text-white tracking-tight">
            PROBLEM STATEMENTS
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-sky-500 via-rose-500 to-indigo-500 rounded-full mx-auto mt-3 mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Each team selects exactly <strong>one problem statement</strong>{" "}
            from any of the official domains and builds an end-to-end working
            software solution around it.
          </p>
        </div>

        {/* Official Rule Notice Box */}
        <div className="max-w-4xl mx-auto mb-8 p-4 sm:p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/90 dark:border-amber-500/40 text-amber-900 dark:text-amber-200 flex items-start gap-3 shadow-sm">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <strong className="font-bold text-amber-950 dark:text-amber-100 font-heading">
              Official Competition Notice:
            </strong>{" "}
            As designated in the official Buildathon 2.0 – 2K26 rulebook, final
            curated competition problem statements are scheduled for release
            closer to the event. The interactive cards below demonstrate the
            production data schema and problem statements prepared for the live
            event rollout.
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-heading font-bold tracking-wide transition-all ${
                  isActive
                    ? "bg-[#0b1d3a] dark:bg-sky-600 text-white shadow-md shadow-blue-950/20"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Problem Cards Grid OR Clean Empty State */}
        {filteredProblems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProblems.map((problem) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                onOpenDetails={(prob) => setSelectedProblem(prob)}
              />
            ))}
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-12 px-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <Sparkles className="w-10 h-10 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
            <h3 className="font-heading font-bold text-lg text-slate-800 dark:text-white mb-1">
              No Problem Statements Available
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
              {activeFilter !== "all"
                ? "No problem statements currently published for this domain track."
                : "Curated problem statements will be revealed closer to the event schedule."}
            </p>
          </div>
        )}

        {/* Modal for Details */}
        <ProblemDetailModal
          problem={selectedProblem}
          onClose={() => setSelectedProblem(null)}
        />
      </div>
    </section>
  );
};
