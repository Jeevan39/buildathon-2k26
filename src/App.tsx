import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { About } from "./components/About";
import { ThemeSection } from "./components/ThemeSection";
import { DomainsSection } from "./components/DomainsSection";
import { ProblemSection } from "./components/ProblemSection";
import { Timeline } from "./components/Timeline";
import { Eligibility } from "./components/Eligibility";
import { Benefits } from "./components/Benefits";
import { RuleAccordion } from "./components/RuleAccordion";
import { CodeOfConduct } from "./components/CodeOfConduct";
import { PrizeSection } from "./components/PrizeSection";
import { PatronCard } from "./components/PatronCard";
import { AssociationLogos } from "./components/AssociationLogos";
import { RegistrationCTA } from "./components/RegistrationCTA";
import { CoordinatorCard } from "./components/CoordinatorCard";
import { Venue } from "./components/Venue";
import { FAQ } from "./components/FAQ";
import { SocialSection } from "./components/SocialSection";
import { Footer } from "./components/Footer";
import { OfficialPosterModal } from "./components/OfficialPosterModal";
import { AdminPanel } from "./components/AdminPanel";
import { LoadingScreen } from "./components/LoadingScreen";
import { CmsProvider, useCms } from "./context/CmsContext";
import { ThemeProvider } from "./context/ThemeContext";
import {
  ChevronRight,
  ArrowLeft,
  ExternalLink,
  Calendar,
  MapPin,
  Trophy,
  Bell,
  X,
} from "lucide-react";

