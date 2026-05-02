import { useState, useRef, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, Users, FileText, BarChart3, Settings, Bell,
  Shield, Camera, Radio, Building2, Home, Phone, Mail, TrendingUp,
  TrendingDown, DollarSign, Calendar, ChevronDown, Search, LogOut,
  Menu, X, Star, MapPin, Clock, Activity, Eye, MousePointerClick,
  ArrowUpRight, ArrowDownRight, MessageSquare, Target, Zap,
  Plus, Filter, Download, MoreHorizontal, Check, XCircle,
  ChevronLeft, ChevronRight, Pencil, Trash2, Send, Globe,
  UserCheck, Briefcase, Timer, AtSign, Lock, ToggleLeft, ToggleRight,
  CheckCircle2, AlertCircle, RefreshCw, Layers, Tag, Inbox,
  ClipboardList, UserPlus, CreditCard, PieChart as PieChartIcon,
  Megaphone, BarChart2, ChevronUp, Box, Sparkles,
} from "lucide-react";
import { loadPoleQuotes, PoleQuote } from "./PoleConfigurator";
import { loadQualifyLeads, QualifyLead } from "./QualifyFunnel";
import { loadSwitchLeads, deleteSwitchLead, SwitchLead } from "./SwitchAssessment";
import { loadAssessmentLeads, deleteAssessmentLead, AssessmentLead } from "./PropertyAssessment";
import { clearWebsiteLeads, deleteWebsiteLead, loadWebsiteLeads, WebsiteLeadSubmission } from "@/lib/leadSubmissions";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";
import { useChatContext } from "../context/ChatContext";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const revenueData = [
  { month: "Jan", revenue: 42000, leads: 85 },
  { month: "Feb", revenue: 48000, leads: 92 },
  { month: "Mar", revenue: 55000, leads: 110 },
  { month: "Apr", revenue: 51000, leads: 98 },
  { month: "May", revenue: 62000, leads: 125 },
  { month: "Jun", revenue: 58000, leads: 115 },
  { month: "Jul", revenue: 71000, leads: 142 },
  { month: "Aug", revenue: 68000, leads: 136 },
  { month: "Sep", revenue: 75000, leads: 150 },
  { month: "Oct", revenue: 82000, leads: 165 },
  { month: "Nov", revenue: 79000, leads: 158 },
  { month: "Dec", revenue: 88000, leads: 176 },
];

const serviceBreakdown = [
  { name: "Alarm Systems", value: 35, color: "hsl(0 85% 46%)" },
  { name: "Camera Systems", value: 28, color: "hsl(0 0% 15%)" },
  { name: "Monitoring", value: 18, color: "hsl(0 85% 56%)" },
  { name: "Commercial", value: 12, color: "hsl(0 0% 40%)" },
  { name: "HOA", value: 7, color: "hsl(0 0% 70%)" },
];

const trafficData = [
  { day: "Mon", visitors: 420, pageViews: 1250 },
  { day: "Tue", visitors: 380, pageViews: 1100 },
  { day: "Wed", visitors: 510, pageViews: 1480 },
  { day: "Thu", visitors: 470, pageViews: 1360 },
  { day: "Fri", visitors: 390, pageViews: 1150 },
  { day: "Sat", visitors: 280, pageViews: 820 },
  { day: "Sun", visitors: 210, pageViews: 630 },
];

const mockLeads = [
  { id: 1, name: "Marcus Johnson", phone: "(713) 555-0192", email: "marcus@email.com", service: "Alarm System", status: "hot", value: "$3,200", source: "Google", date: "Apr 14" },
  { id: 2, name: "Sarah Williams", phone: "(832) 555-0344", email: "sarah@email.com", service: "Camera System", status: "warm", value: "$5,800", source: "Referral", date: "Apr 13" },
  { id: 3, name: "David Chen", phone: "(281) 555-0571", email: "david@email.com", service: "Commercial Bundle", status: "new", value: "$18,400", source: "Website", date: "Apr 13" },
  { id: 4, name: "Amanda Torres", phone: "(713) 555-0823", email: "amanda@email.com", service: "Monitoring", status: "warm", value: "$1,200/yr", source: "Facebook", date: "Apr 12" },
  { id: 5, name: "Robert Kim", phone: "(832) 555-0116", email: "robert@email.com", service: "HOA Package", status: "hot", value: "$42,000", source: "Google", date: "Apr 12" },
  { id: 6, name: "Linda Nguyen", phone: "(281) 555-0987", email: "linda@email.com", service: "Residential", status: "cold", value: "$2,600", source: "Yelp", date: "Apr 11" },
];

const mockClients = [
  { id: 1, name: "Riverside HOA", type: "HOA", contact: "Tom Garza", phone: "(713) 555-0101", plan: "Enterprise", mrr: "$3,400", since: "2022", status: "active", cameras: 24, alarms: 8 },
  { id: 2, name: "Greenway Medical", type: "Commercial", contact: "Dr. Lisa Park", phone: "(832) 555-0202", plan: "Pro", mrr: "$1,800", since: "2023", status: "active", cameras: 12, alarms: 4 },
  { id: 3, name: "The Martinez Family", type: "Residential", contact: "Carlos Martinez", phone: "(281) 555-0303", plan: "Standard", mrr: "$89", since: "2021", status: "active", cameras: 4, alarms: 1 },
  { id: 4, name: "Oakwood Church", type: "Commercial", contact: "Pastor Reed", phone: "(713) 555-0404", plan: "Pro", mrr: "$620", since: "2023", status: "active", cameras: 8, alarms: 2 },
  { id: 5, name: "Westfield Retail", type: "Commercial", contact: "Amy Chu", phone: "(832) 555-0505", plan: "Enterprise", mrr: "$2,100", since: "2022", status: "pending", cameras: 18, alarms: 6 },
];

const mockEmployees = [
  { id: 1, name: "Jake Morales", role: "Lead Technician", phone: "(713) 555-1001", email: "jake@tts.com", status: "active", dept: "Field Ops", hire: "Jan 2021", jobs: 312, rating: 4.9 },
  { id: 2, name: "Chris Owens", role: "Technician", phone: "(832) 555-1002", email: "chris@tts.com", status: "active", dept: "Field Ops", hire: "Mar 2022", jobs: 187, rating: 4.7 },
  { id: 3, name: "Maria Santos", role: "Sales Rep", phone: "(281) 555-1003", email: "maria@tts.com", status: "active", dept: "Sales", hire: "Jun 2022", jobs: 94, rating: 4.8 },
  { id: 4, name: "Devon Price", role: "Dispatcher", phone: "(713) 555-1004", email: "devon@tts.com", status: "active", dept: "Operations", hire: "Sep 2021", jobs: 0, rating: 4.6 },
  { id: 5, name: "Tanya Brooks", role: "Technician", phone: "(832) 555-1005", email: "tanya@tts.com", status: "off", dept: "Field Ops", hire: "Nov 2023", jobs: 98, rating: 4.5 },
];

const mockSchedule = [
  { id: 1, time: "8:00 AM", client: "Marcus Johnson", address: "4521 Westheimer Rd, Houston", tech: "Jake Morales", type: "Installation", status: "confirmed" },
  { id: 2, time: "10:30 AM", client: "Greenway Medical", address: "9800 Bellaire Blvd, Houston", tech: "Chris Owens", type: "Maintenance", status: "en-route" },
  { id: 3, time: "1:00 PM", client: "Riverside HOA", address: "2200 Memorial Dr, Houston", tech: "Jake Morales", type: "Inspection", status: "confirmed" },
  { id: 4, time: "3:30 PM", client: "Linda Nguyen", address: "7712 Fondren Rd, Houston", tech: "Tanya Brooks", type: "Installation", status: "pending" },
  { id: 5, time: "5:00 PM", client: "Westfield Retail", address: "12520 Memorial Dr, Houston", tech: "Chris Owens", type: "Camera Upgrade", status: "confirmed" },
];

const mockCampaigns = [
  { id: 1, name: "Spring Security Promo", status: "active", sent: 4820, opened: 1832, clicked: 412, segment: "All Leads", date: "Apr 10" },
  { id: 2, name: "HOA Outreach Q2", status: "active", sent: 320, opened: 156, clicked: 48, segment: "HOA Contacts", date: "Apr 8" },
  { id: 3, name: "Client Check-In Newsletter", status: "sent", sent: 1240, opened: 891, clicked: 203, segment: "Active Clients", date: "Apr 1" },
  { id: 4, name: "Referral Program Invite", status: "draft", sent: 0, opened: 0, clicked: 0, segment: "Past Clients", date: "—" },
  { id: 5, name: "Camera Bundle Flash Sale", status: "scheduled", sent: 0, opened: 0, clicked: 0, segment: "Residential Leads", date: "Apr 20" },
];

const mockUsers = [
  { id: 1, name: "Admin User", email: "admin@tts.com", role: "Owner", lastLogin: "Today", status: "active" },
  { id: 2, name: "Maria Santos", email: "maria@tts.com", role: "Sales", lastLogin: "Today", status: "active" },
  { id: 3, name: "Devon Price", email: "devon@tts.com", role: "Dispatcher", lastLogin: "Yesterday", status: "active" },
  { id: 4, name: "Jake Morales", email: "jake@tts.com", role: "Technician", lastLogin: "Today", status: "active" },
  { id: 5, name: "Chris Owens", email: "chris@tts.com", role: "Technician", lastLogin: "3 days ago", status: "active" },
];

type AdminLead = typeof mockLeads[number];
type AdminClient = typeof mockClients[number];
type AdminEmployee = typeof mockEmployees[number];
type AdminJob = typeof mockSchedule[number];
type AdminCampaign = typeof mockCampaigns[number];
type AdminUser = typeof mockUsers[number];

