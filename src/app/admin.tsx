import React, { useState } from "react";
import {
  LayoutDashboard, Users, TrendingUp, Activity, Shield, Zap,
  BarChart3, Settings, Bell, AlertCircle, CheckCircle2, Globe,
  Server, Database, Cpu, Package, FileText, Search, Filter,
  ArrowUpRight, ArrowDownRight, RefreshCw, Download, Plus,
  ChevronRight, Clock, Star, MessageSquare, Layers, Flag,
  GitBranch, Terminal, Hash, Phone, Mail, ExternalLink,
  Sparkles, Brain, Check, X, Target, Building2, UserPlus
} from "lucide-react";
import { B, G, gradText, GlassCard, Badge, Avatar, PrimaryBtn, OutlineBtn, SparkLine } from "./shared";

// ─── ADMIN BRAND ─────────────────────────────────────────────────
// Admin platform uses amber as its accent to distinguish from customer (indigo)
const AB = "#F97316"; // Admin accent
const adminGrad = `linear-gradient(135deg,#EA580C,#F97316)`;

// ─── DATA ────────────────────────────────────────────────────────
const MRR_DATA  = [380,398,414,432,451,468,484].map(v=>v*1000);
const ORG_DATA  = [1800,1920,2050,2180,2280,2350,2400];
const TICKET_DATA = [42,38,51,45,39,44,47];

const RECENT_ORGS = [
  { name:"Acme Corp",        plan:"Enterprise", arr:"$28,800", status:"Trial",    health:72, date:"2h ago" },
  { name:"FinTech Plus",     plan:"Business",   arr:"$5,988",  status:"Active",   health:94, date:"5h ago" },
  { name:"MedAssist Global", plan:"Enterprise", arr:"$28,800", status:"Active",   health:88, date:"1d ago" },
  { name:"EduTech Academy",  plan:"Pro",        arr:"$2,388",  status:"Active",   health:91, date:"1d ago" },
  { name:"RetailChain Ltd",  plan:"Business",   arr:"$5,988",  status:"Churned",  health:12, date:"2d ago" },
];

const ALL_ORGS = [
  { id:"o1",name:"Nexus Technologies",  plan:"Enterprise",users:156,arr:"$28,800",status:"Active",   health:94,country:"US",created:"Jan 2025" },
  { id:"o2",name:"Global Ventures",    plan:"Business",  users:87, arr:"$5,988", status:"Active",   health:98,country:"UK",created:"Feb 2025" },
  { id:"o3",name:"ScaleUp Commerce",   plan:"Enterprise",users:212,arr:"$28,800",status:"Active",   health:87,country:"US",created:"Mar 2025" },
  { id:"o4",name:"Meridian Health",    plan:"Enterprise",users:341,arr:"$28,800",status:"Active",   health:96,country:"US",created:"Apr 2025" },
  { id:"o5",name:"BuildFast Dev",      plan:"Pro",       users:43, arr:"$2,388", status:"Active",   health:91,country:"CA",created:"Apr 2025" },
  { id:"o6",name:"FinTech Plus",       plan:"Business",  users:68, arr:"$5,988", status:"Trial",    health:72,country:"SG",created:"Jun 2025" },
  { id:"o7",name:"RetailChain Ltd",    plan:"Business",  users:92, arr:"$5,988", status:"Churned",  health:12,country:"AU",created:"May 2025" },
  { id:"o8",name:"MedAssist Global",   plan:"Enterprise",users:280,arr:"$28,800",status:"Active",   health:88,country:"DE",created:"Jun 2025" },
  { id:"o9",name:"AcmeCorp",           plan:"Starter",   users:8,  arr:"$348",   status:"Trial",    health:65,country:"IN",created:"Jul 2025" },
  { id:"o10",name:"EduTech Academy",   plan:"Pro",       users:55, arr:"$2,388", status:"Active",   health:91,country:"BR",created:"Jul 2025" },
];

const SUPPORT_TICKETS = [
  { id:"TKT-4821",org:"RetailChain Ltd",  issue:"Cannot connect WhatsApp Business API",priority:"urgent",  status:"Open",  age:"2h" },
  { id:"TKT-4820",org:"FinTech Plus",     issue:"Billing charge discrepancy on Jun invoice",priority:"high",  status:"Open",  age:"4h" },
  { id:"TKT-4819",org:"MedAssist Global", issue:"HIPAA audit log export not working",priority:"high",   status:"Open",  age:"6h" },
  { id:"TKT-4818",org:"AcmeCorp",         issue:"Can't add team members past limit",priority:"normal", status:"Open",  age:"8h" },
  { id:"TKT-4817",org:"EduTech Academy",  issue:"Automation triggers not firing for Gmail channel",priority:"normal",status:"Pending",age:"12h"},
  { id:"TKT-4816",org:"Nexus Technologies",issue:"Feature request: custom CSAT survey questions",priority:"low",    status:"Open",  age:"1d" },
];

// ─── SHARED HELPERS ───────────────────────────────────────────────
const pColor: Record<string,string> = { urgent:"#EF4444", high:B.warning, normal:B.primary, low:B.slate };
const sColor: Record<string,string> = { Active:B.success, Trial:B.warning, Churned:"#EF4444", Pending:B.cyan };

function AdminCard({ children, className="" }: { children: React.ReactNode; className?: string }) {
  return <GlassCard className={className}>{children}</GlassCard>;
}

function Stat({ label, value, delta, up, color, data }: { label:string; value:string; delta?:string; up?:boolean; color:string; data?:number[] }) {
  return (
    <AdminCard className="p-4">
      <div className="flex items-start justify-between mb-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color:B.dimmed }}>{label}</p>
        {data && <SparkLine data={data} color={color} w={50} h={20}/>}
      </div>
      <p className="text-2xl font-extrabold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>{value}</p>
      {delta && (
        <div className="flex items-center gap-1 mt-1">
          {up ? <ArrowUpRight size={10} style={{ color:B.success }}/> : <ArrowDownRight size={10} style={{ color:"#EF4444" }}/>}
          <span className="text-[10px] font-semibold" style={{ color:up?B.success:"#EF4444" }}>{delta}</span>
        </div>
      )}
    </AdminCard>
  );
}

