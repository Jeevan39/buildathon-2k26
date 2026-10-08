import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

function cmsApiPlugin(): Plugin {
  const dbDir = path.resolve(process.cwd(), "data");
  const dbFile = path.resolve(dbDir, "cms_database.json");

  const getDb = () => {
    try {
      if (fs.existsSync(dbFile)) {
        const raw = fs.readFileSync(dbFile, "utf-8").replace(/^\uFEFF/, "");
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error("Error reading dbFile:", e);
    }
    return null;
  };

  const saveDb = (data: any) => {
    try {
      if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
      fs.writeFileSync(dbFile, JSON.stringify(data, null, 2), "utf-8");
    } catch (e) {
      console.error("Error saving dbFile:", e);
    }
  };

  const apiMiddleware: any = (req: any, res: any, next: any) => {
    if (!req.url?.startsWith("/api/")) return next();

    const url = req.url.split("?")[0];
    const method = req.method;

    const executeRoute = (parsedBody: any) => {
      const sendJson = (status: number, data: any) => {
        res.statusCode = status;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
      };

      const db = getDb();
      if (!db) {
        return sendJson(500, {
          success: false,
          error: "Database not initialized",
        });
      }

      // Auth login
      if (url === "/api/auth/login" && method === "POST") {
        const { email, password } = parsedBody;
        if (email === "admin@citgubbi.ac.in" && password === "admin123") {
          return sendJson(200, {
            success: true,
            data: {
              user: {
                id: "admin-01",
                name: "Prof. Mahesh / Dr. Suhas (CIT CSE Conveners)",
                email: "admin@citgubbi.ac.in",
                role: "SUPER_ADMIN",
              },
            },
          });
        }
        if (email === "content@citgubbi.ac.in" && password === "content123") {
          return sendJson(200, {
            success: true,
            data: {
              user: {
                id: "admin-02",
                name: "CIT Media & Content Team",
                email: "content@citgubbi.ac.in",
                role: "CONTENT_MANAGER",
              },
            },
          });
        }
        return sendJson(401, {
          success: false,
          error: { message: "Invalid administrator credentials" },
        });
      }

      // Routes
      if (url === "/api/event") {
        if (method === "GET")
          return sendJson(200, { success: true, data: db.event });
        if (method === "PUT") {
          db.event = { ...db.event, ...parsedBody };
          db.auditLogs.unshift({
            id: `log-${Date.now()}`,
            adminName: "Admin",
            action: "UPDATE_EVENT",
            module: "Event",
            details: `Updated event: ${db.event.name}`,
            timestamp: new Date().toISOString(),
          });
          saveDb(db);
          return sendJson(200, { success: true, data: db.event });
        }
      }

      if (url === "/api/hero") {
        if (method === "GET")
          return sendJson(200, { success: true, data: db.hero });
        if (method === "PUT") {
          db.hero = { ...db.hero, ...parsedBody };
          saveDb(db);
          return sendJson(200, { success: true, data: db.hero });
        }
      }

      if (url === "/api/navbar") {
        if (method === "GET")
          return sendJson(200, { success: true, data: db.navbar });
        if (method === "PUT") {
          db.navbar = parsedBody;
          saveDb(db);
          return sendJson(200, { success: true, data: db.navbar });
        }
      }

      if (url === "/api/sections") {
        if (method === "GET")
          return sendJson(200, { success: true, data: db.sections });
        if (method === "PUT") {
          db.sections = parsedBody;
          saveDb(db);
          return sendJson(200, { success: true, data: db.sections });
        }
      }

      if (url === "/api/stats") {
        if (method === "GET")
          return sendJson(200, { success: true, data: db.stats });
        if (method === "PUT") {
          db.stats = parsedBody;
          saveDb(db);
          return sendJson(200, { success: true, data: db.stats });
        }
      }

      if (url === "/api/about") {
        if (method === "GET")
          return sendJson(200, { success: true, data: db.about });
        if (method === "PUT") {
          db.about = { ...db.about, ...parsedBody };
          saveDb(db);
          return sendJson(200, { success: true, data: db.about });
        }
      }

      if (url === "/api/theme") {
        if (method === "GET")
          return sendJson(200, { success: true, data: db.theme });
        if (method === "PUT") {
          db.theme = { ...db.theme, ...parsedBody };
          saveDb(db);
          return sendJson(200, { success: true, data: db.theme });
        }
      }

      if (url === "/api/domains") {
        if (method === "GET")
          return sendJson(200, { success: true, data: db.domains || [] });
        if (method === "PUT") {
          db.domains = Array.isArray(parsedBody) ? parsedBody : [];
          saveDb(db);
          return sendJson(200, { success: true, data: db.domains });
        }
        if (method === "POST") {
          if (!Array.isArray(db.domains)) db.domains = [];
          const rawDomainNum = parsedBody.domainNumber || db.domains.length + 1;
          const formattedDomainNum =
            typeof rawDomainNum === "number"
              ? String(rawDomainNum).padStart(2, "0")
              : String(rawDomainNum);
          const newDomain = {
            id: parsedBody.id || `domain-${Date.now()}`,
            domainNumber: formattedDomainNum,
            ...parsedBody,
            displayOrder: parsedBody.displayOrder || db.domains.length + 1,
            status: parsedBody.status || "PUBLISHED",
          };
          db.domains.push(newDomain);
          db.auditLogs.unshift({
            id: `log-${Date.now()}`,
            adminName: "Admin",
            action: "CREATE_DOMAIN",
            module: "Domains",
            details: `Added domain: ${newDomain.name}`,
            timestamp: new Date().toISOString(),
          });
          saveDb(db);
          return sendJson(200, { success: true, data: newDomain });
        }
      }

      if (url.startsWith("/api/domains/") && method === "PUT") {
        const rawId = url.replace("/api/domains/", "");
        const id = decodeURIComponent(rawId);
        if (!Array.isArray(db.domains)) db.domains = [];
        const idx = db.domains.findIndex(
          (d: any) =>
            String(d.id) === id ||
            String(d.name).toLowerCase() === id.toLowerCase(),
        );
        if (idx !== -1) {
          db.domains[idx] = {
            ...db.domains[idx],
            ...parsedBody,
          };
          saveDb(db);
          return sendJson(200, { success: true, data: db.domains[idx] });
        }
        return sendJson(404, { success: false, error: "Domain not found" });
      }

      if (url.startsWith("/api/domains/") && method === "DELETE") {
        const rawId = url.replace("/api/domains/", "");
        const id = decodeURIComponent(rawId);
        if (!Array.isArray(db.domains)) db.domains = [];
        db.domains = db.domains.filter(
          (d: any) =>
            String(d.id) !== id &&
            String(d.name).toLowerCase() !== id.toLowerCase(),
        );
        saveDb(db);
        return sendJson(200, { success: true, data: { id } });
      }

      if (url === "/api/problems") {
        if (method === "GET")
          return sendJson(200, { success: true, data: db.problems || [] });
        if (method === "PUT") {
          db.problems = Array.isArray(parsedBody) ? parsedBody : [];
          saveDb(db);
          return sendJson(200, { success: true, data: db.problems });
        }
        if (method === "POST") {
          if (!Array.isArray(db.problems)) db.problems = [];
          const newProb = {
            id: parsedBody.id || `prob-${Date.now()}`,
            problemId:
              parsedBody.problemId ||
              `PS-${String(db.problems.length + 1).padStart(2, "0")}`,
            slug: (parsedBody.title || "problem")
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-"),
            ...parsedBody,
            displayOrder: parsedBody.displayOrder || db.problems.length + 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          db.problems.push(newProb);
          db.auditLogs.unshift({
            id: `log-${Date.now()}`,
            adminName: "Admin",
            action: "CREATE_PROBLEM",
            module: "Problems",
            details: `Created problem: ${newProb.title} (${newProb.problemId})`,
            timestamp: new Date().toISOString(),
          });
          saveDb(db);
          return sendJson(200, { success: true, data: newProb });
        }
      }

      if (url.startsWith("/api/problems/") && method === "PUT") {
        const rawId = url.replace("/api/problems/", "");
        const id = decodeURIComponent(rawId);
        if (!Array.isArray(db.problems)) db.problems = [];
        const idx = db.problems.findIndex((p: any) => String(p.id) === id);
        if (idx !== -1) {
          db.problems[idx] = {
            ...db.problems[idx],
            ...parsedBody,
            updatedAt: new Date().toISOString(),
          };
          db.auditLogs.unshift({
            id: `log-${Date.now()}`,
            adminName: "Admin",
            action: "UPDATE_PROBLEM",
            module: "Problems",
            details: `Updated problem: ${db.problems[idx].title}`,
            timestamp: new Date().toISOString(),
          });
          saveDb(db);
          return sendJson(200, { success: true, data: db.problems[idx] });
        }
        return sendJson(404, {
          success: false,
          error: "Problem not found",
        });
      }

      if (url.startsWith("/api/problems/") && method === "DELETE") {
        const rawId = url.replace("/api/problems/", "");
        const id = decodeURIComponent(rawId);
        if (!Array.isArray(db.problems)) db.problems = [];
        db.problems = db.problems.filter((p: any) => String(p.id) !== id);
        saveDb(db);
        return sendJson(200, { success: true, data: { id } });
      }

      if (url === "/api/timeline") {
        if (method === "GET")
          return sendJson(200, { success: true, data: db.timeline });
        if (method === "PUT") {
          db.timeline = parsedBody;
          saveDb(db);
          return sendJson(200, { success: true, data: db.timeline });
        }
      }

      if (url === "/api/rules") {
        if (method === "GET")
          return sendJson(200, { success: true, data: db.rules });
        if (method === "PUT") {
          db.rules = parsedBody;
          saveDb(db);
          return sendJson(200, { success: true, data: db.rules });
        }
      }

      if (url === "/api/coordinators") {
        if (method === "GET")
          return sendJson(200, { success: true, data: db.coordinators });
        if (method === "PUT") {
          db.coordinators = Array.isArray(parsedBody) ? parsedBody : [];
          saveDb(db);
          return sendJson(200, { success: true, data: db.coordinators });
        }
        if (method === "POST") {
          if (!Array.isArray(db.coordinators)) db.coordinators = [];
          const newCoord = {
            id: parsedBody.id || `coord-${Date.now()}`,
            ...parsedBody,
          };
          db.coordinators.push(newCoord);
          saveDb(db);
          return sendJson(200, { success: true, data: newCoord });
        }
      }

      if (url.startsWith("/api/coordinators/") && url.endsWith("/image")) {
        const rawId = url
          .replace("/api/coordinators/", "")
          .replace("/image", "");
        const id = decodeURIComponent(rawId);
        if (!Array.isArray(db.coordinators)) db.coordinators = [];
        const idx = db.coordinators.findIndex(
          (c: any) =>
            String(c.id) === id ||
            String(c.name).toLowerCase() === id.toLowerCase(),
        );
        if (idx !== -1) {
          if (method === "PUT") {
            db.coordinators[idx].imageUrl = parsedBody.imageUrl;
            saveDb(db);
            return sendJson(200, {
              success: true,
              data: db.coordinators[idx],
            });
          }
          if (method === "DELETE") {
            delete db.coordinators[idx].imageUrl;
            delete db.coordinators[idx].photo;
            delete db.coordinators[idx].image;
            saveDb(db);
            return sendJson(200, {
              success: true,
              data: db.coordinators[idx],
            });
          }
        }
        return sendJson(404, {
          success: false,
          error: "Coordinator not found",
        });
      }

      if (url.startsWith("/api/coordinators/") && method === "PUT") {
        const rawId = url.replace("/api/coordinators/", "");
        const id = decodeURIComponent(rawId);
        if (!Array.isArray(db.coordinators)) db.coordinators = [];
        const idx = db.coordinators.findIndex(
          (c: any) =>
            String(c.id) === id ||
            String(c.name).toLowerCase() === id.toLowerCase(),
        );
        if (idx !== -1) {
          db.coordinators[idx] = {
            ...db.coordinators[idx],
            ...parsedBody,
          };
          saveDb(db);
          return sendJson(200, {
            success: true,
            data: db.coordinators[idx],
          });
        }
        return sendJson(404, {
          success: false,
          error: "Coordinator not found",
        });
      }

      if (url.startsWith("/api/coordinators/") && method === "DELETE") {
        const rawId = url.replace("/api/coordinators/", "");
        const id = decodeURIComponent(rawId);
        if (!Array.isArray(db.coordinators)) db.coordinators = [];
        db.coordinators = db.coordinators.filter(
          (c: any) =>
            String(c.id) !== id &&
            String(c.name).toLowerCase() !== id.toLowerCase(),
        );
        saveDb(db);
        return sendJson(200, { success: true, data: { id } });
      }

      if (url === "/api/patrons") {
        if (method === "GET")
          return sendJson(200, { success: true, data: db.patrons || [] });
        if (method === "PUT") {
          db.patrons = Array.isArray(parsedBody) ? parsedBody : [];
          saveDb(db);
          return sendJson(200, { success: true, data: db.patrons });
        }
        if (method === "POST") {
          if (!Array.isArray(db.patrons)) db.patrons = [];
          const newPatron = {
            id: parsedBody.id || `p-${Date.now()}`,
            name: parsedBody.name || "Patron",
            role: parsedBody.role || "",
            designation: parsedBody.designation || "",
            category: parsedBody.category || "PATRON",
            imageUrl: parsedBody.imageUrl || "",
            displayOrder: db.patrons.length + 1,
            status: "PUBLISHED",
            ...parsedBody,
          };
          db.patrons.push(newPatron);
          saveDb(db);
          return sendJson(200, { success: true, data: newPatron });
        }
      }

      if (url.startsWith("/api/patrons/") && url.endsWith("/image")) {
        const rawId = url.replace("/api/patrons/", "").replace("/image", "");
        const id = decodeURIComponent(rawId);
        if (!Array.isArray(db.patrons)) db.patrons = [];
        const idx = db.patrons.findIndex(
          (p: any) =>
            String(p.id) === id ||
            String(p.name).toLowerCase() === id.toLowerCase(),
        );
        if (idx !== -1) {
          if (method === "PUT") {
            db.patrons[idx].imageUrl = parsedBody.imageUrl;
            saveDb(db);
            return sendJson(200, { success: true, data: db.patrons[idx] });
          }
          if (method === "DELETE") {
            delete db.patrons[idx].imageUrl;
            delete db.patrons[idx].photo;
            delete db.patrons[idx].image;
            saveDb(db);
            return sendJson(200, { success: true, data: db.patrons[idx] });
          }
        }
        return sendJson(404, { success: false, error: "Patron not found" });
      }

      if (url.startsWith("/api/patrons/") && method === "PUT") {
        const rawId = url.replace("/api/patrons/", "");
        const id = decodeURIComponent(rawId);
        if (!Array.isArray(db.patrons)) db.patrons = [];
        const idx = db.patrons.findIndex(
          (p: any) =>
            String(p.id) === id ||
            String(p.name).toLowerCase() === id.toLowerCase(),
        );
        if (idx !== -1) {
          db.patrons[idx] = {
            ...db.patrons[idx],
            ...parsedBody,
          };
          saveDb(db);
          return sendJson(200, { success: true, data: db.patrons[idx] });
        }
        return sendJson(404, { success: false, error: "Patron not found" });
      }

      if (url.startsWith("/api/patrons/") && method === "DELETE") {
        const rawId = url.replace("/api/patrons/", "");
        const id = decodeURIComponent(rawId);
        if (!Array.isArray(db.patrons)) db.patrons = [];
        db.patrons = db.patrons.filter(
          (p: any) =>
            String(p.id) !== id &&
            String(p.name).toLowerCase() !== id.toLowerCase(),
        );
        saveDb(db);
        return sendJson(200, { success: true, data: { id } });
      }

      if (url === "/api/faqs") {
        if (method === "GET")
          return sendJson(200, { success: true, data: db.faqs });
        if (method === "PUT") {
          db.faqs = parsedBody;
          saveDb(db);
          return sendJson(200, { success: true, data: db.faqs });
        }
      }

      if (url === "/api/announcements") {
        if (method === "GET")
          return sendJson(200, { success: true, data: db.announcements });
        if (method === "POST") {
          const newAnn = {
            id: `ann-${Date.now()}`,
            publishDate: new Date().toISOString(),
            status: "PUBLISHED",
            ...parsedBody,
          };
          db.announcements.unshift(newAnn);
          db.auditLogs.unshift({
            id: `log-${Date.now()}`,
            adminName: "Admin",
            action: "PUBLISH_ANNOUNCEMENT",
            module: "Announcements",
            details: `Broadcasted: ${newAnn.title}`,
            timestamp: new Date().toISOString(),
          });
          saveDb(db);
          return sendJson(200, { success: true, data: newAnn });
        }
      }

      if (url.startsWith("/api/announcements/") && method === "DELETE") {
        const rawId = url.replace("/api/announcements/", "");
        const id = decodeURIComponent(rawId);
        db.announcements = (db.announcements || []).filter(
          (a: any) => String(a.id) !== id,
        );
        saveDb(db);
        return sendJson(200, { success: true, data: { id } });
      }

      if (url === "/api/registration") {
        if (method === "GET")
          return sendJson(200, { success: true, data: db.registration });
        if (method === "PUT") {
          db.registration = { ...db.registration, ...parsedBody };
          db.auditLogs.unshift({
            id: `log-${Date.now()}`,
            adminName: "Admin",
            action: "UPDATE_REGISTRATION",
            module: "Registration",
            details: `Changed registration URL: ${db.registration.registrationUrl}`,
            timestamp: new Date().toISOString(),
          });
          saveDb(db);
          return sendJson(200, { success: true, data: db.registration });
        }
      }

      if (url === "/api/media") {
        if (method === "GET")
          return sendJson(200, { success: true, data: db.media });
      }

      if (url === "/api/media/active-logo" && method === "PUT") {
        db.media.activeCollegeLogo = parsedBody.activeCollegeLogo;
        saveDb(db);
        return sendJson(200, { success: true, data: db.media });
      }

      if (url === "/api/audit-logs") {
        return sendJson(200, { success: true, data: db.auditLogs });
      }

      return sendJson(404, { success: false, error: "Endpoint not found" });
    };

    if (method === "GET" || method === "DELETE" || method === "HEAD") {
      executeRoute({});
    } else {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        let parsedBody: any = {};
        if (body) {
          try {
            parsedBody = JSON.parse(body);
          } catch (e) {
            parsedBody = {};
          }
        }
        executeRoute(parsedBody);
      });
    }
  };

  return {
    name: "vite-cms-api-plugin",
    configureServer(server) {
      server.middlewares.use(apiMiddleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(apiMiddleware);
    },
  };
}

export default defineConfig({
  base: "./",
  plugins: [react(), cmsApiPlugin()],
  server: {
    port: 3000,
    host: "0.0.0.0",
    open: false,
    watch: {
      ignored: ["**/data/**", "**/cms_database.json"],
    },
  },
  preview: {
    port: 3000,
    host: "0.0.0.0",
  },
});
