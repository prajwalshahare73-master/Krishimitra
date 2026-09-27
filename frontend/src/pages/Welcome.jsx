import React from "react";
import { 
  ArrowRight, ShieldCheck, Sprout, 
  TrendingUp, Warehouse, ShoppingBag, Truck, CreditCard, 
  FileText, MessageSquareQuote, Sparkles, PhoneCall
} from "lucide-react";

const WORKFLOW_STEPS = [
  { num: "1", emoji: "📝", label: "Add Produce", sub: "Crop, qty, quality & harvest date", tab: "add-produce", color: "#1b5e20", bg: "#e8f5e9" },
  { num: "2", emoji: "📊", label: "Check Prices", sub: "Agmarknet & APMC mandi rates", tab: "prices", color: "#1b5e20", bg: "#e8f5e9" },
  { num: "3", emoji: "✨", label: "Smart Advisory", sub: "Sell Now / Store / Process", tab: "recommendation", color: "#b45309", bg: "#fef3c7" },
  { num: "4", emoji: "🏭", label: "Storage & Units", sub: "Cold storage & food processors", tab: "facilities", color: "#1b5e20", bg: "#e8f5e9" },
  { num: "5", emoji: "🤝", label: "Find Buyer", sub: "Verified FPOs & bulk buyers", tab: "buyers", color: "#1b5e20", bg: "#e8f5e9" },
  { num: "6", emoji: "💬", label: "Negotiate & Pay", sub: "In-app offer & digital escrow", tab: "deal-room", color: "#b45309", bg: "#fef3c7" },
  { num: "7", emoji: "📋", label: "Records & Receipt", sub: "Digital passbook & invoice", tab: "records", color: "#1b5e20", bg: "#e8f5e9" },
];

const WHY_CARDS = [
  { icon: <TrendingUp size={24} />, bg: "#e8f5e9", color: "#1b5e20", title: "Zero Middlemen Commission", desc: "Direct transparent connection with verified institutional buyers, cooperatives & food processors. Keep 100% of your produce value." },
  { icon: <Warehouse size={24} />, bg: "#fef3c7", color: "#b45309", title: "Scientific Storage Advisory", desc: "Avoid distress selling during peak post-harvest gluts. Get actionable advice on sell now or store in subsidised WDRA cold rooms." },
  { icon: <CreditCard size={24} />, bg: "#dbeafe", color: "#1d4ed8", title: "Guaranteed Digital Settlement", desc: "Locked deal pricing with in-app payment escrow and direct bank settlement via UPI / DBT with verifiable digital tax receipts." },
];

