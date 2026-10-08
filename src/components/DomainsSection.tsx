import React from "react";
import { domains as defaultDomains } from "../data/hackathonData";
import { DomainCard } from "./DomainCard";
import { Layers } from "lucide-react";
import { useCms } from "../context/CmsContext";

interface DomainsSectionProps {
  onSelectDomain: (domainId: string) => void;
}

export const DomainsSection: React.FC<DomainsSectionProps> = ({
  onSelectDomain,
}) => {
  const cms = useCms();
  const domainList = cms.isLoaded
    ? Array.isArray(cms.domains)
      ? cms.domains.filter((d: any) => d.status !== "DRAFT")
      : []
    : Array.isArray(cms.domains) && cms.domains.length > 0
      ? cms.domains.filter((d: any) => d.status !== "DRAFT")
      : defaultDomains;

  const sortedDomains = [...domainList].sort(
    (a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0),
  );

  // Calculates equal width for cards so that 1, 2, 3, 4, 5, or more cards are always
  // centered together and each card in a row has the exact same width.
  const getCardWidthClass = (count: number) => {
    if (count === 1) return "w-full max-w-lg flex-none";
    if (count === 2)
      return "w-full sm:w-[360px] md:w-[380px] lg:w-[420px] max-w-lg flex-none";
    if (count === 3)
      return "w-full sm:w-[340px] lg:w-[350px] xl:w-[380px] max-w-md flex-none";
    if (count === 4)
      return "w-full sm:w-[300px] lg:w-[270px] xl:w-[290px] max-w-sm flex-none";
    return "w-full sm:w-[340px] lg:w-[350px] xl:w-[380px] max-w-md flex-none";
  };

  return (
    <section
      id="domains"
      className="py-16 md:py-24 bg-white dark:bg-[#060d1a] relative border-b border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30 mb-3">
            <Layers className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>REAL-WORLD AREAS</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#0b1d3a] dark:text-white tracking-tight">
            {sortedDomains.length > 0
              ? `${sortedDomains.length} INNOVATION DOMAINS`
              : "INNOVATION DOMAINS"}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-sky-500 via-rose-500 to-indigo-500 rounded-full mx-auto mt-3 mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {sortedDomains.length > 0
              ? `Teams will select one problem statement from any of the ${sortedDomains.length} domains below to architect, code, and validate over the 24 hours.`
              : "Innovation domains for Buildathon 2.0 will be published shortly by the organizing committee."}
          </p>
        </div>

        {/* Domain Cards Centered with Equal Width OR Clean Empty State */}
        {sortedDomains.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto w-full">
            {sortedDomains.map((domain: any, index: number) => (
              <DomainCard
                key={domain.id || index}
                domain={domain}
                index={index}
                className={getCardWidthClass(sortedDomains.length)}
                onSelectDomain={onSelectDomain}
              />
            ))}
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-12 px-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <Layers className="w-10 h-10 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
            <h3 className="font-heading font-bold text-lg text-slate-800 dark:text-white mb-1">
              No Domains Currently Published
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
              The event organizing committee has not published innovation
              domains yet. Please check back soon or contact the event
              coordinators.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
