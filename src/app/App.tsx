import React, { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard, Inbox, Users, BarChart3, Sparkles, Zap,
  BookOpen, Mic, Globe, MessageCircle, Mail, Instagram, Twitter,
  MessageSquare, CheckCircle2, Star, Shield, ArrowUpRight, Phone,
  Building2, Brain, Check, TrendingUp, Send, Activity, Hash,
  Package, Bell, Target, FileText, Clock, User, AlertCircle,
  ChevronRight, ChevronDown, Menu, Search, Settings, Filter,
  SortDesc, ThumbsUp, MoreHorizontal, Paperclip, Smile,
  CheckCheck, Plus, X, Download, Copy, RefreshCw, Key,
  ExternalLink, ArrowRight, Webhook, UserPlus, Tag,
  Code2, Play, Flag, Boxes, Layers, LogOut
} from "lucide-react";
import { B, G, gradText, Page, AuthScreen, AppScreen, GlassCard, Badge, Avatar, PrimaryBtn, OutlineBtn, SparkLine, SparkBar, ThemeCtx, ThemeToggle, OmniDeskLogo, OmniDeskIcon } from "./shared";
import { Nav, Footer, HomePage, FeaturesPage, PricingPage, AboutPage, BlogPage, BlogPostPage, ContactPage, DocsPage, CareersPage, CustomerStoriesPage, PrivacyPage, TermsPage } from "./marketing";
import { AuthShell } from "./auth";
import { AdvancedAnalytics, SocialListening, AutomationBuilder, KnowledgeBase, VoiceAI, AppBilling, AppSettings, AppAIInsights, AppReports, AppAudit } from "./advanced";
import { SuperAdmin, DevPortal, APIPlayground, EnterpriseMarketplace, SecurityCenter, MonitoringDashboard, AIGovernance, SystemStatus, WebhookManager, IntegrationCenter, FeatureFlags, WhiteLabel, ComplianceCenter, OrgHierarchy, SLAManagement } from "./enterprise";
import { AdminDashboard, AdminOrganizations, AdminRevenue, AdminSystemHealth, AdminAIUsage, AdminSupportQueue, AdminSecurity, AdminFeatureFlags, AdminSubscriptions, AdminIncidents } from "./admin";

// ═══════════════════════════════════════════════════════════════════
// CORE PRODUCT APPLICATION — v6.2 (Three-Platform Architecture)
// ═══════════════════════════════════════════════════════════════════

type Platform = "customer" | "enterprise" | "admin";

// ─── PLATFORM CONFIG ──────────────────────────────────────────────
const PLATFORMS: Record<Platform, { label:string; desc:string; badge:string; color:string; grad:string }> = {
  customer:   { label:"Customer Platform",  desc:"Daily operations",      badge:"Customer",   color:B.primary,  grad:`linear-gradient(135deg,${B.primary},${B.cyan})` },
  enterprise: { label:"Enterprise Platform",desc:"Large organizations",   badge:"Enterprise", color:B.purple,   grad:`linear-gradient(135deg,${B.purple},${B.primary})` },
  admin:      { label:"Admin Platform",     desc:"Internal operations",   badge:"Internal",   color:"#F97316",  grad:`linear-gradient(135deg,#EA580C,#F97316)` },
};

