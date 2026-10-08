import React, { useState, useEffect } from "react";
import { CITLogo } from "./CITLogo";
import {
  Menu,
  X,
  ExternalLink,
  Sparkles,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { useCms } from "../context/CmsContext";
import { useTheme } from "../context/ThemeContext";

interface NavbarProps {
  currentTab: string;
  onNavigate: (tabId: string) => void;
  onOpenPosterModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenPosterModal,
}) => {
  const cms = useCms();
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Handle ESC key and resize to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1280 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileMenuOpen]);

  const navItems = (cms.navbar || [])
    .filter((item: any) => item.enabled)
    .map((item: any) => ({
      id: item.target || item.id,
      label: item.label,
      isExternal: item.isExternal,
    }));

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Notification Bar for Official Notice */}
      <aside
        aria-label="Official announcement"
        className="bg-gradient-to-r from-[#071224] via-[#0b1d3a] to-[#0f2c59] text-white text-xs py-1.5 px-4 border-b border-sky-900/40 relative z-50"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2 text-[11px] md:text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span className="font-semibold text-rose-300 uppercase tracking-wider">
              Official Event:
            </span>
            <span className="text-slate-200 hidden sm:inline">
              National Level 24-Hour Hackathon • 30 & 31 October 2026
            </span>
            <span className="text-slate-200 sm:hidden">
              30 & 31 Oct 2026 • ₹30K Pool
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-300">
            {onOpenPosterModal && (
              <button
                onClick={onOpenPosterModal}
                className="hover:text-sky-300 transition-colors flex items-center gap-1 font-medium underline underline-offset-2"
                title="View original poster"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Official Poster</span>
              </button>
            )}
            <span className="text-slate-500">•</span>
            <span className="text-sky-300 font-mono font-medium">
              Deadline: 25 Oct 2026
            </span>
          </div>
        </div>
      </aside>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-colors duration-150 ${
          isScrolled
            ? "bg-white/95 dark:bg-[#071224]/95 backdrop-blur-md shadow-md shadow-slate-900/5 py-2 sm:py-2.5 border-b border-slate-200/80 dark:border-slate-800"
            : "bg-white/90 dark:bg-[#071224]/90 backdrop-blur-sm py-3 sm:py-3.5 border-b border-slate-200/60 dark:border-slate-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2.5 sm:gap-4">
            {/* Logo */}
            <div
              onClick={() => handleNavClick("home")}
              className="cursor-pointer transition-transform hover:scale-[1.01] min-w-0 flex-shrink-0"
            >
              <CITLogo
                variant={theme === "dark" ? "dark" : "light"}
                compact={isScrolled}
                logoUrl={cms.media?.activeCollegeLogo}
              />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-0.5 xl:gap-1 text-xs xl:text-[13px] font-medium text-slate-700 dark:text-slate-200">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-2 xl:px-2.5 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "text-[#0284c7] dark:text-sky-400 font-semibold bg-sky-50 dark:bg-sky-500/15 shadow-sm shadow-sky-100 dark:shadow-none"
                        : "hover:text-[#0b1d3a] dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/70"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-2 lg:gap-2.5 flex-shrink-0">
              {/* Secondary explore / rules quick link on desktop */}
              <button
                onClick={() => handleNavClick("rules")}
                className="hidden 2xl:inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-sky-700 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800/70 rounded-lg transition-colors border border-slate-200 dark:border-slate-800 cursor-pointer"
              >
                <span>Rulebook</span>
              </button>

              {/* REGISTER NOW Button */}
              <a
                href={
                  cms.registration?.registrationUrl ||
                  "https://forms.gle/YN35pBeytcHqmPHj7"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 lg:px-5 py-2 sm:py-2.5 rounded-xl font-heading font-bold text-xs md:text-sm tracking-wide text-white uppercase bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-md shadow-rose-500/25 hover:shadow-lg hover:shadow-rose-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>{cms.registration?.buttonText || "REGISTER NOW"}</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Mobile Menu & Action */}
            <div className="flex items-center gap-1.5 sm:gap-2 xl:hidden flex-shrink-0 relative z-20">
              <a
                href={
                  cms.registration?.registrationUrl ||
                  "https://forms.gle/YN35pBeytcHqmPHj7"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden px-2.5 py-1.5 rounded-lg text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-sm"
              >
                {cms.registration?.buttonText || "Register"}
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 sm:p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:text-[#0b1d3a] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      <div
        className={`fixed inset-0 z-50 xl:hidden transition-[visibility] duration-200 ${
          isMobileMenuOpen
            ? "visible pointer-events-auto"
            : "invisible pointer-events-none"
        }`}
        aria-hidden={!isMobileMenuOpen}
        role="dialog"
        aria-modal="true"
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-200 ease-out ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer content */}
        <div
          className={`fixed inset-y-0 right-0 w-[85vw] max-w-sm bg-white dark:bg-slate-900 shadow-2xl flex flex-col z-10 transition-transform duration-200 ease-out transform will-change-transform dark:border-l dark:border-slate-800 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-900/90">
            <CITLogo
              variant={theme === "dark" ? "dark" : "light"}
              compact
              logoUrl={cms.media?.activeCollegeLogo}
            />
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Links list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1 overscroll-contain">
            <div className="px-3 py-2 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Event Navigation
            </div>
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-sm font-medium transition-all ${
                    isActive
                      ? "text-sky-700 bg-sky-50 font-semibold border-l-4 border-sky-600 dark:text-sky-300 dark:bg-sky-950/40 dark:border-sky-500"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60"
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight
                    className={`w-4 h-4 ${isActive ? "text-sky-600 dark:text-sky-400" : "text-slate-400 dark:text-slate-500"}`}
                  />
                </button>
              );
            })}

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 space-y-2">
              <div className="px-3 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Additional Views
              </div>
              <button
                onClick={() => handleNavClick("code-of-conduct")}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs font-medium text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60"
              >
                <span>Code of Conduct</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              </button>
              <button
                onClick={() => handleNavClick("patrons")}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs font-medium text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60"
              >
                <span>Chief Patrons & Leadership</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              </button>
              <button
                onClick={() => handleNavClick("coordinators")}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs font-medium text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60"
              >
                <span>Student & Faculty Coordinators</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              </button>
            </div>
          </div>

          {/* Mobile Drawer Footer CTA */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/90 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
              <span className="font-medium">
                Fee: {cms.registration?.feePerTeam || "₹500 / Team"}
              </span>
              <span className="font-semibold text-rose-600 dark:text-rose-400">
                Deadline: {cms.registration?.deadline || "25 Oct 2026"}
              </span>
            </div>
            <a
              href={
                cms.registration?.registrationUrl ||
                "https://forms.gle/YN35pBeytcHqmPHj7"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-heading font-bold text-sm text-white uppercase bg-gradient-to-r from-rose-600 to-pink-600 shadow-lg shadow-rose-500/25 hover:from-rose-500 hover:to-pink-500"
            >
              <span>
                {cms.registration?.buttonText || "REGISTER ON GOOGLE FORMS"}
              </span>
              <ExternalLink className="w-4 h-4" />
            </a>
            {onOpenPosterModal && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenPosterModal();
                }}
                className="w-full py-2 px-3 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg text-center dark:text-slate-300 dark:hover:text-white dark:border-slate-700 dark:hover:bg-slate-800"
              >
                View Official Event Poster
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
