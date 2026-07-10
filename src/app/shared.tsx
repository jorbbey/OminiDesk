import React, { createContext, useContext } from "react";

// ─── BRAND TOKENS (CSS-variable backed for dark/light theming) ────
export const B = {
  // Theme-sensitive (switch via CSS vars):
  bg:      "var(--od-bg)",
  surface: "var(--od-surface)",
  s2:      "var(--od-s2)",
  border:  "var(--od-border)",
  text:    "var(--od-text)",
  muted:   "var(--od-muted)",
  dimmed:  "var(--od-dimmed)",
  // Brand colours — constant across themes:
  primary: "#4F46E5",
  cyan:    "#06B6D4",
  purple:  "#8B5CF6",
  pink:    "#EC4899",
  success: "#10B981",
  warning: "#F59E0B",
  slate:   "#64748B",
};

export const G = {
  brand:  `linear-gradient(135deg,${B.primary},${B.cyan})`,
  hero:   `linear-gradient(135deg,${B.primary},${B.purple})`,
  ai:     `linear-gradient(135deg,${B.purple},${B.primary})`,
  pink:   `linear-gradient(135deg,${B.pink},${B.purple})`,
  radial: `radial-gradient(ellipse at 20% 30%,rgba(79,70,229,0.25) 0%,transparent 60%),radial-gradient(ellipse at 80% 70%,rgba(6,182,212,0.18) 0%,transparent 55%)`,
};

export const gradText = (g: string): React.CSSProperties => ({
  background: g, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
});

// ─── THEME CONTEXT ────────────────────────────────────────────────
export const ThemeCtx = createContext<{ isDark: boolean; toggle: () => void }>({
  isDark: true, toggle: () => {},
});
export const useTheme = () => useContext(ThemeCtx);

// ─── SHARED TYPES ────────────────────────────────────────────────
export type Page = "home" | "features" | "pricing" | "about" | "blog" | "contact" | "blogpost" | "docs" | "careers" | "stories" | "privacy" | "terms";

export type AuthScreen =
  | "landing" | "login" | "register" | "verify" | "forgot" | "reset" | "2fa"
  | "ob-workspace" | "ob-invite" | "ob-channels" | "ob-ai" | "ob-complete";

export type AppScreen =
  | "dashboard" | "inbox" | "crm" | "ai" | "analytics" | "social"
  | "automation" | "kb" | "voice" | "insights" | "reports"
  | "billing" | "audit" | "settings"
  | "superadmin" | "devportal" | "apiplay" | "marketplace2"
  | "security2" | "monitoring" | "aigovernance" | "status"
  | "webhooks" | "integrations" | "featureflags" | "whitelabel" | "compliance"
  | "adm-dashboard" | "adm-orgs" | "adm-revenue" | "adm-support"
  | "adm-system" | "adm-ai" | "adm-security" | "adm-flags"
  | "adm-subscriptions" | "adm-incidents"
  | "ent-hierarchy" | "ent-sla";

// ─── PRIMITIVE COMPONENTS ────────────────────────────────────────
export function GlassCard({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`rounded-2xl border ${className}`} style={{ background:"var(--od-glass)", backdropFilter:"blur(20px)", borderColor:B.border, ...style }}>
      {children}
    </div>
  );
}

export function Badge({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase" style={{ background:`${color}18`, color, border:`1px solid ${color}25` }}>
      {children}
    </span>
  );
}

export function Avatar({ initials, size = 40 }: { initials: string; size?: number }) {
  const colors = [B.primary, B.purple, B.pink, B.cyan, B.success];
  const c = colors[initials.charCodeAt(0) % colors.length];
  return (
    <div className="rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ width:size, height:size, fontSize:size*0.32, background:`linear-gradient(135deg,${c},${c}99)` }}>
      {initials}
    </div>
  );
}

export function PrimaryBtn({ children, onClick, className = "", small = false }: { children: React.ReactNode; onClick?: () => void; className?: string; small?: boolean }) {
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-2 font-semibold rounded-xl transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95 text-white ${small ? "px-4 py-2 text-sm" : "px-6 py-3 text-sm"} ${className}`} style={{ background:G.hero }}>
      {children}
    </button>
  );
}

export function OutlineBtn({ children, onClick, className = "" }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-2 font-semibold rounded-xl border transition-all text-sm px-6 py-3 ${className}`} style={{ borderColor:B.border, color:B.text }}>
      {children}
    </button>
  );
}

