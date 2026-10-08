import React, { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  Users,
  FolderGit2,
  Calendar,
  FileText,
  Bell,
  Settings,
  Award,
  CheckCircle,
  CheckCircle2,
  Plus,
  Search,
  Filter,
  Download,
  ArrowLeft,
  Trash2,
  Edit3,
  Save,
  RefreshCw,
  LogOut,
  Lock,
  Eye,
  EyeOff,
  ExternalLink,
  Shield,
  Sliders,
  HelpCircle,
  Image as ImageIcon,
  Clock,
  Sparkles,
  Layers,
  Scale,
  Phone,
  Activity,
  AlertCircle,
  Check,
  Database,
  ZoomIn,
  Upload,
  User,
} from "lucide-react";
import { useCms } from "../context/CmsContext";
import { OfficialPosterModal } from "./OfficialPosterModal";

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.66 1.66 0 0 0-1.67 1.67c0 .92.75 1.67 1.67 1.67a1.66 1.66 0 0 0 1.66-1.67A1.66 1.66 0 0 0 7.83 6.2z" />
  </svg>
);

interface AdminPanelProps {
  onBackToSite: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToSite }) => {
  const cms = useCms();

  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Modal / Editing states for sub-items
  const [newProblem, setNewProblem] = useState({
    title: "",
    domainId: "healthcare",
    domain: "Healthcare",
    shortDescription: "",
    fullDescription: "",
    scope: "",
    expectedDeliverables: "",
    evaluationCriteria: "",
    tags: "AI, Healthcare",
    isPublished: true,
    datasets: [{ name: "", url: "", description: "" }] as Array<{
      name: string;
      url: string;
      description?: string;
    }>,
  });
  const [showAddProblemModal, setShowAddProblemModal] = useState(false);

  const [newDomain, setNewDomain] = useState({
    name: "",
    domainNumber: 1,
    shortDescription: "",
    iconName: "Layers",
    tag: "Emerging Tech",
    borderColor: "border-sky-300",
  });
  const [showAddDomainModal, setShowAddDomainModal] = useState(false);
  const [editingDomain, setEditingDomain] = useState<any>(null);
  const [showEditDomainModal, setShowEditDomainModal] = useState(false);
  const [editingProblem, setEditingProblem] = useState<any>(null);
  const [showEditProblemModal, setShowEditProblemModal] = useState(false);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    shortMessage: "",
    priority: "IMPORTANT",
    linkUrl: "",
    linkText: "Learn More",
  });
  const [showAddAnnModal, setShowAddAnnModal] = useState(false);

  const [newCoordinator, setNewCoordinator] = useState({
    name: "",
    phone: "",
    formattedPhone: "",
    role: "Student Coordinator",
    category: "STUDENT",
    imageUrl: "",
    linkedin: "",
  });
  const [showAddCoordModal, setShowAddCoordModal] = useState(false);
  const [editingCoordinator, setEditingCoordinator] = useState<any>(null);
  const [showEditCoordModal, setShowEditCoordModal] = useState(false);

  const handleCoordinatorPhotoUpload = (
    coordId: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert(
        "Selected image is larger than 5MB. Please choose an image under 5MB.",
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        await cms.uploadCoordinatorPhoto(coordId, dataUrl);
        triggerSuccess("Coordinator photo uploaded and synced to backend!");
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleNewCoordinatorPhotoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert(
        "Selected image is larger than 5MB. Please choose an image under 5MB.",
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setNewCoordinator((prev) => ({ ...prev, imageUrl: dataUrl }));
        triggerSuccess("Photo loaded into preview!");
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleEditCoordinatorPhotoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert(
        "Selected image is larger than 5MB. Please choose an image under 5MB.",
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl && editingCoordinator) {
        setEditingCoordinator({ ...editingCoordinator, imageUrl: dataUrl });
        triggerSuccess("New photo loaded into preview!");
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const [newPatron, setNewPatron] = useState({
    name: "",
    role: "",
    designation: "",
    category: "CHIEF PATRON",
    imageUrl: "",
  });
  const [showAddPatronModal, setShowAddPatronModal] = useState(false);
  const [editingPatron, setEditingPatron] = useState<any>(null);
  const [showEditPatronModal, setShowEditPatronModal] = useState(false);

  const handlePatronPhotoUpload = (
    patronId: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert(
        "Selected image is larger than 5MB. Please choose an image under 5MB.",
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        await cms.uploadPatronPhoto(patronId, dataUrl);
        triggerSuccess("Patron photo uploaded and synced to backend!");
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleNewPatronPhotoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert(
        "Selected image is larger than 5MB. Please choose an image under 5MB.",
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setNewPatron((prev) => ({ ...prev, imageUrl: dataUrl }));
        triggerSuccess("Photo loaded into preview!");
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleEditPatronPhotoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert(
        "Selected image is larger than 5MB. Please choose an image under 5MB.",
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl && editingPatron) {
        setEditingPatron({ ...editingPatron, imageUrl: dataUrl });
        triggerSuccess("New photo loaded into preview!");
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const [newFaq, setNewFaq] = useState({
    question: "",
    answer: "",
    category: "General",
  });
  const [showAddFaqModal, setShowAddFaqModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<any>(null);
  const [showEditFaqModal, setShowEditFaqModal] = useState(false);

  const [newRule, setNewRule] = useState({
    category: "Participation",
    ruleText: "",
  });
  const [showAddRuleModal, setShowAddRuleModal] = useState(false);
  const [editingRule, setEditingRule] = useState<any>(null);
  const [showEditRuleModal, setShowEditRuleModal] = useState(false);

  const [newTimelineItem, setNewTimelineItem] = useState({
    step: "01",
    dayNumber: 1,
    dayLabel: "DAY 1",
    date: "30 OCTOBER 2026",
    title: "",
    description: "",
  });
  const [showAddTimelineModal, setShowAddTimelineModal] = useState(false);
  const [editingTimelineItem, setEditingTimelineItem] = useState<any>(null);
  const [showEditTimelineModal, setShowEditTimelineModal] = useState(false);

  const [posterUrlInput, setPosterUrlInput] = useState(
    cms.media?.activePosterUrl || "/official_poster.png",
  );
  const [showPosterPreviewModal, setShowPosterPreviewModal] = useState(false);
  const posterFileInputRef = useRef<HTMLInputElement>(null);

  const handlePosterFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert(
        "Selected image is larger than 5MB. Please choose an image under 5MB for optimal browser storage.",
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setPosterUrlInput(dataUrl);
        await cms.updateActivePoster(dataUrl);
        triggerSuccess(
          "Poster uploaded from device and saved directly into Local Storage!",
        );
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  useEffect(() => {
    if (cms.media?.activePosterUrl) {
      setPosterUrlInput(cms.media.activePosterUrl);
    }
  }, [cms.media?.activePosterUrl]);

  const triggerSuccess = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(""), 4000);
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const res = await cms.login(loginEmail, loginPassword);
    if (!res.success) {
      setLoginError(res.error || "Invalid credentials");
    }
  };

  // If not logged in, render the login view
  if (!cms.user) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-3">
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span>CIT CMS CONSOLE</span>
            </div>
            <h1 className="font-heading font-black text-2xl text-white">
              Buildathon 2.0 Admin Portal
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Channabasaveshwara Institute of Technology, Gubbi
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Admin Email
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="admin@citgubbi.ac.in"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-heading font-bold text-sm tracking-wide shadow-lg shadow-indigo-600/30 transition-all"
            >
              Sign In to CMS
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onBackToSite}
              className="text-xs text-slate-500 hover:text-slate-300 font-mono transition-colors"
            >
              ← Back to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between flex-wrap gap-3 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToSite}
            className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Site</span>
          </button>
          <div className="h-5 w-[1px] bg-slate-800 hidden sm:block"></div>
          <div>
            <h1 className="font-heading font-black text-sm text-white flex items-center gap-2">
              <span>CIT BUILDATHON 2.0 CMS CONSOLE</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {cms.user.role}
              </span>
            </h1>
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
              Department of Computer Science and Engineering • Persistent
              Database
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={() =>
              cms
                .refreshAll()
                .then(() => triggerSuccess("Database reloaded successfully!"))
            }
            className="flex items-center gap-1.5 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-800 transition-colors"
            title="Reload from disk"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sync</span>
          </button>

          <span className="text-slate-400 font-mono hidden md:inline">
            {cms.user.email}
          </span>

          <button
            onClick={cms.logout}
            className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-2.5 py-1.5 rounded-lg border border-rose-500/30 transition-colors font-mono"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Floating Success Alert */}
      {saveSuccessMsg && (
        <div className="bg-emerald-500 text-white text-xs font-bold py-2.5 px-4 text-center sticky top-[57px] z-50 flex items-center justify-center gap-2 shadow-lg transition-all animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Main Admin Content Body */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Admin Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-slate-950/70 border-r border-slate-800/80 p-3 space-y-1 overflow-y-auto">
          <div className="text-[10px] font-mono uppercase text-slate-500 px-3 py-2 font-bold">
            CMS Modules
          </div>

          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "event-hero", label: "Event & Hero", icon: Sparkles },
            { id: "sections-nav", label: "Navbar & Sections", icon: Sliders },
            {
              id: "domains",
              label: "Innovation Domains",
              icon: Layers,
              badge: cms.domains?.length,
            },
            {
              id: "problems",
              label: "Problem Statements",
              icon: FolderGit2,
              badge: cms.problems?.length,
            },
            { id: "timeline", label: "Event Flow (24H)", icon: Clock },
            { id: "rules", label: "Rules & Regulations", icon: Scale },
            {
              id: "patrons",
              label: "Chief Patrons & Patrons",
              icon: Award,
              badge: cms.patrons?.length,
            },
            {
              id: "coordinators",
              label: "Committee",
              icon: Users,
              badge: cms.coordinators?.length,
            },
            {
              id: "faqs",
              label: "FAQs Management",
              icon: HelpCircle,
              badge: cms.faqs?.length,
            },
            {
              id: "announcements",
              label: "Alert Banners",
              icon: Bell,
              badge: cms.announcements?.length,
            },
            { id: "registration", label: "Registration & Fee", icon: Calendar },
            { id: "poster", label: "Official Poster", icon: FileText },
            { id: "branding", label: "Logos & Branding", icon: ImageIcon },
            {
              id: "audit-logs",
              label: "Audit Logs",
              icon: Activity,
              badge: cms.auditLogs?.length,
            },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white font-semibold shadow-md"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${isActive ? "bg-indigo-700 text-white" : "bg-slate-800 text-slate-400"}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Panels */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 bg-slate-900 overflow-y-auto">
          {/* TAB 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h2 className="font-heading font-black text-2xl text-white">
                  CMS Overview & Event Controls
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Every change here updates data/cms_database.json and the
                  public website automatically.
                </p>
              </div>

              {/* Status KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    Event Edition
                  </span>
                  <div className="text-2xl font-black text-white mt-1">
                    {cms.event?.edition || "2.0"} (2K26)
                  </div>
                  <span className="text-xs text-sky-400 mt-1 block font-mono">
                    {cms.event?.datesFormatted || "30 & 31 Oct 2026"}
                  </span>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    Published Problems
                  </span>
                  <div className="text-2xl font-black text-white mt-1">
                    {
                      (cms.problems || []).filter(
                        (p: any) => p.isPublished !== false,
                      ).length
                    }
                  </div>
                  <span className="text-xs text-emerald-400 mt-1 block font-mono">
                    Live on website
                  </span>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    Active Domains
                  </span>
                  <div className="text-2xl font-black text-white mt-1">
                    {cms.domains?.length ?? 0}
                  </div>
                  <span className="text-xs text-indigo-400 mt-1 block font-mono">
                    Multidisciplinary
                  </span>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    Registration Status
                  </span>
                  <div className="text-2xl font-black text-rose-400 mt-1">
                    {cms.registration?.status || "OPEN"}
                  </div>
                  <span className="text-xs text-slate-400 mt-1 block font-mono">
                    Fee: {cms.registration?.feePerTeam || "₹500"}
                  </span>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="font-heading font-bold text-base text-white">
                  Quick CMS Actions
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveTab("problems")}
                    className="px-4 py-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center gap-2"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Manage Problem Statements</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("announcements")}
                    className="px-4 py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-2"
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>Create Announcement Banner</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("branding")}
                    className="px-4 py-2.5 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/30 text-xs font-semibold flex items-center gap-2"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Navbar College Logo</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("event-hero")}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Edit Hero & Titles</span>
                  </button>
                </div>
              </div>

              {/* Recent Audit Logs Snapshot */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-sm text-white">
                    Recent System Updates
                  </h3>
                  <button
                    onClick={() => setActiveTab("audit-logs")}
                    className="text-xs text-indigo-400 hover:underline"
                  >
                    View All ({cms.auditLogs?.length || 0})
                  </button>
                </div>
                <div className="space-y-2">
                  {(cms.auditLogs || []).slice(0, 4).map((log: any) => (
                    <div
                      key={log.id}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-indigo-400 uppercase text-[10px] bg-indigo-500/10 px-2 py-0.5 rounded">
                          {log.action}
                        </span>
                        <span className="text-slate-300">
                          {log.entity}: {log.details}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EVENT & HERO */}
          {activeTab === "event-hero" && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h2 className="font-heading font-black text-2xl text-white">
                  Event & Hero Section CMS
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Changes made here instantly reflect on the hero banner and
                  global headers.
                </p>
              </div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSaving(true);
                  const fd = new FormData(e.currentTarget);
                  await cms.updateHero({
                    smallLabel: fd.get("smallLabel"),
                    title: fd.get("heroTitle"),
                    editionBadge: fd.get("editionBadge"),
                    yearBadge: fd.get("yearBadge"),
                    subtitle: fd.get("subtitle"),
                    tagline: fd.get("tagline"),
                    description: fd.get("description"),
                    primaryButtonText: fd.get("primaryButtonText"),
                    primaryButtonUrl: fd.get("primaryButtonUrl"),
                    secondaryButtonText: fd.get("secondaryButtonText"),
                    showCountdown: fd.get("showCountdown") === "on",
                    countdownTargetDate: fd.get("countdownTargetDate"),
                  });
                  await cms.updateEvent({
                    name: fd.get("eventName"),
                    edition: fd.get("editionBadge"),
                    datesFormatted: fd.get("datesFormatted"),
                    venueName: fd.get("venueName"),
                    durationHours: Number(fd.get("durationHours")),
                    prizePool: fd.get("prizePool"),
                  });
                  setIsSaving(false);
                  triggerSuccess("Hero & Event settings saved successfully!");
                }}
                className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Event Full Name
                    </label>
                    <input
                      name="eventName"
                      defaultValue={cms.event?.name || "BUILDATHON 2.0 – 2K26"}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Hero Title
                    </label>
                    <input
                      name="heroTitle"
                      defaultValue={cms.hero?.title || "BUILDATHON"}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Edition Badge
                    </label>
                    <input
                      name="editionBadge"
                      defaultValue={cms.hero?.editionBadge || "2.0"}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Year Badge
                    </label>
                    <input
                      name="yearBadge"
                      defaultValue={cms.hero?.yearBadge || "2K26"}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Dates Formatted
                    </label>
                    <input
                      name="datesFormatted"
                      defaultValue={
                        cms.event?.datesFormatted || "30 & 31 Oct 2026"
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Venue Name
                    </label>
                    <input
                      name="venueName"
                      defaultValue={cms.event?.venueName || "CIT Campus, Gubbi"}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Duration (Hours)
                    </label>
                    <input
                      type="number"
                      name="durationHours"
                      defaultValue={cms.event?.durationHours || 24}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Prize Pool
                    </label>
                    <input
                      name="prizePool"
                      defaultValue={cms.event?.prizePool || "₹30K"}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Small Institution Pill Label
                  </label>
                  <input
                    name="smallLabel"
                    defaultValue={
                      cms.hero?.smallLabel ||
                      "Channabasaveshwara Institute of Technology, Gubbi, Tumkur"
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Official Tagline
                  </label>
                  <input
                    name="tagline"
                    defaultValue={
                      cms.hero?.tagline || "INNOVATE • CODE • IMPACT"
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Theme / Hero Description
                  </label>
                  <textarea
                    name="description"
                    rows={2}
                    defaultValue={
                      cms.hero?.description ||
                      "Building Intelligent Solutions for a Smarter, Sustainable & Secure Tomorrow"
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-indigo-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Primary CTA Text
                    </label>
                    <input
                      name="primaryButtonText"
                      defaultValue={
                        cms.hero?.primaryButtonText || "REGISTER NOW"
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Primary CTA URL
                    </label>
                    <input
                      name="primaryButtonUrl"
                      defaultValue={
                        cms.hero?.primaryButtonUrl || cms.event?.registrationUrl
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Secondary CTA Text
                    </label>
                    <input
                      name="secondaryButtonText"
                      defaultValue={
                        cms.hero?.secondaryButtonText || "EXPLORE HACKATHON"
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Countdown Target Date (ISO)
                    </label>
                    <input
                      name="countdownTargetDate"
                      defaultValue={
                        cms.hero?.countdownTargetDate || cms.event?.dateStart
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="showCountdown"
                    name="showCountdown"
                    defaultChecked={cms.hero?.showCountdown !== false}
                    className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-800"
                  />
                  <label
                    htmlFor="showCountdown"
                    className="text-xs text-slate-300 font-mono"
                  >
                    Show Live Countdown Timer in Hero
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-heading font-bold text-xs uppercase flex items-center gap-2 shadow-md transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? "Saving..." : "Save Event & Hero"}</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: SECTIONS & NAVBAR */}
          {activeTab === "sections-nav" && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h2 className="font-heading font-black text-2xl text-white">
                  Homepage Sections & Navbar Management
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Toggle sections on or off, and manage navigation bar items.
                </p>
              </div>

              {/* Sections Manager */}
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="font-heading font-bold text-base text-white">
                  Homepage Sections Visibility
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Disabled sections will immediately hide from the public
                  homepage without code edits.
                </p>

                <div className="space-y-2">
                  {(cms.sections || []).map((sec: any, idx: number) => (
                    <div
                      key={sec.id}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-slate-500 w-6">
                          #{idx + 1}
                        </span>
                        <span className="font-heading font-bold text-sm text-white">
                          {sec.name}
                        </span>
                        <span className="font-mono text-[10px] text-slate-500">
                          ({sec.id})
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={async () => {
                            const updated = cms.sections.map((s: any) =>
                              s.id === sec.id
                                ? { ...s, enabled: !s.enabled }
                                : s,
                            );
                            await cms.updateSections(updated);
                            triggerSuccess(
                              `Section "${sec.name}" ${sec.enabled ? "hidden" : "enabled"}!`,
                            );
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-colors ${
                            sec.enabled
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30"
                              : "bg-slate-800 text-slate-500 border border-slate-700 hover:bg-slate-700"
                          }`}
                        >
                          {sec.enabled ? "Visible" : "Hidden"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navbar Items Manager */}
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="font-heading font-bold text-base text-white">
                  Navigation Bar Links
                </h3>
                <div className="space-y-2">
                  {(cms.navbar || []).map((nav: any, idx: number) => (
                    <div
                      key={nav.id}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900 border border-slate-800"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-slate-500 w-6">
                          #{idx + 1}
                        </span>
                        <span className="font-heading font-bold text-sm text-white">
                          {nav.label}
                        </span>
                        <span className="font-mono text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                          Target: {nav.target}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={async () => {
                            const updated = cms.navbar.map((n: any) =>
                              n.id === nav.id
                                ? { ...n, enabled: !n.enabled }
                                : n,
                            );
                            await cms.updateNavbar(updated);
                            triggerSuccess(
                              `Navbar link "${nav.label}" updated!`,
                            );
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-colors ${
                            nav.enabled
                              ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                              : "bg-slate-800 text-slate-500"
                          }`}
                        >
                          {nav.enabled ? "Enabled" : "Disabled"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INNOVATION DOMAINS */}
          {activeTab === "domains" && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h2 className="font-heading font-black text-2xl text-white">
                    Innovation Domains Management
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Manage the technical hackathon domains displayed on the
                    public site.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={async () => {
                      if (
                        confirm(
                          "Restore all 5 official Buildathon 2.0 innovation domains into database?",
                        )
                      ) {
                        await cms.resetDomainsToDefault();
                        triggerSuccess(
                          "5 official innovation domains restored!",
                        );
                      }
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 border border-sky-500/20 font-heading font-bold text-xs uppercase flex items-center gap-1.5 transition-colors"
                    title="Restore 5 official domains"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Restore 5 Defaults</span>
                  </button>
                  <button
                    onClick={() => {
                      setNewDomain({
                        name: "",
                        domainNumber: (cms.domains?.length || 0) + 1,
                        shortDescription: "",
                        iconName: "Layers",
                        tag: "Emerging Tech",
                        borderColor: "border-sky-300",
                      });
                      setShowAddDomainModal(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-heading font-bold text-xs uppercase flex items-center gap-1.5 shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Domain</span>
                  </button>
                </div>
              </div>

              {/* Add Domain Modal */}
              {showAddDomainModal && (
                <div className="p-6 rounded-3xl bg-slate-950 border border-indigo-500/40 space-y-4 animate-fade-in">
                  <h3 className="font-heading font-bold text-base text-white">
                    Create New Domain
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Domain Name
                      </label>
                      <input
                        value={newDomain.name}
                        onChange={(e) =>
                          setNewDomain({ ...newDomain, name: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                        placeholder="e.g. Cyber Security & Defense"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Domain Number
                      </label>
                      <input
                        type="number"
                        value={newDomain.domainNumber}
                        onChange={(e) =>
                          setNewDomain({
                            ...newDomain,
                            domainNumber: Number(e.target.value),
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Short Description
                      </label>
                      <textarea
                        value={newDomain.shortDescription}
                        onChange={(e) =>
                          setNewDomain({
                            ...newDomain,
                            shortDescription: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white"
                        rows={2}
                        placeholder="Key focus areas..."
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={async () => {
                        if (!newDomain.name) return;
                        const slug = newDomain.name
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-|-$/g, "");
                        const id = slug ? `dom-${slug}` : `dom-${Date.now()}`;
                        await cms.addDomain({
                          ...newDomain,
                          id,
                          domainNumber: String(newDomain.domainNumber).padStart(
                            2,
                            "0",
                          ),
                          tags: newDomain.tag ? [newDomain.tag] : ["General"],
                        });
                        setShowAddDomainModal(false);
                        triggerSuccess(
                          `Domain "${newDomain.name}" added successfully!`,
                        );
                      }}
                      className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                    >
                      Save Domain
                    </button>
                    <button
                      onClick={() => setShowAddDomainModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Edit Domain Modal */}
              {showEditDomainModal && editingDomain && (
                <div className="p-6 rounded-3xl bg-slate-950 border border-sky-500/40 space-y-4 animate-fade-in">
                  <h3 className="font-heading font-bold text-base text-white">
                    Edit Domain: {editingDomain.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Domain Name
                      </label>
                      <input
                        value={editingDomain.name || ""}
                        onChange={(e) =>
                          setEditingDomain({
                            ...editingDomain,
                            name: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Domain Number
                      </label>
                      <input
                        type="text"
                        value={editingDomain.domainNumber || ""}
                        onChange={(e) =>
                          setEditingDomain({
                            ...editingDomain,
                            domainNumber: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Short Description
                      </label>
                      <textarea
                        value={editingDomain.shortDescription || ""}
                        onChange={(e) =>
                          setEditingDomain({
                            ...editingDomain,
                            shortDescription: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white"
                        rows={2}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={async () => {
                        await cms.updateDomain(editingDomain.id, editingDomain);
                        setShowEditDomainModal(false);
                        setEditingDomain(null);
                        triggerSuccess(
                          `Domain "${editingDomain.name}" updated successfully!`,
                        );
                      }}
                      className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs"
                    >
                      Update Domain
                    </button>
                    <button
                      onClick={() => {
                        setShowEditDomainModal(false);
                        setEditingDomain(null);
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Domains List or Clean Empty State */}
              {(cms.domains || []).length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(cms.domains || []).map((dom: any) => (
                    <div
                      key={dom.id}
                      className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-xs text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded font-bold">
                            DOMAIN {dom.domainNumber}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setEditingDomain({ ...dom });
                                setShowEditDomainModal(true);
                              }}
                              className="text-slate-500 hover:text-sky-400 p-1.5 transition-colors rounded-lg hover:bg-slate-900"
                              title="Edit domain"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={async () => {
                                if (confirm(`Delete domain "${dom.name}"?`)) {
                                  await cms.deleteDomain(dom.id);
                                  triggerSuccess(
                                    "Domain deleted successfully!",
                                  );
                                }
                              }}
                              className="text-slate-500 hover:text-rose-400 p-1.5 transition-colors rounded-lg hover:bg-slate-900"
                              title="Delete domain"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <h4 className="font-heading font-black text-lg text-white mb-1">
                          {dom.name}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed mb-3">
                          {dom.shortDescription}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-4">
                  <Layers className="w-12 h-12 text-slate-600 mx-auto" />
                  <h3 className="font-heading font-bold text-lg text-white">
                    No Innovation Domains Currently in Database
                  </h3>
                  <p className="text-xs text-slate-400 font-mono max-w-md mx-auto">
                    You currently have 0 domains configured. The public website
                    is accurately reflecting 0 domains.
                  </p>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setNewDomain({
                          name: "",
                          domainNumber: 1,
                          shortDescription: "",
                          iconName: "Layers",
                          tag: "Emerging Tech",
                          borderColor: "border-sky-300",
                        });
                        setShowAddDomainModal(true);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create New Domain</span>
                    </button>
                    <button
                      onClick={async () => {
                        if (
                          confirm(
                            "Restore all 5 official Buildathon 2.0 innovation domains into database?",
                          )
                        ) {
                          await cms.resetDomainsToDefault();
                          triggerSuccess(
                            "Official 5 domains restored successfully!",
                          );
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 border border-sky-500/30 font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Restore 5 Official Domains</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: PROBLEM STATEMENTS */}
          {activeTab === "problems" && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h2 className="font-heading font-black text-2xl text-white">
                    Problem Statements Repository
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Add, edit, publish or draft technical problem statements.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={async () => {
                      if (
                        confirm(
                          "Restore all 25 official Buildathon 2.0 problem statements into database?",
                        )
                      ) {
                        await cms.resetProblemsToDefault();
                        triggerSuccess(
                          "25 official problem statements restored!",
                        );
                      }
                    }}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 border border-sky-500/20 font-heading font-bold text-xs uppercase flex items-center gap-1.5 transition-colors"
                    title="Restore 25 official problem statements"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Restore 25 Defaults</span>
                  </button>
                  <button
                    onClick={() => {
                      setNewProblem({
                        title: "",
                        domainId: cms.domains?.[0]?.id || "healthcare",
                        domain: cms.domains?.[0]?.name || "Healthcare",
                        shortDescription: "",
                        fullDescription: "",
                        scope: "",
                        expectedDeliverables: "",
                        evaluationCriteria: "",
                        tags: "AI, Software",
                        isPublished: true,
                        datasets: [{ name: "", url: "", description: "" }],
                      });
                      setShowAddProblemModal(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-heading font-bold text-xs uppercase flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Problem Statement</span>
                  </button>
                </div>
              </div>

              {/* Add Problem Modal */}
              {showAddProblemModal && (
                <div className="p-6 rounded-3xl bg-slate-950 border border-indigo-500/40 space-y-4 animate-fade-in">
                  <h3 className="font-heading font-bold text-base text-white">
                    Create New Problem Statement
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Problem Title
                      </label>
                      <input
                        value={newProblem.title}
                        onChange={(e) =>
                          setNewProblem({
                            ...newProblem,
                            title: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                        placeholder="e.g. AI-Powered Early Disaster Warning System"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Domain
                      </label>
                      <select
                        value={newProblem.domainId}
                        onChange={(e) => {
                          const dId = e.target.value;
                          const dom = cms.domains?.find(
                            (d: any) => d.id === dId,
                          );
                          setNewProblem({
                            ...newProblem,
                            domainId: dId,
                            domain: dom ? dom.name : "Healthcare",
                          });
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                      >
                        {(cms.domains || []).map((d: any) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Tags (comma separated)
                      </label>
                      <input
                        value={newProblem.tags}
                        onChange={(e) =>
                          setNewProblem({ ...newProblem, tags: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                        placeholder="AI, IoT, Computer Vision"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Short Summary
                      </label>
                      <textarea
                        value={newProblem.shortDescription}
                        onChange={(e) =>
                          setNewProblem({
                            ...newProblem,
                            shortDescription: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white"
                        rows={2}
                        placeholder="Concise overview of what participants are building..."
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Detailed Description / Context
                      </label>
                      <textarea
                        value={newProblem.fullDescription}
                        onChange={(e) =>
                          setNewProblem({
                            ...newProblem,
                            fullDescription: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white"
                        rows={2}
                        placeholder="Detailed background, specific problem scope, or technical constraints..."
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Expected Deliverables & Outcome
                      </label>
                      <textarea
                        value={newProblem.expectedDeliverables}
                        onChange={(e) =>
                          setNewProblem({
                            ...newProblem,
                            expectedDeliverables: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white"
                        rows={2}
                        placeholder="Expected deliverables, prototype requirements, APIs..."
                      />
                    </div>

                    {/* Dedicated Datasets & Link Options */}
                    <div className="sm:col-span-2 pt-3 border-t border-slate-800/90 space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <label className="text-xs font-mono text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                            <Database className="w-3.5 h-3.5 text-emerald-400" />
                            <span>
                              Datasets & Resource Links (Direct Access)
                            </span>
                          </label>
                          <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                            Add one or more dataset links. Users on the frontend
                            will be able to click directly to access or download
                            them.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setNewProblem({
                              ...newProblem,
                              datasets: [
                                ...(newProblem.datasets || []),
                                { name: "", url: "", description: "" },
                              ],
                            });
                          }}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Dataset Link</span>
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        {(newProblem.datasets || []).map((ds, dIdx) => (
                          <div
                            key={dIdx}
                            className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                                <Database className="w-3 h-3" />
                                <span>Dataset #{dIdx + 1}</span>
                              </span>
                              {(newProblem.datasets || []).length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = newProblem.datasets.filter(
                                      (_, i) => i !== dIdx,
                                    );
                                    setNewProblem({
                                      ...newProblem,
                                      datasets: updated,
                                    });
                                  }}
                                  className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1 cursor-pointer"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  <span>Remove</span>
                                </button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-0.5">
                                  Dataset Name / Title
                                </label>
                                <input
                                  value={ds.name}
                                  onChange={(e) => {
                                    const updated = [...newProblem.datasets];
                                    updated[dIdx] = {
                                      ...updated[dIdx],
                                      name: e.target.value,
                                    };
                                    setNewProblem({
                                      ...newProblem,
                                      datasets: updated,
                                    });
                                  }}
                                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                                  placeholder="e.g. Kaggle Weather History or OpenStreetMap"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-0.5">
                                  Dataset URL (Direct Link)
                                </label>
                                <input
                                  value={ds.url}
                                  onChange={(e) => {
                                    const updated = [...newProblem.datasets];
                                    updated[dIdx] = {
                                      ...updated[dIdx],
                                      url: e.target.value,
                                    };
                                    setNewProblem({
                                      ...newProblem,
                                      datasets: updated,
                                    });
                                  }}
                                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                                  placeholder="https://www.kaggle.com/datasets/..."
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono text-slate-400 uppercase mb-0.5">
                                Description / Data Format (Optional)
                              </label>
                              <input
                                value={ds.description || ""}
                                onChange={(e) => {
                                  const updated = [...newProblem.datasets];
                                  updated[dIdx] = {
                                    ...updated[dIdx],
                                    description: e.target.value,
                                  };
                                  setNewProblem({
                                    ...newProblem,
                                    datasets: updated,
                                  });
                                }}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300"
                                placeholder="e.g. CSV format, 54,000 crop images, hourly temperature"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={async () => {
                        if (!newProblem.title) return;
                        const id = `prob-${Date.now()}`;
                        const validDatasets = (
                          newProblem.datasets || []
                        ).filter((d) => d.url && d.url.trim() !== "");
                        const primaryDataset = validDatasets[0];
                        await cms.addProblem({
                          ...newProblem,
                          id,
                          datasets: validDatasets,
                          datasetUrl: primaryDataset ? primaryDataset.url : "",
                          datasetName: primaryDataset
                            ? primaryDataset.name
                            : "",
                          tags: newProblem.tags
                            .split(",")
                            .map((t) => t.trim())
                            .filter(Boolean),
                        });
                        setShowAddProblemModal(false);
                        triggerSuccess(
                          "Problem statement created with datasets!",
                        );
                      }}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs cursor-pointer shadow-md"
                    >
                      Save & Publish Problem
                    </button>
                    <button
                      onClick={() => setShowAddProblemModal(false)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Edit Problem Modal */}
              {showEditProblemModal && editingProblem && (
                <div className="p-6 rounded-3xl bg-slate-950 border border-sky-500/40 space-y-4 animate-fade-in">
                  <h3 className="font-heading font-bold text-base text-white">
                    Edit Problem Statement: {editingProblem.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Problem Title
                      </label>
                      <input
                        value={editingProblem.title || ""}
                        onChange={(e) =>
                          setEditingProblem({
                            ...editingProblem,
                            title: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Domain
                      </label>
                      <select
                        value={editingProblem.domainId || ""}
                        onChange={(e) => {
                          const dId = e.target.value;
                          const dom = cms.domains?.find(
                            (d: any) => d.id === dId,
                          );
                          setEditingProblem({
                            ...editingProblem,
                            domainId: dId,
                            domain: dom ? dom.name : editingProblem.domain,
                          });
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                      >
                        {(cms.domains || []).map((d: any) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Tags (comma separated)
                      </label>
                      <input
                        value={
                          Array.isArray(editingProblem.tags)
                            ? editingProblem.tags.join(", ")
                            : editingProblem.tags || ""
                        }
                        onChange={(e) =>
                          setEditingProblem({
                            ...editingProblem,
                            tags: e.target.value
                              .split(",")
                              .map((t: string) => t.trim()),
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Short Summary
                      </label>
                      <textarea
                        value={editingProblem.shortDescription || ""}
                        onChange={(e) =>
                          setEditingProblem({
                            ...editingProblem,
                            shortDescription: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white"
                        rows={2}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Detailed Description / Context
                      </label>
                      <textarea
                        value={
                          editingProblem.fullDescription ||
                          editingProblem.problemDescription ||
                          ""
                        }
                        onChange={(e) =>
                          setEditingProblem({
                            ...editingProblem,
                            fullDescription: e.target.value,
                            problemDescription: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white"
                        rows={2}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Expected Deliverables & Outcome
                      </label>
                      <textarea
                        value={
                          editingProblem.expectedDeliverables ||
                          editingProblem.expectedOutcome ||
                          ""
                        }
                        onChange={(e) =>
                          setEditingProblem({
                            ...editingProblem,
                            expectedDeliverables: e.target.value,
                            expectedOutcome: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white"
                        rows={2}
                      />
                    </div>

                    {/* Dedicated Datasets & Link Options for Edit */}
                    <div className="sm:col-span-2 pt-3 border-t border-slate-800/90 space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <label className="text-xs font-mono text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                            <Database className="w-3.5 h-3.5 text-emerald-400" />
                            <span>
                              Datasets & Resource Links (Direct Access)
                            </span>
                          </label>
                          <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                            Configure dataset links for this problem statement.
                            Users will see direct access buttons in frontend.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProblem({
                              ...editingProblem,
                              datasets: [
                                ...(editingProblem.datasets || []),
                                { name: "", url: "", description: "" },
                              ],
                            });
                          }}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Dataset Link</span>
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        {(editingProblem.datasets || []).map(
                          (ds: any, dIdx: number) => (
                            <div
                              key={dIdx}
                              className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                                  <Database className="w-3 h-3" />
                                  <span>Dataset #{dIdx + 1}</span>
                                </span>
                                {(editingProblem.datasets || []).length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated =
                                        editingProblem.datasets.filter(
                                          (_: any, i: number) => i !== dIdx,
                                        );
                                      setEditingProblem({
                                        ...editingProblem,
                                        datasets: updated,
                                      });
                                    }}
                                    className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1 cursor-pointer"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                    <span>Remove</span>
                                  </button>
                                )}
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-0.5">
                                    Dataset Name / Title
                                  </label>
                                  <input
                                    value={ds.name || ""}
                                    onChange={(e) => {
                                      const updated = [
                                        ...editingProblem.datasets,
                                      ];
                                      updated[dIdx] = {
                                        ...updated[dIdx],
                                        name: e.target.value,
                                      };
                                      setEditingProblem({
                                        ...editingProblem,
                                        datasets: updated,
                                      });
                                    }}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                                    placeholder="e.g. Kaggle Weather History or OpenStreetMap"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-0.5">
                                    Dataset URL (Direct Link)
                                  </label>
                                  <input
                                    value={ds.url || ""}
                                    onChange={(e) => {
                                      const updated = [
                                        ...editingProblem.datasets,
                                      ];
                                      updated[dIdx] = {
                                        ...updated[dIdx],
                                        url: e.target.value,
                                      };
                                      setEditingProblem({
                                        ...editingProblem,
                                        datasets: updated,
                                      });
                                    }}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                                    placeholder="https://www.kaggle.com/datasets/..."
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-0.5">
                                  Description / Data Format (Optional)
                                </label>
                                <input
                                  value={ds.description || ""}
                                  onChange={(e) => {
                                    const updated = [
                                      ...editingProblem.datasets,
                                    ];
                                    updated[dIdx] = {
                                      ...updated[dIdx],
                                      description: e.target.value,
                                    };
                                    setEditingProblem({
                                      ...editingProblem,
                                      datasets: updated,
                                    });
                                  }}
                                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300"
                                  placeholder="e.g. CSV format, 54,000 crop images, hourly temperature"
                                />
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={async () => {
                        const validDatasets = (
                          editingProblem.datasets || []
                        ).filter((d: any) => d.url && d.url.trim() !== "");
                        const primaryDataset = validDatasets[0];
                        await cms.updateProblem(editingProblem.id, {
                          ...editingProblem,
                          datasets: validDatasets,
                          datasetUrl: primaryDataset ? primaryDataset.url : "",
                          datasetName: primaryDataset
                            ? primaryDataset.name
                            : "",
                        });
                        setShowEditProblemModal(false);
                        setEditingProblem(null);
                        triggerSuccess(
                          "Problem statement updated with datasets!",
                        );
                      }}
                      className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs cursor-pointer shadow-md"
                    >
                      Update Problem Statement
                    </button>
                    <button
                      onClick={() => {
                        setShowEditProblemModal(false);
                        setEditingProblem(null);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Problems List or Clean Empty State */}
              {(cms.problems || []).length > 0 ? (
                <div className="space-y-3">
                  {(cms.problems || []).map((prob: any) => {
                    const probDatasets =
                      Array.isArray(prob.datasets) && prob.datasets.length > 0
                        ? prob.datasets
                        : prob.datasetUrl
                          ? [
                              {
                                name: prob.datasetName || "Official Dataset",
                                url: prob.datasetUrl,
                              },
                            ]
                          : [];

                    return (
                      <div
                        key={prob.id}
                        className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                              {prob.domain || prob.domainName || "Domain"}
                            </span>
                            <span
                              className={`font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                                prob.isPublished !== false
                                  ? "bg-emerald-500/10 text-emerald-400"
                                  : "bg-slate-800 text-slate-400"
                              }`}
                            >
                              {prob.isPublished !== false ? "Live" : "Draft"}
                            </span>
                            {probDatasets.length > 0 && (
                              <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                <Database className="w-3 h-3 text-emerald-400" />
                                <span>
                                  {probDatasets.length} Dataset
                                  {probDatasets.length > 1 ? "s" : ""}
                                </span>
                              </span>
                            )}
                          </div>
                          <h4 className="font-heading font-black text-base text-white">
                            {prob.title}
                          </h4>
                          <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
                            {prob.shortDescription}
                          </p>

                          {/* Direct Dataset Links in Admin List for testing */}
                          {probDatasets.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1.5">
                              {probDatasets.map((d: any, dIdx: number) => (
                                <a
                                  key={dIdx}
                                  href={d.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-colors"
                                  title={`Open ${d.name || d.url} in new tab`}
                                >
                                  <Database className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                                  <span className="truncate max-w-[200px]">
                                    {d.name || d.url}
                                  </span>
                                  <ExternalLink className="w-3 h-3 opacity-70" />
                                </a>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const initialDatasets =
                                Array.isArray(prob.datasets) &&
                                prob.datasets.length > 0
                                  ? prob.datasets.map((d: any) => ({
                                      name: d.name || "",
                                      url:
                                        d.url ||
                                        (typeof d === "string" ? d : ""),
                                      description: d.description || "",
                                    }))
                                  : prob.datasetUrl
                                    ? [
                                        {
                                          name:
                                            prob.datasetName ||
                                            "Official Dataset",
                                          url: prob.datasetUrl,
                                          description: "",
                                        },
                                      ]
                                    : [{ name: "", url: "", description: "" }];

                              setEditingProblem({
                                ...prob,
                                datasets: initialDatasets,
                              });
                              setShowEditProblemModal(true);
                            }}
                            className="p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-sky-300 hover:border-sky-500/30 transition-colors cursor-pointer"
                            title="Edit problem statement & datasets"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={async () => {
                              const updated = !prob.isPublished;
                              await cms.updateProblem(prob.id, {
                                isPublished: updated,
                                status: updated ? "PUBLISHED" : "DRAFT",
                              });
                              triggerSuccess(
                                `Problem "${prob.title}" ${updated ? "published" : "set to draft"}!`,
                              );
                            }}
                            className={`p-2 rounded-xl border text-xs transition-colors ${
                              prob.isPublished !== false
                                ? "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                                : "border-slate-800 text-slate-500 hover:bg-slate-800"
                            }`}
                            title="Toggle publish status"
                          >
                            {prob.isPublished !== false ? (
                              <Eye className="w-4 h-4" />
                            ) : (
                              <EyeOff className="w-4 h-4" />
                            )}
                          </button>

                          <button
                            onClick={async () => {
                              if (
                                confirm(
                                  `Delete problem statement "${prob.title}"?`,
                                )
                              ) {
                                await cms.deleteProblem(prob.id);
                                triggerSuccess("Problem statement deleted!");
                              }
                            }}
                            className="p-2 rounded-xl border border-slate-800 text-slate-500 hover:text-rose-400 hover:border-rose-500/30 transition-colors"
                            title="Delete problem"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-4">
                  <FolderGit2 className="w-12 h-12 text-slate-600 mx-auto" />
                  <h3 className="font-heading font-bold text-lg text-white">
                    No Problem Statements Currently in Database
                  </h3>
                  <p className="text-xs text-slate-400 font-mono max-w-md mx-auto">
                    You currently have 0 problem statements configured. The
                    public website is accurately reflecting 0 problems.
                  </p>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => setShowAddProblemModal(true)}
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create Problem Statement</span>
                    </button>
                    <button
                      onClick={async () => {
                        if (
                          confirm(
                            "Restore all 25 official Buildathon 2.0 problem statements into database?",
                          )
                        ) {
                          await cms.resetProblemsToDefault();
                          triggerSuccess(
                            "Official 25 problem statements restored successfully!",
                          );
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 border border-sky-500/30 font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Restore 25 Official Statements</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: TIMELINE & 24H FLOW */}
          {/* TAB 6: TIMELINE & 24H FLOW */}
          {activeTab === "timeline" && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading font-black text-2xl text-white">
                    Event Flow & 24-Hour Timeline
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Manage the sequence of milestones across Day 1 and Day 2.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const nextStep = String(
                      (cms.timeline || []).length + 1,
                    ).padStart(2, "0");
                    setNewTimelineItem({
                      step: nextStep,
                      dayNumber: 1,
                      dayLabel: "DAY 1",
                      date: "30 OCTOBER 2026",
                      title: "",
                      description: "",
                    });
                    setShowAddTimelineModal(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-heading font-bold text-xs uppercase flex items-center gap-1.5 shadow-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Milestone</span>
                </button>
              </div>

              {/* Add Milestone Modal */}
              {showAddTimelineModal && (
                <div className="p-6 rounded-2xl bg-slate-950 border border-indigo-500/40 space-y-4 animate-fade-in shadow-xl">
                  <h3 className="font-heading font-bold text-base text-white">
                    Add Event Milestone
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Step Number
                      </label>
                      <input
                        value={newTimelineItem.step}
                        onChange={(e) =>
                          setNewTimelineItem({
                            ...newTimelineItem,
                            step: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white font-mono"
                        placeholder="01"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Day Schedule
                      </label>
                      <select
                        value={newTimelineItem.dayNumber}
                        onChange={(e) => {
                          const dayNum = Number(e.target.value);
                          setNewTimelineItem({
                            ...newTimelineItem,
                            dayNumber: dayNum,
                            dayLabel: dayNum === 2 ? "DAY 2" : "DAY 1",
                            date:
                              dayNum === 2
                                ? "31 OCTOBER 2026"
                                : "30 OCTOBER 2026",
                          });
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                      >
                        <option value={1}>Day 1 (30 Oct 2026)</option>
                        <option value={2}>Day 2 (31 Oct 2026)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Milestone Title
                      </label>
                      <input
                        value={newTimelineItem.title}
                        onChange={(e) =>
                          setNewTimelineItem({
                            ...newTimelineItem,
                            title: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                        placeholder="e.g. Reporting & Registration"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Milestone Description
                    </label>
                    <textarea
                      value={newTimelineItem.description}
                      onChange={(e) =>
                        setNewTimelineItem({
                          ...newTimelineItem,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white"
                      placeholder="Detailed schedule activity or instructions for teams..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={async () => {
                        if (!newTimelineItem.title.trim()) return;
                        const itemToAdd = {
                          id: `tl-${Date.now()}`,
                          step: newTimelineItem.step || "01",
                          dayNumber: Number(newTimelineItem.dayNumber) || 1,
                          dayLabel:
                            Number(newTimelineItem.dayNumber) === 2
                              ? "DAY 2"
                              : "DAY 1",
                          date:
                            Number(newTimelineItem.dayNumber) === 2
                              ? "31 OCTOBER 2026"
                              : "30 OCTOBER 2026",
                          title: newTimelineItem.title.trim(),
                          description: newTimelineItem.description.trim(),
                          displayOrder: (cms.timeline || []).length + 1,
                          status: "PUBLISHED",
                        };
                        await cms.updateTimeline([
                          ...(cms.timeline || []),
                          itemToAdd,
                        ]);
                        setShowAddTimelineModal(false);
                        triggerSuccess("Event milestone added successfully!");
                      }}
                      className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                    >
                      Save Milestone
                    </button>
                    <button
                      onClick={() => setShowAddTimelineModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Edit Milestone Modal */}
              {showEditTimelineModal && editingTimelineItem && (
                <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4 animate-fade-in shadow-xl">
                  <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-amber-400" />
                    <span>Update / Modify Event Milestone</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Step Number
                      </label>
                      <input
                        value={editingTimelineItem.step || ""}
                        onChange={(e) =>
                          setEditingTimelineItem({
                            ...editingTimelineItem,
                            step: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Day Schedule
                      </label>
                      <select
                        value={editingTimelineItem.dayNumber || 1}
                        onChange={(e) => {
                          const dayNum = Number(e.target.value);
                          setEditingTimelineItem({
                            ...editingTimelineItem,
                            dayNumber: dayNum,
                            dayLabel: dayNum === 2 ? "DAY 2" : "DAY 1",
                            date:
                              dayNum === 2
                                ? "31 OCTOBER 2026"
                                : "30 OCTOBER 2026",
                          });
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                      >
                        <option value={1}>Day 1 (30 Oct 2026)</option>
                        <option value={2}>Day 2 (31 Oct 2026)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Milestone Title
                      </label>
                      <input
                        value={editingTimelineItem.title || ""}
                        onChange={(e) =>
                          setEditingTimelineItem({
                            ...editingTimelineItem,
                            title: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Milestone Description
                    </label>
                    <textarea
                      value={editingTimelineItem.description || ""}
                      onChange={(e) =>
                        setEditingTimelineItem({
                          ...editingTimelineItem,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={async () => {
                        if (!editingTimelineItem.title.trim()) return;
                        const updated = (cms.timeline || []).map((tl: any) =>
                          tl.id === editingTimelineItem.id
                            ? {
                                ...tl,
                                step: editingTimelineItem.step,
                                dayNumber:
                                  Number(editingTimelineItem.dayNumber) || 1,
                                dayLabel:
                                  Number(editingTimelineItem.dayNumber) === 2
                                    ? "DAY 2"
                                    : "DAY 1",
                                date:
                                  Number(editingTimelineItem.dayNumber) === 2
                                    ? "31 OCTOBER 2026"
                                    : "30 OCTOBER 2026",
                                title: editingTimelineItem.title.trim(),
                                description:
                                  editingTimelineItem.description.trim(),
                              }
                            : tl,
                        );
                        await cms.updateTimeline(updated);
                        setShowEditTimelineModal(false);
                        setEditingTimelineItem(null);
                        triggerSuccess("Milestone updated successfully!");
                      }}
                      className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs"
                    >
                      Update Milestone
                    </button>
                    <button
                      onClick={() => {
                        setShowEditTimelineModal(false);
                        setEditingTimelineItem(null);
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Milestones List */}
              <div className="space-y-3">
                {(cms.timeline || []).map((tl: any, idx: number) => (
                  <div
                    key={tl.id || idx}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4 transition-colors hover:border-slate-700"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-mono font-bold text-xs text-sky-400 flex-shrink-0">
                        {tl.step || idx + 1}
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 uppercase">
                            {tl.dayLabel || `Day ${tl.dayNumber}`}
                          </span>
                          {tl.date && (
                            <span className="font-mono text-[10px] text-slate-500 hidden sm:inline">
                              {tl.date}
                            </span>
                          )}
                        </div>
                        <h4 className="font-heading font-bold text-sm text-white">
                          {tl.title}
                        </h4>
                        <p className="text-xs text-slate-400">
                          {tl.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => {
                          setEditingTimelineItem({ ...tl });
                          setShowEditTimelineModal(true);
                        }}
                        className="p-2 rounded-lg bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 transition-colors"
                        title="Edit / Modify Milestone"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`Delete milestone "${tl.title}"?`)) {
                            const updated = (cms.timeline || []).filter(
                              (item: any) => item.id !== tl.id,
                            );
                            await cms.updateTimeline(updated);
                            triggerSuccess("Milestone deleted!");
                          }
                        }}
                        className="p-2 rounded-lg bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 transition-colors"
                        title="Delete Milestone"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: RULES & REGULATIONS */}
          {activeTab === "rules" && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading font-black text-2xl text-white">
                    Rules & Regulations Management
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Official rulebook clauses displayed on the public site
                    accordion.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setNewRule({
                      category: "Participation",
                      ruleText: "",
                    });
                    setShowAddRuleModal(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-heading font-bold text-xs uppercase flex items-center gap-1.5 shadow-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Rule</span>
                </button>
              </div>

              {/* Add Rule Modal */}
              {showAddRuleModal && (
                <div className="p-6 rounded-2xl bg-slate-950 border border-indigo-500/40 space-y-4 animate-fade-in shadow-xl">
                  <h3 className="font-heading font-bold text-base text-white">
                    Create New Rule Clause
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Rule Category
                      </label>
                      <select
                        value={newRule.category}
                        onChange={(e) =>
                          setNewRule({ ...newRule, category: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white mb-2"
                      >
                        <option value="Participation">Participation</option>
                        <option value="Venue & Hackathon Protocol">
                          Venue & Hackathon Protocol
                        </option>
                        <option value="Disqualification Clauses">
                          Disqualification Clauses
                        </option>
                        <option value="Project Submission & Evaluation">
                          Project Submission & Evaluation
                        </option>
                        <option value="General Conduct">General Conduct</option>
                      </select>
                      <input
                        value={newRule.category}
                        onChange={(e) =>
                          setNewRule({ ...newRule, category: e.target.value })
                        }
                        placeholder="Or type custom category name..."
                        className="w-full bg-slate-900/60 border border-slate-800/80 rounded-xl px-3 py-1.5 text-xs text-slate-300 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Rule Clause Description
                      </label>
                      <textarea
                        value={newRule.ruleText}
                        onChange={(e) =>
                          setNewRule({ ...newRule, ruleText: e.target.value })
                        }
                        rows={3}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white"
                        placeholder="Enter official rule clause..."
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={async () => {
                        if (!newRule.ruleText.trim()) return;
                        const ruleToAdd = {
                          id: `rule-${Date.now()}`,
                          category: newRule.category || "General Rules",
                          ruleText: newRule.ruleText.trim(),
                          displayOrder: (cms.rules || []).length + 1,
                          status: "PUBLISHED",
                        };
                        await cms.updateRules([
                          ...(cms.rules || []),
                          ruleToAdd,
                        ]);
                        setShowAddRuleModal(false);
                        setNewRule({ category: "Participation", ruleText: "" });
                        triggerSuccess("Rule added successfully!");
                      }}
                      className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                    >
                      Save Rule
                    </button>
                    <button
                      onClick={() => setShowAddRuleModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Edit Rule Modal */}
              {showEditRuleModal && editingRule && (
                <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4 animate-fade-in shadow-xl">
                  <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-amber-400" />
                    <span>Update / Modify Rule Clause</span>
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Rule Category
                      </label>
                      <input
                        value={editingRule.category || ""}
                        onChange={(e) =>
                          setEditingRule({
                            ...editingRule,
                            category: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Rule Clause Description
                      </label>
                      <textarea
                        value={editingRule.ruleText || ""}
                        onChange={(e) =>
                          setEditingRule({
                            ...editingRule,
                            ruleText: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={async () => {
                        if (!editingRule.ruleText.trim()) return;
                        const updated = (cms.rules || []).map((r: any) =>
                          r.id === editingRule.id
                            ? {
                                ...r,
                                category: editingRule.category.trim(),
                                ruleText: editingRule.ruleText.trim(),
                              }
                            : r,
                        );
                        await cms.updateRules(updated);
                        setShowEditRuleModal(false);
                        setEditingRule(null);
                        triggerSuccess("Rule updated successfully!");
                      }}
                      className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs"
                    >
                      Update Rule
                    </button>
                    <button
                      onClick={() => {
                        setShowEditRuleModal(false);
                        setEditingRule(null);
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Rules List */}
              <div className="space-y-3">
                {(cms.rules || []).map((rule: any, idx: number) => (
                  <div
                    key={rule.id || idx}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4 transition-colors hover:border-slate-700"
                  >
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400">
                        {rule.category}
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {rule.ruleText}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => {
                          setEditingRule({ ...rule });
                          setShowEditRuleModal(true);
                        }}
                        className="p-2 rounded-lg bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 transition-colors"
                        title="Edit / Modify Rule"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`Remove this rule?`)) {
                            const updated = (cms.rules || []).filter(
                              (r: any) => r.id !== rule.id,
                            );
                            await cms.updateRules(updated);
                            triggerSuccess("Rule removed!");
                          }
                        }}
                        className="p-2 rounded-lg bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 transition-colors"
                        title="Delete Rule"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: COORDINATORS */}
          {activeTab === "coordinators" && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-heading font-black text-2xl text-white flex items-center gap-2.5">
                    <Users className="w-6 h-6 text-sky-400" />
                    <span>Organizing Committee Management</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Upload coordinator photos directly from your device, update
                    roles in this event, phone contacts, and LinkedIn profile
                    links for student and faculty coordinators.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddCoordModal(true)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-heading font-bold text-xs uppercase flex items-center gap-1.5 shadow-md transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Coordinator</span>
                  </button>
                  <button
                    onClick={async () => {
                      if (
                        confirm(
                          "Reset organizing committee list to official defaults?",
                        )
                      ) {
                        await cms.resetCoordinatorsToDefault();
                        triggerSuccess(
                          "Reset committee coordinators to defaults!",
                        );
                      }
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
                    title="Reset to default coordinators"
                  >
                    Reset Defaults
                  </button>
                </div>
              </div>

              {/* Add Coordinator Modal */}
              {showAddCoordModal && (
                <div className="p-6 rounded-2xl bg-slate-950 border border-indigo-500/40 space-y-4 animate-fade-in shadow-xl">
                  <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                    <Plus className="w-4 h-4 text-indigo-400" />
                    <span>Add New Coordinator</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Full Name
                      </label>
                      <input
                        value={newCoordinator.name}
                        onChange={(e) =>
                          setNewCoordinator({
                            ...newCoordinator,
                            name: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                        placeholder="e.g. Rahul Sharma"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Phone Number
                      </label>
                      <input
                        value={newCoordinator.phone}
                        onChange={(e) =>
                          setNewCoordinator({
                            ...newCoordinator,
                            phone: e.target.value,
                            formattedPhone: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                        placeholder="e.g. 9876543210"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Category
                      </label>
                      <select
                        value={newCoordinator.category}
                        onChange={(e) =>
                          setNewCoordinator({
                            ...newCoordinator,
                            category: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                      >
                        <option value="STUDENT">Student Coordinator</option>
                        <option value="FACULTY">Faculty Convener</option>
                        <option value="MANAGEMENT">Management Member</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Role in this Event
                      </label>
                      <input
                        value={newCoordinator.role}
                        onChange={(e) =>
                          setNewCoordinator({
                            ...newCoordinator,
                            role: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                        placeholder="e.g. Student Lead CSE / Faculty Convener"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        LinkedIn Profile URL
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-sky-400">
                          <LinkedinIcon className="w-3.5 h-3.5" />
                        </div>
                        <input
                          value={newCoordinator.linkedin || ""}
                          onChange={(e) =>
                            setNewCoordinator({
                              ...newCoordinator,
                              linkedin: e.target.value,
                            })
                          }
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500"
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Photo Upload Area in Add Modal */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <label className="block text-xs font-mono text-slate-400 uppercase">
                      Coordinator Picture (Upload from Device)
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-[#0c1e3d] border border-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {newCoordinator.imageUrl ? (
                          <img
                            src={newCoordinator.imageUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : newCoordinator.category === "FACULTY" ? (
                          <Shield className="w-8 h-8 text-indigo-400/70" />
                        ) : (
                          <User className="w-8 h-8 text-sky-400/70" />
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <input
                          type="file"
                          id="add-coord-file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleNewCoordinatorPhotoUpload}
                        />
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              document.getElementById("add-coord-file")?.click()
                            }
                            className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/40 text-xs font-mono flex items-center gap-1.5 transition-colors"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Choose Local Photo...</span>
                          </button>
                          {newCoordinator.imageUrl && (
                            <button
                              type="button"
                              onClick={() =>
                                setNewCoordinator((prev) => ({
                                  ...prev,
                                  imageUrl: "",
                                }))
                              }
                              className="px-2.5 py-1.5 rounded-lg bg-rose-500/20 text-rose-400 text-xs font-mono hover:bg-rose-500/30"
                            >
                              Remove Photo
                            </button>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 font-mono">
                          Supports PNG, JPG, WEBP up to 5MB. If omitted,
                          official coordinator placeholder will display.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={async () => {
                        if (!newCoordinator.name.trim()) return;
                        await cms.addCoordinator(newCoordinator);
                        setNewCoordinator({
                          name: "",
                          phone: "",
                          formattedPhone: "",
                          role: "Student Coordinator",
                          category: "STUDENT",
                          imageUrl: "",
                          linkedin: "",
                        });
                        setShowAddCoordModal(false);
                        triggerSuccess("Coordinator added successfully!");
                      }}
                      className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                    >
                      Save Coordinator
                    </button>
                    <button
                      onClick={() => setShowAddCoordModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Edit Coordinator Modal */}
              {showEditCoordModal && editingCoordinator && (
                <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4 animate-fade-in shadow-xl">
                  <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-amber-400" />
                    <span>Update / Modify Coordinator</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Full Name
                      </label>
                      <input
                        value={editingCoordinator.name || ""}
                        onChange={(e) =>
                          setEditingCoordinator({
                            ...editingCoordinator,
                            name: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Phone Number
                      </label>
                      <input
                        value={editingCoordinator.phone || ""}
                        onChange={(e) =>
                          setEditingCoordinator({
                            ...editingCoordinator,
                            phone: e.target.value,
                            formattedPhone: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Category
                      </label>
                      <select
                        value={editingCoordinator.category || "STUDENT"}
                        onChange={(e) =>
                          setEditingCoordinator({
                            ...editingCoordinator,
                            category: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                      >
                        <option value="STUDENT">Student Coordinator</option>
                        <option value="FACULTY">Faculty Convener</option>
                        <option value="MANAGEMENT">Management Member</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Role in this Event
                      </label>
                      <input
                        value={editingCoordinator.role || ""}
                        onChange={(e) =>
                          setEditingCoordinator({
                            ...editingCoordinator,
                            role: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        LinkedIn Profile URL
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-sky-400">
                          <LinkedinIcon className="w-3.5 h-3.5" />
                        </div>
                        <input
                          value={editingCoordinator.linkedin || ""}
                          onChange={(e) =>
                            setEditingCoordinator({
                              ...editingCoordinator,
                              linkedin: e.target.value,
                            })
                          }
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500"
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Photo Edit Area */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <label className="block text-xs font-mono text-slate-400 uppercase">
                      Picture Management
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-[#0c1e3d] border border-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {editingCoordinator.imageUrl ||
                        editingCoordinator.photo ||
                        editingCoordinator.image ? (
                          <img
                            src={
                              editingCoordinator.imageUrl ||
                              editingCoordinator.photo ||
                              editingCoordinator.image
                            }
                            alt="Coordinator"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-slate-400">
                            {editingCoordinator.category === "FACULTY" ? (
                              <Shield className="w-7 h-7 text-indigo-400/80" />
                            ) : (
                              <User className="w-7 h-7 text-sky-400/80" />
                            )}
                            <span className="text-[7px] font-mono">
                              PLACEHOLDER
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <input
                          type="file"
                          id="edit-coord-file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleEditCoordinatorPhotoUpload}
                        />
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              document
                                .getElementById("edit-coord-file")
                                ?.click()
                            }
                            className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/40 text-xs font-mono flex items-center gap-1.5 transition-colors"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>
                              {editingCoordinator.imageUrl ||
                              editingCoordinator.photo ||
                              editingCoordinator.image
                                ? "Change Photo File..."
                                : "Upload Photo File..."}
                            </span>
                          </button>
                          {(editingCoordinator.imageUrl ||
                            editingCoordinator.photo ||
                            editingCoordinator.image) && (
                            <button
                              type="button"
                              onClick={() => {
                                const copy = { ...editingCoordinator };
                                delete copy.imageUrl;
                                delete copy.photo;
                                delete copy.image;
                                setEditingCoordinator(copy);
                                triggerSuccess(
                                  "Photo removed. Default placeholder will show.",
                                );
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-mono hover:bg-rose-500/30 flex items-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Delete Photo</span>
                            </button>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 font-mono">
                          Deleting photo restores the default official
                          placeholder on the website.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={async () => {
                        if (!editingCoordinator.name?.trim()) return;
                        await cms.updateCoordinator(
                          editingCoordinator.id,
                          editingCoordinator,
                        );
                        setShowEditCoordModal(false);
                        setEditingCoordinator(null);
                        triggerSuccess("Coordinator updated successfully!");
                      }}
                      className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs"
                    >
                      Update Coordinator
                    </button>
                    <button
                      onClick={() => {
                        setShowEditCoordModal(false);
                        setEditingCoordinator(null);
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Coordinators Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {(cms.coordinators || []).map((coord: any) => {
                  const hasPhoto = Boolean(
                    coord.imageUrl || coord.photo || coord.image,
                  );
                  const photoSrc = coord.imageUrl || coord.photo || coord.image;

                  return (
                    <div
                      key={coord.id || coord.name}
                      className="p-5 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors shadow-lg"
                    >
                      <div>
                        {/* Header: Category Badge + Actions */}
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full ${
                              coord.category === "STUDENT"
                                ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                                : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                            }`}
                          >
                            {coord.category}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setEditingCoordinator({ ...coord });
                                setShowEditCoordModal(true);
                              }}
                              className="p-1 text-slate-500 hover:text-amber-400 transition-colors"
                              title="Edit / Modify Coordinator"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={async () => {
                                if (confirm(`Remove ${coord.name}?`)) {
                                  await cms.deleteCoordinator(
                                    coord.id || coord.name,
                                  );
                                  triggerSuccess("Coordinator removed!");
                                }
                              }}
                              className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                              title="Delete Coordinator"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Photo Display with Preview */}
                        <div className="flex flex-col items-center text-center">
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0b1d3a] to-[#1e3a8a] p-1 shadow-md mb-3">
                            {hasPhoto ? (
                              <img
                                src={photoSrc}
                                alt={coord.name}
                                className="w-full h-full rounded-[14px] object-cover"
                              />
                            ) : (
                              <div className="w-full h-full rounded-[14px] bg-[#0c1e3d] flex flex-col items-center justify-center text-slate-300 relative overflow-hidden">
                                {coord.category === "FACULTY" ? (
                                  <Shield className="w-8 h-8 text-indigo-400/80 mb-0.5" />
                                ) : (
                                  <User className="w-8 h-8 text-sky-400/80 mb-0.5" />
                                )}
                                <span className="text-[7px] font-mono tracking-wider text-slate-400 uppercase">
                                  OFFICIAL PHOTO
                                </span>
                              </div>
                            )}
                          </div>

                          <h4 className="font-heading font-black text-sm text-white mb-0.5 leading-snug">
                            {coord.name}
                          </h4>
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-sky-300 font-medium mb-1">
                            {coord.role}
                          </span>
                        </div>

                        {/* Phone & LinkedIn Badges */}
                        <div className="mt-3 pt-2 border-t border-slate-800/80 space-y-1.5">
                          {coord.phone && (
                            <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                              <Phone className="w-3 h-3 text-sky-400 flex-shrink-0" />
                              <span>{coord.formattedPhone || coord.phone}</span>
                            </div>
                          )}
                          {coord.linkedin ? (
                            <a
                              href={
                                coord.linkedin.startsWith("http")
                                  ? coord.linkedin
                                  : `https://linkedin.com/in/${coord.linkedin.replace(/^@/, "")}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1.5 truncate group"
                            >
                              <LinkedinIcon className="w-3 h-3 text-sky-400 flex-shrink-0" />
                              <span className="truncate group-hover:underline">
                                {coord.linkedin
                                  .replace(
                                    /^https?:\/\/(www\.)?linkedin\.com\/in\//,
                                    "",
                                  )
                                  .replace(/\/$/, "") || "LinkedIn"}
                              </span>
                              <ExternalLink className="w-2.5 h-2.5 opacity-60 flex-shrink-0" />
                            </a>
                          ) : (
                            <div className="text-[11px] font-mono text-slate-600 flex items-center gap-1.5">
                              <LinkedinIcon className="w-3 h-3 text-slate-600 flex-shrink-0" />
                              <span>No LinkedIn added</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Photo Upload & Delete Actions */}
                      <div className="pt-3 border-t border-slate-800/80 space-y-2">
                        <input
                          type="file"
                          id={`coord-file-${coord.id}`}
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleCoordinatorPhotoUpload(coord.id, e)
                          }
                        />
                        <button
                          type="button"
                          onClick={() =>
                            document
                              .getElementById(`coord-file-${coord.id}`)
                              ?.click()
                          }
                          className="w-full py-1.5 px-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>
                            {hasPhoto ? "Change Picture" : "Upload Picture"}
                          </span>
                        </button>

                        {hasPhoto && (
                          <button
                            type="button"
                            onClick={async () => {
                              if (
                                confirm(
                                  `Delete picture for ${coord.name}? It will restore the official photo placeholder.`,
                                )
                              ) {
                                await cms.deleteCoordinatorPhoto(coord.id);
                                triggerSuccess(
                                  "Picture deleted! Official photo placeholder restored.",
                                );
                              }
                            }}
                            className="w-full py-1.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete Picture</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: CHIEF PATRONS & PATRONS */}
          {activeTab === "patrons" && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-heading font-black text-2xl text-white flex items-center gap-2.5">
                    <Award className="w-6 h-6 text-sky-400" />
                    <span>Chief Patrons & Institutional Leadership</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Upload official photos directly from your device, update
                    titles, or manage leaders. If a photo is removed or deleted,
                    it smoothly restores the official photo placeholder.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddPatronModal(true)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-heading font-bold text-xs uppercase flex items-center gap-1.5 shadow-md transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Patron</span>
                  </button>
                  <button
                    onClick={async () => {
                      if (
                        confirm(
                          "Reset leadership list to official institution defaults?",
                        )
                      ) {
                        await cms.resetPatronsToDefault();
                        triggerSuccess(
                          "Reset leadership to institution defaults!",
                        );
                      }
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
                    title="Reset to default patrons"
                  >
                    Reset Defaults
                  </button>
                </div>
              </div>

              {/* Add Patron Modal */}
              {showAddPatronModal && (
                <div className="p-6 rounded-2xl bg-slate-950 border border-indigo-500/40 space-y-4 animate-fade-in shadow-xl">
                  <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                    <Plus className="w-4 h-4 text-indigo-400" />
                    <span>Add New Patron / Leader</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Full Name
                      </label>
                      <input
                        value={newPatron.name}
                        onChange={(e) =>
                          setNewPatron({ ...newPatron, name: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                        placeholder="e.g. Sri. G S Basavaraj"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Category
                      </label>
                      <select
                        value={newPatron.category}
                        onChange={(e) =>
                          setNewPatron({
                            ...newPatron,
                            category: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                      >
                        <option value="CHIEF PATRON">Chief Patron</option>
                        <option value="PATRON">Patron</option>
                        <option value="LEADERSHIP">
                          Institutional Leadership
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Role / Institutional Title
                      </label>
                      <input
                        value={newPatron.role}
                        onChange={(e) =>
                          setNewPatron({ ...newPatron, role: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                        placeholder="e.g. Chairman, CIT Group of Institutions"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Public Designation / Honors
                      </label>
                      <input
                        value={newPatron.designation}
                        onChange={(e) =>
                          setNewPatron({
                            ...newPatron,
                            designation: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                        placeholder="e.g. Former M.P, Tumakuru Lok Sabha"
                      />
                    </div>
                  </div>

                  {/* Photo Upload Area in Add Modal */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <label className="block text-xs font-mono text-slate-400 uppercase">
                      Patron Picture (Upload from Device)
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-[#0c1e3d] border border-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {newPatron.imageUrl ? (
                          <img
                            src={newPatron.imageUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-8 h-8 text-sky-400/70" />
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <input
                          type="file"
                          id="add-patron-file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleNewPatronPhotoUpload}
                        />
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              document
                                .getElementById("add-patron-file")
                                ?.click()
                            }
                            className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/40 text-xs font-mono flex items-center gap-1.5 transition-colors"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Choose Local Photo...</span>
                          </button>
                          {newPatron.imageUrl && (
                            <button
                              type="button"
                              onClick={() =>
                                setNewPatron((prev) => ({
                                  ...prev,
                                  imageUrl: "",
                                }))
                              }
                              className="px-2.5 py-1.5 rounded-lg bg-rose-500/20 text-rose-400 text-xs font-mono hover:bg-rose-500/30"
                            >
                              Remove Photo
                            </button>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 font-mono">
                          Supports PNG, JPG, WEBP up to 5MB. If omitted,
                          official photo placeholder will display.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={async () => {
                        if (!newPatron.name.trim()) return;
                        await cms.addPatron(newPatron);
                        setNewPatron({
                          name: "",
                          role: "",
                          designation: "",
                          category: "CHIEF PATRON",
                          imageUrl: "",
                        });
                        setShowAddPatronModal(false);
                        triggerSuccess("Patron saved successfully!");
                      }}
                      className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                    >
                      Save Patron
                    </button>
                    <button
                      onClick={() => setShowAddPatronModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Edit Patron Modal */}
              {showEditPatronModal && editingPatron && (
                <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4 animate-fade-in shadow-xl">
                  <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-amber-400" />
                    <span>Update / Modify Chief Patron & Leadership</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Full Name
                      </label>
                      <input
                        value={editingPatron.name || ""}
                        onChange={(e) =>
                          setEditingPatron({
                            ...editingPatron,
                            name: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Category
                      </label>
                      <select
                        value={editingPatron.category || "PATRON"}
                        onChange={(e) =>
                          setEditingPatron({
                            ...editingPatron,
                            category: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                      >
                        <option value="CHIEF PATRON">Chief Patron</option>
                        <option value="PATRON">Patron</option>
                        <option value="LEADERSHIP">
                          Institutional Leadership
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Role / Institutional Title
                      </label>
                      <input
                        value={editingPatron.role || ""}
                        onChange={(e) =>
                          setEditingPatron({
                            ...editingPatron,
                            role: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Public Designation / Honors
                      </label>
                      <input
                        value={editingPatron.designation || ""}
                        onChange={(e) =>
                          setEditingPatron({
                            ...editingPatron,
                            designation: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                      />
                    </div>
                  </div>

                  {/* Photo Edit Area */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <label className="block text-xs font-mono text-slate-400 uppercase">
                      Picture Management
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-[#0c1e3d] border border-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {editingPatron.imageUrl ||
                        editingPatron.photo ||
                        editingPatron.image ? (
                          <img
                            src={
                              editingPatron.imageUrl ||
                              editingPatron.photo ||
                              editingPatron.image
                            }
                            alt="Patron"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-slate-400">
                            <User className="w-7 h-7 text-sky-400/80" />
                            <span className="text-[7px] font-mono">
                              PLACEHOLDER
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <input
                          type="file"
                          id="edit-patron-file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleEditPatronPhotoUpload}
                        />
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              document
                                .getElementById("edit-patron-file")
                                ?.click()
                            }
                            className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/40 text-xs font-mono flex items-center gap-1.5 transition-colors"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>
                              {editingPatron.imageUrl ||
                              editingPatron.photo ||
                              editingPatron.image
                                ? "Change Photo File..."
                                : "Upload Photo File..."}
                            </span>
                          </button>
                          {(editingPatron.imageUrl ||
                            editingPatron.photo ||
                            editingPatron.image) && (
                            <button
                              type="button"
                              onClick={() => {
                                const copy = { ...editingPatron };
                                delete copy.imageUrl;
                                delete copy.photo;
                                delete copy.image;
                                setEditingPatron(copy);
                                triggerSuccess(
                                  "Photo removed. Default placeholder will show.",
                                );
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-mono hover:bg-rose-500/30 flex items-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Delete Photo</span>
                            </button>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 font-mono">
                          Deleting photo restores the default official photo
                          placeholder on the website.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={async () => {
                        if (!editingPatron.name?.trim()) return;
                        await cms.updatePatron(editingPatron.id, editingPatron);
                        setShowEditPatronModal(false);
                        setEditingPatron(null);
                        triggerSuccess("Patron updated successfully!");
                      }}
                      className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs"
                    >
                      Update Patron
                    </button>
                    <button
                      onClick={() => {
                        setShowEditPatronModal(false);
                        setEditingPatron(null);
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Patrons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {(cms.patrons || []).map((patron: any) => {
                  const hasPhoto = Boolean(
                    patron.imageUrl || patron.photo || patron.image,
                  );
                  const photoSrc =
                    patron.imageUrl || patron.photo || patron.image;

                  return (
                    <div
                      key={patron.id || patron.name}
                      className="p-5 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors shadow-lg"
                    >
                      <div>
                        {/* Header: Category Badge + Actions */}
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full ${
                              patron.category === "CHIEF PATRON"
                                ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                                : "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                            }`}
                          >
                            {patron.category}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setEditingPatron({ ...patron });
                                setShowEditPatronModal(true);
                              }}
                              className="p-1 text-slate-500 hover:text-amber-400 transition-colors"
                              title="Edit / Modify Patron"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={async () => {
                                if (confirm(`Remove ${patron.name}?`)) {
                                  await cms.deletePatron(
                                    patron.id || patron.name,
                                  );
                                  triggerSuccess(
                                    "Patron removed from backend!",
                                  );
                                }
                              }}
                              className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                              title="Delete Patron"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Photo Display with Preview */}
                        <div className="flex flex-col items-center text-center">
                          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#0b1d3a] to-[#1e3a8a] p-1 shadow-md mb-3">
                            {hasPhoto ? (
                              <img
                                src={photoSrc}
                                alt={patron.name}
                                className="w-full h-full rounded-[14px] object-cover"
                              />
                            ) : (
                              <div className="w-full h-full rounded-[14px] bg-[#0c1e3d] flex flex-col items-center justify-center text-slate-300 relative overflow-hidden">
                                <User className="w-10 h-10 text-sky-400/80 mb-0.5" />
                                <span className="text-[8px] font-mono tracking-wider text-slate-400 uppercase">
                                  OFFICIAL PHOTO
                                </span>
                              </div>
                            )}
                          </div>

                          <h4 className="font-heading font-black text-sm text-white mb-0.5 leading-snug">
                            {patron.name}
                          </h4>
                          <p className="text-xs text-sky-300 font-medium mb-1">
                            {patron.role}
                          </p>
                          <p className="text-[11px] text-slate-400 leading-snug">
                            {patron.designation}
                          </p>
                        </div>
                      </div>

                      {/* Photo Upload & Delete Actions */}
                      <div className="pt-3 border-t border-slate-800/80 space-y-2">
                        <input
                          type="file"
                          id={`patron-file-${patron.id}`}
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handlePatronPhotoUpload(patron.id, e)
                          }
                        />
                        <button
                          type="button"
                          onClick={() =>
                            document
                              .getElementById(`patron-file-${patron.id}`)
                              ?.click()
                          }
                          className="w-full py-1.5 px-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>
                            {hasPhoto ? "Change Picture" : "Upload Picture"}
                          </span>
                        </button>

                        {hasPhoto && (
                          <button
                            type="button"
                            onClick={async () => {
                              if (
                                confirm(
                                  `Delete picture for ${patron.name}? It will restore the official photo placeholder as shown now.`,
                                )
                              ) {
                                await cms.deletePatronPhoto(patron.id);
                                triggerSuccess(
                                  "Picture deleted! Official photo placeholder restored.",
                                );
                              }
                            }}
                            className="w-full py-1.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete Picture</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 9: FAQS */}
          {activeTab === "faqs" && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading font-black text-2xl text-white">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Questions and answers displayed in the public FAQ accordion.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddFaqModal(true)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-heading font-bold text-xs uppercase flex items-center gap-1.5 shadow-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add FAQ</span>
                </button>
              </div>

              {/* Add FAQ Modal */}
              {showAddFaqModal && (
                <div className="p-6 rounded-2xl bg-slate-950 border border-indigo-500/40 space-y-4 animate-fade-in shadow-xl">
                  <h3 className="font-heading font-bold text-base text-white">
                    Create New FAQ
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Question
                      </label>
                      <input
                        value={newFaq.question}
                        onChange={(e) =>
                          setNewFaq({ ...newFaq, question: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                        placeholder="e.g. Will food and accommodation be provided?"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Answer
                      </label>
                      <textarea
                        value={newFaq.answer}
                        onChange={(e) =>
                          setNewFaq({ ...newFaq, answer: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white"
                        rows={3}
                        placeholder="Detailed answer..."
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={async () => {
                        if (!newFaq.question.trim()) return;
                        const updated = [
                          ...(cms.faqs || []),
                          { ...newFaq, id: `faq-${Date.now()}` },
                        ];
                        await cms.updateFaqs(updated);
                        setShowAddFaqModal(false);
                        setNewFaq({
                          question: "",
                          answer: "",
                          category: "General",
                        });
                        triggerSuccess("FAQ added successfully!");
                      }}
                      className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                    >
                      Save FAQ
                    </button>
                    <button
                      onClick={() => setShowAddFaqModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Edit FAQ Modal */}
              {showEditFaqModal && editingFaq && (
                <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4 animate-fade-in shadow-xl">
                  <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-amber-400" />
                    <span>Update / Modify FAQ</span>
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Question
                      </label>
                      <input
                        value={editingFaq.question || ""}
                        onChange={(e) =>
                          setEditingFaq({
                            ...editingFaq,
                            question: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Answer
                      </label>
                      <textarea
                        value={editingFaq.answer || ""}
                        onChange={(e) =>
                          setEditingFaq({
                            ...editingFaq,
                            answer: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white"
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={async () => {
                        if (!editingFaq.question.trim()) return;
                        const updated = (cms.faqs || []).map((f: any) =>
                          f.id === editingFaq.id
                            ? {
                                ...f,
                                question: editingFaq.question.trim(),
                                answer: editingFaq.answer.trim(),
                              }
                            : f,
                        );
                        await cms.updateFaqs(updated);
                        setShowEditFaqModal(false);
                        setEditingFaq(null);
                        triggerSuccess("FAQ updated successfully!");
                      }}
                      className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs"
                    >
                      Update FAQ
                    </button>
                    <button
                      onClick={() => {
                        setShowEditFaqModal(false);
                        setEditingFaq(null);
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* FAQs List */}
              <div className="space-y-3">
                {(cms.faqs || []).map((faq: any, idx: number) => (
                  <div
                    key={faq.id || idx}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4 transition-colors hover:border-slate-700"
                  >
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] text-sky-400 font-bold">
                        Q{idx + 1}
                      </span>
                      <h4 className="font-heading font-bold text-sm text-white">
                        {faq.question}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => {
                          setEditingFaq({ ...faq });
                          setShowEditFaqModal(true);
                        }}
                        className="p-2 rounded-lg bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 transition-colors"
                        title="Edit / Modify FAQ"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`Remove this FAQ?`)) {
                            const updated = cms.faqs.filter(
                              (f: any) => f.id !== faq.id,
                            );
                            await cms.updateFaqs(updated);
                            triggerSuccess("FAQ removed!");
                          }
                        }}
                        className="p-2 rounded-lg bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 transition-colors"
                        title="Delete FAQ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: ANNOUNCEMENTS */}
          {activeTab === "announcements" && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading font-black text-2xl text-white">
                    Broadcast Alert Banners
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Live announcements displayed prominently across the top of
                    the entire website.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddAnnModal(true)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-heading font-bold text-xs uppercase flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Banner</span>
                </button>
              </div>

              {/* Add Announcement Modal */}
              {showAddAnnModal && (
                <div className="p-6 rounded-3xl bg-slate-950 border border-rose-500/40 space-y-4 animate-fade-in">
                  <h3 className="font-heading font-bold text-base text-white">
                    Create Announcement Banner
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Banner Title
                      </label>
                      <input
                        value={newAnnouncement.title}
                        onChange={(e) =>
                          setNewAnnouncement({
                            ...newAnnouncement,
                            title: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                        placeholder="e.g. Registration Deadline Extended to 26 October!"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Priority
                      </label>
                      <select
                        value={newAnnouncement.priority}
                        onChange={(e) =>
                          setNewAnnouncement({
                            ...newAnnouncement,
                            priority: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                      >
                        <option value="NORMAL">Normal Info</option>
                        <option value="IMPORTANT">Important</option>
                        <option value="URGENT">Urgent Alert</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Target Link URL (optional)
                      </label>
                      <input
                        value={newAnnouncement.linkUrl}
                        onChange={(e) =>
                          setNewAnnouncement({
                            ...newAnnouncement,
                            linkUrl: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                        placeholder="https://forms.gle/..."
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Short Message
                      </label>
                      <textarea
                        value={newAnnouncement.shortMessage}
                        onChange={(e) =>
                          setNewAnnouncement({
                            ...newAnnouncement,
                            shortMessage: e.target.value,
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white"
                        rows={2}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={async () => {
                        if (!newAnnouncement.title) return;
                        await cms.addAnnouncement({
                          ...newAnnouncement,
                          id: `ann-${Date.now()}`,
                          status: "PUBLISHED",
                        });
                        setShowAddAnnModal(false);
                        triggerSuccess(
                          "Announcement banner is now live on the website!",
                        );
                      }}
                      className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
                    >
                      Publish Banner
                    </button>
                    <button
                      onClick={() => setShowAddAnnModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Announcements List */}
              <div className="space-y-3">
                {(cms.announcements || []).map((ann: any) => (
                  <div
                    key={ann.id}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                          {ann.priority}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {new Date(ann.publishDate).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="font-heading font-black text-sm text-white">
                        {ann.title}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {ann.shortMessage}
                      </p>
                    </div>
                    <button
                      onClick={async () => {
                        await cms.deleteAnnouncement(ann.id);
                        triggerSuccess("Announcement deleted!");
                      }}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: REGISTRATION CMS */}
          {activeTab === "registration" && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h2 className="font-heading font-black text-2xl text-white">
                  Registration & Fee Controls
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Update registration deadlines, fee amounts, and Google Form
                  destination.
                </p>
              </div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSaving(true);
                  const fd = new FormData(e.currentTarget);
                  await cms.updateRegistration({
                    status: fd.get("regStatus"),
                    feePerTeam: fd.get("feePerTeam"),
                    teamSizeLabel: fd.get("teamSizeLabel"),
                    deadline: fd.get("deadline"),
                    registrationUrl: fd.get("registrationUrl"),
                    buttonText: fd.get("buttonText"),
                    policyNote: fd.get("policyNote"),
                  });
                  setIsSaving(false);
                  triggerSuccess("Registration settings updated successfully!");
                }}
                className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Registration Status
                    </label>
                    <select
                      name="regStatus"
                      defaultValue={cms.registration?.status || "OPEN"}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                    >
                      <option value="OPEN">OPEN</option>
                      <option value="CLOSED">CLOSED</option>
                      <option value="COMING_SOON">COMING SOON</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Registration Deadline
                    </label>
                    <input
                      name="deadline"
                      defaultValue={
                        cms.registration?.deadline || "25 October 2026"
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Registration Fee Text
                    </label>
                    <input
                      name="feePerTeam"
                      defaultValue={
                        cms.registration?.feePerTeam || "₹500 / Team"
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Team Size
                    </label>
                    <input
                      name="teamSizeLabel"
                      defaultValue={
                        cms.registration?.teamSizeLabel || "3–4 Members"
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Official Google Forms Registration URL
                    </label>
                    <input
                      name="registrationUrl"
                      defaultValue={
                        cms.registration?.registrationUrl ||
                        "https://forms.gle/YN35pBeytcHqmPHj7"
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Button Text
                    </label>
                    <input
                      name="buttonText"
                      defaultValue={
                        cms.registration?.buttonText ||
                        "REGISTER ON GOOGLE FORMS"
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Refund / Eligibility Policy Note
                  </label>
                  <textarea
                    name="policyNote"
                    rows={2}
                    defaultValue={
                      cms.registration?.policyNote ||
                      "The registration fee is non-refundable. College ID is compulsory for all members."
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-indigo-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-heading font-bold text-xs uppercase flex items-center gap-2 shadow-md transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>
                    {isSaving ? "Saving..." : "Save Registration Settings"}
                  </span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 12: OFFICIAL POSTER MANAGEMENT */}
          {activeTab === "poster" && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-heading font-black text-2xl text-white">
                    Official Event Poster Management
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Configure, update, preview, and replace the official
                    Buildathon 2.0 poster displayed to participants.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPosterPreviewModal(true)}
                  className="px-4 py-2 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/40 text-xs font-bold font-heading uppercase flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-4 h-4 text-sky-400" />
                  <span>Preview Participant Modal</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Poster Live Preview Card */}
                <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Live Poster Preview</span>
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Active
                    </span>
                  </div>

                  <div className="relative group rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center p-3 min-h-[300px]">
                    <img
                      src={cms.media?.activePosterUrl || "/official_poster.png"}
                      alt="Buildathon Official Poster Preview"
                      className="max-h-[350px] w-auto object-contain rounded-lg shadow-xl"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/official_poster.png";
                      }}
                    />
                    <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
                      <button
                        type="button"
                        onClick={() => setShowPosterPreviewModal(true)}
                        className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg transition-colors cursor-pointer"
                      >
                        <ZoomIn className="w-4 h-4" />
                        <span>Enlarge Modal View</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-slate-400 block truncate">
                      <strong className="text-slate-300">
                        File Path / URL:
                      </strong>{" "}
                      {cms.media?.activePosterUrl || "/official_poster.png"}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 block">
                      Directly connected to hero buttons, navbar, and official
                      rulebook modals across the entire website.
                    </span>
                  </div>
                </div>

                {/* Poster Update / Controls Card */}
                <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
                  {/* Local Storage Device File Upload */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Upload className="w-4 h-4 text-indigo-400" />
                        <span className="font-heading font-bold text-xs uppercase text-indigo-300">
                          Upload Poster from Device (Local Storage)
                        </span>
                      </div>
                      {typeof window !== "undefined" &&
                      localStorage.getItem("cit_buildathon_custom_poster") ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          Stored in Browser LocalStorage
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800">
                          Default System Poster Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Pick any image file (PNG, JPG, WebP) directly from your
                      computer. It is stored safely in your browser's{" "}
                      <code className="text-sky-300 font-mono">
                        localStorage
                      </code>{" "}
                      and displayed across all official poster view buttons,
                      hero CTA, and modals.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <input
                        type="file"
                        ref={posterFileInputRef}
                        accept="image/*"
                        onChange={handlePosterFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => posterFileInputRef.current?.click()}
                        className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-heading font-bold text-xs uppercase flex items-center gap-2 shadow-md transition-colors cursor-pointer"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Choose Poster File...</span>
                      </button>

                      {typeof window !== "undefined" &&
                        localStorage.getItem(
                          "cit_buildathon_custom_poster",
                        ) && (
                          <button
                            type="button"
                            onClick={async () => {
                              if (
                                confirm(
                                  "Clear the custom poster from Local Storage and reset to default?",
                                )
                              ) {
                                setPosterUrlInput("/official_poster.png");
                                await cms.updateActivePoster(
                                  "/official_poster.png",
                                );
                                triggerSuccess(
                                  "Custom poster removed from Local Storage. Restored default official poster.",
                                );
                              }
                            }}
                            className="px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-heading font-bold uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove from Local Storage</span>
                          </button>
                        )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-sm text-white mb-1">
                      Or Update / Modify Poster URL / Path
                    </h3>
                    <p className="text-xs text-slate-400">
                      Enter a local root path (e.g.{" "}
                      <code className="text-sky-300 font-mono">
                        /official_poster.png
                      </code>
                      ) or any external high-resolution image link.
                    </p>
                  </div>

                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const val = posterUrlInput.trim();
                      if (val) {
                        await cms.updateActivePoster(val);
                        triggerSuccess(
                          "Official event poster updated successfully!",
                        );
                      }
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                        Poster Image URL / Path
                      </label>
                      <input
                        value={posterUrlInput}
                        onChange={(e) => setPosterUrlInput(e.target.value)}
                        placeholder="/official_poster.png or https://..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:border-indigo-500 outline-none"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="submit"
                        disabled={!posterUrlInput.trim()}
                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-heading font-bold text-xs uppercase flex items-center gap-2 shadow-md transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        <span>Update Poster</span>
                      </button>

                      <button
                        type="button"
                        onClick={async () => {
                          if (
                            confirm(
                              "Reset the official poster to default (/official_poster.png)?",
                            )
                          ) {
                            setPosterUrlInput("/official_poster.png");
                            await cms.updateActivePoster(
                              "/official_poster.png",
                            );
                            triggerSuccess("Poster reset to official default!");
                          }
                        }}
                        className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-colors"
                      >
                        Reset to Default PNG
                      </button>

                      <button
                        type="button"
                        onClick={async () => {
                          if (confirm("Delete and remove custom poster URL?")) {
                            setPosterUrlInput("");
                            await cms.updateActivePoster("");
                            triggerSuccess("Poster cleared.");
                          }
                        }}
                        className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-heading font-bold uppercase flex items-center gap-1.5 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete / Clear Poster</span>
                      </button>
                    </div>
                  </form>

                  {/* Preset Quick Selectors */}
                  <div className="pt-4 border-t border-slate-800/80 space-y-3">
                    <span className="text-xs font-mono font-bold text-slate-300 uppercase block">
                      Quick Preset Asset Shortcuts
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={async () => {
                          setPosterUrlInput("/official_poster.png");
                          await cms.updateActivePoster("/official_poster.png");
                          triggerSuccess("Set to High-Res PNG Poster!");
                        }}
                        className="p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 text-left transition-colors cursor-pointer"
                      >
                        <div className="text-xs font-bold text-white">
                          Official Poster (PNG)
                        </div>
                        <div className="text-[11px] font-mono text-sky-400 mt-0.5">
                          /official_poster.png
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">
                          High resolution, crisp text
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={async () => {
                          setPosterUrlInput("/official_poster.jpg");
                          await cms.updateActivePoster("/official_poster.jpg");
                          triggerSuccess("Set to Compressed JPG Poster!");
                        }}
                        className="p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 text-left transition-colors cursor-pointer"
                      >
                        <div className="text-xs font-bold text-white">
                          Official Poster (JPG)
                        </div>
                        <div className="text-[11px] font-mono text-amber-400 mt-0.5">
                          /official_poster.jpg
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">
                          Faster loading, compressed
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 13: BRANDING & COLLEGE LOGO */}
          {activeTab === "branding" && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h2 className="font-heading font-black text-2xl text-white">
                  College Logo & Branding Management
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Update the official Channabasaveshwara Institute of Technology
                  logo (Strictly displayed only in the navigation bar).
                </p>
              </div>

              <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
                <div>
                  <h3 className="font-heading font-bold text-sm text-white mb-2">
                    Active College Logo Preview
                  </h3>
                  <div className="p-4 rounded-none bg-white max-w-xs flex items-center justify-center border border-slate-700 shadow-inner">
                    <img
                      src={cms.media?.activeCollegeLogo || "/cit_logo.jpg"}
                      alt="CIT College Logo"
                      className="h-16 object-contain rounded-none"
                    />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 mt-2 block">
                    Current Path:{" "}
                    {cms.media?.activeCollegeLogo || "/cit_logo.jpg"}
                  </span>
                </div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget);
                    const logoUrl = fd.get("logoUrl") as string;
                    if (logoUrl) {
                      await cms.updateActiveLogo(logoUrl);
                      triggerSuccess(
                        "Active college logo updated successfully!",
                      );
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Set New Logo URL / Path
                    </label>
                    <input
                      name="logoUrl"
                      defaultValue={
                        cms.media?.activeCollegeLogo || "/cit_logo.jpg"
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 outline-none font-mono"
                      placeholder="/cit_logo.jpg or https://..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-heading font-bold text-xs uppercase flex items-center gap-2 shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Apply Logo Change</span>
                  </button>
                </form>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                  <p className="font-bold mb-1">
                    Important Branding Rule Enforced:
                  </p>
                  <p className="text-slate-300">
                    The college logo is strictly and uniquely rendered in the
                    Navigation Bar (desktop & mobile drawer). It is
                    intentionally excluded from cards and content blocks to
                    preserve clean institutional design hierarchy.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 14: AUDIT LOGS */}
          {activeTab === "audit-logs" && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h2 className="font-heading font-black text-2xl text-white">
                  System Audit Logs
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Complete immutable trail of all modifications made via the
                  CMS.
                </p>
              </div>

              <div className="space-y-2">
                {(cms.auditLogs || []).map((log: any) => (
                  <div
                    key={log.id}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-indigo-400 uppercase text-[10px] bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                        {log.action}
                      </span>
                      <span className="text-white font-bold">
                        {log.entity}:
                      </span>
                      <span className="text-slate-300">{log.details}</span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 flex items-center gap-2">
                      <span>By: {log.userEmail}</span>
                      <span>•</span>
                      <span>{new Date(log.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Official Poster Modal Preview for testing */}
      <OfficialPosterModal
        isOpen={showPosterPreviewModal}
        onClose={() => setShowPosterPreviewModal(false)}
      />
    </div>
  );
};

export default AdminPanel;
