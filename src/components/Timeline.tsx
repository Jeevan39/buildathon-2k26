import React, { useState } from "react";
import { daySchedules as defaultDaySchedules } from "../data/hackathonData";
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useCms } from "../context/CmsContext";

export const Timeline: React.FC = () => {
  const cms = useCms();
  const [activeDay, setActiveDay] = useState<number>(1);

  // Group CMS timeline items or fallback to defaultDaySchedules
  const timelineItems = cms.isLoaded
    ? Array.isArray(cms.timeline)
      ? cms.timeline.filter((item: any) => item.status !== "DRAFT")
      : []
    : cms.timeline && cms.timeline.length > 0
      ? cms.timeline.filter((item: any) => item.status !== "DRAFT")
      : null;

  const daySchedules = timelineItems
    ? [
        {
          dayNumber: 1,
          dayLabel: "Day 1",
          date:
            timelineItems.find((t: any) => t.dayNumber === 1)?.date ||
            "30 October 2026",
          events: timelineItems
            .filter((t: any) => t.dayNumber === 1)
            .sort(
              (a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0),
            ),
        },
        {
          dayNumber: 2,
          dayLabel: "Day 2",
          date:
            timelineItems.find((t: any) => t.dayNumber === 2)?.date ||
            "31 October 2026",
          events: timelineItems
            .filter((t: any) => t.dayNumber === 2)
            .sort(
              (a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0),
            ),
        },
      ]
    : defaultDaySchedules;

  return (
    <section
      id="event-flow"
      className="py-16 md:py-24 bg-white dark:bg-[#060d1a] relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30 mb-3">
            <Clock className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>24-HOUR MILESTONES</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#0b1d3a] dark:text-white tracking-tight">
            EVENT FLOW & SCHEDULE
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-sky-500 via-rose-500 to-indigo-500 rounded-full mx-auto mt-3 mb-4"></div>

          {/* Official Timing Notice strictly required */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-medium border border-slate-200 dark:border-slate-800">
            <AlertCircle className="w-4 h-4 text-sky-600 dark:text-sky-400 flex-shrink-0" />
            <span>
              Exact timings will be shared with registered participants closer
              to the event.
            </span>
          </div>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {daySchedules.map((schedule) => {
            const isActive = activeDay === schedule.dayNumber;
            return (
              <button
                key={schedule.dayNumber}
                onClick={() => setActiveDay(schedule.dayNumber)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-heading font-bold text-sm tracking-wide transition-all ${
                  isActive
                    ? "bg-[#0b1d3a] dark:bg-sky-600 text-white shadow-lg shadow-blue-950/20 scale-[1.02]"
                    : "bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
                }`}
              >
                <Calendar
                  className={`w-4 h-4 ${isActive ? "text-sky-400" : "text-slate-400 dark:text-slate-500"}`}
                />
                <span>{schedule.dayLabel}</span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-mono ${isActive ? "bg-sky-500/20 text-sky-300" : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}
                >
                  {schedule.date}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Day Schedule Timeline */}
        {daySchedules.map((schedule) => {
          if (schedule.dayNumber !== activeDay) return null;

          return (
            <div key={schedule.dayNumber} className="max-w-4xl mx-auto">
              <div className="relative border-l-2 border-sky-200 dark:border-sky-500/30 pl-6 sm:pl-8 ml-4 sm:ml-8 space-y-8 sm:space-y-10">
                {schedule.events.map((event, index) => (
                  <div key={event.step} className="relative group">
                    {/* Timeline Node Dot */}
                    <div className="absolute -left-[35px] sm:-left-[43px] top-1 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-slate-900 border-2 border-sky-500 dark:border-sky-400 flex items-center justify-center font-mono font-bold text-xs text-[#0b1d3a] dark:text-white shadow-md group-hover:scale-110 group-hover:border-rose-500 group-hover:bg-rose-50 dark:group-hover:bg-slate-800 transition-all">
                      {event.step}
                    </div>

                    {/* Timeline Card */}
                    <div className="bg-slate-50/80 dark:bg-slate-900/80 group-hover:bg-white dark:group-hover:bg-slate-800/90 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 group-hover:border-sky-300 dark:group-hover:border-sky-500/40 shadow-sm group-hover:shadow-card-soft transition-all duration-200">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h4 className="font-heading font-black text-lg sm:text-xl text-[#0b1d3a] dark:text-white group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors">
                          {event.title}
                        </h4>
                        <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-sky-300 uppercase tracking-wider bg-slate-200/70 dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-200/60 dark:border-slate-700">
                          Stage {event.step}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 leading-relaxed font-normal">
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Footnote reassurance */}
        <div className="max-w-xl mx-auto text-center mt-12 text-xs text-slate-500">
          <p>
            Participants receive official schedule packets and evaluation
            rubrics during registration check-in on Day 1.
          </p>
        </div>
      </div>
    </section>
  );
};
