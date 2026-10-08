import express, { Request, Response } from "express";
import cors from "cors";
import { getDb, saveDb, logAudit, CmsDatabase } from "./db.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Helper error response
const errRes = (res: Response, status: number, message: string) => {
  return res.status(status).json({ success: false, error: { message } });
};

// ==========================================
// AUTHENTICATION (RBAC)
// ==========================================
// Default admin credentials for college administrators:
// admin@citgubbi.ac.in / admin123
app.post("/api/auth/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return errRes(res, 400, "Email and password are required");
  }

  if (email === "admin@citgubbi.ac.in" && password === "admin123") {
    logAudit("Super Admin", "LOGIN", "Auth", `Successful login for ${email}`);
    return res.json({
      success: true,
      data: {
        user: {
          id: "admin-01",
          name: "Prof. Mahesh / Dr. Suhas (CIT CSE Conveners)",
          email: "admin@citgubbi.ac.in",
          role: "SUPER_ADMIN",
        },
        token: "token-cit-super-admin-session-authenticated",
      },
    });
  }

  // Content Manager role
  if (email === "content@citgubbi.ac.in" && password === "content123") {
    logAudit(
      "Content Manager",
      "LOGIN",
      "Auth",
      `Successful login for ${email}`,
    );
    return res.json({
      success: true,
      data: {
        user: {
          id: "admin-02",
          name: "CIT Media & Content Team",
          email: "content@citgubbi.ac.in",
          role: "CONTENT_MANAGER",
        },
        token: "token-cit-content-manager-session-authenticated",
      },
    });
  }

  return errRes(res, 401, "Invalid administrator credentials");
});

// ==========================================
// EVENT SETTINGS API
// ==========================================
app.get("/api/event", (req: Request, res: Response) => {
  const db = getDb();
  res.json({ success: true, data: db.event });
});

app.put("/api/event", (req: Request, res: Response) => {
  const db = getDb();
  db.event = { ...db.event, ...req.body };
  saveDb(db);
  logAudit(
    req.body.adminName || "Admin",
    "UPDATE_EVENT",
    "Event",
    "Updated event information",
  );
  res.json({ success: true, data: db.event });
});

// ==========================================
// HERO SECTION API
// ==========================================
app.get("/api/hero", (req: Request, res: Response) => {
  const db = getDb();
  res.json({ success: true, data: db.hero });
});

app.put("/api/hero", (req: Request, res: Response) => {
  const db = getDb();
  db.hero = { ...db.hero, ...req.body };
  saveDb(db);
  logAudit(
    req.body.adminName || "Admin",
    "UPDATE_HERO",
    "Hero",
    "Updated hero presentation fields",
  );
  res.json({ success: true, data: db.hero });
});

// ==========================================
// NAVBAR CMS API
// ==========================================
app.get("/api/navbar", (req: Request, res: Response) => {
  const db = getDb();
  res.json({ success: true, data: db.navbar });
});

app.put("/api/navbar", (req: Request, res: Response) => {
  const db = getDb();
  db.navbar = req.body;
  saveDb(db);
  logAudit(
    "Admin",
    "UPDATE_NAVBAR",
    "Navbar",
    "Updated navigation bar structure",
  );
  res.json({ success: true, data: db.navbar });
});

// ==========================================
// HOMEPAGE SECTIONS VISIBILITY / ORDER API
// ==========================================
app.get("/api/sections", (req: Request, res: Response) => {
  const db = getDb();
  res.json({ success: true, data: db.sections });
});

app.put("/api/sections", (req: Request, res: Response) => {
  const db = getDb();
  db.sections = req.body;
  saveDb(db);
  logAudit(
    "Admin",
    "UPDATE_SECTIONS",
    "Sections",
    "Updated homepage sections visibility and order",
  );
  res.json({ success: true, data: db.sections });
});

// ==========================================
// EVENT STATS API
// ==========================================
app.get("/api/stats", (req: Request, res: Response) => {
  const db = getDb();
  res.json({ success: true, data: db.stats });
});

app.put("/api/stats", (req: Request, res: Response) => {
  const db = getDb();
  db.stats = req.body;
  saveDb(db);
  logAudit("Admin", "UPDATE_STATS", "Stats", "Updated event stats");
  res.json({ success: true, data: db.stats });
});

