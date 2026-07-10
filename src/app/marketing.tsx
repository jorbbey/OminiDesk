import React, { useState, useEffect } from "react";
import {
  Menu, X, ChevronDown, ChevronRight, Sparkles, ArrowRight, Play,
  Inbox, Bot, Users, BarChart3, Zap, BookOpen, Mic, Globe,
  MessageCircle, Mail, Instagram, Twitter, MessageSquare, CheckCircle2,
  Star, Shield, ArrowUpRight, Phone, Building2, Brain, Check,
  TrendingUp, Headphones, Send, Activity, Hash, Package, Bell,
  Target, Quote, MapPin, Clock, FileText, Rss, Tag, User, Plus, Layers,
  Search, Copy
} from "lucide-react";
import { B, G, gradText, Page, AuthScreen, GlassCard, Badge, Avatar, PrimaryBtn, OutlineBtn, ThemeToggle, OmniDeskLogo } from "./shared";

const CHANNELS = [
  { name:"WhatsApp",  color:"#25D366", icon:MessageCircle },
  { name:"Instagram", color:"#E1306C", icon:Instagram },
  { name:"Facebook",  color:"#1877F2", icon:MessageSquare },
  { name:"Gmail",     color:"#EA4335", icon:Mail },
  { name:"Telegram",  color:"#2CA5E0", icon:Send },
  { name:"Twitter/X", color:"#1DA1F2", icon:Twitter },
  { name:"Slack",     color:"#4A154B", icon:Hash },
  { name:"Discord",   color:"#5865F2", icon:Headphones },
  { name:"LinkedIn",  color:"#0A66C2", icon:Globe },
  { name:"TikTok",    color:"#FF0050", icon:Activity },
  { name:"Live Chat", color:"#F59E0B", icon:MessageCircle },
  { name:"SMS",       color:"#10B981", icon:Phone },
];

const FEATURES = [
  { icon:Inbox,     color:B.primary, label:"Unified Inbox",       desc:"Every conversation from every channel in one intelligent workspace. No more tab switching." },
  { icon:Bot,       color:B.purple,  label:"AI Reply Assistant",  desc:"GPT-powered suggestions that draft empathetic, on-brand replies in one click." },
  { icon:Users,     color:B.cyan,    label:"CRM & Contacts",      desc:"Full customer history, sentiment scores, and lifetime value — always in context." },
  { icon:BarChart3, color:B.pink,    label:"Analytics",           desc:"Real-time dashboards, CSAT tracking, and custom reports for every channel." },
  { icon:Zap,       color:B.warning, label:"Workflow Automation", desc:"Build no-code automation flows that handle routing, tagging, and responses 24/7." },
  { icon:Mic,       color:B.success, label:"Voice AI",            desc:"AI-powered voice support with transcription, sentiment analysis, and call routing." },
  { icon:BookOpen,  color:B.primary, label:"Knowledge Base",      desc:"Help customers help themselves with an AI-curated help center and smart search." },
  { icon:Globe,     color:B.purple,  label:"Social Listening",    desc:"Monitor brand mentions, keywords, and sentiment across every social network." },
];

const TESTIMONIALS = [
  {
    name:"Sarah Chen", role:"VP Customer Success", company:"Nexus Technologies",
    avatar:"SC", rating:5,
    text:"OmniDesk AI cut our average response time from 4.2 hours to 18 minutes. The AI reply assistant is genuinely magical — it captures our brand voice perfectly.",
    metric:"78% faster response time",
  },
  {
    name:"James Okonkwo", role:"Head of Support", company:"ScaleUp Commerce",
    avatar:"JO", rating:5,
    text:"We went from managing 6 separate tools to one platform. The unified inbox alone saved us 3 hours per agent per day. The ROI was visible in week one.",
    metric:"$240K saved annually",
  },
  {
    name:"Priya Sharma", role:"CTO", company:"Meridian Health",
    avatar:"PS", rating:5,
    text:"The AI doesn't just reply — it understands context, detects urgency, and escalates intelligently. We've handled a 3× spike in volume with the same team size.",
    metric:"3× volume, same headcount",
  },
];

const PRICING_PLANS = [
  {
    name:"Starter", monthly:29, annual:23, color:B.cyan,
    desc:"Perfect for small teams getting started with omnichannel support.",
    features:["2 agents","5 channels","1,000 AI replies/mo","Basic analytics","Email support"],
    cta:"Start free trial", popular:false,
  },
  {
    name:"Growth", monthly:79, annual:63, color:B.primary,
    desc:"For growing teams that need more AI power and channel coverage.",
    features:["10 agents","All 15 channels","10,000 AI replies/mo","Advanced analytics","Workflow automation","Priority support"],
    cta:"Start free trial", popular:false,
  },
  {
    name:"Professional", monthly:199, annual:159, color:B.purple,
    desc:"For professional teams scaling support across the enterprise.",
    features:["50 agents","All channels + Voice AI","Unlimited AI replies","Custom dashboards","Social listening","SLA management","Dedicated CSM"],
    cta:"Start free trial", popular:true,
  },
  {
    name:"Business", monthly:499, annual:399, color:B.pink,
    desc:"High-volume teams that demand maximum automation and scale.",
    features:["150 agents","Everything in Pro","Custom AI training","Knowledge Base AI","Marketplace access","API platform","SSO & SAML"],
    cta:"Start free trial", popular:false,
  },
  {
    name:"Enterprise", monthly:0, annual:0, color:B.warning,
    desc:"Custom contracts, SLAs, and white-glove onboarding for global teams.",
    features:["Unlimited agents","Custom deployment","Dedicated infrastructure","SLA guarantees","Compliance pack","24/7 premium support","Custom integrations"],
    cta:"Contact sales", popular:false,
  },
];

const FAQS = [
  { q:"What is OmniDesk AI?", a:"OmniDesk AI is an AI-powered omnichannel customer communication platform. It connects WhatsApp, Instagram, Gmail, Telegram, Live Chat, and 10+ more channels into one intelligent inbox — with an AI assistant that drafts replies, routes tickets, and learns from your team." },
  { q:"How does the AI reply assistant work?", a:"Our AI reads the full conversation context, detects customer sentiment and intent, then generates on-brand reply suggestions in seconds. Agents review, edit if needed, and send. It learns from your accepted edits and improves over time." },
  { q:"Is there a free trial?", a:"Yes — all plans include a 14-day free trial with no credit card required. You get full access to your chosen plan's features from day one." },
  { q:"What channels do you support?", a:"We support WhatsApp Business, Instagram DM, Facebook Messenger & Comments, Gmail, Outlook, Telegram, Twitter/X, LinkedIn, TikTok, Discord, Slack, Website Live Chat, Voice, and SMS. We add new channels every quarter." },
  { q:"Is my customer data secure?", a:"Absolutely. OmniDesk AI is SOC 2 Type II certified, GDPR compliant, and ISO 27001 aligned. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We never use your data to train models for other customers." },
  { q:"Can I cancel or change plans anytime?", a:"Yes. You can upgrade, downgrade, or cancel at any time from your billing dashboard. If you cancel, you keep access until the end of your billing period." },
];

const STATS = [
  { value:"15+", label:"Channels Supported",  color:B.primary },
  { value:"2.8m", label:"Avg First Response", color:B.cyan },
  { value:"4.8", label:"Avg CSAT Score",       color:B.success },
  { value:"60%", label:"Ticket Deflection",    color:B.purple },
];

const BLOG_POSTS = [
  { tag:"AI Support", title:"How AI Reply Assistants Are Reducing Support Costs by 40%", date:"Jul 1, 2026", read:"6 min", author:"Alex K." },
  { tag:"Product Update", title:"OmniDesk AI 2.0: Voice AI, Social Listening & 50+ New Features", date:"Jun 20, 2026", read:"4 min", author:"Maya S." },
  { tag:"Case Study", title:"How Nexus Technologies Cut Response Time from 4 Hours to 18 Minutes", date:"Jun 10, 2026", read:"8 min", author:"Sarah C." },
  { tag:"Enterprise", title:"Building an Omnichannel Support Stack for 100K+ Customers", date:"May 28, 2026", read:"10 min", author:"James O." },
  { tag:"Tutorial", title:"Setting Up WhatsApp Business Automation in Under 10 Minutes", date:"May 15, 2026", read:"5 min", author:"Priya S." },
  { tag:"AI Trends", title:"The Future of Customer Support: Predictions for 2027", date:"May 5, 2026", read:"7 min", author:"Alex K." },
];

