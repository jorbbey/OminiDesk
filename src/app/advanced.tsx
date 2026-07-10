import { useState } from "react";
import {
  BarChart3, Download, Filter, TrendingUp, Users, Globe, Search,
  MessageCircle, Instagram, Twitter, Bell, Sparkles, FileText,
  Send, Zap, BookOpen, AlertCircle, Inbox, Plus, X, Play,
  Check, ChevronDown, ArrowRight, Building2, Package, Shield,
  Activity, Brain, Phone, Mic, Headphones, RefreshCw, Key,
  Webhook, ExternalLink, CheckCircle2, Clock, User, Hash, Target,
  Mail, Settings, Cpu, Copy, UserPlus
} from "lucide-react";
import { B, G, gradText, AppScreen, GlassCard, Badge, Avatar, PrimaryBtn, OutlineBtn, SparkLine, SparkBar } from "./shared";

// ═══════════════════════════════════════════════════════════════════
// ADVANCED MODULES — Phase 5
// ═══════════════════════════════════════════════════════════════════

// ─── 1. ANALYTICS ────────────────────────────────────────────────
export function AdvancedAnalytics() {
  const [range, setRange] = useState("7D");
  const weekVol = [1842,2103,1967,2341,2687,2934,3012];
  const weekResp = [4.2,3.8,3.1,2.9,3.4,2.1,1.8];
  const weekCsat = [4.2,4.4,4.3,4.6,4.5,4.7,4.8];
  const chData = [
    { name:"WhatsApp",  pct:34, color:"#25D366" },{ name:"Email",    pct:28, color:B.primary },
    { name:"Instagram", pct:18, color:"#E1306C" },{ name:"Live Chat",pct:12, color:B.warning },
    { name:"Other",     pct:8,  color:B.slate },
  ];
  const agents = [
    { name:"Maya S.", resolved:47, csat:4.9, resp:"1.8m", color:B.success },
    { name:"Alex K.", resolved:42, csat:4.8, resp:"2.1m", color:B.primary },
    { name:"David L.",resolved:38, csat:4.7, resp:"2.9m", color:B.cyan },
    { name:"Nina P.", resolved:31, csat:4.6, resp:"3.2m", color:B.purple },
    { name:"Chris M.",resolved:28, csat:4.5, resp:"3.8m", color:B.warning },
  ];
  const heatData = Array.from({length:7},(_,d)=>Array.from({length:12},(_,h)=>Math.floor(Math.random()*100)));
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const hours = ["6am","8am","10am","12pm","2pm","4pm","6pm","8pm","10pm","12am","2am","4am"];
  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Analytics Center</h1><p className="text-xs" style={{ color:B.dimmed }}>Executive performance overview · All channels</p></div>
        <div className="flex gap-2">
          <div className="flex rounded-xl overflow-hidden border" style={{ borderColor:B.border }}>
            {["24H","7D","30D","90D","1Y"].map(r=><button key={r} onClick={()=>setRange(r)} className="h-7 px-3 text-[11px] font-medium transition-colors" style={{ background:range===r?B.primary:"transparent", color:range===r?"#fff":B.dimmed }}>{r}</button>)}
          </div>
          <button className="flex items-center gap-1.5 h-7 px-3 rounded-xl border text-[11px]" style={{ borderColor:B.border, color:B.muted }}><Download size={11}/>Export</button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-5 gap-3 mb-4">
        {[
          { l:"Total Conversations", v:"13,874", d:"+22%", c:B.primary, data:weekVol },
          { l:"Avg First Response",  v:"2.8m",   d:"−24%", c:B.success, data:weekResp },
          { l:"Avg Resolution",      v:"4.2h",   d:"−18%", c:B.cyan,    data:weekVol.map(v=>v*0.002) },
          { l:"CSAT Score",          v:"4.6/5",  d:"+0.4", c:B.warning, data:weekCsat },
          { l:"NPS",                 v:"67",     d:"+12",  c:B.purple,  data:weekVol.map(v=>Math.round(v*0.02)) },
        ].map(k=>(
          <GlassCard key={k.l} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] uppercase tracking-wide" style={{ color:B.dimmed }}>{k.l}</p>
              <SparkLine data={k.data} color={k.c} w={50} h={20}/>
            </div>
            <p className="text-xl font-extrabold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>{k.v}</p>
            <span className="text-[10px] font-semibold" style={{ color:B.success }}>{k.d} vs prev period</span>
          </GlassCard>
        ))}
      </div>

      {/* Volume + Channel */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <GlassCard className="col-span-2 p-4">
          <p className="text-sm font-semibold mb-1" style={{ color:B.text }}>Conversation Volume Trend</p>
          <p className="text-[11px] mb-3" style={{ color:B.dimmed }}>Incoming conversations this week</p>
          <SparkLine data={weekVol} color={B.primary} w={500} h={110}/>
          <div className="flex justify-between mt-1">{days.map(d=><span key={d} className="text-[9px]" style={{ color:B.dimmed }}>{d}</span>)}</div>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>Channel Distribution</p>
          <div className="space-y-2.5">
            {chData.map(c=>(
              <div key={c.name}>
                <div className="flex justify-between text-[11px] mb-1">
                  <span style={{ color:B.muted }}>{c.name}</span>
                  <span className="font-semibold" style={{ color:B.text }}>{c.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background:B.s2 }}>
                  <div className="h-full rounded-full" style={{ width:`${c.pct}%`, background:c.color }}/>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Agent table + Heatmap */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <GlassCard className="p-4">
          <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>Agent Performance</p>
          <table className="w-full">
            <thead><tr className="border-b" style={{ borderColor:B.border }}>{["Agent","Resolved","CSAT","Avg Resp"].map(h=><th key={h} className="text-left pb-2 text-[10px] uppercase tracking-wide" style={{ color:B.dimmed }}>{h}</th>)}</tr></thead>
            <tbody>
              {agents.map((a,i)=>(
                <tr key={a.name} className="border-b" style={{ borderColor:B.border }}>
                  <td className="py-2.5"><div className="flex items-center gap-2"><span className="text-[9px] font-bold w-4" style={{ color:B.dimmed }}>#{i+1}</span><div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white" style={{ background:a.color }}>{a.name[0]}</div><span className="text-[11px] font-semibold" style={{ color:B.text }}>{a.name}</span></div></td>
                  <td className="py-2.5 text-[11px]" style={{ color:B.text }}>{a.resolved}</td>
                  <td className="py-2.5 text-[11px] font-semibold" style={{ color:B.warning }}>★{a.csat}</td>
                  <td className="py-2.5 text-[11px]" style={{ color:B.muted }}>{a.resp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-sm font-semibold mb-1" style={{ color:B.text }}>Conversation Heatmap</p>
          <p className="text-[11px] mb-3" style={{ color:B.dimmed }}>Volume by day & hour</p>
          <div className="flex gap-1">
            <div className="flex flex-col gap-1 mr-1">
              {days.map(d=><div key={d} className="text-[8px] h-4 flex items-center" style={{ color:B.dimmed }}>{d}</div>)}
            </div>
            <div className="flex-1 grid gap-1" style={{ gridTemplateColumns:`repeat(${hours.length},1fr)` }}>
              {heatData.map((row,d)=>row.map((v,h)=>(
                <div key={`${d}-${h}`} className="h-4 rounded-sm" style={{ background:v>80?B.primary:v>60?`${B.primary}80`:v>40?`${B.primary}45`:v>20?`${B.primary}20`:B.s2 }}/>
              )))}
            </div>
          </div>
          <div className="flex justify-between mt-2">{hours.map(h=><span key={h} className="text-[7px]" style={{ color:B.dimmed }}>{h}</span>)}</div>
        </GlassCard>
      </div>

      {/* AI + Automation metrics */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { title:"AI Performance", items:[{l:"Replies generated",v:"8,241"},{l:"Acceptance rate",v:"78%"},{l:"Avg confidence",v:"92%"},{l:"Languages used",v:"14"}], color:B.purple },
          { title:"Automation Savings", items:[{l:"Auto-resolved",v:"3,102"},{l:"Time saved",v:"412h"},{l:"Cost saved",v:"$18,400"},{l:"Workflows active",v:"24"}], color:B.success },
          { title:"Revenue Impact", items:[{l:"Leads created",v:"284"},{l:"Deals influenced",v:"$142K"},{l:"Upsells closed",v:"31"},{l:"Renewals retained",v:"94%"}], color:B.warning },
        ].map(card=>(
          <GlassCard key={card.title} className="p-4">
            <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>{card.title}</p>
            <div className="space-y-2">
              {card.items.map(i=>(
                <div key={i.l} className="flex justify-between text-[11px]">
                  <span style={{ color:B.dimmed }}>{i.l}</span><span className="font-bold" style={{ color:card.color }}>{i.v}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

// ─── 2. SOCIAL LISTENING ─────────────────────────────────────────
export function SocialListening() {
  const [activeKw, setActiveKw] = useState(0);
  const keywords = [
    { kw:"OmniDesk AI",  mentions:1247, sentiment:82, trend:"+12%" },
    { kw:"omnichannel",  mentions:834,  sentiment:74, trend:"+8%" },
    { kw:"AI support",   mentions:612,  sentiment:68, trend:"+23%" },
    { kw:"#CustomerCX",  mentions:448,  sentiment:77, trend:"+5%" },
    { kw:"competitor A", mentions:392,  sentiment:41, trend:"-3%" },
  ];
  const mentions = [
    { platform:"Twitter/X",  user:"@techreviewer",   text:"OmniDesk AI just reduced our support response time by 70%. Game changer for our team 🚀", time:"2m", sentiment:"positive", reach:"12.4K" },
    { platform:"LinkedIn",   user:"Sarah Chen",      text:"We switched to OmniDesk AI 3 months ago and haven't looked back. The unified inbox + AI replies = ❤️", time:"8m", sentiment:"positive", reach:"2.8K" },
    { platform:"Reddit",     user:"u/saas_buyer",    text:"Comparing OmniDesk vs Intercom — OmniDesk wins on AI but Intercom has better docs. Thoughts?", time:"15m", sentiment:"neutral",  reach:"847" },
    { platform:"Instagram",  user:"@digitalagency_",  text:"Our clients love the WhatsApp + AI combo from @OmniDesk — highly recommend!", time:"32m", sentiment:"positive", reach:"4.1K" },
    { platform:"Twitter/X",  user:"@frustrated_usr", text:"@OmniDesk been waiting 3 days for a response on my support ticket #disappointed", time:"1h", sentiment:"negative", reach:"380" },
    { platform:"TechBlog",   user:"TechInsider",     text:"OmniDesk AI raises $32M Series A — positioning as the operating system for AI-first customer support.", time:"2h", sentiment:"positive", reach:"28K" },
  ];
  const sentColor = { positive:B.success, neutral:B.slate, negative:B.pink };
  const platColor: Record<string,string> = { "Twitter/X":"#1DA1F2", LinkedIn:"#0A66C2", Reddit:"#FF4500", Instagram:"#E1306C", TechBlog:B.cyan };
  return (
    <div className="flex h-full">
      {/* Left panel */}
      <div className="w-64 flex flex-col border-r flex-shrink-0" style={{ borderColor:B.border, background:"#060C1A" }}>
        <div className="p-3 border-b flex-shrink-0" style={{ borderColor:B.border }}>
          <p className="text-xs font-bold mb-2" style={{ color:B.text }}>Tracked Keywords</p>
          <div className="flex items-center gap-1.5 h-7 px-2.5 rounded-lg mb-2" style={{ background:`${B.primary}08`, border:`1px solid ${B.border}` }}>
            <Search size={10} style={{ color:B.dimmed }}/><input className="flex-1 text-[11px] bg-transparent outline-none" placeholder="Add keyword…" style={{ color:B.text }}/>
          </div>
          <button className="w-full h-7 rounded-xl text-[11px] font-semibold text-white" style={{ background:G.brand }}>+ Add Keyword</button>
        </div>
        <div className="flex-1 overflow-y-auto p-2" style={{ scrollbarWidth:"none" }}>
          {keywords.map((k,i)=>(
            <button key={k.kw} onClick={()=>setActiveKw(i)} className="w-full text-left p-2.5 rounded-xl mb-1 border transition-all" style={{ background:activeKw===i?`${B.primary}12`:"transparent", borderColor:activeKw===i?`${B.primary}30`:B.border }}>
              <div className="flex justify-between mb-1">
                <span className="text-[11px] font-semibold" style={{ color:B.text }}>{k.kw}</span>
                <span className="text-[9px] font-semibold" style={{ color:parseFloat(k.trend)>0?B.success:B.pink }}>{k.trend}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span style={{ color:B.dimmed }}>{k.mentions.toLocaleString()} mentions</span>
                <span style={{ color:k.sentiment>70?B.success:k.sentiment>50?B.warning:B.pink }}>{k.sentiment}% pos</span>
              </div>
              <div className="h-1 rounded-full mt-1.5 overflow-hidden" style={{ background:B.s2 }}>
                <div className="h-full rounded-full" style={{ width:`${k.sentiment}%`, background:k.sentiment>70?B.success:k.sentiment>50?B.warning:B.pink }}/>
              </div>
            </button>
          ))}
        </div>
        <div className="p-3 border-t" style={{ borderColor:B.border }}>
          <p className="text-[10px] font-semibold mb-2" style={{ color:B.dimmed }}>Trending Topics</p>
          {["#AISupport","omnichannel CX","customer success AI"].map(t=>(
            <div key={t} className="flex items-center gap-2 py-1.5 border-b text-[11px]" style={{ borderColor:B.border }}>
              <TrendingUp size={10} style={{ color:B.cyan }}/><span style={{ color:B.muted }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mention feed */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between flex-shrink-0" style={{ borderColor:B.border }}>
          <div>
            <p className="text-sm font-bold" style={{ color:B.text }}>Live Mention Feed</p>
            <p className="text-[11px]" style={{ color:B.dimmed }}>Real-time · <span style={{ color:B.success }}>● Monitoring 11 platforms</span></p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 h-7 px-3 rounded-xl text-[11px] border" style={{ borderColor:B.border, color:B.muted }}><Filter size={10}/>Filter</button>
            <button className="flex items-center gap-1.5 h-7 px-3 rounded-xl text-[11px] border" style={{ borderColor:B.border, color:B.muted }}><Bell size={10}/>Alerts</button>
            <PrimaryBtn small><Sparkles size={10}/>AI Summary</PrimaryBtn>
          </div>
        </div>

        {/* Summary bar */}
        <div className="flex gap-4 px-4 py-3 border-b" style={{ borderColor:B.border, background:`${B.primary}06` }}>
          {[{l:"Total today",v:"1,247",c:B.primary},{l:"Positive",v:"82%",c:B.success},{l:"Neutral",v:"11%",c:B.slate},{l:"Negative",v:"7%",c:B.pink},{l:"Viral (>10K reach)",v:"8",c:B.warning}].map(s=>(
            <div key={s.l} className="flex items-center gap-2"><span className="text-[10px]" style={{ color:B.dimmed }}>{s.l}:</span><span className="text-[11px] font-bold" style={{ color:s.c }}>{s.v}</span></div>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth:"none" }}>
          {mentions.map((m,i)=>(
            <div key={i} className="flex items-start gap-3 px-4 py-4 border-b hover:bg-white/5 transition-colors" style={{ borderColor:B.border }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-white mt-0.5" style={{ background:platColor[m.platform]||B.slate }}>
                {m.platform[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold" style={{ color:B.text }}>{m.user}</span>
                  <span className="text-[10px] px-1.5 py-px rounded" style={{ background:`${platColor[m.platform]||B.slate}18`, color:platColor[m.platform]||B.slate }}>{m.platform}</span>
                  <Badge color={(sentColor as Record<string,string>)[m.sentiment]}>{m.sentiment}</Badge>
                </div>
                <p className="text-xs leading-relaxed" style={{ color:B.muted }}>{m.text}</p>
                <div className="flex items-center gap-3 mt-2 text-[10px]" style={{ color:B.dimmed }}>
                  <span>{m.time} ago</span><span>Reach: {m.reach}</span>
                  {m.sentiment==="negative" && <button className="font-semibold" style={{ color:B.pink }}>Respond now</button>}
                  {m.sentiment==="positive" && <button className="font-semibold" style={{ color:B.success }}>Amplify</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 3. AUTOMATION BUILDER ────────────────────────────────────────
export function AutomationBuilder() {
  const [selNode, setSelNode] = useState<number|null>(1);
  const nodes = [
    { id:0, type:"trigger",   label:"WhatsApp Message Received", icon:MessageCircle, color:"#25D366", x:80,  y:160 },
    { id:1, type:"condition", label:"Contains 'order' OR 'delivery'", icon:Filter, color:B.warning, x:280, y:160 },
    { id:2, type:"ai",        label:"AI: Classify Intent",        icon:Sparkles,    color:B.purple,  x:480, y:100 },
    { id:3, type:"action",    label:"Send AI-drafted Reply",       icon:Send,        color:B.primary, x:680, y:100 },
    { id:4, type:"condition", label:"Resolved by AI?",            icon:CheckCircle2,color:B.cyan,    x:480, y:240 },
    { id:5, type:"action",    label:"Assign to Human Agent",       icon:Users,       color:B.pink,    x:680, y:240 },
  ];
  const edges = [[0,1],[1,2],[1,4],[2,3],[4,5]];
  const palette = [
    { label:"Triggers",    items:["Message Received","Keyword Match","SLA Breach","New Customer","Webhook"] },
    { label:"Conditions",  items:["Contains Text","Sentiment Check","Customer Plan","Channel Type","Business Hours"] },
    { label:"AI Nodes",    items:["Classify Intent","Generate Reply","Sentiment Analysis","Extract Data","Route Decision"] },
    { label:"Actions",     items:["Send Reply","Assign Agent","Create Ticket","Update CRM","Send Email","Webhook"] },
  ];
  return (
    <div className="flex h-full">
      {/* Palette */}
      <div className="w-52 border-r flex flex-col flex-shrink-0" style={{ borderColor:B.border, background:"#060C1A" }}>
        <div className="p-3 border-b" style={{ borderColor:B.border }}>
          <p className="text-xs font-bold" style={{ color:B.text }}>Node Palette</p>
          <div className="flex items-center gap-1.5 h-7 px-2.5 rounded-lg mt-2" style={{ background:`${B.primary}08`, border:`1px solid ${B.border}` }}>
            <Search size={10} style={{ color:B.dimmed }}/><input className="flex-1 text-[10px] bg-transparent outline-none" placeholder="Search nodes…" style={{ color:B.text }}/>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2" style={{ scrollbarWidth:"none" }}>
          {palette.map(group=>(
            <div key={group.label} className="mb-3">
              <p className="text-[9px] font-bold uppercase tracking-widest px-2 mb-1.5" style={{ color:B.dimmed }}>{group.label}</p>
              {group.items.map(item=>(
                <div key={item} className="flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-grab mb-0.5 border hover:border-opacity-60 transition-colors" style={{ borderColor:B.border, background:"rgba(255,255,255,0.02)" }}>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:B.primary }}/>
                  <span className="text-[10px]" style={{ color:B.muted }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b flex-shrink-0" style={{ borderColor:B.border }}>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold" style={{ color:B.text }}>Shipping Delay Auto-Reply</span>
            <span className="text-[10px] px-2 py-px rounded-full font-semibold" style={{ background:`${B.success}18`, color:B.success }}>Active</span>
          </div>
          <div className="flex gap-2">
            {[{l:"Templates",ic:FileText},{l:"History",ic:Clock},{l:"Test",ic:Play}].map(a=>(
              <button key={a.l} className="flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-[11px] border transition-colors hover:bg-white/5" style={{ borderColor:B.border, color:B.muted }}><a.ic size={10}/>{a.l}</button>
            ))}
            <PrimaryBtn small>Save & Deploy</PrimaryBtn>
          </div>
        </div>
        <div className="flex-1 relative overflow-hidden" style={{ background:`radial-gradient(circle at 50% 50%, ${B.s2} 1px, transparent 1px) center / 28px 28px` }}>
          <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents:"none" }}>
            {edges.map(([from,to],i)=>{
              const a=nodes[from], b=nodes[to];
              const x1=a.x+120, y1=a.y+28, x2=b.x, y2=b.y+28;
              const mx=(x1+x2)/2;
              return <path key={i} d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`} fill="none" stroke={B.border} strokeWidth={2} strokeDasharray="4 2"/>;
            })}
          </svg>
          {nodes.map(n=>(
            <div key={n.id} onClick={()=>setSelNode(n.id===selNode?null:n.id)} className="absolute cursor-pointer" style={{ left:n.x, top:n.y }}>
              <div className="rounded-2xl px-3 py-2.5 border-2 flex items-center gap-2.5 transition-all hover:scale-105" style={{ background:B.surface, borderColor:selNode===n.id?n.color:B.border, boxShadow:selNode===n.id?`0 0 20px ${n.color}30`:"none", minWidth:140 }}>
                <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:`${n.color}18` }}><n.icon size={13} style={{ color:n.color }}/></div>
                <div><p className="text-[9px] font-bold uppercase tracking-wide" style={{ color:n.color }}>{n.type}</p><p className="text-[10px] font-semibold" style={{ color:B.text }}>{n.label}</p></div>
              </div>
            </div>
          ))}
          <div className="absolute bottom-4 left-4 flex gap-2">
            {[{v:"1,024",l:"Executions today"},{v:"98.2%",l:"Success rate"},{v:"1.2s",l:"Avg runtime"}].map(s=>(
              <div key={s.l} className="px-3 py-2 rounded-xl border text-center" style={{ background:B.surface, borderColor:B.border }}>
                <p className="text-sm font-bold" style={{ color:B.primary }}>{s.v}</p>
                <p className="text-[9px]" style={{ color:B.dimmed }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Properties panel */}
      {selNode!==null && (
        <div className="w-60 border-l flex-shrink-0 overflow-y-auto" style={{ borderColor:B.border, background:"#060C1A", scrollbarWidth:"none" }}>
          <div className="p-3 border-b" style={{ borderColor:B.border }}>
            <p className="text-xs font-bold" style={{ color:B.text }}>Node Properties</p>
          </div>
          <div className="p-3 space-y-3">
            {[{l:"Node Type",v:nodes[selNode]?.type||""},{l:"Label",v:nodes[selNode]?.label||""},{l:"Timeout",v:"30s"},{l:"Retry on fail",v:"Yes · 3x"},{l:"Log level",v:"Full"}].map(f=>(
              <div key={f.l}>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color:B.dimmed }}>{f.l}</p>
                <div className="h-8 px-2.5 rounded-lg border flex items-center text-[11px]" style={{ background:B.s2, borderColor:B.border, color:B.text }}>{f.v}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── 4. KNOWLEDGE BASE ───────────────────────────────────────────
export function KnowledgeBase() {
  const [selCat, setSelCat] = useState(0);
  const [selArt, setSelArt] = useState<number|null>(0);
  const cats = [
    { name:"Getting Started",   count:12, icon:BookOpen },
    { name:"Using the Inbox",   count:8,  icon:Inbox },
    { name:"AI Features",       count:15, icon:Sparkles },
    { name:"Billing & Plans",   count:6,  icon:Package },
    { name:"API & Integrations",count:24, icon:Webhook },
    { name:"Troubleshooting",   count:18, icon:AlertCircle },
  ];
  const articles = [
    { title:"Getting started with OmniDesk AI", status:"Published", views:4821, updated:"Jul 1",  cat:"Getting Started" },
    { title:"Connecting WhatsApp Business API",   status:"Published", views:3204, updated:"Jun 28", cat:"Getting Started" },
    { title:"Setting up your AI Reply Assistant", status:"Published", views:2877, updated:"Jun 25", cat:"AI Features" },
    { title:"How to create automation workflows",  status:"Draft",     views:0,    updated:"Jul 1",  cat:"Getting Started" },
    { title:"Understanding CSAT and NPS scores",   status:"Published", views:1934, updated:"Jun 20", cat:"Getting Started" },
    { title:"Inviting and managing team members",  status:"Review",    views:892,  updated:"Jun 15", cat:"Getting Started" },
  ];
  const statusColor: Record<string,string> = { Published:B.success, Draft:B.warning, Review:B.cyan };
  const article = selArt!==null ? articles[selArt] : null;
  return (
    <div className="flex h-full">
      {/* Category sidebar */}
      <div className="w-52 border-r flex flex-col flex-shrink-0" style={{ borderColor:B.border, background:"#060C1A" }}>
        <div className="p-3 border-b" style={{ borderColor:B.border }}>
          <p className="text-xs font-bold mb-2" style={{ color:B.text }}>Knowledge Base</p>
          <PrimaryBtn small className="w-full justify-center"><Plus size={11}/>New Article</PrimaryBtn>
        </div>
        <div className="flex-1 p-2 overflow-y-auto" style={{ scrollbarWidth:"none" }}>
          <button onClick={()=>setSelCat(-1)} className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl mb-1 text-[11px] font-medium" style={{ background:selCat===-1?`${B.primary}15`:"transparent", color:selCat===-1?B.primary:B.dimmed }}>
            <Inbox size={12}/>All Articles <span className="ml-auto text-[9px]">83</span>
          </button>
          {cats.map((c,i)=>(
            <button key={c.name} onClick={()=>setSelCat(i)} className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl mb-0.5 text-[11px] font-medium" style={{ background:selCat===i?`${B.primary}15`:"transparent", color:selCat===i?B.primary:B.dimmed }}>
              <c.icon size={12}/>{c.name}<span className="ml-auto text-[9px]">{c.count}</span>
            </button>
          ))}
        </div>
        <div className="p-3 border-t" style={{ borderColor:B.border }}>
          <div className="rounded-xl p-3" style={{ background:`${B.purple}10`, border:`1px solid ${B.purple}20` }}>
            <div className="flex items-center gap-1.5 mb-1.5"><Sparkles size={10} style={{ color:B.purple }}/><span className="text-[9px] font-bold" style={{ color:B.purple }}>AI Content Health</span></div>
            <div className="space-y-1">
              {[{l:"Outdated",v:"4 articles",c:B.warning},{l:"Missing coverage",v:"8 topics",c:B.pink},{l:"Score",v:"84/100",c:B.success}].map(m=>(
                <div key={m.l} className="flex justify-between text-[10px]"><span style={{ color:B.dimmed }}>{m.l}</span><span style={{ color:m.c }}>{m.v}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Article list */}
      <div className="w-72 border-r flex flex-col flex-shrink-0" style={{ borderColor:B.border }}>
        <div className="p-3 border-b flex-shrink-0" style={{ borderColor:B.border }}>
          <div className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg" style={{ background:`${B.primary}06`, border:`1px solid ${B.border}` }}>
            <Search size={11} style={{ color:B.dimmed }}/><input className="flex-1 text-[11px] bg-transparent outline-none" placeholder="Search articles…" style={{ color:B.text }}/>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth:"none" }}>
          {articles.map((a,i)=>(
            <button key={i} onClick={()=>setSelArt(i)} className="w-full text-left px-4 py-3.5 border-b transition-colors" style={{ borderColor:B.border, background:selArt===i?`${B.primary}08`:"transparent" }}>
              <div className="flex items-start justify-between gap-2">
                <p className="text-[11px] font-semibold leading-snug" style={{ color:B.text }}>{a.title}</p>
                <span className="text-[9px] px-1.5 py-px rounded-full flex-shrink-0 font-semibold" style={{ background:`${statusColor[a.status]}18`, color:statusColor[a.status] }}>{a.status}</span>
              </div>
              <div className="flex items-center gap-3 mt-2 text-[10px]" style={{ color:B.dimmed }}>
                <span>{a.views.toLocaleString()} views</span><span>Updated {a.updated}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {article ? <>
          <div className="flex items-center justify-between px-5 py-3 border-b flex-shrink-0" style={{ borderColor:B.border }}>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold" style={{ color:B.text }}>{article.title}</span>
              <Badge color={statusColor[article.status]}>{article.status}</Badge>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-[11px] border" style={{ borderColor:B.border, color:B.muted }}><Sparkles size={9} style={{ color:B.purple }}/>AI Improve</button>
              <button className="flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-[11px] border" style={{ borderColor:B.border, color:B.muted }}><Globe size={9}/>Translate</button>
              <PrimaryBtn small>Publish</PrimaryBtn>
            </div>
          </div>
          <div className="flex items-center gap-1 px-5 py-2 border-b flex-shrink-0" style={{ borderColor:B.border }}>
            {["H1","H2","Bold","Italic","Link","Image","Table","Code","List"].map(t=>(
              <button key={t} className="px-2 py-1 rounded text-[10px] font-semibold transition-colors hover:bg-white/5" style={{ color:B.muted }}>{t}</button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto px-8 py-6" style={{ scrollbarWidth:"none" }}>
            <h1 className="text-2xl font-bold mb-4" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>{article.title}</h1>
            <p className="text-sm leading-relaxed mb-4" style={{ color:B.muted }}>Welcome to OmniDesk AI! This guide will walk you through everything you need to know to get your workspace set up and start managing customer conversations across all your channels.</p>
            <h2 className="text-lg font-bold mb-3 mt-6" style={{ color:B.text }}>Prerequisites</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color:B.muted }}>Before you begin, make sure you have admin access to your OmniDesk AI workspace and at least one communication channel ready to connect.</p>
            <div className="rounded-xl p-4 my-4 border-l-4" style={{ background:`${B.primary}08`, borderColor:B.primary }}>
              <p className="text-xs font-semibold mb-1" style={{ color:B.primary }}>💡 Pro Tip</p>
              <p className="text-sm" style={{ color:B.muted }}>Start with WhatsApp or Email — they're the fastest to set up and will give you immediate value.</p>
            </div>
          </div>
        </> : <div className="flex-1 flex items-center justify-center"><p className="text-sm" style={{ color:B.dimmed }}>Select an article to edit</p></div>}
      </div>
    </div>
  );
}

// ─── 5. VOICE AI ─────────────────────────────────────────────────
export function VoiceAI() {
  const [activeCall, setActiveCall] = useState(true);
  const calls = [
    { name:"James Chen",    dur:"4:32", status:"completed", sentiment:"positive", outcome:"Resolved",  time:"2m ago" },
    { name:"Sarah Mitchell",dur:"8:14", status:"completed", sentiment:"negative", outcome:"Escalated", time:"12m ago" },
    { name:"Emma Rodriguez",dur:"2:11", status:"completed", sentiment:"positive", outcome:"Resolved",  time:"28m ago" },
    { name:"Michael Park",  dur:"11:03",status:"completed", sentiment:"negative", outcome:"Callback",  time:"45m ago" },
    { name:"Lisa Thompson", dur:"3:47", status:"completed", sentiment:"neutral",  outcome:"Resolved",  time:"1h ago" },
  ];
  const sentColor = { positive:B.success, neutral:B.slate, negative:B.pink } as Record<string,string>;
  const transcript = [
    { role:"ai",  text:"Hello! Thank you for calling OmniDesk AI support. I'm your AI assistant. How can I help you today?" },
    { role:"cust",text:"Hi, I'm having trouble accessing my enterprise account." },
    { role:"ai",  text:"I understand. Can I please have your account email address to look into this for you?" },
    { role:"cust",text:"Sure, it's james@globalventures.com" },
    { role:"ai",  text:"Thank you James. I can see your Enterprise account. It looks like your password was recently reset. Let me transfer you to our Enterprise support team who can assist further." },
  ];
  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      {/* Stats */}
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Voice AI Center</h1><p className="text-xs" style={{ color:B.dimmed }}>AI-powered call management · All queues</p></div>
        <PrimaryBtn small><Mic size={11}/>New Outbound Call</PrimaryBtn>
      </div>
      <div className="grid grid-cols-5 gap-3 mb-5">
        {[{l:"Active Calls",v:"3",c:"#EF4444"},{l:"Queue",v:"7",c:B.warning},{l:"Avg Duration",v:"4:32",c:B.primary},{l:"AI Resolved",v:"64%",c:B.success},{l:"CSAT (Calls)",v:"4.4",c:B.warning}].map(s=>(
          <GlassCard key={s.l} className="p-4 text-center">
            <p className="text-[10px] uppercase tracking-wide mb-1" style={{ color:B.dimmed }}>{s.l}</p>
            <p className="text-2xl font-extrabold" style={{ fontFamily:"'Poppins',sans-serif", color:s.c }}>{s.v}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Live call monitor */}
        <GlassCard className="p-4" style={{ borderColor:`${B.success}30`, background:`${B.success}05` }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full animate-pulse" style={{ background:"#EF4444" }}/><span className="text-xs font-bold" style={{ color:B.text }}>Live Call — James Chen</span></div>
            <div className="flex gap-2">
              <span className="text-xs font-mono px-2 py-px rounded" style={{ background:B.s2, color:B.primary }}>04:32</span>
              {activeCall && <button onClick={()=>setActiveCall(false)} className="h-6 px-2.5 rounded-lg text-[10px] font-semibold text-white" style={{ background:"#EF4444" }}>End Call</button>}
            </div>
          </div>
          {/* Waveform */}
          <div className="flex items-center gap-0.5 h-10 mb-3">
            {Array.from({length:40},(_,i)=>Math.random()*30+5).map((h,i)=>(
              <div key={i} className="w-1 rounded-full flex-1" style={{ height:`${h}px`, background:i%3===0?B.success:`${B.success}40`, maxWidth:6 }}/>
            ))}
          </div>
          <div className="space-y-2 max-h-36 overflow-y-auto" style={{ scrollbarWidth:"none" }}>
            {transcript.map((t,i)=>(
              <div key={i} className={`flex gap-2 ${t.role==="ai"?"":"flex-row-reverse"}`}>
                <div className="rounded-xl px-3 py-2 text-[11px] leading-relaxed max-w-xs" style={{ background:t.role==="ai"?`${B.purple}18`:B.s2, color:B.muted }}>{t.text}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t" style={{ borderColor:B.border }}>
            <Badge color={B.success}>Sentiment: Positive</Badge>
            <Badge color={B.primary}>Intent: Account Access</Badge>
          </div>
        </GlassCard>

        {/* IVR Builder preview */}
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold" style={{ color:B.text }}>IVR Configuration</p>
            <button className="text-[11px] font-semibold" style={{ color:B.primary }}>Edit IVR →</button>
          </div>
          <div className="space-y-2">
            {[
              { num:"1", label:"Billing & Payments",      icon:Package,  color:B.warning },
              { num:"2", label:"Technical Support",        icon:Cpu,      color:B.primary },
              { num:"3", label:"Account Management",       icon:User,     color:B.cyan },
              { num:"0", label:"Talk to Human Agent",      icon:Headphones,color:B.success },
              { num:"*", label:"Repeat Options",           icon:RefreshCw,color:B.slate },
            ].map(opt=>(
              <div key={opt.num} className="flex items-center gap-3 p-2.5 rounded-xl border" style={{ borderColor:B.border, background:"rgba(255,255,255,0.02)" }}>
                <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background:opt.color }}>{opt.num}</div>
                <opt.icon size={12} style={{ color:opt.color }}/>
                <span className="text-[11px]" style={{ color:B.muted }}>{opt.label}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Call history */}
      <GlassCard>
        <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor:B.border }}>
          <p className="text-sm font-semibold" style={{ color:B.text }}>Recent Calls</p>
          <button className="text-[11px]" style={{ color:B.primary }}>View all →</button>
        </div>
        <table className="w-full">
          <thead><tr className="border-b" style={{ borderColor:B.border }}>{["Caller","Duration","Sentiment","Outcome","Time","Actions"].map(h=><th key={h} className="text-left px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color:B.dimmed }}>{h}</th>)}</tr></thead>
          <tbody>
            {calls.map((c,i)=>(
              <tr key={i} className="border-b hover:bg-white/5 transition-colors" style={{ borderColor:B.border }}>
                <td className="px-5 py-3 text-xs font-semibold" style={{ color:B.text }}>{c.name}</td>
                <td className="px-5 py-3 text-xs font-mono" style={{ color:B.muted }}>{c.dur}</td>
                <td className="px-5 py-3"><div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full" style={{ background:sentColor[c.sentiment] }}/><span className="text-[11px] capitalize" style={{ color:sentColor[c.sentiment] }}>{c.sentiment}</span></div></td>
                <td className="px-5 py-3"><Badge color={c.outcome==="Resolved"?B.success:c.outcome==="Escalated"?"#EF4444":B.warning}>{c.outcome}</Badge></td>
                <td className="px-5 py-3 text-[11px]" style={{ color:B.dimmed }}>{c.time}</td>
                <td className="px-5 py-3"><button className="text-[11px]" style={{ color:B.primary }}>Recording</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}

// ─── 6. BILLING ──────────────────────────────────────────────────
export function AppBilling() {
  const [tab, setTab] = useState("overview");
  const invoices = [
    { inv:"INV-00899", date:"Jul 1, 2026",  amount:"$199.00", status:"Paid" },
    { inv:"INV-00856", date:"Jun 1, 2026",  amount:"$199.00", status:"Paid" },
    { inv:"INV-00812", date:"May 1, 2026",  amount:"$199.00", status:"Paid" },
    { inv:"INV-00768", date:"Apr 1, 2026",  amount:"$199.00", status:"Paid" },
    { inv:"INV-00724", date:"Mar 1, 2026",  amount:"$199.00", status:"Paid" },
    { inv:"INV-00680", date:"Feb 1, 2026",  amount:"$199.00", status:"Paid" },
  ];
  const usage = [
    { label:"Conversations",   used:3100, total:5000, color:B.primary },
    { label:"AI Credits",      used:8200, total:10000, color:B.purple },
    { label:"Storage",         used:12,   total:50,    color:B.cyan, unit:"GB" },
    { label:"Team Members",    used:8,    total:50,    color:B.success },
  ];
  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Billing & Subscription</h1><p className="text-xs" style={{ color:B.dimmed }}>Manage your plan, usage, and payment methods</p></div>
        <PrimaryBtn small><TrendingUp size={11}/>Upgrade Plan</PrimaryBtn>
      </div>
      <div className="flex gap-2 mb-6">
        {["overview","invoices","payment","usage"].map(t=><button key={t} onClick={()=>setTab(t)} className="px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-colors" style={{ background:tab===t?B.primary:`${B.primary}10`, color:tab===t?"#fff":B.muted }}>{t}</button>)}
      </div>

      {tab==="overview" && (<>
        {/* Plan card */}
        <div className="rounded-3xl p-6 mb-5 relative overflow-hidden" style={{ background:G.hero }}>
          <div className="absolute inset-0 opacity-20" style={{ background:`radial-gradient(ellipse at 30% 50%,rgba(255,255,255,0.3),transparent)` }}/>
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1">Current Plan</p>
              <h2 className="text-3xl font-extrabold text-white mb-1" style={{ fontFamily:"'Poppins',sans-serif" }}>Professional</h2>
              <p className="text-white/80 text-sm">$199/month · Billed annually · Renews Aug 1, 2026</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-extrabold text-white">$199<span className="text-sm font-normal text-white/70">/mo</span></div>
              <div className="text-xs text-white/60 mt-1">$2,388/year (save $480)</div>
            </div>
          </div>
          <div className="relative z-10 flex gap-3 mt-4">
            {["50 agents","All channels","Unlimited AI replies","SLA management","Priority support"].map(f=>(
              <span key={f} className="flex items-center gap-1 text-[11px] text-white/80"><Check size={10}/>  {f}</span>
            ))}
          </div>
        </div>
        {/* Usage meters */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {usage.map(u=>{
            const pct=Math.round((u.used/u.total)*100);
            return (
              <GlassCard key={u.label} className="p-4">
                <div className="flex justify-between mb-2">
                  <p className="text-xs font-semibold" style={{ color:B.text }}>{u.label}</p>
                  <p className="text-xs" style={{ color:B.dimmed }}>{u.used}{u.unit||""} / {u.total}{u.unit||""}</p>
                </div>
                <div className="h-2 rounded-full overflow-hidden mb-1.5" style={{ background:B.s2 }}>
                  <div className="h-full rounded-full transition-all" style={{ width:`${pct}%`, background:pct>85?"#EF4444":pct>70?B.warning:u.color }}/>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span style={{ color:B.dimmed }}>{pct}% used</span>
                  <span style={{ color:pct>85?"#EF4444":pct>70?B.warning:B.success }}>{pct>85?"Critical":pct>70?"High":"Healthy"}</span>
                </div>
              </GlassCard>
            );
          })}
        </div>
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background:`${B.purple}15` }}><Sparkles size={18} style={{ color:B.purple }}/></div>
            <div className="flex-1"><p className="text-sm font-semibold" style={{ color:B.text }}>AI Usage Forecast</p><p className="text-[11px] mt-0.5" style={{ color:B.muted }}>At current growth rate, you'll reach your AI credits limit in <span style={{ color:B.warning }}>14 days</span>. Consider upgrading to Business plan.</p></div>
            <PrimaryBtn small>Upgrade</PrimaryBtn>
          </div>
        </GlassCard>
      </>)}

      {tab==="invoices" && (
        <GlassCard>
          <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor:B.border }}>
            <p className="text-sm font-semibold" style={{ color:B.text }}>Invoice History</p>
            <button className="flex items-center gap-1.5 text-[11px]" style={{ color:B.primary }}><Download size={11}/>Download All</button>
          </div>
          <table className="w-full">
            <thead><tr className="border-b" style={{ borderColor:B.border }}>{["Invoice","Date","Amount","Status",""].map(h=><th key={h} className="text-left px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color:B.dimmed }}>{h}</th>)}</tr></thead>
            <tbody>
              {invoices.map(inv=>(
                <tr key={inv.inv} className="border-b hover:bg-white/5" style={{ borderColor:B.border }}>
                  <td className="px-5 py-3 text-xs font-mono" style={{ color:B.primary }}>{inv.inv}</td>
                  <td className="px-5 py-3 text-xs" style={{ color:B.muted }}>{inv.date}</td>
                  <td className="px-5 py-3 text-xs font-semibold" style={{ color:B.text }}>{inv.amount}</td>
                  <td className="px-5 py-3"><Badge color={B.success}>{inv.status}</Badge></td>
                  <td className="px-5 py-3"><button className="text-[11px] flex items-center gap-1" style={{ color:B.primary }}><Download size={10}/>PDF</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      )}

      {tab==="payment" && (
        <div className="max-w-lg space-y-4">
          <GlassCard className="p-5">
            <p className="text-sm font-semibold mb-4" style={{ color:B.text }}>Payment Methods</p>
            <div className="flex items-center gap-3 p-3 rounded-xl border mb-3" style={{ borderColor:`${B.primary}30`, background:`${B.primary}08` }}>
              <div className="w-10 h-7 rounded flex items-center justify-center flex-shrink-0 text-[10px] font-bold" style={{ background:B.primary, color:"#fff" }}>VISA</div>
              <div className="flex-1"><p className="text-xs font-semibold" style={{ color:B.text }}>Visa •••• 4291</p><p className="text-[10px]" style={{ color:B.dimmed }}>Expires 04/2028 · Default</p></div>
              <Badge color={B.success}>Default</Badge>
            </div>
            <button className="flex items-center gap-2 text-sm font-semibold" style={{ color:B.primary }}><Plus size={13}/>Add payment method</button>
          </GlassCard>
          <GlassCard className="p-5">
            <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>Billing Address</p>
            {[{l:"Company",v:"Nexus Technologies"},{l:"Email",v:"billing@nexustech.com"},{l:"Address",v:"340 Pine St, SF, CA 94104"},{l:"Tax ID",v:"US-123456789"}].map(f=>(
              <div key={f.l} className="flex justify-between py-2 border-b text-[11px]" style={{ borderColor:B.border }}>
                <span style={{ color:B.dimmed }}>{f.l}</span><span style={{ color:B.text }}>{f.v}</span>
              </div>
            ))}
          </GlassCard>
        </div>
      )}

      {tab==="usage" && (
        <div className="space-y-4">
          {usage.map(u=>{
            const pct=Math.round((u.used/u.total)*100);
            const weekData=[30,45,52,61,68,74,pct].map(v=>v/100*u.total);
            return (
              <GlassCard key={u.label} className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div><p className="text-sm font-semibold" style={{ color:B.text }}>{u.label}</p><p className="text-[11px]" style={{ color:B.dimmed }}>{u.used}{u.unit||""} of {u.total}{u.unit||""} used · {pct}%</p></div>
                  <span className="text-sm font-bold" style={{ color:pct>85?"#EF4444":pct>70?B.warning:u.color }}>{pct}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden mb-3" style={{ background:B.s2 }}>
                  <div className="h-full rounded-full" style={{ width:`${pct}%`, background:pct>85?"#EF4444":pct>70?B.warning:u.color }}/>
                </div>
                <SparkLine data={weekData} color={u.color} w={500} h={40}/>
                <p className="text-[10px] mt-1" style={{ color:B.dimmed }}>Usage this week (Mon–Sun)</p>
              </GlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── 7. SETTINGS ─────────────────────────────────────────────────
export function AppSettings() {
  const [sec, setSec] = useState("organization");
  const sections = [
    { id:"organization", label:"Organization",      icon:Building2 },
    { id:"workspace",    label:"Workspace",         icon:Settings },
    { id:"users",        label:"Users & Teams",     icon:Users },
    { id:"roles",        label:"Roles & Permissions",icon:Shield },
    { id:"channels",     label:"Channels",          icon:Globe },
    { id:"integrations", label:"Integrations",      icon:Webhook },
    { id:"api",          label:"API & Keys",        icon:Key },
    { id:"ai",           label:"AI Configuration",  icon:Sparkles },
    { id:"security",     label:"Security & SSO",    icon:Shield },
    { id:"notifications",label:"Notifications",     icon:Bell },
    { id:"billing2",     label:"Billing",           icon:Package },
    { id:"danger",       label:"Danger Zone",       icon:AlertCircle },
  ];
  const channels = [
    { name:"WhatsApp Business", status:"Connected",    color:"#25D366", icon:MessageCircle },
    { name:"Instagram",          status:"Connected",    color:"#E1306C", icon:Instagram },
    { name:"Gmail",              status:"Connected",    color:"#EA4335", icon:Mail },
    { name:"Telegram",           status:"Connected",    color:"#2CA5E0", icon:Send },
    { name:"Twitter/X",          status:"Disconnected", color:"#1DA1F2", icon:Twitter },
    { name:"LinkedIn",           status:"Disconnected", color:"#0A66C2", icon:Globe },
  ];
  return (
    <div className="flex h-full">
      <div className="w-52 border-r flex flex-col flex-shrink-0" style={{ borderColor:B.border, background:"#060C1A" }}>
        <div className="p-3 border-b" style={{ borderColor:B.border }}><p className="text-xs font-bold" style={{ color:B.text }}>Settings</p></div>
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto" style={{ scrollbarWidth:"none" }}>
          {sections.map(s=>(
            <button key={s.id} onClick={()=>setSec(s.id)} className="w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-[11px] font-medium transition-colors" style={{ background:sec===s.id?`${B.primary}15`:"transparent", color:sec===s.id?B.primary:B.dimmed }}>
              <s.icon size={13}/>{s.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
        {sec==="organization" && (
          <div className="max-w-xl">
            <h2 className="text-lg font-bold mb-5" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Organization Settings</h2>
            <GlassCard className="p-5 mb-4">
              <p className="text-sm font-semibold mb-4" style={{ color:B.text }}>Workspace</p>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white" style={{ background:G.hero }}>NT</div>
                <div><p className="text-sm font-bold" style={{ color:B.text }}>Nexus Technologies</p><button className="text-[11px] mt-1" style={{ color:B.primary }}>Upload logo</button></div>
              </div>
              <div className="space-y-3">
                {[{l:"Workspace Name",v:"Nexus Technologies"},{l:"Support Email",v:"support@nexustech.com"},{l:"Website",v:"nexustech.com"},{l:"Timezone",v:"(UTC-8) Pacific Time"},{l:"Language",v:"English (US)"},{l:"Currency",v:"USD"}].map(f=>(
                  <div key={f.l}>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color:B.dimmed }}>{f.l}</label>
                    <div className="h-9 px-3 rounded-xl border flex items-center text-xs" style={{ background:B.s2, borderColor:B.border, color:B.text }}>{f.v}</div>
                  </div>
                ))}
              </div>
              <PrimaryBtn className="mt-5">Save Changes</PrimaryBtn>
            </GlassCard>
          </div>
        )}
        {sec==="channels" && (
          <div className="max-w-xl">
            <h2 className="text-lg font-bold mb-5" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Connected Channels</h2>
            <div className="space-y-3">
              {channels.map(ch=>(
                <GlassCard key={ch.name} className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background:`${ch.color}18` }}><ch.icon size={18} style={{ color:ch.color }}/></div>
                  <div className="flex-1"><p className="text-sm font-semibold" style={{ color:B.text }}>{ch.name}</p><p className="text-[11px]" style={{ color:ch.status==="Connected"?B.success:B.dimmed }}>{ch.status}</p></div>
                  {ch.status==="Connected" ? (
                    <div className="flex gap-2"><button className="h-7 px-3 rounded-lg text-[11px] border" style={{ borderColor:B.border, color:B.muted }}>Configure</button><button className="h-7 px-3 rounded-lg text-[11px]" style={{ background:`${B.pink}15`, color:B.pink }}>Disconnect</button></div>
                  ) : (
                    <PrimaryBtn small>Connect</PrimaryBtn>
                  )}
                </GlassCard>
              ))}
            </div>
          </div>
        )}
        {sec==="danger" && (
          <div className="max-w-xl">
            <h2 className="text-lg font-bold mb-2" style={{ fontFamily:"'Poppins',sans-serif", color:"#EF4444" }}>Danger Zone</h2>
            <p className="text-sm mb-5" style={{ color:B.dimmed }}>These actions are irreversible. Please proceed with caution.</p>
            <div className="space-y-3">
              {[{a:"Export All Data",d:"Download all your workspace data as a ZIP archive",btn:"Export",c:B.warning},{a:"Pause Subscription",d:"Temporarily pause your plan — you'll lose access to all features",btn:"Pause",c:B.warning},{a:"Delete Workspace",d:"Permanently delete your workspace and all data. Cannot be undone.",btn:"Delete Workspace",c:"#EF4444"}].map(item=>(
                <GlassCard key={item.a} className="p-4 border-l-4 flex items-center justify-between" style={{ borderColor:item.c }}>
                  <div><p className="text-sm font-semibold" style={{ color:B.text }}>{item.a}</p><p className="text-[11px]" style={{ color:B.dimmed }}>{item.d}</p></div>
                  <button className="h-8 px-4 rounded-xl text-xs font-semibold flex-shrink-0 ml-4" style={{ background:`${item.c}18`, color:item.c, border:`1px solid ${item.c}30` }}>{item.btn}</button>
                </GlassCard>
              ))}
            </div>
          </div>
        )}
        {sec === "users" && (
          <div className="max-w-2xl">
            <h2 className="text-lg font-bold mb-5" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Users & Teams</h2>
            <div className="flex justify-between mb-3">
              <div className="flex items-center gap-2 h-8 px-3 rounded-lg flex-1 mr-2" style={{ background:B.s2, border:`1px solid ${B.border}` }}>
                <Search size={12} style={{ color:B.dimmed }}/><input className="flex-1 text-xs bg-transparent outline-none" placeholder="Search users…" style={{ color:B.text }}/>
              </div>
              <PrimaryBtn small><UserPlus size={11}/>Invite</PrimaryBtn>
            </div>
            <GlassCard className="overflow-hidden mb-4">
              <table className="w-full">
                <thead><tr className="border-b" style={{ borderColor:B.border }}>{["User","Role","Last active","Status",""].map(h=><th key={h} className="text-left px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color:B.dimmed }}>{h}</th>)}</tr></thead>
                <tbody>
                  {[{n:"Alex K.",r:"Admin",la:"Now",s:"Online",init:"AK"},{n:"Maya S.",r:"Manager",la:"5m",s:"Online",init:"MS"},{n:"David L.",r:"Agent",la:"1h",s:"Away",init:"DL"},{n:"Nina P.",r:"Agent",la:"2h",s:"Offline",init:"NP"}].map(u=>(
                    <tr key={u.n} className="border-b hover:bg-white/5" style={{ borderColor:B.border }}>
                      <td className="px-4 py-3"><div className="flex items-center gap-2.5"><div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background:G.hero }}>{u.init}</div><span className="text-xs font-semibold" style={{ color:B.text }}>{u.n}</span></div></td>
                      <td className="px-4 py-3"><Badge color={u.r==="Admin"?"#EF4444":u.r==="Manager"?B.warning:B.primary}>{u.r}</Badge></td>
                      <td className="px-4 py-3 text-xs" style={{ color:B.muted }}>{u.la} ago</td>
                      <td className="px-4 py-3"><span className="flex items-center gap-1 text-[11px]" style={{ color:u.s==="Online"?B.success:u.s==="Away"?B.warning:B.dimmed }}><span className="w-1.5 h-1.5 rounded-full" style={{ background:"currentColor" }}/>{u.s}</span></td>
                      <td className="px-4 py-3"><button className="text-[11px]" style={{ color:B.primary }}>Edit</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>
          </div>
        )}
        {sec === "integrations" && (
          <div className="max-w-xl">
            <h2 className="text-lg font-bold mb-5" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Integrations</h2>
            <div className="space-y-3">
              {[{n:"Salesforce CRM",s:"Connected",c:"#00A1E0",icon:"SF"},{n:"HubSpot",s:"Connected",c:"#FF7A59",icon:"HS"},{n:"Shopify",s:"Not connected",c:"#96BF48",icon:"SH"},{n:"Stripe",s:"Connected",c:"#6772E5",icon:"ST"},{n:"Zapier",s:"Not connected",c:"#FF4A00",icon:"ZP"},{n:"Slack",s:"Connected",c:"#4A154B",icon:"SL"}].map(i=>(
                <GlassCard key={i.n} className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0" style={{ background:i.c }}>{i.icon}</div>
                  <div className="flex-1"><p className="text-sm font-semibold" style={{ color:B.text }}>{i.n}</p><p className="text-[11px]" style={{ color:i.s==="Connected"?B.success:B.dimmed }}>{i.s}</p></div>
                  {i.s==="Connected" ? <button className="h-7 px-3 rounded-lg text-[11px] border" style={{ borderColor:B.border, color:B.muted }}>Configure</button> : <PrimaryBtn small>Connect</PrimaryBtn>}
                </GlassCard>
              ))}
            </div>
          </div>
        )}
        {sec === "api" && (
          <div className="max-w-xl">
            <h2 className="text-lg font-bold mb-5" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>API Keys</h2>
            <div className="flex justify-end mb-3"><PrimaryBtn small><Plus size={11}/>Create API Key</PrimaryBtn></div>
            <div className="space-y-3 mb-5">
              {[{n:"Production Key",k:"sk-omni-••••••••4291",sc:"Full access",d:"Created Jun 1"},
                {n:"Analytics Integration",k:"sk-omni-••••••••8821",sc:"Read-only",d:"Created May 15"},
                {n:"Webhook Listener",k:"sk-omni-••••••••3341",sc:"Webhooks only",d:"Created Apr 8"}].map(key=>(
                <GlassCard key={key.n} className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold" style={{ color:B.text }}>{key.n}</p>
                    <div className="flex gap-2"><button className="text-[11px]" style={{ color:B.primary }}>Rotate</button><button className="text-[11px]" style={{ color:"#EF4444" }}>Revoke</button></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs flex-1" style={{ color:B.muted, fontFamily:"'JetBrains Mono',monospace" }}>{key.k}</code>
                    <button style={{ color:B.dimmed }}><Copy size={11}/></button>
                  </div>
                  <div className="flex gap-3 mt-2 text-[10px]" style={{ color:B.dimmed }}><Badge color={B.primary}>{key.sc}</Badge><span>{key.d}</span></div>
                </GlassCard>
              ))}
            </div>
            <GlassCard className="p-4">
              <p className="text-sm font-semibold mb-2" style={{ color:B.text }}>Rate Limits</p>
              {[{p:"Production",v:"1,000 req/min"},{p:"Analytics",v:"100 req/min"},{p:"Webhooks",v:"Unlimited"}].map(r=>(
                <div key={r.p} className="flex justify-between py-1.5 border-b text-[11px]" style={{ borderColor:B.border }}><span style={{ color:B.dimmed }}>{r.p}</span><span style={{ color:B.text }}>{r.v}</span></div>
              ))}
            </GlassCard>
          </div>
        )}
        {sec === "ai" && (
          <div className="max-w-xl">
            <h2 className="text-lg font-bold mb-5" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>AI Configuration</h2>
            <GlassCard className="p-5 mb-4">
              <p className="text-sm font-semibold mb-4" style={{ color:B.text }}>AI Reply Assistant</p>
              <div className="space-y-4">
                {[{l:"AI model",v:"GPT-4o (Recommended)"},{l:"Language",v:"Auto-detect"},{l:"Tone",v:"Professional & Empathetic"},{l:"Max reply length",v:"350 words"},{l:"Auto-send threshold",v:"95% confidence"}].map(f=>(
                  <div key={f.l}>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color:B.dimmed }}>{f.l}</label>
                    <div className="h-9 px-3 rounded-xl border flex items-center text-xs" style={{ background:B.s2, borderColor:B.border, color:B.text }}>{f.v}<ChevronDown size={12} className="ml-auto" style={{ color:B.dimmed }}/></div>
                  </div>
                ))}
              </div>
            </GlassCard>
            <GlassCard className="p-5">
              <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>Knowledge Sources</p>
              {[{n:"Help Center articles",v:"284 articles indexed"},{n:"Past conversations",v:"13,874 conversations"},{n:"Product documentation",v:"Not connected"}].map(s=>(
                <div key={s.n} className="flex items-center justify-between py-2 border-b text-[11px]" style={{ borderColor:B.border }}>
                  <div><p style={{ color:B.text }}>{s.n}</p><p style={{ color:B.dimmed }}>{s.v}</p></div>
                  <div className="w-7 h-4 rounded-full flex items-center px-0.5" style={{ background:s.v.includes("Not")?B.s2:B.primary }}>
                    <div className="w-3 h-3 rounded-full bg-white shadow" style={{ marginLeft:s.v.includes("Not")?0:"auto" }}/>
                  </div>
                </div>
              ))}
            </GlassCard>
          </div>
        )}
        {sec === "notifications" && (
          <div className="max-w-xl">
            <h2 className="text-lg font-bold mb-5" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Notification Preferences</h2>
            <GlassCard className="p-5">
              <div className="space-y-4">
                {[
                  { cat:"Conversations", items:["New conversation assigned to me","Customer replied to my thread","SLA breach warning (30 min before)","New mention in conversation"] },
                  { cat:"Team & Admin",  items:["New team member joined","Workflow automation failed","Weekly performance digest","Security alerts"] },
                  { cat:"Billing",       items:["Invoice paid","Usage limit approaching (80%)","Subscription renewal reminder"] },
                ].map(group => (
                  <div key={group.cat}>
                    <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color:B.dimmed }}>{group.cat}</p>
                    {group.items.map(item => (
                      <div key={item} className="flex items-center justify-between py-2.5 border-b" style={{ borderColor:B.border }}>
                        <span className="text-sm" style={{ color:B.muted }}>{item}</span>
                        <div className="w-8 h-4 rounded-full flex items-center px-0.5" style={{ background:B.primary }}>
                          <div className="w-3 h-3 rounded-full bg-white shadow ml-auto"/>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <PrimaryBtn className="mt-5">Save Preferences</PrimaryBtn>
            </GlassCard>
          </div>
        )}
        {/* ── Workspace ── */}
        {sec==="workspace" && (
          <div className="max-w-xl">
            <h2 className="text-lg font-bold mb-5" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Workspace Settings</h2>
            <GlassCard className="p-5 mb-4">
              <p className="text-sm font-semibold mb-4" style={{ color:B.text }}>General</p>
              <div className="space-y-3">
                {[{l:"Workspace Name",v:"Nexus Technologies"},{l:"Support Email",v:"support@nexustech.com"},{l:"Default Language",v:"English (US)"},{l:"Timezone",v:"(UTC-8) Pacific Time"},{l:"Currency",v:"USD — US Dollar"},{l:"Date Format",v:"MM/DD/YYYY"},{l:"Business Hours",v:"Mon–Fri, 9 AM – 6 PM PT"}].map(f=>(
                  <div key={f.l}>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color:B.dimmed }}>{f.l}</label>
                    <div className="h-9 px-3 rounded-xl border flex items-center text-xs" style={{ background:B.s2, borderColor:B.border, color:B.text }}>{f.v}</div>
                  </div>
                ))}
              </div>
              <PrimaryBtn className="mt-5">Save Changes</PrimaryBtn>
            </GlassCard>
            <GlassCard className="p-5">
              <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>Conversation Settings</p>
              {[{l:"Auto-assign conversations",v:true},{l:"Show typing indicators",v:true},{l:"Enable read receipts",v:true},{l:"Allow agents to delete messages",v:false},{l:"Require notes before resolving",v:false}].map(f=>(
                <div key={f.l} className="flex items-center justify-between py-2.5 border-b" style={{ borderColor:B.border }}>
                  <span className="text-sm" style={{ color:B.muted }}>{f.l}</span>
                  <div className="w-8 h-4 rounded-full flex items-center px-0.5 cursor-pointer" style={{ background:f.v?B.primary:B.s2 }}>
                    <div className="w-3 h-3 rounded-full bg-white shadow" style={{ marginLeft:f.v?"auto":0 }}/>
                  </div>
                </div>
              ))}
            </GlassCard>
          </div>
        )}

        {/* ── Roles & Permissions ── */}
        {sec==="roles" && (
          <div className="max-w-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Roles & Permissions</h2>
              <PrimaryBtn small><Plus size={11}/>Create Role</PrimaryBtn>
            </div>
            <div className="space-y-3">
              {[
                { name:"Owner",   desc:"Full access to all settings and billing",  color:"#EF4444", perms:["All permissions","Billing","Delete workspace","Manage roles"] },
                { name:"Admin",   desc:"Manage workspace, team, and integrations",  color:B.warning, perms:["Manage users","Channels","Integrations","Analytics","Automations"] },
                { name:"Manager", desc:"Oversee agents and conversations",          color:B.primary, perms:["Assign conversations","Reports","Team views","Macros"] },
                { name:"Support", desc:"Handle conversations and use AI tools",     color:B.success, perms:["Reply to conversations","Use AI assistant","View CRM","Create contacts"] },
                { name:"Viewer",  desc:"Read-only access to conversations",         color:B.slate,   perms:["View conversations","View analytics","View contacts"] },
              ].map(role=>(
                <GlassCard key={role.name} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background:`${role.color}15`, color:role.color }}>{role.name}</span>
                      <p className="text-xs" style={{ color:B.muted }}>{role.desc}</p>
                    </div>
                    <button className="text-[11px]" style={{ color:B.primary }}>Edit</button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {role.perms.map(p=><span key={p} className="text-[10px] px-2 py-px rounded" style={{ background:B.s2, color:B.dimmed }}>{p}</span>)}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* ── Security & SSO ── */}
        {sec==="security" && (
          <div className="max-w-xl">
            <h2 className="text-lg font-bold mb-5" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Security & SSO</h2>
            <GlassCard className="p-5 mb-4">
              <p className="text-sm font-semibold mb-4" style={{ color:B.text }}>Single Sign-On (SSO)</p>
              {[{p:"Okta",s:"Connected",c:B.success},{p:"Microsoft Entra",s:"Connected",c:B.success},{p:"Google Workspace",s:"Not configured",c:B.slate},{p:"SAML 2.0 Custom",s:"Active",c:B.success}].map(s=>(
                <div key={s.p} className="flex items-center justify-between py-2.5 border-b" style={{ borderColor:B.border }}>
                  <span className="text-sm" style={{ color:B.text }}>{s.p}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold" style={{ color:s.c }}>{s.s}</span>
                    <button className="text-[11px] border px-2 py-px rounded-lg" style={{ borderColor:B.border, color:B.muted }}>{s.s==="Not configured"?"Configure":"Manage"}</button>
                  </div>
                </div>
              ))}
              <PrimaryBtn small className="mt-4">+ Add SSO Provider</PrimaryBtn>
            </GlassCard>
            <GlassCard className="p-5 mb-4">
              <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>Authentication Policies</p>
              {[{l:"Enforce MFA for all users",v:true},{l:"Allow social login (Google/GitHub)",v:true},{l:"Enforce SSO (disable password login)",v:false},{l:"Session timeout after inactivity",v:true},{l:"Require secure passwords (12+ chars)",v:true}].map(f=>(
                <div key={f.l} className="flex items-center justify-between py-2.5 border-b" style={{ borderColor:B.border }}>
                  <span className="text-sm" style={{ color:B.muted }}>{f.l}</span>
                  <div className="w-8 h-4 rounded-full flex items-center px-0.5 cursor-pointer" style={{ background:f.v?B.primary:B.s2 }}>
                    <div className="w-3 h-3 rounded-full bg-white shadow" style={{ marginLeft:f.v?"auto":0 }}/>
                  </div>
                </div>
              ))}
            </GlassCard>
            <GlassCard className="p-5">
              <p className="text-sm font-semibold mb-3" style={{ color:B.text }}>IP Restrictions</p>
              <p className="text-xs mb-3" style={{ color:B.dimmed }}>Restrict access to specific IP ranges. Leave empty to allow all.</p>
              <div className="h-9 px-3 rounded-xl border flex items-center text-xs mb-2" style={{ background:B.s2, borderColor:B.border, color:B.dimmed }}>192.168.1.0/24, 10.0.0.0/8</div>
              <p className="text-[11px]" style={{ color:B.success }}>✓ 2 IP ranges configured · Last login: 192.168.1.12</p>
            </GlassCard>
          </div>
        )}

        {/* ── Billing in Settings ── */}
        {sec==="billing2" && (
          <div className="max-w-xl">
            <h2 className="text-lg font-bold mb-5" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Billing & Subscription</h2>
            <div className="rounded-3xl p-6 mb-5 relative overflow-hidden" style={{ background:G.hero }}>
              <div className="absolute inset-0 opacity-20" style={{ background:`radial-gradient(ellipse at 30% 50%,rgba(255,255,255,0.3),transparent)` }}/>
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1">Current Plan</p>
                  <h2 className="text-3xl font-extrabold text-white mb-1" style={{ fontFamily:"'Poppins',sans-serif" }}>Professional</h2>
                  <p className="text-white/80 text-sm">$199/month · Billed annually · Renews Aug 1, 2026</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-white">$199<span className="text-sm font-normal text-white/70">/mo</span></div>
                  <div className="text-xs text-white/60 mt-1">$2,388/year (save $480)</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[{l:"Conversations",used:3100,total:5000,c:B.primary},{l:"AI Credits",used:8200,total:10000,c:B.purple},{l:"Team Members",used:8,total:50,c:B.success},{l:"Storage",used:12,total:50,c:B.cyan,u:"GB"}].map(u=>{
                const pct=Math.round((u.used/u.total)*100);
                return (
                  <GlassCard key={u.l} className="p-4">
                    <div className="flex justify-between mb-2 text-[11px]">
                      <span style={{ color:B.dimmed }}>{u.l}</span>
                      <span style={{ color:B.text }}>{u.used}{u.u||""}/{u.total}{u.u||""}</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background:B.s2 }}>
                      <div className="h-full rounded-full" style={{ width:`${pct}%`, background:pct>80?"#EF4444":pct>60?B.warning:u.c }}/>
                    </div>
                    <p className="text-[10px] mt-1" style={{ color:B.dimmed }}>{pct}% used</p>
                  </GlassCard>
                );
              })}
            </div>
            <div className="flex gap-2">
              <PrimaryBtn className="flex-1 justify-center"><TrendingUp size={13}/>Upgrade Plan</PrimaryBtn>
              <OutlineBtn className="flex-1 justify-center"><Download size={13}/>Download Invoice</OutlineBtn>
            </div>
          </div>
        )}

        {!["organization","workspace","users","roles","channels","danger","integrations","api","ai","notifications","security","billing2"].includes(sec) && (
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background:`${B.primary}12` }}><Settings size={18} style={{ color:B.primary }}/></div>
              <p className="text-sm font-semibold" style={{ color:B.text }}>{sections.find(s=>s.id===sec)?.label}</p>
              <p className="text-xs mt-1" style={{ color:B.dimmed }}>Settings for this section load here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── 8. AI INSIGHTS ──────────────────────────────────────────────
export function AppAIInsights() {
  const insights = [
    { cat:"Revenue Opportunity", icon:TrendingUp, color:B.success, conf:94, impact:"$8,200 potential", title:"James Chen — Enterprise upgrade ready", desc:"87 conversations, 4.8 CSAT, high engagement. Win probability 94%. Recommend: personalized call today with custom pricing.", action:"Draft Outreach", urgency:"high" },
    { cat:"Churn Risk",          icon:AlertCircle,color:"#EF4444",  conf:87, impact:"$36K ARR at risk", title:"Michael Park — Critical churn signal", desc:"Account locked for 3+ hours, 2 escalations this week, sentiment declining. Immediate action required to retain $36K Enterprise contract.", action:"Escalate Now",  urgency:"critical" },
    { cat:"Automation Gap",      icon:Zap,        color:B.warning,  conf:81, impact:"12h/week savings", title:"Shipping delay questions → automate", desc:"142 similar queries this week about delivery delays. Creating a WhatsApp automation could deflect 85% without human intervention.", action:"Build Automation", urgency:"medium" },
    { cat:"Agent Coaching",      icon:Users,      color:B.cyan,     conf:78, impact:"0.4 CSAT uplift", title:"Chris M. needs response time coaching", desc:"Avg response time 3.8min vs team avg 2.1min. Template library usage 12% vs team avg 68%. Focused training could improve CSAT from 4.5 → 4.9.", action:"View Report",   urgency:"medium" },
    { cat:"Knowledge Gap",       icon:BookOpen,   color:B.purple,   conf:72, impact:"800 tickets/month", title:"API documentation missing 8 topics", desc:"800+ conversations/month ask about Webhook setup, rate limits, and OAuth. Creating help articles could deflect 60% of developer tickets.", action:"Create Articles", urgency:"low" },
    { cat:"Sentiment Trend",     icon:Activity,   color:B.pink,     conf:69, impact:"Proactive opportunity", title:"Instagram sentiment rising +18%", desc:"Brand mentions on Instagram up 34% this week. 82% positive sentiment. Optimal time to launch a referral campaign and amplify social proof.", action:"View Mentions",  urgency:"low" },
  ];
  const urgencyBg = { critical:`${B.pink}15`, high:`${B.warning}12`, medium:`${B.primary}10`, low:`${B.purple}10` } as Record<string,string>;
  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>AI Insights</h1>
          <p className="text-xs" style={{ color:B.dimmed }}>Executive AI advisor · Updated 2 minutes ago · Analyzing 13,874 conversations</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 h-7 px-3 rounded-xl text-[11px] border" style={{ borderColor:B.border, color:B.muted }}><RefreshCw size={10}/>Refresh</button>
          <PrimaryBtn small><FileText size={11}/>Generate Report</PrimaryBtn>
        </div>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[{l:"Total Insights",v:"6",c:B.primary},{l:"Critical Alerts",v:"1",c:"#EF4444"},{l:"Revenue Opportunities",v:"$8.2K",c:B.success},{l:"Potential Time Saved",v:"12h/wk",c:B.purple}].map(s=>(
          <GlassCard key={s.l} className="p-4 text-center">
            <p className="text-[10px] uppercase tracking-wide mb-1" style={{ color:B.dimmed }}>{s.l}</p>
            <p className="text-2xl font-extrabold" style={{ fontFamily:"'Poppins',sans-serif", color:s.c }}>{s.v}</p>
          </GlassCard>
        ))}
      </div>

      {/* Insight cards */}
      <div className="grid grid-cols-2 gap-4">
        {insights.map((ins,i)=>(
          <GlassCard key={i} className="p-5 flex flex-col" style={{ borderColor:`${ins.color}20`, background:urgencyBg[ins.urgency] }}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:`${ins.color}18` }}><ins.icon size={15} style={{ color:ins.color }}/></div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color:ins.color }}>{ins.cat}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-semibold" style={{ color:B.dimmed }}>Confidence: </span>
                    <div className="flex items-center gap-1"><div className="w-16 h-1 rounded-full overflow-hidden" style={{ background:B.s2 }}><div className="h-full rounded-full" style={{ width:`${ins.conf}%`, background:ins.color }}/></div><span className="text-[10px] font-bold" style={{ color:ins.color }}>{ins.conf}%</span></div>
                  </div>
                </div>
              </div>
              <span className="text-[9px] font-bold px-2 py-px rounded-full capitalize" style={{ background:`${ins.color}20`, color:ins.color }}>{ins.urgency}</span>
            </div>
            <h3 className="text-sm font-bold mb-2" style={{ color:B.text }}>{ins.title}</h3>
            <p className="text-[11px] leading-relaxed flex-1 mb-3" style={{ color:B.muted }}>{ins.desc}</p>
            <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor:`${ins.color}20` }}>
              <span className="text-[11px] font-semibold" style={{ color:ins.color }}>Impact: {ins.impact}</span>
              <button className="flex items-center gap-1.5 h-7 px-3 rounded-xl text-[11px] font-semibold" style={{ background:`${ins.color}20`, color:ins.color }}>{ins.action}<ArrowRight size={10}/></button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

// ─── 9. EXECUTIVE REPORTS ────────────────────────────────────────
export function AppReports() {
  const [genOpen, setGenOpen] = useState(false);
  const templates = [
    { name:"Weekly Summary",    icon:BarChart3,  color:B.primary, desc:"Conversations, CSAT, agent performance" },
    { name:"Monthly Executive", icon:TrendingUp, color:B.success, desc:"Full executive overview with forecasts" },
    { name:"AI Usage Report",   icon:Sparkles,   color:B.purple,  desc:"AI accuracy, savings, automation ROI" },
    { name:"Customer Health",   icon:Users,      color:B.cyan,    desc:"Churn risk, NPS, LTV, retention" },
    { name:"Board Report",      icon:Building2,  color:B.warning, desc:"Investor-ready KPIs and growth metrics" },
    { name:"Custom Report",     icon:FileText,   color:B.pink,    desc:"Build your own with any data points" },
  ];
  const recent = [
    { name:"Weekly Summary — W26 2026",  date:"Jul 1",  pages:12, status:"Ready" },
    { name:"Monthly Executive — Jun 2026",date:"Jul 1",  pages:28, status:"Ready" },
    { name:"AI Usage — Jun 2026",         date:"Jun 30", pages:8,  status:"Ready" },
    { name:"Customer Health — Q2 2026",   date:"Jun 30", pages:18, status:"Ready" },
    { name:"Board Report — Q2 2026",      date:"Jun 28", pages:34, status:"Ready" },
  ];
  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Executive Reports</h1><p className="text-xs" style={{ color:B.dimmed }}>AI-generated business intelligence · Exportable to PDF, Excel, CSV</p></div>
        <PrimaryBtn small onClick={()=>setGenOpen(true)}><Sparkles size={11}/>Generate with AI</PrimaryBtn>
      </div>

      {genOpen && (
        <GlassCard className="p-5 mb-5" style={{ borderColor:`${B.purple}30`, background:`${B.purple}08` }}>
          <div className="flex items-center gap-2 mb-3"><Sparkles size={14} style={{ color:B.purple }}/><span className="text-sm font-semibold" style={{ color:B.text }}>Generate AI Report</span></div>
          <p className="text-[11px] mb-3" style={{ color:B.muted }}>Describe the report you need in plain English:</p>
          <div className="flex gap-2">
            <div className="flex-1 h-9 px-3 rounded-xl border flex items-center" style={{ background:B.s2, borderColor:B.border }}>
              <input className="flex-1 text-xs bg-transparent outline-none" placeholder="e.g. Monthly support performance with agent comparison and CSAT trend…" style={{ color:B.text }}/>
            </div>
            <PrimaryBtn small><Send size={11}/>Generate</PrimaryBtn>
            <button onClick={()=>setGenOpen(false)} className="h-9 w-9 flex items-center justify-center rounded-xl border" style={{ borderColor:B.border, color:B.dimmed }}><X size={13}/></button>
          </div>
        </GlassCard>
      )}

      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color:B.dimmed }}>Report Templates</p>
        <div className="grid grid-cols-3 gap-3">
          {templates.map(t=>(
            <GlassCard key={t.name} className="p-4 cursor-pointer hover:scale-[1.02] transition-transform flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:`${t.color}15` }}><t.icon size={16} style={{ color:t.color }}/></div>
              <div><p className="text-xs font-bold mb-0.5" style={{ color:B.text }}>{t.name}</p><p className="text-[10px]" style={{ color:B.dimmed }}>{t.desc}</p></div>
            </GlassCard>
          ))}
        </div>
      </div>

      <GlassCard>
        <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor:B.border }}>
          <p className="text-sm font-semibold" style={{ color:B.text }}>Recent Reports</p>
          <button className="flex items-center gap-1.5 h-7 px-3 rounded-xl text-[11px] border" style={{ borderColor:B.border, color:B.muted }}><Bell size={10}/>Schedule</button>
        </div>
        <table className="w-full">
          <thead><tr className="border-b" style={{ borderColor:B.border }}>{["Report","Date","Pages","Status","Actions"].map(h=><th key={h} className="text-left px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color:B.dimmed }}>{h}</th>)}</tr></thead>
          <tbody>
            {recent.map((r,i)=>(
              <tr key={i} className="border-b hover:bg-white/5" style={{ borderColor:B.border }}>
                <td className="px-5 py-3 text-xs font-semibold" style={{ color:B.text }}>{r.name}</td>
                <td className="px-5 py-3 text-xs" style={{ color:B.muted }}>{r.date}</td>
                <td className="px-5 py-3 text-xs" style={{ color:B.muted }}>{r.pages} pages</td>
                <td className="px-5 py-3"><Badge color={B.success}>{r.status}</Badge></td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <button className="text-[11px] flex items-center gap-1" style={{ color:B.primary }}><ExternalLink size={9}/>View</button>
                    <button className="text-[11px] flex items-center gap-1" style={{ color:B.muted }}><Download size={9}/>PDF</button>
                    <button className="text-[11px] flex items-center gap-1" style={{ color:B.muted }}><Send size={9}/>Email</button>
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

// ─── 10. AUDIT CENTER ────────────────────────────────────────────
export function AppAudit() {
  const events = [
    { user:"Alex K.",   action:"Enabled AI Auto-Reply for WhatsApp",      type:"AI Config",  ip:"192.168.1.12", time:"2m ago",  status:"Success" },
    { user:"Maya S.",   action:"Resolved conversation #2847 — Sarah M.",  type:"Inbox",      ip:"10.0.0.44",    time:"14m ago", status:"Success" },
    { user:"Admin",     action:"Created new team role: Senior Agent",      type:"Admin",      ip:"192.168.1.1",  time:"1h ago",  status:"Success" },
    { user:"API",       action:"Webhook triggered: ShopifyOrderCreated",   type:"API",        ip:"54.92.1.100",  time:"1h ago",  status:"Success" },
    { user:"Unknown",   action:"Failed login attempt — 3 times in 5 min", type:"Security",   ip:"45.33.32.156", time:"2h ago",  status:"Blocked" },
    { user:"David L.",  action:"Exported contacts CSV — 6,241 records",   type:"Data",       ip:"10.0.0.31",    time:"3h ago",  status:"Success" },
    { user:"Alex K.",   action:"Connected LinkedIn channel",               type:"Integration",ip:"192.168.1.12", time:"4h ago",  status:"Success" },
    { user:"System",    action:"Automated backup completed — 2.4 GB",     type:"System",     ip:"localhost",    time:"6h ago",  status:"Success" },
    { user:"Admin",     action:"SSO configuration updated — Okta",        type:"Security",   ip:"192.168.1.1",  time:"8h ago",  status:"Success" },
    { user:"API",       action:"Rate limit hit — 1,000 req/min exceeded", type:"API",        ip:"54.92.1.100",  time:"9h ago",  status:"Warning" },
  ];
  const typeColor: Record<string,string> = { "AI Config":B.purple, Inbox:B.primary, Admin:B.warning, API:B.cyan, Security:"#EF4444", Data:B.success, Integration:B.pink, System:B.slate };
  const statusColor: Record<string,string> = { Success:B.success, Blocked:"#EF4444", Warning:B.warning };
  const [filter, setFilter] = useState("All");
  const types = ["All","AI Config","Inbox","Admin","API","Security","Data","Integration","System"];
  const filtered = filter==="All" ? events : events.filter(e=>e.type===filter);
  return (
    <div className="h-full overflow-y-auto px-6 py-5" style={{ scrollbarWidth:"none" }}>
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-lg font-bold" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Audit Center</h1><p className="text-xs" style={{ color:B.dimmed }}>Complete activity log · All users, all events · 30-day retention</p></div>
        <button className="flex items-center gap-1.5 h-7 px-3 rounded-xl text-[11px] border" style={{ borderColor:B.border, color:B.muted }}><Download size={10}/>Export Log</button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[{l:"Events today",v:"284",c:B.primary},{l:"Security alerts",v:"1",c:"#EF4444"},{l:"API calls",v:"12,841",c:B.cyan},{l:"Active users",v:"8",c:B.success}].map(s=>(
          <GlassCard key={s.l} className="p-4 text-center">
            <p className="text-[10px] uppercase tracking-wide mb-1" style={{ color:B.dimmed }}>{s.l}</p>
            <p className="text-2xl font-extrabold" style={{ fontFamily:"'Poppins',sans-serif", color:s.c }}>{s.v}</p>
          </GlassCard>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {types.map(t=><button key={t} onClick={()=>setFilter(t)} className="px-3 py-1.5 rounded-full text-[11px] font-semibold transition-colors" style={{ background:filter===t?(typeColor[t]||B.primary):`${B.primary}10`, color:filter===t?"#fff":B.dimmed }}>{t}</button>)}
      </div>

      <GlassCard className="overflow-hidden">
        <table className="w-full">
          <thead className="sticky top-0" style={{ background:"rgba(12,18,34,0.95)", backdropFilter:"blur(8px)" }}>
            <tr className="border-b" style={{ borderColor:B.border }}>
              {["User","Action","Type","IP Address","Time","Status"].map(h=><th key={h} className="text-left px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color:B.dimmed }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map((ev,i)=>(
              <tr key={i} className="border-b hover:bg-white/5 transition-colors cursor-pointer" style={{ borderColor:B.border }}>
                <td className="px-5 py-3 text-xs font-semibold" style={{ color:B.text }}>{ev.user}</td>
                <td className="px-5 py-3 text-xs" style={{ color:B.muted }}>{ev.action}</td>
                <td className="px-5 py-3"><span className="text-[10px] px-2 py-px rounded-full font-semibold" style={{ background:`${typeColor[ev.type]||B.slate}18`, color:typeColor[ev.type]||B.slate }}>{ev.type}</span></td>
                <td className="px-5 py-3 text-xs font-mono" style={{ color:B.dimmed }}>{ev.ip}</td>
                <td className="px-5 py-3 text-xs" style={{ color:B.dimmed }}>{ev.time}</td>
                <td className="px-5 py-3"><Badge color={statusColor[ev.status]||B.slate}>{ev.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}

// ─── CORE APP ROOT ────────────────────────────────────────────────
function CoreApp({ onSignOut }: { onSignOut:()=>void }) {
  const [screen, setScreen] = useState<AppScreen>("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [customer360, setCustomer360] = useState<string|null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if ((e.metaKey||e.ctrlKey) && e.key==="k") { e.preventDefault(); setCmdOpen(p=>!p); }};
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (customer360) {
    return (
      <div className="flex h-screen w-screen overflow-hidden" style={{ background:B.bg, color:B.text, fontFamily:"'Inter',sans-serif" }}>
        <AppSidebar screen={screen} setScreen={s=>{setScreen(s);setCustomer360(null);}} collapsed={collapsed} onToggle={()=>setCollapsed(p=>!p)}/>
        <div className="flex flex-col flex-1 min-w-0">
          <AppTopBar screen={screen} onCmd={()=>setCmdOpen(true)} onNotif={()=>setNotifOpen(p=>!p)} onSignOut={onSignOut}/>
          <main className="flex-1 overflow-hidden"><Customer360 id={customer360} onBack={()=>setCustomer360(null)}/></main>
        </div>
        <CommandPalette open={cmdOpen} onClose={()=>setCmdOpen(false)} setScreen={s=>{setScreen(s);setCustomer360(null);}}/>
        <NotifPanel open={notifOpen} onClose={()=>setNotifOpen(false)}/>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden" style={{ background:B.bg, color:B.text, fontFamily:"'Inter',sans-serif" }}>
      <AppSidebar screen={screen} setScreen={setScreen} collapsed={collapsed} onToggle={()=>setCollapsed(p=>!p)}/>
      <div className="flex flex-col flex-1 min-w-0">
        <AppTopBar screen={screen} onCmd={()=>setCmdOpen(true)} onNotif={()=>setNotifOpen(p=>!p)} onSignOut={onSignOut}/>
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
          {screen==="settings"   && <AppSettings/>}
        </main>
      </div>
      <CommandPalette open={cmdOpen} onClose={()=>setCmdOpen(false)} setScreen={setScreen}/>
      <NotifPanel open={notifOpen} onClose={()=>setNotifOpen(false)}/>
    </div>
  );
}