// ==========================================
// ABOUT & THEME API
// ==========================================
app.get("/api/about", (req: Request, res: Response) => {
  const db = getDb();
  res.json({ success: true, data: db.about });
});

app.put("/api/about", (req: Request, res: Response) => {
  const db = getDb();
  db.about = { ...db.about, ...req.body };
  saveDb(db);
  logAudit("Admin", "UPDATE_ABOUT", "About", "Updated about section text");
  res.json({ success: true, data: db.about });
});

app.get("/api/theme", (req: Request, res: Response) => {
  const db = getDb();
  res.json({ success: true, data: db.theme });
});

app.put("/api/theme", (req: Request, res: Response) => {
  const db = getDb();
  db.theme = { ...db.theme, ...req.body };
  saveDb(db);
  logAudit("Admin", "UPDATE_THEME", "Theme", "Updated theme text and pillars");
  res.json({ success: true, data: db.theme });
});

// ==========================================
// DOMAINS API (FULL CRUD)
// ==========================================
app.get("/api/domains", (req: Request, res: Response) => {
  const db = getDb();
  const publishedOnly = req.query.all !== "true";
  const data = publishedOnly
    ? db.domains.filter((d) => d.status === "PUBLISHED")
    : db.domains;
  res.json({ success: true, data });
});

app.post("/api/domains", (req: Request, res: Response) => {
  const db = getDb();
  const newDomain = {
    id: req.body.id || `domain-${Date.now()}`,
    domainNumber: String(db.domains.length + 1).padStart(2, "0"),
    name: req.body.name,
    shortDescription: req.body.shortDescription || "",
    longDescription: req.body.longDescription || "",
    iconName: req.body.iconName || "Layers",
    tags: req.body.tags || [],
    accentColor: req.body.accentColor || "from-sky-500 to-blue-600",
    displayOrder: db.domains.length + 1,
    status: req.body.status || "PUBLISHED",
  };
  db.domains.push(newDomain);
  saveDb(db);
  logAudit(
    "Admin",
    "CREATE_DOMAIN",
    "Domains",
    `Created domain: ${newDomain.name}`,
  );
  res.json({ success: true, data: newDomain });
});

app.put("/api/domains/:id", (req: Request, res: Response) => {
  const db = getDb();
  const index = db.domains.findIndex((d) => d.id === req.params.id);
  if (index === -1) return errRes(res, 404, "Domain not found");

  db.domains[index] = { ...db.domains[index], ...req.body };
  saveDb(db);
  logAudit(
    "Admin",
    "UPDATE_DOMAIN",
    "Domains",
    `Updated domain: ${db.domains[index].name}`,
  );
  res.json({ success: true, data: db.domains[index] });
});

app.delete("/api/domains/:id", (req: Request, res: Response) => {
  const db = getDb();
  const domain = db.domains.find((d) => d.id === req.params.id);
  db.domains = db.domains.filter((d) => d.id !== req.params.id);
  saveDb(db);
  logAudit(
    "Admin",
    "DELETE_DOMAIN",
    "Domains",
    `Deleted domain: ${domain?.name || req.params.id}`,
  );
  res.json({ success: true, data: { id: req.params.id } });
});

// ==========================================
// PROBLEM STATEMENTS API (FULL CRUD & DETAIL)
// ==========================================
app.get("/api/problems", (req: Request, res: Response) => {
  const db = getDb();
  const showAll = req.query.all === "true";
  const data = showAll
    ? db.problems
    : db.problems.filter((p) => p.status === "PUBLISHED");
  res.json({ success: true, data });
});

app.get("/api/problems/:slugOrId", (req: Request, res: Response) => {
  const db = getDb();
  const param = req.params.slugOrId;
  const problem = db.problems.find(
    (p) => p.id === param || p.slug === param || p.problemId === param,
  );
  if (!problem) return errRes(res, 404, "Problem statement not found");
  res.json({ success: true, data: problem });
});

