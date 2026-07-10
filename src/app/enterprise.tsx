import React, { useState } from "react";
import {
  LayoutDashboard, Users, Shield, Globe, Package, Key, Webhook,
  Activity, AlertCircle, CheckCircle2, TrendingUp, ArrowUpRight,
  ArrowDownRight, Search, Filter, Plus, Download, Copy, RefreshCw,
  Star, Check, ChevronDown, ChevronRight, ExternalLink, Settings,
  Zap, Brain, Lock, Server, Database, Cpu, Clock, Bell,
  FileText, Play, Code2, Terminal, GitBranch, Building2,
  BarChart3, BookOpen, Mic, Send, Mail, Phone, Target,
  Sparkles, X, Upload, Eye, Layers, Hash, MessageCircle,
  UserPlus, Flag, Boxes
} from "lucide-react";
import { B, G, gradText, AppScreen, GlassCard, Badge, Avatar, PrimaryBtn, OutlineBtn, SparkLine } from "./shared";

// ─── SUPER ADMIN CONSOLE ─────────────────────────────────────────
export function SuperAdmin() {
  const kpis = [
    { l:"Organizations",    v:"2,400",  d:"+48 this week", c:B.primary, data:[1800,1920,2050,2180,2280,2350,2400] },
    { l:"Active Users",     v:"18,400", d:"+312 today",    c:B.cyan,    data:[14000,15200,16100,17000,17600,18100,18400] },
    { l:"MRR",              v:"$484K",  d:"+$12K MoM",     c:B.success, data:[380,398,414,432,451,468,484] },
    { l:"API Calls / Day",  v:"2.8M",   d:"+18%",          c:B.purple,  data:[1.8,2.0,2.2,2.4,2.5,2.7,2.8].map(v=>v*1e6) },
    { l:"AI Tokens / Day",  v:"48M",    d:"+22%",          c:B.warning, data:[30,34,38,42,44,46,48].map(v=>v*1e6) },
    { l:"Platform Uptime",  v:"99.97%", d:"30-day avg",    c:B.success, data:[99.9,99.95,100,99.98,99.97,99.99,99.97] },
  ];
  const services = [
    { name:"API Gateway",      status:"operational", latency:"24ms" },
    { name:"AI Engine",        status:"operational", latency:"142ms" },
    { name:"Message Queue",    status:"operational", latency:"8ms" },
    { name:"Database Cluster", status:"operational", latency:"3ms" },
    { name:"Voice Service",    status:"degraded",    latency:"310ms" },
    { name:"Email Delivery",   status:"operational", latency:"18ms" },
    { name:"Storage Layer",    status:"operational", latency:"12ms" },
    { name:"Auth Service",     status:"operational", latency:"11ms" },
  ];
  const orgs = [
    { name:"Nexus Technologies", plan:"Enterprise", users:156, mrr:"$2,400", health:94, status:"Active" },
    { name:"Global Ventures",    plan:"Business",   users:87,  mrr:"$499",   health:98, status:"Active" },
    { name:"ScaleUp Commerce",   plan:"Enterprise", users:212, mrr:"$2,400", health:87, status:"Active" },
    { name:"BuildFast Dev",      plan:"Pro",        users:43,  mrr:"$199",   health:91, status:"Active" },
    { name:"Meridian Health",    plan:"Enterprise", users:341, mrr:"$2,400", health:96, status:"Active" },
  ];
  const statusColor: Record<string,string> = { operational:B.success, degraded:B.warning, outage:"#EF4444" };
  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded" style={{ background:`${B.pink}18`, color:B.pink }}>SUPER ADMIN</span>
          </div>
          <h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Platform Console</h1>
          <p className="text-xs" style={{ color:B.dimmed }}>Global platform health · All tenants · Real-time</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 h-7 px-3 rounded-xl border text-[11px]" style={{ borderColor:B.border, color:B.muted }}><RefreshCw size={10}/>Refresh</button>
          <PrimaryBtn small><Download size={11}/>Platform Report</PrimaryBtn>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-6 gap-3 mb-4">
        {kpis.map(k => (
          <GlassCard key={k.l} className="p-3">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[9px] uppercase tracking-wide" style={{ color:B.dimmed }}>{k.l}</p>
              <SparkLine data={k.data} color={k.c} w={40} h={18}/>
            </div>
            <p className="text-lg font-extrabold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>{k.v}</p>
            <p className="text-[10px] mt-0.5 font-semibold" style={{ color:B.success }}>{k.d}</p>
          </GlassCard>
        ))}
      </div>

      {/* Services + Recent orgs */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <GlassCard className="p-4">
          <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>Infrastructure Health</p>
          <div className="space-y-2">
            {services.map(s => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background:statusColor[s.status] }}/>
                  <span className="text-[11px]" style={{ color:B.muted }}>{s.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono" style={{ color:B.dimmed }}>{s.latency}</span>
                  <span className="text-[9px] capitalize" style={{ color:statusColor[s.status] }}>{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="col-span-2 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold" style={{ color:B.text }}>Top Organizations</p>
            <button className="text-[11px]" style={{ color:B.primary }}>View all →</button>
          </div>
          <table className="w-full">
            <thead><tr className="border-b" style={{ borderColor:B.border }}>{["Organization","Plan","Users","MRR","Health","Status"].map(h=><th key={h} className="text-left pb-2 text-[10px] uppercase tracking-wide" style={{ color:B.dimmed }}>{h}</th>)}</tr></thead>
            <tbody>
              {orgs.map(o => (
                <tr key={o.name} className="border-b hover:bg-white/5 transition-colors cursor-pointer" style={{ borderColor:B.border }}>
                  <td className="py-2.5 text-xs font-semibold" style={{ color:B.text }}>{o.name}</td>
                  <td className="py-2.5"><Badge color={o.plan==="Enterprise"?B.purple:o.plan==="Business"?B.primary:B.success}>{o.plan}</Badge></td>
                  <td className="py-2.5 text-xs" style={{ color:B.muted }}>{o.users}</td>
                  <td className="py-2.5 text-xs font-semibold" style={{ color:B.success }}>{o.mrr}</td>
                  <td className="py-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background:B.s2 }}>
                        <div className="h-full rounded-full" style={{ width:`${o.health}%`, background:o.health>90?B.success:B.warning }}/>
                      </div>
                      <span className="text-[10px]" style={{ color:B.dimmed }}>{o.health}%</span>
                    </div>
                  </td>
                  <td className="py-2.5"><span className="text-[10px] font-semibold" style={{ color:B.success }}>●  {o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>

      {/* Incident feed + quick stats */}
      <div className="grid grid-cols-3 gap-3">
        <GlassCard className="col-span-2 p-4">
          <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>Recent Platform Events</p>
          <div className="space-y-2.5">
            {[
              { type:"Deploy",   msg:"Platform v4.2.1 deployed successfully · 0 downtime",  time:"8m ago",  c:B.success },
              { type:"Alert",    msg:"Voice service latency elevated · P90 > 300ms · investigating", time:"22m ago", c:B.warning },
              { type:"Security", msg:"Unusual API pattern from IP 45.33.32.156 · blocked",   time:"1h ago",  c:B.pink },
              { type:"Scale",    msg:"Auto-scaled API gateway from 8→12 instances (load)",    time:"2h ago",  c:B.cyan },
              { type:"Deploy",   msg:"AI model updated to GPT-4o-turbo · performance +14%", time:"4h ago",  c:B.success },
            ].map((e,i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[9px] font-bold px-1.5 py-px rounded w-14 text-center" style={{ background:`${e.c}15`, color:e.c }}>{e.type}</span>
                <span className="text-[11px] flex-1" style={{ color:B.muted }}>{e.msg}</span>
                <span className="text-[10px] flex-shrink-0" style={{ color:B.dimmed }}>{e.time}</span>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>Platform Limits</p>
          {[
            { l:"Total storage",    used:2.4,  total:10,   unit:"TB",  c:B.primary },
            { l:"API rate (total)", used:2.8,  total:5,    unit:"M/hr",c:B.cyan },
            { l:"AI tokens today",  used:48,   total:100,  unit:"M",   c:B.purple },
            { l:"Webhook queue",    used:1241, total:50000,unit:"",    c:B.success },
          ].map(m => {
            const pct = Math.round((m.used/m.total)*100);
            return (
              <div key={m.l} className="mb-3">
                <div className="flex justify-between text-[10px] mb-1">
                  <span style={{ color:B.dimmed }}>{m.l}</span>
                  <span style={{ color:B.text }}>{m.used}{m.unit} / {m.total}{m.unit}</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background:B.s2 }}>
                  <div className="h-full rounded-full" style={{ width:`${pct}%`, background:pct>80?"#EF4444":pct>60?B.warning:m.c }}/>
                </div>
              </div>
            );
          })}
        </GlassCard>
      </div>
    </div>
  );
}

// ─── DEVELOPER PORTAL ────────────────────────────────────────────
export function DevPortal() {
  const [activeSection, setActiveSection] = useState("quickstart");
  const nav = [
    { id:"quickstart", label:"Quick Start",        icon:Play },
    { id:"auth",       label:"Authentication",     icon:Key },
    { id:"rest",       label:"REST API",            icon:Globe },
    { id:"webhooks",   label:"Webhooks",            icon:Webhook },
    { id:"sdks",       label:"SDKs",               icon:Code2 },
    { id:"examples",   label:"Examples",           icon:GitBranch },
    { id:"changelog",  label:"Changelog",          icon:FileText },
  ];
  const endpoints = [
    { method:"GET",    path:"/v1/conversations",          desc:"List all conversations" },
    { method:"POST",   path:"/v1/conversations/{id}/reply",desc:"Send a reply" },
    { method:"GET",    path:"/v1/contacts",               desc:"List contacts" },
    { method:"POST",   path:"/v1/contacts",               desc:"Create contact" },
    { method:"GET",    path:"/v1/analytics/overview",     desc:"Analytics overview" },
    { method:"POST",   path:"/v1/ai/generate",            desc:"Generate AI reply" },
    { method:"GET",    path:"/v1/channels",               desc:"List channels" },
    { method:"POST",   path:"/v1/webhooks",               desc:"Register webhook" },
  ];
  const methodColor: Record<string,string> = { GET:B.success, POST:B.primary, PUT:B.warning, DELETE:"#EF4444", PATCH:B.cyan };
  const code = `// Install the SDK
npm install @omnideskai/sdk

// Initialize
import { OmniDesk } from '@omnideskai/sdk';

const client = new OmniDesk({
  apiKey: process.env.OMNIDESKAI_API_KEY,
});

// Send a reply
const reply = await client.conversations.reply('conv_2847', {
  message: 'Hi Sarah, I've sorted this for you.',
  channel: 'whatsapp',
});

console.log(reply.message_id); // msg_9821`;

  return (
    <div className="flex h-full">
      <div className="w-52 border-r flex flex-col flex-shrink-0" style={{ borderColor:B.border, background:"#060C1A" }}>
        <div className="p-4 border-b" style={{ borderColor:B.border }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background:G.brand }}><Code2 size={13} className="text-white"/></div>
            <div>
              <p className="text-xs font-bold" style={{ color:B.text }}>Developer Portal</p>
              <p className="text-[9px]" style={{ color:B.dimmed }}>API v4.2 · REST + GraphQL</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-2 overflow-y-auto" style={{ scrollbarWidth:"none" }}>
          {nav.map(n => (
            <button key={n.id} onClick={()=>setActiveSection(n.id)} className="w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-[11px] font-medium transition-colors mb-0.5" style={{ background:activeSection===n.id?`${B.primary}15`:"transparent", color:activeSection===n.id?B.primary:B.dimmed }}>
              <n.icon size={12}/>{n.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t" style={{ borderColor:B.border }}>
          <div className="rounded-xl p-3" style={{ background:B.s2 }}>
            <p className="text-[9px] font-bold uppercase tracking-widest mb-1.5" style={{ color:B.dimmed }}>Your API Key</p>
            <div className="flex items-center gap-1">
              <code className="text-[10px] flex-1 truncate" style={{ color:B.primary }}>sk-omni-••••••••••4291</code>
              <button style={{ color:B.dimmed }}><Copy size={10}/></button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth:"none" }}>
        {activeSection === "quickstart" && (
          <div className="p-6 max-w-3xl">
            <h2 className="text-2xl font-bold mb-1" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Get started in 5 minutes</h2>
            <p className="text-sm mb-6" style={{ color:B.dimmed }}>Everything you need to integrate OmniDesk AI into your application.</p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[{n:"01",t:"Get API key",ic:Key},{n:"02",t:"Install SDK",ic:Terminal},{n:"03",t:"Send first request",ic:Send}].map(s=>(
                <GlassCard key={s.n} className="p-4 text-center">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background:G.brand }}><s.ic size={14} className="text-white"/></div>
                  <p className="text-[11px] font-bold" style={{ color:B.primary }}>Step {s.n}</p>
                  <p className="text-xs" style={{ color:B.text }}>{s.t}</p>
                </GlassCard>
              ))}
            </div>
            <GlassCard className="p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold" style={{ color:B.text }}>JavaScript / TypeScript</p>
                <button className="flex items-center gap-1 text-[11px]" style={{ color:B.primary }}><Copy size={10}/>Copy</button>
              </div>
              <pre className="text-[11px] leading-relaxed overflow-x-auto" style={{ color:"#A5B4FC", fontFamily:"'JetBrains Mono',monospace" }}>{code}</pre>
            </GlassCard>
            <div className="grid grid-cols-2 gap-3">
              {[{l:"SDK Reference →",d:"Full TypeScript type docs"},{l:"API Explorer →",d:"Try endpoints interactively"},{l:"Webhook Guide →",d:"Receive real-time events"},{l:"Examples →",d:"Sample apps and recipes"}].map(c=>(
                <GlassCard key={c.l} className="p-3 flex items-center justify-between cursor-pointer hover:scale-[1.01] transition-transform">
                  <div><p className="text-xs font-semibold" style={{ color:B.primary }}>{c.l}</p><p className="text-[11px]" style={{ color:B.dimmed }}>{c.d}</p></div>
                  <ChevronRight size={13} style={{ color:B.dimmed }}/>
                </GlassCard>
              ))}
            </div>
          </div>
        )}
        {activeSection === "rest" && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-1" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>REST API Reference</h2>
            <p className="text-sm mb-5" style={{ color:B.dimmed }}>Base URL: <code style={{ color:B.cyan }}>https://api.omnideskai.com</code> · API Version: <code style={{ color:B.cyan }}>v4.2</code></p>
            <div className="space-y-2">
              {endpoints.map(ep => (
                <GlassCard key={`${ep.method}-${ep.path}`} className="p-3.5 flex items-center gap-3 cursor-pointer hover:border-opacity-60 transition-all">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded w-12 text-center flex-shrink-0" style={{ background:`${methodColor[ep.method]}18`, color:methodColor[ep.method] }}>{ep.method}</span>
                  <code className="text-[11px] flex-1" style={{ color:B.text, fontFamily:"'JetBrains Mono',monospace" }}>{ep.path}</code>
                  <span className="text-[11px]" style={{ color:B.dimmed }}>{ep.desc}</span>
                  <ChevronRight size={11} style={{ color:B.dimmed }}/>
                </GlassCard>
              ))}
            </div>
          </div>
        )}
        {!["quickstart","rest"].includes(activeSection) && (
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              <Code2 size={24} style={{ color:B.primary, margin:"0 auto 12px" }}/>
              <p className="text-sm font-semibold" style={{ color:B.text }}>{nav.find(n=>n.id===activeSection)?.label}</p>
              <p className="text-xs mt-1" style={{ color:B.dimmed }}>Documentation loads here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── API PLAYGROUND ──────────────────────────────────────────────
export function APIPlayground() {
  const [method, setMethod] = useState("POST");
  const [url, setUrl] = useState("/v1/conversations/conv_2847/reply");
  const [sent, setSent] = useState(false);
  const [tab, setTab] = useState<"body"|"headers"|"response">("body");
  const body = `{
  "message": "Hi Sarah, I've arranged overnight delivery at no charge.",
  "channel": "whatsapp",
  "agent_id": "agent_alex_k",
  "ai_assisted": true
}`;
  const response = `{
  "status": 200,
  "ok": true,
  "data": {
    "conversation_id": "conv_2847",
    "message_id": "msg_98214",
    "channel": "whatsapp",
    "sent_at": "2026-07-01T22:45:12.483Z",
    "latency_ms": 142,
    "ai_confidence": 0.94
  }
}`;
  const methods = ["GET","POST","PUT","PATCH","DELETE"];
  const methodColor: Record<string,string> = { GET:B.success, POST:B.primary, PUT:B.warning, PATCH:B.cyan, DELETE:"#EF4444" };
  return (
    <div className="flex h-full">
      {/* Endpoint list */}
      <div className="w-56 border-r flex flex-col flex-shrink-0" style={{ borderColor:B.border, background:"#060C1A" }}>
        <div className="p-3 border-b" style={{ borderColor:B.border }}>
          <p className="text-xs font-bold mb-2" style={{ color:B.text }}>API Playground</p>
          <div className="flex items-center gap-1.5 h-7 px-2 rounded-lg" style={{ background:`${B.primary}08`, border:`1px solid ${B.border}` }}>
            <Search size={10} style={{ color:B.dimmed }}/><input className="flex-1 text-[10px] bg-transparent outline-none" placeholder="Search endpoints…" style={{ color:B.text }}/>
          </div>
        </div>
        <div className="flex-1 p-2 overflow-y-auto" style={{ scrollbarWidth:"none" }}>
          {[
            { g:"Conversations", eps:[{m:"GET",p:"/v1/conversations"},{m:"POST",p:"/v1/conversations/{id}/reply"},{m:"PATCH",p:"/v1/conversations/{id}"}] },
            { g:"Contacts",      eps:[{m:"GET",p:"/v1/contacts"},{m:"POST",p:"/v1/contacts"},{m:"DELETE",p:"/v1/contacts/{id}"}] },
            { g:"AI",            eps:[{m:"POST",p:"/v1/ai/generate"},{m:"POST",p:"/v1/ai/summarize"}] },
            { g:"Analytics",     eps:[{m:"GET",p:"/v1/analytics/overview"},{m:"GET",p:"/v1/analytics/agents"}] },
          ].map(grp => (
            <div key={grp.g} className="mb-3">
              <p className="text-[9px] font-bold uppercase tracking-widest px-2 mb-1" style={{ color:B.dimmed }}>{grp.g}</p>
              {grp.eps.map(ep => (
                <button key={`${ep.m}-${ep.p}`} onClick={()=>{setMethod(ep.m);setUrl(ep.p);setSent(false);}} className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-lg mb-0.5 text-left hover:bg-white/5 transition-colors">
                  <span className="text-[8px] font-bold w-9 text-center rounded px-1" style={{ background:`${(methodColor as Record<string,string>)[ep.m]}15`, color:(methodColor as Record<string,string>)[ep.m] }}>{ep.m}</span>
                  <span className="text-[10px] truncate" style={{ color:B.muted }}>{ep.p.replace("/v1","")}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Request builder */}
      <div className="flex-1 flex flex-col overflow-hidden border-r" style={{ borderColor:B.border }}>
        <div className="p-3 border-b flex-shrink-0" style={{ borderColor:B.border }}>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg overflow-hidden border" style={{ borderColor:B.border }}>
              {methods.map(m => (
                <button key={m} onClick={()=>setMethod(m)} className="px-2.5 py-1.5 text-[10px] font-bold transition-colors" style={{ background:method===m?(methodColor as Record<string,string>)[m]:"transparent", color:method===m?"#fff":(methodColor as Record<string,string>)[m] }}>{m}</button>
              ))}
            </div>
            <div className="flex-1 h-8 px-3 rounded-xl border flex items-center" style={{ background:B.s2, borderColor:B.border }}>
              <code className="text-[11px]" style={{ color:B.cyan }}>{url}</code>
            </div>
            <PrimaryBtn small onClick={()=>setSent(true)}><Play size={11}/>Send</PrimaryBtn>
          </div>
        </div>
        <div className="flex border-b flex-shrink-0" style={{ borderColor:B.border }}>
          {(["body","headers","response"] as const).map(t=><button key={t} onClick={()=>setTab(t)} className="px-4 py-2.5 text-[11px] font-medium capitalize border-b-2 transition-colors" style={{ color:tab===t?B.primary:B.dimmed, borderColor:tab===t?B.primary:"transparent" }}>{t}</button>)}
        </div>
        <div className="flex-1 overflow-y-auto p-4" style={{ scrollbarWidth:"none" }}>
          {tab === "body" && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color:B.dimmed }}>Request Body · JSON</p>
              <GlassCard className="p-4">
                <pre className="text-[11px] leading-relaxed" style={{ color:"#A5B4FC", fontFamily:"'JetBrains Mono',monospace" }}>{body}</pre>
              </GlassCard>
            </div>
          )}
          {tab === "headers" && (
            <div className="space-y-2">
              {[{k:"Authorization",v:"Bearer sk-omni-••••4291"},{k:"Content-Type",v:"application/json"},{k:"X-OmniDesk-Version",v:"2026-07-01"}].map(h=>(
                <GlassCard key={h.k} className="p-3 flex items-center gap-3">
                  <code className="text-[11px] w-44 flex-shrink-0" style={{ color:B.cyan, fontFamily:"'JetBrains Mono',monospace" }}>{h.k}</code>
                  <code className="text-[11px]" style={{ color:B.muted, fontFamily:"'JetBrains Mono',monospace" }}>{h.v}</code>
                </GlassCard>
              ))}
            </div>
          )}
          {tab === "response" && (
            <div>
              {sent ? (
                <>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge color={B.success}>200 OK</Badge>
                    <span className="text-[11px]" style={{ color:B.dimmed }}>142ms · 284 bytes</span>
                  </div>
                  <GlassCard className="p-4">
                    <pre className="text-[11px] leading-relaxed" style={{ color:"#A5B4FC", fontFamily:"'JetBrains Mono',monospace" }}>{response}</pre>
                  </GlassCard>
                </>
              ) : (
                <div className="flex items-center justify-center h-32">
                  <p className="text-sm" style={{ color:B.dimmed }}>Send a request to see the response</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Code samples panel */}
      <div className="w-64 flex-shrink-0 overflow-y-auto p-4" style={{ scrollbarWidth:"none" }}>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color:B.dimmed }}>Code Samples</p>
        <div className="space-y-2">
          {["curl","JavaScript","Python","Go","PHP"].map(lang => (
            <GlassCard key={lang} className="p-3 cursor-pointer hover:border-opacity-60 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold" style={{ color:B.text }}>{lang}</span>
                <Copy size={10} style={{ color:B.dimmed }}/>
              </div>
            </GlassCard>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-xl" style={{ background:`${B.cyan}10`, border:`1px solid ${B.cyan}20` }}>
          <p className="text-[10px] font-bold mb-1" style={{ color:B.cyan }}>OpenAPI Spec</p>
          <p className="text-[10px] mb-2" style={{ color:B.dimmed }}>Download and import into Postman, Insomnia, or any API client.</p>
          <button className="flex items-center gap-1 text-[10px] font-semibold" style={{ color:B.cyan }}><Download size={9}/>openapi.yaml</button>
        </div>
      </div>
    </div>
  );
}

// ─── MARKETPLACE ─────────────────────────────────────────────────
export function EnterpriseMarketplace() {
  const [cat, setCat] = useState("All");
  const [installed, setInstalled] = useState<string[]>(["Salesforce CRM","Shopify","Stripe"]);
  const cats = ["All","CRM","Analytics","Automation","Payments","Communication","Security","Productivity","AI","Developer"];
  const apps = [
    { name:"Salesforce CRM",      cat:"CRM",          rating:4.8, installs:"2.1K", icon:"SF", color:"#00A1E0", verified:true,  desc:"Sync contacts, deals, and conversations with Salesforce." },
    { name:"HubSpot",             cat:"CRM",          rating:4.7, installs:"1.9K", icon:"HS", color:"#FF7A59", verified:true,  desc:"Full HubSpot CRM, marketing, and sales integration." },
    { name:"Shopify",             cat:"Payments",     rating:4.9, installs:"1.6K", icon:"SH", color:"#96BF48", verified:true,  desc:"Connect order management, refunds, and customer data." },
    { name:"Stripe",              cat:"Payments",     rating:4.8, installs:"1.4K", icon:"ST", color:"#6772E5", verified:true,  desc:"Payment processing, subscription management, and invoices." },
    { name:"Zapier",              cat:"Automation",   rating:4.5, installs:"2.4K", icon:"ZP", color:"#FF4A00", verified:true,  desc:"Connect 6,000+ apps with no-code automations." },
    { name:"Google Analytics",    cat:"Analytics",    rating:4.5, installs:"1.2K", icon:"GA", color:"#F9AB00", verified:false, desc:"Track conversation-driven conversions and user journeys." },
    { name:"Slack",               cat:"Communication",rating:4.8, installs:"1.7K", icon:"SL", color:"#4A154B", verified:true,  desc:"Get alerts, escalations, and summaries in Slack." },
    { name:"Zoom",                cat:"Communication",rating:4.6, installs:"934",  icon:"ZM", color:"#2D8CFF", verified:true,  desc:"Launch Zoom calls directly from conversations." },
    { name:"Jira",                cat:"Developer",    rating:4.3, installs:"891",  icon:"JR", color:"#0052CC", verified:false, desc:"Create and track issues from customer conversations." },
    { name:"GitHub",              cat:"Developer",    rating:4.7, installs:"743",  icon:"GH", color:"#24292E", verified:false, desc:"Link conversations to PRs, issues, and releases." },
    { name:"Notion",              cat:"Productivity", rating:4.5, installs:"678",  icon:"NO", color:"#000",    verified:false, desc:"Sync knowledge base and notes with Notion pages." },
    { name:"OpenAI",              cat:"AI",           rating:4.9, installs:"612",  icon:"OA", color:"#412991", verified:true,  desc:"Use GPT-4o for custom AI reply workflows." },
  ].filter(a => cat === "All" || a.cat === cat);

  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Marketplace</h1><p className="text-xs" style={{ color:B.dimmed }}>240+ integrations · Official & Partner apps · Free to install</p></div>
        <PrimaryBtn small><Plus size={11}/>Submit App</PrimaryBtn>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 h-9 px-3 rounded-xl mb-4" style={{ background:B.s2, border:`1px solid ${B.border}` }}>
        <Search size={13} style={{ color:B.dimmed }}/><input className="flex-1 text-sm bg-transparent outline-none" placeholder="Search apps, integrations…" style={{ color:B.text }}/>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {cats.map(c => <button key={c} onClick={()=>setCat(c)} className="px-3 py-1.5 rounded-full text-[11px] font-semibold transition-colors" style={{ background:cat===c?B.primary:`${B.primary}10`, color:cat===c?"#fff":B.dimmed }}>{c}</button>)}
      </div>

      {/* Featured row */}
      {cat === "All" && (
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color:B.dimmed }}>Featured & Verified</p>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {apps.filter(a=>a.verified).slice(0,3).map(a => (
              <GlassCard key={a.name} className="p-5" style={{ borderColor:`${a.color}25` }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold text-white" style={{ background:a.color }}>{a.icon}</div>
                  {installed.includes(a.name) ? (
                    <Badge color={B.success}>Installed</Badge>
                  ) : (
                    <PrimaryBtn small onClick={()=>setInstalled(p=>[...p,a.name])}>Install</PrimaryBtn>
                  )}
                </div>
                <p className="text-sm font-bold mb-1" style={{ color:B.text }}>{a.name}</p>
                <p className="text-[11px] mb-3 leading-relaxed" style={{ color:B.dimmed }}>{a.desc}</p>
                <div className="flex items-center gap-2 text-[10px]" style={{ color:B.dimmed }}>
                  <span style={{ color:B.warning }}>★ {a.rating}</span><span>{a.installs} installs</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* App grid */}
      <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color:B.dimmed }}>{cat === "All" ? "All Apps" : cat}</p>
      <div className="grid grid-cols-4 gap-3">
        {apps.map(a => (
          <GlassCard key={a.name} className="p-4 flex flex-col hover:scale-[1.01] transition-transform">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0" style={{ background:a.color }}>{a.icon}</div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold truncate" style={{ color:B.text }}>{a.name}</p>
                <p className="text-[9px]" style={{ color:B.dimmed }}>★ {a.rating} · {a.installs}</p>
              </div>
            </div>
            <p className="text-[10px] leading-relaxed flex-1 mb-3" style={{ color:B.dimmed }}>{a.desc}</p>
            <button onClick={()=>setInstalled(p=>installed.includes(a.name)?p.filter(x=>x!==a.name):[...p,a.name])}
              className="w-full h-7 rounded-lg text-[11px] font-semibold transition-all"
              style={{ background:installed.includes(a.name)?`${B.success}15`:`${B.primary}15`, color:installed.includes(a.name)?B.success:B.primary }}>
              {installed.includes(a.name) ? "✓ Installed" : "Install"}
            </button>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

// ─── SECURITY CENTER ──────────────────────────────────────────────
export function SecurityCenter() {
  const [tab, setTab] = useState("identity");
  const tabs = [
    { id:"identity",    label:"Identity & SSO" },
    { id:"mfa",         label:"MFA & Sessions" },
    { id:"network",     label:"Network & IP" },
    { id:"encryption",  label:"Encryption" },
    { id:"alerts",      label:"Security Alerts" },
  ];
  const alerts = [
    { level:"critical", msg:"Brute force attempt — 47 failed logins from 45.33.32.156", time:"22m ago" },
    { level:"warning",  msg:"New admin access from unrecognized device — verify identity", time:"1h ago" },
    { level:"info",     msg:"SSO certificate expires in 14 days — renew before Aug 15",   time:"3h ago" },
    { level:"info",     msg:"SCIM sync completed — 24 users provisioned from Okta",       time:"5h ago" },
  ];
  const alertColor: Record<string,string> = { critical:"#EF4444", warning:B.warning, info:B.cyan };
  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Security Center</h1><p className="text-xs" style={{ color:B.dimmed }}>Identity, access control, encryption & compliance</p></div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border" style={{ borderColor:`${B.success}30`, background:`${B.success}08` }}>
          <Shield size={12} style={{ color:B.success }}/><span className="text-xs font-semibold" style={{ color:B.success }}>Security Score: 94/100</span>
        </div>
      </div>

      <div className="flex gap-2 mb-5">
        {tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} className="px-4 py-2 rounded-xl text-xs font-semibold transition-colors" style={{ background:tab===t.id?B.primary:`${B.primary}10`, color:tab===t.id?"#fff":B.dimmed }}>{t.label}</button>)}
      </div>

      {tab === "identity" && (
        <div className="grid grid-cols-2 gap-4">
          <GlassCard className="p-5">
            <p className="text-sm font-semibold mb-4" style={{ color:B.text }}>Single Sign-On (SSO)</p>
            {[{p:"Okta",status:"Connected",color:B.success},{p:"Microsoft Entra",status:"Connected",color:B.success},{p:"Google Workspace",status:"Not configured",color:B.slate},{p:"SAML 2.0",status:"Active",color:B.success}].map(s=>(
              <div key={s.p} className="flex items-center justify-between py-2.5 border-b" style={{ borderColor:B.border }}>
                <span className="text-sm" style={{ color:B.text }}>{s.p}</span>
                <Badge color={s.color}>{s.status}</Badge>
              </div>
            ))}
            <PrimaryBtn small className="mt-4">+ Add Provider</PrimaryBtn>
          </GlassCard>
          <GlassCard className="p-5">
            <p className="text-sm font-semibold mb-4" style={{ color:B.text }}>Access Policies</p>
            {[{l:"Password minimum length",v:"12 characters"},{l:"Password complexity",v:"Required"},{l:"Session timeout",v:"8 hours"},{l:"Failed login lockout",v:"5 attempts"},{l:"SCIM provisioning",v:"Enabled · Okta"},{l:"JIT provisioning",v:"Enabled"}].map(p=>(
              <div key={p.l} className="flex justify-between py-2 border-b text-[11px]" style={{ borderColor:B.border }}>
                <span style={{ color:B.dimmed }}>{p.l}</span><span style={{ color:B.text }}>{p.v}</span>
              </div>
            ))}
          </GlassCard>
        </div>
      )}

      {tab === "alerts" && (
        <div className="space-y-3">
          {alerts.map((a,i) => (
            <GlassCard key={i} className="p-4 flex items-start gap-3" style={{ borderColor:`${alertColor[a.level]}25` }}>
              <AlertCircle size={16} style={{ color:alertColor[a.level], flexShrink:0, marginTop:1 }}/>
              <div className="flex-1">
                <p className="text-sm" style={{ color:B.text }}>{a.msg}</p>
                <p className="text-[11px] mt-1" style={{ color:B.dimmed }}>{a.time}</p>
              </div>
              <button className="text-[11px] font-semibold" style={{ color:alertColor[a.level] }}>Investigate</button>
            </GlassCard>
          ))}
        </div>
      )}

      {!["identity","alerts"].includes(tab) && (
        <GlassCard className="p-8 text-center">
          <Shield size={24} style={{ color:B.primary, margin:"0 auto 12px" }}/>
          <p className="text-sm font-semibold" style={{ color:B.text }}>{tabs.find(t=>t.id===tab)?.label}</p>
          <p className="text-xs mt-1" style={{ color:B.dimmed }}>Security configuration loads here</p>
        </GlassCard>
      )}
    </div>
  );
}

// ─── MONITORING ──────────────────────────────────────────────────
export function MonitoringDashboard() {
  const services = [
    { name:"API Gateway",        uptime:"99.99%", latency:"24ms",  rps:"12,400",  status:"up" },
    { name:"AI Engine",          uptime:"99.97%", latency:"142ms", rps:"4,200",   status:"up" },
    { name:"WebSocket",          uptime:"99.95%", latency:"8ms",   rps:"28,100",  status:"up" },
    { name:"Database (Primary)", uptime:"100%",   latency:"3ms",   rps:"—",       status:"up" },
    { name:"Database (Replica)", uptime:"99.99%", latency:"4ms",   rps:"—",       status:"up" },
    { name:"Voice Service",      uptime:"99.71%", latency:"310ms", rps:"890",     status:"degraded" },
    { name:"Email Queue",        uptime:"99.99%", latency:"18ms",  rps:"2,100",   status:"up" },
    { name:"Storage (S3)",       uptime:"100%",   latency:"12ms",  rps:"—",       status:"up" },
    { name:"CDN",                uptime:"100%",   latency:"6ms",   rps:"—",       status:"up" },
    { name:"Auth Service",       uptime:"99.99%", latency:"11ms",  rps:"8,400",   status:"up" },
    { name:"Webhook Delivery",   uptime:"99.94%", latency:"88ms",  rps:"1,200",   status:"up" },
    { name:"Billing Service",    uptime:"100%",   latency:"44ms",  rps:"—",       status:"up" },
  ];
  const statusColor: Record<string,string> = { up:B.success, degraded:B.warning, down:"#EF4444" };
  const latencyData = [24,28,22,31,26,24,23,25,22,24,24,24];
  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Monitoring & Observability</h1><p className="text-xs" style={{ color:B.dimmed }}>Real-time infrastructure · Auto-refreshes every 30s</p></div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs" style={{ color:B.success }}><span className="w-2 h-2 rounded-full animate-pulse" style={{ background:B.success }}/>All systems operational</span>
        </div>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[{l:"Services Up",v:"11/12",c:B.success},{l:"Avg Latency",v:"24ms",c:B.primary},{l:"Error Rate",v:"0.003%",c:B.success},{l:"30-day Uptime",v:"99.97%",c:B.success}].map(s=>(
          <GlassCard key={s.l} className="p-4 text-center">
            <p className="text-[10px] uppercase tracking-wide mb-1" style={{ color:B.dimmed }}>{s.l}</p>
            <p className="text-2xl font-extrabold" style={{ fontFamily:"'Poppins',sans-serif", color:s.c }}>{s.v}</p>
          </GlassCard>
        ))}
      </div>

      {/* Latency sparkline */}
      <GlassCard className="p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold" style={{ color:B.text }}>API Latency — Last 60 minutes</p>
          <span className="text-xs" style={{ color:B.success }}>P50: 24ms · P95: 89ms · P99: 142ms</span>
        </div>
        <SparkLine data={latencyData} color={B.primary} w={800} h={60}/>
      </GlassCard>

      {/* Service grid */}
      <div className="grid grid-cols-3 gap-3">
        {services.map(s => (
          <GlassCard key={s.name} className="p-4" style={{ borderColor:s.status==="degraded"?`${B.warning}30`:B.border }}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs font-semibold" style={{ color:B.text }}>{s.name}</p>
                <p className="text-[10px] mt-0.5" style={{ color:statusColor[s.status] }}>● {s.status==="up"?"Operational":s.status==="degraded"?"Degraded":"Down"}</p>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-px rounded" style={{ background:`${statusColor[s.status]}15`, color:statusColor[s.status] }}>{s.uptime}</span>
            </div>
            <div className="flex justify-between text-[10px]" style={{ color:B.dimmed }}>
              <span>Latency: <span style={{ color:B.text }}>{s.latency}</span></span>
              {s.rps !== "—" && <span>Req/s: <span style={{ color:B.text }}>{s.rps}</span></span>}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

// ─── AI GOVERNANCE ────────────────────────────────────────────────
export function AIGovernance() {
  const [temp, setTemp] = useState(70);
  const models = [
    { name:"OmniDesk Reply AI",   model:"GPT-4o",        status:"Active", calls:"8,241/day", accuracy:"94%" },
    { name:"Intent Classifier",   model:"Fine-tuned GPT", status:"Active", calls:"12,100/day",accuracy:"97%" },
    { name:"Sentiment Analyzer",  model:"BERT-large",    status:"Active", calls:"18,400/day",accuracy:"91%" },
    { name:"Translation Engine",  model:"DeepL + GPT",   status:"Active", calls:"2,840/day", accuracy:"99%" },
    { name:"Voice Transcription", model:"Whisper v3",    status:"Active", calls:"890/day",   accuracy:"96%" },
  ];
  const prompts = [
    { name:"Customer Apology",    status:"Approved", uses:"4,821", score:94 },
    { name:"Shipping Delay Reply",status:"Approved", uses:"3,102", score:91 },
    { name:"Upgrade Pitch",       status:"Review",   uses:"—",     score:78 },
    { name:"Refund Policy Reply", status:"Approved", uses:"1,244", score:88 },
    { name:"Technical Support",   status:"Draft",    uses:"—",     score:82 },
  ];
  const statusColor: Record<string,string> = { Approved:B.success, Review:B.warning, Draft:B.slate };
  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>AI Governance</h1><p className="text-xs" style={{ color:B.dimmed }}>Model oversight, guardrails, prompt management & safety</p></div>
        <PrimaryBtn small><Sparkles size={11}/>Run Safety Audit</PrimaryBtn>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {[{l:"AI Models Active",v:"5",c:B.purple},{l:"Prompt Templates",v:"24",c:B.primary},{l:"Safety Violations Today",v:"0",c:B.success},{l:"Avg Confidence",v:"94.2%",c:B.cyan},{l:"Hallucination Rate",v:"0.003%",c:B.success},{l:"Bias Alerts (7d)",v:"2",c:B.warning}].map(s=>(
          <GlassCard key={s.l} className="p-4 text-center">
            <p className="text-[10px] uppercase tracking-wide mb-1" style={{ color:B.dimmed }}>{s.l}</p>
            <p className="text-2xl font-extrabold" style={{ fontFamily:"'Poppins',sans-serif", color:s.c }}>{s.v}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Model registry */}
        <GlassCard className="p-4">
          <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>Active AI Models</p>
          <div className="space-y-3">
            {models.map(m => (
              <div key={m.name} className="flex items-center gap-3 p-2.5 rounded-xl border" style={{ borderColor:B.border, background:"rgba(255,255,255,0.02)" }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:`${B.purple}15` }}><Brain size={14} style={{ color:B.purple }}/></div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold" style={{ color:B.text }}>{m.name}</p>
                  <p className="text-[10px]" style={{ color:B.dimmed }}>{m.model}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-semibold" style={{ color:B.success }}>{m.accuracy}</p>
                  <p className="text-[9px]" style={{ color:B.dimmed }}>{m.calls}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Guardrails */}
        <GlassCard className="p-4">
          <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>Guardrails & Safety</p>
          <div className="space-y-3 mb-4">
            {[{l:"Block PII in responses",v:true},{l:"Content safety filter",v:true},{l:"Competitor mentions",v:true},{l:"Political content filter",v:true},{l:"Legal disclaimer required",v:false}].map(g=>(
              <div key={g.l} className="flex items-center justify-between">
                <span className="text-[11px]" style={{ color:B.muted }}>{g.l}</span>
                <div className="w-9 h-5 rounded-full flex items-center px-0.5 transition-colors" style={{ background:g.v?B.primary:B.s2 }}>
                  <div className="w-4 h-4 rounded-full bg-white shadow transition-transform" style={{ transform:g.v?"translateX(16px)":"translateX(0)" }}/>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-3 border-t" style={{ borderColor:B.border }}>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[11px]" style={{ color:B.muted }}>Temperature: {(temp/100).toFixed(2)}</p>
              <span className="text-[10px]" style={{ color:B.primary }}>Conservative ↔ Creative</span>
            </div>
            <input type="range" min={0} max={100} value={temp} onChange={e=>setTemp(+e.target.value)} className="w-full h-1.5 rounded-full appearance-none cursor-pointer" style={{ accentColor:B.primary, background:`linear-gradient(to right,${B.primary} ${temp}%,${B.s2} ${temp}%)` }}/>
          </div>
        </GlassCard>
      </div>

      {/* Prompt library */}
      <GlassCard className="p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold" style={{ color:B.text }}>Prompt Library</p>
          <PrimaryBtn small><Plus size={11}/>New Prompt</PrimaryBtn>
        </div>
        <table className="w-full">
          <thead><tr className="border-b" style={{ borderColor:B.border }}>{["Template","Status","Uses","Safety Score","Actions"].map(h=><th key={h} className="text-left pb-2 text-[10px] uppercase tracking-wide" style={{ color:B.dimmed }}>{h}</th>)}</tr></thead>
          <tbody>
            {prompts.map(p => (
              <tr key={p.name} className="border-b hover:bg-white/5 transition-colors" style={{ borderColor:B.border }}>
                <td className="py-2.5 text-xs font-semibold" style={{ color:B.text }}>{p.name}</td>
                <td className="py-2.5"><Badge color={statusColor[p.status]}>{p.status}</Badge></td>
                <td className="py-2.5 text-xs" style={{ color:B.muted }}>{p.uses}</td>
                <td className="py-2.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background:B.s2 }}>
                      <div className="h-full rounded-full" style={{ width:`${p.score}%`, background:p.score>90?B.success:B.warning }}/>
                    </div>
                    <span className="text-[10px]" style={{ color:B.text }}>{p.score}</span>
                  </div>
                </td>
                <td className="py-2.5">
                  <div className="flex gap-2">
                    <button className="text-[11px]" style={{ color:B.primary }}>Edit</button>
                    {p.status==="Review" && <button className="text-[11px]" style={{ color:B.success }}>Approve</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}

// ─── SYSTEM STATUS ────────────────────────────────────────────────
export function SystemStatus() {
  const regions = [
    { name:"US East (N. Virginia)",   status:"operational", uptime:"99.99%" },
    { name:"US West (Oregon)",        status:"operational", uptime:"99.98%" },
    { name:"EU West (Ireland)",       status:"operational", uptime:"99.97%" },
    { name:"EU Central (Frankfurt)",  status:"operational", uptime:"99.99%" },
    { name:"Asia Pacific (Singapore)",status:"operational", uptime:"99.95%" },
    { name:"Asia Pacific (Tokyo)",    status:"operational", uptime:"99.96%" },
  ];
  const incidents = [
    { title:"Voice service elevated latency", status:"Investigating", impact:"Minor", date:"Jul 1, 2026 · Ongoing" },
    { title:"API gateway intermittent 503s",  status:"Resolved",      impact:"Minor", date:"Jun 28, 2026 · 14 min" },
    { title:"Scheduled: DB maintenance",      status:"Completed",     impact:"None",  date:"Jun 25, 2026 · 8 min" },
  ];
  const statusColor: Record<string,string> = { operational:B.success, degraded:B.warning, outage:"#EF4444" };
  const incColor: Record<string,string> = { Investigating:B.warning, Resolved:B.success, Completed:B.slate };
  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>System Status</h1><p className="text-xs" style={{ color:B.dimmed }}>status.omnideskai.com · Updated every 60 seconds</p></div>
        <button className="flex items-center gap-1.5 h-7 px-3 rounded-xl border text-[11px]" style={{ borderColor:B.border, color:B.muted }}><Bell size={10}/>Subscribe to updates</button>
      </div>

      {/* Global status banner */}
      <div className="rounded-2xl p-5 mb-5 flex items-center gap-4" style={{ background:`${B.success}10`, border:`1px solid ${B.success}25` }}>
        <CheckCircle2 size={28} style={{ color:B.success }}/>
        <div>
          <p className="text-base font-bold" style={{ color:B.success }}>All systems operational</p>
          <p className="text-sm" style={{ color:B.muted }}>1 active degradation · Voice service · Being investigated</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-2xl font-extrabold" style={{ fontFamily:"'Poppins',sans-serif", ...gradText(G.brand) }}>99.97%</p>
          <p className="text-xs" style={{ color:B.dimmed }}>30-day uptime</p>
        </div>
      </div>

      {/* Regional status */}
      <GlassCard className="p-4 mb-4">
        <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>Regional Infrastructure</p>
        <div className="grid grid-cols-2 gap-2">
          {regions.map(r => (
            <div key={r.name} className="flex items-center justify-between p-2.5 rounded-xl border" style={{ borderColor:B.border }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background:statusColor[r.status] }}/>
                <span className="text-[11px]" style={{ color:B.muted }}>{r.name}</span>
              </div>
              <span className="text-[10px] font-semibold" style={{ color:B.text }}>{r.uptime}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Incidents */}
      <GlassCard className="p-4">
        <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>Incidents & Maintenance</p>
        <div className="space-y-3">
          {incidents.map(inc => (
            <div key={inc.title} className="flex items-start gap-3 p-3 rounded-xl border" style={{ borderColor:`${incColor[inc.status]}25` }}>
              <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background:incColor[inc.status] }}/>
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color:B.text }}>{inc.title}</p>
                <p className="text-[11px] mt-0.5" style={{ color:B.dimmed }}>{inc.date}</p>
              </div>
              <div className="text-right">
                <Badge color={incColor[inc.status]}>{inc.status}</Badge>
                <p className="text-[10px] mt-1" style={{ color:B.dimmed }}>Impact: {inc.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

// ─── WEBHOOK MANAGER ─────────────────────────────────────────────
export function WebhookManager() {
  const [tab, setTab] = useState("endpoints");
  const endpoints = [
    { url:"https://api.nexustech.com/omni/events", status:"Active",  events:24, success:"99.2%", last:"2m ago" },
    { url:"https://hooks.zapier.com/catch/12345/",  status:"Active",  events:8,  success:"100%",  last:"14m ago" },
    { url:"https://internal.app.com/webhooks",      status:"Failing", events:2,  success:"62.1%", last:"2h ago" },
  ];
  const logs = [
    { event:"conversation.replied", status:200, dur:"142ms", ts:"22:45:12" },
    { event:"contact.created",      status:200, dur:"88ms",  ts:"22:44:08" },
    { event:"automation.triggered", status:200, dur:"203ms", ts:"22:43:51" },
    { event:"conversation.resolved",status:500, dur:"timeout",ts:"22:40:22" },
    { event:"sla.breach",           status:200, dur:"76ms",  ts:"22:38:15" },
  ];
  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Webhook Manager</h1><p className="text-xs" style={{ color:B.dimmed }}>Real-time event delivery · HTTPS only · HMAC signing</p></div>
        <PrimaryBtn small><Plus size={11}/>Add Endpoint</PrimaryBtn>
      </div>
      <div className="flex gap-2 mb-5">
        {["endpoints","logs","events"].map(t=><button key={t} onClick={()=>setTab(t)} className="px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-colors" style={{ background:tab===t?B.primary:`${B.primary}10`, color:tab===t?"#fff":B.dimmed }}>{t}</button>)}
      </div>
      {tab==="endpoints" && (
        <div className="space-y-3">
          {endpoints.map(ep=>(
            <GlassCard key={ep.url} className="p-5" style={{ borderColor:ep.status==="Failing"?`${B.pink}30`:B.border }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <code className="text-sm font-mono" style={{ color:B.primary }}>{ep.url}</code>
                  <div className="flex items-center gap-3 mt-1">
                    <Badge color={ep.status==="Active"?B.success:"#EF4444"}>{ep.status}</Badge>
                    <span className="text-[11px]" style={{ color:B.dimmed }}>{ep.events} events/day</span>
                    <span className="text-[11px] font-semibold" style={{ color:ep.success==="100%"?B.success:parseFloat(ep.success)>90?B.warning:"#EF4444" }}>{ep.success} success</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {ep.status==="Failing" && <button className="h-7 px-3 rounded-lg text-[11px] font-semibold" style={{ background:`${B.warning}15`, color:B.warning }}>Retry</button>}
                  <button className="h-7 px-3 rounded-lg text-[11px] border" style={{ borderColor:B.border, color:B.muted }}>Configure</button>
                </div>
              </div>
              <div className="flex gap-4 text-[11px]" style={{ color:B.dimmed }}>
                <span>Last delivery: {ep.last}</span>
                <span>All events subscribed</span>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
      {tab==="logs" && (
        <GlassCard className="overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b" style={{ borderColor:B.border }}>{["Event","Status","Duration","Timestamp",""].map(h=><th key={h} className="text-left px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color:B.dimmed }}>{h}</th>)}</tr></thead>
            <tbody>
              {logs.map((l,i)=>(
                <tr key={i} className="border-b hover:bg-white/5" style={{ borderColor:B.border }}>
                  <td className="px-5 py-3 text-xs font-mono" style={{ color:B.text }}>{l.event}</td>
                  <td className="px-5 py-3"><Badge color={l.status===200?B.success:"#EF4444"}>{l.status}</Badge></td>
                  <td className="px-5 py-3 text-xs font-mono" style={{ color:B.muted }}>{l.dur}</td>
                  <td className="px-5 py-3 text-xs" style={{ color:B.dimmed }}>{l.ts}</td>
                  <td className="px-5 py-3"><button className="text-[11px]" style={{ color:B.primary }}>Replay</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      )}
      {tab==="events" && (
        <div className="grid grid-cols-3 gap-3">
          {["conversation.created","conversation.replied","conversation.resolved","contact.created","contact.updated","automation.triggered","sla.warning","sla.breach","billing.invoice.paid","ai.reply.generated"].map(ev=>(
            <GlassCard key={ev} className="p-3 flex items-center justify-between">
              <code className="text-[11px]" style={{ color:B.muted, fontFamily:"'JetBrains Mono',monospace" }}>{ev}</code>
              <div className="w-7 h-4 rounded-full flex items-center px-0.5 flex-shrink-0 ml-2" style={{ background:B.primary }}>
                <div className="w-3 h-3 rounded-full bg-white shadow ml-auto"/>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── INTEGRATION CENTER ──────────────────────────────────────────
export function IntegrationCenter() {
  const [connected, setConnected] = useState(["salesforce","hubspot","stripe","slack"]);
  const integrations = [
    { id:"salesforce",  name:"Salesforce",        cat:"CRM",          color:"#00A1E0", icon:"SF", desc:"Sync contacts, deals & opportunities bidirectionally." },
    { id:"hubspot",     name:"HubSpot",            cat:"CRM",          color:"#FF7A59", icon:"HS", desc:"Full marketing, sales, and support data sync." },
    { id:"shopify",     name:"Shopify",            cat:"E-commerce",   color:"#96BF48", icon:"SH", desc:"Order management, refunds, and customer data." },
    { id:"stripe",      name:"Stripe",             cat:"Payments",     color:"#6772E5", icon:"ST", desc:"Payment status, invoices, and subscription events." },
    { id:"slack",       name:"Slack",              cat:"Messaging",    color:"#4A154B", icon:"SL", desc:"Get SLA alerts and conversation summaries in Slack." },
    { id:"zoom",        name:"Zoom",               cat:"Video",        color:"#2D8CFF", icon:"ZM", desc:"Launch Zoom calls directly from conversations." },
    { id:"jira",        name:"Jira",               cat:"Project",      color:"#0052CC", icon:"JR", desc:"Create and link Jira issues from support tickets." },
    { id:"github",      name:"GitHub",             cat:"Developer",    color:"#24292E", icon:"GH", desc:"Link conversations to PRs, issues, releases." },
    { id:"notion",      name:"Notion",             cat:"Productivity", color:"#000",    icon:"NO", desc:"Sync knowledge base articles with Notion pages." },
    { id:"zapier",      name:"Zapier",             cat:"Automation",   color:"#FF4A00", icon:"ZP", desc:"Connect 6,000+ apps via no-code Zaps." },
    { id:"gsuite",      name:"Google Workspace",   cat:"Productivity", color:"#4285F4", icon:"GW", desc:"Gmail, Calendar, Drive, and Meet integration." },
    { id:"ms365",       name:"Microsoft 365",      cat:"Productivity", color:"#0078D4", icon:"MS", desc:"Outlook, Teams, OneDrive, and SharePoint." },
  ];
  const toggle = (id: string) => setConnected(p => p.includes(id) ? p.filter(x=>x!==id) : [...p,id]);
  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Integration Center</h1><p className="text-xs" style={{ color:B.dimmed }}>{connected.length} of {integrations.length} connected · Zapier-style two-way sync</p></div>
        <button className="flex items-center gap-1.5 h-7 px-3 rounded-xl border text-[11px]" style={{ borderColor:B.border, color:B.muted }}><Search size={10}/>Browse all</button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {integrations.map(i=>{
          const isOn = connected.includes(i.id);
          return (
            <GlassCard key={i.id} className="p-4" style={{ borderColor:isOn?`${i.color}30`:B.border }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background:i.color }}>{i.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate" style={{ color:B.text }}>{i.name}</p>
                  <p className="text-[10px]" style={{ color:B.dimmed }}>{i.cat}</p>
                </div>
                <div className="w-9 h-5 rounded-full flex items-center px-0.5 cursor-pointer flex-shrink-0 transition-colors" style={{ background:isOn?i.color:B.s2 }} onClick={()=>toggle(i.id)}>
                  <div className="w-4 h-4 rounded-full bg-white shadow transition-transform" style={{ transform:isOn?"translateX(16px)":"translateX(0)" }}/>
                </div>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color:B.dimmed }}>{i.desc}</p>
              {isOn && <p className="text-[10px] mt-2 font-semibold" style={{ color:i.color }}>✓ Connected · Last sync 5m ago</p>}
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

// ─── FEATURE FLAGS ───────────────────────────────────────────────
export function FeatureFlags() {
  const [flags, setFlags] = useState<Record<string,boolean>>({ "ai-auto-reply":true, "voice-ai":true, "social-listening":true, "kanban-view":false, "ai-agent-studio":false, "graphql-api":false });
  const flagDefs = [
    { id:"ai-auto-reply",     name:"AI Auto-Reply",       env:"Production", rollout:100, desc:"Enable AI to send replies autonomously when confidence ≥ threshold." },
    { id:"voice-ai",          name:"Voice AI",            env:"Production", rollout:100, desc:"AI-powered call transcription, sentiment analysis, and routing." },
    { id:"social-listening",  name:"Social Listening",    env:"Production", rollout:80,  desc:"Real-time brand mention monitoring across 11 platforms." },
    { id:"kanban-view",       name:"Kanban CRM View",     env:"Beta",       rollout:25,  desc:"Alternative Kanban layout for the CRM contacts and deals." },
    { id:"ai-agent-studio",   name:"AI Agent Studio",     env:"Alpha",      rollout:5,   desc:"No-code builder for custom AI support agents. Coming Q3 2026." },
    { id:"graphql-api",       name:"GraphQL API",         env:"Beta",       rollout:10,  desc:"GraphQL endpoint alongside the existing REST API." },
  ];
  const envColor: Record<string,string> = { Production:B.success, Beta:B.warning, Alpha:B.pink };
  const toggle = (id: string) => setFlags(p=>({...p,[id]:!p[id]}));
  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Feature Flags</h1><p className="text-xs" style={{ color:B.dimmed }}>Beta features, A/B tests, and staged rollouts</p></div>
        <PrimaryBtn small><Plus size={11}/>New Flag</PrimaryBtn>
      </div>
      <div className="space-y-3">
        {flagDefs.map(f=>{
          const isOn = flags[f.id];
          return (
            <GlassCard key={f.id} className="p-5 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold" style={{ color:B.text }}>{f.name}</p>
                  <Badge color={envColor[f.env]}>{f.env}</Badge>
                </div>
                <p className="text-[11px] mb-2" style={{ color:B.dimmed }}>{f.desc}</p>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-1.5 rounded-full overflow-hidden" style={{ background:B.s2 }}>
                    <div className="h-full rounded-full" style={{ width:`${f.rollout}%`, background:isOn?B.primary:B.dimmed }}/>
                  </div>
                  <span className="text-[10px]" style={{ color:B.dimmed }}>{f.rollout}% rollout</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-semibold" style={{ color:isOn?B.success:B.dimmed }}>{isOn?"Enabled":"Disabled"}</span>
                <div className="w-11 h-6 rounded-full flex items-center px-0.5 cursor-pointer transition-colors" style={{ background:isOn?B.primary:B.s2 }} onClick={()=>toggle(f.id)}>
                  <div className="w-5 h-5 rounded-full bg-white shadow transition-transform" style={{ transform:isOn?"translateX(20px)":"translateX(0)" }}/>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

// ─── WHITE LABEL ─────────────────────────────────────────────────
export function WhiteLabel() {
  const [color, setColor] = useState("#4F46E5");
  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>White Label</h1><p className="text-xs" style={{ color:B.dimmed }}>Custom branding for your workspace and customer-facing surfaces</p></div>
        <PrimaryBtn small>Save Changes</PrimaryBtn>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <GlassCard className="p-5">
            <p className="text-sm font-semibold mb-4" style={{ color:B.text }}>Brand Identity</p>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0" style={{ background:G.hero }}>NT</div>
              <div><p className="text-sm font-semibold mb-1" style={{ color:B.text }}>Nexus Technologies</p><button className="text-xs font-medium" style={{ color:B.primary }}>Upload logo</button></div>
            </div>
            {[{l:"Company name",v:"Nexus Technologies"},{l:"Tagline",v:"Enterprise communication platform"},{l:"Support URL",v:"support.nexustech.com"}].map(f=>(
              <div key={f.l} className="mb-3">
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color:B.dimmed }}>{f.l}</label>
                <div className="h-9 px-3 rounded-xl border flex items-center text-xs" style={{ background:B.s2, borderColor:B.border, color:B.text }}>{f.v}</div>
              </div>
            ))}
          </GlassCard>
          <GlassCard className="p-5">
            <p className="text-sm font-semibold mb-4" style={{ color:B.text }}>Brand Colors</p>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex-shrink-0" style={{ background:color }}/>
              <div>
                <p className="text-xs font-semibold mb-1" style={{ color:B.text }}>Primary Color</p>
                <input type="color" value={color} onChange={e=>setColor(e.target.value)} className="w-24 h-6 cursor-pointer rounded"/>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {["#4F46E5","#06B6D4","#10B981","#EC4899","#F59E0B","#0EA5E9"].map(c=>(
                <button key={c} onClick={()=>setColor(c)} className="w-8 h-8 rounded-lg border-2 transition-all" style={{ background:c, borderColor:color===c?"#fff":"transparent" }}/>
              ))}
            </div>
          </GlassCard>
        </div>
        <div className="space-y-4">
          <GlassCard className="p-5">
            <p className="text-sm font-semibold mb-4" style={{ color:B.text }}>Custom Domain</p>
            <div className="mb-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color:B.dimmed }}>Workspace URL</label>
              <div className="h-9 px-3 rounded-xl border flex items-center text-xs" style={{ background:B.s2, borderColor:B.primary }}>
                <span style={{ color:B.dimmed }}>support.</span><span style={{ color:B.text }}>nexustech.com</span>
              </div>
              <p className="text-[10px] mt-1 font-semibold" style={{ color:B.success }}>✓ Domain verified · SSL active</p>
            </div>
            {[{l:"Login Page URL",v:"login.nexustech.com"},{l:"Help Center URL",v:"help.nexustech.com"}].map(f=>(
              <div key={f.l} className="mb-3">
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color:B.dimmed }}>{f.l}</label>
                <div className="h-9 px-3 rounded-xl border flex items-center text-xs" style={{ background:B.s2, borderColor:B.border, color:B.text }}>{f.v}</div>
              </div>
            ))}
          </GlassCard>
          <GlassCard className="p-5">
            <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>White Label Features</p>
            {[{l:"Remove OmniDesk branding",v:true},{l:"Custom email sender name",v:true},{l:"Custom chat widget logo",v:true},{l:"Custom login page",v:false}].map(f=>(
              <div key={f.l} className="flex items-center justify-between py-2.5 border-b" style={{ borderColor:B.border }}>
                <span className="text-sm" style={{ color:B.muted }}>{f.l}</span>
                <div className="w-8 h-4 rounded-full flex items-center px-0.5" style={{ background:f.v?B.primary:B.s2 }}>
                  <div className="w-3 h-3 rounded-full bg-white shadow" style={{ marginLeft:f.v?"auto":0 }}/>
                </div>
              </div>
            ))}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

// ─── COMPLIANCE CENTER ────────────────────────────────────────────
export function ComplianceCenter() {
  const certs = [
    { name:"SOC 2 Type II",  status:"Certified", date:"Valid until Dec 2026", color:B.success, score:98 },
    { name:"GDPR",           status:"Compliant", date:"Ongoing compliance",   color:B.success, score:100 },
    { name:"ISO 27001",      status:"Certified", date:"Valid until Sep 2026", color:B.success, score:96 },
    { name:"HIPAA",          status:"Compliant", date:"BAA available",        color:B.success, score:94 },
    { name:"PCI DSS Level 1",status:"Certified", date:"Valid until Mar 2027", color:B.success, score:99 },
    { name:"NDPA",           status:"In Review", date:"Assessment Q3 2026",   color:B.warning, score:78 },
  ];
  const controls = [
    { cat:"Data Encryption",   items:[{n:"Data at rest (AES-256)",pass:true},{n:"Data in transit (TLS 1.3)",pass:true},{n:"Database encryption",pass:true}] },
    { cat:"Access Control",    items:[{n:"MFA enforcement",pass:true},{n:"RBAC implementation",pass:true},{n:"Privileged access review",pass:true}] },
    { cat:"Privacy",           items:[{n:"Data retention policy",pass:true},{n:"Right to erasure workflow",pass:true},{n:"Consent management",pass:true}] },
    { cat:"Incident Response",  items:[{n:"Incident response plan",pass:true},{n:"24h breach notification",pass:true},{n:"DR tested < 6 months",pass:false}] },
  ];
  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Compliance Center</h1><p className="text-xs" style={{ color:B.dimmed }}>Certifications, controls, and audit reports</p></div>
        <PrimaryBtn small><Download size={11}/>Compliance Report</PrimaryBtn>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-5">
        {certs.map(c=>(
          <GlassCard key={c.name} className="p-4" style={{ borderColor:`${c.color}25` }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-bold" style={{ color:B.text }}>{c.name}</p>
                <p className="text-[11px] mt-0.5" style={{ color:B.dimmed }}>{c.date}</p>
              </div>
              <Badge color={c.color}>{c.status}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background:B.s2 }}>
                <div className="h-full rounded-full" style={{ width:`${c.score}%`, background:c.color }}/>
              </div>
              <span className="text-[11px] font-bold" style={{ color:c.color }}>{c.score}%</span>
            </div>
          </GlassCard>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {controls.map(group=>(
          <GlassCard key={group.cat} className="p-4">
            <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>{group.cat}</p>
            {group.items.map(item=>(
              <div key={item.n} className="flex items-center gap-2.5 py-2 border-b" style={{ borderColor:B.border }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background:item.pass?`${B.success}15`:`${B.warning}15` }}>
                  {item.pass ? <Check size={11} style={{ color:B.success }}/> : <AlertCircle size={10} style={{ color:B.warning }}/>}
                </div>
                <span className="text-[11px]" style={{ color:item.pass?B.muted:B.warning }}>{item.n}</span>
              </div>
            ))}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

// ─── ORG HIERARCHY ────────────────────────────────────────────────
export function OrgHierarchy() {
  const [expanded, setExpanded] = useState<string[]>(["root","ops","support"]);
  const toggle = (id: string) => setExpanded(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);

  const tree = [
    { id:"root",  name:"Nexus Technologies",  type:"Company",    head:"Sarah Chen", agents:156, convos:12400, color:B.purple, children:[
      { id:"ops", name:"Operations",           type:"Division",   head:"James O.",   agents:72,  convos:6800,  color:B.primary, children:[
        { id:"support", name:"Customer Support",   type:"Department", head:"Alex K.",   agents:48,  convos:4200,  color:B.cyan,    children:[
          { id:"lvl1", name:"Tier 1 Support",     type:"Team",       head:"Nina P.",   agents:24,  convos:2100, color:B.success, children:[] },
          { id:"lvl2", name:"Tier 2 / Escalation",type:"Team",       head:"David L.",  agents:12,  convos:1200, color:B.warning, children:[] },
          { id:"chat", name:"Live Chat Team",     type:"Team",       head:"Maya S.",   agents:12,  convos:900,  color:B.slate,   children:[] },
        ]},
        { id:"sales", name:"Sales Operations",    type:"Department", head:"Chris M.",  agents:24,  convos:2600, color:B.pink, children:[
          { id:"inbound",  name:"Inbound Sales",   type:"Team",       head:"Lisa T.",   agents:12,  convos:1400, color:B.success, children:[] },
          { id:"outbound", name:"Outbound Sales",  type:"Team",       head:"Tom B.",    agents:12,  convos:1200, color:B.cyan, children:[] },
        ]},
      ]},
      { id:"mktg", name:"Marketing",             type:"Division",   head:"Emma R.",    agents:24,  convos:2800, color:B.warning, children:[
        { id:"social", name:"Social Media",       type:"Department", head:"Priya S.",  agents:12,  convos:1800, color:B.pink, children:[] },
        { id:"email",  name:"Email Marketing",    type:"Department", head:"Dan W.",    agents:12,  convos:1000, color:B.slate, children:[] },
      ]},
    ]},
  ];

  type Node = { id:string; name:string; type:string; head:string; agents:number; convos:number; color:string; children:Node[] };
  const renderNode = (node: Node, depth=0): React.ReactNode => {
    const isExpanded = expanded.includes(node.id);
    const hasChildren = node.children.length > 0;
    return (
      <div key={node.id} style={{ marginLeft: depth*20 }}>
        <div className="flex items-center gap-3 py-2.5 px-3 rounded-xl mb-1 hover:bg-white/5 transition-colors cursor-pointer" style={{ borderLeft: depth>0?`2px solid ${node.color}30`:"none", paddingLeft: depth>0?12:12 }} onClick={()=>hasChildren&&toggle(node.id)}>
          {hasChildren ? (
            <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0" style={{ background:`${node.color}15` }}>
              <ChevronRight size={11} style={{ color:node.color, transform:isExpanded?"rotate(90deg)":"none", transition:"transform 0.15s" }}/>
            </div>
          ) : <div className="w-5 h-5 flex-shrink-0"/>}
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0" style={{ background:node.color }}>{node.name.slice(0,2).toUpperCase()}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold" style={{ color:B.text }}>{node.name}</span>
              <span className="text-[9px] px-1.5 py-px rounded font-semibold" style={{ background:`${node.color}15`, color:node.color }}>{node.type}</span>
            </div>
            <span className="text-[10px]" style={{ color:B.dimmed }}>Head: {node.head}</span>
          </div>
          <div className="flex gap-4 text-[11px]">
            <div className="text-right"><p className="font-semibold" style={{ color:B.text }}>{node.agents}</p><p style={{ color:B.dimmed }}>Agents</p></div>
            <div className="text-right"><p className="font-semibold" style={{ color:B.text }}>{node.convos.toLocaleString()}</p><p style={{ color:B.dimmed }}>Convos/mo</p></div>
          </div>
        </div>
        {isExpanded && node.children.map(child => renderNode(child, depth+1))}
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Organization Hierarchy</h1><p className="text-xs" style={{ color:B.dimmed }}>Business units · Departments · Teams · Role assignments</p></div>
        <div className="flex gap-2">
          <button onClick={()=>setExpanded(["root","ops","support","sales","mktg"])} className="flex items-center gap-1.5 h-7 px-3 rounded-xl border text-[11px]" style={{ borderColor:B.border, color:B.muted }}>Expand All</button>
          <PrimaryBtn small><Plus size={11}/>Add Department</PrimaryBtn>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[{l:"Total Departments",v:"6"},{l:"Total Teams",v:"8"},{l:"Total Agents",v:"156"},{l:"Avg Team Size",v:"19"}].map(s=>(
          <GlassCard key={s.l} className="p-4 text-center">
            <p className="text-[10px] uppercase tracking-wide mb-1" style={{ color:B.dimmed }}>{s.l}</p>
            <p className="text-2xl font-extrabold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>{s.v}</p>
          </GlassCard>
        ))}
      </div>
      <GlassCard className="p-4">
        {tree.map(node => renderNode(node))}
      </GlassCard>
    </div>
  );
}

// ─── SLA MANAGEMENT ───────────────────────────────────────────────
export function SLAManagement() {
  const slaConfigs = [
    { plan:"Enterprise", first:"1 hour",  resolution:"4 hours",  breach:2,  compliance:"98.2%", color:B.purple },
    { plan:"Business",   first:"4 hours", resolution:"12 hours", breach:8,  compliance:"94.7%", color:B.primary },
    { plan:"Pro",        first:"8 hours", resolution:"24 hours", breach:24, compliance:"89.3%", color:B.success },
    { plan:"Starter",    first:"24 hours",resolution:"72 hours", breach:47, compliance:"81.1%", color:B.slate },
  ];
  const breaches = [
    { org:"RetailChain Ltd", plan:"Business",   agent:"Unassigned", channel:"WhatsApp", sla:"First Response", elapsed:"5h 12m", breach:"4h target", severity:"high" },
    { org:"AcmeCorp",        plan:"Starter",    agent:"Nina P.",    channel:"Email",    sla:"Resolution",     elapsed:"28h",    breach:"24h target", severity:"medium" },
    { org:"FinTech Plus",    plan:"Business",   agent:"David L.",   channel:"Live Chat",sla:"First Response", elapsed:"4h 45m", breach:"4h target", severity:"low" },
  ];
  const sevColor: Record<string,string> = { high:"#EF4444", medium:B.warning, low:B.cyan };
  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>SLA Management</h1><p className="text-xs" style={{ color:B.dimmed }}>Response time targets · Breach monitoring · Compliance tracking</p></div>
        <PrimaryBtn small><Settings size={11}/>Configure SLAs</PrimaryBtn>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-5">
        {[{l:"SLA Breaches Today",v:"3",c:"#EF4444"},{l:"Compliance Rate",v:"94.2%",c:B.success},{l:"Avg First Response",v:"2.8m",c:B.primary},{l:"At-Risk Now",v:"8",c:B.warning}].map(s=>(
          <GlassCard key={s.l} className="p-4 text-center">
            <p className="text-[10px] uppercase tracking-wide mb-1" style={{ color:B.dimmed }}>{s.l}</p>
            <p className="text-2xl font-extrabold" style={{ fontFamily:"'Poppins',sans-serif", color:s.c }}>{s.v}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <GlassCard className="p-4">
          <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>SLA Targets by Plan</p>
          <table className="w-full">
            <thead><tr className="border-b" style={{ borderColor:B.border }}>{["Plan","First Response","Resolution","Active Breaches","Compliance"].map(h=><th key={h} className="text-left pb-2 text-[10px] uppercase tracking-wide" style={{ color:B.dimmed }}>{h}</th>)}</tr></thead>
            <tbody>
              {slaConfigs.map(s=>(
                <tr key={s.plan} className="border-b" style={{ borderColor:B.border }}>
                  <td className="py-2.5"><Badge color={s.color}>{s.plan}</Badge></td>
                  <td className="py-2.5 text-xs" style={{ color:B.muted }}>{s.first}</td>
                  <td className="py-2.5 text-xs" style={{ color:B.muted }}>{s.resolution}</td>
                  <td className="py-2.5"><span className="text-xs font-bold" style={{ color:s.breach>20?"#EF4444":s.breach>5?B.warning:B.success }}>{s.breach}</span></td>
                  <td className="py-2.5 text-xs font-semibold" style={{ color:parseFloat(s.compliance)>95?B.success:parseFloat(s.compliance)>85?B.warning:"#EF4444" }}>{s.compliance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>Active Breaches</p>
          <div className="space-y-2.5">
            {breaches.map((b,i)=>(
              <div key={i} className="p-3 rounded-xl border" style={{ borderColor:`${sevColor[b.severity]}30`, background:`${sevColor[b.severity]}06` }}>
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="text-xs font-bold" style={{ color:B.text }}>{b.org}</p>
                    <p className="text-[10px]" style={{ color:B.dimmed }}>{b.channel} · {b.agent} · {b.plan}</p>
                  </div>
                  <Badge color={sevColor[b.severity]}>{b.severity}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px]" style={{ color:B.dimmed }}>SLA: {b.sla}</span>
                  <span className="text-[10px] font-bold" style={{ color:sevColor[b.severity] }}>Elapsed: {b.elapsed} (target: {b.breach})</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
