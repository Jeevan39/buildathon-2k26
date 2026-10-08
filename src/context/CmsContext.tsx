import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  eventData as defaultEventData,
  domains as defaultDomains,
  problemStatements as defaultProblems,
  daySchedules as defaultDaySchedules,
  rulesData as defaultRulesData,
  benefits as defaultBenefits,
  chiefPatrons as defaultPatrons,
  studentCoordinators as defaultStudents,
  facultyCoordinators as defaultFaculty,
  faqs as defaultFaqs,
  statistics as defaultStatistics,
} from "../data/hackathonData";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "CONTENT_MANAGER" | "EVENT_ADMIN";
}

export interface CmsContextType {
  loading: boolean;
  isLoaded: boolean;
  user: AdminUser | null;
  event: any;
  hero: any;
  navbar: any[];
  sections: any[];
  stats: any[];
  about: any;
  theme: any;
  domains: any[];
  problems: any[];
  timeline: any[];
  rules: any[];
  benefits: any[];
  patrons: any[];
  coordinators: any[];
  faqs: any[];
  announcements: any[];
  registration: any;
  media: any;
  auditLogs: any[];

  // Mutators
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateEvent: (data: any) => Promise<void>;
  updateHero: (data: any) => Promise<void>;
  updateNavbar: (data: any[]) => Promise<void>;
  updateSections: (data: any[]) => Promise<void>;
  updateStats: (data: any[]) => Promise<void>;
  updateAbout: (data: any) => Promise<void>;
  updateTheme: (data: any) => Promise<void>;
  addDomain: (data: any) => Promise<void>;
  updateDomain: (id: string, data: any) => Promise<void>;
  deleteDomain: (id: string) => Promise<void>;
  updateAllDomains: (data: any[]) => Promise<void>;
  resetDomainsToDefault: () => Promise<void>;
  addProblem: (data: any) => Promise<void>;
  updateProblem: (id: string, data: any) => Promise<void>;
  deleteProblem: (id: string) => Promise<void>;
  updateAllProblems: (data: any[]) => Promise<void>;
  resetProblemsToDefault: () => Promise<void>;
  updateTimeline: (data: any[]) => Promise<void>;
  updateRules: (data: any[]) => Promise<void>;
  updateCoordinators: (data: any[]) => Promise<void>;
  updateCoordinator: (id: string, data: any) => Promise<void>;
  addCoordinator: (data: any) => Promise<void>;
  deleteCoordinator: (id: string) => Promise<void>;
  uploadCoordinatorPhoto: (id: string, photoDataUrl: string) => Promise<void>;
  deleteCoordinatorPhoto: (id: string) => Promise<void>;
  resetCoordinatorsToDefault: () => Promise<void>;
  updatePatrons: (data: any[]) => Promise<void>;
  updatePatron: (id: string, data: any) => Promise<void>;
  addPatron: (data: any) => Promise<void>;
  deletePatron: (id: string) => Promise<void>;
  uploadPatronPhoto: (id: string, photoDataUrl: string) => Promise<void>;
  deletePatronPhoto: (id: string) => Promise<void>;
  resetPatronsToDefault: () => Promise<void>;
  updateFaqs: (data: any[]) => Promise<void>;
  addAnnouncement: (data: any) => Promise<void>;
  deleteAnnouncement: (id: string) => Promise<void>;
  updateRegistration: (data: any) => Promise<void>;
  updateActiveLogo: (logoUrl: string) => Promise<void>;
  updateActivePoster: (posterUrl: string) => Promise<void>;
  refreshAll: () => Promise<void>;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

// Initial fallback state grounded in official rulebook
const initialFallbackState = {
  event: defaultEventData,
  hero: {
    smallLabel: "Channabasaveshwara Institute of Technology, Gubbi, Tumkur",
    title: "BUILDATHON",
    editionBadge: "2.0",
    yearBadge: "2K26",
    subtitle:
      "Department of Computer Science & Engineering • In Connection with KNEW-2K26",
    tagline: "INNOVATE • CODE • IMPACT",
    description:
      "Building Intelligent Solutions for a Smarter, Sustainable & Secure Tomorrow",
    primaryButtonText: "REGISTER NOW",
    primaryButtonUrl: defaultEventData.registrationUrl,
    secondaryButtonText: "EXPLORE HACKATHON",
    secondaryButtonUrl: "#about",
    showCountdown: true,
    countdownTargetDate: defaultEventData.dateStart,
    animationEnabled: true,
  },
  navbar: [
    {
      id: "nav-home",
      label: "Home",
      target: "home",
      isExternal: false,
      enabled: true,
      displayOrder: 1,
    },
    {
      id: "nav-about",
      label: "About",
      target: "about",
      isExternal: false,
      enabled: true,
      displayOrder: 2,
    },
    {
      id: "nav-domains",
      label: "Domains",
      target: "domains",
      isExternal: false,
      enabled: true,
      displayOrder: 3,
    },
    {
      id: "nav-problems",
      label: "Problem Statements",
      target: "problems",
      isExternal: false,
      enabled: true,
      displayOrder: 4,
    },
    {
      id: "nav-schedule",
      label: "Event Flow",
      target: "event-flow",
      isExternal: false,
      enabled: true,
      displayOrder: 5,
    },
    {
      id: "nav-rules",
      label: "Rules",
      target: "rules",
      isExternal: false,
      enabled: true,
      displayOrder: 6,
    },
    {
      id: "nav-prizes",
      label: "Prizes",
      target: "prizes",
      isExternal: false,
      enabled: true,
      displayOrder: 7,
    },
    {
      id: "nav-faq",
      label: "FAQ",
      target: "faq",
      isExternal: false,
      enabled: true,
      displayOrder: 8,
    },
    {
      id: "nav-contact",
      label: "Contact",
      target: "contact",
      isExternal: false,
      enabled: true,
      displayOrder: 9,
    },
  ],
  sections: [
    { id: "hero", name: "Hero Section", enabled: true, displayOrder: 1 },
    { id: "stats", name: "Event Statistics", enabled: true, displayOrder: 2 },
    { id: "about", name: "About Buildathon", enabled: true, displayOrder: 3 },
    { id: "theme", name: "Theme Section", enabled: true, displayOrder: 4 },
    {
      id: "domains",
      name: "Innovation Domains",
      enabled: true,
      displayOrder: 5,
    },
    {
      id: "problems",
      name: "Problem Statements",
      enabled: true,
      displayOrder: 6,
    },
    {
      id: "timeline",
      name: "Event Flow & Timeline",
      enabled: true,
      displayOrder: 7,
    },
    {
      id: "eligibility",
      name: "Eligibility & Criteria",
      enabled: true,
      displayOrder: 8,
    },
    {
      id: "benefits",
      name: "What Participants Get",
      enabled: true,
      displayOrder: 9,
    },
    {
      id: "rules",
      name: "Rules & Regulations",
      enabled: true,
      displayOrder: 10,
    },
    {
      id: "codeOfConduct",
      name: "Code of Conduct",
      enabled: true,
      displayOrder: 11,
    },
    {
      id: "prizes",
      name: "Prize Pool Section",
      enabled: true,
      displayOrder: 12,
    },
    {
      id: "patrons",
      name: "Chief Patrons & Leadership",
      enabled: true,
      displayOrder: 13,
    },
    {
      id: "associations",
      name: "Organizing Associations",
      enabled: true,
      displayOrder: 14,
    },
    {
      id: "registrationCta",
      name: "Registration CTA & QR",
      enabled: true,
      displayOrder: 15,
    },
    {
      id: "coordinators",
      name: "Organizing Coordinators",
      enabled: true,
      displayOrder: 16,
    },
    {
      id: "venue",
      name: "Venue & Campus Directions",
      enabled: true,
      displayOrder: 17,
    },
    {
      id: "faq",
      name: "Frequently Asked Questions",
      enabled: true,
      displayOrder: 18,
    },
    {
      id: "social",
      name: "Social Media Channel",
      enabled: true,
      displayOrder: 19,
    },
    { id: "footer", name: "Footer Section", enabled: true, displayOrder: 20 },
  ],
  stats: defaultStatistics.map((s, idx) => ({
    id: `stat-${idx + 1}`,
    number: s.value,
    label: s.label,
    subtext: s.subtext,
    icon: s.iconName,
    displayOrder: idx + 1,
    active: true,
  })),
  about: {
    sectionLabel: "Department of Computer Science & Engineering",
    heading: "ABOUT BUILDATHON 2.0",
    description:
      "Channabasaveshwara Institute of Technology, Department of Computer Science and Engineering, proudly presents Buildathon 2.0 – 2K26 — a National Level Hackathon and a premier platform to innovate, collaborate, and compete!",
    supportingText:
      "Join us on 30 & 31 October 2026 at the CIT Campus to build intelligent, real-world solutions and showcase your skills over 24 hours. Open to all UG students, regardless of skill level — exciting prizes worth ₹30K await!",
    quote: "“Let’s build the future together.”",
    organizingNote:
      "Organized in connection with KNEW-2K26 in association with ISTE, IEI, IEEE, SPARK-IT Technical Club, and the Institution’s Innovation Council.",
    badges: [
      "National Level",
      "24-Hour Hackathon",
      "Open to All UG Students",
      "Prize Pool ₹30K",
    ],
    cardTitle: "Where Smart Minds Build",
    cardHighlight: "Intelligent Solutions",
    cardDescription:
      "Collaborate with passionate developers from across colleges nationwide. Choose from 5 multidisciplinary domains and transform high-impact concepts into working code.",
  },
  theme: {
    label: "CENTRAL FOCUS",
    heading: "THE HACKATHON THEME",
    quote:
      "“Building Intelligent Solutions for a Smarter, Sustainable & Secure Tomorrow”",
    description:
      "Technology achieves greatness when applied towards real societal challenges. At Buildathon 2.0 – 2K26, teams harness algorithms, cloud infrastructure, AI models, and human-centric design to create scalable solutions.",
    pillars: [
      {
        title: "SMARTER",
        description:
          "Leveraging intelligent algorithms, automated decision support, edge computing, and predictive models.",
        icon: "Cpu",
        color: "sky",
      },
      {
        title: "SUSTAINABLE",
        description:
          "Conserving environmental resources, optimizing energy consumption, and architecting long-term scalable workflows.",
        icon: "Leaf",
        color: "emerald",
      },
      {
        title: "SECURE",
        description:
          "Safeguarding critical public infrastructure, ensuring data privacy, ethical boundaries, and resilient fault tolerance.",
        icon: "ShieldCheck",
        color: "rose",
      },
    ],
  },
  domains: [] as any[],
  problems: [] as any[],
  timeline: defaultDaySchedules.flatMap((day) =>
    day.events.map((evt, idx) => ({
      id: `tl-${day.dayNumber}-${idx}`,
      step: evt.step,
      dayNumber: day.dayNumber,
      dayLabel: day.dayLabel,
      date: day.date,
      title: evt.title,
      description: evt.description,
      displayOrder: idx + 1,
      status: "PUBLISHED",
    })),
  ),
  rules: defaultRulesData.flatMap((cat, catIdx) =>
    cat.rules.map((r, rIdx) => ({
      id: `r-${catIdx}-${rIdx}`,
      category: cat.category,
      ruleText: r,
      displayOrder: rIdx + 1,
      status: "PUBLISHED",
    })),
  ),
  benefits: defaultBenefits.map((b, idx) => ({
    id: `b-${idx + 1}`,
    title: b.title,
    description: b.description,
    icon: b.icon,
    tag: b.tag,
    displayOrder: idx + 1,
    status: "PUBLISHED",
  })),
  patrons: defaultPatrons.map((p, idx) => ({
    id: `p-${idx + 1}`,
    name: p.name,
    role: p.role,
    designation: p.designation,
    category: p.category,
    displayOrder: idx + 1,
    status: "PUBLISHED",
  })),
  coordinators: [
    {
      id: "c-5",
      name: "Dr. Suhas K C",
      phone: "9844987877",
      formattedPhone: "+91 98449 87877",
      role: "Faculty Convener",
      category: "FACULTY",
      imageUrl: "",
      linkedin: "",
      displayOrder: 1,
      status: "PUBLISHED",
    },
    {
      id: "c-6",
      name: "Prof. Mahesh N",
      phone: "9742045203",
      formattedPhone: "+91 97420 45203",
      role: "Faculty Coordinator",
      category: "FACULTY",
      imageUrl: "",
      linkedin: "",
      displayOrder: 2,
      status: "PUBLISHED",
    },
    {
      id: "coord-1790586815163",
      name: "Ananya D",
      phone: "+91 8796541230",
      formattedPhone: "+91 8796541230",
      role: "Student Coordinator",
      category: "STUDENT",
      imageUrl: "",
      linkedin: "",
      displayOrder: 3,
      status: "PUBLISHED",
    },
    {
      id: "coord-1790586856650",
      name: "Hruthish G B",
      phone: "+91 9786423150",
      formattedPhone: "+91 9786423150",
      role: "Student Coordinator",
      category: "STUDENT",
      imageUrl: "",
      linkedin: "",
      displayOrder: 4,
      status: "PUBLISHED",
    },
  ],
  faqs: defaultFaqs.map((f, idx) => ({
    id: `faq-${idx + 1}`,
    question: f.question,
    answer: f.answer,
    category: f.category,
    displayOrder: idx + 1,
    status: "PUBLISHED",
  })),
  announcements: [
    {
      id: "ann-1",
      title: "Registrations Open for Buildathon 2.0 – 2K26!",
      shortMessage:
        "National Level 24-Hour Hackathon registrations are officially live. Secure your squad slot before 25 October 2026.",
      priority: "IMPORTANT",
      linkUrl: defaultEventData.registrationUrl,
      linkText: "Register Now",
      publishDate: "2026-09-26T10:00:00.000Z",
      status: "PUBLISHED",
    },
  ],
  registration: {
    status: "OPEN",
    feePerTeam: "₹500 / Team",
    feeAmount: 500,
    teamSizeLabel: "3–4 Members",
    deadline: "25 October 2026",
    registrationUrl: defaultEventData.registrationUrl,
    buttonText: "REGISTER NOW",
    policyNote:
      "The registration fee is non-refundable. College ID is compulsory for all members.",
  },
  media: {
    activeCollegeLogo: "/cit_logo.jpg",
    activePosterUrl: "/official_poster.png",
    activeFavicon: "/cit_logo.jpg",
    assets: [
      {
        id: "asset-1",
        name: "Official College Logo",
        category: "Brand",
        url: "/cit_logo.jpg",
        uploadedAt: new Date().toISOString(),
      },
      {
        id: "asset-2",
        name: "Official Event Poster",
        category: "Poster",
        url: "/official_poster.png",
        uploadedAt: new Date().toISOString(),
      },
    ],
  },
  auditLogs: [
    {
      id: "log-1",
      adminName: "Super Admin",
      action: "INITIALIZE_CMS",
      module: "System",
      details: "Loaded verified Buildathon 2.0 – 2K26 official content schema",
      timestamp: new Date().toISOString(),
    },
  ],
};

export const CmsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem("cit_admin_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [event, setEvent] = useState(initialFallbackState.event);
  const [hero, setHero] = useState(initialFallbackState.hero);
  const [navbar, setNavbar] = useState(initialFallbackState.navbar);
  const [sections, setSections] = useState(initialFallbackState.sections);
  const [stats, setStats] = useState(initialFallbackState.stats);
  const [about, setAbout] = useState(initialFallbackState.about);
  const [theme, setTheme] = useState(initialFallbackState.theme);
  const [domains, setDomains] = useState(initialFallbackState.domains);
  const [problems, setProblems] = useState(initialFallbackState.problems);
  const [timeline, setTimeline] = useState(initialFallbackState.timeline);
  const [rules, setRules] = useState(initialFallbackState.rules);
  const [benefits, setBenefits] = useState(initialFallbackState.benefits);
  const [patrons, setPatrons] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("cit_buildathon_custom_patrons");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch {
        // fallback
      }
    }
    return initialFallbackState.patrons;
  });
  const [coordinators, setCoordinators] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(
          "cit_buildathon_custom_coordinators",
        );
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch {
        // fallback
      }
    }
    return initialFallbackState.coordinators;
  });
  const [faqs, setFaqs] = useState(initialFallbackState.faqs);
  const [announcements, setAnnouncements] = useState(
    initialFallbackState.announcements,
  );
  const [registration, setRegistration] = useState(
    initialFallbackState.registration,
  );
  const [media, setMedia] = useState(() => {
    let activePosterUrl = initialFallbackState.media.activePosterUrl;
    if (typeof window !== "undefined") {
      try {
        const customPoster = localStorage.getItem(
          "cit_buildathon_custom_poster",
        );
        if (customPoster) {
          activePosterUrl = customPoster;
        }
      } catch {
        // ignore
      }
    }
    return {
      ...initialFallbackState.media,
      activePosterUrl,
    };
  });
  const [auditLogs, setAuditLogs] = useState(initialFallbackState.auditLogs);

  // Fetch from backend API
  const refreshAll = async () => {
    try {
      const fetchJson = async (url: string) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const json = await res.json();
        return json.data;
      };

      const [
        eventData,
        heroData,
        navbarData,
        sectionsData,
        statsData,
        aboutData,
        themeData,
        domainsData,
        problemsData,
        timelineData,
        rulesData,
        patronsData,
        coordinatorsData,
        faqsData,
        announcementsData,
        registrationData,
        mediaData,
        auditLogsData,
      ] = await Promise.allSettled([
        fetchJson("/api/event"),
        fetchJson("/api/hero"),
        fetchJson("/api/navbar"),
        fetchJson("/api/sections"),
        fetchJson("/api/stats"),
        fetchJson("/api/about"),
        fetchJson("/api/theme"),
        fetchJson("/api/domains?all=true"),
        fetchJson("/api/problems?all=true"),
        fetchJson("/api/timeline"),
        fetchJson("/api/rules"),
        fetchJson("/api/patrons"),
        fetchJson("/api/coordinators"),
        fetchJson("/api/faqs"),
        fetchJson("/api/announcements?all=true"),
        fetchJson("/api/registration"),
        fetchJson("/api/media"),
        fetchJson("/api/audit-logs"),
      ]);

      if (eventData.status === "fulfilled" && eventData.value)
        setEvent(eventData.value);
      if (heroData.status === "fulfilled" && heroData.value)
        setHero(heroData.value);
      if (navbarData.status === "fulfilled" && navbarData.value)
        setNavbar(navbarData.value);
      if (sectionsData.status === "fulfilled" && sectionsData.value)
        setSections(sectionsData.value);
      if (statsData.status === "fulfilled" && statsData.value)
        setStats(statsData.value);
      if (aboutData.status === "fulfilled" && aboutData.value)
        setAbout(aboutData.value);
      if (themeData.status === "fulfilled" && themeData.value)
        setTheme(themeData.value);
      if (
        domainsData.status === "fulfilled" &&
        Array.isArray(domainsData.value)
      )
        setDomains(domainsData.value);
      if (
        problemsData.status === "fulfilled" &&
        Array.isArray(problemsData.value)
      )
        setProblems(problemsData.value);
      if (
        timelineData.status === "fulfilled" &&
        Array.isArray(timelineData.value)
      )
        setTimeline(timelineData.value);
      if (rulesData.status === "fulfilled" && Array.isArray(rulesData.value))
        setRules(rulesData.value);
      if (
        patronsData.status === "fulfilled" &&
        Array.isArray(patronsData.value)
      ) {
        setPatrons(patronsData.value);
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(
              "cit_buildathon_custom_patrons",
              JSON.stringify(patronsData.value),
            );
          } catch {
            // ignore
          }
        }
      } else if (typeof window !== "undefined") {
        try {
          const saved = localStorage.getItem("cit_buildathon_custom_patrons");
          if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
              setPatrons(parsed);
            }
          }
        } catch {
          // ignore
        }
      }
      if (
        coordinatorsData.status === "fulfilled" &&
        Array.isArray(coordinatorsData.value)
      ) {
        setCoordinators(coordinatorsData.value);
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(
              "cit_buildathon_custom_coordinators",
              JSON.stringify(coordinatorsData.value),
            );
          } catch {
            // ignore
          }
        }
      } else if (typeof window !== "undefined") {
        try {
          const saved = localStorage.getItem(
            "cit_buildathon_custom_coordinators",
          );
          if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
              setCoordinators(parsed);
            }
          }
        } catch {
          // ignore
        }
      }
      if (faqsData.status === "fulfilled" && Array.isArray(faqsData.value))
        setFaqs(faqsData.value);
      if (
        announcementsData.status === "fulfilled" &&
        Array.isArray(announcementsData.value)
      )
        setAnnouncements(announcementsData.value);
      if (registrationData.status === "fulfilled" && registrationData.value)
        setRegistration(registrationData.value);
      if (mediaData.status === "fulfilled" && mediaData.value) {
        let currentPoster =
          mediaData.value.activePosterUrl || "/official_poster.png";
        if (typeof window !== "undefined") {
          try {
            const customStored = localStorage.getItem(
              "cit_buildathon_custom_poster",
            );
            if (customStored) {
              currentPoster = customStored;
            }
          } catch {
            // ignore
          }
        }
        setMedia({
          ...mediaData.value,
          activePosterUrl: currentPoster,
        });
      }
      if (
        auditLogsData.status === "fulfilled" &&
        Array.isArray(auditLogsData.value)
      )
        setAuditLogs(auditLogsData.value);
    } catch (e) {
      console.warn(
        "API sync fallback active. Serving database cached store.",
        e,
      );
      setDomains((prev) => (prev.length === 0 ? defaultDomains : prev));
      setProblems((prev) => (prev.length === 0 ? defaultProblems : prev));
    } finally {
      setIsLoaded(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAll();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success && data.data?.user) {
        setUser(data.data.user);
        localStorage.setItem("cit_admin_user", JSON.stringify(data.data.user));
        return { success: true };
      }
      return {
        success: false,
        error: data.error?.message || "Invalid credentials",
      };
    } catch {
      // Offline fallback login for verification
      if (email === "admin@citgubbi.ac.in" && password === "admin123") {
        const fallbackUser: AdminUser = {
          id: "admin-01",
          name: "Prof. Mahesh / Dr. Suhas (CIT CSE Conveners)",
          email: "admin@citgubbi.ac.in",
          role: "SUPER_ADMIN",
        };
        setUser(fallbackUser);
        localStorage.setItem("cit_admin_user", JSON.stringify(fallbackUser));
        return { success: true };
      }
      return { success: false, error: "Network error or invalid credentials" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cit_admin_user");
  };

  // Helper for PUT/POST
  const apiPut = async (url: string, body: any) => {
    try {
      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (e) {
      console.warn("PUT API error:", e);
    }
  };

  const updateEvent = async (data: any) => {
    setEvent((prev: any) => ({ ...prev, ...data }));
    await apiPut("/api/event", data);
    await refreshAll();
  };

  const updateHero = async (data: any) => {
    setHero((prev: any) => ({ ...prev, ...data }));
    await apiPut("/api/hero", data);
    await refreshAll();
  };

  const updateNavbar = async (data: any[]) => {
    setNavbar(data);
    await apiPut("/api/navbar", data);
    await refreshAll();
  };

  const updateSections = async (data: any[]) => {
    setSections(data);
    await apiPut("/api/sections", data);
    await refreshAll();
  };

  const updateStats = async (data: any[]) => {
    setStats(data);
    await apiPut("/api/stats", data);
    await refreshAll();
  };

  const updateAbout = async (data: any) => {
    setAbout((prev: any) => ({ ...prev, ...data }));
    await apiPut("/api/about", data);
    await refreshAll();
  };

  const updateTheme = async (data: any) => {
    setTheme((prev: any) => ({ ...prev, ...data }));
    await apiPut("/api/theme", data);
    await refreshAll();
  };

  const addDomain = async (data: any) => {
    try {
      await fetch("/api/domains", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (e) {
      setDomains((prev) => [...prev, { ...data, id: `domain-${Date.now()}` }]);
    }
    await refreshAll();
  };

  const updateDomain = async (id: string, data: any) => {
    setDomains((prev) =>
      prev.map((d) =>
        String(d.id) === id || String(d.name).toLowerCase() === id.toLowerCase()
          ? { ...d, ...data }
          : d,
      ),
    );
    await apiPut(`/api/domains/${encodeURIComponent(id)}`, data);
    await refreshAll();
  };

  const deleteDomain = async (id: string) => {
    setDomains((prev) =>
      prev.filter(
        (d) =>
          String(d.id) !== id &&
          String(d.name).toLowerCase() !== id.toLowerCase(),
      ),
    );
    try {
      await fetch(`/api/domains/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.warn("Delete domain error:", e);
    }
    await refreshAll();
  };

  const updateAllDomains = async (data: any[]) => {
    setDomains(data);
    await apiPut("/api/domains", data);
    await refreshAll();
  };

  const resetDomainsToDefault = async () => {
    setDomains(defaultDomains);
    await apiPut("/api/domains", defaultDomains);
    await refreshAll();
  };

  const addProblem = async (data: any) => {
    try {
      await fetch("/api/problems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (e) {
      setProblems((prev) => [...prev, { ...data, id: `prob-${Date.now()}` }]);
    }
    await refreshAll();
  };

  const updateProblem = async (id: string, data: any) => {
    setProblems((prev) =>
      prev.map((p) => (String(p.id) === id ? { ...p, ...data } : p)),
    );
    await apiPut(`/api/problems/${encodeURIComponent(id)}`, data);
    await refreshAll();
  };

  const deleteProblem = async (id: string) => {
    setProblems((prev) => prev.filter((p) => String(p.id) !== id));
    try {
      await fetch(`/api/problems/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.warn("Delete problem error:", e);
    }
    await refreshAll();
  };

  const updateAllProblems = async (data: any[]) => {
    setProblems(data);
    await apiPut("/api/problems", data);
    await refreshAll();
  };

  const resetProblemsToDefault = async () => {
    setProblems(defaultProblems);
    await apiPut("/api/problems", defaultProblems);
    await refreshAll();
  };

  const updateTimeline = async (data: any[]) => {
    setTimeline(data);
    await apiPut("/api/timeline", data);
    await refreshAll();
  };

  const updateRules = async (data: any[]) => {
    setRules(data);
    await apiPut("/api/rules", data);
    await refreshAll();
  };

  const updateCoordinators = async (data: any[]) => {
    const cleanData = Array.isArray(data) ? data : [];
    setCoordinators(cleanData);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          "cit_buildathon_custom_coordinators",
          JSON.stringify(cleanData),
        );
      } catch (err) {
        console.warn("Could not save coordinators to localStorage:", err);
      }
    }
    await apiPut("/api/coordinators", cleanData);
    await refreshAll();
  };

  const updateCoordinator = async (id: string, data: any) => {
    const target = String(id).trim();
    const updated = coordinators.map((c: any) =>
      String(c.id).trim() === target ||
      String(c.name).trim().toLowerCase() === target.toLowerCase()
        ? { ...c, ...data }
        : c,
    );
    await updateCoordinators(updated);
  };

  const addCoordinator = async (data: any) => {
    const newCoord = {
      ...data,
      id: data.id || `coord-${Date.now()}`,
    };
    const updated = [...coordinators, newCoord];
    await updateCoordinators(updated);
  };

  const deleteCoordinator = async (id: string) => {
    const target = String(id).trim();
    const updated = coordinators.filter(
      (c: any) =>
        String(c.id).trim() !== target &&
        String(c.name).trim().toLowerCase() !== target.toLowerCase(),
    );
    setCoordinators(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          "cit_buildathon_custom_coordinators",
          JSON.stringify(updated),
        );
      } catch (err) {
        console.warn("Could not save coordinators to localStorage:", err);
      }
    }
    try {
      await fetch(`/api/coordinators/${encodeURIComponent(target)}`, {
        method: "DELETE",
      });
      await apiPut("/api/coordinators", updated);
    } catch (e) {
      console.warn("Delete coordinator error:", e);
    }
    await refreshAll();
  };

  const uploadCoordinatorPhoto = async (id: string, photoDataUrl: string) => {
    const target = String(id).trim();
    const updated = coordinators.map((c: any) =>
      String(c.id).trim() === target ||
      String(c.name).trim().toLowerCase() === target.toLowerCase()
        ? { ...c, imageUrl: photoDataUrl }
        : c,
    );
    await updateCoordinators(updated);
  };

  const deleteCoordinatorPhoto = async (id: string) => {
    const target = String(id).trim();
    const updated = coordinators.map((c: any) => {
      if (
        String(c.id).trim() === target ||
        String(c.name).trim().toLowerCase() === target.toLowerCase()
      ) {
        const copy = { ...c };
        delete copy.imageUrl;
        delete copy.photo;
        delete copy.image;
        return copy;
      }
      return c;
    });
    await updateCoordinators(updated);
    try {
      await fetch(`/api/coordinators/${encodeURIComponent(target)}/image`, {
        method: "DELETE",
      });
    } catch (e) {
      console.warn("Delete coordinator photo error:", e);
    }
  };

  const resetCoordinatorsToDefault = async () => {
    await updateCoordinators(initialFallbackState.coordinators);
  };

  const updatePatrons = async (data: any[]) => {
    const cleanData = Array.isArray(data) ? data : [];
    setPatrons(cleanData);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          "cit_buildathon_custom_patrons",
          JSON.stringify(cleanData),
        );
      } catch (err) {
        console.warn("Could not save patrons to localStorage:", err);
      }
    }
    await apiPut("/api/patrons", cleanData);
    await refreshAll();
  };

  const updatePatron = async (id: string, data: any) => {
    const target = String(id).trim();
    const updated = patrons.map((p: any) =>
      String(p.id).trim() === target ||
      String(p.name).trim().toLowerCase() === target.toLowerCase()
        ? { ...p, ...data }
        : p,
    );
    await updatePatrons(updated);
  };

  const addPatron = async (data: any) => {
    const newPatron = {
      id: data.id || `p-${Date.now()}`,
      status: "PUBLISHED",
      displayOrder: patrons.length + 1,
      ...data,
    };
    const updated = [...patrons, newPatron];
    await updatePatrons(updated);
  };

  const deletePatron = async (id: string) => {
    const target = String(id).trim();
    const updated = patrons.filter(
      (p: any) =>
        String(p.id).trim() !== target &&
        String(p.name).trim().toLowerCase() !== target.toLowerCase(),
    );
    setPatrons(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          "cit_buildathon_custom_patrons",
          JSON.stringify(updated),
        );
      } catch (err) {
        console.warn("Could not save patrons to localStorage:", err);
      }
    }
    try {
      await fetch(`/api/patrons/${encodeURIComponent(target)}`, {
        method: "DELETE",
      });
      await apiPut("/api/patrons", updated);
    } catch (e) {
      console.warn("Delete patron error:", e);
    }
    await refreshAll();
  };

  const uploadPatronPhoto = async (id: string, photoDataUrl: string) => {
    const target = String(id).trim();
    const updated = patrons.map((p: any) =>
      String(p.id).trim() === target ||
      String(p.name).trim().toLowerCase() === target.toLowerCase()
        ? { ...p, imageUrl: photoDataUrl }
        : p,
    );
    await updatePatrons(updated);
  };

  const deletePatronPhoto = async (id: string) => {
    const target = String(id).trim();
    const updated = patrons.map((p: any) => {
      if (
        String(p.id).trim() === target ||
        String(p.name).trim().toLowerCase() === target.toLowerCase()
      ) {
        const copy = { ...p };
        delete copy.imageUrl;
        delete copy.photo;
        delete copy.image;
        return copy;
      }
      return p;
    });
    await updatePatrons(updated);
    try {
      await fetch(`/api/patrons/${encodeURIComponent(target)}/image`, {
        method: "DELETE",
      });
    } catch (e) {
      console.warn("Delete patron photo error:", e);
    }
  };

  const resetPatronsToDefault = async () => {
    await updatePatrons(initialFallbackState.patrons);
  };

  const updateFaqs = async (data: any[]) => {
    setFaqs(data);
    await apiPut("/api/faqs", data);
    await refreshAll();
  };

  const addAnnouncement = async (data: any) => {
    try {
      await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (e) {
      setAnnouncements((prev) => [data, ...prev]);
    }
    await refreshAll();
  };

  const deleteAnnouncement = async (id: string) => {
    try {
      await fetch(`/api/announcements/${id}`, { method: "DELETE" });
    } catch (e) {
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    }
    await refreshAll();
  };

  const updateRegistration = async (data: any) => {
    setRegistration((prev: any) => ({ ...prev, ...data }));
    await apiPut("/api/registration", data);
    await refreshAll();
  };

  const updateActiveLogo = async (logoUrl: string) => {
    setMedia((prev: any) => ({ ...prev, activeCollegeLogo: logoUrl }));
    await apiPut("/api/media/active-logo", { activeCollegeLogo: logoUrl });
    await refreshAll();
  };

  const updateActivePoster = async (posterUrl: string) => {
    if (typeof window !== "undefined") {
      try {
        if (posterUrl && posterUrl !== "/official_poster.png") {
          localStorage.setItem("cit_buildathon_custom_poster", posterUrl);
        } else {
          localStorage.removeItem("cit_buildathon_custom_poster");
        }
      } catch (err) {
        console.warn("Could not save poster to localStorage:", err);
      }
    }
    const finalPoster = posterUrl || "/official_poster.png";
    setMedia((prev: any) => ({ ...prev, activePosterUrl: finalPoster }));
    try {
      await apiPut("/api/media/active-poster", {
        activePosterUrl: finalPoster,
      });
    } catch {
      // Backend may be offline or in mock mode; local state and localStorage are already updated!
    }
    await refreshAll();
  };

  return (
    <CmsContext.Provider
      value={{
        loading,
        isLoaded,
        user,
        event,
        hero,
        navbar,
        sections,
        stats,
        about,
        theme,
        domains,
        problems,
        timeline,
        rules,
        benefits,
        patrons,
        coordinators,
        faqs,
        announcements,
        registration,
        media,
        auditLogs,

        login,
        logout,
        updateEvent,
        updateHero,
        updateNavbar,
        updateSections,
        updateStats,
        updateAbout,
        updateTheme,
        addDomain,
        updateDomain,
        deleteDomain,
        updateAllDomains,
        resetDomainsToDefault,
        addProblem,
        updateProblem,
        deleteProblem,
        updateAllProblems,
        resetProblemsToDefault,
        updateTimeline,
        updateRules,
        updatePatrons,
        updatePatron,
        addPatron,
        deletePatron,
        uploadPatronPhoto,
        deletePatronPhoto,
        resetPatronsToDefault,
        updateCoordinators,
        updateCoordinator,
        addCoordinator,
        deleteCoordinator,
        uploadCoordinatorPhoto,
        deleteCoordinatorPhoto,
        resetCoordinatorsToDefault,
        updateFaqs,
        addAnnouncement,
        deleteAnnouncement,
        updateRegistration,
        updateActiveLogo,
        updateActivePoster,
        refreshAll,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error("useCms must be used within a CmsProvider");
  }
  return context;
};