app.post("/api/problems", (req: Request, res: Response) => {
  const db = getDb();
  const slug = req.body.title
    ? req.body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    : `problem-${Date.now()}`;

  const newProblem = {
    id: `prob-${Date.now()}`,
    problemId:
      req.body.problemId ||
      `PS-${String(db.problems.length + 1).padStart(2, "0")}`,
    slug,
    title: req.body.title,
    domainId: req.body.domainId,
    domainName: req.body.domainName || "General Track",
    shortDescription: req.body.shortDescription || "",
    background: req.body.background || "",
    problemDescription: req.body.problemDescription || "",
    expectedOutcome: req.body.expectedOutcome || "",
    requirements: req.body.requirements || [],
    constraints: req.body.constraints || [],
    resources: req.body.resources || [],
    difficulty: req.body.difficulty || "Intermediate",
    isDemoData: false,
    displayOrder: db.problems.length + 1,
    status: req.body.status || "PUBLISHED",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.problems.push(newProblem);
  saveDb(db);
  logAudit(
    "Admin",
    "CREATE_PROBLEM",
    "Problems",
    `Created problem: ${newProblem.title} (${newProblem.problemId})`,
  );
  res.json({ success: true, data: newProblem });
});

app.put("/api/problems/:id", (req: Request, res: Response) => {
  const db = getDb();
  const index = db.problems.findIndex((p) => p.id === req.params.id);
  if (index === -1) return errRes(res, 404, "Problem not found");

  db.problems[index] = {
    ...db.problems[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };
  saveDb(db);
  logAudit(
    "Admin",
    "UPDATE_PROBLEM",
    "Problems",
    `Updated problem: ${db.problems[index].title}`,
  );
  res.json({ success: true, data: db.problems[index] });
});

app.delete("/api/problems/:id", (req: Request, res: Response) => {
  const db = getDb();
  const prob = db.problems.find((p) => p.id === req.params.id);
  db.problems = db.problems.filter((p) => p.id !== req.params.id);
  saveDb(db);
  logAudit(
    "Admin",
    "DELETE_PROBLEM",
    "Problems",
    `Deleted problem: ${prob?.title || req.params.id}`,
  );
  res.json({ success: true, data: { id: req.params.id } });
});

// ==========================================
// TIMELINE API
// ==========================================
app.get("/api/timeline", (req: Request, res: Response) => {
  const db = getDb();
  res.json({ success: true, data: db.timeline });
});

app.put("/api/timeline", (req: Request, res: Response) => {
  const db = getDb();
  db.timeline = req.body;
  saveDb(db);
  logAudit(
    "Admin",
    "UPDATE_TIMELINE",
    "Timeline",
    "Updated event timeline milestones",
  );
  res.json({ success: true, data: db.timeline });
});

// ==========================================
// RULES & REGULATIONS API
// ==========================================
app.get("/api/rules", (req: Request, res: Response) => {
  const db = getDb();
  res.json({ success: true, data: db.rules });
});

app.put("/api/rules", (req: Request, res: Response) => {
  const db = getDb();
  db.rules = req.body;
  saveDb(db);
  logAudit("Admin", "UPDATE_RULES", "Rules", "Updated official rules");
  res.json({ success: true, data: db.rules });
});

// ==========================================
// COORDINATORS & PATRONS & FAQS
// ==========================================
app.get("/api/coordinators", (req: Request, res: Response) => {
  const db = getDb();
  res.json({ success: true, data: db.coordinators });
});

app.put("/api/coordinators", (req: Request, res: Response) => {
  const db = getDb();
  db.coordinators = req.body;
  saveDb(db);
  logAudit(
    "Admin",
    "UPDATE_COORDINATORS",
    "Coordinators",
    "Updated student and faculty coordinators",
  );
  res.json({ success: true, data: db.coordinators });
});

app.get("/api/faqs", (req: Request, res: Response) => {
  const db = getDb();
  res.json({ success: true, data: db.faqs });
});

app.put("/api/faqs", (req: Request, res: Response) => {
  const db = getDb();
  db.faqs = req.body;
  saveDb(db);
  logAudit("Admin", "UPDATE_FAQS", "FAQ", "Updated FAQs");
  res.json({ success: true, data: db.faqs });
});

app.get("/api/patrons", (req: Request, res: Response) => {
  const db = getDb();
  res.json({ success: true, data: db.patrons });
});

app.put("/api/patrons", (req: Request, res: Response) => {
  const db = getDb();
  db.patrons = req.body;
  saveDb(db);
  logAudit("Admin", "UPDATE_PATRONS", "Patrons", "Updated leadership patrons");
  res.json({ success: true, data: db.patrons });
});

// ==========================================
// ANNOUNCEMENTS BROADCASTER API
// ==========================================
app.get("/api/announcements", (req: Request, res: Response) => {
  const db = getDb();
  const showAll = req.query.all === "true";
  const data = showAll
    ? db.announcements
    : db.announcements.filter((a) => a.status === "PUBLISHED");
  res.json({ success: true, data });
});

app.post("/api/announcements", (req: Request, res: Response) => {
  const db = getDb();
  const newAnn = {
    id: `ann-${Date.now()}`,
    title: req.body.title,
    shortMessage: req.body.shortMessage,
    fullMessage: req.body.fullMessage,
    priority: req.body.priority || "NORMAL",
    linkUrl: req.body.linkUrl,
    linkText: req.body.linkText,
    publishDate: new Date().toISOString(),
    status: req.body.status || "PUBLISHED",
  };
  db.announcements.unshift(newAnn);
  saveDb(db);
  logAudit(
    "Admin",
    "PUBLISH_ANNOUNCEMENT",
    "Announcements",
    `Broadcasted: ${newAnn.title}`,
  );
  res.json({ success: true, data: newAnn });
});

app.delete("/api/announcements/:id", (req: Request, res: Response) => {
  const db = getDb();
  db.announcements = db.announcements.filter((a) => a.id !== req.params.id);
  saveDb(db);
  logAudit(
    "Admin",
    "DELETE_ANNOUNCEMENT",
    "Announcements",
    `Deleted announcement: ${req.params.id}`,
  );
  res.json({ success: true, data: { id: req.params.id } });
});

// ==========================================
// REGISTRATION & BRAND MEDIA API
// ==========================================
app.get("/api/registration", (req: Request, res: Response) => {
  const db = getDb();
  res.json({ success: true, data: db.registration });
});

app.put("/api/registration", (req: Request, res: Response) => {
  const db = getDb();
  db.registration = { ...db.registration, ...req.body };
  saveDb(db);
  logAudit(
    "Admin",
    "UPDATE_REGISTRATION",
    "Registration",
    `Changed registration URL to: ${db.registration.registrationUrl} (Status: ${db.registration.status})`,
  );
  res.json({ success: true, data: db.registration });
});

app.get("/api/media", (req: Request, res: Response) => {
  const db = getDb();
  res.json({ success: true, data: db.media });
});

app.put("/api/media/active-logo", (req: Request, res: Response) => {
  const db = getDb();
  db.media.activeCollegeLogo = req.body.activeCollegeLogo;
  saveDb(db);
  logAudit(
    "Admin",
    "UPDATE_LOGO",
    "Media",
    `Set active college logo: ${req.body.activeCollegeLogo}`,
  );
  res.json({ success: true, data: db.media });
});

app.put("/api/media/active-poster", (req: Request, res: Response) => {
  const db = getDb();
  db.media.activePosterUrl = req.body.activePosterUrl;
  saveDb(db);
  logAudit(
    "Admin",
    "UPDATE_POSTER",
    "Media",
    `Updated official event poster URL: ${req.body.activePosterUrl}`,
  );
  res.json({ success: true, data: db.media });
});

app.put("/api/media", (req: Request, res: Response) => {
  const db = getDb();
  db.media = { ...db.media, ...req.body };
  saveDb(db);
  logAudit(
    "Admin",
    "UPDATE_MEDIA",
    "Media",
    "Updated media assets and poster configuration",
  );
  res.json({ success: true, data: db.media });
});

// ==========================================
// AUDIT LOGS API
// ==========================================
app.get("/api/audit-logs", (req: Request, res: Response) => {
  const db = getDb();
  res.json({ success: true, data: db.auditLogs });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(
    `[BUILDATHON CMS API] Server running on http://localhost:${PORT}`,
  );
});

export default app;