// ─── PLATFORM SWITCHER ────────────────────────────────────────────
function PlatformSwitcher({ current, onChange, collapsed }: { current:Platform; onChange:(p:Platform)=>void; collapsed:boolean }) {
  const [open, setOpen] = useState(false);
  const p = PLATFORMS[current];
  return (
    <div className="relative">
      <button onClick={()=>setOpen(!open)} className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition-colors hover:bg-white/5" style={{ color:B.text }}>
        <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-[8px] font-extrabold text-white" style={{ background:p.grad }}>{p.badge[0]}</div>
        {!collapsed && (
          <>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[11px] font-bold truncate" style={{ color:B.text }}>{p.label}</p>
              <p className="text-[9px]" style={{ color:B.dimmed }}>{p.desc}</p>
            </div>
            <ChevronDown size={12} style={{ color:B.dimmed, transform:open?"rotate(180deg)":"none", transition:"transform 0.15s" }}/>
          </>
        )}
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full mt-1 z-50 rounded-xl border overflow-hidden shadow-2xl" style={{ background:B.surface, borderColor:B.border }}>
          {(Object.entries(PLATFORMS) as [Platform, typeof PLATFORMS[Platform]][]).map(([id, cfg]) => (
            <button key={id} onClick={()=>{ onChange(id); setOpen(false); }} className="w-full flex items-center gap-2.5 px-3 py-2.5 transition-colors hover:bg-white/5" style={{ background:current===id?`${cfg.color}10`:"transparent" }}>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-[8px] font-extrabold text-white" style={{ background:cfg.grad }}>{cfg.badge[0]}</div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-[11px] font-semibold" style={{ color:current===id?cfg.color:B.text }}>{cfg.label}</p>
                <p className="text-[9px]" style={{ color:B.dimmed }}>{cfg.desc}</p>
              </div>
              {current===id && <Check size={11} style={{ color:cfg.color }}/>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── CORE DATA ───────────────────────────────────────────────────
const INBOX_CONVOS = [
  { id:"i1", name:"Sarah Mitchell", init:"SM", ch:"WhatsApp", chColor:"#25D366", preview:"My order #ORD-2847 still hasn't arrived after 8 days. This is completely unacceptable!", time:"2m", unread:3, priority:"urgent" as const, sentiment:"negative" as const, assignee:"Alex K.", sla:"warning" as const, tags:["shipping","escalation"] },
  { id:"i2", name:"James Chen",     init:"JC", ch:"Email",    chColor:B.primary,  preview:"We'd like to upgrade our contract to Enterprise — can we schedule a call this week?", time:"14m", unread:1, priority:"high" as const,   sentiment:"positive" as const, assignee:"Maya S.", sla:"ok" as const,      tags:["billing","upgrade"] },
  { id:"i3", name:"Emma Rodriguez", init:"ER", ch:"Instagram",chColor:"#E1306C",  preview:"Obsessed with the Horizon collection 💙 when does the navy colorway drop?",         time:"28m", unread:2, priority:"normal" as const, sentiment:"positive" as const, assignee:null,     sla:"ok" as const,      tags:["product"] },
  { id:"i4", name:"Michael Park",   init:"MP", ch:"Live Chat",chColor:"#F59E0B",  preview:"Locked out of my enterprise account for 2+ hours — this is critical for us.",       time:"35m", unread:0, priority:"urgent" as const, sentiment:"negative" as const, assignee:"David L.",sla:"breach" as const,  tags:["auth","enterprise"] },
  { id:"i5", name:"Lisa Thompson",  init:"LT", ch:"Messenger",chColor:"#0099FF",  preview:"Quick question about your API rate limits for the Webhooks integration we're building.", time:"1h", unread:0, priority:"normal" as const, sentiment:"neutral" as const, assignee:"Alex K.", sla:"ok" as const, tags:["api","developer"] },
  { id:"i6", name:"Daniel Wright",  init:"DW", ch:"Twitter/X",chColor:"#1DA1F2",  preview:"@OmniDesk just saved our team 3 hours today — mind if we share a case study? 🙌", time:"2h", unread:0, priority:"low" as const,    sentiment:"positive" as const, assignee:null,     sla:"ok" as const,      tags:["praise"] },
  { id:"i7", name:"Priya Sharma",   init:"PS", ch:"Telegram", chColor:"#2CA5E0",  preview:"Need help setting up automated responses for our 50-person support team. Tutorial?", time:"3h", unread:0, priority:"normal" as const, sentiment:"neutral" as const, assignee:"Maya S.", sla:"ok" as const, tags:["automation"] },
  { id:"i8", name:"Tom Bradley",    init:"TB", ch:"Email",    chColor:B.primary,  preview:"Invoice INV-00892 billing date is incorrect — please review and correct ASAP.",    time:"5h", unread:0, priority:"high" as const,   sentiment:"neutral" as const, assignee:"Maya S.", sla:"warning" as const, tags:["billing"] },
];

const THREAD_MSGS = [
  { id:"t1", role:"customer", text:"Hi, I placed order #ORD-2847 on June 22nd and it still hasn't arrived. The tracking shows it's been stuck in Chicago for 3 days now.", time:"10:14 AM" },
  { id:"t2", role:"agent",    text:"Hi Sarah! I'm so sorry to hear about the delay. Let me pull up your order details right away.", time:"10:16 AM", agent:"Alex K." },
  { id:"t3", role:"system",   text:"Order #ORD-2847 · FedEx · In Transit · Chicago hub · 3 days stalled" },
  { id:"t4", role:"customer", text:"This is really frustrating — I needed this for an event this weekend. I've been a Premium member for 3 years!", time:"10:18 AM" },
  { id:"t5", role:"agent",    text:"I completely understand, Sarah. I've escalated this with an urgent flag and opened a FedEx trace request. Your loyalty means everything to us.", time:"10:21 AM", agent:"Alex K." },
  { id:"t6", role:"customer", text:"My order #ORD-2847 still hasn't arrived. It's been 8 days now — please help me urgently.", time:"10:45 AM" },
];

const CRM_CONTACTS = [
  { id:"c1", name:"Sarah Mitchell", init:"SM", email:"sarah.m@techcorp.io",     company:"TechCorp Inc.",       plan:"Premium",    convos:24, revenue:"$4,200",  sentiment:"negative" as const, last:"2m",  risk:"High",   score:72 },
  { id:"c2", name:"James Chen",     init:"JC", email:"j.chen@globalventures.com",company:"Global Ventures",    plan:"Enterprise", convos:87, revenue:"$18,400", sentiment:"positive" as const, last:"14m", risk:"Low",    score:94 },
  { id:"c3", name:"Emma Rodriguez", init:"ER", email:"emma.r@creative.co",      company:"Creative Studio",     plan:"Pro",        convos:12, revenue:"$960",    sentiment:"positive" as const, last:"28m", risk:"Low",    score:88 },
  { id:"c4", name:"Michael Park",   init:"MP", email:"m.park@nexustech.com",    company:"Nexus Technologies",  plan:"Enterprise", convos:156, revenue:"$36,000",sentiment:"negative" as const, last:"35m", risk:"Critical",score:41 },
  { id:"c5", name:"Lisa Thompson",  init:"LT", email:"lisa@buildfast.dev",      company:"BuildFast Dev",       plan:"Pro",        convos:43, revenue:"$2,400",  sentiment:"neutral" as const,  last:"1h",  risk:"Medium", score:67 },
  { id:"c6", name:"Daniel Wright",  init:"DW", email:"dwright@innovate.co",     company:"Innovate Co.",        plan:"Free",       convos:7,  revenue:"—",       sentiment:"positive" as const, last:"2h",  risk:"Low",    score:82 },
];

const AI_CHAT = [
  { id:"a1", role:"ai",   text:"Good morning! I've analyzed your workspace since 9 AM. Here's what needs your attention:\n\n🔴 2 SLA breaches — Michael Park (auth lockout) and Tom Bradley (invoice dispute)\n⚠️ Sarah Mitchell at high churn risk — 3yr Premium, 8-day shipping delay\n📈 Conversation volume up 23% vs yesterday\n\nWhat would you like to tackle first?" },
  { id:"a2", role:"user", text:"Draft an empathetic reply for Sarah Mitchell that offers compensation." },
  { id:"a3", role:"ai",   text:"Here's a reply drafted for Sarah Mitchell:\n\n---\n\nHi Sarah,\n\nI'm truly sorry — after 3 years as a Premium member, you deserve so much better than this.\n\nHere's what I've done for you:\n• Filed an urgent trace with FedEx\n• Arranged overnight replacement at no charge\n• Added a 20% credit to your account\n\nYour replacement will arrive by tomorrow noon. I'll monitor this personally.\n\nSincerely, Alex K.\n\n---\n\nWant me to adjust the tone or compensation amount, or send this directly?" },
  { id:"a4", role:"user", text:"What's our biggest revenue opportunity this week?" },
  { id:"a5", role:"ai",   text:"Based on your CRM data, here are your top 3 revenue opportunities:\n\n**1. James Chen — Global Ventures ($18K ARR)**\nRequesting Enterprise upgrade. 87 conversations, 4.8 CSAT. Recommend: schedule a call today. Estimated upsell: +$6,400/year.\n\n**2. Lisa Thompson — BuildFast Dev ($2.4K ARR)**\nDeveloper actively building integrations. High engagement signal. Recommend: offer Pro+ trial. Estimated upsell: +$1,200/year.\n\n**3. Emma Rodriguez — Creative Studio**\nHigh sentiment, 12 convos. Growing usage pattern. Recommend: proactive outreach. Estimated conversion: Pro plan.\n\nTotal weekly opportunity: ~$8,200. Shall I draft outreach for each?" },
];

const DASH_VOL = [1842,2103,1967,2341,2687,2934,3012];
const DASH_CSAT = [4.2,4.4,4.3,4.6,4.5,4.7,4.8];
const DASH_RESP = [4.2,3.8,3.1,2.9,3.4,2.1,1.8];

// ─── APP SIDEBAR ─────────────────────────────────────────────────
const APP_NAV_CORE = [
  { id:"dashboard", label:"Dashboard",    icon:LayoutDashboard },
  { id:"inbox",     label:"Inbox",        icon:Inbox, badge:12 },
  { id:"crm",       label:"CRM",          icon:Users },
  { id:"ai",        label:"AI Assistant", icon:Sparkles },
  { id:"analytics", label:"Analytics",    icon:BarChart3 },
  { id:"social",    label:"Social Listen",icon:Globe },
  { id:"automation",label:"Automation",   icon:Zap },
  { id:"kb",        label:"Knowledge",    icon:BookOpen },
  { id:"voice",     label:"Voice AI",     icon:Mic },
  { id:"insights",  label:"AI Insights",  icon:Brain },
  { id:"reports",   label:"Reports",      icon:FileText },
  { id:"billing",   label:"Billing",      icon:Package },
  { id:"audit",     label:"Audit",        icon:Shield },
  { id:"settings",  label:"Settings",     icon:Settings },
];
// Enterprise Platform nav
const APP_NAV_ENTERPRISE = [
  { id:"superadmin",    label:"Ent. Dashboard",  icon:LayoutDashboard },
  { id:"ent-hierarchy", label:"Org Hierarchy",   icon:Layers },
  { id:"ent-sla",       label:"SLA Management",  icon:Clock },
  { id:"security2",     label:"Security Center", icon:Shield },
  { id:"compliance",    label:"Compliance",      icon:CheckCircle2 },
  { id:"monitoring",    label:"Monitoring",      icon:Activity },
  { id:"aigovernance",  label:"AI Governance",   icon:Brain },
  { id:"devportal",     label:"Dev Portal",      icon:Code2 },
  { id:"apiplay",       label:"API Playground",  icon:Play },
  { id:"marketplace2",  label:"Marketplace",     icon:Package },
  { id:"webhooks",      label:"Webhooks",        icon:Webhook },
  { id:"integrations",  label:"Integrations",    icon:Layers },
  { id:"featureflags",  label:"Feature Flags",   icon:Flag },
  { id:"whitelabel",    label:"White Label",     icon:Boxes },
  { id:"status",        label:"System Status",   icon:CheckCircle2 },
];
// Admin Platform nav
const APP_NAV_ADMIN = [
  { id:"adm-dashboard",     label:"Executive Dashboard", icon:LayoutDashboard },
  { id:"adm-orgs",          label:"Organizations",       icon:Building2 },
  { id:"adm-revenue",       label:"Revenue & MRR",       icon:TrendingUp },
  { id:"adm-subscriptions", label:"Subscriptions",       icon:Package },
  { id:"adm-support",       label:"Support Queue",       icon:MessageSquare, badge:47 },
  { id:"adm-incidents",     label:"Incidents",           icon:AlertCircle, badge:2 },
  { id:"adm-system",        label:"System Health",       icon:Activity },
  { id:"adm-ai",            label:"AI & LLM Usage",      icon:Brain },
  { id:"adm-security",      label:"Security & Fraud",    icon:Shield },
  { id:"adm-flags",         label:"Feature Flags",       icon:Flag },
];
const APP_NAV = [...APP_NAV_CORE, ...APP_NAV_ENTERPRISE];

function AppSidebar({ screen, setScreen, collapsed, onToggle, platform, setPlatform, onLogout }: { screen:AppScreen; setScreen:(s:AppScreen)=>void; collapsed:boolean; onToggle:()=>void; platform:Platform; setPlatform:(p:Platform)=>void; onLogout:()=>void }) {
  const P = PLATFORMS[platform];
  const nav = platform === "admin" ? APP_NAV_ADMIN : platform === "enterprise" ? APP_NAV_ENTERPRISE : APP_NAV_CORE;
  const activeColor = platform === "admin" ? "#F97316" : platform === "enterprise" ? B.purple : B.primary;
  return (
    <div className="flex flex-col h-full border-r flex-shrink-0 transition-all" style={{ width:collapsed?60:220, background:"var(--od-sidebar)", borderColor:B.border }}>
      <div className="flex items-center justify-between px-3 py-4 border-b flex-shrink-0" style={{ borderColor:B.border }}>
        {!collapsed && <OmniDeskLogo iconSize={28} textClass="text-xs"/>}
        {collapsed && <OmniDeskIcon size={28}/>}
        <button onClick={onToggle} className="transition-colors hover:text-white" style={{ color:B.dimmed, marginLeft:collapsed?"auto":0 }}>
          <Menu size={15}/>
        </button>
      </div>

      {/* Platform Switcher */}
      <div className="px-2 py-2 border-b" style={{ borderColor:B.border }}>
        <PlatformSwitcher current={platform} onChange={p=>{ setPlatform(p); setScreen(p==="admin"?"adm-dashboard" as AppScreen:p==="enterprise"?"superadmin":"dashboard"); }} collapsed={collapsed}/>
      </div>

      {/* Platform badge */}
      {!collapsed && (
        <div className="mx-3 mt-2 mb-1 px-2.5 py-1 rounded-lg text-center" style={{ background:`${activeColor}12` }}>
          <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color:activeColor }}>{P.label}</span>
        </div>
      )}

      <nav className="flex-1 px-2 py-2 overflow-y-auto" style={{ scrollbarWidth:"none" }}>
        <div className="space-y-0.5">
          {nav.map(({ id, label, icon:Icon, badge }: { id:string; label:string; icon:React.ElementType; badge?: number }) => {
            const active = screen === id;
            return (
              <button key={id} onClick={() => setScreen(id as AppScreen)} className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl relative transition-all" style={{ background:active?`${activeColor}18`:"transparent", color:active?activeColor:B.dimmed }}>
                {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full" style={{ background:activeColor }}/>}
                <Icon size={14} className="flex-shrink-0"/>
                {!collapsed && <span className="text-[11px] font-medium flex-1 text-left">{label}</span>}
                {!collapsed && badge && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background:`${activeColor}25`, color:activeColor }}>{badge}</span>}
                {collapsed && badge && <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full text-[8px] font-bold flex items-center justify-center text-white" style={{ background:activeColor }}>{badge}</span>}
              </button>
            );
          })}
        </div>
      </nav>
      <div className="px-2 pb-3 pt-2 border-t space-y-0.5" style={{ borderColor:B.border }}>
        {platform === "customer" && (
          <button onClick={() => setScreen("settings")} className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl transition-colors" style={{ color:B.dimmed }}>
            <Settings size={14}/>{!collapsed && <span className="text-[11px]">Settings</span>}
          </button>
        )}
        <button onClick={onLogout} className="flex items-center gap-2.5 px-2.5 py-2 w-full rounded-xl transition-colors hover:bg-white/5 group" title="Sign out">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 ring-2 ring-transparent group-hover:ring-current transition-all" style={{ background:G.hero, color:"transparent" }}>AK</div>
          {!collapsed && <div className="min-w-0 flex-1 text-left">
            <p className="text-[11px] font-semibold truncate" style={{ color:B.text }}>Alex K.</p>
            <p className="text-[9px]" style={{ color:B.dimmed }}>{platform==="admin"?"OmniDesk Employee":platform==="enterprise"?"Enterprise Admin":"Support Lead"}</p>
          </div>}
          {!collapsed && <LogOut size={12} className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color:B.dimmed }}/>}
        </button>
      </div>
    </div>
  );
}

// ─── APP TOPBAR ──────────────────────────────────────────────────
function AppTopBar({ screen, onCmd, onNotif, onSignOut, onLogout }: { screen:AppScreen; onCmd:()=>void; onNotif:()=>void; onSignOut:()=>void; onLogout?:()=>void }) {
  const labels: Record<string,string> = {
    // Customer Platform
    dashboard:"Dashboard", inbox:"Unified Inbox", crm:"CRM & Contacts", ai:"AI Assistant",
    analytics:"Analytics", social:"Social Listening", automation:"Automation Builder",
    kb:"Knowledge Base", voice:"Voice AI", insights:"AI Insights", reports:"Executive Reports",
    billing:"Billing", audit:"Audit Center", settings:"Settings",
    // Enterprise Platform
    superadmin:"Enterprise Dashboard", "ent-hierarchy":"Organization Hierarchy",
    "ent-sla":"SLA Management", devportal:"Developer Portal", apiplay:"API Playground",
    marketplace2:"Marketplace", security2:"Security Center", monitoring:"Monitoring & Observability",
    aigovernance:"AI Governance", status:"System Status", webhooks:"Webhook Manager",
    integrations:"Integration Center", featureflags:"Feature Flags (Enterprise)",
    whitelabel:"White Label", compliance:"Compliance Center",
    // Admin Platform
    "adm-dashboard":"Executive Dashboard", "adm-orgs":"Organizations",
    "adm-revenue":"Revenue & MRR", "adm-subscriptions":"Subscriptions",
    "adm-support":"Support Queue", "adm-incidents":"Incident Management",
    "adm-system":"System Health", "adm-ai":"AI & LLM Usage",
    "adm-security":"Security & Fraud", "adm-flags":"Feature Flags (Platform-wide)",
  };
  return (
    <div className="h-12 flex items-center justify-between px-4 border-b flex-shrink-0" style={{ background:"var(--od-topbar)", borderColor:B.border, backdropFilter:"blur(12px)" }}>
      <div className="flex items-center gap-2 text-xs" style={{ color:B.dimmed }}>
        <span style={{ color:B.muted }}>Nexus Technologies</span>
        <ChevronRight size={11}/>
        <span className="font-semibold" style={{ color:B.text }}>{labels[screen]}</span>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onCmd} className="flex items-center gap-2 h-7 px-3 rounded-lg text-[11px] border transition-colors hover:bg-white/5" style={{ background:"rgba(255,255,255,0.03)", borderColor:B.border, color:B.dimmed }}>
          <Search size={11}/><span>Search</span><kbd className="text-[9px] px-1.5 py-px rounded font-mono ml-1" style={{ background:`${B.primary}20`, color:B.primary }}>⌘K</kbd>
        </button>
        <button onClick={onNotif} className="relative h-7 w-7 flex items-center justify-center rounded-lg border transition-colors hover:bg-white/5" style={{ background:"rgba(255,255,255,0.03)", borderColor:B.border, color:B.dimmed }}>
          <Bell size={13}/><span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full" style={{ background:B.pink }}/>
        </button>
        <ThemeToggle/>
        <button onClick={onLogout||onSignOut} className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white transition-all hover:ring-2 hover:ring-white/30" style={{ background:G.hero }} title="Sign out">AK</button>
      </div>
    </div>
  );
}

// ─── COMMAND PALETTE ─────────────────────────────────────────────
function CommandPalette({ open, onClose, setScreen }: { open:boolean; onClose:()=>void; setScreen:(s:AppScreen)=>void }) {
  const [q, setQ] = useState("");
  if (!open) return null;
  const ALL_CMDS = [
    { label:"Go to Dashboard",        icon:LayoutDashboard, action:()=>{ setScreen("dashboard"); onClose(); } },
    { label:"Open Unified Inbox",     icon:Inbox,           action:()=>{ setScreen("inbox"); onClose(); } },
    { label:"Open CRM & Contacts",    icon:Users,           action:()=>{ setScreen("crm"); onClose(); } },
    { label:"Open AI Assistant",      icon:Sparkles,        action:()=>{ setScreen("ai"); onClose(); } },
    { label:"View Analytics",         icon:BarChart3,       action:()=>{ setScreen("analytics"); onClose(); } },
    { label:"Social Listening",       icon:Globe,           action:()=>{ setScreen("social"); onClose(); } },
    { label:"Automation Builder",     icon:Zap,             action:()=>{ setScreen("automation"); onClose(); } },
    { label:"Knowledge Base",         icon:BookOpen,        action:()=>{ setScreen("kb"); onClose(); } },
    { label:"Voice AI",               icon:Mic,             action:()=>{ setScreen("voice"); onClose(); } },
    { label:"AI Insights",            icon:Brain,           action:()=>{ setScreen("insights"); onClose(); } },
    { label:"Executive Reports",      icon:FileText,        action:()=>{ setScreen("reports"); onClose(); } },
    { label:"Billing & Subscription", icon:Package,         action:()=>{ setScreen("billing"); onClose(); } },
    { label:"Audit Center",           icon:Shield,          action:()=>{ setScreen("audit"); onClose(); } },
    { label:"Settings",               icon:Settings,        action:()=>{ setScreen("settings"); onClose(); } },
    { label:"Developer Portal",       icon:Code2,           action:()=>{ setScreen("devportal"); onClose(); } },
    { label:"API Playground",         icon:Play,            action:()=>{ setScreen("apiplay"); onClose(); } },
    { label:"Marketplace",            icon:Package,         action:()=>{ setScreen("marketplace2"); onClose(); } },
    { label:"Security Center",        icon:Shield,          action:()=>{ setScreen("security2"); onClose(); } },
    { label:"System Status",          icon:Activity,        action:()=>{ setScreen("status"); onClose(); } },
    { label:"Monitoring",             icon:Activity,        action:()=>{ setScreen("monitoring"); onClose(); } },
    { label:"AI Governance",          icon:Brain,           action:()=>{ setScreen("aigovernance"); onClose(); } },
    { label:"Super Admin Console",    icon:LayoutDashboard, action:()=>{ setScreen("superadmin"); onClose(); } },
    { label:"Feature Flags",          icon:Flag,            action:()=>{ setScreen("featureflags"); onClose(); } },
    { label:"White Label",            icon:Layers,          action:()=>{ setScreen("whitelabel"); onClose(); } },
    { label:"Compliance Center",      icon:Shield,          action:()=>{ setScreen("compliance"); onClose(); } },
  ];
  const cmds = ALL_CMDS.filter(c => !q || c.label.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24" onClick={onClose} style={{ background:"rgba(0,0,0,0.6)", backdropFilter:"blur(4px)" }}>
      <div className="w-full max-w-lg rounded-2xl border overflow-hidden" onClick={e=>e.stopPropagation()} style={{ background:B.surface, borderColor:`${B.primary}30`, boxShadow:`0 24px 80px rgba(0,0,0,0.6)` }}>
        <div className="flex items-center gap-3 px-4 h-12 border-b" style={{ borderColor:B.border }}>
          <Search size={14} style={{ color:B.dimmed }}/>
          <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search commands, pages, contacts…" className="flex-1 bg-transparent text-sm outline-none" style={{ color:B.text }}/>
          <kbd className="text-[10px] px-2 py-0.5 rounded font-mono" style={{ background:`${B.primary}15`, color:B.primary }}>ESC</kbd>
        </div>
        <div className="py-2 max-h-72 overflow-y-auto" style={{ scrollbarWidth:"none" }}>
          {!q && <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest" style={{ color:B.dimmed }}>Quick Actions</p>}
          {cmds.map(c=>(
            <button key={c.label} onClick={c.action} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5" style={{ color:B.muted }}>
              <c.icon size={14} style={{ color:B.primary }}/>{c.label}
            </button>
          ))}
          {cmds.length===0 && <p className="px-4 py-6 text-center text-sm" style={{ color:B.dimmed }}>No results for "{q}"</p>}
        </div>
      </div>
    </div>
  );
}

// ─── NOTIFICATION PANEL ──────────────────────────────────────────
function NotifPanel({ open, onClose }: { open:boolean; onClose:()=>void }) {
  if (!open) return null;
  const notifs = [
    { icon:AlertCircle, color:B.pink,    title:"SLA Breach — Michael Park",            sub:"Enterprise account locked out 2h+",  time:"2m" },
    { icon:TrendingUp,  color:B.success, title:"James Chen requested Enterprise upgrade", sub:"Schedule call to close deal",         time:"14m" },
    { icon:Sparkles,    color:B.purple,  title:"AI automation triggered 42 replies",    sub:"WhatsApp batch response completed",    time:"1h" },
    { icon:Star,        color:B.warning, title:"New CSAT report ready",                 sub:"June 2026 — Score: 4.8/5",             time:"2h" },
    { icon:Shield,      color:B.primary, title:"Security alert cleared",                sub:"Suspicious login attempt blocked",      time:"4h" },
    { icon:Package,     color:B.cyan,    title:"FedEx trace opened — ORD-2847",        sub:"Sarah Mitchell replacement in progress", time:"5h" },
  ];
  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      <div className="absolute top-12 right-4 w-80 rounded-2xl border overflow-hidden" onClick={e=>e.stopPropagation()} style={{ background:B.surface, borderColor:B.border, boxShadow:`0 16px 48px rgba(0,0,0,0.5)` }}>
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor:B.border }}>
          <span className="text-sm font-semibold" style={{ color:B.text }}>Notifications</span>
          <button className="text-[11px]" style={{ color:B.primary }}>Mark all read</button>
        </div>
        <div className="max-h-96 overflow-y-auto" style={{ scrollbarWidth:"none" }}>
          {notifs.map((n,i)=>(
            <div key={i} className="flex items-start gap-3 px-4 py-3 border-b hover:bg-white/5 transition-colors cursor-pointer" style={{ borderColor:B.border }}>
              <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background:`${n.color}18` }}>
                <n.icon size={12} style={{ color:n.color }}/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold" style={{ color:B.text }}>{n.title}</p>
                <p className="text-[10px] mt-0.5" style={{ color:B.dimmed }}>{n.sub}</p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-[9px]" style={{ color:B.dimmed }}>{n.time}</span>
                {i < 3 && <span className="w-1.5 h-1.5 rounded-full" style={{ background:B.primary }}/>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────────────
function AppDashboard({ setScreen }: { setScreen:(s:AppScreen)=>void }) {
  const kpis = [
    { label:"Today's Conversations", val:"234",  delta:"+12%",  up:true,  color:B.primary, data:DASH_VOL },
    { label:"Avg Response Time",      val:"2.8m", delta:"−24%",  up:true,  color:B.success, data:DASH_RESP },
    { label:"CSAT Score",             val:"4.6",  delta:"+0.2",  up:true,  color:B.warning, data:DASH_CSAT },
    { label:"AI Replies Sent",        val:"891",  delta:"+18%",  up:true,  color:B.purple,  data:DASH_VOL.map(v=>v*0.3) },
    { label:"Open Tickets",           val:"142",  delta:"−8%",   up:true,  color:B.cyan,    data:DASH_RESP.reverse() },
    { label:"SLA Health",             val:"94%",  delta:"+2%",   up:true,  color:B.success, data:DASH_CSAT },
    { label:"Revenue Today",          val:"$12.4k",delta:"+9%",  up:true,  color:B.pink,    data:DASH_VOL.map(v=>v*0.005) },
    { label:"Automation Savings",     val:"7.2h", delta:"+31%",  up:true,  color:B.warning, data:DASH_RESP.map(v=>v*2) },
  ];
  const activity = [
    { icon:AlertCircle, color:B.pink,    text:"SLA breached — Michael Park (Nexus Technologies)",          time:"2m" },
    { icon:TrendingUp,  color:B.success, text:"James Chen requested Enterprise upgrade — $6.4K opportunity",time:"14m" },
    { icon:Sparkles,    color:B.purple,  text:"AI automation #14 triggered 42 auto-replies on WhatsApp",    time:"1h" },
    { icon:CheckCircle2,color:B.success, text:"Priya Sharma's onboarding completed — 100% setup score",     time:"2h" },
    { icon:Star,        color:B.warning, text:"CSAT report for June 2026 generated — Score: 4.8/5",          time:"3h" },
    { icon:Package,     color:B.cyan,    text:"FedEx trace filed for ORD-2847 — Sarah Mitchell case",        time:"4h" },
  ];
  const agents = [
    { name:"Maya S.", resolved:47, csat:4.9, color:B.success },
    { name:"Alex K.", resolved:42, csat:4.8, color:B.primary },
    { name:"David L.",resolved:38, csat:4.7, color:B.cyan },
    { name:"Nina P.", resolved:31, csat:4.6, color:B.purple },
    { name:"Chris M.",resolved:28, csat:4.5, color:B.warning },
  ];
  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Good afternoon, Alex 👋</h1>
          <p className="text-xs mt-0.5" style={{ color:B.dimmed }}>Tuesday, July 1 · Your workspace is healthy · 94% SLA compliance</p>
        </div>
        <div className="flex gap-2">
          {[{l:"Reply",icon:MessageCircle,s:"inbox"},{l:"Add Contact",icon:UserPlus,s:"crm"},{l:"Analytics",icon:BarChart3,s:"analytics"},{l:"Ask AI",icon:Sparkles,s:"ai"}].map(a=>(
            <button key={a.l} onClick={()=>setScreen(a.s as AppScreen)} className="flex items-center gap-1.5 h-8 px-3 rounded-xl text-xs font-semibold border transition-all hover:bg-white/5" style={{ borderColor:B.border, color:B.muted }}>
              <a.icon size={11}/>{a.l}
            </button>
          ))}
          <PrimaryBtn small onClick={()=>setScreen("ai")}><Sparkles size={11}/>AI Report</PrimaryBtn>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {kpis.map(k=>(
          <GlassCard key={k.label} className="p-4">
            <div className="flex items-start justify-between mb-2">
              <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color:B.dimmed }}>{k.label}</p>
              <SparkLine data={k.data} color={k.color} w={60} h={24}/>
            </div>
            <p className="text-2xl font-extrabold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>{k.val}</p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight size={10} style={{ color:k.up?B.success:B.pink }}/>
              <span className="text-[10px] font-semibold" style={{ color:k.up?B.success:B.pink }}>{k.delta}</span>
              <span className="text-[10px]" style={{ color:B.dimmed }}>vs last week</span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Charts + Activity + Agents */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {/* Volume chart */}
        <GlassCard className="col-span-2 p-4">
          <div className="flex items-center justify-between mb-3">
            <div><p className="text-sm font-semibold" style={{ color:B.text }}>Conversation Volume</p><p className="text-[11px]" style={{ color:B.dimmed }}>This week vs last week</p></div>
            <div className="flex gap-3 text-[11px]" style={{ color:B.dimmed }}>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ background:B.primary }}/> This week</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ background:B.border }}/> Last week</span>
            </div>
          </div>
          <SparkLine data={DASH_VOL} color={B.primary} w={500} h={100}/>
          <div className="flex justify-between mt-1">
            {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=><span key={d} className="text-[9px]" style={{ color:B.dimmed }}>{d}</span>)}
          </div>
        </GlassCard>

        {/* Agent leaderboard */}
        <GlassCard className="p-4">
          <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>Agent Leaderboard</p>
          <div className="space-y-2.5">
            {agents.map((a,i)=>(
              <div key={a.name} className="flex items-center gap-2.5">
                <span className="text-[10px] font-bold w-4 text-right" style={{ color:B.dimmed }}>#{i+1}</span>
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0" style={{ background:a.color }}>{a.name[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between"><span className="text-[11px] font-semibold" style={{ color:B.text }}>{a.name}</span><span className="text-[10px]" style={{ color:B.dimmed }}>{a.resolved}</span></div>
                  <div className="h-1 rounded-full mt-1 overflow-hidden" style={{ background:B.s2 }}>
                    <div className="h-full rounded-full" style={{ width:`${(a.resolved/47)*100}%`, background:a.color }}/>
                  </div>
                </div>
                <span className="text-[10px] font-semibold" style={{ color:B.warning }}>★{a.csat}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {/* Activity */}
        <GlassCard className="col-span-2 p-4">
          <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>Recent Activity</p>
          <div className="space-y-2.5">
            {activity.map((a,i)=>(
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:`${a.color}18` }}><a.icon size={11} style={{ color:a.color }}/></div>
                <span className="text-[11px] flex-1" style={{ color:B.muted }}>{a.text}</span>
                <span className="text-[10px] flex-shrink-0" style={{ color:B.dimmed }}>{a.time}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* AI Daily Summary */}
        <GlassCard className="p-4" style={{ borderColor:`${B.purple}25`, background:`${B.purple}08` }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background:G.ai }}><Sparkles size={11} className="text-white"/></div>
            <span className="text-xs font-semibold" style={{ color:B.purple }}>AI Daily Summary</span>
          </div>
          <p className="text-[11px] leading-relaxed mb-3" style={{ color:B.muted }}>
            23% volume spike — primarily WhatsApp. 3 escalations flagged. Response time improved 24%. Recommend increasing WhatsApp staffing 2–4 PM. James Chen deal is hot — act today.
          </p>
          <div className="space-y-1.5">
            {[{l:"Churn risks",v:"2 accounts",c:B.pink},{l:"Revenue opportunities",v:"$8.2K",c:B.success},{l:"AI deflection rate",v:"62%",c:B.purple}].map(m=>(
              <div key={m.l} className="flex justify-between text-[10px]">
                <span style={{ color:B.dimmed }}>{m.l}</span>
                <span className="font-semibold" style={{ color:m.c }}>{m.v}</span>
              </div>
            ))}
          </div>
          <button onClick={()=>setScreen("ai")} className="mt-3 text-[11px] font-semibold flex items-center gap-1" style={{ color:B.purple }}>Full AI report<ArrowRight size={10}/></button>
        </GlassCard>
      </div>
    </div>
  );
}

