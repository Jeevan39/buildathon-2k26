import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_DIR = path.join(__dirname, "../data");
const DB_FILE = path.join(DB_DIR, "cms_database.json");

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

export interface CmsDatabase {
  event: {
    name: string;
    shortName: string;
    edition: string;
    year: string;
    tagline: string;
    theme: string;
    description: string;
    organizer: string;
    department: string;
    inConnectionWith: string;
    venue: string;
    address: string;
    road: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
    dates: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    duration: string;
    durationHours: number;
    eventMode: string;
    eligibility: string;
    teamSize: string;
    minTeamSize: number;
    maxTeamSize: number;
    prizePool: string;
    prizePoolAmount: number;
    status:
      | "DRAFT"
      | "REGISTRATION_OPEN"
      | "REGISTRATION_CLOSED"
      | "EVENT_LIVE"
      | "EVENT_COMPLETED";
    registrationFee: string;
    registrationDeadline: string;
    registrationUrl: string;
    googleMapsEmbedUrl: string;
    social: {
      instagram: string;
      instagramHandle: string;
      hashtag: string;
    };
  };
  hero: {
    smallLabel: string;
    title: string;
    editionBadge: string;
    yearBadge: string;
    subtitle: string;
    tagline: string;
    description: string;
    primaryButtonText: string;
    primaryButtonUrl: string;
    secondaryButtonText: string;
    secondaryButtonUrl: string;
    showCountdown: boolean;
    countdownTargetDate: string;
    animationEnabled: boolean;
  };
  navbar: Array<{
    id: string;
    label: string;
    target: string;
    isExternal: boolean;
    enabled: boolean;
    displayOrder: number;
  }>;
  sections: Array<{
    id: string;
    name: string;
    enabled: boolean;
    displayOrder: number;
  }>;
  stats: Array<{
    id: string;
    number: string;
    label: string;
    subtext: string;
    icon: string;
    displayOrder: number;
    active: boolean;
  }>;
  about: {
    sectionLabel: string;
    heading: string;
    description: string;
    supportingText: string;
    quote: string;
    organizingNote: string;
    badges: string[];
    cardTitle: string;
    cardHighlight: string;
    cardDescription: string;
  };
  theme: {
    label: string;
    heading: string;
    quote: string;
    description: string;
    pillars: Array<{
      title: string;
      description: string;
      icon: string;
      color: string;
    }>;
  };
  domains: Array<{
    id: string;
    domainNumber: string;
    name: string;
    shortDescription: string;
    longDescription?: string;
    iconName: string;
    tags: string[];
    accentColor: string;
    displayOrder: number;
    status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  }>;
  problems: Array<{
    id: string;
    problemId: string;
    slug: string;
    title: string;
    domainId: string;
    domainName: string;
    shortDescription: string;
    background: string;
    problemDescription: string;
    expectedOutcome: string;
    requirements: string[];
    constraints: string[];
    resources: string[];
    difficulty?: "Beginner" | "Intermediate" | "Advanced";
    isDemoData: boolean;
    displayOrder: number;
    status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
    createdAt: string;
    updatedAt: string;
  }>;
  timeline: Array<{
    id: string;
    step: string;
    dayNumber: number;
    dayLabel: string;
    date: string;
    title: string;
    description: string;
    displayOrder: number;
    status: "PUBLISHED" | "DRAFT";
  }>;
  rules: Array<{
    id: string;
    category: string;
    ruleText: string;
    displayOrder: number;
    status: "PUBLISHED" | "DRAFT";
  }>;
  benefits: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    tag: string;
    displayOrder: number;
    status: "PUBLISHED" | "DRAFT";
  }>;
  patrons: Array<{
    id: string;
    name: string;
    role: string;
    designation: string;
    category: "CHIEF PATRON" | "PATRON";
    photoUrl?: string;
    displayOrder: number;
    status: "PUBLISHED" | "DRAFT";
  }>;
  coordinators: Array<{
    id: string;
    name: string;
    phone?: string;
    formattedPhone?: string;
    email?: string;
    role: string;
    category: "STUDENT" | "FACULTY";
    displayOrder: number;
    status: "PUBLISHED" | "DRAFT";
  }>;
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
    category: string;
    displayOrder: number;
    status: "PUBLISHED" | "DRAFT";
  }>;
  announcements: Array<{
    id: string;
    title: string;
    shortMessage: string;
    fullMessage?: string;
    priority: "NORMAL" | "IMPORTANT" | "URGENT";
    linkUrl?: string;
    linkText?: string;
    publishDate: string;
    expiryDate?: string;
    status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  }>;
  registration: {
    status: "OPEN" | "CLOSED" | "COMING_SOON";
    feePerTeam: string;
    feeAmount: number;
    teamSizeLabel: string;
    deadline: string;
    registrationUrl: string;
    buttonText: string;
    policyNote: string;
  };
  media: {
    activeCollegeLogo: string;
    activeHackathonLogo?: string;
    activePosterUrl: string;
    activeFavicon: string;
    assets: Array<{
      id: string;
      name: string;
      category: "Brand" | "Poster" | "Hero" | "Document" | "Other";
      url: string;
      uploadedAt: string;
    }>;
  };
  auditLogs: Array<{
    id: string;
    adminName: string;
    action: string;
    module: string;
    details: string;
    timestamp: string;
  }>;
}

