import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, Users, FileText, BarChart3, Settings, Bell,
  Shield, Camera, Radio, Building2, Home, Phone, Mail, TrendingUp,
  TrendingDown, DollarSign, Calendar, ChevronDown, Search, LogOut,
  Menu, X, Star, MapPin, Clock, Activity, Eye, MousePointerClick,
  ArrowUpRight, ArrowDownRight, MessageSquare, Target, Zap,
  Plus, Filter, Download, MoreHorizontal, Check, XCircle,
  ChevronLeft, ChevronRight, Pencil, Trash2, Send, Globe,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";

// Mock data
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

const allLeads = [
  { id: 1, name: "Robert Chen", email: "rchen@gmail.com", type: "Residential", service: "Alarm System", city: "Sugar Land", status: "New", time: "12 min ago", phone: "(832) 555-0142", value: "$3,200" },
  { id: 2, name: "Martinez Properties", email: "martinez@corp.com", type: "Commercial", service: "Camera System", city: "Houston", status: "Contacted", time: "45 min ago", phone: "(713) 555-0198", value: "$12,500" },
  { id: 3, name: "Cypress HOA Board", email: "board@cypresshoa.org", type: "HOA", service: "Gate Cameras", city: "Cypress", status: "Scheduled", time: "2 hours ago", phone: "(281) 555-0167", value: "$28,000" },
  { id: 4, name: "Sarah Williams", email: "swilliams@email.com", type: "Residential", service: "Monitoring", city: "Katy", status: "New", time: "3 hours ago", phone: "(832) 555-0234", value: "$1,200" },
  { id: 5, name: "Pacific Retail Group", email: "ops@pacificretail.com", type: "Commercial", service: "Full System", city: "Pearland", status: "Proposal Sent", time: "5 hours ago", phone: "(713) 555-0312", value: "$45,000" },
  { id: 6, name: "Tom Jackson", email: "tom.j@email.com", type: "Residential", service: "Camera Install", city: "The Woodlands", status: "New", time: "6 hours ago", phone: "(281) 555-0456", value: "$4,800" },
  { id: 7, name: "Katy ISD Admin", email: "facilities@katyisd.edu", type: "Commercial", service: "Full System", city: "Katy", status: "Contacted", time: "1 day ago", phone: "(281) 555-0789", value: "$85,000" },
  { id: 8, name: "James & Linda Park", email: "parks@email.com", type: "Residential", service: "Alarm + Cameras", city: "Bellaire", status: "Won", time: "2 days ago", phone: "(713) 555-0543", value: "$6,400" },
];

const proposals = [
  { id: 1, client: "Cypress HOA Board", type: "HOA", value: "$28,000", status: "Sent", date: "Mar 22, 2026", expires: "Apr 5, 2026" },
  { id: 2, client: "Pacific Retail Group", type: "Commercial", value: "$45,000", status: "Viewed", date: "Mar 20, 2026", expires: "Apr 3, 2026" },
  { id: 3, client: "Katy ISD Admin", type: "Commercial", value: "$85,000", status: "Draft", date: "Mar 23, 2026", expires: "—" },
  { id: 4, client: "James & Linda Park", type: "Residential", value: "$6,400", status: "Accepted", date: "Mar 15, 2026", expires: "—" },
  { id: 5, client: "Riverside Apartments", type: "Commercial", value: "$22,000", status: "Sent", date: "Mar 18, 2026", expires: "Apr 1, 2026" },
];

const scheduleEvents = [
  { id: 1, title: "Install — Robert Chen", type: "Installation", time: "8:00 AM - 12:00 PM", date: "Today", city: "Sugar Land", tech: "Mike R." },
  { id: 2, title: "Survey — Cypress HOA", type: "Survey", time: "1:00 PM - 2:30 PM", date: "Today", city: "Cypress", tech: "Tim S." },
  { id: 3, title: "Service Call — Bellaire Residence", type: "Service", time: "3:00 PM - 4:00 PM", date: "Today", city: "Bellaire", tech: "Carlos V." },
  { id: 4, title: "Install — Martinez Properties", type: "Installation", time: "8:00 AM - 4:00 PM", date: "Tomorrow", city: "Houston", tech: "Mike R. + Carlos V." },
  { id: 5, title: "Survey — Pacific Retail Group", type: "Survey", time: "10:00 AM - 11:30 AM", date: "Tomorrow", city: "Pearland", tech: "Tim S." },
  { id: 6, title: "Follow-up — Tom Jackson", type: "Follow-up", time: "2:00 PM - 2:30 PM", date: "Mar 26", city: "The Woodlands", tech: "Tim S." },
];

