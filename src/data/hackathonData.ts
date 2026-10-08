export interface EventData {
  name: string;
  shortName: string;
  edition: string;
  year: string;
  tagline: string;
  theme: string;
  themeDescription: string;
  dates: string;
  dateStart: string;
  dateEnd: string;
  registrationDeadline: string;
  duration: string;
  durationHours: number;
  prizePool: string;
  prizePoolAmount: number;
  teamSize: string;
  minTeamSize: number;
  maxTeamSize: number;
  registrationFee: string;
  registrationFeeAmount: number;
  eligibility: string;
  registrationUrl: string;
  connectionWith: string;
  college: {
    name: string;
    accreditation: string;
    department: string;
    campus: string;
    address: string;
    road: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
    mapQuery: string;
    mapEmbedUrl: string;
  };
  social: {
    instagram: string;
    instagramHandle: string;
    hashtag: string;
  };
}

export interface DomainItem {
  id: string;
  domainNumber: string;
  name: string;
  iconName: string;
  shortDescription: string;
  accentColor: string;
  borderColor: string;
  badgeBg: string;
  tags: string[];
}

export interface DatasetItem {
  name: string;
  url: string;
  description?: string;
  format?: string;
}

export interface ProblemStatement {
  id: string;
  problemId: string;
  title: string;
  domainId: string;
  domainName: string;
  domain?: string;
  isDemoData: boolean;
  shortDescription: string;
  background?: string;
  problemDescription?: string;
  fullDescription?: string;
  expectedOutcome?: string;
  expectedDeliverables?: string;
  requirements?: string[];
  constraints?: string[];
  resources?: string[];
  datasetUrl?: string;
  datasetName?: string;
  datasets?: DatasetItem[];
  status: "Ready" | "Coming Soon" | "Released" | string;
  isPublished?: boolean;
}

export function getProblemDatasets(
  problem: Partial<ProblemStatement> | any,
): DatasetItem[] {
  if (!problem) return [];
  const list: DatasetItem[] = [];

  // 1. Explicit datasets array
  if (Array.isArray(problem.datasets) && problem.datasets.length > 0) {
    for (const d of problem.datasets) {
      if (d) {
        const url = typeof d === "string" ? d : d.url;
        const name =
          typeof d === "string" ? "Dataset Link" : d.name || "Dataset";
        if (url && typeof url === "string" && url.trim()) {
          list.push({
            name: name.trim(),
            url: url.trim(),
            description: d.description || "",
            format: d.format || "",
          });
        }
      }
    }
  }

  // 2. Single datasetUrl
  if (
    problem.datasetUrl &&
    typeof problem.datasetUrl === "string" &&
    problem.datasetUrl.trim()
  ) {
    const url = problem.datasetUrl.trim();
    if (!list.some((item) => item.url === url)) {
      list.unshift({
        name: problem.datasetName?.trim() || "Official Dataset",
        url,
      });
    }
  }

  // 3. Fallback: Parse URL from expectedDeliverables or resources if list is still empty
  if (list.length === 0) {
    if (
      problem.expectedDeliverables &&
      typeof problem.expectedDeliverables === "string"
    ) {
      const match = problem.expectedDeliverables.match(/(https?:\/\/[^\s]+)/gi);
      if (match) {
        match.forEach((u: string, idx: number) => {
          const cleanUrl = u.replace(/[),;.]+$/, "");
          if (!list.some((item) => item.url === cleanUrl)) {
            list.push({
              name: `Dataset ${idx + 1}`,
              url: cleanUrl,
            });
          }
        });
      }
    }
  }

  return list;
}

