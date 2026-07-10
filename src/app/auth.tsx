import React, { useState, useRef } from "react";
import {
  Eye, EyeOff, RefreshCw, Copy, Upload, AlertCircle,
  Key, Smartphone, Loader2, PartyPopper, Link2, UserPlus,
  Settings, LayoutDashboard, Mail, Lock, Globe, Building2,
  Check, Plus, X, ArrowRight, ChevronDown, Shield, Phone,
  Sparkles, Send, Users, MessageCircle, Zap, BookOpen, Mic,
  Star, MessageSquare, Instagram, Twitter, CheckCircle2,
  ChevronRight, Hash, Headphones, Activity, User
} from "lucide-react";
import { B, G, gradText, AuthScreen, AppScreen, GlassCard, PrimaryBtn, OutlineBtn, Avatar, OmniDeskLogo } from "./shared";

// ═══════════════════════════════════════════════════════════════════
// AUTH & ONBOARDING SYSTEM
// ═══════════════════════════════════════════════════════════════════

type AuthScreen =
  | "landing" | "login" | "register" | "verify" | "forgot" | "reset" | "2fa"
  | "ob-workspace" | "ob-invite" | "ob-channels" | "ob-ai" | "ob-complete";

// ─── SHARED AUTH HELPERS ─────────────────────────────────────────
function AuthInput({ label, type = "text", placeholder, value, onChange, icon, right }: {
  label: string; type?: string; placeholder?: string;
  value: string; onChange: (v: string) => void;
  icon?: React.ReactNode; right?: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-widest mb-1.5" style={{ color:B.dimmed }}>{label}</label>
      <div className="flex items-center gap-2 h-11 px-3 rounded-xl border transition-colors focus-within:border-opacity-60" style={{ background:B.s2, borderColor:B.border }}>
        {icon && <span style={{ color:B.dimmed }}>{icon}</span>}
        <input type={type} placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)}
          className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-40" style={{ color:B.text }} />
        {right}
      </div>
    </div>
  );
}

function SocialBtn({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center justify-center gap-2.5 h-10 rounded-xl text-xs font-medium w-full border transition-all hover:bg-white/5" style={{ background:"rgba(255,255,255,0.03)", borderColor:B.border, color:B.muted }}>
      {icon}<span>{label}</span>
    </button>
  );
}

function Divider({ label = "or" }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px" style={{ background:B.border }} />
      <span className="text-[11px]" style={{ color:B.dimmed }}>{label}</span>
      <div className="flex-1 h-px" style={{ background:B.border }} />
    </div>
  );
}

function PasswordStrength({ password }: { password: string }) {
  const checks = [password.length >= 8, /[A-Z]/.test(password), /[0-9]/.test(password), /[^A-Za-z0-9]/.test(password)];
  const score = checks.filter(Boolean).length;
  const colors = ["", "#EF4444", "#F59E0B", "#06B6D4", "#10B981"];
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  if (!password) return null;
  return (
    <div className="mt-1.5">
      <div className="flex gap-1 mb-1">
        {[1,2,3,4].map(i => (
          <div key={i} className="h-1 flex-1 rounded-full transition-all" style={{ background: i <= score ? colors[score] : B.s2 }} />
        ))}
      </div>
      <p className="text-[10px]" style={{ color: colors[score] }}>{labels[score]}</p>
    </div>
  );
}