const loadAdminData = <T,>(key: string, fallback: T[]): T[] => {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

const saveAdminData = <T,>(key: string, data: T[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
};

const adminId = () => Date.now();

// ─── Status Badge ─────────────────────────────────────────────────────────────

function Badge({ status }: { status: string }) {
  const map: Record<string, string> = {
    hot: "bg-red-500/20 text-red-400 border border-red-500/30",
    warm: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
    new: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    cold: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
    active: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    pending: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    off: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
    confirmed: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    "en-route": "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    sent: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    draft: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
    scheduled: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${map[status] || map.cold}`}>
      {status}
    </span>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, icon: Icon, trend, trendDir }: {
  label: string; value: string; sub?: string; icon: React.ElementType; trend?: string; trendDir?: "up" | "down";
}) {
  return (
    <div style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <span style={{ color: "hsl(0 0% 55%)" }} className="text-sm">{label}</span>
        <div style={{ background: "hsl(0 0% 12%)" }} className="w-9 h-9 rounded-lg flex items-center justify-center">
          <Icon size={18} style={{ color: "hsl(0 75% 50%)" }} />
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{value}</div>
        {sub && <div style={{ color: "hsl(0 0% 50%)" }} className="text-xs mt-1">{sub}</div>}
      </div>
      {trend && (
        <div className="flex items-center gap-1.5">
          {trendDir === "up"
            ? <ArrowUpRight size={14} className="text-emerald-400" />
            : <ArrowDownRight size={14} className="text-red-400" />}
          <span className={`text-xs ${trendDir === "up" ? "text-emerald-400" : "text-red-400"}`}>{trend}</span>
        </div>
      )}
    </div>
  );
}

interface QuickCreateField {
  name: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
}

function QuickCreateDialog({
  open,
  title,
  subtitle,
  fields,
  onClose,
  onSubmit,
}: {
  open: boolean;
  title: string;
  subtitle?: string;
  fields: QuickCreateField[];
  onClose: () => void;
  onSubmit: (values: Record<string, string>) => void;
}) {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setValues(Object.fromEntries(fields.map(field => [field.name, field.defaultValue || ""])));
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-gray-950/40 px-4 py-6 backdrop-blur-sm">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(values);
          onClose();
        }}
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
      >
        <div className="border-b border-gray-100 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-950">{title}</h2>
              {subtitle && <p className="mt-1 text-sm leading-relaxed text-gray-500">{subtitle}</p>}
            </div>
            <button type="button" onClick={onClose} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700">
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="grid gap-4 px-6 py-5">
          {fields.map((field) => (
            <label key={field.name} className="grid gap-1.5">
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-gray-500">{field.label}</span>
              <input
                value={values[field.name] || ""}
                onChange={(event) => setValues(current => ({ ...current, [field.name]: event.target.value }))}
                placeholder={field.placeholder}
                className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-950 outline-none transition-colors placeholder:text-gray-400 focus:border-red-300 focus:ring-4 focus:ring-red-50"
              />
            </label>
          ))}
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4">
          <button type="button" onClick={onClose} className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── Pages ────────────────────────────────────────────────────────────────────

function DashboardPage() {
  const [websiteLeads] = useState<WebsiteLeadSubmission[]>(() => loadWebsiteLeads());
  const [assessmentLeads] = useState<AssessmentLead[]>(() => loadAssessmentLeads());
  const [switchLeads] = useState<SwitchLead[]>(() => loadSwitchLeads());
  const [poleQuotes] = useState<PoleQuote[]>(() => loadPoleQuotes());
  const [completedActions, setCompletedActions] = useState<string[]>(() => loadAdminData("tts_admin_completed_actions", []));
  const recordAction = (action: string) => {
    const next = completedActions.includes(action)
      ? completedActions.filter(item => item !== action)
      : [action, ...completedActions];
    setCompletedActions(next);
    saveAdminData("tts_admin_completed_actions", next);
  };

  const allFormLeads = [...websiteLeads, ...assessmentLeads, ...switchLeads];
  const todayLeadCount = allFormLeads.filter((lead) => {
    const submittedAt = "submittedAt" in lead ? lead.submittedAt : "";
    return submittedAt && new Date(submittedAt).toDateString() === new Date().toDateString();
  }).length;
  const guidedLeadCount = websiteLeads.filter((lead) => lead.mode === "guided").length;
  const urgentLeadCount = websiteLeads.filter((lead) =>
    [lead.guidedAnswers?.bestTime, lead.timeline, lead.guidedAnswers?.currentIssue].some((value) =>
      value?.toLowerCase().includes("today") || value?.toLowerCase().includes("urgent")
    )
  ).length;
  const openPolePipeline = poleQuotes
    .filter((quote) => quote.status !== "lost" && quote.status !== "won")
    .reduce((sum, quote) => sum + quote.estimatedTotal, 0);
  const insightCards = [
    {
      icon: Phone,
      title: "Call priority leads first",
      body: urgentLeadCount > 0
        ? `${urgentLeadCount} website lead${urgentLeadCount === 1 ? "" : "s"} asked for contact today. Start with those before general follow-up.`
        : "No urgent website leads are waiting. Use this window for warm follow-up and quote cleanup.",
      action: "Open Form Submissions",
    },
    {
      icon: Box,
      title: "Pole quote pipeline",
      body: openPolePipeline > 0
        ? `$${openPolePipeline.toLocaleString()} in open pole configurator estimates. Move new quotes to contacted or quoted today.`
        : "No open pole quotes yet. Share the configurator with HOA and commercial prospects.",
      action: "Review Pole Quotes",
    },
    {
      icon: Sparkles,
      title: "Automation opportunity",
      body: `${guidedLeadCount} guided request${guidedLeadCount === 1 ? "" : "s"} include structured answers. Use them to pre-fill call scripts, service type, and next-step emails.`,
      action: "Build Follow-Up",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="grid lg:grid-cols-[1fr_auto] gap-5 items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-red-700">
              <Activity size={13} /> Operations Command Center
            </div>
            <h1 className="mt-3 text-3xl font-bold text-gray-950">Good morning. Here is what needs attention today.</h1>
            <p className="text-sm mt-2 text-gray-500">
              Intelligent overview for leads, quotes, schedule, website activity, and daily follow-up across Texas Total Security.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 min-w-[320px]">
            {[
              { label: "Today", value: todayLeadCount, sub: "new form leads" },
              { label: "Guided", value: guidedLeadCount, sub: "structured requests" },
              { label: "Pipeline", value: `$${Math.round(openPolePipeline / 1000)}k`, sub: "open pole quotes" },
            ].map((item) => (
              <div key={item.label} className="border border-gray-200 bg-gray-50 p-3">
                <div className="text-xl font-bold text-gray-950">{item.value}</div>
                <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">{item.label}</div>
                <div className="mt-1 text-[11px] text-gray-500">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {insightCards.map((insight) => (
          <div key={insight.title} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-red-200 transition-colors">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600">
                <insight.icon size={18} />
              </div>
              <div>
                <h2 className="font-bold text-gray-950">{insight.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{insight.body}</p>
                <button onClick={() => recordAction(insight.action)} className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-red-700">
                  {completedActions.includes(insight.action) ? "Marked for follow-up" : insight.action} <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Monthly Revenue" value="$88,400" sub="+12.4% vs last month" icon={DollarSign} trend="12.4% this month" trendDir="up" />
        <StatCard label="New Leads" value="176" sub="67 qualified this week" icon={Target} trend="8.2% vs last week" trendDir="up" />
        <StatCard label="Active Clients" value="412" sub="18 added this month" icon={Users} trend="4.5% growth" trendDir="up" />
        <StatCard label="Jobs Scheduled" value="34" sub="Today's pipeline" icon={Calendar} trend="2 pending confirm" trendDir="down" />
      </div>

      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-950">Daily Automation Queue</h2>
            <span className="text-xs font-semibold text-gray-400">Recommended next actions</span>
          </div>
          <div className="grid gap-3">
            {[
              { icon: Send, title: "Send same-day intro text", detail: "Trigger a quick intro SMS for new guided form leads with service-specific language.", priority: "High" },
              { icon: Calendar, title: "Confirm tomorrow's appointments", detail: "Review pending jobs and send reminders before end of day.", priority: "Ops" },
              { icon: Star, title: "Request reviews after completed installs", detail: "Add review request automation 7 days after install completion.", priority: "Growth" },
              { icon: RefreshCw, title: "Revive stale quotes", detail: "Follow up on contacted pole quotes that have not moved to quoted status.", priority: "Sales" },
            ].map((task) => (
              <button key={task.title} onClick={() => recordAction(task.title)} className="text-left flex items-start gap-3 border border-gray-100 bg-gray-50 p-3 hover:border-red-200 hover:bg-white transition-colors">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-red-600 border border-gray-200">
                  <task.icon size={15} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-bold text-gray-950">{task.title}</p>
                    <span className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500">
                      {completedActions.includes(task.title) ? "Queued" : task.priority}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">{task.detail}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-gray-950 mb-4">Business Health Signals</h2>
          <div className="space-y-4">
            {[
              { label: "Lead response risk", value: urgentLeadCount > 0 ? "Needs attention" : "Healthy", pct: urgentLeadCount > 0 ? 72 : 18 },
              { label: "Quote follow-up load", value: `${poleQuotes.filter(q => q.status === "new").length} new`, pct: Math.min(100, poleQuotes.filter(q => q.status === "new").length * 18) },
              { label: "Guided form quality", value: guidedLeadCount > 0 ? "Strong" : "Collecting data", pct: guidedLeadCount > 0 ? 84 : 35 },
            ].map((signal) => (
              <div key={signal.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-gray-700">{signal.label}</span>
                  <span className="text-xs font-semibold text-gray-500">{signal.value}</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-red-600" style={{ width: `${signal.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="lg:col-span-2 rounded-xl p-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-semibold">Revenue &amp; Lead Trend</h2>
            <span style={{ color: "hsl(0 0% 45%)" }} className="text-xs">Last 12 months</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0 75% 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(0 75% 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 14%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(0 0% 45%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(0 0% 45%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: "hsl(0 0% 10%)", border: "1px solid hsl(0 0% 18%)", borderRadius: 8, color: "#fff" }} formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(0 75% 50%)" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl p-5">
          <h2 className="text-white font-semibold mb-6">Services Breakdown</h2>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={serviceBreakdown} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={3} dataKey="value">
                {serviceBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(0 0% 10%)", border: "1px solid hsl(0 0% 18%)", borderRadius: 8, color: "#fff" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {serviceBreakdown.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span style={{ color: "hsl(0 0% 65%)" }}>{s.name}</span>
                </div>
                <span className="text-white font-medium">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl p-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-semibold">Website Traffic</h2>
          <span style={{ color: "hsl(0 0% 45%)" }} className="text-xs">This week</span>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={trafficData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 14%)" />
            <XAxis dataKey="day" tick={{ fill: "hsl(0 0% 45%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(0 0% 45%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "hsl(0 0% 10%)", border: "1px solid hsl(0 0% 18%)", borderRadius: 8, color: "#fff" }} />
            <Bar dataKey="visitors" fill="hsl(0 75% 50%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="pageViews" fill="hsl(0 0% 22%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function LeadsPage() {
  const [search, setSearch] = useState("");
  const [qualifyLeads, setQualifyLeads] = useState<QualifyLead[]>(() => loadQualifyLeads());
  const [adminLeads, setAdminLeads] = useState<AdminLead[]>(() => loadAdminData("tts_admin_leads", mockLeads));
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [createOpen, setCreateOpen] = useState(false);

  const allLeads = [
    ...qualifyLeads,
    ...adminLeads,
  ];

  const filtered = allLeads.filter((l) =>
    (statusFilter === "all" || l.status === statusFilter) &&
    (l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.service.toLowerCase().includes(search.toLowerCase()))
  );

  const clearQualifyLeads = () => {
    localStorage.removeItem("tts_qualify_leads");
    setQualifyLeads([]);
  };

  const persistAdminLeads = (next: AdminLead[]) => {
    setAdminLeads(next);
    saveAdminData("tts_admin_leads", next);
  };

  const addLead = (values: Record<string, string>) => {
    const name = values.name;
    if (!name?.trim()) return;
    const lead: AdminLead = {
      id: adminId(),
      name: name.trim(),
      phone: values.phone || "",
      email: "",
      service: values.service || "General Security",
      status: "new",
      value: values.value || "$0",
      source: "Admin",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    };
    persistAdminLeads([lead, ...adminLeads]);
  };

  const advanceLeadStatus = (lead: AdminLead) => {
    const order = ["new", "warm", "hot", "cold"];
    const nextStatus = order[(order.indexOf(lead.status) + 1) % order.length] || "new";
    persistAdminLeads(adminLeads.map(l => l.id === lead.id ? { ...l, status: nextStatus } : l));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads</h1>
          <p style={{ color: "hsl(0 0% 50%)" }} className="text-sm mt-1">
            {allLeads.length} total leads
            {qualifyLeads.length > 0 && (
              <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                {qualifyLeads.length} new from funnel
              </span>
            )}
          </p>
        </div>
        <button onClick={() => setCreateOpen(true)} style={{ background: "hsl(0 75% 50%)" }} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus size={16} /> Add Lead
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Hot Leads", value: "12", color: "text-red-400" },
          { label: "Warm", value: "28", color: "text-orange-400" },
          { label: "New (Today)", value: "6", color: "text-blue-400" },
          { label: "Closed This Month", value: "34", color: "text-emerald-400" },
        ].map(s => (
          <div key={s.label} style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl p-4">
            <div style={{ color: "hsl(0 0% 50%)" }} className="text-xs mb-2">{s.label}</div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b" style={{ borderColor: "hsl(0 0% 14%)" }}>
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "hsl(0 0% 40%)" }} />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search leads…"
              style={{ background: "hsl(0 0% 5%)", border: "1px solid hsl(0 0% 16%)", color: "white" }}
              className="w-full pl-9 pr-4 py-2 rounded-lg text-sm placeholder:text-gray-600 focus:outline-none"
            />
          </div>
          <button onClick={() => setStatusFilter(statusFilter === "all" ? "new" : statusFilter === "new" ? "warm" : statusFilter === "warm" ? "hot" : "all")} style={{ background: "hsl(0 0% 12%)", border: "1px solid hsl(0 0% 18%)", color: "hsl(0 0% 55%)" }} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm">
            <Filter size={14} /> Filter
          </button>
          {qualifyLeads.length > 0 && (
            <button
              onClick={clearQualifyLeads}
              style={{ background: "hsl(0 0% 12%)", border: "1px solid hsl(0 0% 18%)", color: "hsl(0 0% 55%)" }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:text-red-400 transition-colors"
              title="Clear funnel leads from local storage"
            >
              <Trash2 size={14} /> Clear Funnel
            </button>
          )}
        </div>

        {qualifyLeads.length > 0 && (
          <div className="px-4 py-2 border-b flex items-center gap-2" style={{ borderColor: "hsl(0 0% 14%)", background: "hsl(220 60% 50% / 0.06)" }}>
            <Bell size={13} style={{ color: "hsl(220 70% 65%)" }} />
            <span className="text-[12px] font-semibold" style={{ color: "hsl(220 70% 65%)" }}>
              {qualifyLeads.length} new submission{qualifyLeads.length !== 1 ? "s" : ""} from the qualify funnel — shown at top
            </span>
          </div>
        )}

        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid hsl(0 0% 13%)" }}>
              {["Name", "Service / Needs", "Status", "Source", "Date", ""].map(h => (
                <th key={h} style={{ color: "hsl(0 0% 40%)" }} className="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead, i) => {
              const isFunnel = lead.source === "Qualify Funnel";
              const ql = isFunnel ? (lead as QualifyLead) : null;
              return (
                <tr
                  key={lead.id}
                  style={{
                    borderBottom: i < filtered.length - 1 ? "1px solid hsl(0 0% 10%)" : "none",
                    background: isFunnel ? "hsl(220 60% 50% / 0.04)" : undefined,
                  }}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="text-white font-medium">{lead.name}</div>
                      {isFunnel && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/20">NEW</span>
                      )}
                    </div>
                    <div style={{ color: "hsl(0 0% 45%)" }} className="text-xs">{lead.phone}</div>
                    {ql?.email && <div style={{ color: "hsl(0 0% 40%)" }} className="text-xs">{ql.email}</div>}
                    {ql?.role && <div style={{ color: "hsl(220 60% 60%)" }} className="text-[11px] mt-0.5 capitalize">{ql.role.replace("-", " ")}</div>}
                  </td>
                  <td className="px-4 py-3 max-w-[200px]">
                    <div style={{ color: "hsl(0 0% 65%)" }} className="text-xs leading-relaxed">{lead.service}</div>
                    {ql?.timeline && (
                      <div style={{ color: "hsl(0 0% 45%)" }} className="text-[11px] mt-1">
                        Timeline: {ql.timeline === "asap" ? "Right now 🔥" : ql.timeline === "soon" ? "Within 3 months" : "Just exploring"}
                      </div>
                    )}
                    {ql?.address && <div style={{ color: "hsl(0 0% 40%)" }} className="text-[11px]">📍 {ql.address}</div>}
                  </td>
                  <td className="px-4 py-3"><Badge status={lead.status} /></td>
                  <td className="px-4 py-3 text-xs" style={{ color: isFunnel ? "hsl(220 60% 60%)" : "hsl(0 0% 55%)" }}>{lead.source}</td>
                  <td className="px-4 py-3" style={{ color: "hsl(0 0% 45%)" }}>{lead.date}</td>
                  <td className="px-4 py-3">
                    {isFunnel ? (
                      <a href={`tel:${lead.phone?.replace(/\D/g, "")}`} style={{ color: "hsl(120 55% 55%)" }} className="text-xs font-semibold hover:opacity-80 transition-opacity">
                        Call
                      </a>
                    ) : (
                      <button onClick={() => advanceLeadStatus(lead as AdminLead)} style={{ color: "hsl(0 0% 40%)" }} className="hover:text-white transition-colors" title="Advance lead status">
                        <MoreHorizontal size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <QuickCreateDialog
        open={createOpen}
        title="Add Lead"
        subtitle="Create a manual lead that persists in this admin dashboard."
        fields={[
          { name: "name", label: "Name", placeholder: "Customer name" },
          { name: "phone", label: "Phone", placeholder: "(713) 555-0000" },
          { name: "service", label: "Service", defaultValue: "Alarm System" },
          { name: "value", label: "Estimated Value", defaultValue: "$0" },
        ]}
        onClose={() => setCreateOpen(false)}
        onSubmit={addLead}
      />
    </div>
  );
}

function ClientsPage() {
  const [clients, setClients] = useState<AdminClient[]>(() => loadAdminData("tts_admin_clients", mockClients));
  const [createOpen, setCreateOpen] = useState(false);
  const persistClients = (next: AdminClient[]) => {
    setClients(next);
    saveAdminData("tts_admin_clients", next);
  };
  const addClient = (values: Record<string, string>) => {
    const name = values.name;
    if (!name?.trim()) return;
    const client: AdminClient = {
      id: adminId(),
      name: name.trim(),
      type: values.type || "Commercial",
      contact: values.contact || "",
      phone: values.phone || "",
      plan: values.plan || "Standard",
      mrr: values.mrr || "$0",
      since: new Date().getFullYear().toString(),
      status: "pending",
      cameras: 0,
      alarms: 0,
    };
    persistClients([client, ...clients]);
  };
  const cycleClientStatus = (client: AdminClient) => {
    persistClients(clients.map(c => c.id === client.id ? { ...c, status: c.status === "active" ? "pending" : "active" } : c));
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Clients</h1>
          <p style={{ color: "hsl(0 0% 50%)" }} className="text-sm mt-1">Active accounts and service agreements</p>
        </div>
        <button onClick={() => setCreateOpen(true)} style={{ background: "hsl(0 75% 50%)" }} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus size={16} /> Add Client
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total MRR", value: "$12,840", icon: DollarSign },
          { label: "Active Contracts", value: "38", icon: FileText },
          { label: "Renewal This Month", value: "7", icon: RefreshCw },
        ].map(s => (
          <div key={s.label} style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl p-4 flex items-center gap-4">
            <div style={{ background: "hsl(0 0% 12%)" }} className="w-10 h-10 rounded-lg flex items-center justify-center">
              <s.icon size={18} style={{ color: "hsl(0 75% 50%)" }} />
            </div>
            <div>
              <div style={{ color: "hsl(0 0% 50%)" }} className="text-xs">{s.label}</div>
              <div className="text-xl font-bold text-white">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid hsl(0 0% 13%)" }}>
              {["Client", "Type", "Plan", "MRR", "Cameras", "Alarms", "Since", "Status", ""].map(h => (
                <th key={h} style={{ color: "hsl(0 0% 40%)" }} className="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clients.map((c, i) => (
              <tr key={c.id} style={{ borderBottom: i < clients.length - 1 ? "1px solid hsl(0 0% 10%)" : "none" }} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3">
                  <div className="text-white font-medium">{c.name}</div>
                  <div style={{ color: "hsl(0 0% 45%)" }} className="text-xs">{c.contact}</div>
                </td>
                <td className="px-4 py-3" style={{ color: "hsl(0 0% 55%)" }}>{c.type}</td>
                <td className="px-4 py-3">
                  <span style={{ background: "hsl(0 75% 50%/0.15)", color: "hsl(0 75% 60%)", border: "1px solid hsl(0 75% 50%/0.25)" }} className="px-2 py-0.5 rounded text-xs">{c.plan}</span>
                </td>
                <td className="px-4 py-3 text-white font-medium">{c.mrr}</td>
                <td className="px-4 py-3" style={{ color: "hsl(0 0% 55%)" }}>{c.cameras}</td>
                <td className="px-4 py-3" style={{ color: "hsl(0 0% 55%)" }}>{c.alarms}</td>
                <td className="px-4 py-3" style={{ color: "hsl(0 0% 45%)" }}>{c.since}</td>
                <td className="px-4 py-3"><Badge status={c.status} /></td>
                <td className="px-4 py-3">
                  <button onClick={() => cycleClientStatus(c)} style={{ color: "hsl(0 0% 40%)" }} className="hover:text-white transition-colors" title="Toggle active/pending">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <QuickCreateDialog
        open={createOpen}
        title="Add Client"
        subtitle="Create a client/account record that stays in the dashboard."
        fields={[
          { name: "name", label: "Client", placeholder: "Account name" },
          { name: "contact", label: "Contact", placeholder: "Primary contact" },
          { name: "phone", label: "Phone" },
          { name: "type", label: "Type", defaultValue: "Commercial" },
          { name: "plan", label: "Plan", defaultValue: "Standard" },
          { name: "mrr", label: "MRR", defaultValue: "$0" },
        ]}
        onClose={() => setCreateOpen(false)}
        onSubmit={addClient}
      />
    </div>
  );
}

function SchedulePage() {
  const [dateOffset, setDateOffset] = useState(0);
  const [jobs, setJobs] = useState<AdminJob[]>(() => loadAdminData("tts_admin_schedule", mockSchedule));
  const [createOpen, setCreateOpen] = useState(false);
  const today = new Date();
  today.setDate(today.getDate() + dateOffset);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const persistJobs = (next: AdminJob[]) => {
    setJobs(next);
    saveAdminData("tts_admin_schedule", next);
  };
  const bookJob = (values: Record<string, string>) => {
    const client = values.client;
    if (!client?.trim()) return;
    const job: AdminJob = {
      id: adminId(),
      time: values.time || "9:00 AM",
      client: client.trim(),
      address: values.address || "Houston, TX",
      tech: values.tech || "Unassigned",
      type: values.type || "Service",
      status: "pending",
    };
    persistJobs([...jobs, job]);
  };
  const advanceJob = (job: AdminJob) => {
    const order = ["pending", "confirmed", "en-route"];
    const next = order[(order.indexOf(job.status) + 1) % order.length] || "confirmed";
    persistJobs(jobs.map(j => j.id === job.id ? { ...j, status: next } : j));
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Schedule</h1>
          <p style={{ color: "hsl(0 0% 50%)" }} className="text-sm mt-1">{days[today.getDay()]}, {months[today.getMonth()]} {today.getDate()}, {today.getFullYear()}</p>
        </div>
        <button onClick={() => setCreateOpen(true)} style={{ background: "hsl(0 75% 50%)" }} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus size={16} /> Book Job
        </button>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {[
          { label: "Today's Jobs", value: "5" },
          { label: "Confirmed", value: "3" },
          { label: "Pending", value: "1" },
          { label: "En Route", value: "1" },
          { label: "Completed MTD", value: "47" },
        ].map(s => (
          <div key={s.label} style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{s.value}</div>
            <div style={{ color: "hsl(0 0% 50%)" }} className="text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "hsl(0 0% 14%)" }}>
          <h2 className="text-white font-semibold">Today's Appointments</h2>
          <div className="flex items-center gap-2">
            <button onClick={() => setDateOffset(o => o - 1)} style={{ background: "hsl(0 0% 12%)", border: "1px solid hsl(0 0% 18%)" }} className="p-1.5 rounded-lg"><ChevronLeft size={14} style={{ color: "hsl(0 0% 55%)" }} /></button>
            <button onClick={() => setDateOffset(o => o + 1)} style={{ background: "hsl(0 0% 12%)", border: "1px solid hsl(0 0% 18%)" }} className="p-1.5 rounded-lg"><ChevronRight size={14} style={{ color: "hsl(0 0% 55%)" }} /></button>
          </div>
        </div>
        <div className="divide-y" style={{ borderColor: "hsl(0 0% 10%)" }}>
          {jobs.map(job => (
            <button key={job.id} onClick={() => advanceJob(job)} className="w-full text-left flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors">
              <div className="w-20 text-right">
                <span style={{ color: "hsl(0 75% 55%)" }} className="text-sm font-semibold">{job.time}</span>
              </div>
              <div style={{ width: 1, height: 40, background: "hsl(0 0% 16%)" }} />
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-white font-medium">{job.client}</span>
                  <span style={{ background: "hsl(0 0% 12%)", color: "hsl(0 0% 55%)" }} className="text-xs px-2 py-0.5 rounded">{job.type}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin size={12} style={{ color: "hsl(0 0% 40%)" }} />
                  <span style={{ color: "hsl(0 0% 45%)" }} className="text-xs">{job.address}</span>
                </div>
              </div>
              <div className="text-right">
                <div style={{ color: "hsl(0 0% 55%)" }} className="text-xs mb-1">Tech: {job.tech}</div>
                <Badge status={job.status} />
              </div>
            </button>
          ))}
        </div>
      </div>
      <QuickCreateDialog
        open={createOpen}
        title="Book Job"
        subtitle="Add an appointment to the operational schedule."
        fields={[
          { name: "client", label: "Client", placeholder: "Customer or account" },
          { name: "type", label: "Job Type", defaultValue: "Installation" },
          { name: "time", label: "Time", defaultValue: "9:00 AM" },
          { name: "address", label: "Address", defaultValue: "Houston, TX" },
          { name: "tech", label: "Technician", defaultValue: "Unassigned" },
        ]}
        onClose={() => setCreateOpen(false)}
        onSubmit={bookJob}
      />
    </div>
  );
}

function EmployeesPage() {
  const [employees, setEmployees] = useState<AdminEmployee[]>(() => loadAdminData("tts_admin_employees", mockEmployees));
  const [createOpen, setCreateOpen] = useState(false);
  const persistEmployees = (next: AdminEmployee[]) => {
    setEmployees(next);
    saveAdminData("tts_admin_employees", next);
  };
  const addEmployee = (values: Record<string, string>) => {
    const name = values.name;
    if (!name?.trim()) return;
    const employee: AdminEmployee = {
      id: adminId(),
      name: name.trim(),
      role: values.role || "Team Member",
      phone: values.phone || "",
      email: values.email || "",
      status: "active",
      dept: values.dept || "Operations",
      hire: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      jobs: 0,
      rating: 5,
    };
    persistEmployees([employee, ...employees]);
  };
  const toggleEmployee = (employee: AdminEmployee) => {
    persistEmployees(employees.map(e => e.id === employee.id ? { ...e, status: e.status === "active" ? "off" : "active" } : e));
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Employees</h1>
          <p style={{ color: "hsl(0 0% 50%)" }} className="text-sm mt-1">{employees.length} team members</p>
        </div>
        <button onClick={() => setCreateOpen(true)} style={{ background: "hsl(0 75% 50%)" }} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity">
          <UserPlus size={16} /> Add Employee
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Staff", value: "4", icon: Users },
          { label: "Field Techs", value: "3", icon: Briefcase },
          { label: "Avg Rating", value: "4.7", icon: Star },
          { label: "Jobs Completed", value: "691", icon: CheckCircle2 },
        ].map(s => (
          <div key={s.label} style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl p-4 flex items-center gap-3">
            <div style={{ background: "hsl(0 0% 12%)" }} className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0">
              <s.icon size={16} style={{ color: "hsl(0 75% 50%)" }} />
            </div>
            <div>
              <div style={{ color: "hsl(0 0% 50%)" }} className="text-xs">{s.label}</div>
              <div className="text-xl font-bold text-white">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4">
        {employees.map(emp => (
          <div key={emp.id} style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl p-4 flex items-center gap-5">
            <div style={{ background: "hsl(0 75% 50%/0.15)", border: "1px solid hsl(0 75% 50%/0.25)", color: "hsl(0 75% 60%)" }} className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold">
              {emp.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="text-white font-semibold">{emp.name}</span>
                <Badge status={emp.status} />
              </div>
              <div style={{ color: "hsl(0 0% 50%)" }} className="text-xs mt-0.5">{emp.role} · {emp.dept} · Hired {emp.hire}</div>
            </div>
            <div className="hidden lg:flex items-center gap-8 text-center">
              <div>
                <div className="text-white font-semibold">{emp.jobs}</div>
                <div style={{ color: "hsl(0 0% 45%)" }} className="text-xs">Jobs</div>
              </div>
              <div>
                <div className="text-white font-semibold">{emp.rating} ★</div>
                <div style={{ color: "hsl(0 0% 45%)" }} className="text-xs">Rating</div>
              </div>
              <div>
                <div style={{ color: "hsl(0 0% 50%)" }} className="text-sm">{emp.phone}</div>
                <div style={{ color: "hsl(0 0% 40%)" }} className="text-xs">{emp.email}</div>
              </div>
            </div>
            <button onClick={() => toggleEmployee(emp)} style={{ color: "hsl(0 0% 40%)" }} className="hover:text-white transition-colors ml-2" title="Toggle active/off">
              <MoreHorizontal size={18} />
            </button>
          </div>
        ))}
      </div>
      <QuickCreateDialog
        open={createOpen}
        title="Add Team Member"
        subtitle="Create a team profile for scheduling and time clock workflows."
        fields={[
          { name: "name", label: "Name" },
          { name: "role", label: "Role", defaultValue: "Technician" },
          { name: "dept", label: "Department", defaultValue: "Operations" },
          { name: "phone", label: "Phone" },
          { name: "email", label: "Email" },
        ]}
        onClose={() => setCreateOpen(false)}
        onSubmit={addEmployee}
      />
    </div>
  );
}

function TimeClockPage() {
  const employees = loadAdminData<AdminEmployee>("tts_admin_employees", mockEmployees);
  const [clockedIn, setClockedIn] = useState<Record<number, boolean>>({
    1: true, 2: true, 3: true, 4: false, 5: false,
  });
  const [times, setTimes] = useState<Record<number, string>>({
    1: "7:52 AM", 2: "8:10 AM", 3: "8:30 AM",
  });

  const toggle = (id: number) => {
    setClockedIn(prev => {
      const next = { ...prev, [id]: !prev[id] };
      if (next[id]) {
        const now = new Date();
        setTimes(t => ({ ...t, [id]: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }));
      }
      return next;
    });
  };

  const weeklyHours = [
    { name: "Jake Morales", mon: 8.5, tue: 9, wed: 8, thu: 8.5, fri: 7, total: 41, ot: 1 },
    { name: "Chris Owens", mon: 8, tue: 8.5, wed: 9, thu: 8, fri: 8.5, total: 42, ot: 2 },
    { name: "Maria Santos", mon: 7.5, tue: 8, wed: 8, thu: 7.5, fri: 8, total: 39, ot: 0 },
    { name: "Devon Price", mon: 8, tue: 8, wed: 8, thu: 8, fri: 8, total: 40, ot: 0 },
    { name: "Tanya Brooks", mon: 0, tue: 8, wed: 8, thu: 8, fri: 0, total: 24, ot: 0 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Time Clock</h1>
        <p style={{ color: "hsl(0 0% 50%)" }} className="text-sm mt-1">Track clock-in/out, daily attendance, and weekly hours</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Clocked In Now", value: "3" },
          { label: "On Break", value: "0" },
          { label: "Off Today", value: "2" },
          { label: "Avg Hours / Week", value: "37.2" },
        ].map(s => (
          <div key={s.label} style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{s.value}</div>
            <div style={{ color: "hsl(0 0% 50%)" }} className="text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b" style={{ borderColor: "hsl(0 0% 14%)" }}>
          <h2 className="text-white font-semibold">Today — Clock Status</h2>
        </div>
        <div className="divide-y" style={{ borderColor: "hsl(0 0% 10%)" }}>
          {employees.map(emp => (
            <div key={emp.id} className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${clockedIn[emp.id] ? "bg-emerald-400" : "bg-gray-600"}`} />
                <span className="text-white">{emp.name}</span>
                <span style={{ color: "hsl(0 0% 45%)" }} className="text-xs">{emp.role}</span>
              </div>
              <div className="flex items-center gap-4">
                {clockedIn[emp.id] && times[emp.id] && (
                  <span style={{ color: "hsl(0 0% 50%)" }} className="text-xs">In at {times[emp.id]}</span>
                )}
                <button
                  onClick={() => toggle(emp.id)}
                  style={{
                    background: clockedIn[emp.id] ? "hsl(0 0% 14%)" : "hsl(0 75% 50%)",
                    border: clockedIn[emp.id] ? "1px solid hsl(0 0% 20%)" : "none",
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all"
                >
                  {clockedIn[emp.id] ? "Clock Out" : "Clock In"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b" style={{ borderColor: "hsl(0 0% 14%)" }}>
          <h2 className="text-white font-semibold">Weekly Hours — This Week</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid hsl(0 0% 13%)" }}>
                {["Employee", "Mon", "Tue", "Wed", "Thu", "Fri", "Total", "OT"].map(h => (
                  <th key={h} style={{ color: "hsl(0 0% 40%)" }} className="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeklyHours.map((row, i) => (
                <tr key={row.name} style={{ borderBottom: i < weeklyHours.length - 1 ? "1px solid hsl(0 0% 10%)" : "none" }}>
                  <td className="px-4 py-3 text-white font-medium">{row.name}</td>
                  {[row.mon, row.tue, row.wed, row.thu, row.fri].map((h, j) => (
                    <td key={j} className="px-4 py-3" style={{ color: h === 0 ? "hsl(0 0% 35%)" : "hsl(0 0% 65%)" }}>{h > 0 ? `${h}h` : "—"}</td>
                  ))}
                  <td className="px-4 py-3 text-white font-semibold">{row.total}h</td>
                  <td className="px-4 py-3">
                    {row.ot > 0
                      ? <span className="text-orange-400 text-xs font-medium">+{row.ot}h OT</span>
                      : <span style={{ color: "hsl(0 0% 35%)" }} className="text-xs">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p style={{ color: "hsl(0 0% 50%)" }} className="text-sm mt-1">Performance metrics and growth tracking</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Conversion Rate" value="19.3%" sub="Leads → Clients" icon={Target} trend="+2.1% vs last month" trendDir="up" />
        <StatCard label="Avg Deal Size" value="$4,820" sub="All services" icon={DollarSign} trend="+$340 avg" trendDir="up" />
        <StatCard label="Customer LTV" value="$11,200" sub="36-mo average" icon={TrendingUp} trend="+8% YoY" trendDir="up" />
        <StatCard label="Churn Rate" value="2.1%" sub="Monthly" icon={TrendingDown} trend="-0.4% vs last month" trendDir="up" />
      </div>

      <div style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl p-5">
        <h2 className="text-white font-semibold mb-6">Revenue vs Lead Volume</h2>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 14%)" />
            <XAxis dataKey="month" tick={{ fill: "hsl(0 0% 45%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fill: "hsl(0 0% 45%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: "hsl(0 0% 45%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "hsl(0 0% 10%)", border: "1px solid hsl(0 0% 18%)", borderRadius: 8, color: "#fff" }} />
            <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="hsl(0 75% 50%)" strokeWidth={2} dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="leads" stroke="hsl(210 80% 60%)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl p-5">
          <h2 className="text-white font-semibold mb-6">Lead Sources</h2>
          {[
            { source: "Google Ads", pct: 42, count: 74 },
            { source: "Referrals", pct: 28, count: 49 },
            { source: "Facebook", pct: 15, count: 26 },
            { source: "Website Organic", pct: 10, count: 18 },
            { source: "Yelp / Other", pct: 5, count: 9 },
          ].map(s => (
            <div key={s.source} className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span style={{ color: "hsl(0 0% 65%)" }} className="text-sm">{s.source}</span>
                <span className="text-white text-sm">{s.count} leads ({s.pct}%)</span>
              </div>
              <div style={{ background: "hsl(0 0% 14%)" }} className="h-1.5 rounded-full overflow-hidden">
                <div style={{ width: `${s.pct}%`, background: "hsl(0 75% 50%)" }} className="h-full rounded-full" />
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl p-5">
          <h2 className="text-white font-semibold mb-6">Website Traffic This Week</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 14%)" />
              <XAxis dataKey="day" tick={{ fill: "hsl(0 0% 45%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(0 0% 45%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(0 0% 10%)", border: "1px solid hsl(0 0% 18%)", borderRadius: 8, color: "#fff" }} />
              <Bar dataKey="visitors" fill="hsl(0 75% 50%)" radius={[4, 4, 0, 0]} name="Visitors" />
              <Bar dataKey="pageViews" fill="hsl(0 0% 22%)" radius={[4, 4, 0, 0]} name="Page Views" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function EmailPage() {
  const [campaigns, setCampaigns] = useState<AdminCampaign[]>(() => loadAdminData("tts_admin_campaigns", mockCampaigns));
  const [createOpen, setCreateOpen] = useState(false);
  const [flows, setFlows] = useState(() => loadAdminData("tts_admin_flows", [
    { name: "New Lead Nurture", trigger: "Lead form submit", steps: 5, active: true },
    { name: "Post-Install Follow-Up", trigger: "Job marked complete", steps: 3, active: true },
    { name: "Renewal Reminder", trigger: "30 days before renewal", steps: 4, active: false },
    { name: "Review Request", trigger: "7 days post-install", steps: 2, active: true },
    { name: "Win-Back Campaign", trigger: "90 days inactive", steps: 6, active: false },
    { name: "HOA Prospecting", trigger: "Manual trigger", steps: 8, active: false },
  ]));
  const persistCampaigns = (next: AdminCampaign[]) => {
    setCampaigns(next);
    saveAdminData("tts_admin_campaigns", next);
  };
  const persistFlows = (next: typeof flows) => {
    setFlows(next);
    saveAdminData("tts_admin_flows", next);
  };
  const newCampaign = (values: Record<string, string>) => {
    const name = values.name;
    if (!name?.trim()) return;
    const campaign: AdminCampaign = {
      id: adminId(),
      name: name.trim(),
      status: "draft",
      sent: 0,
      opened: 0,
      clicked: 0,
      segment: values.segment || "All Leads",
      date: "—",
    };
    persistCampaigns([campaign, ...campaigns]);
  };
  const advanceCampaign = (campaign: AdminCampaign) => {
    const nextStatus = campaign.status === "draft" ? "scheduled" : campaign.status === "scheduled" ? "active" : campaign.status === "active" ? "sent" : "draft";
    persistCampaigns(campaigns.map(c => c.id === campaign.id ? { ...c, status: nextStatus, date: nextStatus === "sent" ? new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }) : c.date } : c));
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Email Marketing</h1>
          <p style={{ color: "hsl(0 0% 50%)" }} className="text-sm mt-1">Campaigns, automations, and subscriber segments</p>
        </div>
        <button onClick={() => setCreateOpen(true)} style={{ background: "hsl(0 75% 50%)" }} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus size={16} /> New Campaign
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Subscribers", value: "6,840" },
          { label: "Avg Open Rate", value: "38.2%" },
          { label: "Avg Click Rate", value: "8.5%" },
          { label: "Unsubscribes (30d)", value: "24" },
        ].map(s => (
          <div key={s.label} style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{s.value}</div>
            <div style={{ color: "hsl(0 0% 50%)" }} className="text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b" style={{ borderColor: "hsl(0 0% 14%)" }}>
          <h2 className="text-white font-semibold">Campaigns</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid hsl(0 0% 13%)" }}>
              {["Campaign", "Segment", "Status", "Sent", "Opened", "Clicked", "Date", ""].map(h => (
                <th key={h} style={{ color: "hsl(0 0% 40%)" }} className="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c, i) => (
              <tr key={c.id} style={{ borderBottom: i < campaigns.length - 1 ? "1px solid hsl(0 0% 10%)" : "none" }} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 text-white font-medium">{c.name}</td>
                <td className="px-4 py-3" style={{ color: "hsl(0 0% 55%)" }}>{c.segment}</td>
                <td className="px-4 py-3"><Badge status={c.status} /></td>
                <td className="px-4 py-3" style={{ color: "hsl(0 0% 65%)" }}>{c.sent > 0 ? c.sent.toLocaleString() : "—"}</td>
                <td className="px-4 py-3">
                  {c.opened > 0 ? (
                    <span className="text-emerald-400">{c.opened.toLocaleString()} <span style={{ color: "hsl(0 0% 45%)" }} className="text-xs">({Math.round(c.opened / c.sent * 100)}%)</span></span>
                  ) : "—"}
                </td>
                <td className="px-4 py-3">
                  {c.clicked > 0 ? (
                    <span style={{ color: "hsl(210 80% 60%)" }}>{c.clicked.toLocaleString()}</span>
                  ) : "—"}
                </td>
                <td className="px-4 py-3" style={{ color: "hsl(0 0% 45%)" }}>{c.date}</td>
                <td className="px-4 py-3">
                  <button onClick={() => advanceCampaign(c)} style={{ color: "hsl(0 0% 40%)" }} className="hover:text-white transition-colors" title="Advance campaign status">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl p-5">
        <h2 className="text-white font-semibold mb-5">Automation Flows</h2>
        <div className="grid lg:grid-cols-3 gap-4">
          {flows.map(flow => (
            <div key={flow.name} style={{ background: "hsl(0 0% 11%)", border: "1px solid hsl(0 0% 16%)" }} className="rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <span className="text-white text-sm font-medium">{flow.name}</span>
                <button onClick={() => persistFlows(flows.map(f => f.name === flow.name ? { ...f, active: !f.active } : f))} className={`w-8 h-4 rounded-full flex items-center transition-all ${flow.active ? "justify-end bg-red-600" : "justify-start bg-gray-700"}`}>
                  <div className="w-3 h-3 rounded-full bg-white mx-0.5" />
                </button>
              </div>
              <div style={{ color: "hsl(0 0% 45%)" }} className="text-xs">{flow.trigger}</div>
              <div style={{ color: "hsl(0 0% 40%)" }} className="text-xs mt-2">{flow.steps} steps</div>
            </div>
          ))}
        </div>
      </div>
      <QuickCreateDialog
        open={createOpen}
        title="New Campaign"
        subtitle="Create a draft campaign and move it through scheduled, active, and sent states."
        fields={[
          { name: "name", label: "Campaign Name" },
          { name: "segment", label: "Segment", defaultValue: "All Leads" },
        ]}
        onClose={() => setCreateOpen(false)}
        onSubmit={newCampaign}
      />
    </div>
  );
}

function LiveChatPage() {
  const { sessions, addMessage, markAllRead } = useChatContext();
  const [selected, setSelected] = useState<string | null>(sessions[0]?.id ?? null);
  const [reply, setReply] = useState("");
  const activeSession = sessions.find(s => s.id === selected);

  const handleReply = () => {
    if (!reply.trim() || !selected) return;
    addMessage(selected, reply.trim(), "agent");
    setReply("");
  };

  return (
    <div className="space-y-4 h-full">
      <div>
        <h1 className="text-2xl font-bold text-white">Live Chat</h1>
        <p style={{ color: "hsl(0 0% 50%)" }} className="text-sm mt-1">{sessions.length} session{sessions.length !== 1 ? "s" : ""} · {sessions.filter(s => s.status === "active").length} active</p>
      </div>

      <div style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)", minHeight: 520 }} className="rounded-xl overflow-hidden flex">
        {/* Session list */}
        <div className="w-72 flex-shrink-0 border-r overflow-y-auto" style={{ borderColor: "hsl(0 0% 14%)" }}>
          {sessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <MessageSquare size={32} style={{ color: "hsl(0 0% 30%)" }} />
              <p style={{ color: "hsl(0 0% 40%)" }} className="text-sm text-center px-4">No chat sessions yet.<br />Chats from the website appear here.</p>
            </div>
          ) : sessions.map(s => {
            const unread = s.messages.filter(m => m.role === "visitor" && !m.read).length;
            const last = s.messages[s.messages.length - 1];
            return (
              <button
                key={s.id}
                onClick={() => { setSelected(s.id); markAllRead(s.id); }}
                className="w-full text-left px-4 py-3 transition-colors hover:bg-white/[0.03] border-b"
                style={{
                  borderColor: "hsl(0 0% 12%)",
                  background: selected === s.id ? "hsl(0 0% 11%)" : "transparent",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm font-medium truncate">{s.visitorName}</span>
                  {unread > 0 && (
                    <span style={{ background: "hsl(0 75% 50%)" }} className="text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{unread}</span>
                  )}
                </div>
                <div style={{ color: "hsl(0 0% 40%)" }} className="text-xs mt-0.5 truncate">{last?.content ?? "No messages"}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span style={{ color: "hsl(0 0% 35%)" }} className="text-xs">{s.page}</span>
                  <Badge status={s.status} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Conversation */}
        <div className="flex-1 flex flex-col">
          {activeSession ? (
            <>
              <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "hsl(0 0% 14%)" }}>
                <div>
                  <div className="text-white font-semibold">{activeSession.visitorName}</div>
                  <div style={{ color: "hsl(0 0% 45%)" }} className="text-xs">{activeSession.visitorEmail} · {activeSession.page}</div>
                </div>
                <Badge status={activeSession.status} />
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-3" style={{ minHeight: 340 }}>
                {activeSession.messages.length === 0 && (
                  <p style={{ color: "hsl(0 0% 35%)" }} className="text-sm text-center py-8">No messages yet</p>
                )}
                {activeSession.messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.role === "visitor" ? "justify-start" : "justify-end"}`}>
                    <div
                      style={{
                        background: msg.role === "visitor" ? "hsl(0 0% 13%)" : msg.role === "agent" ? "hsl(0 75% 50%)" : "hsl(0 0% 16%)",
                        maxWidth: "70%",
                      }}
                      className="rounded-xl px-4 py-2.5"
                    >
                      <div className="text-white text-sm">{msg.content}</div>
                      <div style={{ color: msg.role === "agent" ? "rgba(255,255,255,0.6)" : "hsl(0 0% 40%)" }} className="text-xs mt-1">
                        {msg.role === "agent" ? "You" : msg.role === "bot" ? "Bot" : activeSession.visitorName}
                        {" · "}{new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t flex gap-3" style={{ borderColor: "hsl(0 0% 14%)" }}>
                <input
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleReply()}
                  placeholder="Type a reply…"
                  style={{ background: "hsl(0 0% 11%)", border: "1px solid hsl(0 0% 18%)", color: "white" }}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm placeholder:text-gray-600 focus:outline-none"
                />
                <button
                  onClick={handleReply}
                  style={{ background: "hsl(0 75% 50%)" }}
                  className="px-4 py-2.5 rounded-lg text-white flex items-center gap-2 text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <Send size={15} /> Send
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p style={{ color: "hsl(0 0% 35%)" }} className="text-sm">Select a conversation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(() => loadAdminData("tts_admin_users", mockUsers));
  const [createOpen, setCreateOpen] = useState(false);
  const persistUsers = (next: AdminUser[]) => {
    setUsers(next);
    saveAdminData("tts_admin_users", next);
  };
  const inviteUser = (values: Record<string, string>) => {
    const email = values.email;
    if (!email?.trim()) return;
    const user: AdminUser = {
      id: adminId(),
      name: values.name || email.split("@")[0],
      email: email.trim(),
      role: values.role || "Sales",
      lastLogin: "Invited",
      status: "pending",
    };
    persistUsers([user, ...users]);
  };
  const deleteUser = (id: number) => persistUsers(users.filter(user => user.id !== id));
  const cycleRole = (user: AdminUser) => {
    const roles = ["Owner", "Sales", "Dispatcher", "Technician"];
    const nextRole = roles[(roles.indexOf(user.role) + 1) % roles.length] || "Sales";
    persistUsers(users.map(u => u.id === user.id ? { ...u, role: nextRole } : u));
  };
  const permissions = ["View Dashboard", "Manage Leads", "Manage Clients", "Manage Schedule", "Manage Employees", "View Analytics", "Email Marketing", "Admin Settings"];
  const rolePerms: Record<string, boolean[]> = {
    Owner:      [true, true, true, true, true, true, true, true],
    Sales:      [true, true, true, false, false, true, true, false],
    Dispatcher: [true, false, true, true, false, false, false, false],
    Technician: [false, false, false, true, false, false, false, false],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Users & Access</h1>
          <p style={{ color: "hsl(0 0% 50%)" }} className="text-sm mt-1">Manage platform users and role permissions</p>
        </div>
        <button onClick={() => setCreateOpen(true)} style={{ background: "hsl(0 75% 50%)" }} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity">
          <UserPlus size={16} /> Invite User
        </button>
      </div>

      <div style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid hsl(0 0% 13%)" }}>
              {["User", "Role", "Last Login", "Status", ""].map(h => (
                <th key={h} style={{ color: "hsl(0 0% 40%)" }} className="text-left px-5 py-3 font-medium text-xs uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u.id} style={{ borderBottom: i < users.length - 1 ? "1px solid hsl(0 0% 10%)" : "none" }} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-4">
                  <div className="text-white font-medium">{u.name}</div>
                  <div style={{ color: "hsl(0 0% 45%)" }} className="text-xs">{u.email}</div>
                </td>
                <td className="px-5 py-4">
                  <span style={{ background: "hsl(0 0% 13%)", color: "hsl(0 0% 65%)", border: "1px solid hsl(0 0% 20%)" }} className="px-2 py-0.5 rounded text-xs">{u.role}</span>
                </td>
                <td className="px-5 py-4" style={{ color: "hsl(0 0% 50%)" }}>{u.lastLogin}</td>
                <td className="px-5 py-4"><Badge status={u.status} /></td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => cycleRole(u)} style={{ color: "hsl(0 0% 40%)" }} className="hover:text-white transition-colors" title="Cycle role"><Pencil size={15} /></button>
                    <button onClick={() => deleteUser(u.id)} style={{ color: "hsl(0 0% 40%)" }} className="hover:text-red-400 transition-colors" title="Delete user"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b" style={{ borderColor: "hsl(0 0% 14%)" }}>
          <h2 className="text-white font-semibold">Role Permissions Matrix</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid hsl(0 0% 13%)" }}>
                <th style={{ color: "hsl(0 0% 40%)" }} className="text-left px-5 py-3 font-medium text-xs uppercase tracking-wider">Permission</th>
                {Object.keys(rolePerms).map(role => (
                  <th key={role} style={{ color: "hsl(0 0% 55%)" }} className="text-center px-5 py-3 font-medium text-xs uppercase tracking-wider">{role}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((perm, pi) => (
                <tr key={perm} style={{ borderBottom: pi < permissions.length - 1 ? "1px solid hsl(0 0% 10%)" : "none" }}>
                  <td className="px-5 py-3" style={{ color: "hsl(0 0% 65%)" }}>{perm}</td>
                  {Object.values(rolePerms).map((perms, ri) => (
                    <td key={ri} className="px-5 py-3 text-center">
                      {perms[pi]
                        ? <Check size={16} className="mx-auto text-emerald-400" />
                        : <X size={16} className="mx-auto" style={{ color: "hsl(0 0% 25%)" }} />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <QuickCreateDialog
        open={createOpen}
        title="Invite User"
        subtitle="Add a dashboard user with an initial role."
        fields={[
          { name: "name", label: "Name" },
          { name: "email", label: "Email" },
          { name: "role", label: "Role", defaultValue: "Sales" },
        ]}
        onClose={() => setCreateOpen(false)}
        onSubmit={inviteUser}
      />
    </div>
  );
}

function SettingsPage() {
  const [notifs, setNotifs] = useState({ newLead: true, jobComplete: true, chat: true, review: false, billing: true });
  const [saved, setSaved] = useState(false);
  const [company, setCompany] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") return {};
    try { return JSON.parse(localStorage.getItem("tts_admin_company") || "{}"); } catch { return {}; }
  });
  const [integrations, setIntegrations] = useState(() => loadAdminData("tts_admin_integrations", [
    { name: "ElevenLabs Voice AI", desc: "Live chat voice integration", connected: true },
    { name: "Google Analytics", desc: "Website traffic and conversion tracking", connected: true },
    { name: "Alarm.com", desc: "Monitoring and device management", connected: false },
    { name: "QuickBooks", desc: "Invoicing and accounting sync", connected: false },
    { name: "Google My Business", desc: "Reviews and local listings", connected: true },
    { name: "Twilio SMS", desc: "Automated appointment reminders", connected: false },
  ]));
  const companyFields = [
    { label: "Company Name", value: "Texas Total Security" },
    { label: "Phone", value: "(281) 407-0766" },
    { label: "Email", value: "info@texastotalsecurity.com" },
    { label: "Website", value: "texastotalsecurity.com" },
    { label: "Address", value: "Houston, TX" },
    { label: "License #", value: "ACR-1741234" },
  ];
  const saveSettings = () => {
    localStorage.setItem("tts_admin_company", JSON.stringify(company));
    localStorage.setItem("tts_admin_notifications", JSON.stringify(notifs));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };
  const toggleIntegration = (name: string) => {
    const next = integrations.map(intg => intg.name === name ? { ...intg, connected: !intg.connected } : intg);
    setIntegrations(next);
    saveAdminData("tts_admin_integrations", next);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p style={{ color: "hsl(0 0% 50%)" }} className="text-sm mt-1">Company configuration and integrations</p>
      </div>

      <div style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl p-5">
        <h2 className="text-white font-semibold mb-5">Company Information</h2>
        <div className="grid grid-cols-2 gap-4">
          {companyFields.map(f => (
            <div key={f.label}>
              <label style={{ color: "hsl(0 0% 45%)" }} className="text-xs block mb-1">{f.label}</label>
              <input
                value={company[f.label] ?? f.value}
                onChange={e => setCompany(c => ({ ...c, [f.label]: e.target.value }))}
                style={{ background: "hsl(0 0% 11%)", border: "1px solid hsl(0 0% 18%)", color: "white" }}
                className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-red-600/50"
              />
            </div>
          ))}
        </div>
        <button onClick={saveSettings} style={{ background: "hsl(0 75% 50%)" }} className="mt-5 px-5 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity">
          {saved ? "Saved" : "Save Changes"}
        </button>
      </div>

      <div style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl p-5">
        <h2 className="text-white font-semibold mb-5">Integrations</h2>
        <div className="grid lg:grid-cols-2 gap-4">
          {integrations.map(intg => (
            <div key={intg.name} style={{ background: "hsl(0 0% 11%)", border: "1px solid hsl(0 0% 16%)" }} className="rounded-lg p-4 flex items-center justify-between">
              <div>
                <div className="text-white text-sm font-medium">{intg.name}</div>
                <div style={{ color: "hsl(0 0% 45%)" }} className="text-xs mt-0.5">{intg.desc}</div>
              </div>
              <button
                onClick={() => toggleIntegration(intg.name)}
                style={{
                  background: intg.connected ? "hsl(145 60% 40%/0.2)" : "hsl(0 75% 50%)",
                  border: intg.connected ? "1px solid hsl(145 60% 40%/0.35)" : "none",
                  color: intg.connected ? "hsl(145 70% 55%)" : "white",
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium"
              >
                {intg.connected ? "Connected" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl p-5">
        <h2 className="text-white font-semibold mb-5">Notifications</h2>
        <div className="space-y-4">
          {(Object.keys(notifs) as Array<keyof typeof notifs>).map(key => {
            const labels: Record<keyof typeof notifs, string> = {
              newLead: "New lead submitted via website",
              jobComplete: "Job marked as complete by technician",
              chat: "New live chat message received",
              review: "New Google review posted",
              billing: "Payment received or invoice due",
            };
            return (
              <div key={key} className="flex items-center justify-between">
                <span style={{ color: "hsl(0 0% 65%)" }} className="text-sm">{labels[key]}</span>
                <button
                  onClick={() => setNotifs(n => ({ ...n, [key]: !n[key] }))}
                  style={{ background: notifs[key] ? "hsl(0 75% 50%)" : "hsl(0 0% 18%)" }}
                  className="w-10 h-5 rounded-full transition-colors relative flex items-center"
                >
                  <div className={`w-3.5 h-3.5 rounded-full bg-white absolute transition-all ${notifs[key] ? "left-[22px]" : "left-[3px]"}`} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Form Submissions Page ────────────────────────────────────────────────────

function FormSubmissionsPage() {
  const [tab, setTab] = useState<"website" | "assessment" | "switch">("website");
  const [websiteLeads, setWebsiteLeads] = useState<WebsiteLeadSubmission[]>(() => loadWebsiteLeads());
  const [assessmentLeads, setAssessmentLeads] = useState<AssessmentLead[]>(() => loadAssessmentLeads());
  const [switchLeads, setSwitchLeads] = useState<SwitchLead[]>(() => loadSwitchLeads());
  const [expanded, setExpanded] = useState<string | number | null>(null);

  const refreshWebsite = () => setWebsiteLeads(loadWebsiteLeads());
  const refreshAssessment = () => setAssessmentLeads(loadAssessmentLeads());
  const refreshSwitch = () => setSwitchLeads(loadSwitchLeads());

  const handleDeleteAssessment = (id: number) => {
    deleteAssessmentLead(id);
    refreshAssessment();
    if (expanded === id) setExpanded(null);
  };
  const handleDeleteSwitch = (id: number) => {
    deleteSwitchLead(id);
    refreshSwitch();
    if (expanded === id) setExpanded(null);
  };
  const clearAllAssessment = () => {
    localStorage.removeItem("tts_assessment_leads");
    setAssessmentLeads([]);
    setExpanded(null);
  };
  const clearAllSwitch = () => {
    localStorage.removeItem("tts_switch_leads");
    setSwitchLeads([]);
    setExpanded(null);
  };
  const handleDeleteWebsite = (id: string) => {
    deleteWebsiteLead(id);
    refreshWebsite();
    if (expanded === id) setExpanded(null);
  };
  const clearAllWebsite = () => {
    clearWebsiteLeads();
    setWebsiteLeads([]);
    setExpanded(null);
  };

  const fmt = (iso: string) => {
    try {
      return new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
    } catch { return iso; }
  };

  const rowStyle = { borderBottom: "1px solid hsl(0 0% 11%)" };
  const cellStyle: React.CSSProperties = { color: "hsl(0 0% 65%)", fontSize: 13, padding: "12px 16px", verticalAlign: "top" };
  const headStyle: React.CSSProperties = { color: "hsl(0 0% 40%)", fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.07em", padding: "10px 16px" };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Form Submissions</h1>
          <p style={{ color: "hsl(0 0% 50%)" }} className="text-sm mt-1">
            Quick leads, guided requests, property assessments, and alarm switch requests from website forms
          </p>
        </div>
        <div className="flex gap-2">
          {tab === "website" && websiteLeads.length > 0 && (
            <button
              onClick={clearAllWebsite}
              style={{ background: "hsl(0 0% 12%)", border: "1px solid hsl(0 0% 18%)", color: "hsl(0 75% 55%)" }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
            >
              <Trash2 size={14} /> Clear All
            </button>
          )}
          {tab === "assessment" && assessmentLeads.length > 0 && (
            <button
              onClick={clearAllAssessment}
              style={{ background: "hsl(0 0% 12%)", border: "1px solid hsl(0 0% 18%)", color: "hsl(0 75% 55%)" }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
            >
              <Trash2 size={14} /> Clear All
            </button>
          )}
          {tab === "switch" && switchLeads.length > 0 && (
            <button
              onClick={clearAllSwitch}
              style={{ background: "hsl(0 0% 12%)", border: "1px solid hsl(0 0% 18%)", color: "hsl(0 75% 55%)" }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
            >
              <Trash2 size={14} /> Clear All
            </button>
          )}
          <button
            onClick={tab === "website" ? refreshWebsite : tab === "assessment" ? refreshAssessment : refreshSwitch}
            style={{ background: "hsl(0 0% 12%)", border: "1px solid hsl(0 0% 18%)", color: "hsl(0 0% 55%)" }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
          >
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Website Leads", value: websiteLeads.length, color: "text-emerald-400" },
          { label: "Property Assessments", value: assessmentLeads.length, color: "text-red-400" },
          { label: "Switch Requests", value: switchLeads.length, color: "text-blue-400" },
          { label: "Today", value: [...websiteLeads, ...assessmentLeads, ...switchLeads].filter(l => {
            const d = new Date(l.submittedAt);
            const now = new Date();
            return d.toDateString() === now.toDateString();
          }).length, color: "text-emerald-400" },
        ].map(s => (
          <div key={s.label} style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl p-4">
            <div style={{ color: "hsl(0 0% 50%)" }} className="text-xs mb-1">{s.label}</div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Tab switcher */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }}>
        {([["website", "Website Leads", websiteLeads.length], ["assessment", "Property Assessments", assessmentLeads.length], ["switch", "Switch Requests", switchLeads.length]] as const).map(([key, label, count]) => (
          <button
            key={key}
            onClick={() => { setTab(key); setExpanded(null); }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150"
            style={{
              background: tab === key ? "hsl(0 75% 50%)" : "transparent",
              color: tab === key ? "white" : "hsl(0 0% 50%)",
            }}
          >
            {label}
            <span
              className="text-[11px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ background: tab === key ? "rgba(255,255,255,0.22)" : "hsl(0 0% 14%)", color: tab === key ? "white" : "hsl(0 0% 45%)" }}
            >
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* ── Website leads ── */}
      {tab === "website" && (
        <div style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl overflow-hidden">
          {websiteLeads.length === 0 ? (
            <div className="py-16 text-center" style={{ color: "hsl(0 0% 35%)" }}>
              <Inbox size={32} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm">No website leads yet.</p>
              <p className="text-xs mt-1 opacity-60">Quick and guided form submissions will appear here.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid hsl(0 0% 13%)" }}>
                  {["Contact", "Request", "Property", "Source", "Submitted", "Actions"].map(h => (
                    <th key={h} style={headStyle} className="text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {websiteLeads.map((lead) => (
                  <Fragment key={lead.id}>
                    <tr
                      style={rowStyle}
                      className="hover:bg-white/[0.02] cursor-pointer transition-colors"
                      onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                    >
                      <td style={cellStyle}>
                        <div className="font-semibold text-white">{lead.name || lead.firstName || "—"}</div>
                        <div style={{ color: "hsl(0 0% 45%)", fontSize: 12 }}>{lead.phone || "—"}</div>
                        {lead.email && <div style={{ color: "hsl(0 0% 40%)", fontSize: 11 }}>{lead.email}</div>}
                      </td>
                      <td style={cellStyle}>
                        <span
                          className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize"
                          style={{
                            background: lead.mode === "guided" ? "hsl(0 75% 50% / 0.14)" : "hsl(145 60% 45% / 0.14)",
                            color: lead.mode === "guided" ? "hsl(0 75% 62%)" : "hsl(145 60% 58%)",
                            border: lead.mode === "guided" ? "1px solid hsl(0 75% 50% / 0.22)" : "1px solid hsl(145 60% 45% / 0.22)",
                          }}
                        >
                          {lead.mode}
                        </span>
                        <div style={{ color: "hsl(0 0% 55%)", fontSize: 12 }} className="mt-1">
                          {lead.guidedAnswers?.goal || lead.serviceType || "Alarm request"}
                        </div>
                        {lead.guidedAnswers?.currentIssue && (
                          <div style={{ color: "hsl(0 0% 42%)", fontSize: 11 }} className="mt-0.5">{lead.guidedAnswers.currentIssue}</div>
                        )}
                      </td>
                      <td style={cellStyle}>
                        <div style={{ color: "hsl(0 0% 65%)", fontSize: 12 }} className="capitalize">{lead.propertyType?.replace("-", " ") || "—"}</div>
                        {lead.areaName && (
                          <div style={{ color: "hsl(0 75% 62%)", fontSize: 11 }} className="mt-0.5">
                            {lead.areaName}{lead.areaZip ? ` · ${lead.areaZip}` : ""}
                          </div>
                        )}
                        {lead.address && <div style={{ color: "hsl(0 0% 40%)", fontSize: 11 }}>📍 {lead.address}</div>}
                      </td>
                      <td style={{ ...cellStyle, fontSize: 12 }}>
                        <div style={{ color: "hsl(0 0% 55%)" }}>{lead.sourcePage || "Website"}</div>
                        <div style={{ color: lead.agreeToContact ? "hsl(145 60% 55%)" : "hsl(0 75% 55%)", fontSize: 11 }}>
                          {lead.agreeToContact ? "Opted in" : "No opt-in"}
                        </div>
                      </td>
                      <td style={{ ...cellStyle, fontSize: 12, color: "hsl(0 0% 40%)", whiteSpace: "nowrap" }}>{fmt(lead.submittedAt)}</td>
                      <td style={cellStyle}>
                        <div className="flex items-center gap-2">
                          {lead.phone && (
                            <a
                              href={`tel:${lead.phone.replace(/\D/g, "")}`}
                              onClick={e => e.stopPropagation()}
                              style={{ color: "hsl(120 55% 55%)" }}
                              className="text-xs font-semibold hover:opacity-80 transition-opacity"
                            >
                              Call
                            </a>
                          )}
                          <button
                            onClick={e => { e.stopPropagation(); handleDeleteWebsite(lead.id); }}
                            style={{ color: "hsl(0 0% 35%)" }}
                            className="hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expanded === lead.id && (
                      <tr key={`${lead.id}-detail`} style={{ background: "hsl(0 0% 6%)", borderBottom: "1px solid hsl(0 0% 13%)" }}>
                        <td colSpan={6} style={{ padding: "16px 20px" }}>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                            {[
                              ["Mode", lead.mode],
                              ["Area", lead.areaName ? `${lead.areaName}${lead.areaZip ? ` (${lead.areaZip})` : ""}` : "—"],
                              ["Area Slug", lead.areaSlug || "—"],
                              ["Form Context", lead.formContext || "—"],
                              ["Form Title", lead.formTitle || "—"],
                              ["Service", lead.serviceType || "—"],
                              ["Property Type", lead.propertyType || "—"],
                              ["Timeline", lead.timeline || lead.guidedAnswers?.bestTime || "—"],
                              ["Current System", lead.currentSystem || "—"],
                              ["Guided Goal", lead.guidedAnswers?.goal || "—"],
                              ["Guided Issue", lead.guidedAnswers?.currentIssue || "—"],
                              ["Existing Provider", lead.guidedAnswers?.existingProvider || "—"],
                              ["Best Time", lead.guidedAnswers?.bestTime || "—"],
                              ["Address", [lead.address, lead.city, lead.state, lead.zip].filter(Boolean).join(", ") || "—"],
                              ["Newsletter", lead.subscribeNewsletter ? "Yes" : "No"],
                              ["Notes", lead.notes || "—"],
                            ].map(([k, v]) => (
                              <div key={k}>
                                <p style={{ color: "hsl(0 0% 38%)", fontSize: 10 }} className="uppercase tracking-wider mb-0.5">{k}</p>
                                <p style={{ color: "hsl(0 0% 72%)" }}>{v || "—"}</p>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* ── Property Assessment leads ── */}
      {tab === "assessment" && (
        <div style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl overflow-hidden">
          {assessmentLeads.length === 0 ? (
            <div className="py-16 text-center" style={{ color: "hsl(0 0% 35%)" }}>
              <ClipboardList size={32} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm">No property assessment submissions yet.</p>
              <p className="text-xs mt-1 opacity-60">Submissions from /property-assessment will appear here.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid hsl(0 0% 13%)" }}>
                  {["Contact", "Property", "Concerns & Services", "Submitted", "Actions"].map(h => (
                    <th key={h} style={headStyle} className="text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {assessmentLeads.map((lead) => (
                  <Fragment key={lead.id}>
                    <tr
                      style={rowStyle}
                      className="hover:bg-white/[0.02] cursor-pointer transition-colors"
                      onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                    >
                      <td style={cellStyle}>
                        <div className="font-semibold text-white">{lead.name || "—"}</div>
                        <div style={{ color: "hsl(0 0% 45%)", fontSize: 12 }}>{lead.phone}</div>
                        <div style={{ color: "hsl(0 0% 40%)", fontSize: 11 }}>{lead.email}</div>
                      </td>
                      <td style={cellStyle}>
                        <span
                          className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize"
                          style={{ background: "hsl(0 75% 50% / 0.12)", color: "hsl(0 75% 60%)", border: "1px solid hsl(0 75% 50% / 0.2)" }}
                        >
                          {lead.propertyType?.replace("-", " ") || "—"}
                        </span>
                        {lead.unitCount && <div style={{ color: "hsl(0 0% 45%)", fontSize: 11 }} className="mt-1">{lead.unitCount} units</div>}
                        {lead.address && <div style={{ color: "hsl(0 0% 40%)", fontSize: 11 }} className="mt-0.5">📍 {lead.address}</div>}
                      </td>
                      <td style={cellStyle}>
                        <div style={{ color: "hsl(0 0% 55%)", fontSize: 12 }}>{lead.primaryConcern || "—"}</div>
                        {lead.services?.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {lead.services.map(s => (
                              <span key={s} className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "hsl(0 0% 14%)", color: "hsl(0 0% 55%)" }}>
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>
                      <td style={{ ...cellStyle, fontSize: 12, color: "hsl(0 0% 40%)", whiteSpace: "nowrap" }}>{fmt(lead.submittedAt)}</td>
                      <td style={cellStyle}>
                        <div className="flex items-center gap-2">
                          {lead.phone && (
                            <a
                              href={`tel:${lead.phone.replace(/\D/g, "")}`}
                              onClick={e => e.stopPropagation()}
                              style={{ color: "hsl(120 55% 55%)" }}
                              className="text-xs font-semibold hover:opacity-80 transition-opacity"
                            >
                              Call
                            </a>
                          )}
                          <button
                            onClick={e => { e.stopPropagation(); handleDeleteAssessment(lead.id); }}
                            style={{ color: "hsl(0 0% 35%)" }}
                            className="hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expanded === lead.id && (
                      <tr key={`${lead.id}-detail`} style={{ background: "hsl(0 0% 6%)", borderBottom: "1px solid hsl(0 0% 13%)" }}>
                        <td colSpan={5} style={{ padding: "16px 20px" }}>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                            {[
                              ["Property Type", lead.propertyType],
                              ["Units", lead.unitCount || "—"],
                              ["Buildings", lead.buildingCount || "—"],
                              ["Property Size", lead.propertySize || "—"],
                              ["Has Cameras", lead.hasCameras],
                              ["Camera Count", lead.cameraCount || "—"],
                              ["Has Alarm", lead.hasAlarm],
                              ["Primary Concern", lead.primaryConcern],
                              ["Services Selected", lead.services?.join(", ") || "—"],
                              ["Address", lead.address || "—"],
                              ["Email", lead.email || "—"],
                              ["Notes", lead.additionalNotes || "—"],
                            ].map(([k, v]) => (
                              <div key={k}>
                                <p style={{ color: "hsl(0 0% 38%)", fontSize: 10 }} className="uppercase tracking-wider mb-0.5">{k}</p>
                                <p style={{ color: "hsl(0 0% 72%)" }}>{v || "—"}</p>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* ── Switch leads ── */}
      {tab === "switch" && (
        <div style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl overflow-hidden">
          {switchLeads.length === 0 ? (
            <div className="py-16 text-center" style={{ color: "hsl(0 0% 35%)" }}>
              <ClipboardList size={32} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm">No switch assessment submissions yet.</p>
              <p className="text-xs mt-1 opacity-60">Submissions from /switch-my-alarm will appear here.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid hsl(0 0% 13%)" }}>
                  {["Contact", "Current System", "Provider & Bill", "Goals", "Submitted", "Actions"].map(h => (
                    <th key={h} style={headStyle} className="text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {switchLeads.map((lead) => (
                  <Fragment key={lead.id}>
                    <tr
                      style={rowStyle}
                      className="hover:bg-white/[0.02] cursor-pointer transition-colors"
                      onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                    >
                      <td style={cellStyle}>
                        <div className="font-semibold text-white">{lead.name || "—"}</div>
                        <div style={{ color: "hsl(0 0% 45%)", fontSize: 12 }}>{lead.phone}</div>
                        <div style={{ color: "hsl(0 0% 40%)", fontSize: 11 }}>{lead.email}</div>
                        {lead.address && <div style={{ color: "hsl(0 0% 38%)", fontSize: 11 }}>📍 {lead.address}</div>}
                      </td>
                      <td style={cellStyle}>
                        <span
                          className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold"
                          style={{ background: "hsl(220 60% 50% / 0.12)", color: "hsl(220 60% 65%)", border: "1px solid hsl(220 60% 50% / 0.2)" }}
                        >
                          {lead.systemType || "—"}
                        </span>
                        {lead.systemTypeOther && <div style={{ color: "hsl(0 0% 45%)", fontSize: 11 }} className="mt-1">{lead.systemTypeOther}</div>}
                        {lead.hasEquipmentProblems === "Yes" && <div style={{ color: "hsl(38 90% 55%)", fontSize: 11 }} className="mt-1">⚠ Equipment issues</div>}
                      </td>
                      <td style={cellStyle}>
                        <div style={{ color: "hsl(0 0% 65%)" }}>{lead.currentCompany || "—"}</div>
                        {lead.monthlyBill && (
                          <div style={{ color: "hsl(120 55% 55%)", fontSize: 12 }} className="font-semibold">
                            ${lead.monthlyBill}/{lead.billingFrequency === "monthly" ? "mo" : lead.billingFrequency === "quarterly" ? "qtr" : "yr"}
                          </div>
                        )}
                        <div style={{ fontSize: 11, color: lead.inContract === "yes" ? "hsl(38 90% 55%)" : lead.inContract === "no" ? "hsl(120 55% 55%)" : "hsl(0 0% 45%)" }}>
                          {lead.inContract === "yes" ? `In contract${lead.contractTimeLeft ? ` — ${lead.contractTimeLeft} left` : ""}` : lead.inContract === "no" ? "Month-to-month" : lead.inContract === "unsure" ? "Not sure" : "—"}
                        </div>
                      </td>
                      <td style={cellStyle}>
                        {lead.interests?.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {lead.interests.map(i => (
                              <span key={i} className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "hsl(0 0% 14%)", color: "hsl(0 0% 55%)" }}>
                                {i.replace("-", " ")}
                              </span>
                            ))}
                          </div>
                        ) : "—"}
                      </td>
                      <td style={{ ...cellStyle, fontSize: 12, color: "hsl(0 0% 40%)", whiteSpace: "nowrap" }}>{fmt(lead.submittedAt)}</td>
                      <td style={cellStyle}>
                        <div className="flex items-center gap-2">
                          {lead.phone && (
                            <a
                              href={`tel:${lead.phone.replace(/\D/g, "")}`}
                              onClick={e => e.stopPropagation()}
                              style={{ color: "hsl(120 55% 55%)" }}
                              className="text-xs font-semibold hover:opacity-80 transition-opacity"
                            >
                              Call
                            </a>
                          )}
                          <button
                            onClick={e => { e.stopPropagation(); handleDeleteSwitch(lead.id); }}
                            style={{ color: "hsl(0 0% 35%)" }}
                            className="hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expanded === lead.id && (
                      <tr key={`${lead.id}-detail`} style={{ background: "hsl(0 0% 6%)", borderBottom: "1px solid hsl(0 0% 13%)" }}>
                        <td colSpan={6} style={{ padding: "16px 20px" }}>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                            {[
                              ["System Type", `${lead.systemType}${lead.systemTypeOther ? ` — ${lead.systemTypeOther}` : ""}`],
                              ["Equipment Problems", lead.hasEquipmentProblems],
                              ["Sensor Problems", lead.hasSensorProblems],
                              ["Bypassing Zones", lead.bypassingZones + (lead.bypassedZoneDetails ? `: ${lead.bypassedZoneDetails}` : "")],
                              ["Can Set Alarm", lead.canSetAlarm],
                              ["Missing Equipment", lead.missingEquipment || "—"],
                              ["Current Company", lead.currentCompany],
                              ["Monthly Bill", lead.monthlyBill ? `$${lead.monthlyBill}/${lead.billingFrequency}` : "—"],
                              ["Contract Status", lead.inContract],
                              ["Contract Time Left", lead.contractTimeLeft || "—"],
                              ["Signed Recently", lead.signedRecently + (lead.signedRecentlyDetails ? `: ${lead.signedRecentlyDetails}` : "")],
                              ["Goals", lead.interests?.join(", ") || "—"],
                              ["What to Fix", lead.whatToFix || "—"],
                              ["What to Add", lead.whatToAdd || "—"],
                              ["Situation Notes", lead.situation || "—"],
                            ].map(([k, v]) => (
                              <div key={k}>
                                <p className="uppercase tracking-wider mb-0.5" style={{ fontSize: 10, color: "hsl(0 0% 38%)" }}>{k}</p>
                                <p style={{ color: "hsl(0 0% 72%)" }}>{v || "—"}</p>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Pole Quotes Page ─────────────────────────────────────────────────────────

const QUOTE_STATUSES: PoleQuote["status"][] = ["new", "contacted", "quoted", "won", "lost"];

function PoleQuotesPage() {
  const [quotes, setQuotes] = useState<PoleQuote[]>([]);
  const [selected, setSelected] = useState<PoleQuote | null>(null);
  const [filter, setFilter] = useState<PoleQuote["status"] | "all">("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setQuotes(loadPoleQuotes());
  }, []);

  const updateStatus = (id: string, status: PoleQuote["status"]) => {
    setQuotes(prev => {
      const next = prev.map(q => q.id === id ? { ...q, status } : q);
      localStorage.setItem("tts_pole_quotes", JSON.stringify(next));
      if (selected?.id === id) setSelected(s => s ? { ...s, status } : s);
      return next;
    });
  };

  const deleteQuote = (id: string) => {
    setQuotes(prev => {
      const next = prev.filter(q => q.id !== id);
      localStorage.setItem("tts_pole_quotes", JSON.stringify(next));
      if (selected?.id === id) setSelected(null);
      return next;
    });
  };

  const filtered = quotes.filter(q => {
    const matchStatus = filter === "all" || q.status === filter;
    const matchSearch = !search || q.name.toLowerCase().includes(search.toLowerCase()) ||
      q.company?.toLowerCase().includes(search.toLowerCase()) ||
      q.email.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalEstimate = filtered.reduce((s, q) => s + q.estimatedTotal, 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Pole Configurator Quotes</h1>
          <p style={{ color: "hsl(0 0% 50%)" }} className="text-sm mt-1">
            {quotes.length} quote{quotes.length !== 1 ? "s" : ""} submitted via /security-pole-configurator
          </p>
        </div>
        <Link
          to="/security-pole-configurator"
          target="_blank"
          style={{ background: "hsl(0 75% 50%)" }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Box size={15} /> Open Configurator
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { label: "All", key: "all" as const, count: quotes.length, color: "hsl(0 0% 55%)" },
          { label: "New", key: "new" as const, count: quotes.filter(q => q.status === "new").length, color: "hsl(210 80% 60%)" },
          { label: "Contacted", key: "contacted" as const, count: quotes.filter(q => q.status === "contacted").length, color: "hsl(40 90% 55%)" },
          { label: "Quoted", key: "quoted" as const, count: quotes.filter(q => q.status === "quoted").length, color: "hsl(270 70% 60%)" },
          { label: "Won", key: "won" as const, count: quotes.filter(q => q.status === "won").length, color: "hsl(145 60% 45%)" },
        ].map(s => (
          <button
            key={s.key}
            onClick={() => setFilter(s.key)}
            style={{
              background: filter === s.key ? "hsl(0 0% 12%)" : "hsl(0 0% 8%)",
              border: `1px solid ${filter === s.key ? s.color : "hsl(0 0% 14%)"}`,
            }}
            className="rounded-xl p-3 text-left transition-all"
          >
            <div className="text-xl font-bold text-white">{s.count}</div>
            <div className="text-xs mt-0.5" style={{ color: s.color }}>{s.label}</div>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "hsl(0 0% 40%)" }} />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, company, email…"
            style={{ background: "hsl(0 0% 5%)", border: "1px solid hsl(0 0% 16%)", color: "white" }}
            className="w-full pl-9 pr-4 py-2 rounded-lg text-sm placeholder:text-gray-600 focus:outline-none"
          />
        </div>
        {filtered.length > 0 && (
          <span style={{ color: "hsl(0 0% 45%)" }} className="text-sm ml-auto">
            Pipeline est: <strong className="text-white">${totalEstimate.toLocaleString()}</strong>
          </span>
        )}
      </div>

      {quotes.length === 0 ? (
        <div style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl p-16 text-center">
          <Box size={36} className="mx-auto mb-3" style={{ color: "hsl(0 0% 28%)" }} />
          <p className="text-white font-medium mb-1">No quotes yet</p>
          <p style={{ color: "hsl(0 0% 45%)" }} className="text-sm">
            Quotes submitted via the Pole Configurator appear here in real-time.
          </p>
          <Link to="/security-pole-configurator" target="_blank"
            style={{ background: "hsl(0 75% 50%)" }}
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity">
            Try the Configurator
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_380px] gap-5">
          {/* Quote list */}
          <div style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl overflow-hidden">
            <div className="overflow-y-auto" style={{ maxHeight: 600 }}>
              {filtered.length === 0 ? (
                <p style={{ color: "hsl(0 0% 40%)" }} className="text-sm text-center py-10">No quotes match your filter.</p>
              ) : filtered.map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => setSelected(q)}
                  className="w-full text-left px-5 py-4 transition-colors hover:bg-white/[0.03] border-b"
                  style={{
                    borderColor: "hsl(0 0% 12%)",
                    background: selected?.id === q.id ? "hsl(0 0% 11%)" : "transparent",
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold text-sm truncate">{q.name}</span>
                        <Badge status={q.status} />
                      </div>
                      {q.company && <div style={{ color: "hsl(0 0% 50%)" }} className="text-xs truncate">{q.company}</div>}
                      <div className="flex items-center gap-3 mt-1.5">
                        <span style={{ color: "hsl(0 75% 58%)" }} className="text-xs font-semibold">${q.estimatedTotal.toLocaleString()}</span>
                        <span style={{ color: "hsl(0 0% 40%)" }} className="text-xs">{q.config.quantity}× {q.config.height}ft pole</span>
                        <span style={{ color: "hsl(0 0% 40%)" }} className="text-xs">{q.config.cameraCount} cams</span>
                      </div>
                    </div>
                    <div style={{ color: "hsl(0 0% 38%)" }} className="text-xs flex-shrink-0">
                      {new Date(q.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <div style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }} className="rounded-xl overflow-hidden">
            {!selected ? (
              <div className="flex items-center justify-center h-full py-20">
                <p style={{ color: "hsl(0 0% 38%)" }} className="text-sm">Select a quote to view details</p>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "hsl(0 0% 13%)" }}>
                  <div>
                    <div className="text-white font-semibold">{selected.name}</div>
                    <div style={{ color: "hsl(0 0% 45%)" }} className="text-xs">{selected.email} · {selected.phone}</div>
                  </div>
                  <button onClick={() => deleteQuote(selected.id)} style={{ color: "hsl(0 0% 40%)" }} className="hover:text-red-400 transition-colors p-1">
                    <Trash2 size={15} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-5">
                  {/* Status changer */}
                  <div>
                    <p style={{ color: "hsl(0 0% 45%)" }} className="text-xs mb-2 font-semibold uppercase tracking-wider">Status</p>
                    <div className="flex flex-wrap gap-1.5">
                      {QUOTE_STATUSES.map(s => (
                        <button
                          key={s}
                          onClick={() => updateStatus(selected.id, s)}
                          style={{
                            background: selected.status === s ? "hsl(0 75% 50%)" : "hsl(0 0% 13%)",
                            border: `1px solid ${selected.status === s ? "hsl(0 75% 50%)" : "hsl(0 0% 20%)"}`,
                            color: selected.status === s ? "white" : "hsl(0 0% 55%)",
                          }}
                          className="px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact info */}
                  <div style={{ background: "hsl(0 0% 11%)", border: "1px solid hsl(0 0% 16%)" }} className="rounded-xl p-4 space-y-2">
                    <p style={{ color: "hsl(0 0% 45%)" }} className="text-xs font-semibold uppercase tracking-wider mb-3">Contact</p>
                    {[
                      { label: "Company", val: selected.company || "—" },
                      { label: "Property", val: selected.propertyAddress || "—" },
                      { label: "Type", val: selected.propertyType || "—" },
                      { label: "Submitted", val: new Date(selected.submittedAt).toLocaleString() },
                    ].map(r => (
                      <div key={r.label} className="flex items-start justify-between gap-3">
                        <span style={{ color: "hsl(0 0% 42%)" }} className="text-xs">{r.label}</span>
                        <span style={{ color: "hsl(0 0% 70%)" }} className="text-xs text-right">{r.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Config details */}
                  <div style={{ background: "hsl(0 0% 11%)", border: "1px solid hsl(0 0% 16%)" }} className="rounded-xl p-4">
                    <p style={{ color: "hsl(0 0% 45%)" }} className="text-xs font-semibold uppercase tracking-wider mb-3">Configuration</p>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                      {[
                        ["Height", `${selected.config.height} ft`],
                        ["Quantity", `${selected.config.quantity} pole${selected.config.quantity > 1 ? "s" : ""}`],
                        ["Cameras", `${selected.config.cameraCount}× ${selected.config.cameraType.toUpperCase()}`],
                        ["Lighting", selected.config.lighting],
                        ["Arms", selected.config.armConfig],
                        ["Mount", selected.config.mountType],
                        ["Finish", selected.config.color],
                        ["Add-ons", selected.config.accessories.length > 0 ? selected.config.accessories.join(", ") : "None"],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <div style={{ color: "hsl(0 0% 40%)" }} className="text-[10px] uppercase tracking-wider">{k}</div>
                          <div style={{ color: "hsl(0 0% 75%)" }} className="text-xs font-medium capitalize mt-0.5 truncate">{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Estimate */}
                  <div style={{ background: "hsl(0 75% 50%/0.08)", border: "1px solid hsl(0 75% 50%/0.2)" }} className="rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span style={{ color: "hsl(0 0% 55%)" }} className="text-sm">Estimated Total</span>
                      <span style={{ color: "hsl(0 75% 60%)" }} className="text-xl font-bold">${selected.estimatedTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Notes */}
                  {selected.notes && (
                    <div style={{ background: "hsl(0 0% 11%)", border: "1px solid hsl(0 0% 16%)" }} className="rounded-xl p-4">
                      <p style={{ color: "hsl(0 0% 45%)" }} className="text-xs font-semibold uppercase tracking-wider mb-2">Notes</p>
                      <p style={{ color: "hsl(0 0% 65%)" }} className="text-xs leading-relaxed">{selected.notes}</p>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex gap-2 pt-1">
                    <a
                      href={`tel:${selected.phone.replace(/\D/g, "")}`}
                      style={{ background: "hsl(0 75% 50%)" }}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      <Phone size={14} /> Call
                    </a>
                    <a
                      href={`mailto:${selected.email}`}
                      style={{ background: "hsl(0 0% 14%)", border: "1px solid hsl(0 0% 20%)" }}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-medium hover:bg-white/5 transition-colors"
                    >
                      <Mail size={14} /> Email
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sidebar Config ──────────────────────────────────────────────────────────

type PageKey =
  | "dashboard" | "leads" | "clients"
  | "schedule" | "employees" | "timeclock"
  | "analytics" | "email" | "livechat"
  | "polequotes" | "formsubmissions" | "users" | "settings";

interface NavItem {
  key: PageKey;
  label: string;
  icon: React.ElementType;
  badge?: boolean;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "Command",
    items: [{ key: "dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Growth",
    items: [
      { key: "leads", label: "Leads", icon: Target },
      { key: "formsubmissions", label: "Submissions", icon: ClipboardList, badge: true },
      { key: "polequotes", label: "Quotes", icon: Box },
      { key: "analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Operations",
    items: [
      { key: "schedule", label: "Schedule", icon: Calendar },
      { key: "clients", label: "Clients", icon: Users },
      { key: "employees", label: "Team", icon: Briefcase },
      { key: "livechat", label: "Chat", icon: MessageSquare, badge: true },
    ],
  },
  {
    label: "Tools",
    items: [
      { key: "email", label: "Email", icon: Megaphone },
      { key: "settings", label: "Settings", icon: Settings },
    ],
  },
];

// ─── Main Admin Shell ─────────────────────────────────────────────────────────

const adminLightStyles = `
  .tts-admin-light,
  .tts-admin-light [style*="hsl(0 0% 5%)"],
  .tts-admin-light [style*="hsl(0 0% 6%)"] {
    background: #f6f7f9 !important;
  }
  .tts-admin-light {
    color: #111827;
  }
  .tts-admin-light aside,
  .tts-admin-light aside [style*="hsl(0 0% 6%)"] {
    background: #ffffff !important;
    border-color: #e5e7eb !important;
  }
  .tts-admin-light header {
    background: rgba(255,255,255,0.92) !important;
    border-color: #e5e7eb !important;
    backdrop-filter: blur(18px);
  }
  .tts-admin-light [style*="hsl(0 0% 8%)"],
  .tts-admin-light [style*="hsl(0 0% 9%)"],
  .tts-admin-light [style*="hsl(0 0% 10%)"],
  .tts-admin-light [style*="hsl(0 0% 11%)"],
  .tts-admin-light [style*="hsl(0 0% 12%)"],
  .tts-admin-light [style*="rgb(13, 13, 13)"],
  .tts-admin-light [style*="rgb(15, 15, 15)"],
  .tts-admin-light [style*="rgb(20, 20, 20)"],
  .tts-admin-light [style*="rgb(23, 23, 23)"],
  .tts-admin-light [style*="rgb(26, 26, 26)"],
  .tts-admin-light [style*="rgb(28, 28, 28)"],
  .tts-admin-light [style*="rgb(31, 31, 31)"],
  .tts-admin-light .bg-black,
  .tts-admin-light .bg-neutral-950,
  .tts-admin-light .bg-neutral-900,
  .tts-admin-light .bg-gray-950,
  .tts-admin-light .bg-gray-900,
  .tts-admin-light .bg-white\\/\\[0\\.02\\],
  .tts-admin-light .bg-white\\/\\[0\\.03\\],
  .tts-admin-light .bg-white\\/\\[0\\.035\\],
  .tts-admin-light .bg-white\\/\\[0\\.04\\],
  .tts-admin-light .bg-white\\/\\[0\\.045\\],
  .tts-admin-light .bg-white\\/\\[0\\.055\\] {
    background: #ffffff !important;
    border-color: #e5e7eb !important;
  }
  .tts-admin-light [style*="rgb(20, 20, 20)"],
  .tts-admin-light [style*="rgb(23, 23, 23)"],
  .tts-admin-light [style*="rgb(26, 26, 26)"],
  .tts-admin-light [style*="rgb(31, 31, 31)"] {
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04), 0 10px 28px rgba(16, 24, 40, 0.06) !important;
  }
  .tts-admin-light [style*="hsl(0 0% 13%)"],
  .tts-admin-light [style*="hsl(0 0% 14%)"],
  .tts-admin-light [style*="hsl(0 0% 15%)"],
  .tts-admin-light [style*="hsl(0 0% 16%)"],
  .tts-admin-light [style*="hsl(0 0% 18%)"],
  .tts-admin-light [style*="hsl(0 0% 20%)"],
  .tts-admin-light [style*="rgb(38, 38, 38)"],
  .tts-admin-light [style*="rgb(36, 36, 36)"],
  .tts-admin-light [style*="rgb(41, 41, 41)"],
  .tts-admin-light [style*="rgb(46, 46, 46)"],
  .tts-admin-light [style*="rgb(51, 51, 51)"] {
    border-color: #e5e7eb !important;
  }
  .tts-admin-light [style*="rgb(36, 36, 36)"],
  .tts-admin-light [style*="rgb(46, 46, 46)"],
  .tts-admin-light .bg-gray-700 {
    background: #e5e7eb !important;
    color: #4b5563 !important;
  }
  .tts-admin-light .bg-gray-700 > div,
  .tts-admin-light [style*="rgb(46, 46, 46)"] > div {
    background: #ffffff !important;
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.16) !important;
  }
  .tts-admin-light .text-white,
  .tts-admin-light [style*="color: white"],
  .tts-admin-light [style*="color:white"],
  .tts-admin-light [style*="color: rgb(255"] {
    color: #111827 !important;
  }
  .tts-admin-light [style*="hsl(0 0% 35%)"],
  .tts-admin-light [style*="hsl(0 0% 38%)"],
  .tts-admin-light [style*="hsl(0 0% 40%)"],
  .tts-admin-light [style*="hsl(0 0% 42%)"],
  .tts-admin-light [style*="hsl(0 0% 45%)"],
  .tts-admin-light [style*="hsl(0 0% 50%)"],
  .tts-admin-light [style*="hsl(0 0% 55%)"],
  .tts-admin-light [style*="hsl(0 0% 65%)"],
  .tts-admin-light [style*="hsl(0 0% 70%)"],
  .tts-admin-light [style*="hsl(0 0% 72%)"],
  .tts-admin-light [style*="hsl(0 0% 75%)"] {
    color: #6b7280 !important;
  }
  .tts-admin-light input,
  .tts-admin-light select,
  .tts-admin-light textarea {
    background: #ffffff !important;
    color: #111827 !important;
    border-color: #e5e7eb !important;
  }
  .tts-admin-light input::placeholder,
  .tts-admin-light textarea::placeholder {
    color: #9ca3af !important;
  }
  .tts-admin-light table thead tr,
  .tts-admin-light table tbody tr,
  .tts-admin-light .divide-y > :not([hidden]) ~ :not([hidden]) {
    border-color: #edf0f3 !important;
  }
  .tts-admin-light .hover\\:bg-white\\/\\[0\\.02\\]:hover,
  .tts-admin-light .hover\\:bg-white\\/\\[0\\.03\\]:hover,
  .tts-admin-light .hover\\:bg-white\\/\\[0\\.04\\]:hover,
  .tts-admin-light .hover\\:bg-white\\/\\[0\\.05\\]:hover,
  .tts-admin-light .hover\\:bg-white\\/\\[0\\.06\\]:hover {
    background: #f9fafb !important;
  }
  .tts-admin-light aside nav {
    overflow: hidden !important;
  }
  .tts-admin-light .recharts-cartesian-grid line {
    stroke: #e5e7eb !important;
  }
  .tts-admin-light .recharts-text {
    fill: #6b7280 !important;
  }
  .tts-admin-light .recharts-default-tooltip {
    background: #ffffff !important;
    border: 1px solid #e5e7eb !important;
    box-shadow: 0 12px 30px rgba(16, 24, 40, 0.12) !important;
    color: #111827 !important;
  }
  .tts-admin-light .rounded-xl,
  .tts-admin-light .rounded-lg {
    border-radius: 10px;
  }
  .tts-admin-light main > div > div[style*="rgb(20, 20, 20)"],
  .tts-admin-light main > div > div[style*="hsl(0 0% 8%)"] {
    background: #ffffff !important;
    border: 1px solid #e5e7eb !important;
  }
  .tts-admin-light table {
    background: #ffffff !important;
  }
  .tts-admin-light thead {
    background: #f8fafc !important;
  }
  .tts-admin-light tbody tr:hover {
    background: #f9fafb !important;
  }
  .tts-admin-light aside button,
  .tts-admin-light aside a {
    color: #4b5563 !important;
  }
  .tts-admin-light aside button[style*="hsl(0 75% 50%/0.12)"] {
    background: #fff1f2 !important;
    border-color: #fecdd3 !important;
    color: #b91c1c !important;
  }
  .tts-admin-light aside button[style*="hsl(0 75% 50%/0.12)"] svg {
    color: #dc2626 !important;
  }
  .tts-admin-light header [style*="rgb(23, 23, 23)"],
  .tts-admin-light header [style*="rgb(26, 26, 26)"],
  .tts-admin-light header [style*="hsl(0 0% 9%)"],
  .tts-admin-light header [style*="hsl(0 0% 10%)"] {
    background: #f9fafb !important;
    border-color: #e5e7eb !important;
    box-shadow: none !important;
  }
  .tts-admin-light svg {
    color: currentColor;
  }
  .tts-admin-light [style*="background: hsl(0 75% 50%)"],
  .tts-admin-light [style*="background:hsl(0 75% 50%)"],
  .tts-admin-light [style*="background: rgb(220, 38, 38)"],
  .tts-admin-light [style*="background: #dc2626"],
  .tts-admin-light .bg-red-600,
  .tts-admin-light .btn-primary-gradient {
    color: #ffffff !important;
  }
  .tts-admin-light [style*="background: hsl(0 75% 50%)"] *,
  .tts-admin-light [style*="background:hsl(0 75% 50%)"] *,
  .tts-admin-light div[style*="hsl(0 75% 50%)"] svg,
  .tts-admin-light .bg-red-600 *,
  .tts-admin-light .btn-primary-gradient * {
    color: #ffffff !important;
  }
`;

export default function AdminDashboard() {
  const [page, setPage] = useState<PageKey>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { unreadCount } = useChatContext();

  const pageComponents: Record<PageKey, React.ReactNode> = {
    dashboard: <DashboardPage />,
    leads: <LeadsPage />,
    clients: <ClientsPage />,
    polequotes: <PoleQuotesPage />,
    formsubmissions: <FormSubmissionsPage />,
    schedule: <SchedulePage />,
    employees: <EmployeesPage />,
    timeclock: <TimeClockPage />,
    analytics: <AnalyticsPage />,
    email: <EmailPage />,
    livechat: <LiveChatPage />,
    users: <UsersPage />,
    settings: <SettingsPage />,
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-4 border-b" style={{ borderColor: "hsl(0 0% 12%)" }}>
        <div className="flex items-center gap-3">
          <div style={{ background: "hsl(0 75% 50%)" }} className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm">
            <Shield size={16} className="text-white" />
          </div>
          <div>
            <div className="text-white text-sm font-bold leading-tight">Texas Total Security</div>
            <div style={{ color: "hsl(0 0% 40%)" }} className="text-xs">Admin Portal</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 overflow-hidden space-y-3">
        {navGroups.map(group => (
          <div key={group.label}>
            <div style={{ color: "hsl(0 0% 32%)" }} className="px-2 mb-1 text-[10px] font-bold uppercase tracking-[0.16em]">{group.label}</div>
            {group.items.map(item => {
              const isActive = page === item.key;
              const badge = item.badge && unreadCount > 0 ? unreadCount : null;
              return (
                <button
                  key={item.key}
                  onClick={() => { setPage(item.key); setSidebarOpen(false); }}
                  style={{
                    background: isActive ? "hsl(0 75% 50%/0.12)" : "transparent",
                    color: isActive ? "hsl(0 75% 60%)" : "hsl(0 0% 55%)",
                    border: isActive ? "1px solid hsl(0 75% 50%/0.2)" : "1px solid transparent",
                  }}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all hover:bg-white/[0.04] mb-0.5"
                >
                  <div className="flex items-center gap-2.5">
                    <item.icon size={15} />
                    {item.label}
                  </div>
                  {badge && (
                    <span style={{ background: "hsl(0 75% 50%)" }} className="text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{badge}</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-3 border-t" style={{ borderColor: "hsl(0 0% 12%)" }}>
        <Link
          to="/"
          style={{ color: "hsl(0 0% 45%)" }}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] hover:bg-white/[0.04] transition-colors hover:text-white"
        >
          <Globe size={16} /> View Website
        </Link>
        <button
          style={{ color: "hsl(0 0% 45%)" }}
          className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] hover:bg-white/[0.04] transition-colors hover:text-white mt-1"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="tts-admin-light flex min-h-screen" style={{ background: "hsl(0 0% 5%)" }}>
      <style>{adminLightStyles}</style>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex flex-col w-52 flex-shrink-0 sticky top-0 h-screen overflow-hidden"
        style={{ background: "hsl(0 0% 6%)", borderRight: "1px solid hsl(0 0% 11%)" }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setSidebarOpen(false)} />
          <aside
            className="relative w-64 flex flex-col h-full"
            style={{ background: "hsl(0 0% 6%)", borderRight: "1px solid hsl(0 0% 11%)" }}
          >
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="sticky top-0 z-40 flex items-center justify-between px-5 h-14 border-b flex-shrink-0"
          style={{ background: "hsl(0 0% 6%)", borderColor: "hsl(0 0% 11%)" }}
        >
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-1.5 rounded-lg hover:bg-white/[0.05] transition-colors"
              style={{ color: "hsl(0 0% 55%)" }}
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:flex items-center gap-2" style={{ background: "hsl(0 0% 9%)", border: "1px solid hsl(0 0% 15%)" , borderRadius: 8 }}>
              <Search size={14} className="ml-3" style={{ color: "hsl(0 0% 40%)" }} />
              <input
                placeholder="Quick search…"
                style={{ background: "transparent", color: "white", width: 200 }}
                className="py-1.5 pr-3 pl-1 text-sm placeholder:text-gray-600 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              style={{ background: "hsl(0 0% 10%)", border: "1px solid hsl(0 0% 16%)" }}
              className="relative w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/[0.06] transition-colors"
            >
              <Bell size={15} style={{ color: "hsl(0 0% 55%)" }} />
              {unreadCount > 0 && (
                <span style={{ background: "hsl(0 75% 50%)" }} className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-[10px] font-bold flex items-center justify-center">{unreadCount}</span>
              )}
            </button>
            <div style={{ background: "hsl(0 75% 50%)" }} className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold">A</div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 sm:p-6 overflow-y-auto">
          {pageComponents[page]}
        </main>
      </div>
    </div>
  );
}