const recentReviews = [
  { name: "Michael T.", rating: 5, text: "Best security company in Houston. Professional installation and monitoring.", date: "2 days ago" },
  { name: "Lisa R.", rating: 5, text: "Switched from ADT and couldn't be happier with the local service.", date: "4 days ago" },
  { name: "David K.", rating: 4, text: "Great camera system for our warehouse. Very responsive team.", date: "1 week ago" },
];

const topPages = [
  { page: "/", views: 4520, conversion: 3.2 },
  { page: "/security-cameras", views: 2180, conversion: 4.1 },
  { page: "/alarm-systems", views: 1950, conversion: 3.8 },
  { page: "/free-analysis", views: 1420, conversion: 8.5 },
  { page: "/commercial-security", views: 1100, conversion: 5.2 },
];

type NavItem = {
  icon: typeof LayoutDashboard;
  label: string;
  id: string;
  badge?: number;
};

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Users, label: "Leads", id: "leads", badge: 12 },
  { icon: FileText, label: "Proposals", id: "proposals", badge: 3 },
  { icon: Calendar, label: "Schedule", id: "schedule" },
  { icon: BarChart3, label: "Analytics", id: "analytics" },
  { icon: Star, label: "Reviews", id: "reviews" },
  { icon: MessageSquare, label: "Messages", id: "messages", badge: 5 },
  { icon: MapPin, label: "Service Areas", id: "areas" },
  { icon: Globe, label: "Go to Website", id: "website" },
  { icon: Settings, label: "Settings", id: "settings" },
];

const statusColors: Record<string, string> = {
  "New": "bg-accent/10 text-accent",
  "Contacted": "bg-blue-500/10 text-blue-600",
  "Scheduled": "bg-emerald-500/10 text-emerald-600",
  "Proposal Sent": "bg-amber-500/10 text-amber-600",
  "Won": "bg-emerald-500/10 text-emerald-600",
  "Lost": "bg-red-500/10 text-red-500",
  "Sent": "bg-blue-500/10 text-blue-600",
  "Viewed": "bg-amber-500/10 text-amber-600",
  "Draft": "bg-secondary text-muted-foreground",
  "Accepted": "bg-emerald-500/10 text-emerald-600",
  "Installation": "bg-accent/10 text-accent",
  "Survey": "bg-blue-500/10 text-blue-600",
  "Service": "bg-amber-500/10 text-amber-600",
  "Follow-up": "bg-purple-500/10 text-purple-600",
};

