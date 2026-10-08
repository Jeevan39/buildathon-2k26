import React from "react";
import {
  studentCoordinators as defaultStudents,
  facultyCoordinators as defaultFaculty,
} from "../data/hackathonData";
import { Phone, User, GraduationCap, Users, Shield } from "lucide-react";
import { useCms } from "../context/CmsContext";

const LinkedinIcon: React.FC<{ className?: string }> = ({
  className = "w-3.5 h-3.5",
}) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export const CoordinatorCard: React.FC = () => {
  const cms = useCms();

  const allCoordinators = Array.isArray(cms.coordinators)
    ? cms.coordinators
    : [];

  const isFacultyOrManagement = (c: any) =>
    c.category?.toUpperCase() === "FACULTY" ||
    c.category?.toUpperCase() === "MANAGEMENT" ||
    c.role?.toLowerCase().includes("faculty") ||
    c.role?.toLowerCase().includes("management") ||
    c.role?.toLowerCase().includes("convener");

  const isStudent = (c: any) =>
    c.category?.toUpperCase() === "STUDENT" ||
    c.role?.toLowerCase().includes("student") ||
    (!c.category && !isFacultyOrManagement(c));

  const studentList = allCoordinators.filter(
    (c: any) => isStudent(c) && c.status !== "DRAFT",
  );

  const facultyList = allCoordinators.filter(
    (c: any) => isFacultyOrManagement(c) && c.status !== "DRAFT",
  );

  const hasBothGroups = studentList.length > 0 && facultyList.length > 0;

  // Calculates equal width for cards so that 1, 2, 3, 4, or more cards are always
  // centered together and each card in a row has the exact same width.
  const getCardWidthClass = (count: number) => {
    if (count === 1) return "w-full max-w-sm flex-none";
    if (count === 2) return "w-full sm:w-[320px] max-w-sm flex-none";
    if (count === 3)
      return "w-full sm:w-[300px] lg:w-[320px] max-w-sm flex-none";
    if (count === 4)
      return "w-full sm:w-[260px] lg:w-[270px] xl:w-[285px] max-w-sm flex-none";
    return "w-full sm:w-[260px] lg:w-[270px] max-w-sm flex-none";
  };

  return (
    <section
      id="coordinators"
      className="py-16 md:py-24 bg-white dark:bg-[#060d1a] relative border-b border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 dark:bg-sky-950/70 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800 mb-3">
            <Users className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>EVENT COMMITTEE</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#0b1d3a] dark:text-white tracking-tight">
            ORGANIZING COORDINATORS
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-sky-500 via-rose-500 to-indigo-500 rounded-full mx-auto mt-3 mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Reach out to our organizing team for technical queries, registration
            assistance, or venue directions.
          </p>
        </div>

        {/* Group 1: Student / Remaining Coordinators */}
        {studentList.length > 0 && (
          <div className={hasBothGroups ? "mb-14" : ""}>
            {/* Header for Group 1 */}
            {hasBothGroups ? (
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-[#0b1d3a] dark:text-white">
                    STUDENT COORDINATORS
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Student Leads & Registration Contacts
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 mb-2">
                  <Users className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span className="font-heading font-extrabold text-sm uppercase tracking-wide">
                    COORDINATOR CONTACTS
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Direct contacts for registration, technical queries & venue
                  support
                </p>
              </div>
            )}

            {/* Cards Centered with Equal Width */}
            <div className="flex flex-wrap justify-center gap-5 sm:gap-6 max-w-7xl mx-auto w-full">
              {studentList.map((coord: any) => {
                const hasPhoto = Boolean(
                  coord.imageUrl || coord.photo || coord.image,
                );
                const photoSrc = coord.imageUrl || coord.photo || coord.image;
                const linkedinLink = coord.linkedin
                  ? coord.linkedin.startsWith("http")
                    ? coord.linkedin
                    : `https://www.linkedin.com/in/${coord.linkedin}`
                  : null;

                return (
                  <div
                    key={coord.id || coord.name}
                    className={`${getCardWidthClass(
                      studentList.length,
                    )} bg-slate-50/80 dark:bg-slate-900/90 rounded-3xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 hover:border-sky-400 dark:hover:border-sky-500/50 hover:bg-white dark:hover:bg-slate-800/90 shadow-sm hover:shadow-card-soft transition-all duration-300 flex flex-col justify-between items-center text-center group`}
                  >
                    <div className="w-full flex flex-col items-center">
                      {/* Coordinator Photo or Official Placeholder */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl p-1 bg-gradient-to-br from-sky-500/20 to-indigo-500/30 border border-slate-200 dark:border-slate-700/60 overflow-hidden mb-3.5 shadow-md group-hover:scale-105 transition-transform duration-300">
                        {hasPhoto ? (
                          <img
                            src={photoSrc}
                            alt={coord.name}
                            className="w-full h-full object-cover rounded-[14px]"
                          />
                        ) : (
                          <div className="w-full h-full rounded-[14px] bg-[#0c1e3d] flex flex-col items-center justify-center text-slate-300 relative overflow-hidden">
                            <User className="w-8 h-8 text-sky-400/80 mb-0.5" />
                            <span className="text-[7px] font-mono tracking-wider text-slate-400 uppercase">
                              COORDINATOR
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Role in this event */}
                      <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-sky-700 dark:text-sky-200 bg-sky-100/80 dark:bg-sky-950/90 px-2.5 py-0.5 rounded-full border border-sky-200/60 dark:border-sky-700/60 mb-2 shadow-xs">
                        {coord.role || "Student Coordinator"}
                      </span>

                      {/* Name */}
                      <h4 className="font-heading font-black text-base sm:text-lg text-[#0b1d3a] dark:text-white leading-snug group-hover:text-sky-400 transition-colors">
                        {coord.name}
                      </h4>
                    </div>

                    {/* Contact & Social Actions */}
                    <div className="mt-4 pt-3.5 border-t border-slate-200/60 dark:border-slate-800 w-full flex flex-wrap items-center justify-center gap-2">
                      {coord.phone && (
                        <a
                          href={`tel:${coord.phone}`}
                          className="inline-flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 hover:text-sky-700 dark:hover:text-sky-300 bg-white dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-sky-300 shadow-xs hover:shadow-sm transition-all flex-1 min-w-[125px]"
                          title={`Call ${coord.name}`}
                        >
                          <Phone className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                          <span>{coord.formattedPhone || coord.phone}</span>
                        </a>
                      )}

                      {linkedinLink && (
                        <a
                          href={linkedinLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-[#0077b5] dark:text-[#38a0dc] hover:text-white bg-[#0077b5]/10 hover:bg-[#0077b5] dark:bg-[#0077b5]/20 dark:hover:bg-[#0077b5] px-3 py-2 rounded-xl border border-[#0077b5]/30 hover:border-[#0077b5] shadow-xs hover:shadow-sm transition-all"
                          title={`${coord.name} on LinkedIn`}
                        >
                          <LinkedinIcon className="w-3.5 h-3.5" />
                          <span>LinkedIn</span>
                        </a>
                      )}

                      {!coord.phone && !linkedinLink && (
                        <span className="text-xs text-slate-400 dark:text-slate-500 italic py-1">
                          CIT Gubbi
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Group 2: Faculty / Management Coordinators */}
        {facultyList.length > 0 && (
          <div>
            {/* Header for Group 2 */}
            {hasBothGroups ? (
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-[#0b1d3a] dark:text-white">
                    FACULTY COORDINATORS
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Faculty Leadership & Department Mentors
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 mb-2">
                  <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-heading font-extrabold text-sm uppercase tracking-wide">
                    FACULTY / MANAGEMENT COORDINATORS
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Faculty Leadership & Event Mentors
                </p>
              </div>
            )}

            {/* Cards Centered with Equal Width */}
            <div className="flex flex-wrap justify-center gap-5 sm:gap-6 max-w-7xl mx-auto w-full">
              {facultyList.map((coord: any) => {
                const hasPhoto = Boolean(
                  coord.imageUrl || coord.photo || coord.image,
                );
                const photoSrc = coord.imageUrl || coord.photo || coord.image;
                const linkedinLink = coord.linkedin
                  ? coord.linkedin.startsWith("http")
                    ? coord.linkedin
                    : `https://www.linkedin.com/in/${coord.linkedin}`
                  : null;

                return (
                  <div
                    key={coord.id || coord.name}
                    className={`${getCardWidthClass(
                      facultyList.length,
                    )} bg-slate-50/80 dark:bg-slate-900/90 rounded-3xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:bg-white dark:hover:bg-slate-800/90 shadow-sm hover:shadow-card-soft transition-all duration-300 flex flex-col justify-between items-center text-center group`}
                  >
                    <div className="w-full flex flex-col items-center">
                      {/* Coordinator Photo or Official Placeholder */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl p-1 bg-gradient-to-br from-indigo-500/20 to-sky-500/30 border border-slate-200 dark:border-slate-700/60 overflow-hidden mb-3.5 shadow-md group-hover:scale-105 transition-transform duration-300">
                        {hasPhoto ? (
                          <img
                            src={photoSrc}
                            alt={coord.name}
                            className="w-full h-full object-cover rounded-[14px]"
                          />
                        ) : (
                          <div className="w-full h-full rounded-[14px] bg-[#0c1e3d] flex flex-col items-center justify-center text-slate-300 relative overflow-hidden">
                            <Shield className="w-8 h-8 text-indigo-400/90 mb-0.5" />
                            <span className="text-[7px] font-mono tracking-wider text-slate-400 uppercase">
                              FACULTY LEAD
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Role in this event */}
                      <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-200 bg-indigo-100/80 dark:bg-indigo-950/90 px-2.5 py-0.5 rounded-full border border-indigo-200/60 dark:border-indigo-500/40 mb-2 shadow-xs">
                        {coord.role || "Faculty Coordinator"}
                      </span>

                      {/* Name */}
                      <h4 className="font-heading font-black text-base sm:text-lg text-[#0b1d3a] dark:text-white leading-snug group-hover:text-indigo-400 transition-colors">
                        {coord.name}
                      </h4>
                    </div>

                    {/* Contact & Social Actions */}
                    <div className="mt-4 pt-3.5 border-t border-slate-200/60 dark:border-slate-800 w-full flex flex-wrap items-center justify-center gap-2">
                      {coord.phone && (
                        <a
                          href={`tel:${coord.phone}`}
                          className="inline-flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-300 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 shadow-xs hover:shadow-sm transition-all flex-1 min-w-[125px]"
                          title={`Call ${coord.name}`}
                        >
                          <Phone className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                          <span>{coord.formattedPhone || coord.phone}</span>
                        </a>
                      )}

                      {linkedinLink && (
                        <a
                          href={linkedinLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-[#0077b5] dark:text-[#38a0dc] hover:text-white bg-[#0077b5]/10 hover:bg-[#0077b5] dark:bg-[#0077b5]/20 dark:hover:bg-[#0077b5] px-3 py-2 rounded-xl border border-[#0077b5]/30 hover:border-[#0077b5] shadow-xs hover:shadow-sm transition-all"
                          title={`${coord.name} on LinkedIn`}
                        >
                          <LinkedinIcon className="w-3.5 h-3.5" />
                          <span>LinkedIn</span>
                        </a>
                      )}

                      {!coord.phone && !linkedinLink && (
                        <span className="text-xs text-slate-400 dark:text-slate-500 italic py-1">
                          CIT Gubbi Faculty
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