// ─── UNIFIED INBOX ───────────────────────────────────────────────
// ─── LOGOUT MODAL ────────────────────────────────────────────────
function LogoutModal({ onConfirm, onCancel }: { onConfirm:()=>void; onCancel:()=>void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center" onClick={onCancel} style={{ background:"rgba(0,0,0,0.7)", backdropFilter:"blur(6px)" }}>
      <div className="w-80 rounded-2xl border overflow-hidden" onClick={e=>e.stopPropagation()} style={{ background:B.surface, borderColor:B.border, boxShadow:`0 32px 80px rgba(0,0,0,0.6)` }}>
        <div className="px-6 pt-6 pb-4 text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background:`${B.danger||"#EF4444"}12` }}>
            <LogOut size={24} style={{ color:"#EF4444" }}/>
          </div>
          <h2 className="text-base font-bold mb-1" style={{ color:B.text }}>Sign out of OmniDesk AI?</h2>
          <p className="text-sm" style={{ color:B.muted }}>You'll be returned to the login screen. All unsaved changes will be lost.</p>
        </div>
        <div className="px-6 pb-4 border-t pt-4" style={{ borderColor:B.border }}>
          <div className="flex items-center gap-3 mb-4 px-3 py-2.5 rounded-xl" style={{ background:B.s2 }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0" style={{ background:G.hero }}>AK</div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold truncate" style={{ color:B.text }}>Alex K.</p>
              <p className="text-[11px] truncate" style={{ color:B.dimmed }}>alex@nexustech.com · Support Lead</p>
            </div>
          </div>
          <div className="flex gap-3">
            <OutlineBtn onClick={onCancel} className="flex-1 justify-center h-10 text-sm">Cancel</OutlineBtn>
            <button onClick={onConfirm} className="flex-1 h-10 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 flex items-center justify-center gap-2" style={{ background:"#EF4444" }}>
              <LogOut size={14}/>Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── INBOX SECTION LABELS ─────────────────────────────────────────
const INBOX_SECTIONS = [
  { id:"all",      icon:Inbox,        label:"All",      color:"" },
  { id:"mine",     icon:User,         label:"Mine",     color:"" },
  { id:"priority", icon:AlertCircle,  label:"Priority", color:"" },
  { id:"waiting",  icon:Clock,        label:"Waiting",  color:"" },
  { id:"resolved", icon:CheckCircle2, label:"Resolved", color:"" },
  { id:"labels",   icon:Tag,          label:"Labels",   color:"" },
] as const;

type InboxSection = typeof INBOX_SECTIONS[number]["id"];

function AppInbox() {
  const [sel, setSel] = useState("i1");
  const [section, setSection] = useState<InboxSection>("all");
  const [aiTab, setAiTab] = useState<"ai"|"info"|"tl">("ai");
  const [reply, setReply] = useState("");
  const [search, setSearch] = useState("");

  const prioColor: Record<string,string> = { urgent:"#EF4444", high:B.warning, normal:B.primary, low:B.slate };
  const slaColor:  Record<string,string>  = { ok:B.success, warning:B.warning, breach:"#EF4444" };

  // Resolved mock data
  const RESOLVED_CONVOS = [
    { id:"r1", name:"Priya Sharma",   init:"PS", ch:"Telegram",  chColor:"#2CA5E0", preview:"Setup complete — automated responses working perfectly! Thank you!", time:"1d", unread:0, priority:"normal" as const, status:"resolved" as const, sentiment:"positive" as const, assignee:"Maya S.", sla:"ok" as const, tags:["automation"] },
    { id:"r2", name:"Daniel Wright",  init:"DW", ch:"Twitter/X", chColor:"#1DA1F2", preview:"Case study published! OmniDesk feature in our blog. 🎉",              time:"2d", unread:0, priority:"low" as const,    status:"resolved" as const, sentiment:"positive" as const, assignee:"Alex K.", sla:"ok" as const, tags:["praise"] },
  ];

  const filteredConvos = (() => {
    let base = [...INBOX_CONVOS, ...(section==="resolved" ? RESOLVED_CONVOS : [])];
    if (section === "mine")     base = base.filter(c=>c.assignee==="Alex K.");
    if (section === "priority") base = base.filter(c=>c.priority==="urgent"||c.priority==="high");
    if (section === "waiting")  base = base.filter(c=>c.status==="pending");
    if (section === "resolved") base = RESOLVED_CONVOS;
    if (section === "labels")   base = INBOX_CONVOS.filter(c=>c.tags.length>0);
    if (search) base = base.filter(c=>c.name.toLowerCase().includes(search.toLowerCase())||c.preview.toLowerCase().includes(search.toLowerCase()));
    return base;
  })();

  // Ensure selected convo is always valid
  const convo = INBOX_CONVOS.find(c=>c.id===sel) || RESOLVED_CONVOS.find(c=>c.id===sel) || INBOX_CONVOS[0];

  const sentColor: Record<string,string> = { positive:B.success, neutral:B.slate, negative:B.pink };
  const aiReplies = [
    "I sincerely apologize for the 8-day delay, Sarah. As a 3-year Premium member you deserve better. I've arranged overnight replacement at no charge + 20% credit. Tracking details within the hour.",
    "Hi Sarah, I completely understand your frustration. I've filed an urgent FedEx trace and your replacement is being expedited at no cost. I'll personally monitor and update you every step of the way.",
    "Sarah, I'm so sorry. Your loyalty means everything to us. Replacement shipped overnight — free. 20% credit added. I'll follow up by 10 AM tomorrow.",
  ];

  // Section counts
  const counts: Record<InboxSection,number> = {
    all:      INBOX_CONVOS.length,
    mine:     INBOX_CONVOS.filter(c=>c.assignee==="Alex K.").length,
    priority: INBOX_CONVOS.filter(c=>c.priority==="urgent"||c.priority==="high").length,
    waiting:  INBOX_CONVOS.filter(c=>c.status==="pending").length,
    resolved: RESOLVED_CONVOS.length,
    labels:   INBOX_CONVOS.filter(c=>c.tags.length>0).length,
  };

  return (
    <div className="flex h-full">
      {/* Filter sidebar — now fully interactive */}
      <div className="w-16 flex flex-col border-r flex-shrink-0" style={{ background:"var(--od-sidebar)", borderColor:B.border }}>
        <div className="h-10 flex items-center justify-center border-b" style={{ borderColor:B.border }}>
          <Inbox size={14} style={{ color:B.dimmed }}/>
        </div>
        {INBOX_SECTIONS.map(({ id, icon:Icon, label })=>{
          const active = section === id;
          const count = counts[id];
          return (
            <button key={id} onClick={()=>{ setSection(id); if(!filteredConvos.find(c=>c.id===sel)) setSel(filteredConvos[0]?.id||"i1"); }} title={label}
              className="flex flex-col items-center gap-0.5 py-3 w-full transition-all relative"
              style={{ color:active?B.primary:B.dimmed, borderLeft:active?`2px solid ${B.primary}`:"2px solid transparent" }}>
              <Icon size={15}/>
              <span className="text-[8px] font-medium">{label}</span>
              {count > 0 && (
                <span className="text-[7px] font-bold px-1 py-px rounded-full" style={{ background:active?B.primary:`${B.primary}18`, color:active?"#fff":B.primary }}>{count}</span>
              )}
            </button>
          );
        })}
        {/* Labels legend when on labels section */}
        {section==="labels" && (
          <div className="mt-auto p-2 border-t" style={{ borderColor:B.border }}>
            {["shipping","billing","api","product","praise"].map(tag=>(
              <button key={tag} className="w-full text-[9px] px-1.5 py-1 rounded-md mb-0.5 text-left truncate" style={{ color:B.dimmed, background:`${B.primary}06` }}># {tag}</button>
            ))}
          </div>
        )}
      </div>

      {/* Conversation list */}
      <div className="w-72 flex flex-col border-r flex-shrink-0" style={{ borderColor:B.border, background:"var(--od-bg)" }}>
        <div className="p-3 border-b flex-shrink-0" style={{ borderColor:B.border }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold" style={{ color:B.text }}>{INBOX_SECTIONS.find(s=>s.id===section)?.label}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold" style={{ background:`${B.primary}18`, color:B.primary }}>{filteredConvos.length}</span>
            </div>
            <div className="flex gap-1">
              <button className="w-6 h-6 flex items-center justify-center rounded-lg transition-colors hover:bg-white/5" style={{ color:B.dimmed }}><Filter size={11}/></button>
              <button className="w-6 h-6 flex items-center justify-center rounded-lg transition-colors hover:bg-white/5" style={{ color:B.dimmed }}><SortDesc size={11}/></button>
            </div>
          </div>
          <div className="flex items-center gap-1.5 h-7 px-2.5 rounded-lg" style={{ background:`${B.primary}08`, border:`1px solid ${B.border}` }}>
            <Search size={11} style={{ color:B.dimmed }}/><input value={search} onChange={e=>setSearch(e.target.value)} className="flex-1 text-[11px] bg-transparent outline-none" placeholder="Search conversations…" style={{ color:B.text }}/>
            {search && <button onClick={()=>setSearch("")} style={{ color:B.dimmed }}><X size={11}/></button>}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth:"none" }}>
          {filteredConvos.length === 0 && (
            <div className="flex flex-col items-center justify-center h-48 text-center px-4">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-3" style={{ background:`${B.primary}12` }}>
                {section==="resolved"?<CheckCircle2 size={18} style={{ color:B.success }}/>:section==="mine"?<User size={18} style={{ color:B.primary }}/>:<Inbox size={18} style={{ color:B.primary }}/>}
              </div>
              <p className="text-xs font-semibold" style={{ color:B.text }}>No conversations</p>
              <p className="text-[10px] mt-1" style={{ color:B.dimmed }}>
                {section==="mine"?"No conversations assigned to you":section==="resolved"?"All caught up!":section==="waiting"?"No conversations waiting":"Nothing here yet"}
              </p>
            </div>
          )}
          {filteredConvos.map(c=>{
            const active=c.id===sel;
            return (
              <button key={c.id} onClick={()=>setSel(c.id)} className="w-full text-left px-3 py-3 border-b relative transition-all" style={{ borderColor:`${B.border}`, background:active?`${B.primary}10`:"transparent" }}>
                {active && <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background:B.primary }}/>}
                <div className="flex items-start gap-2.5">
                  <div className="relative flex-shrink-0">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background:`linear-gradient(135deg,${prioColor[c.priority]},${prioColor[c.priority]}88)` }}>{c.init}</div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ background:"var(--od-bg)" }}>
                      <div className="w-2 h-2 rounded-full" style={{ background:c.chColor }}/>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[11px] font-semibold truncate" style={{ color:B.text }}>{c.name}</span>
                      <div className="flex items-center gap-1.5 flex-shrink-0 ml-1">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background:slaColor[c.sla] }}/>
                        <span className="text-[9px]" style={{ color:B.dimmed }}>{c.time}</span>
                      </div>
                    </div>
                    <p className="text-[10px] truncate leading-relaxed" style={{ color:B.dimmed }}>{c.preview}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full mt-0.5" style={{ background:prioColor[c.priority] }}/>
                        {c.tags.slice(0,1).map(t=><span key={t} className="text-[9px] px-1.5 py-px rounded-full" style={{ background:`${B.primary}15`, color:B.primary }}>#{t}</span>)}
                      </div>
                      {c.unread>0 && <span className="text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center text-white" style={{ background:B.primary }}>{c.unread}</span>}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Message thread */}
      <div className="flex flex-col flex-1 min-w-0" style={{ background:"var(--od-bg)" }}>
        <div className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0" style={{ borderColor:B.border }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background:G.hero }}>{convo.init}</div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold" style={{ color:B.text }}>{convo.name}</span>
                <Badge color={prioColor[convo.priority]}>{convo.priority}</Badge>
                <Badge color={sentColor[convo.sentiment]}>{convo.sentiment}</Badge>
                {convo.sla==="breach" && <Badge color="#EF4444">SLA BREACH</Badge>}
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-[11px]" style={{ color:B.dimmed }}>
                <span style={{ color:convo.chColor }}>● {convo.ch}</span>
                {convo.assignee && <span>· <span style={{ color:B.primary }}>{convo.assignee}</span></span>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {["Archive","Resolve","Escalate"].map(a=><button key={a} className="h-7 px-2.5 rounded-lg text-[11px] border transition-colors hover:bg-white/5" style={{ borderColor:B.border, color:B.muted }}>{a}</button>)}
            <PrimaryBtn small>Assign</PrimaryBtn>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth:"none" }}>
          {THREAD_MSGS.map(m=>(
            <div key={m.id}>
              {m.role==="system" ? (
                <div className="flex items-center gap-3 my-1">
                  <div className="flex-1 h-px" style={{ background:B.border }}/>
                  <span className="text-[9px] px-2 py-1 rounded-full border flex items-center gap-1" style={{ background:`${B.primary}08`, borderColor:B.border, color:B.dimmed }}><Zap size={8} style={{ color:B.primary }}/>{m.text}</span>
                  <div className="flex-1 h-px" style={{ background:B.border }}/>
                </div>
              ) : m.role==="customer" ? (
                <div className="flex items-end gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0" style={{ background:`linear-gradient(135deg,${prioColor[convo.priority]},${prioColor[convo.priority]}88)` }}>{convo.init}</div>
                  <div className="max-w-sm">
                    <div className="rounded-2xl rounded-bl-md px-3.5 py-2.5 text-xs leading-relaxed" style={{ background:B.s2, color:B.text, border:`1px solid ${B.border}` }}>{m.text}</div>
                    <p className="text-[9px] mt-1 ml-1" style={{ color:B.dimmed }}>{m.time}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-end gap-2 flex-row-reverse">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0" style={{ background:G.hero }}>AK</div>
                  <div className="max-w-sm">
                    <div className="rounded-2xl rounded-br-md px-3.5 py-2.5 text-xs leading-relaxed text-white" style={{ background:G.hero }}>{m.text}</div>
                    <div className="flex items-center justify-end gap-1 mt-1 mr-1">
                      <p className="text-[9px]" style={{ color:B.dimmed }}>{m.agent} · {m.time}</p>
                      <CheckCheck size={9} style={{ color:B.primary }}/>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {/* Typing */}
          <div className="flex items-end gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white" style={{ background:`linear-gradient(135deg,${prioColor[convo.priority]},${prioColor[convo.priority]}88)` }}>{convo.init}</div>
            <div className="flex items-center gap-1 px-3.5 py-2.5 rounded-2xl rounded-bl-md" style={{ background:B.s2, border:`1px solid ${B.border}` }}>
              {[0,1,2].map(i=><div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background:B.dimmed, animation:`typingBounce 0.8s ease-in-out ${i*0.15}s infinite` }}/>)}
            </div>
          </div>
        </div>
        {/* Reply box */}
        <div className="p-3 border-t flex-shrink-0" style={{ borderColor:B.border }}>
          <div className="rounded-xl border p-3" style={{ background:B.surface, borderColor:`${B.primary}20` }}>
            <div className="flex items-center gap-1.5 mb-2 pb-2 border-b" style={{ borderColor:B.border }}>
              {["Reply","Note","Email"].map((t,i)=><button key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-md transition-colors" style={{ background:i===0?`${B.primary}15`:"transparent", color:i===0?B.primary:B.dimmed }}>{t}</button>)}
            </div>
            <textarea value={reply} onChange={e=>setReply(e.target.value)} className="w-full text-xs bg-transparent outline-none resize-none" placeholder="Type a reply… or press Tab for AI suggestions" rows={3} style={{ color:B.text }}/>
            <div className="flex items-center justify-between mt-2">
              <div className="flex gap-1.5">
                {[Paperclip,Smile,Mic].map((Icon,i)=><button key={i} className="w-6 h-6 flex items-center justify-center rounded-md transition-colors hover:bg-white/5" style={{ color:B.dimmed }}><Icon size={12}/></button>)}
                <button className="flex items-center gap-1 h-6 px-2 rounded-md text-[11px] font-semibold" style={{ background:`${B.purple}15`, color:B.purple }}><Sparkles size={9}/>AI Draft</button>
              </div>
              <PrimaryBtn small><Send size={11}/>Send Reply</PrimaryBtn>
            </div>
          </div>
        </div>
      </div>

      {/* Right rail */}
      <div className="w-72 flex flex-col border-l flex-shrink-0" style={{ borderColor:B.border, background:"var(--od-bg)" }}>
        <div className="flex border-b flex-shrink-0" style={{ borderColor:B.border }}>
          {(["ai","info","tl"] as const).map(t=><button key={t} onClick={()=>setAiTab(t)} className="flex-1 py-3 text-[11px] font-medium capitalize transition-colors border-b-2" style={{ color:aiTab===t?B.primary:B.dimmed, borderColor:aiTab===t?B.primary:"transparent" }}>{t==="ai"?"AI Assist":t==="info"?"Customer":"Timeline"}</button>)}
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-3" style={{ scrollbarWidth:"none" }}>
          {aiTab==="ai" && <>
            <GlassCard className="p-3">
              <p className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color:B.dimmed }}>AI Analysis</p>
              <div className="space-y-1.5">
                {[{l:"Sentiment",v:"Negative",c:B.pink},{l:"Intent",v:"Escalation",c:B.warning},{l:"Priority",v:"Urgent",c:"#EF4444"}].map(r=>(
                  <div key={r.l} className="flex items-center gap-2"><span className="text-[10px]" style={{ color:B.dimmed }}>{r.l}:</span><Badge color={r.c}>{r.v}</Badge></div>
                ))}
              </div>
              <div className="mt-3 rounded-lg p-2.5 text-[10px] leading-relaxed" style={{ background:`${B.purple}10`, border:`1px solid ${B.purple}20` }}>
                <span className="font-semibold" style={{ color:B.purple }}>AI: </span><span style={{ color:B.muted }}>Premium 3yr customer, high churn risk. Shipping delay 8 days. FedEx trace active. Compensation recommended.</span>
              </div>
            </GlassCard>
            <div>
              <div className="flex items-center justify-between mb-2"><p className="text-[9px] font-bold uppercase tracking-widest" style={{ color:B.dimmed }}>Suggested Replies</p><button className="text-[9px]" style={{ color:B.primary }}><RefreshCw size={9} className="inline"/> Refresh</button></div>
              <div className="space-y-2">
                {aiReplies.map((r,i)=>(
                  <button key={i} onClick={()=>setReply(r)} className="w-full text-left rounded-xl p-2.5 text-[10px] leading-relaxed border transition-all hover:border-current" style={{ background:`${B.primary}05`, borderColor:B.border, color:B.muted }}>
                    <div className="flex items-center gap-1 mb-1"><Sparkles size={8} style={{ color:B.purple }}/><span className="text-[9px] font-semibold uppercase tracking-wide" style={{ color:B.purple }}>Option {i+1}</span></div>
                    <p className="line-clamp-3">{r}</p>
                  </button>
                ))}
              </div>
            </div>
            <GlassCard className="p-3">
              <p className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color:B.dimmed }}>Quick AI Actions</p>
              <div className="space-y-1.5">
                {[{l:"Translate",ic:Globe},{l:"Summarize",ic:Brain},{l:"Rewrite",ic:RefreshCw},{l:"Grammar fix",ic:CheckCircle2}].map(a=>(
                  <button key={a.l} className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] border transition-colors hover:bg-white/5" style={{ borderColor:B.border, color:B.muted }}><a.ic size={11} style={{ color:B.primary }}/>{a.l}</button>
                ))}
              </div>
            </GlassCard>
          </>}
          {aiTab==="info" && (
            <GlassCard className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background:G.hero }}>{convo.init}</div>
                <div><p className="text-sm font-bold" style={{ color:B.text }}>{convo.name}</p><p className="text-[11px]" style={{ color:B.dimmed }}>TechCorp Inc. · Premium</p></div>
              </div>
              {[{l:"Email",v:"sarah.m@techcorp.io"},{l:"Plan",v:"Premium · 3 years"},{l:"LTV",v:"$12,480"},{l:"CSAT",v:"4.2/5"},{l:"Tickets",v:"24 total"}].map(r=>(
                <div key={r.l} className="flex justify-between py-1.5 border-b text-[11px]" style={{ borderColor:B.border }}>
                  <span style={{ color:B.dimmed }}>{r.l}</span><span style={{ color:B.text }}>{r.v}</span>
                </div>
              ))}
            </GlassCard>
          )}
          {aiTab==="tl" && (
            <div className="space-y-3">
              {[{e:"Order #ORD-2847 placed",t:"Jun 22 · 9:14 AM",c:B.primary},{e:"Order shipped via FedEx",t:"Jun 23 · 2:31 PM",c:B.success},{e:"Tracking stalled — Chicago hub",t:"Jun 27 · 8:00 AM",c:B.warning},{e:"Support ticket opened",t:"Jul 1 · 10:14 AM",c:B.primary},{e:"Escalated to Senior Support",t:"Jul 1 · 10:21 AM",c:B.purple},{e:"FedEx trace filed",t:"Jul 1 · 10:22 AM",c:B.success}].map((ev,i)=>(
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background:`${ev.c}18` }}><div className="w-1.5 h-1.5 rounded-full" style={{ background:ev.c }}/></div>
                  <div><p className="text-[11px] font-medium" style={{ color:B.text }}>{ev.e}</p><p className="text-[9px] mt-0.5" style={{ color:B.dimmed }}>{ev.t}</p></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── CRM ─────────────────────────────────────────────────────────
function AppCRM({ onOpen360 }: { onOpen360:(id:string)=>void }) {
  const [sel, setSel] = useState<string|null>(null);
  const [view, setView] = useState<"table"|"kanban">("table");
  const contact = CRM_CONTACTS.find(c=>c.id===sel);
  const riskColor = { Low:B.success, Medium:B.warning, High:B.pink, Critical:"#EF4444" } as Record<string,string>;
  const sentColor = { positive:B.success, neutral:B.slate, negative:B.pink } as Record<string,string>;
  const planColor = { Enterprise:B.purple, Premium:B.primary, Pro:B.success, Free:B.slate } as Record<string,string>;
  const kanbanCols = [
    { label:"New Leads",   color:B.cyan,    contacts:CRM_CONTACTS.slice(0,2) },
    { label:"Qualified",   color:B.primary, contacts:CRM_CONTACTS.slice(2,3) },
    { label:"Proposal",    color:B.purple,  contacts:CRM_CONTACTS.slice(3,5) },
    { label:"Closed Won",  color:B.success, contacts:CRM_CONTACTS.slice(5) },
  ];
  return (
    <div className="flex h-full">
      <div className="flex flex-col flex-1 min-w-0">
        <div className="p-4 border-b flex-shrink-0" style={{ borderColor:B.border }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold" style={{ color:B.text }}>Contacts & CRM</h2>
            <div className="flex items-center gap-2">
              <div className="flex rounded-lg overflow-hidden border" style={{ borderColor:B.border }}>
                {(["table","kanban"] as const).map(v=><button key={v} onClick={()=>setView(v)} className="h-7 px-3 text-[11px] font-medium capitalize transition-colors" style={{ background:view===v?B.primary:"transparent", color:view===v?"#fff":B.dimmed }}>{v}</button>)}
              </div>
              <button className="flex items-center gap-1.5 h-7 px-3 rounded-lg text-[11px] border" style={{ background:"rgba(255,255,255,0.03)", borderColor:B.border, color:B.dimmed }}><Filter size={10}/>Filter</button>
              <PrimaryBtn small><UserPlus size={11}/>Add Contact</PrimaryBtn>
            </div>
          </div>
          <div className="flex items-center gap-2 h-8 px-3 rounded-lg" style={{ background:`${B.primary}06`, border:`1px solid ${B.border}` }}>
            <Search size={12} style={{ color:B.dimmed }}/><input className="flex-1 text-xs bg-transparent outline-none" placeholder="Search contacts, companies…" style={{ color:B.text }}/>
          </div>
        </div>
        <div className="flex-1 overflow-auto" style={{ scrollbarWidth:"none" }}>
          {view==="table" ? (
            <table className="w-full">
              <thead className="sticky top-0" style={{ background:"rgba(8,14,26,0.95)", backdropFilter:"blur(8px)" }}>
                <tr className="border-b" style={{ borderColor:B.border }}>
                  {["Contact","Company","Plan","Conversations","Revenue","Sentiment","Risk","Score"].map(h=>(
                    <th key={h} className="text-left px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color:B.dimmed }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CRM_CONTACTS.map(c=>(
                  <tr key={c.id} onClick={()=>setSel(c.id===sel?null:c.id)} className="border-b cursor-pointer transition-colors" style={{ borderColor:`${B.border}`, background:sel===c.id?`${B.primary}08`:"transparent" }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background:G.hero }}>{c.init}</div>
                        <div><p className="text-xs font-semibold" style={{ color:B.text }}>{c.name}</p><p className="text-[10px]" style={{ color:B.dimmed }}>{c.email}</p></div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><div className="flex items-center gap-1.5 text-xs" style={{ color:B.muted }}><Building2 size={10}/>{c.company}</div></td>
                    <td className="px-4 py-3"><Badge color={planColor[c.plan]||B.slate}>{c.plan}</Badge></td>
                    <td className="px-4 py-3"><span className="text-xs font-semibold" style={{ color:B.text }}>{c.convos}</span></td>
                    <td className="px-4 py-3"><span className="text-xs" style={{ color:B.text }}>{c.revenue}</span></td>
                    <td className="px-4 py-3"><div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full" style={{ background:sentColor[c.sentiment] }}/><span className="text-[11px] capitalize" style={{ color:B.muted }}>{c.sentiment}</span></div></td>
                    <td className="px-4 py-3"><span className="text-[11px] font-semibold" style={{ color:riskColor[c.risk]||B.slate }}>{c.risk}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background:B.s2 }}>
                          <div className="h-full rounded-full" style={{ width:`${c.score}%`, background:c.score>80?B.success:c.score>60?B.warning:B.pink }}/>
                        </div>
                        <span className="text-[10px] font-bold" style={{ color:B.text }}>{c.score}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex gap-3 p-4 h-full overflow-x-auto">
              {kanbanCols.map(col=>(
                <div key={col.label} className="w-56 flex-shrink-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full" style={{ background:col.color }}/><span className="text-xs font-semibold" style={{ color:B.text }}>{col.label}</span>
                    <span className="text-[9px] font-bold px-1.5 py-px rounded-full ml-auto" style={{ background:`${col.color}15`, color:col.color }}>{col.contacts.length}</span>
                  </div>
                  <div className="space-y-2">
                    {col.contacts.map(c=>(
                      <GlassCard key={c.id} className="p-3 cursor-pointer hover:border-opacity-60 transition-all" style={{ borderColor:`${col.color}20` }}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0" style={{ background:G.hero }}>{c.init}</div>
                          <div className="min-w-0"><p className="text-[11px] font-semibold truncate" style={{ color:B.text }}>{c.name}</p><p className="text-[9px] truncate" style={{ color:B.dimmed }}>{c.company}</p></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge color={planColor[c.plan]||B.slate}>{c.plan}</Badge>
                          <span className="text-[10px]" style={{ color:B.dimmed }}>{c.revenue}</span>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Contact profile panel */}
      {contact && (
        <div className="w-72 flex-shrink-0 border-l overflow-y-auto" style={{ borderColor:B.border, background:"var(--od-bg)", scrollbarWidth:"none" }}>
          <div className="p-5 border-b" style={{ background:`linear-gradient(180deg,${B.primary}10,transparent)`, borderColor:B.border }}>
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold text-white" style={{ background:G.hero }}>{contact.init}</div>
              <div className="flex gap-1">
                <button onClick={()=>onOpen360(contact.id)} className="h-7 px-2.5 rounded-lg text-[11px] border flex items-center gap-1" style={{ borderColor:B.border, color:B.primary }}><ExternalLink size={10}/>360° View</button>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg border" style={{ borderColor:B.border, color:B.dimmed }}><MoreHorizontal size={13}/></button>
              </div>
            </div>
            <h3 className="text-sm font-bold" style={{ color:B.text }}>{contact.name}</h3>
            <p className="text-xs mt-0.5" style={{ color:B.dimmed }}>{contact.company}</p>
            <div className="flex gap-2 mt-2"><Badge color={planColor[contact.plan]||B.slate}>{contact.plan}</Badge><Badge color={sentColor[contact.sentiment]}>{contact.sentiment}</Badge></div>
          </div>
          <div className="p-4 space-y-3">
            {[{l:"Email",v:contact.email},{l:"Revenue",v:contact.revenue},{l:"Conversations",v:String(contact.convos)},{l:"Last seen",v:contact.last},{l:"Risk",v:contact.risk},{l:"Lead score",v:String(contact.score)}].map(r=>(
              <div key={r.l} className="flex justify-between text-[11px] py-1.5 border-b" style={{ borderColor:B.border }}>
                <span style={{ color:B.dimmed }}>{r.l}</span><span style={{ color:B.text }}>{r.v}</span>
              </div>
            ))}
            <div className="rounded-xl p-3" style={{ background:`${B.purple}10`, border:`1px solid ${B.purple}20` }}>
              <div className="flex items-center gap-1.5 mb-1.5"><Sparkles size={10} style={{ color:B.purple }}/><span className="text-[9px] font-bold uppercase tracking-wide" style={{ color:B.purple }}>AI Insight</span></div>
              <p className="text-[10px] leading-relaxed" style={{ color:B.muted }}>High-value {contact.plan} client. Upgrade likelihood: <span className="font-bold" style={{ color:B.success }}>78%</span>. Recommend proactive outreach with custom pricing.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── AI ASSISTANT ────────────────────────────────────────────────
function AppAI() {
  const [msgs, setMsgs] = useState(AI_CHAT);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const suggestions = ["Summarize today's conversations","Find all unhappy customers","Generate weekly executive report","What's our biggest revenue opportunity?","Draft a follow-up for James Chen","Translate Sarah's message to French","Create a workflow for shipping delays","Predict churn risk this month"];
  const send = () => {
    if (!input.trim()) return;
    const um = { id:`u${Date.now()}`, role:"user" as const, text:input };
    const am = { id:`a${Date.now()}`, role:"ai" as const, text:"Analyzing your workspace data… I'll have insights ready in a moment. Based on your current conversations and CRM data, here's what I found." };
    setMsgs(p=>[...p,um,am]); setInput("");
    setTimeout(()=>endRef.current?.scrollIntoView({ behavior:"smooth" }),100);
  };
  return (
    <div className="flex h-full">
      <div className="w-52 flex-shrink-0 border-r flex flex-col" style={{ borderColor:B.border, background:"var(--od-sidebar)" }}>
        <div className="p-3 border-b flex-shrink-0" style={{ borderColor:B.border }}>
          <button className="w-full flex items-center gap-2 h-8 px-3 rounded-xl text-xs font-semibold text-white" style={{ background:G.ai }}><Plus size={12}/>New Chat</button>
        </div>
        <div className="flex-1 p-2 overflow-y-auto" style={{ scrollbarWidth:"none" }}>
          <p className="text-[9px] text-center uppercase tracking-widest mb-2 mt-1" style={{ color:B.dimmed }}>Today</p>
          {["Urgent ticket summary","James Chen deal analysis","Sarah Mitchell reply","CSAT deep dive"].map(t=>(
            <button key={t} className="w-full text-left px-2.5 py-2 rounded-lg text-[11px] truncate transition-colors hover:bg-white/5" style={{ color:B.muted }}>{t}</button>
          ))}
          <p className="text-[9px] text-center uppercase tracking-widest mb-2 mt-3" style={{ color:B.dimmed }}>Yesterday</p>
          {["June CSAT report","Revenue forecast Q3","Churn risk analysis"].map(t=>(
            <button key={t} className="w-full text-left px-2.5 py-2 rounded-lg text-[11px] truncate transition-colors hover:bg-white/5" style={{ color:B.muted }}>{t}</button>
          ))}
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="p-4 border-b flex items-center gap-3 flex-shrink-0" style={{ borderColor:B.border }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background:G.ai }}><Sparkles size={16} className="text-white"/></div>
          <div><p className="text-sm font-bold" style={{ color:B.text }}>OmniDesk AI</p><p className="text-[11px]" style={{ color:B.dimmed }}>Your intelligent support co-pilot · Connected to all channels</p></div>
          <div className="ml-auto flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ background:B.success }}/><span className="text-[11px] font-medium" style={{ color:B.success }}>Active</span></div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4" style={{ scrollbarWidth:"none" }}>
          {msgs.map(m=>(
            <div key={m.id} className={`flex items-start gap-3 ${m.role==="user"?"flex-row-reverse":""}`}>
              <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-white ${m.role==="ai"?"":""}`} style={{ background:m.role==="ai"?G.ai:G.hero }}>
                {m.role==="ai"?<Sparkles size={12}/>:"AK"}
              </div>
              <div className="max-w-lg rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-line" style={{ background:m.role==="user"?G.hero:B.surface, color:B.text, border:m.role==="ai"?`1px solid ${B.border}`:"none" }}>
                {m.text}
                {m.role==="ai" && <div className="flex gap-2 mt-2 pt-2 border-t text-[10px]" style={{ borderColor:B.border }}>
                  <button className="flex items-center gap-1" style={{ color:B.dimmed }}><Copy size={9}/>Copy</button>
                  <button className="flex items-center gap-1" style={{ color:B.dimmed }}><ThumbsUp size={9}/>Helpful</button>
                </div>}
              </div>
            </div>
          ))}
          <div ref={endRef}/>
        </div>
        <div className="px-6 pb-3 flex flex-wrap gap-2">
          {suggestions.slice(0,4).map(s=><button key={s} onClick={()=>setInput(s)} className="text-[11px] px-3 py-1.5 rounded-full border transition-colors hover:border-current" style={{ background:`${B.primary}06`, borderColor:B.border, color:B.dimmed }}>{s}</button>)}
        </div>
        <div className="px-6 pb-5">
          <div className="flex items-end gap-3 rounded-2xl p-3 border" style={{ background:B.surface, borderColor:`${B.primary}20` }}>
            <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} className="flex-1 bg-transparent text-xs outline-none resize-none" placeholder="Ask OmniDesk AI anything about your support workspace…" rows={2} style={{ color:B.text }}/>
            <button onClick={send} className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white flex-shrink-0" style={{ background:input.trim()?G.ai:`${B.primary}20` }}><Send size={13}/></button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CUSTOMER 360° WORKSPACE ─────────────────────────────────────
function Customer360({ id, onBack }: { id:string; onBack:()=>void }) {
  const [tab, setTab] = useState("overview");
  const contact = CRM_CONTACTS.find(c=>c.id===id) || CRM_CONTACTS[0];
  const tabs = ["Overview","Conversations","Emails","Files","Orders","Pipeline","AI Insights","Timeline"];
  const riskColor = { Low:B.success, Medium:B.warning, High:B.pink, Critical:"#EF4444" } as Record<string,string>;
  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b flex-shrink-0" style={{ background:`linear-gradient(180deg,${B.primary}12,transparent)`, borderColor:B.border }}>
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs mb-4 transition-colors hover:text-white" style={{ color:B.dimmed }}><ArrowRight size={11} className="rotate-180"/>Back to CRM</button>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white" style={{ background:G.hero, boxShadow:`0 0 24px ${B.primary}40` }}>{contact.init}</div>
            <div>
              <h1 className="text-xl font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>{contact.name}</h1>
              <p className="text-sm mt-0.5" style={{ color:B.dimmed }}>{contact.company}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <Badge color={B.primary}>{contact.plan}</Badge>
                <Badge color={riskColor[contact.risk]||B.slate}>Risk: {contact.risk}</Badge>
                <Badge color={B.success}>Score: {contact.score}</Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {[{l:"Send Message",ic:MessageCircle},{l:"Schedule Call",ic:Phone},{l:"Create Task",ic:Target},{l:"Add Note",ic:FileText}].map(a=>(
              <button key={a.l} className="flex items-center gap-1.5 h-8 px-3 rounded-xl text-xs border transition-all hover:bg-white/5" style={{ borderColor:B.border, color:B.muted }}><a.ic size={11}/>{a.l}</button>
            ))}
            <PrimaryBtn small><Sparkles size={11}/>AI Insights</PrimaryBtn>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex border-b flex-shrink-0 overflow-x-auto" style={{ borderColor:B.border, scrollbarWidth:"none" }}>
        {tabs.map(t=><button key={t} onClick={()=>setTab(t.toLowerCase())} className="px-5 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors flex-shrink-0" style={{ color:tab===t.toLowerCase()?B.primary:B.dimmed, borderColor:tab===t.toLowerCase()?B.primary:"transparent" }}>{t}</button>)}
      </div>
      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-5" style={{ scrollbarWidth:"none" }}>
        {tab==="overview" && (
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3 space-y-4">
              <div className="grid grid-cols-4 gap-3">
                {[{l:"Total Revenue",v:contact.revenue,c:B.success},{l:"Conversations",v:String(contact.convos),c:B.primary},{l:"Avg CSAT",v:"4.2/5",c:B.warning},{l:"Open Tickets",v:"1",c:B.pink}].map(s=>(
                  <GlassCard key={s.l} className="p-4">
                    <p className="text-[10px] uppercase tracking-wide mb-1" style={{ color:B.dimmed }}>{s.l}</p>
                    <p className="text-2xl font-extrabold" style={{ fontFamily:"'Poppins',sans-serif", color:s.c }}>{s.v}</p>
                  </GlassCard>
                ))}
              </div>
              <GlassCard className="p-4">
                <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>Conversation History (All Channels)</p>
                <div className="space-y-2">
                  {INBOX_CONVOS.slice(0,3).map(c=>(
                    <div key={c.id} className="flex items-center gap-3 p-2.5 rounded-xl border" style={{ borderColor:B.border, background:`rgba(255,255,255,0.02)` }}>
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background:c.chColor }}/><span className="text-xs flex-1" style={{ color:B.muted }}>{c.preview.slice(0,60)}…</span><span className="text-[10px]" style={{ color:B.dimmed }}>{c.time}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
            <div className="space-y-3">
              <GlassCard className="p-4">
                <p className="text-xs font-semibold mb-3" style={{ color:B.text }}>Contact Details</p>
                {[{l:"Email",v:contact.email},{l:"Company",v:contact.company},{l:"Plan",v:contact.plan},{l:"Last seen",v:contact.last}].map(r=>(
                  <div key={r.l} className="flex flex-col py-1.5 border-b text-[11px]" style={{ borderColor:B.border }}>
                    <span style={{ color:B.dimmed }}>{r.l}</span><span style={{ color:B.text }}>{r.v}</span>
                  </div>
                ))}
              </GlassCard>
              <GlassCard className="p-4" style={{ borderColor:`${B.purple}25` }}>
                <div className="flex items-center gap-2 mb-3"><Sparkles size={13} style={{ color:B.purple }}/><p className="text-xs font-semibold" style={{ color:B.purple }}>AI Insights</p></div>
                <div className="space-y-2">
                  {[{l:"Churn risk",v:"Medium",c:B.warning},{l:"Upsell score",v:"78%",c:B.success},{l:"Next best action",v:"Call today",c:B.cyan}].map(m=>(
                    <div key={m.l} className="flex justify-between text-[10px]"><span style={{ color:B.dimmed }}>{m.l}</span><span className="font-bold" style={{ color:m.c }}>{m.v}</span></div>
                  ))}
                </div>
                <div className="mt-3 p-2 rounded-lg text-[10px] leading-relaxed" style={{ background:`${B.purple}10` }}>
                  <span style={{ color:B.muted }}>Recommend enterprise upgrade conversation. High engagement signal this week. Win probability: 78%.</span>
                </div>
              </GlassCard>
            </div>
          </div>
        )}
        {tab!=="overview" && (
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background:`${B.primary}12` }}><Sparkles size={20} style={{ color:B.primary }}/></div>
              <p className="text-sm font-semibold" style={{ color:B.text }}>{tab.charAt(0).toUpperCase()+tab.slice(1)}</p>
              <p className="text-xs mt-1" style={{ color:B.dimmed }}>Content for this tab loads here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── CORE APP ROOT ────────────────────────────────────────────────
function CoreApp({ onSignOut }: { onSignOut:()=>void }) {
  const [screen, setScreen] = useState<AppScreen>("dashboard");
  const [platform, setPlatform] = useState<Platform>("customer");
  const [collapsed, setCollapsed] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [customer360, setCustomer360] = useState<string|null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if ((e.metaKey||e.ctrlKey) && e.key==="k") { e.preventDefault(); setCmdOpen(p=>!p); }};
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (customer360) {
    return (
      <div className="flex h-screen w-screen overflow-hidden" style={{ background:B.bg, color:B.text, fontFamily:"'Inter',sans-serif" }}>
        <AppSidebar screen={screen} setScreen={s=>{setScreen(s);setCustomer360(null);}} collapsed={collapsed} onToggle={()=>setCollapsed(p=>!p)} platform={platform} setPlatform={setPlatform} onLogout={()=>setLogoutOpen(true)}/>
        <div className="flex flex-col flex-1 min-w-0">
          <AppTopBar screen={screen} onCmd={()=>setCmdOpen(true)} onNotif={()=>setNotifOpen(p=>!p)} onSignOut={onSignOut} onLogout={()=>setLogoutOpen(true)}/>
          <main className="flex-1 overflow-hidden"><Customer360 id={customer360} onBack={()=>setCustomer360(null)}/></main>
        </div>
        <CommandPalette open={cmdOpen} onClose={()=>setCmdOpen(false)} setScreen={s=>{setScreen(s);setCustomer360(null);}}/>
        <NotifPanel open={notifOpen} onClose={()=>setNotifOpen(false)}/>
        {logoutOpen && <LogoutModal onConfirm={()=>{ setLogoutOpen(false); onSignOut(); }} onCancel={()=>setLogoutOpen(false)}/>}
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden" style={{ background:B.bg, color:B.text, fontFamily:"'Inter',sans-serif" }}>
      <AppSidebar screen={screen} setScreen={setScreen} collapsed={collapsed} onToggle={()=>setCollapsed(p=>!p)} platform={platform} setPlatform={setPlatform} onLogout={()=>setLogoutOpen(true)}/>
      <div className="flex flex-col flex-1 min-w-0">
        <AppTopBar screen={screen} onCmd={()=>setCmdOpen(true)} onNotif={()=>setNotifOpen(p=>!p)} onSignOut={onSignOut} onLogout={()=>setLogoutOpen(true)}/>
        <main className="flex-1 overflow-hidden" key={screen}>
          {screen==="dashboard"  && <AppDashboard setScreen={setScreen}/>}
          {screen==="inbox"      && <AppInbox/>}
          {screen==="crm"        && <AppCRM onOpen360={id=>{setCustomer360(id);}}/>}
          {screen==="ai"         && <AppAI/>}
          {screen==="analytics"  && <AdvancedAnalytics/>}
          {screen==="social"     && <SocialListening/>}
          {screen==="automation" && <AutomationBuilder/>}
          {screen==="kb"         && <KnowledgeBase/>}
          {screen==="voice"      && <VoiceAI/>}
          {screen==="insights"   && <AppAIInsights/>}
          {screen==="reports"    && <AppReports/>}
          {screen==="billing"    && <AppBilling/>}
          {screen==="audit"      && <AppAudit/>}
          {screen==="settings"    && <AppSettings/>}
          {screen==="superadmin"  && <SuperAdmin/>}
          {screen==="devportal"   && <DevPortal/>}
          {screen==="apiplay"     && <APIPlayground/>}
          {screen==="marketplace2"&& <EnterpriseMarketplace/>}
          {screen==="security2"   && <SecurityCenter/>}
          {screen==="monitoring"  && <MonitoringDashboard/>}
          {screen==="aigovernance"&& <AIGovernance/>}
          {screen==="status"      && <SystemStatus/>}
          {screen==="webhooks"    && <WebhookManager/>}
          {screen==="integrations"&& <IntegrationCenter/>}
          {screen==="featureflags"&& <FeatureFlags/>}
          {screen==="whitelabel"  && <WhiteLabel/>}
          {screen==="compliance"  && <ComplianceCenter/>}
          {/* ── Admin Platform ── */}
          {screen==="adm-dashboard"     && <AdminDashboard     setScreen={setScreen}/>}
          {screen==="adm-orgs"          && <AdminOrganizations setScreen={setScreen}/>}
          {screen==="adm-revenue"       && <AdminRevenue       setScreen={setScreen}/>}
          {screen==="adm-support"       && <AdminSupportQueue  setScreen={setScreen}/>}
          {screen==="adm-system"        && <AdminSystemHealth/>}
          {screen==="adm-ai"            && <AdminAIUsage/>}
          {screen==="adm-security"      && <AdminSecurity      setScreen={setScreen}/>}
          {screen==="adm-flags"         && <AdminFeatureFlags/>}
          {screen==="adm-subscriptions" && <AdminSubscriptions/>}
          {screen==="adm-incidents"     && <AdminIncidents/>}
          {/* ── Enterprise additions ── */}
          {screen==="ent-hierarchy"     && <OrgHierarchy/>}
          {screen==="ent-sla"           && <SLAManagement/>}
        </main>
      </div>
      <CommandPalette open={cmdOpen} onClose={()=>setCmdOpen(false)} setScreen={setScreen}/>
      <NotifPanel open={notifOpen} onClose={()=>setNotifOpen(false)}/>
      {logoutOpen && <LogoutModal onConfirm={()=>{ setLogoutOpen(false); onSignOut(); }} onCancel={()=>setLogoutOpen(false)}/>}
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [view, setView] = useState<"site" | "auth" | "app">("site");
  const [authScreen, setAuthScreen] = useState<AuthScreen>("landing");
  const [isDark, setIsDark] = useState(true);
  const topRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => setIsDark(d => !d);
  const themeCtx = { isDark, toggle: toggleTheme };

  const navigate = (p: Page) => {
    setPage(p); topRef.current?.scrollTo({ top:0 }); window.scrollTo({ top:0 });
  };
  const openAuth = (s: AuthScreen) => { setAuthScreen(s); setView("auth"); window.scrollTo({ top:0 }); };
  const backToSite = () => { setView("site"); window.scrollTo({ top:0 }); };
  const launchApp  = () => { setView("app"); };

  if (view === "app") return (
    <ThemeCtx.Provider value={themeCtx}>
      <div data-theme={isDark?"dark":"light"} style={{ fontFamily:"'Inter',sans-serif" }}>
        <CoreApp onSignOut={backToSite}/>
      </div>
    </ThemeCtx.Provider>
  );

  if (view === "auth") return (
    <ThemeCtx.Provider value={themeCtx}>
      <div data-theme={isDark?"dark":"light"} style={{ fontFamily:"'Inter',sans-serif" }}>
        <AuthShell screen={authScreen} setScreen={setAuthScreen} onBack={backToSite} onLaunch={launchApp}/>
      </div>
    </ThemeCtx.Provider>
  );

  return (
    <ThemeCtx.Provider value={themeCtx}>
      <div data-theme={isDark?"dark":"light"} ref={topRef} style={{ background:B.bg, color:B.text, fontFamily:"'Inter',sans-serif", minHeight:"100vh" }}>
        <Nav page={page} setPage={navigate} onAuth={openAuth}/>
        <div key={page}>
          {page === "home"     && <HomePage    setPage={navigate}/>}
          {page === "features" && <FeaturesPage setPage={navigate}/>}
          {page === "pricing"  && <PricingPage/>}
          {page === "about"    && <AboutPage/>}
          {page === "blog"     && <BlogPage setPage={navigate}/>}
          {page === "blogpost" && <BlogPostPage setPage={navigate}/>}
          {page === "contact"  && <ContactPage/>}
          {page === "docs"      && <DocsPage setPage={navigate}/>}
          {page === "careers"   && <CareersPage setPage={navigate}/>}
          {page === "stories"   && <CustomerStoriesPage setPage={navigate}/>}
          {page === "privacy"   && <PrivacyPage/>}
          {page === "terms"     && <TermsPage/>}
        </div>
        <Footer setPage={navigate}/>
      </div>
    </ThemeCtx.Provider>
  );
}