const AdminDashboard = () => {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [leadFilter, setLeadFilter] = useState("All");

  const handleNavClick = (id: string) => {
    if (id === "website") {
      window.open("/", "_blank");
      return;
    }
    setActiveNav(id);
  };

  const filteredLeads = leadFilter === "All" ? allLeads : allLeads.filter(l => l.status === leadFilter);

  const renderContent = () => {
    switch (activeNav) {
      case "leads":
        return <LeadsPage leads={filteredLeads} filter={leadFilter} setFilter={setLeadFilter} />;
      case "proposals":
        return <ProposalsPage />;
      case "schedule":
        return <SchedulePage />;
      case "analytics":
        return <AnalyticsPage />;
      case "reviews":
        return <ReviewsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-primary text-primary-foreground transition-all duration-300 ${sidebarOpen ? "w-64" : "w-[72px]"}`}>
        <div className="flex items-center gap-3 px-4 py-5 border-b border-primary-foreground/10">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6 text-accent-foreground" />
          </div>
          {sidebarOpen && (
            <div className="leading-tight overflow-hidden">
              <span className="font-display font-bold text-sm block">Texas Total</span>
              <span className="text-[10px] tracking-wider uppercase opacity-60">Security Admin</span>
            </div>
          )}
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeNav === item.id
                  ? "bg-accent text-accent-foreground"
                  : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeNav === item.id ? "bg-accent-foreground/20" : "bg-accent text-accent-foreground"}`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-primary-foreground/10">
          <Link to="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors">
            <LogOut className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span>Back to Site</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-[72px]"}`}>
        <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-secondary transition-colors">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder="Search leads, pages, analytics..." className="w-80 pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[9px] font-bold rounded-full flex items-center justify-center">7</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
              <span className="text-xs font-bold text-accent">TT</span>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

/* ======================== DASHBOARD PAGE ======================== */
const DashboardPage = () => (
  <>
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back. Here's your business overview.</p>
      </div>
      <select className="px-3 py-2 rounded-lg bg-secondary border border-border text-sm">
        <option>Last 30 days</option>
        <option>Last 7 days</option>
        <option>Last 90 days</option>
        <option>This year</option>
      </select>
    </div>

    {/* KPI Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "Total Revenue", value: "$88,000", change: "+12.5%", up: true, icon: DollarSign, sub: "This month" },
        { label: "New Leads", value: "176", change: "+8.2%", up: true, icon: Target, sub: "This month" },
        { label: "Active Installs", value: "42", change: "+5", up: true, icon: Zap, sub: "In progress" },
        { label: "Site Visitors", value: "12,480", change: "-3.1%", up: false, icon: Eye, sub: "This month" },
      ].map((kpi) => (
        <div key={kpi.label} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">{kpi.label}</span>
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
              <kpi.icon className="w-4 h-4 text-accent" />
            </div>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-2xl font-display font-bold text-foreground">{kpi.value}</span>
            <span className={`flex items-center gap-0.5 text-xs font-semibold mb-1 ${kpi.up ? "text-emerald-600" : "text-red-500"}`}>
              {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {kpi.change}
            </span>
          </div>
          <span className="text-[11px] text-muted-foreground">{kpi.sub}</span>
        </div>
      ))}
    </div>

    {/* Charts Row */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display font-semibold text-foreground">Revenue & Leads</h3>
            <p className="text-sm text-muted-foreground">Monthly performance overview</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-accent" /> Revenue</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-foreground/30" /> Leads</span>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(0 85% 46%)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(0 85% 46%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 90%)" />
              <XAxis dataKey="month" tick={{ fill: 'hsl(0 0% 40%)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'hsl(0 0% 40%)', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip contentStyle={{ background: 'hsl(0 0% 100%)', border: '1px solid hsl(0 0% 90%)', borderRadius: '8px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(0 85% 46%)" strokeWidth={2.5} fill="url(#revenueGrad)" />
              <Line type="monotone" dataKey="leads" stroke="hsl(0 0% 40%)" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-display font-semibold text-foreground mb-1">Service Breakdown</h3>
        <p className="text-sm text-muted-foreground mb-6">Revenue by service type</p>
        <div className="h-52 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={serviceBreakdown} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {serviceBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value}%`, '']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2 mt-4">
          {serviceBreakdown.map((s) => (
            <div key={s.name} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                {s.name}
              </span>
              <span className="font-semibold">{s.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Recent Leads & Traffic */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display font-semibold text-foreground">Recent Leads</h3>
            <p className="text-sm text-muted-foreground">6 new leads this week</p>
          </div>
          <button className="text-sm font-semibold text-accent hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Name</th>
                <th className="text-left py-3 px-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Service</th>
                <th className="text-left py-3 px-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">City</th>
                <th className="text-left py-3 px-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody>
              {allLeads.slice(0, 6).map((lead) => (
                <tr key={lead.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors cursor-pointer">
                  <td className="py-3 px-2">
                    <div>
                      <span className="font-semibold text-foreground">{lead.name}</span>
                      <span className="block text-[11px] text-muted-foreground">{lead.type}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-muted-foreground">{lead.service}</td>
                  <td className="py-3 px-2 text-muted-foreground">{lead.city}</td>
                  <td className="py-3 px-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[lead.status] || "bg-secondary text-muted-foreground"}`}>{lead.status}</span>
                  </td>
                  <td className="py-3 px-2 text-muted-foreground text-xs">{lead.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-display font-semibold text-foreground mb-1">Website Traffic</h3>
        <p className="text-sm text-muted-foreground mb-6">This week's visitors</p>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 90%)" />
              <XAxis dataKey="day" tick={{ fill: 'hsl(0 0% 40%)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'hsl(0 0% 40%)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'hsl(0 0% 100%)', border: '1px solid hsl(0 0% 90%)', borderRadius: '8px', fontSize: '12px' }} />
              <Bar dataKey="visitors" fill="hsl(0 85% 46%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6">
          <h4 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-3">Top Pages</h4>
          <div className="space-y-2.5">
            {topPages.map((p) => (
              <div key={p.page} className="flex items-center justify-between text-sm">
                <span className="text-foreground font-mono text-xs truncate max-w-[140px]">{p.page}</span>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground text-xs">{p.views.toLocaleString()}</span>
                  <span className="text-accent text-xs font-semibold">{p.conversion}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
);

/* ======================== LEADS PAGE ======================== */
const LeadsPage = ({ leads, filter, setFilter }: { leads: typeof allLeads; filter: string; setFilter: (f: string) => void }) => (
  <>
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Lead Management</h1>
        <p className="text-sm text-muted-foreground mt-1">{allLeads.length} total leads · {allLeads.filter(l => l.status === "New").length} new</p>
      </div>
      <div className="flex items-center gap-2">
        <button className="btn-primary-gradient text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add Lead</button>
        <button className="px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm flex items-center gap-2 hover:bg-muted transition-colors"><Download className="w-4 h-4" /> Export</button>
      </div>
    </div>

    {/* Filters */}
    <div className="flex items-center gap-2">
      {["All", "New", "Contacted", "Scheduled", "Proposal Sent", "Won"].map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filter === f ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground hover:bg-muted"}`}
        >
          {f} {f !== "All" && <span className="ml-1 opacity-60">({allLeads.filter(l => f === "All" || l.status === f).length})</span>}
        </button>
      ))}
    </div>

    {/* Leads Table */}
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Lead</th>
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Contact</th>
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Service</th>
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">City</th>
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Value</th>
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                <td className="py-4 px-4">
                  <span className="font-semibold text-foreground block">{lead.name}</span>
                  <span className="text-[11px] text-muted-foreground">{lead.type} · {lead.time}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-foreground block text-xs">{lead.phone}</span>
                  <span className="text-muted-foreground text-[11px]">{lead.email}</span>
                </td>
                <td className="py-4 px-4 text-muted-foreground">{lead.service}</td>
                <td className="py-4 px-4 text-muted-foreground">{lead.city}</td>
                <td className="py-4 px-4 font-semibold text-foreground">{lead.value}</td>
                <td className="py-4 px-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[lead.status]}`}>{lead.status}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors" title="Call"><Phone className="w-3.5 h-3.5 text-muted-foreground" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors" title="Email"><Mail className="w-3.5 h-3.5 text-muted-foreground" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors" title="Edit"><Pencil className="w-3.5 h-3.5 text-muted-foreground" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
);

/* ======================== PROPOSALS PAGE ======================== */
const ProposalsPage = () => (
  <>
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Proposals</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage quotes and proposals for clients</p>
      </div>
      <button className="btn-primary-gradient text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> New Proposal</button>
    </div>

    {/* Proposal Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      {[
        { label: "Total Pipeline", value: "$186,400", icon: DollarSign },
        { label: "Sent", value: "3", icon: Send },
        { label: "Accepted", value: "1", icon: Check },
        { label: "Win Rate", value: "68%", icon: Target },
      ].map((s) => (
        <div key={s.label} className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">{s.label}</span>
            <s.icon className="w-4 h-4 text-accent" />
          </div>
          <span className="text-xl font-display font-bold text-foreground">{s.value}</span>
        </div>
      ))}
    </div>

    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Client</th>
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Type</th>
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Value</th>
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Sent</th>
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Expires</th>
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {proposals.map((p) => (
              <tr key={p.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                <td className="py-4 px-4 font-semibold text-foreground">{p.client}</td>
                <td className="py-4 px-4 text-muted-foreground">{p.type}</td>
                <td className="py-4 px-4 font-semibold text-foreground">{p.value}</td>
                <td className="py-4 px-4 text-muted-foreground text-xs">{p.date}</td>
                <td className="py-4 px-4 text-muted-foreground text-xs">{p.expires}</td>
                <td className="py-4 px-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[p.status]}`}>{p.status}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors"><Eye className="w-3.5 h-3.5 text-muted-foreground" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors"><Pencil className="w-3.5 h-3.5 text-muted-foreground" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors"><Send className="w-3.5 h-3.5 text-muted-foreground" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
);

/* ======================== SCHEDULE PAGE ======================== */
const SchedulePage = () => (
  <>
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Schedule</h1>
        <p className="text-sm text-muted-foreground mt-1">Installations, surveys, and service calls</p>
      </div>
      <button className="btn-primary-gradient text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add Event</button>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Schedule List */}
      <div className="lg:col-span-2 space-y-4">
        {["Today", "Tomorrow", "Mar 26"].map((day) => (
          <div key={day}>
            <h3 className="font-display font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent" /> {day}
            </h3>
            <div className="space-y-2">
              {scheduleEvents.filter(e => e.date === day).map((event) => (
                <div key={event.id} className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${statusColors[event.type]}`}>{event.type}</span>
                        <span className="text-xs text-muted-foreground">{event.time}</span>
                      </div>
                      <h4 className="font-semibold text-foreground text-sm">{event.title}</h4>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.city}</span>
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {event.tech}</span>
                      </div>
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Team Overview */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-display font-semibold text-foreground mb-4">Team Today</h3>
        <div className="space-y-4">
          {[
            { name: "Mike R.", role: "Lead Installer", jobs: 1, status: "On-site" },
            { name: "Tim S.", role: "Sales / Survey", jobs: 2, status: "Available at 1 PM" },
            { name: "Carlos V.", role: "Technician", jobs: 1, status: "On-site" },
          ].map((t) => (
            <div key={t.name} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-xs font-bold text-accent">{t.name.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <span className="font-semibold text-foreground text-sm block">{t.name}</span>
                <span className="text-[11px] text-muted-foreground">{t.role} · {t.jobs} job(s)</span>
              </div>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">{t.status}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-3">Quick Stats</h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "This Week", value: "8 jobs" },
              { label: "Next Week", value: "12 jobs" },
              { label: "Avg/Day", value: "2.4" },
              { label: "Utilization", value: "87%" },
            ].map((s) => (
              <div key={s.label} className="text-center p-2 rounded-lg bg-secondary/50">
                <span className="text-lg font-display font-bold text-foreground block">{s.value}</span>
                <span className="text-[10px] text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
);

/* ======================== ANALYTICS PAGE ======================== */
const AnalyticsPage = () => {
  const conversionData = [
    { month: "Jan", rate: 2.8 }, { month: "Feb", rate: 3.1 }, { month: "Mar", rate: 3.5 },
    { month: "Apr", rate: 3.2 }, { month: "May", rate: 3.8 }, { month: "Jun", rate: 4.1 },
    { month: "Jul", rate: 3.9 }, { month: "Aug", rate: 4.3 }, { month: "Sep", rate: 4.5 },
    { month: "Oct", rate: 4.8 }, { month: "Nov", rate: 4.6 }, { month: "Dec", rate: 5.1 },
  ];

  const sourceData = [
    { name: "Google Organic", value: 45, color: "hsl(0 85% 46%)" },
    { name: "Direct", value: 22, color: "hsl(0 0% 15%)" },
    { name: "Google Maps", value: 18, color: "hsl(0 85% 56%)" },
    { name: "Referral", value: 10, color: "hsl(0 0% 40%)" },
    { name: "Social", value: 5, color: "hsl(0 0% 70%)" },
  ];

  return (
    <>
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Website performance and marketing insights</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Page Views", value: "48,250", change: "+15%" },
          { label: "Unique Visitors", value: "12,480", change: "+8%" },
          { label: "Avg Session", value: "3m 42s", change: "+12%" },
          { label: "Bounce Rate", value: "34.2%", change: "-5%" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4">
            <span className="text-xs text-muted-foreground">{s.label}</span>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-xl font-display font-bold text-foreground">{s.value}</span>
              <span className="text-xs font-semibold text-emerald-600 mb-0.5">{s.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-display font-semibold text-foreground mb-1">Conversion Rate</h3>
          <p className="text-sm text-muted-foreground mb-6">Monthly website-to-lead conversion</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 90%)" />
                <XAxis dataKey="month" tick={{ fill: 'hsl(0 0% 40%)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'hsl(0 0% 40%)', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip contentStyle={{ background: 'hsl(0 0% 100%)', border: '1px solid hsl(0 0% 90%)', borderRadius: '8px', fontSize: '12px' }} />
                <Line type="monotone" dataKey="rate" stroke="hsl(0 85% 46%)" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(0 85% 46%)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-display font-semibold text-foreground mb-1">Traffic Sources</h3>
          <p className="text-sm text-muted-foreground mb-6">Where your visitors come from</p>
          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sourceData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {sourceData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value}%`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {sourceData.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  {s.name}
                </span>
                <span className="font-semibold">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-display font-semibold text-foreground mb-1">Top Performing Pages</h3>
        <p className="text-sm text-muted-foreground mb-4">Ranked by conversion rate</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-xs uppercase tracking-wider font-semibold text-muted-foreground">Page</th>
                <th className="text-right py-3 px-2 text-xs uppercase tracking-wider font-semibold text-muted-foreground">Views</th>
                <th className="text-right py-3 px-2 text-xs uppercase tracking-wider font-semibold text-muted-foreground">Leads</th>
                <th className="text-right py-3 px-2 text-xs uppercase tracking-wider font-semibold text-muted-foreground">Conv. Rate</th>
              </tr>
            </thead>
            <tbody>
              {[
                { page: "/free-analysis", views: 1420, leads: 121, rate: 8.5 },
                { page: "/commercial-security", views: 1100, leads: 57, rate: 5.2 },
                { page: "/security-cameras", views: 2180, leads: 89, rate: 4.1 },
                { page: "/alarm-systems", views: 1950, leads: 74, rate: 3.8 },
                { page: "/hoa-security", views: 890, leads: 31, rate: 3.5 },
                { page: "/", views: 4520, leads: 145, rate: 3.2 },
                { page: "/residential-security", views: 980, leads: 28, rate: 2.9 },
              ].map((p) => (
                <tr key={p.page} className="border-b border-border/50">
                  <td className="py-3 px-2 font-mono text-xs text-foreground">{p.page}</td>
                  <td className="py-3 px-2 text-right text-muted-foreground">{p.views.toLocaleString()}</td>
                  <td className="py-3 px-2 text-right text-muted-foreground">{p.leads}</td>
                  <td className="py-3 px-2 text-right font-semibold text-accent">{p.rate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

/* ======================== REVIEWS PAGE ======================== */
const ReviewsPage = () => (
  <>
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Review Management</h1>
        <p className="text-sm text-muted-foreground mt-1">Monitor and respond to customer reviews</p>
      </div>
      <a href="https://maps.app.goo.gl/o4XYckgxB3B77AyW8" target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm flex items-center gap-2 hover:bg-muted transition-colors">
        <Globe className="w-4 h-4" /> View on Google
      </a>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      {[
        { label: "Average Rating", value: "4.9", icon: Star },
        { label: "Total Reviews", value: "284", icon: MessageSquare },
        { label: "This Month", value: "12", icon: Calendar },
        { label: "Response Rate", value: "95%", icon: Check },
      ].map((s) => (
        <div key={s.label} className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">{s.label}</span>
            <s.icon className="w-4 h-4 text-accent" />
          </div>
          <span className="text-xl font-display font-bold text-foreground">{s.value}</span>
        </div>
      ))}
    </div>

    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="font-display font-semibold text-foreground mb-4">Recent Reviews</h3>
      <div className="space-y-4">
        {[
          { name: "Michael T.", rating: 5, text: "Best security company in Houston. Professional installation and excellent monitoring service. Highly recommend!", date: "2 days ago", responded: true },
          { name: "Lisa R.", rating: 5, text: "Switched from ADT and couldn't be happier. Local monitoring, real people, and they actually know our system.", date: "4 days ago", responded: true },
          { name: "David K.", rating: 4, text: "Great camera system for our warehouse. Very responsive team. Minor delay on initial scheduling but everything else was perfect.", date: "1 week ago", responded: false },
          { name: "Jennifer W.", rating: 5, text: "The HOA gate camera system is fantastic. Board loves the LPR footage and remote viewing capabilities.", date: "1 week ago", responded: true },
          { name: "Robert M.", rating: 5, text: "Tim and his team are the best. They took over our alarm from Brinks and saved us money with better service.", date: "2 weeks ago", responded: false },
        ].map((r, i) => (
          <div key={i} className="flex gap-4 p-4 rounded-lg bg-secondary/50">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-accent">{r.name.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-foreground">{r.name}</span>
                  {r.responded && <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">Responded</span>}
                </div>
                <span className="text-xs text-muted-foreground">{r.date}</span>
              </div>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="w-3 h-3 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{r.text}</p>
              {!r.responded && (
                <button className="mt-2 text-xs font-semibold text-accent hover:underline">Reply to Review</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default AdminDashboard;