export interface TimelineItem {
  step: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface DaySchedule {
  dayNumber: number;
  dayLabel: string;
  date: string;
  note: string;
  events: TimelineItem[];
}

export interface Patron {
  name: string;
  role: string;
  designation: string;
  category: "CHIEF PATRON" | "PATRON";
  honorific?: string;
}

export interface Coordinator {
  name: string;
  phone?: string;
  formattedPhone?: string;
  role: string;
  category: "STUDENT" | "FACULTY";
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface BenefitItem {
  title: string;
  description: string;
  icon: string;
  tag: string;
}

export interface RuleCategory {
  category: string;
  rules: string[];
}

// ==========================================
// OFFICIAL DATA STORE (PRIMARY SOURCE OF TRUTH)
// Source: Official Buildathon 2.0 – 2K26 Poster & 13-page Rulebook
// ==========================================

export const eventData: EventData = {
  name: "Buildathon 2.0 – 2K26",
  shortName: "Buildathon 2.0",
  edition: "2.0",
  year: "2K26",
  tagline: "INNOVATE. CODE. IMPACT.",
  theme:
    "Building Intelligent Solutions for a Smarter, Sustainable & Secure Tomorrow",
  themeDescription:
    "A national initiative empowering student developers, engineers, and creators to engineer transformative, technology-driven solutions addressing urgent national and global challenges across healthcare, agriculture, smart mobility, education, and climate action.",
  dates: "30 & 31 October 2026",
  dateStart: "2026-10-30T09:00:00+05:30",
  dateEnd: "2026-10-31T17:00:00+05:30",
  registrationDeadline: "25 October 2026",
  duration: "24 Hours – Build, Solve & Innovate",
  durationHours: 24,
  prizePool: "₹30K",
  prizePoolAmount: 30000,
  teamSize: "3–4 members per team",
  minTeamSize: 3,
  maxTeamSize: 4,
  registrationFee: "₹500/- per team",
  registrationFeeAmount: 500,
  eligibility: "Open to all UG students from any college, across the nation",
  registrationUrl: "https://forms.gle/YN35pBeytcHqmPHj7",
  connectionWith: "KNEW-2K26",
  college: {
    name: "Channabasaveshwara Institute of Technology",
    accreditation: "NAAC ACCREDITED & ISO 9001:2015 CERTIFIED INSTITUTION",
    department: "Department of Computer Science and Engineering",
    campus: "CIT Campus",
    address:
      "CIT Campus, NH 206 (B.H. Road), Gubbi, Tumkur – 572 216, Karnataka",
    road: "NH 206 (B.H. Road)",
    city: "Gubbi",
    district: "Tumkur (Tumakuru)",
    state: "Karnataka",
    pincode: "572216",
    mapQuery: "Channabasaveshwara+Institute+of+Technology+Gubbi",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3883.332303588235!2d76.93883927508215!3d13.329683986976936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb02c2e0b57e7f9%3A0x6730dc651ea652bc!2sChannabasaveshwara%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
  },
  social: {
    instagram: "https://www.instagram.com/spark_it_cse_cit/",
    instagramHandle: "@spark_it_cse_cit",
    hashtag: "#BUILDATHON2K26",
  },
};

export interface Association {
  name: string;
  fullName: string;
  desc: string;
  logoUrl: string;
}

export const associations: Association[] = [
  {
    name: "SPARK - IT",
    fullName: "Spark IT Technical Club",
    desc: "“It's not just about the idea; it's all about making ideas happen!”",
    logoUrl: "/associations/spark_it.png",
  },
  {
    name: "IEEE",
    fullName: "Institute of Electrical and Electronics Engineers",
    desc: "World's largest technical professional organization for engineering & technology",
    logoUrl: "/associations/ieee.svg",
  },
  {
    name: "IEI",
    fullName: "The Institution of Engineers (India)",
    desc: "Chartered professional body promoting engineering excellence and leadership",
    logoUrl: "/associations/iei.png",
  },
  {
    name: "ISTE",
    fullName: "Indian Society for Technical Education",
    desc: "National institutional body for technical education advancement",
    logoUrl: "/associations/iste.png",
  },
];

export const domains: DomainItem[] = [
  {
    id: "healthcare",
    domainNumber: "01",
    name: "Healthcare & Well-Being",
    iconName: "HeartPulse",
    shortDescription:
      "Developing AI-assisted healthcare systems, preventive diagnostic tools, remote patient monitoring, and mental wellness platforms.",
    accentColor: "from-rose-500 to-red-600",
    borderColor: "hover:border-rose-400",
    badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
    tags: ["Digital Health", "Medical AI", "Telemedicine", "Patient Care"],
  },
  {
    id: "agriculture",
    domainNumber: "02",
    name: "Agriculture & Food Security",
    iconName: "Sprout",
    shortDescription:
      "Empowering farmers with smart crop monitoring, precision irrigation, soil analytics, yield forecasting, and transparent food supply chains.",
    accentColor: "from-emerald-500 to-green-600",
    borderColor: "hover:border-emerald-400",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    tags: ["AgriTech", "Precision Farming", "Supply Chain", "Soil IoT"],
  },
  {
    id: "smart-cities",
    domainNumber: "03",
    name: "Smart Cities & Mobility",
    iconName: "Building2",
    shortDescription:
      "Architecting intelligent urban transit, smart grid power distribution, IoT waste management, and secure municipal infrastructure.",
    accentColor: "from-sky-500 to-blue-600",
    borderColor: "hover:border-sky-400",
    badgeBg: "bg-sky-50 text-sky-700 border-sky-200",
    tags: [
      "Urban Tech",
      "IoT Infrastructure",
      "Smart Traffic",
      "Clean Transit",
    ],
  },
  {
    id: "education",
    domainNumber: "04",
    name: "Education & Digital Society",
    iconName: "GraduationCap",
    shortDescription:
      "Innovating personalized learning algorithms, accessibility solutions for differently-abled learners, and inclusive digital governance.",
    accentColor: "from-indigo-500 to-purple-600",
    borderColor: "hover:border-indigo-400",
    badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
    tags: ["EdTech", "Digital Inclusion", "Accessible UI", "Skill AI"],
  },
  {
    id: "climate",
    domainNumber: "05",
    name: "Climate, Environment & Sustainability",
    iconName: "Leaf",
    shortDescription:
      "Combatting climate change with carbon tracking, renewable energy optimization, wildlife conservation, and circular economy tools.",
    accentColor: "from-teal-500 to-emerald-600",
    borderColor: "hover:border-teal-400",
    badgeBg: "bg-teal-50 text-teal-700 border-teal-200",
    tags: ["CleanTech", "Carbon Accounting", "Renewables", "Eco Systems"],
  },
];

// Note: Official rulebook does NOT contain actual problem statements yet.
// Data architecture includes clear demo flags as required by user prompt.
export const problemStatements: ProblemStatement[] = [
  {
    id: "prob-01",
    problemId: "DEMO-HC-01",
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
    datasetUrl: "https://sandbox.abdm.gov.in/",
    datasetName: "Ayushman Bharat Sandbox API Dataset",
    datasets: [
      {
        name: "Ayushman Bharat Sandbox API Dataset",
        url: "https://sandbox.abdm.gov.in/",
        description:
          "Standardized FHIR health data APIs and synthetic patient profiles.",
      },
      {
        name: "WHO Global Health Triage Protocols",
        url: "https://www.who.int/data/gho",
        description:
          "Official emergency clinical triage indicators and clinical guidelines.",
      },
    ],
    status: "Ready",
  },
  {
    id: "prob-02",
    problemId: "DEMO-AG-01",
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
    datasetUrl: "https://www.kaggle.com/datasets/emmarex/plantdisease",
    datasetName: "PlantVillage 54,000+ Image Dataset (Kaggle)",
    datasets: [
      {
        name: "PlantVillage 54,000+ Image Dataset (Kaggle)",
        url: "https://www.kaggle.com/datasets/emmarex/plantdisease",
        description:
          "54,306 images of healthy and diseased crop leaves categorized into 38 disease classes.",
      },
      {
        name: "Open-Meteo High-Resolution Weather API",
        url: "https://open-meteo.com/",
        description:
          "Free weather forecasting and solar radiation data API for precision agriculture.",
      },
    ],
    status: "Ready",
  },
  {
    id: "prob-03",
    problemId: "DEMO-SC-01",
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
    datasetUrl: "https://download.geofabrik.de/asia/india.html",
    datasetName: "OpenStreetMap India Transit & Road Network",
    datasets: [
      {
        name: "OpenStreetMap India Transit & Road Network",
        url: "https://download.geofabrik.de/asia/india.html",
        description:
          "Complete geospatial highway, intersection, and road topology data for India.",
      },
      {
        name: "SUMO Traffic Simulation Benchmarks",
        url: "https://eclipse.dev/sumo/",
        description:
          "Open-source, highly portable microscopic traffic simulation benchmark scenarios.",
      },
    ],
    status: "Ready",
  },
  {
    id: "prob-04",
    problemId: "DEMO-ED-01",
    title: "Accessible STEM Learning Lab for Visually Impaired Students",
    domainId: "education",
    domainName: "Education & Digital Society",
    isDemoData: true,
    shortDescription:
      "Build an interactive audio-tactile web environment allowing visually impaired students to explore mathematical graphs and chemical structures.",
    background:
      "Most STEM web portals rely strictly on 2D visual charts, leaving visually impaired students alienated from quantitative subjects.",
    problemDescription:
      "Design a screen-reader optimized platform with sound sonification (frequency mapping) to represent mathematical curves and geometric shapes.",
    expectedOutcome:
      "Fully keyboard accessible interactive canvas with spatial audio sonification and haptic/screen-reader friendly feedback.",
    requirements: [
      "100% WCAG 2.1 AAA keyboard navigable",
      "Web Audio API pitch sonification for cartesian graphs",
      "Voice guidance instructions",
    ],
    constraints: ["Must work without external hardware attachments"],
    resources: ["W3C ARIA standards", "Web Audio API documentation"],
    datasetUrl: "https://github.com/W3C/aria",
    datasetName: "W3C ARIA Accessibility Guidelines & Test Suite",
    datasets: [
      {
        name: "W3C ARIA Accessibility Guidelines & Test Suite",
        url: "https://github.com/W3C/aria",
        description:
          "Accessible Rich Internet Applications specification and automated screen-reader test suite.",
      },
    ],
    status: "Ready",
  },
  {
    id: "prob-05",
    problemId: "DEMO-CL-01",
    title: "Campus Renewable Energy Micro-Grid & Carbon Offset Tracker",
    domainId: "climate",
    domainName: "Climate, Environment & Sustainability",
    isDemoData: true,
    shortDescription:
      "Develop an IoT analytics dashboard to balance rooftop solar generation, battery storage, and institutional grid consumption.",
    background:
      "Educational campuses consume substantial power during peak daytime hours but underutilize their solar panels due to lack of real-time load balancing.",
    problemDescription:
      "Build an intelligent energy monitoring portal that predicts solar harvest from weather forecasts and triggers automated peak-shaving alerts.",
    expectedOutcome:
      "Real-time energy telemetry visualization, battery state prediction, and automated carbon reduction certificate generator.",
    requirements: [
      "Time-series chart visualization of power curves",
      "Carbon savings equivalence calculator (trees planted, kg CO2 avoided)",
      "Anomaly detection for faulty solar panels",
    ],
    constraints: ["Must support data export in open CSV and PDF audit formats"],
    resources: [
      "Solar irradiance open datasets",
      "Central Electricity Authority emission factors",
    ],
    datasetUrl: "https://nsrdb.nrel.gov/",
    datasetName: "NREL National Solar Radiation Open Database",
    datasets: [
      {
        name: "NREL National Solar Radiation Open Database",
        url: "https://nsrdb.nrel.gov/",
        description:
          "High temporal and spatial resolution solar radiation and meteorological datasets.",
      },
      {
        name: "Central Electricity Authority (CEA) Carbon Baseline",
        url: "https://cea.nic.in/",
        description:
          "Official CO2 baseline database for the Indian power sector.",
      },
    ],
    status: "Ready",
  },
];

export const daySchedules: DaySchedule[] = [
  {
    dayNumber: 1,
    dayLabel: "DAY 1",
    date: "30 OCTOBER 2026",
    note: "Exact timings will be shared with registered participants closer to the event.",
    events: [
      {
        step: "01",
        title: "Reporting & Registration",
        description:
          "Teams arrive at CIT Campus, verify college IDs, receive participant kits, access badges, and connect to high-speed venue network.",
      },
      {
        step: "02",
        title: "Inaugural Ceremony",
        description:
          "Official opening addresses by Chief Patrons, dignitaries from Department of CSE, faculty coordinators, and guest industry speakers.",
      },
      {
        step: "03",
        title: "Hackathon Begins – 24 Hours Start",
        description:
          "Countdown timer kicks off! Problem statements locked in, Git repositories initialized, and non-stop 24-hour coding commences.",
      },
      {
        step: "04",
        title: "Mentoring & Guidance Sessions",
        description:
          "Expert mentors visit team tables to review architecture, suggest technical improvements, and debug blockers.",
      },
      {
        step: "05",
        title: "Evaluation Round 1",
        description:
          "First milestone review: Judges evaluate problem alignment, architectural schema, database designs, and initial working prototype.",
      },
    ],
  },
  {
    dayNumber: 2,
    dayLabel: "DAY 2",
    date: "31 OCTOBER 2026",
    note: "Exact timings will be shared with registered participants closer to the event.",
    events: [
      {
        step: "01",
        title: "Evaluation Round 2",
        description:
          "Second milestone review: Detailed code quality assessment, feature completeness check, UI/UX polish, and stress testing.",
      },
      {
        step: "02",
        title: "Final Presentations",
        description:
          "Top selected finalist teams present live demonstrations on stage before the distinguished judging panel followed by Q&A.",
      },
      {
        step: "03",
        title: "Valedictory",
        description:
          "Celebration of 24 hours of innovation, experience sharing by participants, feedback sessions, and concluding remarks by leadership.",
      },
      {
        step: "04",
        title: "Prize Distribution",
        description:
          "Grand announcement of winners, presentation of ₹30K cash awards, distribution of trophies, certificates, and closing moments.",
      },
    ],
  },
];

export const rulesData: RuleCategory[] = [
  {
    category: "Participation",
    rules: [
      "Teams must have 3–4 members to be eligible for participation.",
      "Each team selects one problem statement from any of the five domains and builds their own solution around it — the choice of problem statement is entirely up to the team.",
      "All team members must be currently enrolled Undergraduate (UG) students from any recognized college or university across the nation.",
      "Cross-department or cross-college teams are welcome, provided every member satisfies the UG eligibility criteria.",
      "All team members must complete individual registration and verification under the team registration form.",
    ],
  },
  {
    category: "Equipment & Hardware",
    rules: [
      "Participants must bring their own laptops and necessary tools (chargers, adapters, peripherals).",
      "IoT hardware, specialized microcontrollers, sensors, or auxiliary test devices will not be provided by the organizers.",
      "Organizers will provide continuous power supply, Wi-Fi connectivity, and designated workspace stations.",
      "Teams using specialized third-party cloud APIs are responsible for configuring their own API credentials safely.",
    ],
  },
  {
    category: "Evaluation & Submissions",
    rules: [
      "The event will have two evaluation rounds and a final presentation.",
      "Teams must strictly adhere to submission deadlines announced during the hackathon.",
      "Repositories must be committed and pushed before the final 24-hour cutoff siren.",
      "Teams must demonstrate working software running live; slide-only pitches without working code are not accepted for final evaluation.",
    ],
  },
  {
    category: "Judging Criteria",
    rules: [
      "Judging will be based on innovation, functionality, technical execution, and impact.",
      "Innovation: Uniqueness of approach, creative problem-solving, and novelty of the idea.",
      "Functionality: Completeness of the prototype and demonstration of functional workflows.",
      "Technical Execution: Architectural soundness, code cleanlines, effective integration, and scalability.",
      "Impact: Real-world applicability, societal or environmental value, and feasibility of deployment.",
    ],
  },
  {
    category: "General & Institutional",
    rules: [
      "The registration fee is non-refundable under any circumstances.",
      "The organizers reserve the right to modify event details, schedule adjustments, or venue logistics if necessary.",
      "Judges' decision will be final — no further arguments will be entertained.",
      "Participants will be held responsible for any damage caused to institution property.",
      "Any mischievous or unfair activity found during the event will lead to immediate disqualification of the entire team.",
    ],
  },
];

export const codeOfConductItems = [
  {
    title: "Professional Courtesy",
    description:
      "Maintain professionalism and courtesy toward organizers, mentors, volunteers, and fellow participants at all times.",
    icon: "ShieldCheck",
  },
  {
    title: "Original Work Only",
    description:
      "Submit only original work — plagiarism, unauthorized copied code, or stolen designs will lead to immediate disqualification.",
    icon: "FileCheck",
  },
  {
    title: "Venue & Environmental Care",
    description:
      "Keep the venue clean and use the facilities responsibly; dispose of waste properly in designated recycling bins.",
    icon: "Sparkles",
  },
  {
    title: "Follow Coordinator Directions",
    description:
      "Follow the instructions of faculty coordinators, student leads, and venue volunteers throughout the event.",
    icon: "Compass",
  },
  {
    title: "Zero Tolerance for Misconduct",
    description:
      "Ragging, harassment, verbal abuse, or any form of misconduct will not be tolerated and will result in instant disqualification and reporting.",
    icon: "AlertOctagon",
  },
  {
    title: "Mandatory College ID",
    description:
      "College ID is compulsory for all participants. Participants may be asked to show their physical ID card at any time during the event.",
    icon: "IdCard",
  },
];

export const benefits: BenefitItem[] = [
  {
    title: "E-Certificates",
    description:
      "Official verifiable participation and merit e-certificates awarded to all registered attendees.",
    icon: "Award",
    tag: "All Participants",
  },
  {
    title: "Exciting Prizes",
    description:
      "Win cash rewards worth ₹30K, prestigious trophies, sponsor goodies, and recognition.",
    icon: "Trophy",
    tag: "₹30K Pool",
  },
  {
    title: "Meals Provided",
    description:
      "Enjoy complimentary hearty meals, late-night fuel, energy drinks, and tea/coffee refreshments.",
    icon: "Coffee",
    tag: "Complimentary",
  },
  {
    title: "Accommodation",
    description:
      "Clean and secure stay arrangements available on-campus for outstation participants.",
    icon: "Home",
    tag: "Outstation Teams",
  },
];

export const chiefPatrons: Patron[] = [
  {
    name: "SRI. G S BASAVARAJ",
    role: "Chairman, CIT Group of Institutions",
    designation: "Former M.P, Tumakuru Lok Sabha",
    category: "CHIEF PATRON",
  },
  {
    name: "SRI. G B JYOTHI GANESH",
    role: "Secretary & Managing Director, CIT Group of Institutions",
    designation: "M.L.A, Tumakuru City Constituency",
    category: "CHIEF PATRON",
  },
  {
    name: "Dr. SURESH D S",
    role: "Director, CIT Group of Institutions",
    designation: "Chairman, ISTE Karnataka Section",
    category: "PATRON",
  },
  {
    name: "Dr. SHANTALA C P",
    role: "Vice-Principal, HOD Dept. of CSE",
    designation: "Director, CADC, CIT Gubbi",
    category: "PATRON",
  },
];

export const studentCoordinators: Coordinator[] = [
  {
    name: "Supriya R",
    phone: "9148721325",
    formattedPhone: "+91 91487 21325",
    role: "Student Lead",
    category: "STUDENT",
  },
  {
    name: "Siri Manjunath Wodiyer",
    phone: "8122315329",
    formattedPhone: "+91 81223 15329",
    role: "Student Lead",
    category: "STUDENT",
  },
  {
    name: "Afifa Muqthar",
    phone: "9113070765",
    formattedPhone: "+91 91130 70765",
    role: "Student Lead",
    category: "STUDENT",
  },
  {
    name: "Gagana H",
    phone: "7676623978",
    formattedPhone: "+91 76766 23978",
    role: "Student Lead",
    category: "STUDENT",
  },
];

export const facultyCoordinators: Coordinator[] = [
  {
    name: "Dr. Suhas K C",
    phone: "9844987877",
    formattedPhone: "+91 98449 87877",
    role: "Faculty Convener",
    category: "FACULTY",
  },
  {
    name: "Prof. Mahesh N",
    phone: "9742045203",
    formattedPhone: "+91 97420 45203",
    role: "Faculty Coordinator",
    category: "FACULTY",
  },
  {
    name: "Prof. Kotresh Naik D",
    role: "Faculty Coordinator",
    category: "FACULTY",
  },
  {
    name: "Prof. Shobha A",
    role: "Faculty Coordinator",
    category: "FACULTY",
  },
  {
    name: "Prof. Shwetha S",
    role: "Faculty Coordinator",
    category: "FACULTY",
  },
];

export const faqs: FAQItem[] = [
  {
    question: "Who can participate?",
    answer:
      "The hackathon is open to all Undergraduate (UG) students from any college or university across the nation, regardless of branch or semester.",
    category: "Eligibility",
  },
  {
    question: "What is the team size?",
    answer:
      "Teams must consist of exactly 3 to 4 members. Solo participation or teams of 2 or 5+ members are not permitted as per the official rules.",
    category: "Teams",
  },
  {
    question: "What is the registration fee?",
    answer:
      "The registration fee is ₹500/- per team (covering 3 to 4 members). The fee is strictly non-refundable.",
    category: "Registration",
  },
  {
    question: "What is the registration deadline?",
    answer:
      "The deadline for completing your team registration is 25th October 2026 via the official Google Form link.",
    category: "Registration",
  },
  {
    question: "Is prior coding experience required?",
    answer:
      "Prior coding experience is not mandatory, but enthusiasm and problem-solving passion are a must! All skill levels are welcomed.",
    category: "Participation",
  },
  {
    question: "What should participants bring?",
    answer:
      "Participants must bring their own laptops, chargers, extension cords, personal gadgets, and valid physical college ID cards. IoT hardware is not provided.",
    category: "Equipment",
  },
  {
    question: "Are meals provided?",
    answer:
      "Yes, complimentary meals and refreshments will be provided to all registered participants during the 24-hour hackathon.",
    category: "Hospitality",
  },
  {
    question: "Is accommodation available?",
    answer:
      "Yes, stay and resting arrangements are available on campus for outstation participants.",
    category: "Hospitality",
  },
  {
    question: "Are certificates provided?",
    answer:
      "Yes, official e-certificates will be awarded to all participants who complete and submit their hackathon project.",
    category: "Perks",
  },
  {
    question: "Where is the event conducted?",
    answer:
      "At the CIT Campus, NH 206 (B.H. Road), Gubbi, Tumkur – 572216, Karnataka.",
    category: "Venue",
  },
  {
    question: "What is the exact prize breakdown for 1st, 2nd, and 3rd place?",
    answer:
      "Details will be announced by the organizers closer to the event. The total prize pool is confirmed at ₹30K worth of cash rewards and goodies.",
    category: "Prizes",
  },
  {
    question: "What are the exact day-wise timings for rounds and meals?",
    answer:
      "Exact timings will be shared with registered participants closer to the event via email and WhatsApp groups.",
    category: "Schedule",
  },
];

export const statistics = [
  {
    value: "24 HOURS",
    label: "Hackathon Duration",
    subtext: "Non-stop building & innovation",
    iconName: "Clock",
  },
  {
    value: "₹30K",
    label: "Prize Pool",
    subtext: "Cash awards, trophies & perks",
    iconName: "Trophy",
  },
  {
    value: "3–4",
    label: "Team Members",
    subtext: "Collaborative teamwork",
    iconName: "Users",
  },
  {
    value: "NATIONAL LEVEL",
    label: "Hackathon Scope",
    subtext: "Open to all UG students",
    iconName: "Globe",
  },
];
