import React from "react";
import { 
  ArrowRight, CheckCircle2, ShieldCheck, Sprout, 
  TrendingUp, Warehouse, ShoppingBag, Truck, CreditCard, 
  FileText, Award, PhoneCall 
} from "lucide-react";

export default function Welcome({ t, onTabChange, onLangChange, currentLang }) {
  return (
    <div>
      {/* 1. Official Agriculture Portal Welcome Banner */}
      <div 
        style={{
          background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)",
          color: "#ffffff",
          padding: "3rem 0 3.5rem",
          borderRadius: "var(--radius-lg)",
          marginBottom: "2rem",
          border: "1px solid #144e19",
          boxShadow: "0 4px 12px rgba(27, 94, 32, 0.15)",
        }}
      >
        <div className="gov-container">
          <div style={{ maxWidth: "820px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255, 255, 255, 0.15)", padding: "0.3rem 0.8rem", borderRadius: "999px", fontSize: "0.85rem", fontWeight: 600, marginBottom: "1rem" }}>
              <ShieldCheck size={16} color="#ffd54f" />
              <span>National Digital Agriculture Infrastructure</span>
            </div>

            <h1 style={{ fontSize: "2.35rem", fontWeight: 800, lineHeight: 1.2, marginBottom: "0.75rem", letterSpacing: "-0.01em" }}>
              {t.portalName} – {t.portalSubtitle}
            </h1>

            <p style={{ fontSize: "1.15rem", color: "#e2f0d9", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              🌾 <strong>{t.tagline}</strong>. A dedicated single-window platform for Indian farmers to manage harvested crops, monitor live APMC mandi prices, locate WDRA cold storages, negotiate directly with verified FPO buyers, and receive guaranteed digital payments.
            </p>

            {/* Quick Actions & Language Switcher */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
              <button 
                className="btn btn-accent btn-lg"
                onClick={() => onTabChange("dashboard")}
              >
                <span>Enter Kisan Portal</span>
                <ArrowRight size={18} />
              </button>

              <button 
                className="btn btn-secondary btn-lg"
                style={{ background: "rgba(255, 255, 255, 0.95)", color: "#1b5e20", fontWeight: 700 }}
                onClick={() => onTabChange("add-produce")}
              >
                + {t.actionAddProduce}
              </button>

              <button 
                className="btn btn-secondary btn-lg"
                style={{ background: "transparent", color: "#ffffff", borderColor: "rgba(255, 255, 255, 0.5)" }}
                onClick={() => onTabChange("prices")}
              >
                <TrendingUp size={18} />
                <span>{t.navPrices}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Portal Operational Statistics (Real-world Agmarknet / e-NAM style) */}
      <div className="gov-card" style={{ marginTop: "-1.5rem", position: "relative", zIndex: 10, background: "#ffffff", borderColor: "#d7e0db" }}>
        <div className="gov-card-body" style={{ padding: "1rem" }}>
          <div className="grid-4" style={{ textAlign: "center" }}>
            <div className="stat-box">
              <div style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.85rem)", fontWeight: 800, color: "var(--color-primary-800)" }}>1,420+</div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", fontWeight: 500 }}>Live APMC Mandis Synced</div>
            </div>
            <div className="stat-box">
              <div style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.85rem)", fontWeight: 800, color: "var(--color-amber-700)" }}>₹18.5 Cr+</div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", fontWeight: 500 }}>Direct Farmgate Sales</div>
            </div>
            <div className="stat-box">
              <div style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.85rem)", fontWeight: 800, color: "var(--color-primary-800)" }}>640+</div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", fontWeight: 500 }}>WDRA Cold Storages & Depots</div>
            </div>
            <div className="stat-box">
              <div style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.85rem)", fontWeight: 800, color: "var(--color-amber-700)" }}>3,200+</div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", fontWeight: 500 }}>Verified FPOs & Bulk Buyers</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Core Farmer Lifecycle / Workflow (Single Source of Truth from PRD) */}
      <div className="gov-card" style={{ marginTop: "2rem" }}>
        <div className="gov-card-header">
          <span className="gov-card-title">
            <Sprout size={20} color="#1b5e20" />
            Complete Farmer Produce Workflow (From Farm to Settlement)
          </span>
          <span className="badge badge-success">End-to-End Digital Flow</span>
        </div>
        <div className="gov-card-body">
          <p style={{ fontSize: "0.95rem", color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
            AgriSathi unifies every critical phase of agricultural post-harvest marketing into one structured, transparent process:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem", position: "relative" }}>
            {/* Step 1 */}
            <div 
              style={{ background: "#f8faf9", border: "1px solid #d7e0db", borderRadius: "8px", padding: "1rem 0.75rem", textAlign: "center", cursor: "pointer" }}
              onClick={() => onTabChange("add-produce")}
            >
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#e8f5e9", color: "#1b5e20", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.5rem", fontWeight: 800, fontSize: "14px" }}>
                1
              </div>
              <strong style={{ fontSize: "0.85rem", color: "var(--color-primary-900)", display: "block" }}>Add Produce</strong>
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>Record crop, quantity, quality & harvest</span>
            </div>

            {/* Step 2 */}
            <div 
              style={{ background: "#f8faf9", border: "1px solid #d7e0db", borderRadius: "8px", padding: "1rem 0.75rem", textAlign: "center", cursor: "pointer" }}
              onClick={() => onTabChange("prices")}
            >
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#e8f5e9", color: "#1b5e20", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.5rem", fontWeight: 800, fontSize: "14px" }}>
                2
              </div>
              <strong style={{ fontSize: "0.85rem", color: "var(--color-primary-900)", display: "block" }}>Check Prices</strong>
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>Agmarknet & APMC mandi modal rates</span>
            </div>

            {/* Step 3 */}
            <div 
              style={{ background: "#f8faf9", border: "1px solid #d7e0db", borderRadius: "8px", padding: "1rem 0.75rem", textAlign: "center", cursor: "pointer" }}
              onClick={() => onTabChange("recommendation")}
            >
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#fef3c7", color: "#b45309", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.5rem", fontWeight: 800, fontSize: "14px" }}>
                3
              </div>
              <strong style={{ fontSize: "0.85rem", color: "var(--color-amber-900)", display: "block" }}>Smart Advisory</strong>
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>Sell Now / Store / Process options</span>
            </div>

            {/* Step 4 */}
            <div 
              style={{ background: "#f8faf9", border: "1px solid #d7e0db", borderRadius: "8px", padding: "1rem 0.75rem", textAlign: "center", cursor: "pointer" }}
              onClick={() => onTabChange("facilities")}
            >
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#e8f5e9", color: "#1b5e20", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.5rem", fontWeight: 800, fontSize: "14px" }}>
                4
              </div>
              <strong style={{ fontSize: "0.85rem", color: "var(--color-primary-900)", display: "block" }}>Storage & Units</strong>
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>Nearby cold storage & food processors</span>
            </div>

            {/* Step 5 */}
            <div 
              style={{ background: "#f8faf9", border: "1px solid #d7e0db", borderRadius: "8px", padding: "1rem 0.75rem", textAlign: "center", cursor: "pointer" }}
              onClick={() => onTabChange("buyers")}
            >
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#e8f5e9", color: "#1b5e20", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.5rem", fontWeight: 800, fontSize: "14px" }}>
                5
              </div>
              <strong style={{ fontSize: "0.85rem", color: "var(--color-primary-900)", display: "block" }}>Find Buyer</strong>
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>Direct bulk purchasers & verified FPOs</span>
            </div>

            {/* Step 6 */}
            <div 
              style={{ background: "#f8faf9", border: "1px solid #d7e0db", borderRadius: "8px", padding: "1rem 0.75rem", textAlign: "center", cursor: "pointer" }}
              onClick={() => onTabChange("deal-room")}
            >
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#fef3c7", color: "#b45309", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.5rem", fontWeight: 800, fontSize: "14px" }}>
                6
              </div>
              <strong style={{ fontSize: "0.85rem", color: "var(--color-amber-900)", display: "block" }}>Negotiate & Pay</strong>
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>In-app offer locking & digital escrow</span>
            </div>

            {/* Step 7 */}
            <div 
              style={{ background: "#f8faf9", border: "1px solid #d7e0db", borderRadius: "8px", padding: "1rem 0.75rem", textAlign: "center", cursor: "pointer" }}
              onClick={() => onTabChange("records")}
            >
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#e8f5e9", color: "#1b5e20", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.5rem", fontWeight: 800, fontSize: "14px" }}>
                7
              </div>
              <strong style={{ fontSize: "0.85rem", color: "var(--color-primary-900)", display: "block" }}>Records & Slip</strong>
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>Digital passbook, invoice & rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Why AgriSathi (Real-world Agriculture Value Proposition) */}
      <div className="grid-3" style={{ marginTop: "1.5rem" }}>
        <div className="gov-card">
          <div className="gov-card-body">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div style={{ background: "#e8f5e9", padding: "0.5rem", borderRadius: "6px", color: "#1b5e20" }}>
                <TrendingUp size={24} />
              </div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--color-primary-900)" }}>
                Zero Middlemen Commission
              </h3>
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
              Direct transparent connection with verified institutional buyers, agricultural cooperatives, and food processors. Keep 100% of your produce value.
            </p>
          </div>
        </div>

        <div className="gov-card">
          <div className="gov-card-body">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div style={{ background: "#fef3c7", padding: "0.5rem", borderRadius: "6px", color: "#b45309" }}>
                <Warehouse size={24} />
              </div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--color-amber-900)" }}>
                Scientific Storage Advisory
              </h3>
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
              Avoid distress selling during peak post-harvest gluts. Get actionable advice on whether to sell immediately or store in nearby subsidised cold rooms.
            </p>
          </div>
        </div>

        <div className="gov-card">
          <div className="gov-card-body">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div style={{ background: "#e0f2fe", padding: "0.5rem", borderRadius: "6px", color: "#0369a1" }}>
                <CreditCard size={24} />
              </div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0c4a6e" }}>
                Guaranteed Digital Settlement
              </h3>
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
              Locked deal pricing with in-app payment escrow and direct bank settlement. Automatic digital receipts provide formal proof of agricultural income.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
