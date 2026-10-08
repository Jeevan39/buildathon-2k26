import React, { useState } from "react";
import { rulesData as defaultRulesData } from "../data/hackathonData";
import {
  ChevronDown,
  ShieldAlert,
  Laptop,
  Award,
  Scale,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";
import { useCms } from "../context/CmsContext";

export const RuleAccordion: React.FC = () => {
  const cms = useCms();

  const rulesList = cms.isLoaded
    ? Array.isArray(cms.rules)
      ? cms.rules
      : []
    : cms.rules && cms.rules.length > 0
      ? cms.rules
      : defaultRulesData;
  const categoriesMap: { category: string; rules: string[] }[] = [];

  if (rulesList && Array.isArray(rulesList)) {
    rulesList.forEach((r: any) => {
      let cat = categoriesMap.find((c) => c.category === r.category);
      if (!cat) {
        cat = { category: r.category, rules: [] };
        categoriesMap.push(cat);
      }
      cat.rules.push(r.ruleText);
    });
  }

  const rulesData =
    categoriesMap.length > 0
      ? categoriesMap
      : cms.isLoaded
        ? []
        : defaultRulesData;

  // Start with all categories collapsed by default
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {},
  );

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Participation":
        return (
          <CheckCircle2 className="w-5 h-5 text-sky-600 dark:text-sky-400" />
        );
      case "Equipment & Hardware":
        return (
          <Laptop className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        );
      case "Evaluation & Submissions":
        return <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case "Judging Criteria":
        return (
          <Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        );
      default:
        return (
          <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />
        );
    }
  };

  return (
    <section
      id="rules"
      className="py-16 md:py-24 bg-slate-50/70 dark:bg-[#060d1a] relative border-b border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30 mb-3">
            <Scale className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>OFFICIAL GUIDELINES</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#0b1d3a] dark:text-white tracking-tight">
            RULES & REGULATIONS
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-sky-500 via-rose-500 to-indigo-500 rounded-full mx-auto mt-3 mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Strict adherence to the official Buildathon 2.0 – 2K26 regulatory
            framework is mandatory for all participating teams.
          </p>
        </div>

        {/* Expandable Accordions */}
        <div className="space-y-4">
          {rulesData.map((categoryItem) => {
            const isOpen = !!openCategories[categoryItem.category];
            return (
              <div
                key={categoryItem.category}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-200"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleCategory(categoryItem.category)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-slate-50/80 dark:hover:bg-slate-800/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {getCategoryIcon(categoryItem.category)}
                    </div>
                    <span className="font-heading font-bold text-base sm:text-lg text-[#0b1d3a] dark:text-white">
                      {categoryItem.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500 hidden sm:inline">
                      {categoryItem.rules.length} Rules
                    </span>
                    <div
                      className={`p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-transform duration-200 ${isOpen ? "rotate-180 text-sky-600 dark:text-sky-400" : ""}`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </div>
                </button>

                {/* Accordion Body */}
                {isOpen && (
                  <div className="px-5 pb-6 pt-1 sm:px-6 sm:pb-7 border-t border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/60">
                    <ul className="space-y-3">
                      {categoryItem.rules.map((rule, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed"
                        >
                          <span className="font-mono font-bold text-sky-600 dark:text-sky-300 bg-sky-100/70 dark:bg-sky-950/80 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Disqualification Warning Box (High Contrast in both Light and Dark Mode) */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/40 text-rose-900 dark:text-rose-200 flex items-start gap-3 shadow-xs">
          <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <strong className="font-bold text-rose-950 dark:text-rose-100 font-heading">
              Disqualification Clause:
            </strong>{" "}
            Any mischievous activity, plagiarism, or unfair practice observed
            during the 24 hours will lead to immediate disqualification of the
            entire team without appeal.
          </div>
        </div>
      </div>
    </section>
  );
};