// ─── NAVIGATION ──────────────────────────────────────────────────
export function Nav({ page, setPage, onAuth }: { page: Page; setPage: (p: Page) => void; onAuth: (s: AuthScreen) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links: { label: string; p?: Page }[] = [
    { label:"Features", p:"features" }, { label:"Pricing", p:"pricing" },
    { label:"Customers", p:"stories" }, { label:"Blog", p:"blog" },
    { label:"Docs", p:"docs" }, { label:"Company", p:"about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all" style={{ background: scrolled ? "var(--od-nav-bg)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid ${B.border}` : "none" }}>
      {/* Announcement */}
      <div className="text-center py-2 text-xs font-medium" style={{ background:`linear-gradient(90deg,${B.primary}22,${B.cyan}22,${B.primary}22)`, borderBottom:`1px solid ${B.border}` }}>
        <span style={{ color:B.muted }}>🚀 OmniDesk AI 2.0 is live — </span>
        <button className="font-semibold" style={{ color:B.cyan }}>Voice AI & 50+ new features →</button>
      </div>

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => setPage("home")} className="flex items-center">
          <OmniDeskLogo iconSize={34} textClass="text-sm"/>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <button key={l.label} onClick={() => l.p && setPage(l.p)} className="flex items-center gap-0.5 px-3 py-1.5 rounded-lg text-sm transition-colors hover:bg-white/5" style={{ color: l.p && page === l.p ? B.cyan : B.muted }}>
              {l.label}
              {!l.p && <ChevronDown size={12} className="mt-px" />}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle/>
          <button onClick={() => onAuth("login")} className="text-sm px-3 py-1.5 rounded-lg transition-colors hover:bg-white/5" style={{ color:B.muted }}>Log in</button>
          <PrimaryBtn small onClick={() => onAuth("register")}>Start free trial</PrimaryBtn>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ color:B.muted }}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-6 border-t" style={{ background:"var(--od-nav-bg)", borderColor:B.border }}>
          {links.map(l => (
            <button key={l.label} onClick={() => { l.p && setPage(l.p); setOpen(false); }} className="block w-full text-left px-3 py-3 text-sm border-b" style={{ color:B.muted, borderColor:B.border }}>
              {l.label}
            </button>
          ))}
          <div className="pt-4 flex flex-col gap-2">
            <PrimaryBtn onClick={() => { setPage("pricing"); setOpen(false); }}>Start free trial</PrimaryBtn>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────
export function Footer({ setPage }: { setPage: (p: Page) => void }) {
  const cols = [
    { title:"Product",   links:["Unified Inbox","AI Assistant","CRM","Analytics","Automation","Voice AI","Knowledge Base"] },
    { title:"Company",   links:["About","Blog","Careers","Customer Stories","Press","Investors"] },
    { title:"Resources", links:["Documentation","API Reference","Help Center","Status Page","Changelog","Community"] },
    { title:"Legal",     links:["Privacy Policy","Terms of Service","Cookie Policy","GDPR","Security","Compliance"] },
  ];
  const NAV_MAP: Record<string, Page> = {
    "About":"about","Blog":"blog","Careers":"careers","Documentation":"docs",
    "Customer Stories":"stories","Privacy Policy":"privacy","Terms of Service":"terms",
    "Pricing":"pricing","Features":"features","Contact":"contact",
  };
  return (
    <footer className="border-t" style={{ background:B.surface, borderColor:B.border }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <div className="mb-4"><OmniDeskLogo iconSize={32} textClass="text-sm"/></div>
            <p className="text-sm leading-relaxed mb-4" style={{ color:B.muted }}>One Inbox. Every Conversation. Powered by AI.</p>
            <div className="flex gap-3">
              {[Twitter, Globe, MessageCircle, Star].map((Icon, i) => (
                <button key={i} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10" style={{ background:"rgba(255,255,255,0.06)", border:`1px solid ${B.border}` }}>
                  <Icon size={13} style={{ color:B.muted }} />
                </button>
              ))}
            </div>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color:B.dimmed }}>{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map(l => {
                  const dest = NAV_MAP[l];
                  return <li key={l}><button onClick={dest ? ()=>setPage(dest) : undefined} className="text-sm transition-colors hover:text-white" style={{ color:B.muted }}>{l}</button></li>;
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor:B.border }}>
          <p className="text-xs" style={{ color:B.dimmed }}>© 2026 OmniDesk AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {["SOC 2","GDPR","ISO 27001"].map(b => (
              <span key={b} className="text-[10px] px-2 py-1 rounded font-semibold" style={{ background:`${B.success}12`, color:B.success, border:`1px solid ${B.success}20` }}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── HOME PAGE ───────────────────────────────────────────────────
export function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [annual, setAnnual] = useState(false);

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background:`${B.bg} ${G.radial}` }} />
        {/* Glow orbs */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full opacity-10" style={{ background:B.primary, filter:"blur(80px)" }} />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full opacity-8" style={{ background:B.cyan, filter:"blur(60px)" }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <Badge color={B.cyan}>
            <Sparkles size={10} />OmniDesk AI 2.0 — Now with Voice AI
          </Badge>

          <h1 className="mt-6 mb-6 font-bold leading-tight" style={{ fontFamily:"'Poppins',sans-serif", fontSize:"clamp(40px,7vw,80px)", color:B.text }}>
            One Inbox.{" "}
            <span style={gradText(`linear-gradient(90deg,#A5B4FC,#67E8F9,#A5B4FC)`)}>
              Every Conversation.
            </span>
            <br />Powered by AI.
          </h1>

          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color:B.muted }}>
            Connect WhatsApp, Instagram, Gmail, and 12+ channels into one AI-powered workspace. Respond faster, automate smarter, and delight customers at scale.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <PrimaryBtn onClick={() => setPage("pricing")}>
              Start free trial — no card needed<ArrowRight size={15} />
            </PrimaryBtn>
            <OutlineBtn>
              <Play size={14} />Watch 2-min demo
            </OutlineBtn>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-extrabold" style={{ fontFamily:"'Poppins',sans-serif", ...gradText(`linear-gradient(135deg,${s.color},${s.color}99)`) }}>{s.value}</p>
                <p className="text-xs mt-0.5" style={{ color:B.dimmed }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Dashboard mockup */}
          <div className="relative mx-auto max-w-3xl">
            <GlassCard className="p-1 overflow-hidden" style={{ boxShadow:`0 40px 120px rgba(79,70,229,0.25)` }}>
              {/* Fake browser chrome */}
              <div className="flex items-center gap-1.5 px-3 py-2 border-b" style={{ borderColor:B.border }}>
                {["#EF4444","#F59E0B","#10B981"].map(c => <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background:c }} />)}
                <div className="flex-1 mx-3 h-5 rounded-md" style={{ background:B.s2 }} />
              </div>
              {/* Inbox mockup */}
              <div className="flex h-52 text-left">
                <div className="w-48 border-r flex-shrink-0" style={{ borderColor:B.border, background:`${B.bg}88` }}>
                  {[
                    { ch:"WhatsApp", name:"Sarah M.", preview:"My order is delayed…", color:"#25D366", unread:3, urgent:true },
                    { ch:"Email",    name:"James C.",  preview:"Upgrade to Enterprise?", color:B.primary, unread:1, urgent:false },
                    { ch:"Instagram",name:"Emma R.",   preview:"Love the new collection!", color:"#E1306C", unread:2, urgent:false },
                  ].map((c, i) => (
                    <div key={i} className="px-3 py-2.5 border-b flex items-start gap-2" style={{ borderColor:B.border, background: i===0 ? `${B.primary}12` : "transparent" }}>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-white mt-0.5" style={{ background:`linear-gradient(135deg,${c.color},${c.color}99)` }}>
                        {c.name.split(" ").map(n=>n[0]).join("")}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold truncate" style={{ color:B.text }}>{c.name}</p>
                        <p className="text-[9px] truncate" style={{ color:B.dimmed }}>{c.preview}</p>
                      </div>
                      {c.unread > 0 && <span className="text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background:c.urgent?"#EF4444":B.primary, color:"#fff" }}>{c.unread}</span>}
                    </div>
                  ))}
                </div>
                <div className="flex-1 flex flex-col p-3 gap-2">
                  <div className="flex gap-2">
                    <div className="flex-1 px-3 py-2 rounded-xl text-[10px] leading-relaxed" style={{ background:B.s2, color:B.muted }}>My order #ORD-2847 hasn't arrived. This is day 8!</div>
                  </div>
                  <div className="flex gap-2 flex-row-reverse">
                    <div className="flex-1 px-3 py-2 rounded-xl text-[10px] leading-relaxed text-white" style={{ background:G.hero }}>Hi Sarah! I've escalated this with FedEx urgently. A replacement is already being shipped overnight at no charge.</div>
                  </div>
                  {/* AI suggestion */}
                  <div className="rounded-xl p-2 border" style={{ background:`${B.purple}12`, borderColor:`${B.purple}25` }}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Sparkles size={8} style={{ color:B.purple }} />
                      <span className="text-[9px] font-semibold uppercase tracking-wide" style={{ color:B.purple }}>AI Suggestion</span>
                    </div>
                    <p className="text-[9px] leading-relaxed" style={{ color:B.muted }}>Offer 20% credit + expedited shipping. Customer is Premium tier with 3-year history.</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Floating cards */}
            <div className="absolute -left-16 top-12 hidden lg:block">
              <GlassCard className="px-3 py-2.5 w-44" style={{ boxShadow:`0 8px 32px rgba(0,0,0,0.4)` }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background:`#25D36620` }}><MessageCircle size={11} style={{ color:"#25D366" }} /></div>
                  <div><p className="text-[10px] font-semibold" style={{ color:B.text }}>WhatsApp</p><p className="text-[9px]" style={{ color:B.dimmed }}>142 msgs today</p></div>
                </div>
              </GlassCard>
            </div>
            <div className="absolute -right-14 top-6 hidden lg:block">
              <GlassCard className="px-3 py-2.5 w-40" style={{ boxShadow:`0 8px 32px rgba(0,0,0,0.4)` }}>
                <p className="text-[9px] font-semibold uppercase tracking-wide mb-1" style={{ color:B.purple }}>AI Sentiment</p>
                <div className="flex items-center gap-1.5">
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background:B.s2 }}>
                    <div className="h-full rounded-full" style={{ width:"78%", background:B.success }} />
                  </div>
                  <span className="text-[10px] font-bold" style={{ color:B.success }}>78%</span>
                </div>
                <p className="text-[9px] mt-0.5" style={{ color:B.dimmed }}>Positive today</p>
              </GlassCard>
            </div>
            <div className="absolute -right-12 bottom-8 hidden lg:block">
              <GlassCard className="px-3 py-2.5 w-36">
                <p className="text-[9px]" style={{ color:B.dimmed }}>CSAT Score</p>
                <p className="text-2xl font-extrabold" style={{ fontFamily:"'Poppins',sans-serif", ...gradText(G.brand) }}>4.9</p>
                <div className="flex gap-0.5">{[1,2,3,4,5].map(i=><Star key={i} size={8} fill="#F59E0B" style={{ color:"#F59E0B" }} />)}</div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="py-14 border-y" style={{ borderColor:B.border }}>
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-widest mb-8" style={{ color:B.dimmed }}>Trusted by 2,400+ businesses worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
            {["Nexus Technologies","ScaleUp Commerce","Meridian Health","Apex Ventures","GlobalMart","TechWave","ClearPath","InnovateCo","Prisma Labs","BuildFast"].map(name => (
              <span key={name} className="text-sm font-bold opacity-35 hover:opacity-70 transition-opacity" style={{ color:B.text, fontFamily:"'Poppins',sans-serif" }}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge color={B.primary}><Zap size={10} />Everything in one platform</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Built for the AI era of support</h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color:B.muted }}>From first contact to resolved — every tool your team needs, powered by intelligence that gets smarter every day.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map(f => (
              <GlassCard key={f.label} className="p-5 hover:border-opacity-60 transition-all group" style={{ borderColor:`${f.color}20` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ background:`${f.color}15` }}>
                  <f.icon size={18} style={{ color:f.color }} />
                </div>
                <h3 className="text-sm font-bold mb-2" style={{ color:B.text }}>{f.label}</h3>
                <p className="text-xs leading-relaxed" style={{ color:B.muted }}>{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6" style={{ background:`linear-gradient(180deg,transparent,${B.surface},transparent)` }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Badge color={B.cyan}><Activity size={10} />How it works</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Up and running in minutes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step:"01", icon:Globe, color:B.primary, title:"Connect your channels", desc:"Link WhatsApp, Instagram, Gmail, and 12+ other channels in minutes. No technical setup required." },
              { step:"02", icon:Sparkles, color:B.purple, title:"AI learns your brand", desc:"OmniDesk AI reads your past conversations and knowledge base to learn your tone, policies, and products." },
              { step:"03", icon:Zap, color:B.success, title:"Automate & scale", desc:"AI handles routine queries, routes complex tickets, and gives your agents superpowers to deliver delight." },
            ].map(s => (
              <div key={s.step} className="relative text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background:`${s.color}15`, border:`1px solid ${s.color}25` }}>
                  <s.icon size={24} style={{ color:s.color }} />
                </div>
                <span className="text-xs font-bold mb-2 block" style={{ color:s.color }}>Step {s.step}</span>
                <h3 className="text-lg font-bold mb-3" style={{ color:B.text }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color:B.muted }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHANNELS */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge color={B.pink}><MessageCircle size={10} />15+ channels</Badge>
            <h2 className="mt-4 text-4xl font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Every conversation, one inbox</h2>
            <p className="mt-4 text-lg" style={{ color:B.muted }}>No matter where your customers are, OmniDesk AI brings every message to one place.</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {CHANNELS.map(ch => (
              <GlassCard key={ch.name} className="p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background:`${ch.color}18` }}>
                  <ch.icon size={18} style={{ color:ch.color }} />
                </div>
                <span className="text-[11px] font-medium text-center" style={{ color:B.muted }}>{ch.name}</span>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* AI CAPABILITIES */}
      <section className="py-24 px-6" style={{ background:`linear-gradient(180deg,transparent,${B.surface},transparent)` }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge color={B.purple}><Brain size={10} />AI-first intelligence</Badge>
              <h2 className="mt-4 text-4xl font-bold leading-tight" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>
                AI that understands your customers,{" "}
                <span style={gradText(G.ai)}>not just their messages</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed mb-8" style={{ color:B.muted }}>
                OmniDesk AI doesn't just autocomplete. It reads conversation history, detects emotion, infers intent, and drafts replies that feel human — because they're trained on your best ones.
              </p>
              <div className="space-y-4">
                {[
                  { title:"Sentiment Analysis", desc:"Detects frustration, delight, urgency in real time", color:B.purple },
                  { title:"Intent Classification", desc:"Knows if it's a complaint, inquiry, or escalation before you do", color:B.primary },
                  { title:"AI Reply Drafts", desc:"Generates on-brand replies in under 2 seconds", color:B.cyan },
                  { title:"Auto-Routing", desc:"Sends the right ticket to the right team automatically", color:B.success },
                  { title:"AI Summarization", desc:"TL;DR of any conversation in one click", color:B.pink },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-3">
                    <CheckCircle2 size={16} style={{ color:item.color, flexShrink:0, marginTop:2 }} />
                    <div>
                      <span className="text-sm font-semibold" style={{ color:B.text }}>{item.title} — </span>
                      <span className="text-sm" style={{ color:B.muted }}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <PrimaryBtn onClick={() => setPage("features")}>Explore AI features <ArrowRight size={14} /></PrimaryBtn>
              </div>
            </div>
            {/* AI visual */}
            <div className="relative">
              <GlassCard className="p-5" style={{ boxShadow:`0 0 80px ${B.purple}25` }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background:G.ai }}>
                    <Sparkles size={12} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold" style={{ color:B.text }}>OmniDesk AI</span>
                  <span className="ml-auto flex items-center gap-1 text-[10px]" style={{ color:B.success }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background:B.success }} />Active
                  </span>
                </div>
                {[
                  { role:"user",  text:"This customer is escalating — order delayed 8 days, premium member, event this weekend. What should I do?" },
                  { role:"ai",    text:"Escalate immediately. Offer:\n• Overnight replacement at no charge\n• 20% credit for next order\n• Personal follow-up message\n\nChurn risk: High (3-yr Premium). Acting fast here saves the relationship." },
                  { role:"user",  text:"Draft the apology message." },
                  { role:"ai",    text:"Hi Sarah, I'm so sorry — you deserved so much better. I've personally arranged overnight delivery of your replacement and added a 20% credit to your account. I'll monitor this myself. — Alex" },
                ].map((m, i) => (
                  <div key={i} className={`flex gap-2 mb-3 ${m.role==="user" ? "flex-row-reverse" : ""}`}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-bold text-white" style={{ background: m.role==="ai" ? G.ai : B.s2 }}>
                      {m.role==="ai" ? "AI" : "A"}
                    </div>
                    <div className="max-w-xs rounded-2xl px-3 py-2 text-[11px] leading-relaxed whitespace-pre-line" style={{ background: m.role==="ai" ? `${B.purple}15` : B.s2, color:B.text, border:`1px solid ${m.role==="ai" ? `${B.purple}25` : B.border}` }}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge color={B.warning}><Star size={10} />Customer stories</Badge>
            <h2 className="mt-4 text-4xl font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Loved by teams worldwide</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <GlassCard key={t.name} className="p-6 flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array(t.rating).fill(0).map((_, i) => <Star key={i} size={13} fill={B.warning} style={{ color:B.warning }} />)}
                </div>
                <Quote size={20} style={{ color:`${B.purple}40` }} />
                <p className="text-sm leading-relaxed mt-2 flex-1" style={{ color:B.muted }}>"{t.text}"</p>
                <div className="mt-4 pt-4 border-t" style={{ borderColor:B.border }}>
                  <div className="flex items-center gap-3">
                    <Avatar initials={t.avatar} size={36} />
                    <div>
                      <p className="text-sm font-bold" style={{ color:B.text }}>{t.name}</p>
                      <p className="text-xs" style={{ color:B.dimmed }}>{t.role} · {t.company}</p>
                    </div>
                  </div>
                  <div className="mt-3 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background:`${B.success}12`, color:B.success }}>
                    {t.metric}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="py-24 px-6" style={{ background:`linear-gradient(180deg,transparent,${B.surface},transparent)` }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <Badge color={B.primary}><Package size={10} />Pricing</Badge>
            <h2 className="mt-4 text-4xl font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Simple, transparent pricing</h2>
            <p className="mt-4 text-base" style={{ color:B.muted }}>14-day free trial on all plans. No credit card required.</p>
          </div>
          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="text-sm" style={{ color: !annual ? B.text : B.dimmed }}>Monthly</span>
            <button onClick={() => setAnnual(!annual)} className="w-12 h-6 rounded-full flex items-center px-0.5 transition-colors" style={{ background: annual ? B.primary : B.s2 }}>
              <div className="w-5 h-5 rounded-full bg-white shadow transition-transform" style={{ transform: annual ? "translateX(24px)" : "translateX(0)" }} />
            </button>
            <span className="text-sm" style={{ color: annual ? B.text : B.dimmed }}>Annual <span className="px-1.5 py-px rounded text-[10px] font-bold" style={{ background:`${B.success}20`, color:B.success }}>20% off</span></span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PRICING_PLANS.map(plan => (
              <GlassCard key={plan.name} className="p-5 flex flex-col relative" style={{ borderColor: plan.popular ? `${B.purple}50` : B.border, boxShadow: plan.popular ? `0 0 40px ${B.purple}20` : "none" }}>
                {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold text-white" style={{ background:G.ai }}>Most Popular</div>}
                <p className="text-sm font-bold mb-1" style={{ color:plan.color }}>{plan.name}</p>
                <div className="flex items-end gap-1 mb-2">
                  {plan.monthly > 0 ? (
                    <>
                      <span className="text-3xl font-extrabold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>${annual ? plan.annual : plan.monthly}</span>
                      <span className="text-xs mb-1" style={{ color:B.dimmed }}>/mo</span>
                    </>
                  ) : (
                    <span className="text-2xl font-extrabold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Custom</span>
                  )}
                </div>
                <p className="text-[11px] mb-4 leading-relaxed" style={{ color:B.dimmed }}>{plan.desc}</p>
                <ul className="space-y-1.5 flex-1 mb-4">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-[11px]" style={{ color:B.muted }}>
                      <Check size={10} style={{ color:plan.color, flexShrink:0 }} />{f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setPage("pricing")} className="w-full py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-90" style={{ background: plan.popular ? G.ai : `${plan.color}15`, color: plan.popular ? "#fff" : plan.color }}>
                  {plan.cta}
                </button>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Badge color={B.cyan}><FileText size={10} />FAQ</Badge>
            <h2 className="mt-4 text-4xl font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Questions? We have answers.</h2>
          </div>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <GlassCard key={i} className="overflow-hidden">
                <button className="w-full flex items-center justify-between px-5 py-4 text-left" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                  <span className="text-sm font-semibold" style={{ color:B.text }}>{faq.q}</span>
                  <ChevronDown size={15} style={{ color:B.dimmed, transform: faqOpen===i ? "rotate(180deg)" : "none", transition:"transform 0.2s" }} />
                </button>
                {faqOpen === i && (
                  <div className="px-5 pb-4 border-t" style={{ borderColor:B.border }}>
                    <p className="pt-4 text-sm leading-relaxed" style={{ color:B.muted }}>{faq.a}</p>
                  </div>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative rounded-3xl p-12 overflow-hidden" style={{ background:G.hero }}>
            <div className="absolute inset-0 opacity-20" style={{ background:`radial-gradient(ellipse at 30% 50%,rgba(255,255,255,0.3),transparent),radial-gradient(ellipse at 70% 20%,rgba(6,182,212,0.4),transparent)` }} />
            <div className="relative z-10">
              <Sparkles size={32} className="text-white/80 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily:"'Poppins',sans-serif" }}>
                Ready to transform your customer support?
              </h2>
              <p className="text-white/80 mb-8 text-base">Join 2,400+ businesses using OmniDesk AI to deliver faster, smarter, more human support — at any scale.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={() => setPage("pricing")} className="px-8 py-3 rounded-xl font-semibold text-sm bg-white transition-all hover:bg-white/90" style={{ color:B.primary }}>
                  Start free trial — 14 days free
                </button>
                <button className="px-8 py-3 rounded-xl font-semibold text-sm text-white border border-white/30 transition-all hover:bg-white/10">
                  Book a demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── FEATURES PAGE ───────────────────────────────────────────────
export function FeaturesPage({ setPage }: { setPage: (p: Page) => void }) {
  const features = [
    { icon:Inbox,     color:B.primary, label:"Unified Inbox",
      headline:"Every channel. One inbox.", sub:"The command center for modern support teams.",
      points:["All 15 channels in a single view","Smart conversation routing","Priority & SLA management","Team collaboration & internal notes","Read receipts & typing indicators"],
      metric:"2.8min avg first response" },
    { icon:Bot,       color:B.purple, label:"AI Reply Assistant",
      headline:"Reply at the speed of AI.", sub:"The world's most context-aware support AI.",
      points:["GPT-powered reply drafts in <2s","Trained on your brand voice","Sentiment & intent detection","Auto-translation in 40+ languages","One-click apply or edit"],
      metric:"60% ticket deflection" },
    { icon:Users,     color:B.cyan, label:"CRM & Contacts",
      headline:"Know every customer deeply.", sub:"A CRM built for conversations, not just records.",
      points:["Full conversation history","LTV, CSAT & churn risk scoring","Company and contact profiles","Custom fields & tags","Integration with Salesforce, HubSpot"],
      metric:"94% customer retention rate" },
    { icon:BarChart3, color:B.pink, label:"Analytics & Reports",
      headline:"Insights that drive decisions.", sub:"Real-time visibility across every metric.",
      points:["Live dashboard & KPI tracking","Channel performance breakdown","Agent productivity reports","CSAT & NPS tracking","Custom report builder"],
      metric:"Data lag: 0 seconds" },
    { icon:Zap,       color:B.warning, label:"Workflow Automation",
      headline:"Automate the repetitive. Focus on the human.", sub:"No-code automation that scales with your team.",
      points:["Visual workflow builder","Trigger-based automations","Auto-routing by topic, priority, channel","SLA breach alerts","AI-powered workflow suggestions"],
      metric:"7 hours saved per agent weekly" },
    { icon:Mic,       color:B.success, label:"Voice AI",
      headline:"Support that listens.", sub:"AI-powered voice for the phone channel.",
      points:["Live call transcription","Real-time sentiment analysis","AI summaries post-call","Call routing & IVR","Voicemail-to-text"],
      metric:"42% call resolution rate" },
  ];

  return (
    <div className="pt-36 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <Badge color={B.primary}><Layers size={10} />All features</Badge>
          <h1 className="mt-4 text-5xl font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>
            Everything your team needs.{" "}<span style={gradText(G.brand)}>Nothing it doesn't.</span>
          </h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color:B.muted }}>A complete omnichannel platform with AI woven into every surface. No bolt-ons. No integrations needed.</p>
        </div>
        <div className="space-y-16">
          {features.map((f, idx) => (
            <div key={f.label} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx%2===1 ? "lg:grid-flow-dense" : ""}`}>
              <div className={idx%2===1 ? "lg:col-start-2" : ""}>
                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background:`${f.color}15` }}>
                    <f.icon size={18} style={{ color:f.color }} />
                  </div>
                  <span className="text-sm font-bold" style={{ color:f.color }}>{f.label}</span>
                </div>
                <h2 className="text-3xl font-bold mb-2" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>{f.headline}</h2>
                <p className="text-base mb-6" style={{ color:B.muted }}>{f.sub}</p>
                <ul className="space-y-3 mb-6">
                  {f.points.map(p => (
                    <li key={p} className="flex items-center gap-2.5 text-sm" style={{ color:B.muted }}>
                      <Check size={14} style={{ color:f.color, flexShrink:0 }} />{p}
                    </li>
                  ))}
                </ul>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold" style={{ background:`${f.color}12`, color:f.color }}>
                  <TrendingUp size={13} />{f.metric}
                </div>
              </div>
              <div className={idx%2===1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                <GlassCard className="p-8 flex items-center justify-center min-h-48" style={{ boxShadow:`0 0 60px ${f.color}15` }}>
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4" style={{ background:`${f.color}15` }}>
                      <f.icon size={36} style={{ color:f.color }} />
                    </div>
                    <p className="text-lg font-bold" style={{ color:B.text }}>{f.label}</p>
                    <p className="text-sm mt-2" style={{ color:B.dimmed }}>Interactive preview in product tour</p>
                  </div>
                </GlassCard>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-20 text-center">
          <PrimaryBtn onClick={() => setPage("pricing")}>Start free trial <ArrowRight size={14} /></PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

// ─── PRICING PAGE ────────────────────────────────────────────────
export function PricingPage() {
  const [annual, setAnnual] = useState(false);
  return (
    <div className="pt-36 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge color={B.primary}><Package size={10} />Pricing</Badge>
          <h1 className="mt-4 text-5xl font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Simple, honest pricing</h1>
          <p className="mt-4 text-lg" style={{ color:B.muted }}>Start free for 14 days. No credit card. No surprises.</p>
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className="text-sm" style={{ color: !annual ? B.text : B.dimmed }}>Monthly</span>
            <button onClick={() => setAnnual(!annual)} className="w-12 h-6 rounded-full flex items-center px-0.5 transition-colors" style={{ background: annual ? B.primary : B.s2 }}>
              <div className="w-5 h-5 rounded-full bg-white shadow transition-transform" style={{ transform: annual ? "translateX(24px)" : "translateX(0)" }} />
            </button>
            <span className="text-sm" style={{ color: annual ? B.text : B.dimmed }}>Annual <span className="px-1.5 py-px rounded text-[10px] font-bold" style={{ background:`${B.success}20`, color:B.success }}>Save 20%</span></span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          {PRICING_PLANS.map(plan => (
            <GlassCard key={plan.name} className="p-6 flex flex-col relative" style={{ borderColor: plan.popular ? `${B.purple}50` : B.border, boxShadow: plan.popular ? `0 0 60px ${B.purple}20` : "none" }}>
              {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold text-white" style={{ background:G.ai }}>Most Popular</div>}
              <p className="text-base font-bold mb-1" style={{ color:plan.color }}>{plan.name}</p>
              <div className="flex items-end gap-1 mb-3">
                {plan.monthly > 0 ? (
                  <>
                    <span className="text-4xl font-extrabold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>${annual ? plan.annual : plan.monthly}</span>
                    <span className="text-sm mb-1.5" style={{ color:B.dimmed }}>/mo</span>
                  </>
                ) : (
                  <span className="text-3xl font-extrabold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Custom</span>
                )}
              </div>
              <p className="text-xs leading-relaxed mb-4" style={{ color:B.dimmed }}>{plan.desc}</p>
              <ul className="space-y-2 flex-1 mb-5">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs" style={{ color:B.muted }}>
                    <Check size={11} style={{ color:plan.color, flexShrink:0 }} />{f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90" style={{ background: plan.popular ? G.ai : `${plan.color}15`, color: plan.popular ? "#fff" : plan.color }}>
                {plan.cta}
              </button>
            </GlassCard>
          ))}
        </div>
        {/* Enterprise CTA */}
        <GlassCard className="p-8 text-center" style={{ borderColor:`${B.warning}25` }}>
          <Building2 size={28} style={{ color:B.warning, margin:"0 auto 12px" }} />
          <h3 className="text-xl font-bold mb-2" style={{ color:B.text }}>Enterprise-grade for global teams</h3>
          <p className="text-sm mb-6 max-w-xl mx-auto" style={{ color:B.muted }}>Custom deployments, dedicated infrastructure, SLA guarantees, compliance packs, and white-glove onboarding. Let's build something together.</p>
          <PrimaryBtn><Phone size={14} />Talk to sales</PrimaryBtn>
        </GlassCard>
      </div>
    </div>
  );
}

// ─── ABOUT PAGE ──────────────────────────────────────────────────
export function AboutPage() {
  const values = [
    { icon:Brain, color:B.purple, label:"AI-First", desc:"We build AI into everything, not as a feature — as a foundation." },
    { icon:Users, color:B.cyan,   label:"Customer Obsessed", desc:"Every product decision starts with: does this delight the customer?" },
    { icon:Zap,   color:B.warning,label:"Move Fast", desc:"We ship every two weeks. Iteration beats perfection." },
    { icon:Shield,color:B.success,label:"Trust Above All", desc:"Security, privacy, and reliability are non-negotiable." },
  ];
  const timeline = [
    { year:"2022", event:"OmniDesk AI founded in San Francisco with a vision to unify omnichannel communication." },
    { year:"2023", event:"Raised $8M seed. Launched Unified Inbox with WhatsApp, Gmail, and Instagram support." },
    { year:"2024", event:"Reached 500 customers. Launched AI Reply Assistant and CRM module." },
    { year:"2025", event:"Series A: $32M. Expanded to 15 channels. Crossed 2,000 customers globally." },
    { year:"2026", event:"OmniDesk AI 2.0: Voice AI, Social Listening, Marketplace. 2,400+ businesses, 60 countries." },
  ];
  return (
    <div className="pt-36 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <Badge color={B.purple}><Globe size={10} />Our story</Badge>
          <h1 className="mt-4 text-5xl font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>
            Built by support people, <span style={gradText(G.hero)}>for support people</span>
          </h1>
          <p className="mt-6 text-lg max-w-2xl mx-auto leading-relaxed" style={{ color:B.muted }}>
            We founded OmniDesk AI after spending years managing fragmented customer support across a dozen tools. We built the platform we always wished existed — one inbox, every channel, AI that actually understands context.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {[{ n:"2,400+",l:"Businesses" },{ n:"60+",l:"Countries" },{ n:"$40M+",l:"Funding Raised" },{ n:"120",l:"Team Members" }].map(s => (
            <GlassCard key={s.l} className="p-6 text-center">
              <p className="text-3xl font-extrabold mb-1" style={{ fontFamily:"'Poppins',sans-serif", ...gradText(G.brand) }}>{s.n}</p>
              <p className="text-sm" style={{ color:B.muted }}>{s.l}</p>
            </GlassCard>
          ))}
        </div>
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Our values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map(v => (
              <GlassCard key={v.label} className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:`${v.color}15` }}>
                  <v.icon size={18} style={{ color:v.color }} />
                </div>
                <div>
                  <h3 className="text-sm font-bold mb-1" style={{ color:B.text }}>{v.label}</h3>
                  <p className="text-sm" style={{ color:B.muted }}>{v.desc}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Our journey</h2>
          <div className="space-y-4">
            {timeline.map(t => (
              <div key={t.year} className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 font-extrabold text-sm" style={{ background:G.hero, color:"#fff", fontFamily:"'Poppins',sans-serif" }}>{t.year}</div>
                <GlassCard className="flex-1 p-4"><p className="text-sm leading-relaxed" style={{ color:B.muted }}>{t.event}</p></GlassCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BLOG PAGE ───────────────────────────────────────────────────
export function BlogPage({ setPage }: { setPage?: (p: Page) => void }) {
  const cats = ["All","AI Support","Product Updates","Case Studies","Enterprise","Tutorials","AI Trends"];
  const [cat, setCat] = useState("All");
  return (
    <div className="pt-36 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge color={B.cyan}><Rss size={10} />Blog</Badge>
          <h1 className="mt-4 text-5xl font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Insights on AI support</h1>
          <p className="mt-4 text-lg" style={{ color:B.muted }}>Strategies, product updates, and deep dives from the OmniDesk team.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)} className="px-4 py-2 rounded-full text-xs font-semibold transition-all" style={{ background: cat===c ? B.primary : `${B.primary}12`, color: cat===c ? "#fff" : B.muted, border:`1px solid ${cat===c ? B.primary : B.border}` }}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map(post => (
            <GlassCard key={post.title} className="overflow-hidden group cursor-pointer hover:scale-[1.01] transition-transform" onClick={() => setPage?.("blogpost")}>
              <div className="h-40 flex items-center justify-center" style={{ background:`linear-gradient(135deg,${B.s2},${B.surface})` }}>
                <FileText size={32} style={{ color:B.dimmed }} />
              </div>
              <div className="p-5">
                <Badge color={B.primary}><Tag size={8} />{post.tag}</Badge>
                <h3 className="mt-3 text-sm font-bold leading-snug mb-3 group-hover:text-indigo-300 transition-colors" style={{ color:B.text }}>{post.title}</h3>
                <div className="flex items-center gap-3 text-[11px]" style={{ color:B.dimmed }}>
                  <span className="flex items-center gap-1"><User size={9} />{post.author}</span>
                  <span className="flex items-center gap-1"><Clock size={9} />{post.read}</span>
                  <span className="ml-auto">{post.date}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────
export function ContactPage() {
  const [form, setForm] = useState({ name:"", email:"", company:"", msg:"" });
  const offices = [
    { city:"San Francisco", addr:"340 Pine St, Suite 800", email:"us@omnideskai.com" },
    { city:"London",        addr:"22 Bishopsgate, Level 12", email:"eu@omnideskai.com" },
    { city:"Singapore",     addr:"1 Raffles Quay, #19-01",   email:"apac@omnideskai.com" },
  ];
  return (
    <div className="pt-36 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <Badge color={B.pink}><Phone size={10} />Contact us</Badge>
          <h1 className="mt-4 text-5xl font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Let's talk</h1>
          <p className="mt-4 text-lg" style={{ color:B.muted }}>Sales, support, or partnerships — we're here.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <GlassCard className="p-7">
              <h2 className="text-lg font-bold mb-5" style={{ color:B.text }}>Send us a message</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {[{ label:"Full name", key:"name", type:"text", placeholder:"Alex Kowalski" }, { label:"Work email", key:"email", type:"email", placeholder:"alex@company.com" }].map(f => (
                  <div key={f.key}>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color:B.dimmed }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} value={(form as Record<string,string>)[f.key]} onChange={e => setForm({...form, [f.key]:e.target.value})} className="w-full h-9 px-3 rounded-xl text-xs outline-none" style={{ background:B.s2, border:`1px solid ${B.border}`, color:B.text }} />
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color:B.dimmed }}>Company</label>
                <input type="text" placeholder="Nexus Technologies" value={form.company} onChange={e => setForm({...form, company:e.target.value})} className="w-full h-9 px-3 rounded-xl text-xs outline-none" style={{ background:B.s2, border:`1px solid ${B.border}`, color:B.text }} />
              </div>
              <div className="mb-5">
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color:B.dimmed }}>Message</label>
                <textarea rows={4} placeholder="Tell us about your team and what you're looking for…" value={form.msg} onChange={e => setForm({...form, msg:e.target.value})} className="w-full px-3 py-2 rounded-xl text-xs outline-none resize-none" style={{ background:B.s2, border:`1px solid ${B.border}`, color:B.text }} />
              </div>
              <PrimaryBtn className="w-full justify-center"><Send size={13} />Send message</PrimaryBtn>
            </GlassCard>
          </div>
          <div className="lg:col-span-2 space-y-4">
            {[{ icon:MessageCircle, color:B.success, label:"Sales", desc:"Talk to our sales team about plans and custom pricing.", btn:"Chat with sales" },
              { icon:Headphones,   color:B.primary, label:"Support", desc:"Existing customer? Our support team is available 24/7.", btn:"Open support ticket" },
              { icon:Building2,    color:B.purple,  label:"Partnerships", desc:"Interested in integrations, resellers, or co-marketing?", btn:"Partner with us" }
            ].map(c => (
              <GlassCard key={c.label} className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:`${c.color}15` }}>
                    <c.icon size={15} style={{ color:c.color }} />
                  </div>
                  <span className="text-sm font-bold" style={{ color:B.text }}>{c.label}</span>
                </div>
                <p className="text-xs mb-3" style={{ color:B.muted }}>{c.desc}</p>
                <button className="text-xs font-semibold flex items-center gap-1" style={{ color:c.color }}>{c.btn}<ArrowRight size={10} /></button>
              </GlassCard>
            ))}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color:B.dimmed }}>Global Offices</p>
              <div className="space-y-3">
                {offices.map(o => (
                  <GlassCard key={o.city} className="p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin size={11} style={{ color:B.primary }} />
                      <span className="text-xs font-semibold" style={{ color:B.text }}>{o.city}</span>
                    </div>
                    <p className="text-[11px] pl-5" style={{ color:B.dimmed }}>{o.addr}</p>
                    <p className="text-[11px] pl-5 mt-0.5" style={{ color:B.primary }}>{o.email}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── BLOG POST READER ─────────────────────────────────────────────
export function BlogPostPage({ setPage }: { setPage: (p: Page) => void }) {
  const post = BLOG_POSTS[0];
  return (
    <div className="pt-36 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => setPage("blog")} className="flex items-center gap-1.5 text-sm mb-8 transition-colors hover:text-indigo-400" style={{ color:B.muted }}>
          <ArrowRight size={13} className="rotate-180"/>Back to Blog
        </button>
        <Badge color={B.primary}><Tag size={8}/>{post.tag}</Badge>
        <h1 className="mt-4 text-4xl font-bold leading-tight mb-4" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>How AI Reply Assistants Are Reducing Support Costs by 40%</h1>
        <div className="flex items-center gap-4 mb-8 pb-8 border-b" style={{ borderColor:B.border }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background:`linear-gradient(135deg,${B.primary},${B.purple})` }}>AK</div>
          <div><p className="text-sm font-semibold" style={{ color:B.text }}>Alex K.</p><p className="text-xs" style={{ color:B.muted }}>Jul 1, 2026 · 6 min read</p></div>
        </div>
        <div className="space-y-6 text-base leading-relaxed" style={{ color:B.muted }}>
          <p>AI-powered reply assistants are transforming customer support economics at an unprecedented pace. In our analysis of 2,400+ OmniDesk AI customers, we found that teams using AI-assisted replies consistently achieve a 40% reduction in support costs — while simultaneously improving their CSAT scores.</p>
          <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>The Economics of AI-Assisted Support</h2>
          <p>Traditional support operations scale linearly — more conversations mean more agents. AI changes this equation fundamentally. When your AI assistant handles 60% of routine inquiries autonomously and drafts replies for the remaining 40%, agents become supervisors and editors rather than drafters.</p>
          <div className="grid grid-cols-3 gap-4 my-6">
            {[{l:"Avg ticket handle time",v:"−58%",c:B.success},{l:"Cost per resolution",v:"−40%",c:B.primary},{l:"Agent capacity",v:"+3.2×",c:B.purple}].map(s=>(
              <GlassCard key={s.l} className="p-4 text-center">
                <p className="text-2xl font-extrabold mb-1" style={{ fontFamily:"'Poppins',sans-serif", color:s.c }}>{s.v}</p>
                <p className="text-xs" style={{ color:B.dimmed }}>{s.l}</p>
              </GlassCard>
            ))}
          </div>
          <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>How the AI Reply Loop Works</h2>
          <p>The OmniDesk AI reply assistant reads the full conversation thread, identifies the customer's intent and sentiment, then generates three tailored reply options in under 2 seconds. Agents select, edit, and send — or the AI sends autonomously when confidence exceeds your set threshold.</p>
          <p>The system learns from every accepted edit, continuously improving accuracy and brand-voice alignment. Teams typically reach 90%+ first-draft acceptance rates within 60 days.</p>
          <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Real Results from Real Teams</h2>
          <blockquote className="border-l-4 pl-5 py-2 italic" style={{ borderColor:B.primary, color:B.muted }}>
            "We went from 4.2-hour average response time to 18 minutes in week one. Our team didn't shrink — they just stopped writing from scratch." — Sarah Chen, VP Support, Nexus Technologies
          </blockquote>
          <p>The pattern is consistent across industries: initial setup takes under an hour, measurable improvement appears within 48 hours, and full ROI is typically achieved within the first billing cycle.</p>
        </div>
        <div className="mt-12 pt-8 border-t" style={{ borderColor:B.border }}>
          <p className="text-sm font-semibold mb-4" style={{ color:B.text }}>Related Articles</p>
          <div className="grid grid-cols-2 gap-3">
            {BLOG_POSTS.slice(1,3).map(p=>(
              <GlassCard key={p.title} className="p-4 cursor-pointer hover:scale-[1.01] transition-transform" onClick={()=>setPage("blogpost")}>
                <Badge color={B.primary}><Tag size={8}/>{p.tag}</Badge>
                <p className="text-sm font-semibold mt-2" style={{ color:B.text }}>{p.title}</p>
                <p className="text-[11px] mt-1" style={{ color:B.dimmed }}>{p.read} · {p.date}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DOCUMENTATION PAGE ──────────────────────────────────────────
export function DocsPage({ setPage }: { setPage: (p: Page) => void }) {
  const [activeDoc, setActiveDoc] = useState("quickstart");
  const [copied, setCopied] = useState<string|null>(null);

  const copy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id); setTimeout(()=>setCopied(null), 1500);
  };

  const navGroups = [
    { label:"Getting Started", items:[
      { id:"quickstart", label:"Quick Start" },
      { id:"installation", label:"Installation" },
      { id:"auth", label:"Authentication" },
    ]},
    { label:"Core API", items:[
      { id:"conversations", label:"Conversations" },
      { id:"contacts", label:"Contacts" },
      { id:"messages", label:"Messages" },
      { id:"channels", label:"Channels" },
    ]},
    { label:"Advanced", items:[
      { id:"webhooks", label:"Webhooks" },
      { id:"automations", label:"Automations API" },
      { id:"ai", label:"AI Endpoints" },
      { id:"analytics", label:"Analytics API" },
    ]},
    { label:"Reference", items:[
      { id:"sdks", label:"SDKs" },
      { id:"errors", label:"Error Codes" },
      { id:"ratelimits", label:"Rate Limits" },
      { id:"changelog", label:"Changelog" },
    ]},
  ];

  // ── Shared sub-components ──────────────────────────────────────
  const methodColor: Record<string,string> = { GET:"#10B981", POST:"#4F46E5", PUT:"#F59E0B", PATCH:"#06B6D4", DELETE:"#EF4444" };
  const CodeBlock = ({ code, lang="bash", id }: { code:string; lang?:string; id:string }) => (
    <div className="rounded-xl overflow-hidden mb-4" style={{ background:"#0D1117", border:`1px solid rgba(255,255,255,0.08)` }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor:"rgba(255,255,255,0.06)" }}>
        <span className="text-[11px] font-mono" style={{ color:"#8892A4" }}>{lang}</span>
        <button onClick={()=>copy(code, id)} className="text-[11px] flex items-center gap-1.5 transition-colors" style={{ color:copied===id?"#10B981":"#8892A4" }}>
          <Copy size={11}/>{copied===id?"Copied!":"Copy"}
        </button>
      </div>
      <pre className="px-5 py-4 text-[13px] leading-relaxed overflow-x-auto" style={{ color:"#E6EDF3", fontFamily:"'JetBrains Mono',monospace", scrollbarWidth:"none" }}>{code}</pre>
    </div>
  );

  const Callout = ({ type="info", children }: { type?:"info"|"warning"|"tip"; children:React.ReactNode }) => {
    const cfg = { info:{bg:`${B.cyan}12`,border:B.cyan,icon:"ℹ"}, warning:{bg:`${B.warning}12`,border:B.warning,icon:"⚠"}, tip:{bg:`${B.success}12`,border:B.success,icon:"💡"} };
    const c = cfg[type];
    return <div className="rounded-xl px-5 py-4 mb-5 border-l-4 text-sm leading-relaxed" style={{ background:c.bg, borderColor:c.border, color:B.muted }}><span className="font-bold mr-2">{c.icon}</span>{children}</div>;
  };

  const Endpoint = ({ method, path, desc }: { method:string; path:string; desc:string }) => (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border mb-2" style={{ borderColor:B.border, background:B.s2 }}>
      <span className="text-[11px] font-bold px-2.5 py-1 rounded w-16 text-center flex-shrink-0" style={{ background:`${methodColor[method]}18`, color:methodColor[method] }}>{method}</span>
      <code className="text-sm flex-1" style={{ color:B.primary, fontFamily:"'JetBrains Mono',monospace" }}>{path}</code>
      <span className="text-xs" style={{ color:B.dimmed }}>{desc}</span>
    </div>
  );

  const ParamRow = ({ name, type, req, desc }: { name:string; type:string; req?:boolean; desc:string }) => (
    <tr className="border-b" style={{ borderColor:B.border }}>
      <td className="py-3 pr-4"><code className="text-xs font-semibold" style={{ color:B.primary, fontFamily:"'JetBrains Mono',monospace" }}>{name}</code>{req&&<span className="ml-2 text-[9px] px-1.5 py-px rounded font-bold" style={{ background:`${B.danger}18`,color:"#EF4444" }}>required</span>}</td>
      <td className="py-3 pr-4"><code className="text-[11px] px-2 py-0.5 rounded" style={{ background:B.s2, color:B.muted }}>{type}</code></td>
      <td className="py-3 text-xs" style={{ color:B.dimmed }}>{desc}</td>
    </tr>
  );

  const H1 = ({ children }: { children:React.ReactNode }) => <h1 className="text-3xl font-bold mb-3" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>{children}</h1>;
  const H2 = ({ children }: { children:React.ReactNode }) => <h2 className="text-xl font-bold mt-10 mb-3" style={{ color:B.text }}>{children}</h2>;
  const H3 = ({ children }: { children:React.ReactNode }) => <h3 className="text-base font-semibold mt-6 mb-2" style={{ color:B.text }}>{children}</h3>;
  const P  = ({ children }: { children:React.ReactNode }) => <p className="text-sm leading-relaxed mb-4" style={{ color:B.muted }}>{children}</p>;
  const Divider = () => <div className="h-px my-6" style={{ background:B.border }}/>;

  // ── Page content ───────────────────────────────────────────────
  const content: Record<string, React.ReactNode> = {
    quickstart: (<>
      <H1>Quick Start Guide</H1>
      <p className="text-base mb-1" style={{ color:B.muted }}>Get up and running with OmniDesk AI in under 5 minutes.</p>
      <div className="flex items-center gap-2 mb-6">
        {["5 min setup","No credit card","Free tier available"].map(t=><span key={t} className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full" style={{ background:`${B.success}12`, color:B.success }}><Check size={10}/>{t}</span>)}
      </div>
      <Divider/>

      <H2>Step 1 — Get your API key</H2>
      <P>Sign up at <span style={{ color:B.primary }}>app.omnideskai.com</span> → Settings → API Keys → Create Key. Copy your key — it will only be shown once.</P>
      <Callout type="warning">Never expose your API key in client-side code or commit it to version control. Use environment variables.</Callout>

      <H2>Step 2 — Install the SDK</H2>
      <CodeBlock id="install-npm" lang="bash" code={`# Node.js / TypeScript
npm install @omnideskai/sdk

# Python
pip install omnideskai

# Go
go get github.com/omnideskai/omni-go`}/>

      <H2>Step 3 — Initialize the client</H2>
      <CodeBlock id="init-ts" lang="TypeScript" code={`import { OmniDesk } from '@omnideskai/sdk';

const client = new OmniDesk({
  apiKey: process.env.OMNIDESKAI_API_KEY,
  // Optional: pin to a specific API version
  apiVersion: '2026-07-01',
});`}/>

      <H2>Step 4 — Make your first call</H2>
      <P>List all open conversations in your workspace:</P>
      <CodeBlock id="first-call" lang="TypeScript" code={`const conversations = await client.conversations.list({
  status: 'open',
  limit: 20,
  channel: 'whatsapp', // optional filter
});

console.log(conversations.data);
// → [{ id: 'conv_2847', customer: {...}, lastMessage: {...} }, ...]`}/>

      <H3>Example response</H3>
      <CodeBlock id="first-resp" lang="JSON" code={`{
  "data": [
    {
      "id": "conv_2847",
      "status": "open",
      "channel": "whatsapp",
      "customer": {
        "id": "cust_sm42",
        "name": "Sarah Mitchell",
        "email": "sarah@techcorp.io"
      },
      "lastMessage": {
        "text": "My order hasn't arrived yet.",
        "sentAt": "2026-07-01T10:45:12Z",
        "role": "customer"
      },
      "assignedTo": "agent_alex_k",
      "createdAt": "2026-07-01T10:14:00Z"
    }
  ],
  "meta": { "total": 234, "page": 1, "limit": 20 }
}`}/>
      <Callout type="tip">Your first 1,000 API calls per month are free. See <span style={{ color:B.primary }}>pricing</span> for more.</Callout>
    </>),

    auth: (<>
      <H1>Authentication</H1>
      <P>OmniDesk AI uses API keys to authenticate requests. All API requests must be made over HTTPS — calls made over plain HTTP will fail.</P>
      <Divider/>

      <H2>API Keys</H2>
      <P>Include your API key in the <code style={{ background:B.s2, padding:"1px 6px", borderRadius:4, color:B.primary }}>Authorization</code> header of every request:</P>
      <CodeBlock id="auth-header" lang="bash" code={`curl https://api.omnideskai.com/v1/conversations \\
  -H "Authorization: Bearer sk-omni-xxxxxxxxxxxx4291" \\
  -H "Content-Type: application/json"`}/>

      <H2>API Key Scopes</H2>
      <div className="rounded-xl overflow-hidden border mb-6" style={{ borderColor:B.border }}>
        <table className="w-full text-sm">
          <thead><tr style={{ background:B.s2 }}>{["Scope","Description","Endpoints"].map(h=><th key={h} className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wide" style={{ color:B.dimmed }}>{h}</th>)}</tr></thead>
          <tbody>
            {[{s:"read",d:"Read-only access to all resources",e:"GET only"},{s:"write",d:"Full read and write access",e:"All methods"},{s:"webhooks",d:"Register and manage webhooks only",e:"POST /v1/webhooks"},{s:"admin",d:"Full access including settings",e:"All + admin"}].map(r=>(
              <tr key={r.s} className="border-t" style={{ borderColor:B.border }}>
                <td className="px-4 py-3"><code style={{ color:B.primary }}>{r.s}</code></td>
                <td className="px-4 py-3" style={{ color:B.muted }}>{r.d}</td>
                <td className="px-4 py-3" style={{ color:B.dimmed }}>{r.e}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>Rotating Keys</H2>
      <P>You can create multiple API keys and rotate them without downtime. When you create a new key, both the old and new keys remain valid for 24 hours, giving you time to deploy the new key.</P>
      <CodeBlock id="rotate-key" lang="TypeScript" code={`// Create a new key via API
const newKey = await client.apiKeys.create({
  name: 'Production Key v2',
  scopes: ['read', 'write'],
});

// Then revoke the old one
await client.apiKeys.revoke('key_abc123');`}/>

      <H2>OAuth 2.0</H2>
      <P>For building integrations or apps for multiple OmniDesk AI workspaces, use OAuth 2.0:</P>
      <CodeBlock id="oauth" lang="bash" code={`# Authorization URL
https://app.omnideskai.com/oauth/authorize
  ?client_id=YOUR_CLIENT_ID
  &redirect_uri=https://yourapp.com/callback
  &scope=read+write
  &state=RANDOM_STATE_STRING

# Exchange code for token
POST https://api.omnideskai.com/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&code=AUTH_CODE&client_id=...`}/>
    </>),

    conversations: (<>
      <H1>Conversations API</H1>
      <P>The Conversations API lets you list, search, reply to, assign, and resolve support conversations across all connected channels.</P>
      <div className="text-xs mb-6 px-3 py-2 rounded-lg font-mono" style={{ background:B.s2, color:B.dimmed }}>Base URL: <span style={{ color:B.primary }}>https://api.omnideskai.com/v1</span></div>
      <Divider/>

      <H2>Endpoints</H2>
      <Endpoint method="GET"    path="/v1/conversations"          desc="List conversations"/>
      <Endpoint method="GET"    path="/v1/conversations/{id}"     desc="Get a conversation"/>
      <Endpoint method="POST"   path="/v1/conversations"          desc="Create a conversation"/>
      <Endpoint method="POST"   path="/v1/conversations/{id}/reply" desc="Send a reply"/>
      <Endpoint method="PATCH"  path="/v1/conversations/{id}"     desc="Update (assign, tag, status)"/>
      <Endpoint method="DELETE" path="/v1/conversations/{id}"     desc="Archive a conversation"/>

      <H2>List Conversations</H2>
      <CodeBlock id="conv-list" lang="bash" code={`GET /v1/conversations

# Query parameters:
?status=open          # open | pending | resolved
?channel=whatsapp     # filter by channel
?assignee=agent_id    # filter by agent
?tag=shipping         # filter by tag
?limit=20             # max 100
?page=1`}/>

      <H2>Send a Reply</H2>
      <H3>Request</H3>
      <CodeBlock id="conv-reply" lang="TypeScript" code={`const reply = await client.conversations.reply('conv_2847', {
  message: 'Hi Sarah! I've looked into your order — it ships today.',
  channel: 'whatsapp',       // must match conversation channel
  agentId: 'agent_alex_k',   // optional, defaults to API key owner
  aiAssisted: true,           // mark as AI-assisted reply
  attachments: [],            // optional file URLs
});`}/>
      <H3>Parameters</H3>
      <div className="rounded-xl overflow-hidden border mb-6" style={{ borderColor:B.border }}>
        <table className="w-full"><tbody>
          <ParamRow name="message"    type="string"  req  desc="The reply text. Supports markdown formatting."/>
          <ParamRow name="channel"    type="string"  req  desc="Channel to send on. Must match the conversation's channel."/>
          <ParamRow name="agentId"    type="string"       desc="ID of the agent sending. Defaults to API key owner."/>
          <ParamRow name="aiAssisted" type="boolean"      desc="Whether this reply was AI-generated. Tracked in analytics."/>
          <ParamRow name="attachments"type="array"        desc="Array of file URLs to attach to the message."/>
        </tbody></table>
      </div>

      <H3>Response</H3>
      <CodeBlock id="conv-reply-resp" lang="JSON" code={`{
  "id": "msg_98214",
  "conversationId": "conv_2847",
  "role": "agent",
  "message": "Hi Sarah! I've looked into your order...",
  "sentAt": "2026-07-01T22:45:12Z",
  "channel": "whatsapp",
  "status": "delivered",
  "aiAssisted": true
}`}/>
    </>),

    contacts: (<>
      <H1>Contacts API</H1>
      <P>Manage your customer contact database programmatically. Create, update, search, merge duplicates, and enrich contacts with custom fields.</P>
      <Divider/>

      <H2>Endpoints</H2>
      <Endpoint method="GET"    path="/v1/contacts"          desc="List / search contacts"/>
      <Endpoint method="POST"   path="/v1/contacts"          desc="Create a contact"/>
      <Endpoint method="GET"    path="/v1/contacts/{id}"     desc="Get a contact"/>
      <Endpoint method="PUT"    path="/v1/contacts/{id}"     desc="Update a contact"/>
      <Endpoint method="DELETE" path="/v1/contacts/{id}"     desc="Delete a contact"/>
      <Endpoint method="POST"   path="/v1/contacts/{id}/merge" desc="Merge duplicate contacts"/>

      <H2>Create a Contact</H2>
      <CodeBlock id="contact-create" lang="TypeScript" code={`const contact = await client.contacts.create({
  name:    'Sarah Mitchell',
  email:   'sarah@techcorp.io',
  phone:   '+1-415-555-0100',
  company: 'TechCorp Inc.',
  plan:    'Premium',
  // Add any custom fields:
  customFields: {
    ltv:         12480,
    accountTier: 'gold',
    region:      'us-west',
  },
  tags: ['enterprise', 'priority'],
});

console.log(contact.id); // → "cust_sm42"`}/>

      <H2>Search Contacts</H2>
      <CodeBlock id="contact-search" lang="bash" code={`GET /v1/contacts?q=sarah@techcorp

# Advanced filters:
?plan=Enterprise
?sentiment=negative
?riskScore[gte]=80
?lastSeenAt[gte]=2026-06-01
?tag=priority`}/>

      <Callout type="tip">Use the <code style={{ color:B.primary }}>q</code> parameter for full-text search across name, email, company, and custom fields simultaneously.</Callout>
    </>),

    webhooks: (<>
      <H1>Webhooks</H1>
      <P>Webhooks allow OmniDesk AI to push real-time notifications to your server when events occur. Your endpoint receives an HTTP POST with a JSON payload within milliseconds of an event.</P>
      <Divider/>

      <H2>Register an Endpoint</H2>
      <CodeBlock id="wh-register" lang="TypeScript" code={`const webhook = await client.webhooks.create({
  url:    'https://yourapp.com/omni-webhook',
  events: [
    'conversation.created',
    'conversation.replied',
    'conversation.resolved',
    'contact.created',
    'sla.breach',
  ],
  secret: 'your-signing-secret', // for HMAC verification
});

console.log(webhook.id); // → "wh_abc123"`}/>

      <H2>Event Types</H2>
      <div className="space-y-2 mb-6">
        {[{e:"conversation.created",d:"A new conversation was started"},
          {e:"conversation.replied",d:"A reply was sent or received"},
          {e:"conversation.resolved",d:"A conversation was marked resolved"},
          {e:"conversation.assigned",d:"Agent assignment changed"},
          {e:"contact.created",d:"A new contact was added"},
          {e:"contact.updated",d:"Contact fields were modified"},
          {e:"sla.warning",d:"Conversation approaching SLA breach (30 min)"},
          {e:"sla.breach",d:"SLA was breached"},
          {e:"automation.triggered",d:"A workflow automation ran"},
          {e:"ai.reply.generated",d:"AI drafted a reply suggestion"},
        ].map(ev=>(
          <div key={ev.e} className="flex items-center gap-3 px-4 py-2.5 rounded-xl border" style={{ borderColor:B.border, background:B.s2 }}>
            <code className="text-xs" style={{ color:B.primary, fontFamily:"'JetBrains Mono',monospace" }}>{ev.e}</code>
            <span className="text-xs" style={{ color:B.dimmed }}>{ev.d}</span>
          </div>
        ))}
      </div>

      <H2>Verifying Signatures</H2>
      <P>Each webhook request includes an <code style={{ background:B.s2, padding:"1px 6px", borderRadius:4, color:B.primary }}>X-OmniDesk-Signature</code> header. Verify it to ensure the payload is authentic:</P>
      <CodeBlock id="wh-verify" lang="TypeScript" code={`import crypto from 'crypto';

function verifyWebhook(payload: string, signature: string, secret: string) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(\`sha256=\${expected}\`)
  );
}

// In your Express handler:
app.post('/omni-webhook', (req, res) => {
  const isValid = verifyWebhook(
    JSON.stringify(req.body),
    req.headers['x-omnideskai-signature'] as string,
    process.env.WEBHOOK_SECRET!
  );
  if (!isValid) return res.status(401).send('Invalid signature');
  // Process the event...
  res.status(200).send('OK');
});`}/>
    </>),

    sdks: (<>
      <H1>SDK Reference</H1>
      <P>Official SDKs are available for 9 languages. All are auto-generated from our OpenAPI spec and fully typed.</P>
      <Divider/>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { lang:"JavaScript / TypeScript", pkg:"@omnideskai/sdk", install:"npm install @omnideskai/sdk", badge:"npm" },
          { lang:"Python",          pkg:"omnideskai",               install:"pip install omnideskai",              badge:"PyPI" },
          { lang:"Go",              pkg:"omni-go",                  install:"go get github.com/omnideskai/omni-go", badge:"Go" },
          { lang:"Java",            pkg:"omnideskai-java",          install:"<artifactId>omnideskai</artifactId>",  badge:"Maven" },
          { lang:"PHP",             pkg:"omnideskai/sdk",           install:"composer require omnideskai/sdk",     badge:"Packagist" },
          { lang:"Ruby",            pkg:"omnideskai",               install:"gem install omnideskai",              badge:"RubyGems" },
          { lang:"C# / .NET",       pkg:"OmniDesk.AI",              install:"dotnet add package OmniDesk.AI",      badge:"NuGet" },
          { lang:"Swift",           pkg:"OmniDeskAI",               install:"swift package add OmniDeskAI",        badge:"SPM" },
          { lang:"Kotlin",          pkg:"omnideskai-kotlin",        install:"implementation 'ai.omnideskai:sdk'",  badge:"Maven" },
        ].map(sdk=>(
          <GlassCard key={sdk.lang} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold" style={{ color:B.text }}>{sdk.lang}</p>
              <span className="text-[9px] px-1.5 py-px rounded font-bold" style={{ background:`${B.primary}15`, color:B.primary }}>{sdk.badge}</span>
            </div>
            <code className="text-[10px] block mb-2" style={{ color:B.dimmed, fontFamily:"'JetBrains Mono',monospace" }}>{sdk.pkg}</code>
            <div className="rounded-lg px-3 py-1.5 text-[11px]" style={{ background:"#0D1117", color:"#8892A4", fontFamily:"'JetBrains Mono',monospace" }}>{sdk.install}</div>
          </GlassCard>
        ))}
      </div>

      <H2>TypeScript Example</H2>
      <CodeBlock id="sdk-ts" lang="TypeScript" code={`import { OmniDesk, ConversationStatus } from '@omnideskai/sdk';

const client = new OmniDesk({ apiKey: process.env.OMNIDESKAI_API_KEY });

// All methods are fully typed
const conversations = await client.conversations.list({
  status: ConversationStatus.Open,
  limit: 50,
});

// Auto-completion works for all parameters
const reply = await client.conversations.reply(conversations.data[0].id, {
  message: 'Hello! How can I help you today?',
  channel: conversations.data[0].channel,
});`}/>
    </>),

    errors: (<>
      <H1>Error Codes</H1>
      <P>OmniDesk AI uses conventional HTTP response codes. Codes in the 2xx range indicate success. Codes in the 4xx range indicate client errors. Codes in the 5xx range indicate a server error.</P>
      <Divider/>

      <div className="rounded-xl overflow-hidden border mb-8" style={{ borderColor:B.border }}>
        <table className="w-full text-sm">
          <thead><tr style={{ background:B.s2 }}>{["Status","Code","Meaning"].map(h=><th key={h} className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wide" style={{ color:B.dimmed }}>{h}</th>)}</tr></thead>
          <tbody>
            {[
              { status:"200", code:"OK",                    meaning:"Request succeeded.", c:B.success },
              { status:"201", code:"Created",               meaning:"Resource was successfully created.", c:B.success },
              { status:"204", code:"No Content",            meaning:"Resource deleted. No body returned.", c:B.success },
              { status:"400", code:"Bad Request",           meaning:"Invalid parameters. Check the error.param field.", c:B.warning },
              { status:"401", code:"Unauthorized",          meaning:"No valid API key provided.", c:"#EF4444" },
              { status:"403", code:"Forbidden",             meaning:"API key doesn't have permission for this action.", c:"#EF4444" },
              { status:"404", code:"Not Found",             meaning:"The resource doesn't exist.", c:"#EF4444" },
              { status:"409", code:"Conflict",              meaning:"A resource already exists with that identifier.", c:B.warning },
              { status:"429", code:"Too Many Requests",     meaning:"Rate limit exceeded. See Retry-After header.", c:B.warning },
              { status:"500", code:"Server Error",          meaning:"Something went wrong on our end. We're notified automatically.", c:"#EF4444" },
            ].map(r=>(
              <tr key={r.status} className="border-t" style={{ borderColor:B.border }}>
                <td className="px-5 py-3"><span className="font-bold text-[11px] px-2 py-0.5 rounded" style={{ background:`${r.c}15`, color:r.c }}>{r.status}</span></td>
                <td className="px-5 py-3"><code style={{ color:B.primary }}>{r.code}</code></td>
                <td className="px-5 py-3" style={{ color:B.muted }}>{r.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>Error Response Format</H2>
      <CodeBlock id="error-fmt" lang="JSON" code={`{
  "error": {
    "type":    "invalid_request_error",
    "code":    "missing_required_param",
    "message": "The 'message' parameter is required.",
    "param":   "message",
    "docUrl":  "https://docs.omnideskai.com/errors#missing_required_param"
  }
}`}/>
    </>),

    changelog: (<>
      <H1>Changelog</H1>
      <P>All API changes, new endpoints, and deprecations are listed here. Subscribe to our <span style={{ color:B.primary }}>developer newsletter</span> for updates.</P>
      <Divider/>
      {[
        { version:"v4.2.1", date:"Jul 1, 2026", tag:"Latest", changes:[
          { type:"new",  text:"AI Governance API — manage prompts, guardrails, and safety rules programmatically" },
          { type:"fix",  text:"Webhook delivery retry now uses exponential backoff with jitter (was fixed 5s)" },
          { type:"perf", text:"Voice AI transcription latency reduced by 18% (P95: 340ms → 278ms)" },
          { type:"new",  text:"GET /v1/conversations supports ?aiConfidence[gte]=0.9 filter" },
        ]},
        { version:"v4.2.0", date:"Jun 15, 2026", tag:"", changes:[
          { type:"new",  text:"Enterprise Platform API — multi-tenant management, feature flags, white-label config" },
          { type:"new",  text:"Compliance API — audit logs, data retention policies, GDPR request handling" },
          { type:"new",  text:"POST /v1/ai/generate — standalone AI reply generation without a conversation" },
          { type:"change",text:"Pagination changed from page-based to cursor-based for better performance" },
        ]},
        { version:"v4.1.0", date:"May 1, 2026", tag:"", changes:[
          { type:"new",  text:"GraphQL endpoint (beta) — /graphql with full schema introspection" },
          { type:"new",  text:"gRPC support for high-throughput real-time event streaming" },
          { type:"depr", text:"GET /v1/conversations?page= is deprecated. Use cursor pagination." },
        ]},
      ].map(release=>(
        <div key={release.version} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-lg font-bold" style={{ color:B.text }}>{release.version}</h2>
            {release.tag && <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background:`${B.success}15`, color:B.success }}>{release.tag}</span>}
            <span className="text-xs" style={{ color:B.dimmed }}>{release.date}</span>
          </div>
          <div className="space-y-2">
            {release.changes.map((c,i)=>{
              const cfg = { new:{color:B.success,label:"New"}, fix:{color:B.warning,label:"Fix"}, perf:{color:B.cyan,label:"Perf"}, change:{color:B.primary,label:"Change"}, depr:{color:"#EF4444",label:"Depr"} } as Record<string,{color:string;label:string}>;
              const t = cfg[c.type];
              return (
                <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl border" style={{ borderColor:B.border }}>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded flex-shrink-0" style={{ background:`${t.color}15`, color:t.color }}>{t.label}</span>
                  <span className="text-sm" style={{ color:B.muted }}>{c.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>),
  };

  // fallback for unbuilt sections
  const fallback = (id: string) => (
    <div className="flex flex-col items-center justify-center h-48 text-center">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background:`${B.primary}12` }}>
        <FileText size={20} style={{ color:B.primary }}/>
      </div>
      <p className="text-sm font-semibold" style={{ color:B.text }}>{navGroups.flatMap(g=>g.items).find(i=>i.id===id)?.label}</p>
      <p className="text-xs mt-1" style={{ color:B.dimmed }}>Full documentation coming soon</p>
    </div>
  );

  const allItems = navGroups.flatMap(g=>g.items);
  const currentIdx = allItems.findIndex(i=>i.id===activeDoc);
  const prev = currentIdx > 0 ? allItems[currentIdx-1] : null;
  const next = currentIdx < allItems.length-1 ? allItems[currentIdx+1] : null;

  return (
    <div className="pt-20 min-h-screen flex" style={{ background:B.bg }}>
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 border-r flex flex-col" style={{ borderColor:B.border, background:B.surface, position:"sticky", top:80, height:"calc(100vh - 80px)", overflowY:"auto", scrollbarWidth:"none" }}>
        <div className="p-5">
          <div className="flex items-center gap-2 h-8 px-3 rounded-lg mb-5" style={{ background:B.s2, border:`1px solid ${B.border}` }}>
            <Search size={12} style={{ color:B.dimmed }}/>
            <input className="flex-1 text-xs bg-transparent outline-none" placeholder="Search docs…" style={{ color:B.text }}/>
          </div>
          {navGroups.map(group=>(
            <div key={group.label} className="mb-5">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2 px-3" style={{ color:B.dimmed }}>{group.label}</p>
              {group.items.map(item=>(
                <button key={item.id} onClick={()=>setActiveDoc(item.id)} className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors mb-0.5 flex items-center gap-2" style={{ background:activeDoc===item.id?`${B.primary}15`:"transparent", color:activeDoc===item.id?B.primary:B.muted, fontWeight:activeDoc===item.id?600:400 }}>
                  {activeDoc===item.id && <div className="w-1 h-4 rounded-r-full flex-shrink-0 -ml-3 mr-2" style={{ background:B.primary }}/>}
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="px-5 py-4 border-t mt-auto" style={{ borderColor:B.border }}>
          <p className="text-[11px] font-semibold mb-2" style={{ color:B.dimmed }}>API Version</p>
          <div className="flex items-center gap-2">
            <span className="text-[11px] px-2 py-0.5 rounded font-bold" style={{ background:`${B.success}15`, color:B.success }}>v4.2.1</span>
            <span className="text-[10px]" style={{ color:B.dimmed }}>Latest stable</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth:"none" }}>
        <div className="max-w-3xl mx-auto px-10 py-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[11px] mb-8" style={{ color:B.dimmed }}>
            <span>Docs</span>
            <ChevronRight size={11}/>
            <span style={{ color:B.text }}>{allItems.find(i=>i.id===activeDoc)?.label}</span>
          </div>

          {/* Content */}
          {content[activeDoc] || fallback(activeDoc)}

          {/* Prev / Next nav */}
          <div className="flex gap-3 mt-14 pt-8 border-t" style={{ borderColor:B.border }}>
            {prev && (
              <button onClick={()=>setActiveDoc(prev.id)} className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl border text-sm text-left transition-colors hover:border-current" style={{ borderColor:B.border, color:B.muted }}>
                <ChevronRight size={14} className="rotate-180 flex-shrink-0"/><div><p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color:B.dimmed }}>Previous</p><p className="font-semibold" style={{ color:B.text }}>{prev.label}</p></div>
              </button>
            )}
            {next && (
              <button onClick={()=>setActiveDoc(next.id)} className="flex-1 flex items-center justify-end gap-2 px-4 py-3 rounded-xl border text-sm text-right transition-colors hover:border-current ml-auto" style={{ borderColor:B.border, color:B.muted }}>
                <div><p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color:B.dimmed }}>Next</p><p className="font-semibold" style={{ color:B.text }}>{next.label}</p></div><ChevronRight size={14} className="flex-shrink-0"/>
              </button>
            )}
          </div>

          {/* Feedback */}
          <div className="mt-8 p-5 rounded-2xl border flex items-center justify-between" style={{ borderColor:B.border, background:B.s2 }}>
            <p className="text-sm font-semibold" style={{ color:B.text }}>Was this page helpful?</p>
            <div className="flex gap-2">
              <button className="h-8 px-4 rounded-lg text-xs font-semibold text-white" style={{ background:B.primary }}>👍 Yes</button>
              <button className="h-8 px-4 rounded-lg text-xs border" style={{ borderColor:B.border, color:B.muted }}>👎 No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CAREERS PAGE ────────────────────────────────────────────────
export function CareersPage({ setPage }: { setPage: (p: Page) => void }) {
  const roles = [
    { title:"Senior AI Engineer",       dept:"Engineering", loc:"San Francisco / Remote", type:"Full-time" },
    { title:"Product Designer",         dept:"Design",      loc:"New York / Remote",      type:"Full-time" },
    { title:"Enterprise Account Exec",  dept:"Sales",       loc:"London / Remote",        type:"Full-time" },
    { title:"Developer Advocate",       dept:"Developer",   loc:"Remote",                 type:"Full-time" },
    { title:"ML Research Engineer",     dept:"AI/ML",       loc:"San Francisco",          type:"Full-time" },
    { title:"Senior Backend Engineer",  dept:"Engineering", loc:"Remote",                 type:"Full-time" },
    { title:"Customer Success Manager", dept:"CS",          loc:"Singapore / Remote",     type:"Full-time" },
    { title:"Growth Marketer",          dept:"Marketing",   loc:"Remote",                 type:"Full-time" },
  ];
  const values = [
    { title:"AI-first mindset",  desc:"We build every feature with AI at its core, not as an afterthought." },
    { title:"Customer obsessed", desc:"Every decision starts with: how does this help our customers?" },
    { title:"Ship fast, learn",  desc:"We deploy every 2 weeks. Speed and iteration beat perfection." },
    { title:"Global from day 1", desc:"Remote-friendly with offices in SF, London, and Singapore." },
  ];
  const deptColors: Record<string,string> = { Engineering:B.primary, Design:B.pink, Sales:B.success, Developer:B.cyan, "AI/ML":B.purple, CS:B.warning, Marketing:B.success };
  return (
    <div className="pt-36 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <Badge color={B.purple}><Star size={10}/>We're hiring</Badge>
          <h1 className="mt-4 text-5xl font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Build the future of<br/><span style={gradText(G.brand)}>customer communication</span></h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color:B.muted }}>Join a team of 120 people across 3 offices and 28 countries, building the AI platform that's changing how businesses talk to their customers.</p>
        </div>
        <div className="grid grid-cols-4 gap-3 mb-16">
          {[{n:"120",l:"Team members"},{n:"28",l:"Countries"},{n:"$40M+",l:"Total funding"},{n:"4.9★",l:"Glassdoor rating"}].map(s=>(
            <GlassCard key={s.l} className="p-5 text-center">
              <p className="text-3xl font-extrabold mb-1" style={{ fontFamily:"'Poppins',sans-serif", ...gradText(G.brand) }}>{s.n}</p>
              <p className="text-sm" style={{ color:B.muted }}>{s.l}</p>
            </GlassCard>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-16">
          {values.map(v=>(
            <GlassCard key={v.title} className="p-5">
              <p className="text-sm font-bold mb-1" style={{ color:B.text }}>{v.title}</p>
              <p className="text-sm" style={{ color:B.muted }}>{v.desc}</p>
            </GlassCard>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-6" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Open Positions</h2>
        <div className="space-y-3">
          {roles.map(r=>(
            <GlassCard key={r.title} className="p-5 flex items-center justify-between hover:scale-[1.005] transition-transform cursor-pointer">
              <div>
                <p className="text-base font-semibold" style={{ color:B.text }}>{r.title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <Badge color={deptColors[r.dept]||B.primary}>{r.dept}</Badge>
                  <span className="text-xs flex items-center gap-1" style={{ color:B.muted }}><MapPin size={10}/>{r.loc}</span>
                  <span className="text-xs" style={{ color:B.dimmed }}>{r.type}</span>
                </div>
              </div>
              <PrimaryBtn small>Apply Now</PrimaryBtn>
            </GlassCard>
          ))}
        </div>
        <div className="mt-12 text-center rounded-3xl p-10" style={{ background:`linear-gradient(135deg,${B.primary}20,${B.purple}15)`, border:`1px solid ${B.primary}30` }}>
          <p className="text-xl font-bold mb-2" style={{ color:B.text }}>Don't see your role?</p>
          <p className="text-sm mb-5" style={{ color:B.muted }}>We're always looking for exceptional people. Send us your story.</p>
          <PrimaryBtn onClick={()=>setPage("contact")}>Get in touch</PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

// ─── CUSTOMER STORIES ────────────────────────────────────────────
export function CustomerStoriesPage({ setPage }: { setPage: (p: Page) => void }) {
  const stories = [
    { company:"Nexus Technologies", industry:"Enterprise SaaS", logo:"NT", color:"#4F46E5", result:"78% faster response", metric:"From 4.2h → 18min avg", quote:"OmniDesk AI transformed how our 50-agent team handles 12,000+ conversations a month. The AI assistant alone saves us 3 hours per agent per day.", person:"Sarah Chen", role:"VP Customer Success" },
    { company:"ScaleUp Commerce",   industry:"E-Commerce",      logo:"SC", color:"#10B981", result:"$240K saved/year",    metric:"Support cost down 40%",  quote:"We went from six fragmented tools to one platform. The unified inbox changed everything — our CSAT went from 3.8 to 4.9 in six weeks.", person:"James Okonkwo", role:"Head of Support" },
    { company:"Meridian Health",    industry:"Healthcare",      logo:"MH", color:"#06B6D4", result:"3× volume, same team",metric:"No new hires needed",    quote:"The AI Governance controls gave our compliance team full confidence. We're HIPAA-compliant with complete audit trails.", person:"Priya Sharma", role:"CTO" },
    { company:"GlobalMart Retail",  industry:"Retail",          logo:"GM", color:"#EC4899", result:"4.9/5 CSAT",         metric:"Up from 4.1 in 60 days", quote:"We connected WhatsApp, Instagram, and TikTok all in one day. Automation handles 65% of order-status queries automatically.", person:"Linda Park", role:"Director of CX" },
    { company:"BuildFast Dev",      industry:"Developer Tools", logo:"BF", color:"#8B5CF6", result:"Day-1 API adoption", metric:"12,000+ calls/day",       quote:"The developer portal is outstanding — comprehensive docs, interactive playground, SDKs in every language. Integration took an afternoon.", person:"Tom Bradley", role:"CTO" },
    { company:"Apex Ventures",      industry:"Financial",       logo:"AV", color:"#F59E0B", result:"SOC 2 approved",     metric:"Compliance in 48 hours",  quote:"Security was non-negotiable. OmniDesk AI came with SOC 2 Type II, GDPR controls, and HIPAA BAA. Our security team approved it in 48 hours.", person:"Marcus Williams", role:"CISO" },
  ];
  return (
    <div className="pt-36 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge color={B.success}>★ Customer Stories</Badge>
          <h1 className="mt-4 text-5xl font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Real teams. Real results.</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color:B.muted }}>See how 2,400+ businesses use OmniDesk AI to transform customer communication.</p>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-16">
          {[{v:"2,400+",l:"Businesses worldwide"},{v:"78%",l:"Avg response improvement"},{v:"4.8★",l:"Average CSAT"},{v:"60+",l:"Countries"}].map(s=>(
            <GlassCard key={s.l} className="p-6 text-center">
              <p className="text-3xl font-extrabold mb-1" style={{ fontFamily:"'Poppins',sans-serif", background:G.brand, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{s.v}</p>
              <p className="text-sm" style={{ color:B.muted }}>{s.l}</p>
            </GlassCard>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {stories.map(s=>(
            <GlassCard key={s.company} className="p-6 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background:s.color }}>{s.logo}</div>
                  <div><p className="text-base font-bold" style={{ color:B.text }}>{s.company}</p><p className="text-xs" style={{ color:B.dimmed }}>{s.industry}</p></div>
                </div>
                <div className="text-right"><p className="text-sm font-bold" style={{ color:s.color }}>{s.result}</p><p className="text-[11px]" style={{ color:B.dimmed }}>{s.metric}</p></div>
              </div>
              <blockquote className="text-sm leading-relaxed flex-1 mb-4 italic" style={{ color:B.muted }}>"{s.quote}"</blockquote>
              <div className="pt-4 border-t" style={{ borderColor:B.border }}>
                <p className="text-xs font-semibold" style={{ color:B.text }}>{s.person}</p>
                <p className="text-[11px]" style={{ color:B.dimmed }}>{s.role}</p>
              </div>
            </GlassCard>
          ))}
        </div>
        <div className="text-center rounded-3xl p-12" style={{ background:`linear-gradient(135deg,${B.primary}20,${B.purple}15)`, border:`1px solid ${B.primary}30` }}>
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Ready to write your success story?</h2>
          <p className="text-sm mb-6" style={{ color:B.muted }}>Join 2,400+ businesses that made the switch to OmniDesk AI.</p>
          <div className="flex justify-center gap-3">
            <PrimaryBtn onClick={()=>setPage("pricing" as Page)}>Start free trial</PrimaryBtn>
            <OutlineBtn onClick={()=>setPage("contact" as Page)}>Talk to sales</OutlineBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PRIVACY POLICY ───────────────────────────────────────────────
export function PrivacyPage() {
  const sections = [
    { title:"Information We Collect", body:"We collect information you provide directly (name, email, company), usage data (conversations, API calls, analytics), and technical data (IP address, browser type, device info) to operate and improve OmniDesk AI." },
    { title:"How We Use Information", body:"We use collected data to: provide and improve our services, send transactional emails and product updates, analyze usage patterns, ensure security and compliance, and respond to support requests. We never sell your data to third parties." },
    { title:"Data Storage & Security", body:"All customer data is encrypted at rest (AES-256) and in transit (TLS 1.3). We store data in ISO 27001-certified data centers with SOC 2 Type II certification. You can choose your data residency region (US, EU, or APAC)." },
    { title:"Data Retention", body:"We retain data for the duration of your subscription plus 90 days after cancellation. You may request deletion at any time. Backup data is purged within 30 days of the deletion request." },
    { title:"Your Rights (GDPR)", body:"EU/EEA residents have the right to: access their personal data, correct inaccurate data, request deletion, restrict processing, and data portability. Submit requests via your workspace settings or at privacy@omnideskai.com." },
    { title:"Cookies", body:"We use essential cookies for authentication and preferences, analytics cookies to understand usage, and functional cookies for features. You can manage cookie preferences in your browser settings." },
    { title:"Third-Party Services", body:"We may share data with trusted sub-processors (AWS, OpenAI, Stripe, SendGrid) solely to deliver our services. All sub-processors are GDPR-compliant and bound by data processing agreements." },
    { title:"Changes to This Policy", body:"We will notify you of material changes via email and in-app notifications at least 30 days before they take effect. Continued use constitutes acceptance of the updated policy." },
  ];
  return (
    <div className="pt-36 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Privacy Policy</h1>
        <p className="text-sm mb-8" style={{ color:B.dimmed }}>Last updated: July 1, 2026 · Effective: July 1, 2026</p>
        <GlassCard className="p-6 mb-5"><p className="text-sm leading-relaxed" style={{ color:B.muted }}>OmniDesk AI ("we","our","us") is committed to protecting your privacy. This policy explains how we collect, use, and protect information about you when you use our platform.</p></GlassCard>
        <div className="space-y-4">
          {sections.map((s,i)=>(
            <GlassCard key={s.title} className="p-5">
              <h2 className="text-sm font-bold mb-2" style={{ color:B.text }}>{i+1}. {s.title}</h2>
              <p className="text-sm leading-relaxed" style={{ color:B.muted }}>{s.body}</p>
            </GlassCard>
          ))}
        </div>
        <GlassCard className="p-5 mt-6"><p className="text-sm" style={{ color:B.muted }}>Contact: <span style={{ color:B.primary }}>privacy@omnideskai.com</span> · OmniDesk AI, 340 Pine St Suite 800, San Francisco CA 94104</p></GlassCard>
      </div>
    </div>
  );
}

// ─── TERMS OF SERVICE ─────────────────────────────────────────────
export function TermsPage() {
  const sections = [
    { title:"Acceptance of Terms", body:"By accessing or using OmniDesk AI, you agree to these Terms. If you disagree, you may not access the service. These terms apply to all users including customers, agents, and administrators." },
    { title:"Description of Service", body:"OmniDesk AI provides an AI-powered omnichannel customer communication platform including unified inbox, AI assistant, CRM, analytics, automation builder, and related services." },
    { title:"Account Responsibilities", body:"You are responsible for: maintaining security of your credentials, all activities under your account, ensuring your team uses the service in compliance with these terms, and notifying us of any unauthorized access." },
    { title:"Acceptable Use", body:"You may not use OmniDesk AI to: send spam or unsolicited messages, violate applicable laws, infringe on intellectual property rights, reverse engineer the platform, or interfere with other users' service access." },
    { title:"Subscription & Billing", body:"Subscriptions are billed monthly or annually in advance. We reserve the right to update pricing with 30 days notice. Refunds are provided at our discretion within 30 days of payment." },
    { title:"Data Ownership", body:"You retain all ownership of data you input into OmniDesk AI. We do not claim any ownership of your customer conversations, contacts, or business data. We process your data solely to provide the service." },
    { title:"Service Level Agreement", body:"Enterprise plans include a 99.9% uptime SLA with credits for downtime exceeding the SLA. The SLA excludes scheduled maintenance, force majeure events, and third-party service outages." },
    { title:"Limitation of Liability", body:"To the maximum extent permitted by law, OmniDesk AI's total liability is limited to the amount paid by you in the 12 months preceding the claim. We are not liable for indirect or consequential damages." },
    { title:"Termination", body:"Either party may terminate with 30 days notice. We may suspend access immediately for violations. Upon termination, your data is retained for 90 days before permanent deletion." },
  ];
  return (
    <div className="pt-36 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Terms of Service</h1>
        <p className="text-sm mb-8" style={{ color:B.dimmed }}>Last updated: July 1, 2026 · Effective: July 1, 2026</p>
        <div className="space-y-4">
          {sections.map((s,i)=>(
            <GlassCard key={s.title} className="p-5">
              <h2 className="text-sm font-bold mb-2" style={{ color:B.text }}>{i+1}. {s.title}</h2>
              <p className="text-sm leading-relaxed" style={{ color:B.muted }}>{s.body}</p>
            </GlassCard>
          ))}
        </div>
        <GlassCard className="p-5 mt-6"><p className="text-sm" style={{ color:B.muted }}>Legal contact: <span style={{ color:B.primary }}>legal@omnideskai.com</span> · OmniDesk AI, 340 Pine St Suite 800, San Francisco CA 94104</p></GlassCard>
      </div>
    </div>
  );
}