// ─── BRAND PANEL ─────────────────────────────────────────────────
export function BrandPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between p-10 relative overflow-hidden" style={{ background:`linear-gradient(160deg,#0D1535 0%,#0B1021 50%,#0A1628 100%)`, minHeight:"100vh", width:"42%" }}>
      <div className="absolute inset-0" style={{ background:`radial-gradient(ellipse at 10% 20%,rgba(79,70,229,0.22) 0%,transparent 55%),radial-gradient(ellipse at 90% 80%,rgba(6,182,212,0.14) 0%,transparent 50%)` }} />
      <div className="relative z-10">
        <div className="mb-16"><OmniDeskLogo iconSize={36} textClass="text-base"/></div>
        <h2 className="text-3xl font-bold leading-tight mb-4" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>
          One Inbox.<br />
          <span style={gradText(`linear-gradient(90deg,#A5B4FC,#67E8F9)`)}>Every Conversation.</span><br />
          Powered by AI.
        </h2>
        <p className="text-sm leading-relaxed mb-10" style={{ color:B.muted }}>Join 2,400+ businesses using OmniDesk AI to deliver faster, smarter customer support across 15+ channels.</p>

        {/* Mini inbox preview */}
        <div className="rounded-2xl border overflow-hidden" style={{ background:"rgba(15,22,48,0.8)", borderColor:B.border, boxShadow:`0 20px 60px rgba(79,70,229,0.2)` }}>
          <div className="flex items-center gap-1.5 px-3 py-2 border-b" style={{ borderColor:B.border }}>
            {["#EF4444","#F59E0B","#10B981"].map(c=><div key={c} className="w-2 h-2 rounded-full" style={{ background:c }}/>)}
            <span className="text-[10px] ml-2 font-medium" style={{ color:B.dimmed }}>Unified Inbox</span>
          </div>
          <div className="flex">
            <div className="w-36 border-r" style={{ borderColor:B.border }}>
              {[
                { name:"Sarah M.",  ch:"WhatsApp", color:"#25D366", unread:3, t:"2m" },
                { name:"James C.",  ch:"Email",    color:B.primary, unread:1, t:"8m" },
                { name:"Emma R.",   ch:"Instagram",color:"#E1306C", unread:0, t:"14m" },
              ].map((c,i)=>(
                <div key={i} className="px-3 py-2.5 border-b flex gap-2 items-start" style={{ borderColor:B.border, background:i===0?`${B.primary}10`:"transparent" }}>
                  <div className="w-5 h-5 rounded-full flex-shrink-0 text-[8px] font-bold text-white flex items-center justify-center mt-0.5" style={{ background:c.color }}>
                    {c.name.split(" ").map(n=>n[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-semibold truncate" style={{ color:B.text }}>{c.name}</p>
                    <p className="text-[8px]" style={{ color:B.dimmed }}>{c.ch} · {c.t}</p>
                  </div>
                  {c.unread>0 && <span className="text-[7px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 text-white" style={{ background:B.primary }}>{c.unread}</span>}
                </div>
              ))}
            </div>
            <div className="flex-1 p-3 space-y-2">
              <div className="px-2.5 py-1.5 rounded-xl text-[9px]" style={{ background:B.s2, color:B.muted }}>My order hasn't arrived yet! 😤</div>
              <div className="px-2.5 py-1.5 rounded-xl text-[9px] text-white ml-4" style={{ background:G.hero }}>So sorry Sarah! Replacement shipped overnight ✓</div>
              <div className="rounded-xl p-2 border" style={{ background:`${B.purple}12`, borderColor:`${B.purple}22` }}>
                <div className="flex items-center gap-1 mb-0.5"><Sparkles size={7} style={{ color:B.purple }}/><span className="text-[8px] font-semibold" style={{ color:B.purple }}>AI Suggestion</span></div>
                <p className="text-[8px]" style={{ color:B.muted }}>Offer 20% credit — Premium member, 3yr history</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex gap-4 mb-6">
          {[{v:"2,400+",l:"Businesses"},{v:"4.9★",l:"CSAT Avg"},{v:"<3min",l:"Avg Response"}].map(s=>(
            <div key={s.l} className="text-center">
              <p className="text-sm font-extrabold" style={{ fontFamily:"'Poppins',sans-serif", ...gradText(G.brand) }}>{s.v}</p>
              <p className="text-[10px]" style={{ color:B.dimmed }}>{s.l}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-4 border" style={{ background:"rgba(255,255,255,0.03)", borderColor:B.border }}>
          <div className="flex gap-0.5 mb-2">{[1,2,3,4,5].map(i=><Star key={i} size={10} fill={B.warning} style={{ color:B.warning }}/>)}</div>
          <p className="text-xs leading-relaxed mb-2" style={{ color:B.muted }}>"Cut our response time from 4 hours to 18 minutes on day one."</p>
          <p className="text-[10px] font-semibold" style={{ color:B.text }}>Sarah Chen · VP Support, Nexus Technologies</p>
        </div>
      </div>
    </div>
  );
}

// ─── ONBOARDING PROGRESS BAR ─────────────────────────────────────
const OB_STEPS = [
  { id:"ob-workspace", label:"Workspace" },
  { id:"ob-invite",    label:"Team" },
  { id:"ob-channels",  label:"Channels" },
  { id:"ob-ai",        label:"AI Setup" },
  { id:"ob-complete",  label:"Launch" },
];

function OnboardingProgress({ screen, onBack }: { screen: AuthScreen; onBack: () => void }) {
  const idx = OB_STEPS.findIndex(s => s.id === screen);
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor:B.border }}>
      <div><OmniDeskLogo iconSize={28} textClass="text-xs"/></div>
      <div className="flex items-center gap-1">
        {OB_STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-1">
            <div className="flex items-center gap-1.5">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${i <= idx ? "text-white" : ""}`} style={{ background: i < idx ? B.success : i === idx ? B.primary : B.s2 }}>
                {i < idx ? <Check size={9}/> : i+1}
              </div>
              <span className="text-[11px] hidden sm:block" style={{ color: i === idx ? B.text : B.dimmed }}>{s.label}</span>
            </div>
            {i < OB_STEPS.length - 1 && <ChevronRight size={11} style={{ color:B.dimmed }} />}
          </div>
        ))}
      </div>
      <button onClick={onBack} className="text-xs" style={{ color:B.dimmed }}>Save & exit</button>
    </div>
  );
}

// ─── AUTH SCREENS ─────────────────────────────────────────────────

function AuthLanding({ setScreen }: { setScreen: (s: AuthScreen) => void }) {
  const oauthProviders = [
    { label:"Continue with Google",    icon:<svg viewBox="0 0 24 24" className="w-4 h-4" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> },
    { label:"Continue with Microsoft", icon:<svg viewBox="0 0 24 24" className="w-4 h-4"><rect x="1" y="1" width="10" height="10" fill="#F25022"/><rect x="13" y="1" width="10" height="10" fill="#7FBA00"/><rect x="1" y="13" width="10" height="10" fill="#00A4EF"/><rect x="13" y="13" width="10" height="10" fill="#FFB900"/></svg> },
    { label:"Continue with GitHub",    icon:<svg viewBox="0 0 24 24" className="w-4 h-4" fill="#fff"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg> },
    { label:"Continue with LinkedIn",  icon:<svg viewBox="0 0 24 24" className="w-4 h-4" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  ];
  return (
    <div className="flex-1 flex flex-col justify-center px-8 py-10 max-w-md mx-auto w-full">
      <h1 className="text-2xl font-bold mb-1" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Get started for free</h1>
      <p className="text-sm mb-8" style={{ color:B.muted }}>14-day trial · No credit card · Cancel anytime</p>
      <div className="flex gap-3 mb-6">
        <PrimaryBtn onClick={() => setScreen("register")} className="flex-1 justify-center"><UserPlus size={14} />Create account</PrimaryBtn>
        <OutlineBtn onClick={() => setScreen("login")} className="flex-1 justify-center">Log in</OutlineBtn>
      </div>
      <Divider />
      <div className="space-y-2.5 mb-6">
        {oauthProviders.map(p => <SocialBtn key={p.label} icon={p.icon} label={p.label} onClick={() => setScreen("ob-workspace")} />)}
      </div>
      <div className="text-center">
        <button className="text-xs flex items-center gap-1.5 mx-auto" style={{ color:B.primary }}>
          <Building2 size={12} />Enterprise SSO / SAML
        </button>
      </div>
      <p className="text-[10px] text-center mt-8" style={{ color:B.dimmed }}>By continuing, you agree to our <button className="underline">Terms</button> and <button className="underline">Privacy Policy</button></p>
    </div>
  );
}

function LoginScreen({ setScreen }: { setScreen: (s: AuthScreen) => void }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setScreen("2fa"); }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col justify-center px-8 py-10 max-w-md mx-auto w-full">
      <h1 className="text-2xl font-bold mb-1" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Welcome back</h1>
      <p className="text-sm mb-8" style={{ color:B.muted }}>Sign in to your OmniDesk AI workspace</p>
      <div className="space-y-4 mb-5">
        <AuthInput label="Work email" type="email" placeholder="you@company.com" value={email} onChange={setEmail} icon={<Mail size={14}/>} />
        <div>
          <AuthInput label="Password" type={show?"text":"password"} placeholder="••••••••" value={pass} onChange={setPass} icon={<Lock size={14}/>}
            right={<button type="button" onClick={()=>setShow(!show)} style={{ color:B.dimmed }}>{show?<EyeOff size={14}/>:<Eye size={14}/>}</button>} />
          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="w-3.5 h-3.5 rounded border flex items-center justify-center" style={{ borderColor:B.border }}>
                <Check size={9} style={{ color:B.primary }} />
              </div>
              <span className="text-[11px]" style={{ color:B.muted }}>Remember me</span>
            </label>
            <button onClick={() => setScreen("forgot")} className="text-[11px]" style={{ color:B.primary }}>Forgot password?</button>
          </div>
        </div>
      </div>
      <button onClick={submit} disabled={loading} className="w-full h-11 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 mb-4 transition-opacity hover:opacity-90" style={{ background:G.hero }}>
        {loading ? <><Loader2 size={14} className="animate-spin"/>Signing in…</> : <>Sign in<ArrowRight size={14}/></>}
      </button>
      <Divider />
      <div className="space-y-2.5 mb-6">
        {[
          { label:"Continue with Google",    icon:<svg viewBox="0 0 24 24" className="w-4 h-4" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> },
          { label:"Continue with Microsoft", icon:<svg viewBox="0 0 24 24" className="w-4 h-4"><rect x="1" y="1" width="10" height="10" fill="#F25022"/><rect x="13" y="1" width="10" height="10" fill="#7FBA00"/><rect x="1" y="13" width="10" height="10" fill="#00A4EF"/><rect x="13" y="13" width="10" height="10" fill="#FFB900"/></svg> },
        ].map(p => <SocialBtn key={p.label} icon={p.icon} label={p.label} onClick={() => setScreen("ob-workspace")} />)}
      </div>
      <p className="text-xs text-center" style={{ color:B.dimmed }}>No account? <button onClick={() => setScreen("register")} className="font-semibold" style={{ color:B.primary }}>Sign up free</button></p>
    </div>
  );
}

function RegisterScreen({ setScreen }: { setScreen: (s: AuthScreen) => void }) {
  const [step, setStep] = useState(1);
  const [f, setF] = useState({ first:"", last:"", email:"", pass:"", company:"", industry:"", size:"", country:"" });
  const upd = (k: string, v: string) => setF(p => ({ ...p, [k]:v }));
  const [show, setShow] = useState(false);

  return (
    <div className="flex-1 flex flex-col justify-center px-8 py-10 max-w-md mx-auto w-full">
      <div className="flex items-center gap-2 mb-6">
        {[1,2].map(i => <div key={i} className={`h-1 flex-1 rounded-full transition-all`} style={{ background: i <= step ? B.primary : B.s2 }} />)}
      </div>
      <h1 className="text-2xl font-bold mb-1" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>
        {step === 1 ? "Create your account" : "About your business"}
      </h1>
      <p className="text-sm mb-7" style={{ color:B.muted }}>
        {step === 1 ? "Start your 14-day free trial — no credit card required" : "Help us personalize your experience"}
      </p>
      {step === 1 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <AuthInput label="First name" placeholder="Alex" value={f.first} onChange={v=>upd("first",v)} icon={<User size={13}/>} />
            <AuthInput label="Last name"  placeholder="Kowalski" value={f.last} onChange={v=>upd("last",v)} />
          </div>
          <AuthInput label="Work email" type="email" placeholder="alex@company.com" value={f.email} onChange={v=>upd("email",v)} icon={<Mail size={13}/>} />
          <div>
            <AuthInput label="Password" type={show?"text":"password"} placeholder="Min 8 characters" value={f.pass} onChange={v=>upd("pass",v)} icon={<Lock size={13}/>}
              right={<button type="button" onClick={()=>setShow(!show)} style={{ color:B.dimmed }}>{show?<EyeOff size={13}/>:<Eye size={13}/>}</button>} />
            <PasswordStrength password={f.pass} />
          </div>
          <button onClick={() => setStep(2)} className="w-full h-11 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90" style={{ background:G.hero }}>
            Continue<ArrowRight size={14}/>
          </button>
          <Divider />
          <SocialBtn icon={<svg viewBox="0 0 24 24" className="w-4 h-4" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>} label="Continue with Google" onClick={() => setScreen("ob-workspace")} />
        </div>
      ) : (
        <div className="space-y-4">
          <AuthInput label="Company name" placeholder="Nexus Technologies" value={f.company} onChange={v=>upd("company",v)} icon={<Building2 size={13}/>} />
          {[
            { label:"Industry", key:"industry", opts:["E-commerce","SaaS/Tech","Healthcare","Education","Agency","Finance","Retail","Other"] },
            { label:"Company size", key:"size", opts:["1–5","6–20","21–100","101–500","500+"] },
            { label:"Country", key:"country", opts:["United States","United Kingdom","Canada","Australia","Germany","India","Singapore","Other"] },
          ].map(sel => (
            <div key={sel.key}>
              <label className="block text-[11px] font-bold uppercase tracking-widest mb-1.5" style={{ color:B.dimmed }}>{sel.label}</label>
              <div className="h-11 px-3 rounded-xl border flex items-center" style={{ background:B.s2, borderColor:B.border }}>
                <select value={(f as Record<string,string>)[sel.key]} onChange={e=>upd(sel.key,e.target.value)} className="flex-1 bg-transparent text-sm outline-none appearance-none" style={{ color: (f as Record<string,string>)[sel.key] ? B.text : B.dimmed }}>
                  <option value="">Select…</option>
                  {sel.opts.map(o=><option key={o} value={o} style={{ background:B.surface }}>{o}</option>)}
                </select>
                <ChevronDown size={13} style={{ color:B.dimmed }} />
              </div>
            </div>
          ))}
          <label className="flex items-start gap-2.5 cursor-pointer mt-2">
            <div className="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background:`${B.primary}30`, borderColor:B.primary }}>
              <Check size={9} style={{ color:B.primary }} />
            </div>
            <span className="text-[11px] leading-relaxed" style={{ color:B.muted }}>I agree to the <button className="underline" style={{ color:B.primary }}>Terms of Service</button> and <button className="underline" style={{ color:B.primary }}>Privacy Policy</button></span>
          </label>
          <div className="flex gap-3 pt-2">
            <OutlineBtn onClick={() => setStep(1)} className="flex-1 justify-center h-11"><ArrowRight size={13} className="rotate-180"/>Back</OutlineBtn>
            <button onClick={() => setScreen("verify")} className="flex-1 h-11 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90" style={{ background:G.hero }}>
              Create account<ArrowRight size={14}/>
            </button>
          </div>
        </div>
      )}
      <p className="text-xs text-center mt-5" style={{ color:B.dimmed }}>Already have an account? <button onClick={() => setScreen("login")} className="font-semibold" style={{ color:B.primary }}>Sign in</button></p>
    </div>
  );
}

function VerifyEmailScreen({ setScreen }: { setScreen: (s: AuthScreen) => void }) {
  const [code, setCode] = useState(["","","","","",""]);
  const refs = Array.from({ length:6 }, () => useRef<HTMLInputElement>(null));
  const handleKey = (i: number, v: string) => {
    if (v.length > 1) return;
    const n = [...code]; n[i] = v; setCode(n);
    if (v && i < 5) refs[i+1].current?.focus();
  };
  return (
    <div className="flex-1 flex flex-col justify-center px-8 py-10 max-w-sm mx-auto w-full text-center">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background:`${B.primary}15` }}>
        <Mail size={28} style={{ color:B.primary }} />
      </div>
      <h1 className="text-2xl font-bold mb-2" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Check your email</h1>
      <p className="text-sm mb-8" style={{ color:B.muted }}>We sent a 6-digit verification code to <span style={{ color:B.text }}>alex@company.com</span></p>
      <div className="flex gap-2 justify-center mb-6">
        {code.map((v, i) => (
          <input key={i} ref={refs[i]} maxLength={1} value={v} onChange={e=>handleKey(i,e.target.value)}
            className="w-11 h-13 text-center text-lg font-bold rounded-xl border-2 outline-none transition-colors bg-transparent"
            style={{ borderColor: v ? B.primary : B.border, color:B.text, height:52 }} />
        ))}
      </div>
      <button onClick={() => setScreen("ob-workspace")} className="w-full h-11 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 mb-4 transition-opacity hover:opacity-90" style={{ background:G.hero }}>
        Verify email<ArrowRight size={14}/>
      </button>
      <button className="flex items-center gap-1.5 mx-auto text-xs" style={{ color:B.muted }}><RefreshCw size={11}/>Resend code (0:59)</button>
    </div>
  );
}

function ForgotScreen({ setScreen }: { setScreen: (s: AuthScreen) => void }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div className="flex-1 flex flex-col justify-center px-8 py-10 max-w-sm mx-auto w-full">
      {!sent ? (
        <>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background:`${B.warning}15` }}>
            <Key size={24} style={{ color:B.warning }} />
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Reset password</h1>
          <p className="text-sm mb-7" style={{ color:B.muted }}>Enter your email and we'll send you a reset link.</p>
          <div className="space-y-4 mb-5">
            <AuthInput label="Work email" type="email" placeholder="you@company.com" value={email} onChange={setEmail} icon={<Mail size={13}/>} />
          </div>
          <button onClick={() => setSent(true)} className="w-full h-11 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 mb-4 transition-opacity hover:opacity-90" style={{ background:G.hero }}>
            Send reset link<Send size={13}/>
          </button>
          <button onClick={() => setScreen("login")} className="flex items-center gap-1.5 mx-auto text-xs" style={{ color:B.muted }}><ArrowRight size={11} className="rotate-180"/>Back to login</button>
        </>
      ) : (
        <div className="text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background:`${B.success}15` }}>
            <CheckCircle2 size={28} style={{ color:B.success }} />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color:B.text }}>Email sent!</h2>
          <p className="text-sm mb-6" style={{ color:B.muted }}>Check your inbox for a password reset link. It expires in 15 minutes.</p>
          <PrimaryBtn onClick={() => setScreen("reset")} className="w-full justify-center mb-3">Open reset form →</PrimaryBtn>
          <button onClick={() => setScreen("login")} className="text-xs font-semibold" style={{ color:B.dimmed }}>← Back to login</button>
        </div>
      )}
    </div>
  );
}

function ResetPasswordScreen({ setScreen }: { setScreen: (s: AuthScreen) => void }) {
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);

  if (done) return (
    <div className="flex-1 flex flex-col justify-center px-8 py-10 max-w-sm mx-auto w-full text-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background:`${B.success}15` }}>
        <CheckCircle2 size={28} style={{ color:B.success }}/>
      </div>
      <h2 className="text-xl font-bold mb-2" style={{ color:B.text }}>Password updated!</h2>
      <p className="text-sm mb-6" style={{ color:B.muted }}>Your password has been successfully changed. You can now sign in with your new password.</p>
      <PrimaryBtn onClick={() => setScreen("login")} className="w-full justify-center">Sign in now</PrimaryBtn>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col justify-center px-8 py-10 max-w-sm mx-auto w-full">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background:`${B.primary}15` }}>
        <Key size={24} style={{ color:B.primary }}/>
      </div>
      <h1 className="text-2xl font-bold mb-1" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Set new password</h1>
      <p className="text-sm mb-7" style={{ color:B.muted }}>Choose a strong password for your account.</p>
      <div className="space-y-4 mb-5">
        <div>
          <AuthInput label="New password" type={show?"text":"password"} placeholder="Min 8 characters" value={pass} onChange={setPass} icon={<Lock size={13}/>}
            right={<button type="button" onClick={()=>setShow(!show)} style={{ color:B.dimmed }}>{show?<EyeOff size={13}/>:<Eye size={13}/>}</button>}/>
          <PasswordStrength password={pass}/>
        </div>
        <AuthInput label="Confirm new password" type="password" placeholder="Repeat password" value={confirm} onChange={setConfirm} icon={<Lock size={13}/>}/>
        {confirm && pass !== confirm && <p className="text-[11px]" style={{ color:"#EF4444" }}>Passwords do not match</p>}
        {confirm && pass === confirm && pass.length >= 8 && <p className="text-[11px]" style={{ color:B.success }}>✓ Passwords match</p>}
      </div>
      <button onClick={() => setDone(true)} disabled={pass !== confirm || pass.length < 8} className="w-full h-11 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-40" style={{ background:G.hero }}>
        Update password
      </button>
    </div>
  );
}

function TwoFAScreen({ setScreen }: { setScreen: (s: AuthScreen) => void }) {
  const [method, setMethod] = useState<"app"|"sms"|"email">("app");
  const [code, setCode] = useState(["","","","","",""]);
  const refs = Array.from({ length:6 }, () => useRef<HTMLInputElement>(null));
  const handleKey = (i: number, v: string) => {
    if (v.length > 1) return;
    const n = [...code]; n[i] = v; setCode(n);
    if (v && i < 5) refs[i+1].current?.focus();
  };
  const methods = [
    { id:"app" as const,   icon:<Smartphone size={13}/>, label:"Authenticator app" },
    { id:"sms" as const,   icon:<Phone size={13}/>,       label:"SMS" },
    { id:"email" as const, icon:<Mail size={13}/>,        label:"Email code" },
  ];
  return (
    <div className="flex-1 flex flex-col justify-center px-8 py-10 max-w-sm mx-auto w-full text-center">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background:`${B.purple}15` }}>
        <Shield size={24} style={{ color:B.purple }} />
      </div>
      <h1 className="text-2xl font-bold mb-2" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Two-factor authentication</h1>
      <p className="text-sm mb-6" style={{ color:B.muted }}>Verify your identity to continue</p>
      <div className="flex gap-2 mb-6 p-1 rounded-xl" style={{ background:B.s2 }}>
        {methods.map(m => (
          <button key={m.id} onClick={() => setMethod(m.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-semibold transition-all" style={{ background: method===m.id?B.surface:"transparent", color: method===m.id?B.text:B.dimmed }}>
            {m.icon}{m.label}
          </button>
        ))}
      </div>
      <p className="text-xs mb-4" style={{ color:B.muted }}>
        {method==="app"?"Enter the 6-digit code from your authenticator app":method==="sms"?"Enter the code sent to +1 ···· 4291":"Enter the code sent to alex@company.com"}
      </p>
      <div className="flex gap-2 justify-center mb-6">
        {code.map((v, i) => (
          <input key={i} ref={refs[i]} maxLength={1} value={v} onChange={e=>handleKey(i,e.target.value)}
            className="w-11 text-center text-lg font-bold rounded-xl border-2 outline-none transition-colors bg-transparent"
            style={{ borderColor: v ? B.primary : B.border, color:B.text, height:52 }} />
        ))}
      </div>
      <button onClick={() => setScreen("ob-workspace")} className="w-full h-11 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 mb-4 transition-opacity hover:opacity-90" style={{ background:G.hero }}>
        Verify & continue<ArrowRight size={14}/>
      </button>
      <button className="text-xs" style={{ color:B.muted }}>Use a backup code instead</button>
    </div>
  );
}

// ─── ONBOARDING SCREENS ──────────────────────────────────────────

function WorkspaceSetupScreen({ setScreen }: { setScreen: (s: AuthScreen) => void }) {
  const [name, setName] = useState("");
  const industries = ["E-commerce","SaaS/Tech","Healthcare","Education","Agency","Finance","Other"];
  const sizes = ["1–5","6–20","21–100","101–500","500+"];
  const timezones = ["(UTC-8) Pacific Time","(UTC-5) Eastern Time","(UTC+0) London","(UTC+1) Paris","(UTC+3) Dubai","(UTC+5:30) Mumbai","(UTC+8) Singapore","(UTC+9) Tokyo"];
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Set up your workspace</h1>
        <p className="text-sm mb-8" style={{ color:B.muted }}>This is your team's home in OmniDesk AI. You can change these settings anytime.</p>
        <div className="space-y-5">
          {/* Logo upload */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color:B.dimmed }}>Company Logo</label>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-dashed" style={{ borderColor:B.border }}>
                <Building2 size={20} style={{ color:B.dimmed }} />
              </div>
              <button className="flex items-center gap-2 h-9 px-4 rounded-xl border text-sm font-medium transition-colors hover:bg-white/5" style={{ borderColor:B.border, color:B.muted }}>
                <Upload size={13}/>Upload logo
              </button>
            </div>
          </div>
          <AuthInput label="Workspace name" placeholder="Nexus Technologies" value={name} onChange={setName} icon={<Building2 size={13}/>} />
          {[
            { label:"Industry", opts:industries },
            { label:"Company size", opts:sizes },
            { label:"Timezone", opts:timezones },
          ].map(s => (
            <div key={s.label}>
              <label className="block text-[11px] font-bold uppercase tracking-widest mb-1.5" style={{ color:B.dimmed }}>{s.label}</label>
              <div className="h-11 px-3 rounded-xl border flex items-center gap-2" style={{ background:B.s2, borderColor:B.border }}>
                <select className="flex-1 bg-transparent text-sm outline-none appearance-none" style={{ color:B.muted }}>
                  <option>Select {s.label.toLowerCase()}…</option>
                  {s.opts.map(o=><option key={o} style={{ background:B.surface }}>{o}</option>)}
                </select>
                <ChevronDown size={13} style={{ color:B.dimmed }} />
              </div>
            </div>
          ))}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color:B.dimmed }}>Support Email</label>
            <AuthInput label="" placeholder="support@yourcompany.com" value="" onChange={()=>{}} icon={<Mail size={13}/>} />
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <PrimaryBtn onClick={() => setScreen("ob-invite")}>Continue to Team Setup<ArrowRight size={14}/></PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

function InviteTeamScreen({ setScreen }: { setScreen: (s: AuthScreen) => void }) {
  const [invites, setInvites] = useState([{ email:"", role:"Support" }]);
  const roles = ["Admin","Owner","Manager","Support","Sales","Marketing","Developer","Viewer"];
  const addInvite = () => setInvites(p => [...p, { email:"", role:"Support" }]);
  const updEmail = (i: number, v: string) => setInvites(p => p.map((x,j) => j===i ? {...x, email:v} : x));
  const updRole  = (i: number, v: string) => setInvites(p => p.map((x,j) => j===i ? {...x, role:v} : x));
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Invite your team</h1>
        <p className="text-sm mb-8" style={{ color:B.muted }}>Collaborate better from day one. You can always invite more people later.</p>
        <div className="space-y-3 mb-4">
          {invites.map((inv, i) => (
            <div key={i} className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 h-11 px-3 rounded-xl border" style={{ background:B.s2, borderColor:B.border }}>
                <Mail size={13} style={{ color:B.dimmed }} />
                <input placeholder="colleague@company.com" value={inv.email} onChange={e=>updEmail(i,e.target.value)}
                  className="flex-1 bg-transparent text-sm outline-none" style={{ color:B.text }} />
              </div>
              <div className="flex items-center gap-1 h-11 px-3 rounded-xl border" style={{ background:B.s2, borderColor:B.border, minWidth:120 }}>
                <select value={inv.role} onChange={e=>updRole(i,e.target.value)} className="bg-transparent text-sm outline-none appearance-none flex-1" style={{ color:B.muted }}>
                  {roles.map(r=><option key={r} style={{ background:B.surface }}>{r}</option>)}
                </select>
                <ChevronDown size={11} style={{ color:B.dimmed }} />
              </div>
            </div>
          ))}
        </div>
        <button onClick={addInvite} className="flex items-center gap-2 text-sm font-medium mb-8" style={{ color:B.primary }}>
          <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background:`${B.primary}20` }}><Plus size={11}/></div>
          Add another
        </button>
        <div className="rounded-xl p-4 border mb-8" style={{ background:B.s2, borderColor:B.border }}>
          <p className="text-xs font-semibold mb-2" style={{ color:B.text }}>Or share an invite link</p>
          <div className="flex items-center gap-2 h-9 px-3 rounded-lg border" style={{ background:B.surface, borderColor:B.border }}>
            <Link2 size={11} style={{ color:B.dimmed }} />
            <span className="flex-1 text-xs truncate" style={{ color:B.dimmed }}>https://app.omnideskai.com/invite/abc123xyz</span>
            <button className="flex items-center gap-1 text-[11px] font-semibold" style={{ color:B.primary }}><Copy size={10}/>Copy</button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button onClick={() => setScreen("ob-channels")} className="text-sm" style={{ color:B.dimmed }}>Skip for now</button>
          <PrimaryBtn onClick={() => setScreen("ob-channels")}>Send invites & continue<ArrowRight size={14}/></PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

function ChannelWizardScreen({ setScreen }: { setScreen: (s: AuthScreen) => void }) {
  const [connected, setConnected] = useState<Record<string,boolean>>({});
  const [connecting, setConnecting] = useState<string | null>(null);
  const channels = [
    { name:"WhatsApp Business", color:"#25D366", icon:MessageCircle, key:"wa" },
    { name:"Instagram",         color:"#E1306C", icon:Instagram,      key:"ig" },
    { name:"Facebook",          color:"#1877F2", icon:MessageSquare,  key:"fb" },
    { name:"Gmail",             color:"#EA4335", icon:Mail,           key:"gm" },
    { name:"Outlook",           color:"#0078D4", icon:Mail,           key:"ol" },
    { name:"Telegram",          color:"#2CA5E0", icon:Send,           key:"tg" },
    { name:"Twitter/X",         color:"#1DA1F2", icon:Twitter,        key:"tw" },
    { name:"LinkedIn",          color:"#0A66C2", icon:Globe,          key:"li" },
    { name:"Live Chat",         color:"#F59E0B", icon:MessageCircle,  key:"lc" },
    { name:"Slack",             color:"#4A154B", icon:Hash,           key:"sl" },
    { name:"Discord",           color:"#5865F2", icon:Headphones,     key:"dc" },
    { name:"SMS / Voice",       color:"#10B981", icon:Phone,          key:"sv" },
  ];
  const connect = (key: string) => {
    setConnecting(key);
    setTimeout(() => { setConnected(p => ({ ...p, [key]:true })); setConnecting(null); }, 1400);
  };
  const connCount = Object.keys(connected).length;
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold mb-1" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Connect your channels</h1>
            <p className="text-sm" style={{ color:B.muted }}>Connect at least one channel to start receiving conversations.</p>
          </div>
          {connCount > 0 && <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background:`${B.success}15`, color:B.success }}>{connCount} connected</span>}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-8">
          {channels.map(ch => {
            const isConnected = connected[ch.key];
            const isConnecting = connecting === ch.key;
            return (
              <GlassCard key={ch.key} className="p-4 flex flex-col items-center gap-3" style={{ borderColor: isConnected ? `${B.success}40` : B.border, background: isConnected ? `${B.success}06` : "rgba(255,255,255,0.04)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background:`${ch.color}15` }}>
                  <ch.icon size={20} style={{ color:ch.color }} />
                </div>
                <p className="text-xs font-semibold text-center" style={{ color:B.text }}>{ch.name}</p>
                <button onClick={() => !isConnected && connect(ch.key)} className="w-full h-7 rounded-lg text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5"
                  style={{ background: isConnected ? `${B.success}18` : `${ch.color}18`, color: isConnected ? B.success : ch.color }}>
                  {isConnecting ? <><Loader2 size={11} className="animate-spin"/>Connecting…</>
                   : isConnected ? <><Check size={11}/>Connected</>
                   : "Connect"}
                </button>
              </GlassCard>
            );
          })}
        </div>
        <div className="flex items-center justify-between">
          <button onClick={() => setScreen("ob-ai")} className="text-sm" style={{ color:B.dimmed }}>Skip for now</button>
          <PrimaryBtn onClick={() => setScreen("ob-ai")} className={connCount === 0 ? "opacity-50" : ""}>
            {connCount > 0 ? `Continue with ${connCount} channel${connCount>1?"s":""}` : "Skip for now"}<ArrowRight size={14}/>
          </PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

function AISetupScreen({ setScreen }: { setScreen: (s: AuthScreen) => void }) {
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number,string>>({});
  const [configuring, setConfiguring] = useState(false);
  const [configStep, setConfigStep] = useState(0);

  const questions = [
    { q:"What type of business do you run?", opts:["E-commerce","SaaS / Tech","Healthcare","Education","Agency / Consulting","Financial Services","Retail","Other"] },
    { q:"How large is your support team?", opts:["Just me (solo)","2–10 agents","11–50 agents","51–200 agents","200+ agents"] },
    { q:"How many conversations do you receive daily?", opts:["Under 50","50–200","200–1,000","1,000–5,000","5,000+"] },
    { q:"What's your primary business goal?", opts:["Faster customer support","Increase sales conversion","Reduce support costs","Better CSAT scores","All of the above"] },
    { q:"Which tool are you migrating from?", opts:["Zendesk","Intercom","HubSpot","Freshdesk","None — starting fresh","Other"] },
  ];

  const configSteps = [
    "Personalizing your dashboard…",
    "Configuring AI reply settings…",
    "Setting up automation rules…",
    "Building your knowledge base…",
    "Preparing your workspace…",
  ];

  const answer = (opt: string) => {
    setAnswers(p => ({ ...p, [qIdx]:opt }));
    if (qIdx < questions.length - 1) {
      setTimeout(() => setQIdx(q => q+1), 300);
    } else {
      setConfiguring(true);
      let step = 0;
      const iv = setInterval(() => {
        step++;
        setConfigStep(step);
        if (step >= configSteps.length) { clearInterval(iv); setTimeout(() => setScreen("ob-complete"), 800); }
      }, 700);
    }
  };

  if (configuring) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 text-center">
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6" style={{ background:`${B.purple}15` }}>
          <div className="relative"><Sparkles size={32} style={{ color:B.purple }} /></div>
        </div>
        <h2 className="text-2xl font-bold mb-3" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>Setting up your AI workspace</h2>
        <p className="text-sm mb-8" style={{ color:B.muted }}>OmniDesk AI is personalizing your experience based on your answers…</p>
        <div className="w-72 space-y-3">
          {configSteps.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: i < configStep ? `${B.success}20` : i === configStep ? `${B.primary}20` : B.s2 }}>
                {i < configStep ? <Check size={10} style={{ color:B.success }}/> : i === configStep ? <Loader2 size={10} className="animate-spin" style={{ color:B.primary }}/> : <div className="w-2 h-2 rounded-full" style={{ background:B.dimmed }}/>}
              </div>
              <span className="text-sm text-left" style={{ color: i <= configStep ? B.text : B.dimmed }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const q = questions[qIdx];
  return (
    <div className="flex-1 flex flex-col justify-center px-6 py-10">
      <div className="max-w-lg mx-auto w-full">
        <div className="flex gap-1 mb-8">
          {questions.map((_,i) => (
            <div key={i} className="h-1 flex-1 rounded-full transition-all" style={{ background: i <= qIdx ? B.purple : B.s2 }} />
          ))}
        </div>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background:G.ai }}>
          <Sparkles size={20} className="text-white" />
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color:B.purple }}>Question {qIdx+1} of {questions.length}</p>
        <h2 className="text-2xl font-bold mb-6" style={{ fontFamily:"'Poppins',sans-serif", color:B.text }}>{q.q}</h2>
        <div className="grid grid-cols-2 gap-2.5">
          {q.opts.map(opt => (
            <button key={opt} onClick={() => answer(opt)} className="text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all hover:border-current" style={{ background: answers[qIdx]===opt ? `${B.purple}18` : "rgba(255,255,255,0.04)", borderColor: answers[qIdx]===opt ? B.purple : B.border, color: answers[qIdx]===opt ? B.text : B.muted }}>
              {answers[qIdx]===opt && <Check size={11} className="inline mr-1.5" style={{ color:B.purple }}/>}
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function OnboardingCompleteScreen({ onLaunch }: { onLaunch: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 text-center">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center" style={{ background:`linear-gradient(135deg,${B.success},#059669)`, boxShadow:`0 0 60px ${B.success}40` }}>
          <PartyPopper size={40} className="text-white" />
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-3" style={{ fontFamily:"'Poppins',sans-serif", ...gradText(G.brand) }}>You're all set! 🎉</h1>
      <p className="text-base mb-3" style={{ color:B.text }}>Your OmniDesk AI workspace is ready.</p>
      <p className="text-sm mb-10 max-w-sm" style={{ color:B.muted }}>Your AI is trained, channels are connected, and your team has been invited. Time to experience the future of customer support.</p>
      <div className="grid grid-cols-3 gap-4 mb-10 max-w-sm mx-auto">
        {[{ n:"3", l:"Channels connected" },{ n:"2", l:"Team members invited" },{ n:"AI", l:"Ready to reply" }].map(s=>(
          <GlassCard key={s.l} className="p-3 text-center">
            <p className="text-xl font-extrabold mb-0.5" style={{ fontFamily:"'Poppins',sans-serif", ...gradText(G.brand) }}>{s.n}</p>
            <p className="text-[10px]" style={{ color:B.dimmed }}>{s.l}</p>
          </GlassCard>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <PrimaryBtn onClick={onLaunch} className="px-8"><LayoutDashboard size={14}/>Launch OmniDesk AI</PrimaryBtn>
        <OutlineBtn onClick={onLaunch}>Take a product tour</OutlineBtn>
      </div>
      <p className="text-xs mt-6" style={{ color:B.dimmed }}>Your workspace: <span style={{ color:B.primary }}>app.omnideskai.com/workspace/nexus</span></p>
    </div>
  );
}

// ─── AUTH SHELL (wraps all auth / onboarding screens) ─────────────
export function AuthShell({ screen, setScreen, onBack, onLaunch }: { screen: AuthScreen; setScreen: (s: AuthScreen) => void; onBack: () => void; onLaunch: () => void }) {
  const isOnboarding = screen.startsWith("ob-");
  const isSplit = !isOnboarding;

  if (isOnboarding) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background:B.bg, color:B.text, fontFamily:"'Inter',sans-serif" }}>
        <OnboardingProgress screen={screen} onBack={onBack} />
        <div className="flex-1 flex flex-col" key={screen}>
          {screen === "ob-workspace" && <WorkspaceSetupScreen setScreen={setScreen} />}
          {screen === "ob-invite"    && <InviteTeamScreen    setScreen={setScreen} />}
          {screen === "ob-channels"  && <ChannelWizardScreen setScreen={setScreen} />}
          {screen === "ob-ai"        && <AISetupScreen       setScreen={setScreen} />}
          {screen === "ob-complete"  && <OnboardingCompleteScreen onLaunch={onLaunch} />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ background:B.bg, color:B.text, fontFamily:"'Inter',sans-serif" }}>
      <BrandPanel />
      <div className="flex-1 flex flex-col min-h-screen" style={{ background:B.surface }}>
        <div className="flex items-center justify-between px-6 pt-5">
          <button onClick={onBack} className="flex items-center gap-1.5 text-xs transition-colors hover:text-white" style={{ color:B.dimmed }}>
            <ArrowRight size={12} className="rotate-180"/>Back to website
          </button>
          <div className="flex lg:hidden"><OmniDeskLogo iconSize={26} textClass="text-xs"/></div>
        </div>
        <div className="flex-1 flex flex-col" key={screen}>
          {screen === "landing"  && <AuthLanding    setScreen={setScreen} />}
          {screen === "login"    && <LoginScreen    setScreen={setScreen} />}
          {screen === "register" && <RegisterScreen setScreen={setScreen} />}
          {screen === "verify"   && <VerifyEmailScreen setScreen={setScreen} />}
          {screen === "forgot"   && <ForgotScreen        setScreen={setScreen} />}
          {screen === "reset"    && <ResetPasswordScreen setScreen={setScreen} />}
          {screen === "2fa"      && <TwoFAScreen         setScreen={setScreen} />}
        </div>
        <div className="flex items-center justify-center gap-4 pb-5 pt-2">
          {["Privacy","Terms","Help Center","Status"].map(l=>(
            <button key={l} className="text-[10px] transition-colors hover:text-white" style={{ color:B.dimmed }}>{l}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