// ─── 1. ADMIN DASHBOARD ──────────────────────────────────────────
export function AdminDashboard({ setScreen }: { setScreen?: (s:string)=>void }) {
  const incidents = [
    { sev:"info",    msg:"Voice AI P90 latency elevated (310ms vs 200ms target) · investigating", time:"22m" },
    { sev:"warning", msg:"Payment gateway timeout rate 0.8% (threshold: 0.5%) · Stripe incident", time:"1h" },
    { sev:"info",    msg:"Scheduled maintenance: DB cluster upgrade Sun Jul 6 02:00 UTC",           time:"2h" },
  ];
  const incColor: Record<string,string> = { info:B.cyan, warning:B.warning, critical:"#EF4444" };

  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest text-white" style={{ background:adminGrad }}>INTERNAL</span>
          </div>
          <h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Executive Dashboard</h1>
          <p className="text-xs" style={{ color:B.dimmed }}>OmniDesk AI Operations · July 2026 · Real-time</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 h-7 px-3 rounded-xl border text-[11px]" style={{ borderColor:B.border, color:B.muted }}><RefreshCw size={10}/>Refresh</button>
          <PrimaryBtn small><Download size={11}/>Board Report</PrimaryBtn>
        </div>
      </div>

      {/* Business KPIs */}
      <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color:B.dimmed }}>Business Metrics</p>
      <div className="grid grid-cols-6 gap-3 mb-5">
        <Stat label="MRR"         value="$484K" delta="+$12K MoM"  up   color={AB}       data={MRR_DATA}/>
        <Stat label="ARR"         value="$5.8M" delta="+28% YoY"   up   color={B.success} data={MRR_DATA.map(v=>v*12)}/>
        <Stat label="Active Orgs" value="2,400" delta="+48 this wk" up  color={B.primary} data={ORG_DATA}/>
        <Stat label="Churn Rate"  value="2.1%"  delta="-0.3% MoM"  up   color={B.success} data={[2.8,2.6,2.4,2.3,2.2,2.1,2.1]}/>
        <Stat label="NPS Score"   value="67"    delta="+4 MoM"      up   color={B.cyan}    data={[58,60,61,63,64,66,67]}/>
        <Stat label="Avg ARR/Org" value="$2,417"delta="+$142 MoM"  up   color={B.purple}  data={[2100,2200,2250,2300,2350,2400,2417].map(v=>v*1)}/>
      </div>

      {/* Platform KPIs */}
      <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color:B.dimmed }}>Platform Health</p>
      <div className="grid grid-cols-6 gap-3 mb-5">
        <Stat label="API Calls/Day" value="2.8M"   delta="+18%"  up   color={B.primary} data={[1.8,2.0,2.2,2.4,2.5,2.7,2.8].map(v=>v*1e6)}/>
        <Stat label="AI Tokens/Day" value="48M"    delta="+22%"  up   color={B.purple}  data={[30,34,38,42,44,46,48].map(v=>v*1e6)}/>
        <Stat label="Uptime (30d)"  value="99.97%" delta="0 incidents" up color={B.success} data={[99.9,99.95,100,99.98,99.97,99.99,99.97]}/>
        <Stat label="Avg Latency"   value="24ms"   delta="-3ms"  up   color={B.cyan}    data={[32,29,27,26,25,24,24]}/>
        <Stat label="Open Tickets"  value="47"     delta="+8 today"    color={B.warning} data={TICKET_DATA}/>
        <Stat label="Error Rate"    value="0.003%" delta="-0.001%" up  color={B.success} data={[0.008,0.006,0.005,0.004,0.003,0.003,0.003]}/>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {/* Recent org signups */}
        <AdminCard className="col-span-2 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold" style={{ color:B.text }}>Recent Organizations</p>
            <button onClick={()=>setScreen?.("adm-orgs")} className="text-[11px]" style={{ color:B.primary }}>View all →</button>
          </div>
          <table className="w-full">
            <thead><tr className="border-b" style={{ borderColor:B.border }}>{["Org","Plan","ARR","Status","Health"].map(h=><th key={h} className="text-left pb-2 text-[10px] uppercase tracking-wide" style={{ color:B.dimmed }}>{h}</th>)}</tr></thead>
            <tbody>
              {RECENT_ORGS.map(o=>(
                <tr key={o.name} className="border-b hover:bg-white/5 transition-colors" style={{ borderColor:B.border }}>
                  <td className="py-2.5 text-xs font-semibold" style={{ color:B.text }}>{o.name}</td>
                  <td className="py-2.5"><Badge color={o.plan==="Enterprise"?B.purple:o.plan==="Business"?B.primary:B.success}>{o.plan}</Badge></td>
                  <td className="py-2.5 text-xs" style={{ color:B.success }}>{o.arr}</td>
                  <td className="py-2.5"><span className="text-[11px] font-semibold" style={{ color:sColor[o.status]||B.slate }}>● {o.status}</span></td>
                  <td className="py-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background:B.s2 }}>
                        <div className="h-full rounded-full" style={{ width:`${o.health}%`, background:o.health>80?B.success:o.health>50?B.warning:"#EF4444" }}/>
                      </div>
                      <span className="text-[10px]" style={{ color:B.dimmed }}>{o.health}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminCard>

        {/* Incident feed */}
        <AdminCard className="p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold" style={{ color:B.text }}>Incidents & Alerts</p>
            <span className="text-[10px] flex items-center gap-1" style={{ color:B.success }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:B.success }}/>All systems operational
            </span>
          </div>
          <div className="space-y-2.5">
            {incidents.map((inc,i)=>(
              <div key={i} className="p-3 rounded-xl border" style={{ borderColor:`${incColor[inc.sev]}25`, background:`${incColor[inc.sev]}08` }}>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[11px] leading-relaxed" style={{ color:B.muted }}>{inc.msg}</p>
                  <span className="text-[9px] flex-shrink-0" style={{ color:B.dimmed }}>{inc.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t" style={{ borderColor:B.border }}>
            <p className="text-[10px] font-semibold mb-2" style={{ color:B.dimmed }}>Quick Actions</p>
            <div className="space-y-1.5">
              {[{l:"View all incidents",ic:AlertCircle},{l:"Create incident",ic:Plus},{l:"System status page",ic:ExternalLink}].map(a=>(
                <button key={a.l} className="w-full flex items-center gap-2 text-[11px] transition-colors hover:text-white" style={{ color:B.dimmed }}>
                  <a.ic size={11}/>{a.l}
                </button>
              ))}
            </div>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}

// ─── 2. ORGANIZATIONS SCREEN ─────────────────────────────────────
export function AdminOrganizations({ setScreen }: { setScreen?: (s:string)=>void }) {
  const [sel, setSel] = useState<string|null>(null);
  const [filter, setFilter] = useState("All");
  const filters = ["All","Active","Trial","Enterprise","Churned"];
  const filtered = filter==="All" ? ALL_ORGS : ALL_ORGS.filter(o=>o.status===filter||o.plan===filter);
  const org = ALL_ORGS.find(o=>o.id===sel);

  return (
    <div className="flex h-full">
      <div className="flex flex-col flex-1 min-w-0">
        <div className="p-4 border-b flex-shrink-0" style={{ borderColor:B.border }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold" style={{ color:B.text }}>All Organizations <span className="font-normal text-xs" style={{ color:B.dimmed }}>({ALL_ORGS.length})</span></h2>
            <div className="flex gap-2">
              <div className="flex rounded-lg overflow-hidden border" style={{ borderColor:B.border }}>
                {filters.map(f=><button key={f} onClick={()=>setFilter(f)} className="h-7 px-2.5 text-[11px] font-medium transition-colors" style={{ background:filter===f?AB:"transparent", color:filter===f?"#fff":B.dimmed }}>{f}</button>)}
              </div>
              <button className="flex items-center gap-1.5 h-7 px-3 rounded-xl border text-[11px]" style={{ borderColor:B.border, color:B.muted }}><Download size={10}/>Export</button>
            </div>
          </div>
          <div className="flex items-center gap-2 h-8 px-3 rounded-lg" style={{ background:B.s2, border:`1px solid ${B.border}` }}>
            <Search size={12} style={{ color:B.dimmed }}/><input className="flex-1 text-xs bg-transparent outline-none" placeholder="Search organizations…" style={{ color:B.text }}/>
          </div>
        </div>
        <div className="flex-1 overflow-auto" style={{ scrollbarWidth:"none" }}>
          <table className="w-full">
            <thead className="sticky top-0" style={{ background:"rgba(11,16,33,0.95)", backdropFilter:"blur(8px)" }}>
              <tr className="border-b" style={{ borderColor:B.border }}>
                {["Organization","Plan","Users","ARR","Status","Health Score","Country","Actions"].map(h=><th key={h} className="text-left px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color:B.dimmed }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {filtered.map(o=>(
                <tr key={o.id} onClick={()=>setSel(o.id===sel?null:o.id)} className="border-b cursor-pointer hover:bg-white/5 transition-colors" style={{ borderColor:B.border, background:sel===o.id?`${AB}06`:"transparent" }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-bold text-white" style={{ background:adminGrad }}>{o.name.slice(0,2).toUpperCase()}</div>
                      <span className="text-xs font-semibold" style={{ color:B.text }}>{o.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><Badge color={o.plan==="Enterprise"?B.purple:o.plan==="Business"?B.primary:B.success}>{o.plan}</Badge></td>
                  <td className="px-4 py-3 text-xs" style={{ color:B.muted }}>{o.users}</td>
                  <td className="px-4 py-3 text-xs font-semibold" style={{ color:B.success }}>{o.arr}</td>
                  <td className="px-4 py-3"><span className="text-[11px] font-semibold" style={{ color:sColor[o.status] }}>● {o.status}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background:B.s2 }}>
                        <div className="h-full rounded-full" style={{ width:`${o.health}%`, background:o.health>80?B.success:o.health>50?B.warning:"#EF4444" }}/>
                      </div>
                      <span className="text-[10px]" style={{ color:B.dimmed }}>{o.health}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color:B.dimmed }}>{o.country}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button className="text-[10px] px-2 py-0.5 rounded border" style={{ borderColor:B.border, color:B.primary }}>View</button>
                      <button className="text-[10px] px-2 py-0.5 rounded border" style={{ borderColor:B.border, color:B.muted }}>Impersonate</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail panel */}
      {org && (
        <div className="w-72 flex-shrink-0 border-l overflow-y-auto" style={{ borderColor:B.border, background:"var(--od-sidebar)", scrollbarWidth:"none" }}>
          <div className="p-5 border-b" style={{ borderColor:B.border }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold text-white" style={{ background:adminGrad }}>{org.name.slice(0,2).toUpperCase()}</div>
              <div><p className="text-sm font-bold" style={{ color:B.text }}>{org.name}</p><p className="text-xs" style={{ color:B.dimmed }}>{org.country} · Created {org.created}</p></div>
            </div>
            <div className="flex gap-2">
              <Badge color={sColor[org.status]||B.slate}>{org.status}</Badge>
              <Badge color={org.plan==="Enterprise"?B.purple:B.primary}>{org.plan}</Badge>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {[{l:"ARR",v:org.arr,c:B.success},{l:"Users",v:String(org.users),c:B.text},{l:"Health",v:org.health+"%",c:org.health>80?B.success:B.warning},{l:"Country",v:org.country,c:B.text}].map(s=>(
                <div key={s.l} className="rounded-xl p-3" style={{ background:B.s2 }}>
                  <p className="text-[9px] uppercase tracking-wide mb-1" style={{ color:B.dimmed }}>{s.l}</p>
                  <p className="text-sm font-bold" style={{ color:s.c }}>{s.v}</p>
                </div>
              ))}
            </div>
            <AdminCard className="p-3">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color:B.dimmed }}>Admin Actions</p>
              <div className="space-y-2">
                {["Impersonate workspace","View audit logs","Suspend account","Reset MFA","Send admin email","View invoices","Grant extra credits"].map(a=>(
                  <button key={a} className="w-full text-left text-[11px] px-2.5 py-2 rounded-lg border transition-colors hover:bg-white/5" style={{ borderColor:B.border, color:a.includes("Suspend")?"#EF4444":B.muted }}>
                    {a}
                  </button>
                ))}
              </div>
            </AdminCard>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── 3. REVENUE ──────────────────────────────────────────────────
export function AdminRevenue({ setScreen }: { setScreen?: (s:string)=>void }) {
  const planBreakdown = [
    { plan:"Enterprise ($2,400/mo)", orgs:124,  mrr:"$297,600", pct:62, color:B.purple },
    { plan:"Business ($499/mo)",     orgs:241,  mrr:"$120,259", pct:25, color:B.primary },
    { plan:"Professional ($199/mo)", orgs:612,  mrr:"$51,588",  pct:11, color:B.cyan },
    { plan:"Pro ($79/mo)",           orgs:891,  mrr:"$11,673",  pct:2,  color:B.success },
    { plan:"Starter ($29/mo)",       orgs:532,  mrr:"$2,880",   pct:1,  color:B.slate },
  ];
  const cohorts = [
    { month:"Jan 2026", newMRR:"$48K", expansion:"$12K", churn:"-$3K", net:"$57K" },
    { month:"Feb 2026", newMRR:"$52K", expansion:"$14K", churn:"-$4K", net:"$62K" },
    { month:"Mar 2026", newMRR:"$61K", expansion:"$18K", churn:"-$5K", net:"$74K" },
    { month:"Apr 2026", newMRR:"$58K", expansion:"$16K", churn:"-$4K", net:"$70K" },
    { month:"May 2026", newMRR:"$74K", expansion:"$21K", churn:"-$6K", net:"$89K" },
    { month:"Jun 2026", newMRR:"$82K", expansion:"$24K", churn:"-$7K", net:"$99K" },
  ];
  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Revenue & Subscriptions</h1><p className="text-xs" style={{ color:B.dimmed }}>Real-time billing data · All plans · All regions</p></div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 h-7 px-3 rounded-xl border text-[11px]" style={{ borderColor:B.border, color:B.muted }}><Download size={10}/>Export CSV</button>
          <PrimaryBtn small><BarChart3 size={11}/>Investor Report</PrimaryBtn>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 mb-5">
        {[{l:"MRR",v:"$484,000",d:"+$12K MoM",up:true,c:AB},{l:"ARR",v:"$5.81M",d:"+28% YoY",up:true,c:B.success},{l:"New MRR",v:"$82K",d:"+11% MoM",up:true,c:B.primary},{l:"Expansion MRR",v:"$24K",d:"+14% MoM",up:true,c:B.cyan},{l:"Churn MRR",v:"$7K",d:"-0.3% MoM",up:true,c:"#EF4444"}].map(s=>(
          <GlassCard key={s.l} className="p-4">
            <p className="text-[10px] uppercase tracking-wide mb-2" style={{ color:B.dimmed }}>{s.l}</p>
            <p className="text-xl font-extrabold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>{s.v}</p>
            <span className="flex items-center gap-0.5 mt-1 text-[10px] font-semibold" style={{ color:s.up?B.success:B.success }}>
              <ArrowUpRight size={10}/>{s.d}
            </span>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <GlassCard className="p-4">
          <p className="text-sm font-semibold mb-4" style={{ color:B.text }}>MRR by Plan</p>
          <div className="space-y-3">
            {planBreakdown.map(p=>(
              <div key={p.plan}>
                <div className="flex justify-between mb-1 text-[11px]">
                  <span style={{ color:B.muted }}>{p.plan}</span>
                  <span className="font-semibold" style={{ color:B.text }}>{p.mrr}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background:B.s2 }}>
                  <div className="h-full rounded-full" style={{ width:`${p.pct}%`, background:p.color }}/>
                </div>
                <p className="text-[9px] mt-0.5" style={{ color:B.dimmed }}>{p.orgs} organizations · {p.pct}%</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>MRR Waterfall — Last 6 Months</p>
          <table className="w-full text-[11px]">
            <thead><tr className="border-b" style={{ borderColor:B.border }}>{["Month","New","Expansion","Churn","Net"].map(h=><th key={h} className="text-left pb-2 font-semibold uppercase tracking-wide text-[9px]" style={{ color:B.dimmed }}>{h}</th>)}</tr></thead>
            <tbody>
              {cohorts.map(c=>(
                <tr key={c.month} className="border-b" style={{ borderColor:B.border }}>
                  <td className="py-2" style={{ color:B.muted }}>{c.month}</td>
                  <td className="py-2" style={{ color:B.success }}>{c.newMRR}</td>
                  <td className="py-2" style={{ color:B.cyan }}>{c.expansion}</td>
                  <td className="py-2" style={{ color:"#EF4444" }}>{c.churn}</td>
                  <td className="py-2 font-bold" style={{ color:B.text }}>{c.net}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>

      <GlassCard className="p-4">
        <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>Recent Transactions</p>
        <table className="w-full">
          <thead><tr className="border-b" style={{ borderColor:B.border }}>{["Organization","Event","Amount","Date","Status"].map(h=><th key={h} className="text-left pb-2 text-[10px] font-semibold uppercase tracking-wide" style={{ color:B.dimmed }}>{h}</th>)}</tr></thead>
          <tbody>
            {[{o:"Nexus Technologies",ev:"Subscription renewal",a:"$2,400.00",d:"Jul 1",s:"Paid"},{o:"FinTech Plus",ev:"Plan upgrade → Business",a:"$499.00",d:"Jun 30",s:"Paid"},{o:"MedAssist Global",ev:"Subscription renewal",a:"$2,400.00",d:"Jun 28",s:"Paid"},{o:"RetailChain Ltd",ev:"Payment failed",a:"$499.00",d:"Jun 27",s:"Failed"},{o:"AcmeCorp",ev:"Trial started (Pro)",a:"$0.00",d:"Jun 26",s:"Trial"}].map(t=>(
              <tr key={t.o} className="border-b hover:bg-white/5" style={{ borderColor:B.border }}>
                <td className="py-2.5 text-xs font-semibold" style={{ color:B.text }}>{t.o}</td>
                <td className="py-2.5 text-xs" style={{ color:B.muted }}>{t.ev}</td>
                <td className="py-2.5 text-xs font-semibold" style={{ color:B.success }}>{t.a}</td>
                <td className="py-2.5 text-xs" style={{ color:B.dimmed }}>{t.d}</td>
                <td className="py-2.5"><Badge color={t.s==="Paid"?B.success:t.s==="Failed"?"#EF4444":B.warning}>{t.s}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}

// ─── 4. SYSTEM HEALTH ────────────────────────────────────────────
export function AdminSystemHealth() {
  const services = [
    { name:"API Gateway",        uptime:"99.99%", p50:"18ms", p95:"68ms",   p99:"142ms", rps:"12,400", status:"up" },
    { name:"AI Engine (GPT-4o)", uptime:"99.97%", p50:"124ms",p95:"312ms",  p99:"580ms", rps:"4,200",  status:"up" },
    { name:"WebSocket Server",   uptime:"99.95%", p50:"6ms",  p95:"18ms",   p99:"42ms",  rps:"28,100", status:"up" },
    { name:"DB Primary",         uptime:"100%",   p50:"2ms",  p95:"8ms",    p99:"18ms",  rps:"—",      status:"up" },
    { name:"DB Replica (EU)",    uptime:"99.99%", p50:"3ms",  p95:"9ms",    p99:"20ms",  rps:"—",      status:"up" },
    { name:"Voice Service",      uptime:"99.71%", p50:"180ms",p95:"310ms",  p99:"580ms", rps:"890",    status:"degraded" },
    { name:"Email Queue",        uptime:"99.99%", p50:"12ms", p95:"42ms",   p99:"120ms", rps:"2,100",  status:"up" },
    { name:"Webhook Delivery",   uptime:"99.94%", p50:"44ms", p95:"180ms",  p99:"320ms", rps:"1,200",  status:"up" },
    { name:"Storage (S3)",       uptime:"100%",   p50:"8ms",  p95:"28ms",   p99:"64ms",  rps:"—",      status:"up" },
    { name:"Auth Service",       uptime:"99.99%", p50:"9ms",  p95:"24ms",   p99:"48ms",  rps:"8,400",  status:"up" },
    { name:"Billing Service",    uptime:"100%",   p50:"28ms", p95:"82ms",   p99:"200ms", rps:"—",      status:"up" },
    { name:"CDN (Cloudflare)",   uptime:"100%",   p50:"4ms",  p95:"12ms",   p99:"28ms",  rps:"—",      status:"up" },
  ];
  const queues = [
    { name:"Email Queue",    depth:1241, proc:"2,100/hr", dlq:0, status:"Healthy" },
    { name:"Webhook Queue",  depth:384,  proc:"1,200/hr", dlq:3, status:"Warning" },
    { name:"AI Reply Queue", depth:89,   proc:"4,200/hr", dlq:0, status:"Healthy" },
    { name:"Report Queue",   depth:12,   proc:"180/hr",   dlq:0, status:"Healthy" },
  ];
  const sc: Record<string,string> = { up:B.success, degraded:B.warning, down:"#EF4444" };

  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>System Health & Monitoring</h1><p className="text-xs" style={{ color:B.dimmed }}>Real-time infrastructure · Auto-refreshes every 30s</p></div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border" style={{ borderColor:`${B.success}30`, background:`${B.success}08` }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background:B.success }}/>
          <span className="text-xs font-semibold" style={{ color:B.success }}>11/12 Operational · 1 Degraded</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-5">
        {[{l:"Services Up",v:"11/12",c:B.success},{l:"Avg API Latency",v:"24ms",c:B.primary},{l:"Error Rate",v:"0.003%",c:B.success},{l:"Queue DLQ",v:"3 msgs",c:B.warning}].map(s=>(
          <GlassCard key={s.l} className="p-4 text-center">
            <p className="text-[10px] uppercase tracking-wide mb-1" style={{ color:B.dimmed }}>{s.l}</p>
            <p className="text-2xl font-extrabold" style={{ fontFamily:"'Poppins',sans-serif", color:s.c }}>{s.v}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <GlassCard className="overflow-hidden">
          <div className="px-5 py-3 border-b" style={{ borderColor:B.border }}>
            <p className="text-sm font-semibold" style={{ color:B.text }}>Service Health</p>
          </div>
          <table className="w-full">
            <thead><tr className="border-b" style={{ borderColor:B.border }}>{["Service","Status","Uptime","P50","P95","P99","RPS"].map(h=><th key={h} className="text-left px-4 py-2 text-[9px] font-semibold uppercase tracking-wide" style={{ color:B.dimmed }}>{h}</th>)}</tr></thead>
            <tbody>
              {services.map(s=>(
                <tr key={s.name} className="border-b hover:bg-white/5" style={{ borderColor:B.border }}>
                  <td className="px-4 py-2 text-[11px] font-medium" style={{ color:B.text }}>{s.name}</td>
                  <td className="px-4 py-2"><span className="text-[9px] font-bold" style={{ color:sc[s.status] }}>● {s.status}</span></td>
                  <td className="px-4 py-2 text-[10px]" style={{ color:B.muted }}>{s.uptime}</td>
                  <td className="px-4 py-2 text-[10px] font-mono" style={{ color:B.text }}>{s.p50}</td>
                  <td className="px-4 py-2 text-[10px] font-mono" style={{ color:B.muted }}>{s.p95}</td>
                  <td className="px-4 py-2 text-[10px] font-mono" style={{ color:B.dimmed }}>{s.p99}</td>
                  <td className="px-4 py-2 text-[10px]" style={{ color:B.dimmed }}>{s.rps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>

        <div className="space-y-3">
          <GlassCard className="p-4">
            <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>Queue Depths</p>
            <table className="w-full">
              <thead><tr className="border-b" style={{ borderColor:B.border }}>{["Queue","Depth","Throughput","DLQ","Status"].map(h=><th key={h} className="text-left pb-2 text-[9px] font-semibold uppercase tracking-wide" style={{ color:B.dimmed }}>{h}</th>)}</tr></thead>
              <tbody>
                {queues.map(q=>(
                  <tr key={q.name} className="border-b" style={{ borderColor:B.border }}>
                    <td className="py-2 text-[11px]" style={{ color:B.text }}>{q.name}</td>
                    <td className="py-2 text-[11px] font-mono" style={{ color:B.muted }}>{q.depth}</td>
                    <td className="py-2 text-[11px]" style={{ color:B.dimmed }}>{q.proc}</td>
                    <td className="py-2"><span style={{ color:q.dlq>0?"#EF4444":B.success }} className="text-[11px] font-bold">{q.dlq}</span></td>
                    <td className="py-2"><Badge color={q.status==="Healthy"?B.success:B.warning}>{q.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
          <GlassCard className="p-4">
            <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>Resource Utilization</p>
            {[{l:"API Gateway CPU",v:42,c:B.primary},{l:"DB Primary CPU",v:28,c:B.success},{l:"AI Engine GPU",v:74,c:B.purple},{l:"Storage Used",v:24,c:B.cyan}].map(r=>(
              <div key={r.l} className="mb-2.5">
                <div className="flex justify-between text-[11px] mb-1"><span style={{ color:B.muted }}>{r.l}</span><span style={{ color:r.v>80?"#EF4444":B.text }}>{r.v}%</span></div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background:B.s2 }}><div className="h-full rounded-full" style={{ width:`${r.v}%`, background:r.v>80?"#EF4444":r.c }}/></div>
              </div>
            ))}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

// ─── 5. AI & LLM USAGE ───────────────────────────────────────────
export function AdminAIUsage() {
  const models = [
    { model:"GPT-4o (Turbo)",      calls:"4.2M/day",  tokens:"38M/day",  cost:"$0.82/day", latency:"142ms", accuracy:"94.2%", color:B.primary },
    { model:"GPT-4o Mini",         calls:"2.8M/day",  tokens:"8.4M/day", cost:"$0.12/day", latency:"48ms",  accuracy:"89.1%", color:B.cyan },
    { model:"Whisper v3 (Voice)",  calls:"890K/day",  tokens:"—",        cost:"$0.18/day", latency:"280ms", accuracy:"96.4%", color:B.purple },
    { model:"BERT Sentiment",      calls:"18.4M/day", tokens:"—",        cost:"$0.04/day", latency:"8ms",   accuracy:"91.8%", color:B.success },
    { model:"DeepL Translation",   calls:"2.84M/day", tokens:"—",        cost:"$0.22/day", latency:"44ms",  accuracy:"99.1%", color:B.warning },
  ];

  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>AI & LLM Usage</h1><p className="text-xs" style={{ color:B.dimmed }}>Model routing, token consumption, cost tracking</p></div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 h-7 px-3 rounded-xl border text-[11px]" style={{ borderColor:B.border, color:B.muted }}><Download size={10}/>Export</button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 mb-5">
        {[{l:"Total AI Calls/Day",v:"29.1M",c:B.purple},{l:"Total Tokens/Day",v:"48M",c:B.primary},{l:"AI Cost/Day",v:"$1.38",c:B.warning},{l:"Avg Confidence",v:"94.2%",c:B.success},{l:"Hallucination Rate",v:"0.003%",c:B.success}].map(s=>(
          <GlassCard key={s.l} className="p-4 text-center">
            <p className="text-[10px] uppercase tracking-wide mb-1" style={{ color:B.dimmed }}>{s.l}</p>
            <p className="text-xl font-extrabold" style={{ fontFamily:"'Poppins',sans-serif", color:s.c }}>{s.v}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <GlassCard className="p-4">
          <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>Active Models</p>
          <div className="space-y-3">
            {models.map(m=>(
              <div key={m.model} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor:B.border, background:"rgba(255,255,255,0.02)" }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:`${m.color}15` }}><Brain size={14} style={{ color:m.color }}/></div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold truncate" style={{ color:B.text }}>{m.model}</p>
                  <p className="text-[10px]" style={{ color:B.dimmed }}>{m.calls} · {m.latency} avg</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[11px] font-bold" style={{ color:m.color }}>{m.accuracy}</p>
                  <p className="text-[10px]" style={{ color:B.dimmed }}>{m.cost}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>Top Token Consumers (Orgs)</p>
          <div className="space-y-2">
            {[{o:"Nexus Technologies",tokens:"4.2M/day",pct:8.8},{o:"Meridian Health",tokens:"3.8M/day",pct:7.9},{o:"ScaleUp Commerce",tokens:"3.1M/day",pct:6.5},{o:"GlobalMart Retail",tokens:"2.9M/day",pct:6.0},{o:"BuildFast Dev",tokens:"2.4M/day",pct:5.0}].map(t=>(
              <div key={t.o}>
                <div className="flex justify-between text-[11px] mb-1"><span style={{ color:B.muted }}>{t.o}</span><span style={{ color:B.text }}>{t.tokens}</span></div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background:B.s2 }}><div className="h-full rounded-full" style={{ width:`${t.pct*8}%`, background:B.purple }}/></div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t" style={{ borderColor:B.border }}>
            <p className="text-sm font-semibold mb-2" style={{ color:B.text }}>Safety & Guardrails</p>
            {[{l:"Content filtered",v:"0.12%",c:B.warning},{l:"Prompt injections blocked",v:"847 today",c:"#EF4444"},{l:"Hallucinations flagged",v:"0.003%",c:B.success}].map(s=>(
              <div key={s.l} className="flex justify-between text-[11px] py-1.5 border-b" style={{ borderColor:B.border }}><span style={{ color:B.dimmed }}>{s.l}</span><span className="font-semibold" style={{ color:s.c }}>{s.v}</span></div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

// ─── 6. SUPPORT QUEUE ────────────────────────────────────────────
export function AdminSupportQueue({ setScreen }: { setScreen?: (s:string)=>void }) {
  const [selTicket, setSelTicket] = useState<string|null>(null);
  const ticket = SUPPORT_TICKETS.find(t=>t.id===selTicket);
  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between flex-shrink-0" style={{ borderColor:B.border }}>
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold" style={{ color:B.text }}>Support Queue</h2>
            <Badge color={"#EF4444"}>47 open</Badge>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 h-7 px-3 rounded-xl border text-[11px]" style={{ borderColor:B.border, color:B.muted }}><Filter size={10}/>Filter</button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth:"none" }}>
          <table className="w-full">
            <thead className="sticky top-0" style={{ background:"rgba(11,16,33,0.95)", backdropFilter:"blur(8px)" }}>
              <tr className="border-b" style={{ borderColor:B.border }}>
                {["ID","Organization","Issue","Priority","Status","Age"].map(h=><th key={h} className="text-left px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color:B.dimmed }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {SUPPORT_TICKETS.map(t=>(
                <tr key={t.id} onClick={()=>setSelTicket(t.id===selTicket?null:t.id)} className="border-b cursor-pointer hover:bg-white/5 transition-colors" style={{ borderColor:B.border, background:selTicket===t.id?`${AB}06`:"transparent" }}>
                  <td className="px-4 py-3 text-xs font-mono" style={{ color:B.primary }}>{t.id}</td>
                  <td className="px-4 py-3 text-xs font-semibold" style={{ color:B.text }}>{t.org}</td>
                  <td className="px-4 py-3 text-xs max-w-xs truncate" style={{ color:B.muted }}>{t.issue}</td>
                  <td className="px-4 py-3"><Badge color={pColor[t.priority]}>{t.priority}</Badge></td>
                  <td className="px-4 py-3"><Badge color={t.status==="Open"?B.primary:B.warning}>{t.status}</Badge></td>
                  <td className="px-4 py-3 text-xs" style={{ color:B.dimmed }}>{t.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {ticket && (
        <div className="w-72 flex-shrink-0 border-l overflow-y-auto p-5" style={{ borderColor:B.border, background:"var(--od-sidebar)", scrollbarWidth:"none" }}>
          <p className="text-xs font-mono mb-1" style={{ color:B.primary }}>{ticket.id}</p>
          <p className="text-sm font-bold mb-1" style={{ color:B.text }}>{ticket.issue}</p>
          <p className="text-xs mb-3" style={{ color:B.dimmed }}>{ticket.org} · {ticket.age} old</p>
          <div className="flex gap-2 mb-4"><Badge color={pColor[ticket.priority]}>{ticket.priority}</Badge><Badge color={B.primary}>{ticket.status}</Badge></div>
          <div className="space-y-2">
            {["Assign to agent","Escalate to engineering","Mark as resolved","Link to org","Add internal note","View org details"].map(a=>(
              <button key={a} className="w-full text-left text-[11px] px-3 py-2 rounded-lg border transition-colors hover:bg-white/5" style={{ borderColor:B.border, color:B.muted }}>{a}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── 7. SECURITY & FRAUD ─────────────────────────────────────────
export function AdminSecurity({ setScreen }: { setScreen?: (s:string)=>void }) {
  const alerts = [
    { type:"Fraud",    msg:"Unusual signup pattern: 12 orgs from same /24 subnet in 2h", sev:"critical", time:"18m" },
    { type:"Breach",   msg:"Failed login burst: 47 attempts against org admin_nexus@... blocked", sev:"warning", time:"1h" },
    { type:"Scraping", msg:"API key sk-omni-8821 made 50K calls in 10min — rate limited",  sev:"warning", time:"2h" },
    { type:"Phishing", msg:"Email spoofing attempt detected: support@omni-desk-ai.com (note: wrong domain)", sev:"info", time:"4h" },
  ];
  const ac: Record<string,string> = { critical:"#EF4444", warning:B.warning, info:B.cyan };
  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Security & Fraud Detection</h1><p className="text-xs" style={{ color:B.dimmed }}>Platform-wide threat monitoring and access control</p></div>
        <PrimaryBtn small><Shield size={11}/>Run Security Scan</PrimaryBtn>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[{l:"Security Score",v:"94/100",c:B.success},{l:"Active Threats",v:"1",c:"#EF4444"},{l:"Blocked IPs",v:"142",c:B.warning},{l:"MFA Adoption",v:"87%",c:B.success}].map(s=>(
          <GlassCard key={s.l} className="p-4 text-center">
            <p className="text-[10px] uppercase tracking-wide mb-1" style={{ color:B.dimmed }}>{s.l}</p>
            <p className="text-2xl font-extrabold" style={{ fontFamily:"'Poppins',sans-serif", color:s.c }}>{s.v}</p>
          </GlassCard>
        ))}
      </div>
      <div className="space-y-3 mb-5">
        <p className="text-sm font-semibold" style={{ color:B.text }}>Active Alerts</p>
        {alerts.map((a,i)=>(
          <GlassCard key={i} className="p-4 flex items-start gap-3" style={{ borderColor:`${ac[a.sev]}25` }}>
            <AlertCircle size={15} style={{ color:ac[a.sev], flexShrink:0, marginTop:1 }}/>
            <div className="flex-1"><p className="text-xs font-bold mb-0.5" style={{ color:ac[a.sev] }}>[{a.type}]</p><p className="text-sm" style={{ color:B.muted }}>{a.msg}</p></div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0"><span className="text-[10px]" style={{ color:B.dimmed }}>{a.time}</span><button className="text-[10px] font-semibold" style={{ color:B.primary }}>Investigate</button></div>
          </GlassCard>
        ))}
      </div>
      <GlassCard className="p-4">
        <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>Recent Admin Activity</p>
        <div className="space-y-2.5">
          {[{u:"Sarah (Founder)",a:"Viewed org RetailChain Ltd — impersonated for debugging",t:"30m"},{u:"Dev Team",a:"Deployed v4.2.1 to production — 0 downtime",t:"2h"},{u:"Finance",a:"Exported all invoices Jun 2026 (CSV, 2,400 records)",t:"3h"},{u:"Security",a:"Revoked API key sk-omni-8821 (rate limit abuse)",t:"4h"}].map((e,i)=>(
            <div key={i} className="flex items-center gap-3 py-2 border-b" style={{ borderColor:B.border }}>
              <Avatar initials={e.u.slice(0,2)} size={28}/>
              <span className="text-[11px] flex-1" style={{ color:B.muted }}><span className="font-semibold" style={{ color:B.text }}>{e.u}</span> {e.a}</span>
              <span className="text-[10px] flex-shrink-0" style={{ color:B.dimmed }}>{e.t}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

// ─── 8. FEATURE FLAGS (PLATFORM-WIDE) ────────────────────────────
export function AdminFeatureFlags() {
  const [flags, setFlags] = useState<Record<string,boolean>>({
    "ai-auto-reply":true,"voice-ai":true,"social-listening":true,"graphql-api":false,
    "ai-agent-studio":false,"marketplace-v2":false,"multi-currency":true,"white-label":true,
    "scim-provisioning":true,"ldap-auth":false,"data-lake-beta":false,"gpt-4o-turbo":true,
  });
  const toggle = (k: string) => setFlags(p=>({...p,[k]:!p[k]}));
  const flagDefs = [
    { id:"ai-auto-reply",      name:"AI Auto-Reply",          env:"Production", rollout:100, orgs:"All" },
    { id:"voice-ai",           name:"Voice AI",               env:"Production", rollout:100, orgs:"All" },
    { id:"social-listening",   name:"Social Listening",       env:"Production", rollout:80,  orgs:"Pro+" },
    { id:"multi-currency",     name:"Multi-Currency Billing",  env:"Production", rollout:100, orgs:"All" },
    { id:"white-label",        name:"White Label",            env:"Production", rollout:100, orgs:"Enterprise" },
    { id:"scim-provisioning",  name:"SCIM Provisioning",      env:"Production", rollout:100, orgs:"Enterprise" },
    { id:"gpt-4o-turbo",       name:"GPT-4o Turbo Model",     env:"Production", rollout:100, orgs:"All" },
    { id:"marketplace-v2",     name:"Marketplace v2",         env:"Beta",       rollout:25,  orgs:"Invited" },
    { id:"graphql-api",        name:"GraphQL API",            env:"Beta",       rollout:10,  orgs:"Developers" },
    { id:"ai-agent-studio",    name:"AI Agent Studio",        env:"Alpha",      rollout:5,   orgs:"Partners" },
    { id:"ldap-auth",          name:"LDAP Authentication",    env:"Alpha",      rollout:3,   orgs:"Enterprise" },
    { id:"data-lake-beta",     name:"Data Lake Beta",         env:"Alpha",      rollout:2,   orgs:"Partners" },
  ];
  const ec: Record<string,string> = { Production:B.success, Beta:B.warning, Alpha:B.pink };
  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Feature Flags</h1><p className="text-xs" style={{ color:B.dimmed }}>Platform-wide feature control · Affects all {ALL_ORGS.length} organizations</p></div>
        <PrimaryBtn small><Plus size={11}/>New Flag</PrimaryBtn>
      </div>
      <div className="space-y-2.5">
        {flagDefs.map(f=>{
          const isOn = flags[f.id];
          return (
            <GlassCard key={f.id} className="p-4 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold" style={{ color:B.text }}>{f.name}</p>
                  <Badge color={ec[f.env]}>{f.env}</Badge>
                  <span className="text-[10px]" style={{ color:B.dimmed }}>· {f.orgs}</span>
                </div>
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

// ─── 9. SUBSCRIPTIONS ────────────────────────────────────────────
export function AdminSubscriptions() {
  const [filter, setFilter] = useState("All");
  const subs = [
    { org:"Nexus Technologies",  plan:"Enterprise", status:"Active",  mrr:"$2,400", seats:156, start:"Jan 1, 2025",  next:"Aug 1, 2026",  health:94 },
    { org:"ScaleUp Commerce",    plan:"Business",   status:"Active",  mrr:"$499",   seats:87,  start:"Mar 15, 2025", next:"Sep 15, 2026", health:88 },
    { org:"Meridian Health",     plan:"Enterprise", status:"Active",  mrr:"$2,400", seats:341, start:"Apr 1, 2025",  next:"Oct 1, 2026",  health:96 },
    { org:"BuildFast Dev",       plan:"Pro",        status:"Active",  mrr:"$199",   seats:43,  start:"Apr 12, 2025", next:"Oct 12, 2026", health:91 },
    { org:"FinTech Plus",        plan:"Business",   status:"Trial",   mrr:"$0",     seats:68,  start:"Jun 28, 2026", next:"Jul 12, 2026", health:72 },
    { org:"RetailChain Ltd",     plan:"Business",   status:"Churned", mrr:"$0",     seats:0,   start:"May 3, 2025",  next:"—",            health:12 },
    { org:"EduTech Academy",     plan:"Pro",        status:"Active",  mrr:"$199",   seats:55,  start:"Jul 1, 2025",  next:"Jan 1, 2027",  health:91 },
    { org:"AcmeCorp",            plan:"Starter",    status:"Trial",   mrr:"$0",     seats:8,   start:"Jun 26, 2026", next:"Jul 10, 2026", health:65 },
    { org:"GlobalMart Retail",   plan:"Enterprise", status:"Active",  mrr:"$2,400", seats:212, start:"Feb 18, 2025", next:"Aug 18, 2026", health:87 },
    { org:"MedAssist Global",    plan:"Enterprise", status:"Active",  mrr:"$2,400", seats:280, start:"Jun 1, 2025",  next:"Dec 1, 2026",  health:88 },
  ];
  const filtered = filter==="All" ? subs : subs.filter(s=>s.status===filter||s.plan===filter);
  const planC: Record<string,string> = { Enterprise:B.purple, Business:B.primary, Pro:B.success, Starter:B.slate };
  const statC: Record<string,string> = { Active:B.success, Trial:B.warning, Churned:"#EF4444" };

  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Subscriptions</h1><p className="text-xs" style={{ color:B.dimmed }}>All customer subscriptions · Billing status · Renewal dates</p></div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 h-7 px-3 rounded-xl border text-[11px]" style={{ borderColor:B.border, color:B.muted }}><Download size={10}/>Export CSV</button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 mb-5">
        {[{l:"Active Subs",v:"2,247",c:B.success},{l:"Trial",v:"153",c:B.warning},{l:"Churned (30d)",v:"12",c:"#EF4444"},{l:"Renewals this month",v:"284",c:B.cyan},{l:"MRR",v:"$484K",c:"#F97316"}].map(s=>(
          <GlassCard key={s.l} className="p-4 text-center">
            <p className="text-[10px] uppercase tracking-wide mb-1" style={{ color:B.dimmed }}>{s.l}</p>
            <p className="text-xl font-extrabold" style={{ fontFamily:"'Poppins',sans-serif", color:s.c }}>{s.v}</p>
          </GlassCard>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        {["All","Active","Trial","Churned","Enterprise","Business","Pro"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} className="px-3 py-1.5 rounded-full text-[11px] font-semibold transition-colors" style={{ background:filter===f?"#F97316":`${B.primary}10`, color:filter===f?"#fff":B.dimmed }}>{f}</button>
        ))}
      </div>

      <GlassCard className="overflow-hidden">
        <table className="w-full">
          <thead className="sticky top-0" style={{ background:"rgba(11,16,33,0.95)", backdropFilter:"blur(8px)" }}>
            <tr className="border-b" style={{ borderColor:B.border }}>
              {["Organization","Plan","Status","MRR","Seats","Start Date","Next Renewal","Health","Actions"].map(h=><th key={h} className="text-left px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color:B.dimmed }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map(s=>(
              <tr key={s.org} className="border-b hover:bg-white/5 transition-colors" style={{ borderColor:B.border }}>
                <td className="px-4 py-3 text-xs font-semibold" style={{ color:B.text }}>{s.org}</td>
                <td className="px-4 py-3"><Badge color={planC[s.plan]||B.slate}>{s.plan}</Badge></td>
                <td className="px-4 py-3"><span className="text-[11px] font-semibold" style={{ color:statC[s.status] }}>● {s.status}</span></td>
                <td className="px-4 py-3 text-xs font-semibold" style={{ color:B.success }}>{s.mrr}</td>
                <td className="px-4 py-3 text-xs" style={{ color:B.muted }}>{s.seats}</td>
                <td className="px-4 py-3 text-xs" style={{ color:B.dimmed }}>{s.start}</td>
                <td className="px-4 py-3 text-xs" style={{ color:s.next==="—"?B.dimmed:B.text }}>{s.next}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-12 h-1.5 rounded-full overflow-hidden" style={{ background:B.s2 }}>
                      <div className="h-full rounded-full" style={{ width:`${s.health}%`, background:s.health>80?B.success:s.health>50?B.warning:"#EF4444" }}/>
                    </div>
                    <span className="text-[10px]" style={{ color:B.dimmed }}>{s.health}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5">
                    <button className="text-[10px] px-2 py-0.5 rounded border" style={{ borderColor:B.border, color:B.primary }}>Manage</button>
                    {s.status==="Churned" && <button className="text-[10px] px-2 py-0.5 rounded border" style={{ borderColor:B.border, color:B.success }}>Win-back</button>}
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

// ─── 10. INCIDENT MANAGEMENT ─────────────────────────────────────
export function AdminIncidents() {
  const [selInc, setSelInc] = useState<number|null>(null);
  const incidents = [
    { id:"INC-2041", title:"Voice AI elevated latency",         severity:"warning",  status:"Investigating", affected:"All voice users (~890K calls/day)", started:"2h ago",    duration:"2h 14m", owner:"Platform Team" },
    { id:"INC-2040", title:"Webhook delivery failures (EU-W1)", severity:"warning",  status:"Monitoring",    affected:"EU West orgs (324 orgs)",          started:"6h ago",    duration:"1h 42m", owner:"Infra Team" },
    { id:"INC-2039", title:"API 429 spike — rate limiter bug",  severity:"critical", status:"Resolved",      affected:"All orgs (15 min window)",         started:"1d ago",    duration:"14 min", owner:"API Team" },
    { id:"INC-2038", title:"Email queue backup",                severity:"info",     status:"Resolved",      affected:"Email channel users",              started:"2d ago",    duration:"28 min", owner:"Infra Team" },
    { id:"INC-2037", title:"DB replica lag (EU-W1)",            severity:"warning",  status:"Resolved",      affected:"EU West read queries",             started:"3d ago",    duration:"52 min", owner:"DB Team" },
  ];
  const sevColor: Record<string,string> = { critical:"#EF4444", warning:B.warning, info:B.cyan };
  const statColor: Record<string,string> = { Investigating:"#EF4444", Monitoring:B.warning, Resolved:B.success };

  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Incident Management</h1><p className="text-xs" style={{ color:B.dimmed }}>Platform incidents · Postmortems · On-call</p></div>
        <PrimaryBtn small><Plus size={11}/>Declare Incident</PrimaryBtn>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-5">
        {[{l:"Active Incidents",v:"2",c:"#EF4444"},{l:"MTTR (30d)",v:"31min",c:B.success},{l:"Incidents (30d)",v:"8",c:B.warning},{l:"Uptime (30d)",v:"99.97%",c:B.success}].map(s=>(
          <GlassCard key={s.l} className="p-4 text-center">
            <p className="text-[10px] uppercase tracking-wide mb-1" style={{ color:B.dimmed }}>{s.l}</p>
            <p className="text-2xl font-extrabold" style={{ fontFamily:"'Poppins',sans-serif", color:s.c }}>{s.v}</p>
          </GlassCard>
        ))}
      </div>

      <div className="space-y-3">
        {incidents.map((inc,i)=>(
          <GlassCard key={inc.id} className="overflow-hidden" style={{ borderColor:selInc===i?`${sevColor[inc.severity]}40`:B.border }}>
            <button className="w-full text-left p-4" onClick={()=>setSelInc(selInc===i?null:i)}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background:sevColor[inc.severity] }}/>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono" style={{ color:B.dimmed }}>{inc.id}</span>
                      <Badge color={statColor[inc.status]}>{inc.status}</Badge>
                      <Badge color={sevColor[inc.severity]}>{inc.severity}</Badge>
                    </div>
                    <p className="text-sm font-semibold" style={{ color:B.text }}>{inc.title}</p>
                    <p className="text-[11px] mt-0.5" style={{ color:B.dimmed }}>Affected: {inc.affected}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[11px]" style={{ color:B.dimmed }}>Started {inc.started}</p>
                  <p className="text-[11px] font-semibold" style={{ color:B.text }}>Duration: {inc.duration}</p>
                </div>
              </div>
            </button>
            {selInc===i && (
              <div className="px-4 pb-4 pt-2 border-t" style={{ borderColor:B.border }}>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[{l:"Owner",v:inc.owner},{l:"Started",v:inc.started},{l:"Duration",v:inc.duration}].map(d=>(
                    <div key={d.l} className="rounded-xl p-2.5" style={{ background:B.s2 }}>
                      <p className="text-[9px] uppercase tracking-widest mb-0.5" style={{ color:B.dimmed }}>{d.l}</p>
                      <p className="text-xs font-semibold" style={{ color:B.text }}>{d.v}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  {["Update status","Add postmortem","Notify customers","Escalate","Mark resolved"].map(a=>(
                    <button key={a} className="text-[10px] px-2.5 py-1.5 rounded-lg border transition-colors hover:bg-white/5" style={{ borderColor:B.border, color:a.includes("resolved")?"#EF4444":B.muted }}>{a}</button>
                  ))}
                </div>
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