// ─── MINI SVG CHARTS ─────────────────────────────────────────────
export function SparkLine({ data, color, w=110, h=36 }: { data:number[]; color:string; w?:number; h?:number }) {
  const mn=Math.min(...data), mx=Math.max(...data), rng=mx-mn||1;
  const pts=data.map((v,i)=>`${(i/(data.length-1))*w},${h-(((v-mn)/rng)*h*0.85+h*0.075)}`).join(" ");
  const area=`0,${h} ${pts} ${w},${h}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <defs><linearGradient id={`sg-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity={0.25}/><stop offset="100%" stopColor={color} stopOpacity={0}/></linearGradient></defs>
      <polygon points={area} fill={`url(#sg-${color.replace("#","")})`}/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
}

export function SparkBar({ data, colorFn, w=110, h=36 }: { data:number[]; colorFn:(v:number,mn:number,mx:number)=>string; w?:number; h?:number }) {
  const mn=Math.min(...data), mx=Math.max(...data), rng=mx-mn||1;
  const bw=Math.max(4,(w/data.length)*0.65);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {data.map((v,i)=>{ const bh=((v-mn)/rng)*h*0.9+h*0.1; return <rect key={i} x={(i/(data.length))*w+(bw*0.15)} y={h-bh} width={bw} height={bh} rx={2} fill={colorFn(v,mn,mx)}/>; })}
    </svg>
  );
}

// ─── OMNIDESKAI LOGO ─────────────────────────────────────────────
// Circular gradient ring (orange→pink→purple→cyan) with dark inner
// circle and white speech bubble containing 3 dots — the real logo.
export function OmniDeskIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink:0 }}>
      <defs>
        <linearGradient id="od-icon-g" x1="5%" y1="95%" x2="95%" y2="5%">
          <stop offset="0%"   stopColor="#F97316"/>
          <stop offset="30%"  stopColor="#EC4899"/>
          <stop offset="68%"  stopColor="#8B5CF6"/>
          <stop offset="100%" stopColor="#06B6D4"/>
        </linearGradient>
      </defs>
      {/* Gradient ring */}
      <circle cx="50" cy="50" r="48" fill="url(#od-icon-g)"/>
      {/* Dark inner */}
      <circle cx="50" cy="50" r="36" fill="#0B1021"/>
      {/* White chat bubble */}
      <path d="M26 27 Q26 19 34 19 L66 19 Q74 19 74 27 L74 52 Q74 60 66 60 L54 60 L50 68 L46 60 L34 60 Q26 60 26 52 Z" fill="white"/>
      {/* 3 dots */}
      <circle cx="38" cy="39" r="4" fill="#1F2937"/>
      <circle cx="50" cy="39" r="4" fill="#1F2937"/>
      <circle cx="62" cy="39" r="4" fill="#1F2937"/>
    </svg>
  );
}

export function OmniDeskWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-extrabold tracking-tight ${className}`} style={{ fontFamily:"'Poppins',sans-serif" }}>
      <span style={{ color:"var(--od-text)" }}>OmniDesk</span>
      <span style={{ background:"linear-gradient(90deg,#4F46E5,#8B5CF6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}> AI</span>
    </span>
  );
}

export function OmniDeskLogo({ iconSize = 32, textClass = "text-sm" }: { iconSize?: number; textClass?: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <OmniDeskIcon size={iconSize}/>
      <OmniDeskWordmark className={textClass}/>
    </div>
  );
}

// ─── THEME TOGGLE BUTTON ─────────────────────────────────────────
export function ThemeToggle({ size = "sm" }: { size?: "sm" | "md" }) {
  const { isDark, toggle } = useTheme();
  const sz = size === "sm" ? 14 : 18;
  return (
    <button
      onClick={toggle}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex items-center justify-center rounded-xl border transition-all hover:scale-105"
      style={{
        width: size === "sm" ? 28 : 36,
        height: size === "sm" ? 28 : 36,
        background: isDark ? "rgba(255,255,255,0.06)" : "rgba(79,70,229,0.08)",
        borderColor: B.border,
        color: isDark ? "#F59E0B" : "#4F46E5",
      }}
    >
      {isDark
        ? <svg xmlns="http://www.w3.org/2000/svg" width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        : <svg xmlns="http://www.w3.org/2000/svg" width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      }
    </button>
  );
}