const defaultInitialDatabase: CmsDatabase = {
  event: {
    name: "BUILDATHON 2.0 – 2K26",
    shortName: "Buildathon 2.0",
    edition: "2.0",
    year: "2K26",
    tagline: "INNOVATE. CODE. IMPACT.",
    theme:
      "Building Intelligent Solutions for a Smarter, Sustainable & Secure Tomorrow",
    description:
      "A National Level 24-Hour Hackathon empowering student developers to build intelligent real-world solutions across 5 multidisciplinary domains.",
    organizer:
      "Department of Computer Science and Engineering, Channabasaveshwara Institute of Technology",
    department: "Department of Computer Science and Engineering",
    inConnectionWith: "KNEW-2K26",
    venue: "CIT Campus, Gubbi, Tumkur",
    address:
      "CIT Campus, NH 206 (B.H. Road), Gubbi, Tumkur – 572 216, Karnataka",
    road: "NH 206 (B.H. Road)",
    city: "Gubbi",
    district: "Tumkur (Tumakuru)",
    state: "Karnataka",
    pincode: "572216",
    dates: "30 & 31 October 2026",
    startDate: "2026-10-30T09:00:00+05:30",
    endDate: "2026-10-31T17:00:00+05:30",
    startTime: "09:00 AM",
    endTime: "05:00 PM",
    duration: "24 Hours – Build, Solve & Innovate",
    durationHours: 24,
    eventMode: "Offline (In-Person at CIT Campus)",
    eligibility: "Open to all UG students from any college, across the nation",
    teamSize: "3–4 members per team",
    minTeamSize: 3,
    maxTeamSize: 4,
    prizePool: "₹30K",
    prizePoolAmount: 30000,
    status: "REGISTRATION_OPEN",
    registrationFee: "₹500/- per team",
    registrationDeadline: "25 October 2026",
    registrationUrl: "https://forms.gle/YN35pBeytcHqmPHj7",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3883.332303588235!2d76.93883927508215!3d13.329683986976936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb02c2e0b57e7f9%3A0x6730dc651ea652bc!2sChannabasaveshwara%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
    social: {
      instagram: "https://www.instagram.com/spark_it_cse_cit/",
      instagramHandle: "@spark_it_cse_cit",
      hashtag: "#BUILDATHON2K26",
    },
  },
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
    primaryButtonUrl: "https://forms.gle/YN35pBeytcHqmPHj7",
    secondaryButtonText: "EXPLORE HACKATHON",
    secondaryButtonUrl: "#about",
    showCountdown: true,
    countdownTargetDate: "2026-10-30T09:00:00+05:30",
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
  stats: [
    {
      id: "stat-1",
      number: "24 HOURS",
      label: "Hackathon Duration",
      subtext: "Non-stop engineering & problem solving",
      icon: "Clock",
      displayOrder: 1,
      active: true,
    },
    {
      id: "stat-2",
      number: "₹30K",
      label: "Prize Pool",
      subtext: "Cash rewards, awards & recognitions",
      icon: "Trophy",
      displayOrder: 2,
      active: true,
    },
    {
      id: "stat-3",
      number: "3–4",
      label: "Team Members",
      subtext: "Collaborative squad innovation",
      icon: "Users",
      displayOrder: 3,
      active: true,
    },
    {
      id: "stat-4",
      number: "NATIONAL",
      label: "Hackathon Scope",
      subtext: "Open to all UG students across India",
      icon: "Globe",
      displayOrder: 4,
      active: true,
    },
  ],
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
  domains: [
    {
      id: "healthcare",
      domainNumber: "01",
      name: "Healthcare & Well-Being",
      shortDescription:
        "Developing AI-assisted healthcare systems, preventive diagnostic tools, remote patient monitoring, and mental wellness platforms.",
      iconName: "HeartPulse",
      tags: ["Digital Health", "Medical AI", "Telemedicine", "Patient Care"],
      accentColor: "from-rose-500 to-red-600",
      displayOrder: 1,
      status: "PUBLISHED",
    },
    {
      id: "agriculture",
      domainNumber: "02",
      name: "Agriculture & Food Security",
      shortDescription:
        "Empowering farmers with smart crop monitoring, precision irrigation, soil analytics, yield forecasting, and transparent food supply chains.",
      iconName: "Sprout",
      tags: ["AgriTech", "Precision Farming", "Supply Chain", "Soil IoT"],
      accentColor: "from-emerald-500 to-green-600",
      displayOrder: 2,
      status: "PUBLISHED",
    },
    {
      id: "smart-cities",
      domainNumber: "03",
      name: "Smart Cities & Mobility",
      shortDescription:
        "Architecting intelligent urban transit, smart grid power distribution, IoT waste management, and secure municipal infrastructure.",
      iconName: "Building2",
      tags: [
        "Urban Tech",
        "IoT Infrastructure",
        "Smart Traffic",
        "Clean Transit",
      ],
      accentColor: "from-sky-500 to-blue-600",
      displayOrder: 3,
      status: "PUBLISHED",
    },
    {
      id: "education",
      domainNumber: "04",
      name: "Education & Digital Society",
      shortDescription:
        "Innovating personalized learning algorithms, accessibility solutions for differently-abled learners, and inclusive digital governance.",
      iconName: "GraduationCap",
      tags: ["EdTech", "Digital Inclusion", "Accessible UI", "Skill AI"],
      accentColor: "from-indigo-500 to-purple-600",
      displayOrder: 4,
      status: "PUBLISHED",
    },
    {
      id: "climate",
      domainNumber: "05",
      name: "Climate, Environment & Sustainability",
      shortDescription:
        "Combatting climate change with carbon tracking, renewable energy optimization, wildlife conservation, and circular economy tools.",
      iconName: "Leaf",
      tags: ["CleanTech", "Carbon Accounting", "Renewables", "Eco Systems"],
      accentColor: "from-teal-500 to-emerald-600",
      displayOrder: 5,
      status: "PUBLISHED",
    },
  ],
  problems: [
    {
      id: "prob-01",
      problemId: "DEMO-HC-01",
      slug: "ai-early-symptom-analysis",
      title: "AI-Powered Early Symptom Analysis & Rural Triage Assistant",
      domainId: "healthcare",
      domainName: "Healthcare & Well-Being",
      isDemoData: true,
      shortDescription:
        "Create a low-bandwidth, multilingual voice/text diagnostic assistant helping primary health workers prioritize urgent cases in rural clinics.",
      background:
        "Rural healthcare centers in India frequently operate with minimal specialized doctors, causing treatment delays for critical conditions.",
      problemDescription:
        "Design a lightweight, privacy-preserving mobile or web application enabling community healthcare workers to conduct structured symptom assessments in local languages.",
      expectedOutcome:
        "A functioning prototype with multi-language inputs, offline-first triage capability, and automated referral severity score.",
      requirements: [
        "Offline sync support",
        "Multilingual audio/text interface (Kannada, Hindi, English)",
        "FHIR standard data compatibility",
        "Explainable triage recommendations",
      ],
      constraints: [
        "Must not prescribe prescription medication directly",
        "End-to-end data encryption for sensitive patient health records",
      ],
      resources: [
        "Ayushman Bharat Digital Mission (ABDM) sandbox APIs",
        "WHO Triage protocols",
      ],
      difficulty: "Intermediate",
      displayOrder: 1,
      status: "PUBLISHED",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "prob-02",
      problemId: "DEMO-AG-01",
      slug: "crop-disease-detection",
      title: "Multispectral Crop Disease Detection & Localized Advisory",
      domainId: "agriculture",
      domainName: "Agriculture & Food Security",
      isDemoData: true,
      shortDescription:
        "Build a computer vision model that identifies plant disease from phone camera photos and provides affordable non-chemical remedies.",
      background:
        "Smallholder farmers lose an estimated 20-40% of their crop yields each season to pests and blights that are diagnosed too late.",
      problemDescription:
        "Build a progressive web application enabling quick leaf photography, instant offline disease classification, and local weather-synced spraying advisories.",
      expectedOutcome:
        "Interactive web dashboard and mobile interface showing instant leaf disease detection with precision confidence scores.",
      requirements: [
        "Edge-deployable lightweight inference (TensorFlow.js / ONNX)",
        "Treatment remedies prioritizing biological and low-cost natural remedies",
        "Local weather forecast integration",
      ],
      constraints: [
        "Model inference must execute under 2 seconds on mid-range Android phones",
      ],
      resources: [
        "PlantVillage open disease dataset",
        "IMD open meteorological APIs",
      ],
      difficulty: "Intermediate",
      displayOrder: 2,
      status: "PUBLISHED",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "prob-03",
      problemId: "DEMO-SC-01",
      slug: "smart-traffic-emergency-routing",
      title: "Dynamic Smart Traffic Congestion & Emergency Vehicle Routing",
      domainId: "smart-cities",
      domainName: "Smart Cities & Mobility",
      isDemoData: true,
      shortDescription:
        "Implement an algorithmic green-corridor system that synchronizes traffic signals in real-time when emergency vehicles approach.",
      background:
        "Traffic bottlenecks in rapidly expanding tier-2 and tier-1 Indian cities delay ambulances and fire tenders, costing critical life-saving minutes.",
      problemDescription:
        "Develop an automated telemetry integration between emergency vehicles and municipal signal controllers to pre-clear bottlenecks.",
      expectedOutcome:
        "Simulation interface proving at least 35% reduction in transit delay for emergency responders across a simulated 10-node road network.",
      requirements: [
        "Real-time GPS telemetry websocket simulation",
        "Visual command dashboard for city transit operators",
        "Fallback safety fail-safe if network drops",
      ],
      constraints: ["Zero manual signal override latency greater than 500ms"],
      resources: [
        "OpenStreetMap Overpass API",
        "SUMO (Simulation of Urban MObility)",
      ],
      difficulty: "Advanced",
      displayOrder: 3,
      status: "PUBLISHED",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  timeline: [
    {
      id: "tl-1",
      step: "01",
      dayNumber: 1,
      dayLabel: "DAY 1",
      date: "30 OCTOBER 2026",
      title: "Reporting & Registration",
      description:
        "Teams arrive at CIT Campus, verify college IDs, receive participant kits, access badges, and connect to high-speed venue network.",
      displayOrder: 1,
      status: "PUBLISHED",
    },
    {
      id: "tl-2",
      step: "02",
      dayNumber: 1,
      dayLabel: "DAY 1",
      date: "30 OCTOBER 2026",
      title: "Inaugural Ceremony",
      description:
        "Official opening addresses by Chief Patrons, dignitaries from Department of CSE, faculty coordinators, and guest industry speakers.",
      displayOrder: 2,
      status: "PUBLISHED",
    },
    {
      id: "tl-3",
      step: "03",
      dayNumber: 1,
      dayLabel: "DAY 1",
      date: "30 OCTOBER 2026",
      title: "Hackathon Begins – 24 Hours Start",
      description:
        "Countdown timer kicks off! Problem statements locked in, Git repositories initialized, and non-stop 24-hour coding commences.",
      displayOrder: 3,
      status: "PUBLISHED",
    },
    {
      id: "tl-4",
      step: "04",
      dayNumber: 1,
      dayLabel: "DAY 1",
      date: "30 OCTOBER 2026",
      title: "Mentoring & Guidance Sessions",
      description:
        "Expert mentors visit team tables to review architecture, suggest technical improvements, and debug blockers.",
      displayOrder: 4,
      status: "PUBLISHED",
    },
    {
      id: "tl-5",
      step: "05",
      dayNumber: 1,
      dayLabel: "DAY 1",
      date: "30 OCTOBER 2026",
      title: "Evaluation Round 1",
      description:
        "First milestone review: Judges evaluate problem alignment, architectural schema, database designs, and initial working prototype.",
      displayOrder: 5,
      status: "PUBLISHED",
    },
    {
      id: "tl-6",
      step: "01",
      dayNumber: 2,
      dayLabel: "DAY 2",
      date: "31 OCTOBER 2026",
      title: "Evaluation Round 2",
      description:
        "Second milestone review: Detailed code quality assessment, feature completeness check, UI/UX polish, and stress testing.",
      displayOrder: 6,
      status: "PUBLISHED",
    },
    {
      id: "tl-7",
      step: "02",
      dayNumber: 2,
      dayLabel: "DAY 2",
      date: "31 OCTOBER 2026",
      title: "Final Presentations",
      description:
        "Top selected finalist teams present live demonstrations on stage before the distinguished judging panel followed by Q&A.",
      displayOrder: 7,
      status: "PUBLISHED",
    },
    {
      id: "tl-8",
      step: "03",
      dayNumber: 2,
      dayLabel: "DAY 2",
      date: "31 OCTOBER 2026",
      title: "Valedictory",
      description:
        "Celebration of 24 hours of innovation, experience sharing by participants, feedback sessions, and concluding remarks by leadership.",
      displayOrder: 8,
      status: "PUBLISHED",
    },
    {
      id: "tl-9",
      step: "04",
      dayNumber: 2,
      dayLabel: "DAY 2",
      date: "31 OCTOBER 2026",
      title: "Prize Distribution",
      description:
        "Grand announcement of winners, presentation of ₹30K cash awards, distribution of trophies, certificates, and closing moments.",
      displayOrder: 9,
      status: "PUBLISHED",
    },
  ],
  rules: [
    {
      id: "r-1",
      category: "Participation",
      ruleText: "Teams must have 3–4 members to be eligible for participation.",
      displayOrder: 1,
      status: "PUBLISHED",
    },
    {
      id: "r-2",
      category: "Participation",
      ruleText:
        "Each team selects one problem statement from any of the five domains and builds their own solution around it — the choice of problem statement is entirely up to the team.",
      displayOrder: 2,
      status: "PUBLISHED",
    },
    {
      id: "r-3",
      category: "Participation",
      ruleText:
        "All team members must be currently enrolled Undergraduate (UG) students from any recognized college or university across the nation.",
      displayOrder: 3,
      status: "PUBLISHED",
    },
    {
      id: "r-4",
      category: "Equipment & Hardware",
      ruleText:
        "Participants must bring their own laptops and necessary tools (chargers, adapters, peripherals).",
      displayOrder: 4,
      status: "PUBLISHED",
    },
    {
      id: "r-5",
      category: "Equipment & Hardware",
      ruleText:
        "IoT hardware, specialized microcontrollers, sensors, or auxiliary test devices will not be provided by the organizers.",
      displayOrder: 5,
      status: "PUBLISHED",
    },
    {
      id: "r-6",
      category: "Evaluation & Submissions",
      ruleText:
        "The event will have two evaluation rounds and a final presentation. Teams must adhere to submission deadlines.",
      displayOrder: 6,
      status: "PUBLISHED",
    },
    {
      id: "r-7",
      category: "Judging Criteria",
      ruleText:
        "Judging will be based on innovation, functionality, technical execution, and impact.",
      displayOrder: 7,
      status: "PUBLISHED",
    },
    {
      id: "r-8",
      category: "General & Institutional",
      ruleText:
        "The registration fee is non-refundable under any circumstances.",
      displayOrder: 8,
      status: "PUBLISHED",
    },
    {
      id: "r-9",
      category: "General & Institutional",
      ruleText:
        "The organizers reserve the right to modify event details if necessary.",
      displayOrder: 9,
      status: "PUBLISHED",
    },
    {
      id: "r-10",
      category: "General & Institutional",
      ruleText:
        "Judges' decision will be final — no further arguments entertained.",
      displayOrder: 10,
      status: "PUBLISHED",
    },
    {
      id: "r-11",
      category: "General & Institutional",
      ruleText:
        "Participants will be held responsible for any damage caused to institution property.",
      displayOrder: 11,
      status: "PUBLISHED",
    },
    {
      id: "r-12",
      category: "General & Institutional",
      ruleText:
        "Any mischievous or unfair activity found during the event will lead to immediate disqualification of the team.",
      displayOrder: 12,
      status: "PUBLISHED",
    },
  ],
  benefits: [
    {
      id: "b-1",
      title: "E-Certificates",
      description:
        "Official verifiable participation and merit e-certificates awarded to all registered attendees.",
      icon: "Award",
      tag: "All Participants",
      displayOrder: 1,
      status: "PUBLISHED",
    },
    {
      id: "b-2",
      title: "Exciting Prizes",
      description:
        "Win cash rewards worth ₹30K, prestigious trophies, sponsor goodies, and recognition.",
      icon: "Trophy",
      tag: "₹30K Pool",
      displayOrder: 2,
      status: "PUBLISHED",
    },
    {
      id: "b-3",
      title: "Meals Provided",
      description:
        "Enjoy complimentary hearty meals, late-night fuel, energy drinks, and tea/coffee refreshments.",
      icon: "Coffee",
      tag: "Complimentary",
      displayOrder: 3,
      status: "PUBLISHED",
    },
    {
      id: "b-4",
      title: "Accommodation",
      description:
        "Clean and secure stay arrangements available on-campus for outstation participants.",
      icon: "Home",
      tag: "Outstation Teams",
      displayOrder: 4,
      status: "PUBLISHED",
    },
  ],
  patrons: [
    {
      id: "p-1",
      name: "SRI. G S BASAVARAJ",
      role: "Chairman, CIT Group of Institutions",
      designation: "Former M.P, Tumakuru Lok Sabha",
      category: "CHIEF PATRON",
      displayOrder: 1,
      status: "PUBLISHED",
    },
    {
      id: "p-2",
      name: "SRI. G B JYOTHI GANESH",
      role: "Secretary & Managing Director, CIT Group of Institutions",
      designation: "M.L.A, Tumakuru City Constituency",
      category: "CHIEF PATRON",
      displayOrder: 2,
      status: "PUBLISHED",
    },
    {
      id: "p-3",
      name: "Dr. SURESH D S",
      role: "Director, CIT Group of Institutions",
      designation: "Chairman, ISTE Karnataka Section",
      category: "PATRON",
      displayOrder: 3,
      status: "PUBLISHED",
    },
    {
      id: "p-4",
      name: "Dr. SHANTALA C P",
      role: "Vice-Principal, HOD Dept. of CSE",
      designation: "Director, CADC, CIT Gubbi",
      category: "PATRON",
      displayOrder: 4,
      status: "PUBLISHED",
    },
  ],
  coordinators: [
    {
      id: "c-1",
      name: "Supriya R",
      phone: "9148721325",
      formattedPhone: "+91 91487 21325",
      role: "Student Lead",
      category: "STUDENT",
      displayOrder: 1,
      status: "PUBLISHED",
    },
    {
      id: "c-2",
      name: "Siri Manjunath Wodiyer",
      phone: "8122315329",
      formattedPhone: "+91 81223 15329",
      role: "Student Lead",
      category: "STUDENT",
      displayOrder: 2,
      status: "PUBLISHED",
    },
    {
      id: "c-3",
      name: "Afifa Muqthar",
      phone: "9113070765",
      formattedPhone: "+91 91130 70765",
      role: "Student Lead",
      category: "STUDENT",
      displayOrder: 3,
      status: "PUBLISHED",
    },
    {
      id: "c-4",
      name: "Gagana H",
      phone: "7676623978",
      formattedPhone: "+91 76766 23978",
      role: "Student Lead",
      category: "STUDENT",
      displayOrder: 4,
      status: "PUBLISHED",
    },
    {
      id: "c-5",
      name: "Dr. Suhas K C",
      phone: "9844987877",
      formattedPhone: "+91 98449 87877",
      role: "Faculty Convener",
      category: "FACULTY",
      displayOrder: 5,
      status: "PUBLISHED",
    },
    {
      id: "c-6",
      name: "Prof. Mahesh N",
      phone: "9742045203",
      formattedPhone: "+91 97420 45203",
      role: "Faculty Coordinator",
      category: "FACULTY",
      displayOrder: 6,
      status: "PUBLISHED",
    },
    {
      id: "c-7",
      name: "Prof. Kotresh Naik D",
      role: "Faculty Coordinator",
      category: "FACULTY",
      displayOrder: 7,
      status: "PUBLISHED",
    },
    {
      id: "c-8",
      name: "Prof. Shobha A",
      role: "Faculty Coordinator",
      category: "FACULTY",
      displayOrder: 8,
      status: "PUBLISHED",
    },
    {
      id: "c-9",
      name: "Prof. Shwetha S",
      role: "Faculty Coordinator",
      category: "FACULTY",
      displayOrder: 9,
      status: "PUBLISHED",
    },
  ],
  faqs: [
    {
      id: "faq-1",
      question: "Who can participate?",
      answer:
        "The hackathon is open to all Undergraduate (UG) students from any college or university across the nation, regardless of branch or semester.",
      category: "Eligibility",
      displayOrder: 1,
      status: "PUBLISHED",
    },
    {
      id: "faq-2",
      question: "What is the team size?",
      answer:
        "Teams must consist of exactly 3 to 4 members. Solo participation or teams of 2 or 5+ members are not permitted as per the official rules.",
      category: "Teams",
      displayOrder: 2,
      status: "PUBLISHED",
    },
    {
      id: "faq-3",
      question: "What is the registration fee?",
      answer:
        "The registration fee is ₹500/- per team (covering 3 to 4 members). The fee is strictly non-refundable.",
      category: "Registration",
      displayOrder: 3,
      status: "PUBLISHED",
    },
    {
      id: "faq-4",
      question: "What is the registration deadline?",
      answer:
        "The deadline for completing your team registration is 25th October 2026 via the official Google Form link.",
      category: "Registration",
      displayOrder: 4,
      status: "PUBLISHED",
    },
    {
      id: "faq-5",
      question: "Is prior coding experience required?",
      answer:
        "Prior coding experience is not mandatory, but enthusiasm and problem-solving passion are a must! All skill levels are welcomed.",
      category: "Participation",
      displayOrder: 5,
      status: "PUBLISHED",
    },
    {
      id: "faq-6",
      question: "What should participants bring?",
      answer:
        "Participants must bring their own laptops, chargers, extension cords, personal gadgets, and valid physical college ID cards. IoT hardware is not provided.",
      category: "Equipment",
      displayOrder: 6,
      status: "PUBLISHED",
    },
    {
      id: "faq-7",
      question: "Are meals provided?",
      answer:
        "Yes, complimentary meals and refreshments will be provided to all registered participants during the 24-hour hackathon.",
      category: "Hospitality",
      displayOrder: 7,
      status: "PUBLISHED",
    },
    {
      id: "faq-8",
      question: "Is accommodation available?",
      answer:
        "Yes, stay and resting arrangements are available on campus for outstation participants.",
      category: "Hospitality",
      displayOrder: 8,
      status: "PUBLISHED",
    },
    {
      id: "faq-9",
      question: "Are certificates provided?",
      answer:
        "Yes, official e-certificates will be awarded to all participants who complete and submit their hackathon project.",
      category: "Perks",
      displayOrder: 9,
      status: "PUBLISHED",
    },
    {
      id: "faq-10",
      question: "Where is the event conducted?",
      answer:
        "At the CIT Campus, NH 206 (B.H. Road), Gubbi, Tumkur – 572216, Karnataka.",
      category: "Venue",
      displayOrder: 10,
      status: "PUBLISHED",
    },
    {
      id: "faq-11",
      question:
        "What is the exact prize breakdown for 1st, 2nd, and 3rd place?",
      answer:
        "Details will be announced by the organizers closer to the event. The total prize pool is confirmed at ₹30K worth of cash rewards and goodies.",
      category: "Prizes",
      displayOrder: 11,
      status: "PUBLISHED",
    },
    {
      id: "faq-12",
      question: "What are the exact day-wise timings for rounds and meals?",
      answer:
        "Exact timings will be shared with registered participants closer to the event via email and WhatsApp groups.",
      category: "Schedule",
      displayOrder: 12,
      status: "PUBLISHED",
    },
  ],
  announcements: [
    {
      id: "ann-1",
      title: "Registrations Open for Buildathon 2.0 – 2K26!",
      shortMessage:
        "National Level 24-Hour Hackathon registrations are officially live. Secure your squad slot before 25 October 2026.",
      priority: "IMPORTANT",
      linkUrl: "https://forms.gle/YN35pBeytcHqmPHj7",
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
    registrationUrl: "https://forms.gle/YN35pBeytcHqmPHj7",
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
      id: "log-init",
      adminName: "Super Admin (Principal/Convener)",
      action: "INITIALIZE_DATABASE",
      module: "System",
      details:
        "Initialized official Buildathon 2.0 – 2K26 event schema from authenticated rulebook",
      timestamp: new Date().toISOString(),
    },
  ],
};

// Database Accessor Functions
export function getDb(): CmsDatabase {
  try {
    if (!fs.existsSync(DB_FILE)) {
      saveDb(defaultInitialDatabase);
      return defaultInitialDatabase;
    }
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading CMS database file, using defaults:", error);
    return defaultInitialDatabase;
  }
}

export function saveDb(data: CmsDatabase): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving CMS database file:", error);
    throw error;
  }
}

export function logAudit(
  adminName: string,
  action: string,
  module: string,
  details: string,
): void {
  const db = getDb();
  db.auditLogs.unshift({
    id: `log-${Date.now()}`,
    adminName,
    action,
    module,
    details,
    timestamp: new Date().toISOString(),
  });
  if (db.auditLogs.length > 200) {
    db.auditLogs = db.auditLogs.slice(0, 200);
  }
  saveDb(db);
}