function AppContent() {
  const cms = useCms();
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  const [selectedDomainFilter, setSelectedDomainFilter] =
    useState<string>("all");
  const [isAnnouncementDismissed, setIsAnnouncementDismissed] = useState(false);

  // Handle URL hash or path on load
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.replace("#", "");
      const path = window.location.pathname.replace("/", "");

      const target = hash || path;
      if (
        target &&
        [
          "about",
          "domains",
          "problems",
          "problem-statements",
          "event-flow",
          "rules",
          "code-of-conduct",
          "prizes",
          "patrons",
          "coordinators",
          "faq",
          "contact",
          "admin",
        ].includes(target)
      ) {
        if (target === "problem-statements") {
          setCurrentTab("problems");
        } else {
          setCurrentTab(target);
        }
      }
    };

    handleLocationChange();
    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  const handleNavigate = (tabId: string) => {
    setCurrentTab(tabId);
    window.history.pushState(null, "", tabId === "home" ? "/" : `#${tabId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDomainSelect = (domainId: string) => {
    setSelectedDomainFilter(domainId);
    setCurrentTab("problems");
    window.history.pushState(null, "", "#problems");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (currentTab === "admin") {
    return <AdminPanel onBackToSite={() => handleNavigate("home")} />;
  }

  // Active top announcement
  const activeAnnouncements = (cms.announcements || []).filter(
    (a: any) => a.status === "PUBLISHED",
  );
  const currentAnnouncement =
    activeAnnouncements.length > 0 ? activeAnnouncements[0] : null;

  // Breadcrumb header for dedicated subpage views
  const renderSubpageHeader = (
    title: string,
    subtitle: string,
    category: string,
  ) => (
    <div className="bg-gradient-to-r from-[#071329] via-[#0b1f44] to-[#122e5c] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-sky-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
          <button
            onClick={() => handleNavigate("home")}
            className="hover:text-white transition-colors"
          >
            HOME
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-sky-300 uppercase">{category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-white uppercase">{title}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
              {title}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavigate("home")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Full Landing View</span>
            </button>
            <a
              href={
                cms.registration?.registrationUrl ||
                "https://forms.gle/YN35pBeytcHqmPHj7"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-xs font-bold text-white uppercase shadow-md transition-all"
            >
              <span>Register Now</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  // Dynamic Homepage section mapping dictionary
  const sectionDictionary: Record<string, React.ReactNode> = {
    hero: (
      <Hero
        key="hero"
        onExploreClick={() => {
          const aboutElem = document.getElementById("about");
          aboutElem?.scrollIntoView({ behavior: "smooth" });
        }}
        onOpenPosterModal={() => setIsPosterModalOpen(true)}
      />
    ),
    stats: <Stats key="stats" />,
    about: (
      <About
        key="about"
        onLearnMore={() => {
          const domainsElem = document.getElementById("domains");
          domainsElem?.scrollIntoView({ behavior: "smooth" });
        }}
        onOpenPosterModal={() => setIsPosterModalOpen(true)}
      />
    ),
    theme: <ThemeSection key="theme" />,
    domains: (
      <DomainsSection key="domains" onSelectDomain={handleDomainSelect} />
    ),
    problems: (
      <ProblemSection key="problems" initialFilter={selectedDomainFilter} />
    ),
    timeline: <Timeline key="timeline" />,
    eligibility: <Eligibility key="eligibility" />,
    benefits: <Benefits key="benefits" />,
    rules: <RuleAccordion key="rules" />,
    codeOfConduct: <CodeOfConduct key="codeOfConduct" />,
    prizes: <PrizeSection key="prizes" />,
    patrons: <PatronCard key="patrons" />,
    associations: <AssociationLogos key="associations" />,
    registrationCta: <RegistrationCTA key="registrationCta" />,
    coordinators: <CoordinatorCard key="coordinators" />,
    venue: <Venue key="venue" />,
    faq: <FAQ key="faq" />,
    social: <SocialSection key="social" />,
  };

  // Order and filter sections based on CMS settings
  const renderHomeSections = () => {
    if (cms.sections && cms.sections.length > 0) {
      const activeSections = [...cms.sections]
        .filter((s) => s.enabled !== false && s.id !== "footer")
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

      return activeSections.map((sec) => sectionDictionary[sec.id] || null);
    }

    // Default fallback order
    return Object.values(sectionDictionary);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060d1a] text-slate-100">
      {/* Initial Page Loading Screen */}
      <LoadingScreen />

      {/* Live Broadcast Announcement Banner if active and not dismissed */}
      {currentAnnouncement && !isAnnouncementDismissed && (
        <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 text-white text-xs py-2 px-4 shadow-sm relative z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white text-rose-700 shadow-xs">
                {currentAnnouncement.priority || "BROADCAST"}
              </span>
              <strong className="font-semibold">
                {currentAnnouncement.title}:
              </strong>
              <span className="text-white/90 text-xs hidden sm:inline">
                {currentAnnouncement.shortMessage}
              </span>
              {currentAnnouncement.linkUrl && (
                <a
                  href={currentAnnouncement.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 underline font-bold text-amber-200 hover:text-white transition-colors ml-1"
                >
                  <span>{currentAnnouncement.linkText || "Open Link"}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <button
              onClick={() => setIsAnnouncementDismissed(true)}
              className="text-white/80 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
              title="Dismiss announcement banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Sticky Global Navbar (College logo displayed strictly & solely in navbar) */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenPosterModal={() => setIsPosterModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentTab === "home" && renderHomeSections()}

        {currentTab === "about" && (
          <div>
            {renderSubpageHeader(
              "About Buildathon 2.0 – 2K26",
              "National Level 24-Hour Hackathon organized by the Department of Computer Science & Engineering, CIT Gubbi.",
              "Overview",
            )}
            <About onOpenPosterModal={() => setIsPosterModalOpen(true)} />
            <Stats />
            <ThemeSection />
            <AssociationLogos />
          </div>
        )}

        {currentTab === "domains" && (
          <div>
            {renderSubpageHeader(
              "Innovation Domains",
              "Select from the official multidisciplinary domains addressing real societal challenges.",
              "Tracks",
            )}
            <DomainsSection onSelectDomain={handleDomainSelect} />
            <ThemeSection />
          </div>
        )}

        {currentTab === "problems" && (
          <div>
            {renderSubpageHeader(
              "Problem Statements",
              "Explore domain problem templates and review technical specifications.",
              "Challenges",
            )}
            <ProblemSection initialFilter={selectedDomainFilter} />
          </div>
        )}

        {currentTab === "event-flow" && (
          <div>
            {renderSubpageHeader(
              "Event Flow & 24-Hour Schedule",
              "Day 1 & Day 2 milestone progression for participating teams.",
              "Schedule",
            )}
            <Timeline />
          </div>
        )}

        {currentTab === "rules" && (
          <div>
            {renderSubpageHeader(
              "Rules & Regulations",
              "Official competition framework, evaluation rounds, and equipment regulations.",
              "Guidelines",
            )}
            <RuleAccordion />
            <CodeOfConduct />
          </div>
        )}

        {currentTab === "code-of-conduct" && (
          <div>
            {renderSubpageHeader(
              "Code of Conduct",
              "Professional ethics, mutual respect, and collegiate sportsmanship guidelines.",
              "Ethics",
            )}
            <CodeOfConduct />
          </div>
        )}

        {currentTab === "prizes" && (
          <div>
            {renderSubpageHeader(
              "Prizes & Rewards",
              "₹30K prize pool, prestigious trophies, merit e-certificates, and swag kits.",
              "Accolades",
            )}
            <PrizeSection />
            <Benefits />
          </div>
        )}

        {currentTab === "patrons" && (
          <div>
            {renderSubpageHeader(
              "Chief Patrons & Leadership",
              "Visionary leadership and patrons of Channabasaveshwara Institute of Technology.",
              "Leadership",
            )}
            <PatronCard />
            <AssociationLogos />
          </div>
        )}

        {currentTab === "coordinators" && (
          <div>
            {renderSubpageHeader(
              "Organizing Coordinators",
              "Student leads and faculty conveners from Department of CSE, CIT Gubbi.",
              "Committee",
            )}
            <CoordinatorCard />
          </div>
        )}

        {currentTab === "faq" && (
          <div>
            {renderSubpageHeader(
              "Frequently Asked Questions",
              "Authoritative answers to common questions about eligibility, registration, and hospitality.",
              "Support",
            )}
            <FAQ />
          </div>
        )}

        {currentTab === "contact" && (
          <div>
            {renderSubpageHeader(
              "Contact & Venue Directions",
              "Reach out to the organizing team or navigate to CIT Campus in Gubbi, Tumkur.",
              "Connect",
            )}
            <CoordinatorCard />
            <Venue />
            <SocialSection />
          </div>
        )}
      </main>

      {/* Global Footer with Admin Link */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPosterModal={() => setIsPosterModalOpen(true)}
      />

      {/* Official Poster Modal */}
      <OfficialPosterModal
        isOpen={isPosterModalOpen}
        onClose={() => setIsPosterModalOpen(false)}
      />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <CmsProvider>
        <AppContent />
      </CmsProvider>
    </ThemeProvider>
  );
}

export default App;
