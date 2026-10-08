import React, { useState } from "react";
import { faqs as defaultFaqs } from "../data/hackathonData";
import { HelpCircle, ChevronDown, MessageSquare } from "lucide-react";
import { useCms } from "../context/CmsContext";

export const FAQ: React.FC = () => {
  const cms = useCms();
  // Start with all FAQ tabs closed/collapsed by default
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqList = cms.isLoaded
    ? Array.isArray(cms.faqs)
      ? cms.faqs.filter((f: any) => f.status !== "DRAFT")
      : []
    : cms.faqs && cms.faqs.length > 0
      ? cms.faqs.filter((f: any) => f.status !== "DRAFT")
      : defaultFaqs;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-16 md:py-24 bg-white dark:bg-[#060d1a] relative border-b border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>CLARIFICATIONS & QUERIES</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#0b1d3a] dark:text-white tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-sky-500 via-rose-500 to-indigo-500 rounded-full mx-auto mt-3 mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Everything you need to know about eligibility, team composition,
            venue logistics, and participation guidelines.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {faqList.map((faq: any, index: number) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="bg-slate-50/70 hover:bg-white dark:bg-slate-800/40 dark:hover:bg-slate-800/70 rounded-2xl border border-slate-200/90 dark:border-slate-700/60 transition-all duration-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-300 bg-sky-100/70 dark:bg-sky-950/80 px-2 py-1 rounded-md">
                      Q{index + 1}
                    </span>
                    <span className="font-heading font-bold text-sm sm:text-base text-[#0b1d3a] dark:text-white">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`p-1 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180 text-sky-600 dark:text-sky-400" : ""}`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100 dark:border-slate-700/60 bg-white dark:bg-slate-800/60 text-xs sm:text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
                    <p className="pl-9">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Further questions hint */}
        <div className="text-center mt-10 text-xs text-slate-500 dark:text-slate-400">
          Have an unaddressed question? Contact our Student Coordinators listed
          in the committee directory below.
        </div>
      </div>
    </section>
  );
};