export default function Welcome({ t, onTabChange, onLangChange, currentLang }) {
  return (
    <div className="animate-fade-in">
      {/* 1. Hero Banner */}
      <div 
        style={{
          background: "linear-gradient(145deg, #0f3813 0%, #1b5e20 40%, #2e7d32 80%, #1a6b24 100%)",
          color: "#ffffff",
          borderRadius: "var(--radius-2xl)",
          marginBottom: "0",
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 8px 32px rgba(27, 94, 32, 0.25)",
        }}
      >
        {/* Decorative pattern */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 85% 15%, rgba(255,255,255,0.06) 0%, transparent 50%), radial-gradient(circle at 15% 85%, rgba(255,213,79,0.06) 0%, transparent 50%)",
          pointerEvents: "none"
        }} />

        <div style={{ position: "relative", zIndex: 1, padding: "clamp(1.75rem, 5vw, 3.5rem) clamp(1.25rem, 4vw, 2.5rem)" }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", padding: "0.3rem 0.85rem", borderRadius: "999px", fontSize: "0.8rem", fontWeight: 600, marginBottom: "1.25rem", backdropFilter: "blur(8px)" }}>
            <ShieldCheck size={14} color="#ffd54f" />
            <span>National Digital Agriculture Infrastructure • भारत सरकार</span>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: "clamp(1.6rem, 4vw + 0.5rem, 2.8rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "1rem", letterSpacing: "-0.02em", maxWidth: "820px" }}>
            {t.portalName}
            <span style={{ display: "block", color: "#a7f3d0", fontWeight: 700, fontSize: "75%" }}>{t.portalSubtitle}</span>
          </h1>

          {/* Tagline */}
          <p style={{ fontSize: "clamp(0.95rem, 2vw + 0.2rem, 1.15rem)", color: "rgba(255,255,255,0.85)", lineHeight: 1.65, marginBottom: "2rem", maxWidth: "680px" }}>
            🌾 <strong style={{ color: "#ffffff" }}>{t.tagline}.</strong>{" "}
            A single-window platform for Indian farmers — monitor live APMC mandi prices, find WDRA cold storages, negotiate with verified FPO buyers &amp; receive guaranteed digital payments.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem", alignItems: "center" }}>
            <button 
              className="btn btn-lg"
              onClick={() => onTabChange("dashboard")}
              style={{ background: "#ffd54f", color: "#0f3813", fontWeight: 800, border: "none", boxShadow: "0 4px 16px rgba(255,213,79,0.35)", fontSize: "1rem" }}
            >
              <span>🚪 Enter Kisan Portal</span>
              <ArrowRight size={20} />
            </button>

            <button 
              className="btn btn-lg"
              style={{ background: "rgba(255,255,255,0.12)", color: "#ffffff", borderColor: "rgba(255,255,255,0.3)", backdropFilter: "blur(8px)", fontWeight: 600 }}
              onClick={() => onTabChange("prices")}
            >
              <TrendingUp size={18} />
              <span>Live APMC Prices</span>
            </button>

            <button 
              className="btn btn-lg"
              style={{ background: "rgba(255,255,255,0.12)", color: "#ffffff", borderColor: "rgba(255,255,255,0.3)", backdropFilter: "blur(8px)", fontWeight: 600 }}
              onClick={() => onTabChange("add-produce")}
            >
              + {t.actionAddProduce}
            </button>
          </div>

          {/* Helpline badge */}
          <div style={{ marginTop: "1.5rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(0,0,0,0.2)", padding: "0.45rem 0.85rem", borderRadius: "999px", fontSize: "0.8125rem", color: "rgba(255,255,255,0.85)" }}>
            <PhoneCall size={14} color="#ffd54f" />
            <span>Kisan Call Centre: <strong style={{ color: "#ffd54f" }}>1800-180-1551</strong> (Free 24×7)</span>
          </div>
        </div>
      </div>

      {/* 2. Stats Band */}
      <div 
        className="gov-card" 
        style={{ 
          marginTop: "-0.5rem",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderTop: "none",
          background: "#ffffff",
          position: "relative",
          zIndex: 10
        }}
      >
        <div className="gov-card-body" style={{ padding: "1rem 1.25rem" }}>
          <div className="grid-4" style={{ textAlign: "center", gap: "0" }}>
            {[
              { val: "1,420+", label: "Live APMC Mandis", color: "var(--color-primary-800)" },
              { val: "₹18.5 Cr+", label: "Direct Farmgate Sales", color: "var(--color-amber-700)" },
              { val: "640+", label: "WDRA Cold Storages", color: "var(--color-primary-800)" },
              { val: "3,200+", label: "Verified FPOs & Buyers", color: "var(--color-amber-700)" },
            ].map((stat, i) => (
              <div key={i} className="stat-box" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", fontWeight: 900, color: stat.color, lineHeight: 1.1 }}>
                  {stat.val}
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", fontWeight: 500, marginTop: "0.2rem" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Farmer Workflow Steps */}
      <div className="gov-card" style={{ marginTop: "1.5rem" }}>
        <div className="gov-card-header">
          <span className="gov-card-title">
            <Sprout size={20} color="var(--color-primary-700)" />
            Complete Farmer Workflow (Farm to Settlement)
          </span>
          <span className="badge badge-success">End-to-End Digital</span>
        </div>
        <div className="gov-card-body">
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginBottom: "1.25rem", lineHeight: 1.6 }}>
            AgriSathi unifies every critical phase of agricultural post-harvest marketing into one structured, transparent process:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.75rem" }}>
            {WORKFLOW_STEPS.map((step, i) => (
              <button
                key={i}
                onClick={() => onTabChange(step.tab)}
                style={{
                  background: "#fafbfc",
                  border: "1.5px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1rem 0.75rem",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all var(--transition-base)",
                  fontFamily: "inherit",
                  width: "100%",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = step.color; e.currentTarget.style.background = step.bg; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--shadow-hover)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.background = "#fafbfc"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: step.bg, color: step.color, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.6rem", fontWeight: 900, fontSize: "0.875rem", border: `2px solid ${step.color}22` }}>
                  {step.num}
                </div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-text-main)", marginBottom: "0.25rem" }}>{step.label}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--color-text-subtle)", lineHeight: 1.4 }}>{step.sub}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Why AgriSathi */}
      <div className="grid-3" style={{ marginTop: "1.5rem" }}>
        {WHY_CARDS.map((card, i) => (
          <div key={i} className="gov-card" style={{ marginBottom: 0 }}>
            <div className="gov-card-body">
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.85rem" }}>
                <div style={{ background: card.bg, padding: "0.6rem", borderRadius: "var(--radius-md)", color: card.color, flexShrink: 0 }}>
                  {card.icon}
                </div>
                <h3 style={{ fontSize: "0.975rem", fontWeight: 700, color: "var(--color-text-main)", lineHeight: 1.3 }}>{card.title}</h3>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", lineHeight: 1.65, margin: 0 }}>{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Quick Links / Scheme Info */}
      <div className="gov-card" style={{ marginTop: "1.5rem" }}>
        <div className="gov-card-header">
          <span className="gov-card-title">📋 Government Schemes &amp; Programmes</span>
        </div>
        <div className="gov-card-body">
          <div className="grid-2">
            {[
              { scheme: "e-NAM (National Agriculture Market)", url: "https://enam.gov.in", desc: "Online trading platform integrating APMC mandis across India" },
              { scheme: "Agmarknet Price Data", url: "https://agmarknet.gov.in", desc: "Real-time commodity arrivals & price data from regulated markets" },
              { scheme: "MIDH Cold Storage Subsidy", url: "#", desc: "Mission for Integrated Development of Horticulture – storage grants" },
              { scheme: "PM-KISAN DBT Settlement", url: "#", desc: "Direct bank transfer support for small & marginal farmers" },
            ].map((link, i) => (
              <div key={i} style={{ padding: "0.75rem", background: "var(--color-bg-subtle)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-light)" }}>
                <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--color-primary-900)", marginBottom: "0.25rem" }}>{link.scheme}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>{link.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
