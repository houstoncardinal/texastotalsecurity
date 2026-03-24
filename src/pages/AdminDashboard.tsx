import { useState } from "react";
import {
  LayoutDashboard, Users, FileText, BarChart3, Settings, Bell,
  Shield, Camera, Radio, Building2, Home, Phone, Mail, TrendingUp,
  TrendingDown, DollarSign, Calendar, ChevronDown, Search, LogOut,
  Menu, X, Star, MapPin, Clock, Activity, Eye, MousePointerClick,
  ArrowUpRight, ArrowDownRight, MessageSquare, Target, Zap,
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

const recentLeads = [
  { id: 1, name: "Robert Chen", type: "Residential", service: "Alarm System", city: "Sugar Land", status: "New", time: "12 min ago", phone: "(832) 555-0142" },
  { id: 2, name: "Martinez Properties", type: "Commercial", service: "Camera System", city: "Houston", status: "Contacted", time: "45 min ago", phone: "(713) 555-0198" },
  { id: 3, name: "Cypress HOA Board", type: "HOA", service: "Gate Cameras", city: "Cypress", status: "Scheduled", time: "2 hours ago", phone: "(281) 555-0167" },
  { id: 4, name: "Sarah Williams", type: "Residential", service: "Monitoring", city: "Katy", status: "New", time: "3 hours ago", phone: "(832) 555-0234" },
  { id: 5, name: "Pacific Retail Group", type: "Commercial", service: "Full System", city: "Pearland", status: "Proposal Sent", time: "5 hours ago", phone: "(713) 555-0312" },
  { id: 6, name: "Tom Jackson", type: "Residential", service: "Camera Install", city: "The Woodlands", status: "New", time: "6 hours ago", phone: "(281) 555-0456" },
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
  { icon: Settings, label: "Settings", id: "settings" },
];

const statusColors: Record<string, string> = {
  "New": "bg-accent/10 text-accent",
  "Contacted": "bg-blue-500/10 text-blue-600",
  "Scheduled": "bg-emerald-500/10 text-emerald-600",
  "Proposal Sent": "bg-amber-500/10 text-amber-600",
};

const AdminDashboard = () => {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-primary text-primary-foreground transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-[72px]"
        }`}
      >
        {/* Logo */}
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

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
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
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      activeNav === item.id ? "bg-accent-foreground/20" : "bg-accent text-accent-foreground"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="px-3 py-4 border-t border-primary-foreground/10">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors">
            <LogOut className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span>Back to Site</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-[72px]"}`}>
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search leads, pages, analytics..."
                className="w-80 pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                7
              </span>
            </button>
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
              <span className="text-xs font-bold text-accent">TT</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Page Title */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1">Welcome back. Here's your business overview.</p>
            </div>
            <div className="flex items-center gap-2">
              <select className="px-3 py-2 rounded-lg bg-secondary border border-border text-sm">
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>Last 90 days</option>
                <option>This year</option>
              </select>
            </div>
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
                    <kpi.icon className="w-4.5 h-4.5 text-accent" />
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
            {/* Revenue Chart */}
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
                    <Tooltip
                      contentStyle={{ background: 'hsl(0 0% 100%)', border: '1px solid hsl(0 0% 90%)', borderRadius: '8px', fontSize: '12px' }}
                      formatter={(value: number, name: string) => [name === 'revenue' ? `$${value.toLocaleString()}` : value, name === 'revenue' ? 'Revenue' : 'Leads']}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="hsl(0 85% 46%)" strokeWidth={2.5} fill="url(#revenueGrad)" />
                    <Line type="monotone" dataKey="leads" stroke="hsl(0 0% 40%)" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Service Breakdown */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-display font-semibold text-foreground mb-1">Service Breakdown</h3>
              <p className="text-sm text-muted-foreground mb-6">Revenue by service type</p>
              <div className="h-52 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {serviceBreakdown.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
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

          {/* Leads Table & Traffic */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Leads */}
            <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display font-semibold text-foreground">Recent Leads</h3>
                  <p className="text-sm text-muted-foreground">{recentLeads.length} new leads this week</p>
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
                    {recentLeads.map((lead) => (
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
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[lead.status] || "bg-secondary text-muted-foreground"}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-muted-foreground text-xs">{lead.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Website Traffic */}
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

              {/* Top Pages */}
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

          {/* Reviews & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Reviews */}
            <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display font-semibold text-foreground">Recent Reviews</h3>
                  <p className="text-sm text-muted-foreground">Monitor your online reputation</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-display font-bold text-foreground">4.9</span>
                  <span className="text-sm text-muted-foreground">(284 reviews)</span>
                </div>
              </div>
              <div className="space-y-4">
                {recentReviews.map((r, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-lg bg-secondary/50">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-accent">{r.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-foreground">{r.name}</span>
                        <span className="text-xs text-muted-foreground">{r.date}</span>
                      </div>
                      <div className="flex gap-0.5 mb-2">
                        {Array.from({ length: r.rating }).map((_, j) => (
                          <Star key={j} className="w-3 h-3 fill-accent text-accent" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{r.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-display font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-2.5">
                {[
                  { icon: Users, label: "Add New Lead", color: "bg-accent/10 text-accent" },
                  { icon: FileText, label: "Create Proposal", color: "bg-blue-500/10 text-blue-600" },
                  { icon: Calendar, label: "Schedule Install", color: "bg-emerald-500/10 text-emerald-600" },
                  { icon: Camera, label: "New Project", color: "bg-purple-500/10 text-purple-600" },
                  { icon: Mail, label: "Send Follow-Up", color: "bg-amber-500/10 text-amber-600" },
                  { icon: Phone, label: "Log a Call", color: "bg-cyan-500/10 text-cyan-600" },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm"
                  >
                    <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center`}>
                      <action.icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-foreground">{action.label}</span>
                  </button>
                ))}
              </div>

              {/* Activity Feed */}
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-3">Recent Activity</h4>
                <div className="space-y-3">
                  {[
                    { text: "New lead from Sugar Land", time: "12m ago", icon: Target },
                    { text: "Install completed — Katy", time: "2h ago", icon: Zap },
                    { text: "5-star review received", time: "4h ago", icon: Star },
                    { text: "Proposal viewed by client", time: "6h ago", icon: Eye },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
                        <item.icon className="w-3.5 h-3.5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <span className="text-foreground text-xs">{item.text}</span>
                        <span className="block text-[10px] text-muted-foreground">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
