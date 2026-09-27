import React from "react";
import { 
  PlusCircle, TrendingUp, Warehouse, ShoppingBag, 
  Truck, Sparkles, CheckCircle2, ArrowRight, 
  AlertTriangle, Tag, ChevronRight, FileText, 
  IndianRupee, Package, HandCoins, CloudSun
} from "lucide-react";

export default function Dashboard({ 
  farmer, 
  produceList, 
  onTabChange, 
  onSelectProduceForAdvisory, 
  t 
}) {
  const activeProduce = produceList.filter(p => p.status === "ACTIVE" || p.status === "IN_NEGOTIATION");
  const totalQuantity = produceList.reduce((acc, curr) => acc + (parseFloat(curr.quantity) || 0), 0);

  return (
    <div className="animate-fade-in-up">
      {/* 1. Farmer Welcome Banner */}
      <div 
        style={{
          background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 60%, #1a6b24 100%)",
          color: "#ffffff",
          borderRadius: "var(--radius-xl)",
          padding: "1.5rem",
          marginBottom: "1.25rem",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 4px 16px rgba(27, 94, 32, 0.25)"
        }}
      >
        {/* background pattern */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='3' fill='%23ffffff' fill-opacity='0.04'/%3E%3C/svg%3E\")",
          pointerEvents: "none"
        }} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
              <span style={{ fontSize: "1.5rem" }}>🌾</span>
              <h2 style={{ fontSize: "clamp(1.1rem, 2.5vw + 0.4rem, 1.5rem)", fontWeight: 800, color: "#ffffff", lineHeight: 1.2 }}>
                {t.welcomeFarmer}, {farmer?.name?.split(" ")[0] || "Kisan Bandhu"}!
              </h2>
              <span className="badge badge-success" style={{ background: "rgba(255,255,255,0.2)", color: "#ffffff", borderColor: "rgba(255,255,255,0.3)", fontSize: "0.65rem" }}>
                KYC ✓
              </span>
            </div>
            <div style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.82)", display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
              <span>📍 {farmer?.location || "Pimpalgaon Baswant, Niphad"}, {farmer?.district || "Nashik"}</span>
              <span style={{ opacity: 0.5 }}>•</span>
              <span>ID: <strong style={{ color: "#ffd54f" }}>{farmer?.id || "FARMER-MH-4291"}</strong></span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button 
              className="btn btn-accent"
              onClick={() => onTabChange("add-produce")}
              style={{ background: "rgba(255,255,255,0.95)", color: "var(--color-primary-900)", borderColor: "transparent" }}
            >
              <PlusCircle size={17} />
              <span>{t.actionAddProduce}</span>
            </button>
            <button
              className="btn"
              style={{ background: "rgba(255,255,255,0.15)", color: "#ffffff", borderColor: "rgba(255,255,255,0.3)" }}
              onClick={() => onTabChange("prices")}
            >
              <TrendingUp size={17} />
              <span style={{ display: "none" }}>Live Prices</span>
              <span className="hide-xs">Live Prices</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Weather & Agro Advisory Strip */}
      <div className="info-strip" style={{ marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
          <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>⛅</span>
          <div>
            <strong style={{ fontSize: "0.875rem", color: "#166534", display: "block" }}>
              Nashik Agro-Climatic Advisory: 29°C (Clear &amp; Dry)
            </strong>
            <span style={{ fontSize: "0.775rem", color: "#15803d" }}>
              Optimal for Tomato plucking &amp; Onion curing • No rain for 4 days • Safe for haulage
            </span>
          </div>
        </div>
        <span className="badge badge-success" style={{ flexShrink: 0 }}>
          <span className="live-dot" style={{ marginRight: "4px" }} />
          IMD Agromet
        </span>
      </div>

      {/* 3. Key Summary Stat Cards */}
      <div className="grid-4" style={{ marginBottom: "1.5rem" }}>
        {/* Active Produce */}
        <div className="stat-card" style={{ "--card-accent": "var(--color-primary-700)" }}>
          <div className="stat-card-icon" style={{ background: "var(--color-primary-100)", color: "var(--color-primary-800)" }}>
            <Package size={20} />
          </div>
          <div className="stat-card-value" style={{ color: "var(--color-primary-800)" }}>
            {activeProduce.length}
          </div>
          <div className="stat-card-label">{t.statsActiveProduce}</div>
          <div className="stat-card-sub">{totalQuantity} Quintals total</div>
        </div>

        {/* APMC Price */}
        <div className="stat-card" style={{ "--card-accent": "#16a34a" }}>
          <div className="stat-card-icon" style={{ background: "#dcfce7", color: "#15803d" }}>
            <TrendingUp size={20} />
          </div>
          <div className="stat-card-value" style={{ color: "#15803d" }}>₹2,350</div>
          <div className="stat-card-label">Tomato APMC Rate</div>
          <div className="stat-card-sub" style={{ color: "#15803d" }}>▲ +₹120 (↑5.4%)</div>
        </div>

        {/* Active Deals */}
        <div className="stat-card" style={{ "--card-accent": "var(--color-amber-500)" }}>
          <div className="stat-card-icon" style={{ background: "var(--color-amber-100)", color: "var(--color-amber-700)" }}>
            <HandCoins size={20} />
          </div>
          <div className="stat-card-value" style={{ color: "var(--color-amber-700)" }}>1</div>
          <div className="stat-card-label">Active Buyer Deal</div>
          <div className="stat-card-sub">Confirmed ₹2.30L</div>
        </div>

        {/* Total Revenue */}
        <div className="stat-card" style={{ "--card-accent": "var(--color-primary-900)" }}>
          <div className="stat-card-icon" style={{ background: "var(--color-primary-50)", color: "var(--color-primary-800)" }}>
            <IndianRupee size={20} />
          </div>
          <div className="stat-card-value" style={{ color: "var(--color-primary-900)", fontSize: "clamp(1.1rem, 2vw + 0.3rem, 1.45rem)" }}>₹3,72,000</div>
          <div className="stat-card-label">Total Settled Revenue</div>
          <div className="stat-card-sub">Via Direct DBT</div>
        </div>
      </div>

      {/* 4. Smart Advisory Banner */}
      <div className="advisory-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
              <Sparkles size={18} color="var(--color-amber-700)" />
              <strong style={{ fontSize: "1rem", color: "var(--color-amber-900)" }}>
                {t.smartRecTitle} (फसल विपणन सलाह)
              </strong>
              <span className="badge badge-warning">High Priority</span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "#854d0e", lineHeight: 1.6 }}>
              Your <strong>Tomato (120 Qtl)</strong> harvested Sept 22 is ready. Pimpalgaon APMC modal: <strong>₹2,350/Qtl ▲</strong>. 
              Options: <strong>Sell Now</strong> to MahaAgro FPO or <strong>Process</strong> at Godavari Cluster (5.8 km).
            </p>
          </div>
          <button 
            className="btn btn-accent btn-sm"
            style={{ flexShrink: 0 }}
            onClick={() => {
              if (produceList[0]) onSelectProduceForAdvisory(produceList[0].id);
              onTabChange("recommendation");
            }}
          >
            <span>View Advisory</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* 5. Quick Actions Grid */}
      <div className="gov-card">
        <div className="gov-card-header">
          <span className="gov-card-title">⚡ {t.quickActions}</span>
          <span style={{ fontSize: "0.78rem", color: "var(--color-text-subtle)" }}>Single-touch access</span>
        </div>
        <div className="gov-card-body">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.85rem" }}>
            {[
              { icon: <PlusCircle size={22} />, color: "#1b5e20", bg: "#e8f5e9", label: t.actionAddProduce, sub: "Record new crop", tab: "add-produce" },
              { icon: <TrendingUp size={22} />, color: "#1b5e20", bg: "#e8f5e9", label: t.actionCheckPrices, sub: "Agmarknet live", tab: "prices" },
              { icon: <Warehouse size={22} />, color: "#b45309", bg: "#fef3c7", label: t.actionFindStorage, sub: "Cold storage & WDRA", tab: "facilities" },
              { icon: <ShoppingBag size={22} />, color: "#1d4ed8", bg: "#dbeafe", label: t.actionFindBuyers, sub: "Verified FPOs", tab: "buyers" },
              { icon: <Truck size={22} />, color: "#7e22ce", bg: "#f3e8ff", label: t.actionBookTransport, sub: "Pickups & reefer", tab: "transport" },
            ].map((action, i) => (
              <button
                key={i}
                className="quick-action-btn"
                onClick={() => onTabChange(action.tab)}
              >
                <div className="quick-action-icon" style={{ background: action.bg, color: action.color }}>
                  {action.icon}
                </div>
                <div style={{ textAlign: "left", minWidth: 0 }}>
                  <strong style={{ display: "block", fontSize: "0.875rem", color: "var(--color-text-main)" }}>{action.label}</strong>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>{action.sub}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Produce Inventory Table */}
      <div className="gov-card">
        <div className="gov-card-header">
          <span className="gov-card-title">
            <Package size={18} />
            {t.recentProduce}
          </span>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => onTabChange("add-produce")}
          >
            <PlusCircle size={14} />
            {t.actionAddProduce}
          </button>
        </div>

        {/* Mobile card view */}
        <div style={{ padding: "1rem" }}>
          {produceList && produceList.length > 0 ? (
            <>
              {/* Desktop table */}
              <div className="produce-table-wrapper">
                <div className="table-scroll-hint">↔ Scroll to see all produce details</div>
                <div className="gov-table-container" style={{ border: "none", borderRadius: "var(--radius-md)" }}>
                  <table className="gov-table">
                    <thead>
                      <tr>
                        <th>{t.crop}</th>
                        <th>{t.variety}</th>
                        <th>{t.quantity}</th>
                        <th>{t.quality}</th>
                        <th>{t.askingPrice}</th>
                        <th>Harvest Date</th>
                        <th>{t.status}</th>
                        <th>{t.actions}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {produceList.map((p) => (
                        <tr key={p.id}>
                          <td>
                            <strong style={{ color: "var(--color-primary-900)", fontSize: "0.9rem" }}>{p.cropName}</strong>
                            <div style={{ fontSize: "0.72rem", color: "var(--color-text-subtle)" }}>ID: {p.id}</div>
                          </td>
                          <td style={{ fontSize: "0.85rem" }}>{p.variety || "Standard"}</td>
                          <td><strong>{p.quantity}</strong> <span style={{ color: "var(--color-text-subtle)", fontSize: "0.8rem" }}>Qtl</span></td>
                          <td><span className="badge badge-info">{p.quality}</span></td>
                          <td><strong style={{ color: "var(--color-primary-800)" }}>₹{p.askingPrice?.toLocaleString()}</strong></td>
                          <td style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>{p.harvestDate}</td>
                          <td>
                            {p.status === "ACTIVE" && <span className="badge badge-success">Active</span>}
                            {p.status === "IN_NEGOTIATION" && <span className="badge badge-warning">Negotiating</span>}
                            {p.status === "SOLD" && <span className="badge badge-neutral">Sold</span>}
                            {p.status === "STORED" && <span className="badge badge-info">Stored</span>}
                          </td>
                          <td>
                            <div style={{ display: "flex", gap: "0.35rem" }}>
                              <button 
                                className="btn btn-secondary btn-sm"
                                onClick={() => { onSelectProduceForAdvisory(p.id); onTabChange("recommendation"); }}
                              >
                                <Sparkles size={13} color="var(--color-amber-700)" />
                                <span>Advisory</span>
                              </button>
                              <button 
                                className="btn btn-primary btn-sm"
                                onClick={() => onTabChange("buyers")}
                              >
                                Buyers
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile card view */}
              {produceList.map((p) => (
                <div key={p.id} className="produce-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem" }}>
                    <div>
                      <strong style={{ fontSize: "1rem", color: "var(--color-primary-900)" }}>{p.cropName}</strong>
                      <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>{p.variety} • ID: {p.id}</div>
                    </div>
                    {p.status === "ACTIVE" && <span className="badge badge-success">Active</span>}
                    {p.status === "IN_NEGOTIATION" && <span className="badge badge-warning">Negotiating</span>}
                    {p.status === "SOLD" && <span className="badge badge-neutral">Sold</span>}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "0.75rem", fontSize: "0.85rem" }}>
                    <div>
                      <span style={{ color: "var(--color-text-subtle)", fontSize: "0.75rem" }}>Quantity</span>
                      <div><strong>{p.quantity}</strong> Qtl</div>
                    </div>
                    <div>
                      <span style={{ color: "var(--color-text-subtle)", fontSize: "0.75rem" }}>Asking Price</span>
                      <div><strong style={{ color: "var(--color-primary-800)" }}>₹{p.askingPrice?.toLocaleString()}</strong>/Qtl</div>
                    </div>
                    <div>
                      <span style={{ color: "var(--color-text-subtle)", fontSize: "0.75rem" }}>Quality</span>
                      <div><span className="badge badge-info" style={{ fontSize: "0.65rem" }}>{p.quality}</span></div>
                    </div>
                    <div>
                      <span style={{ color: "var(--color-text-subtle)", fontSize: "0.75rem" }}>Harvest Date</span>
                      <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>{p.harvestDate}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button 
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1 }}
                      onClick={() => { onSelectProduceForAdvisory(p.id); onTabChange("recommendation"); }}
                    >
                      <Sparkles size={13} color="var(--color-amber-700)" />
                      Advisory
                    </button>
                    <button 
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1 }}
                      onClick={() => onTabChange("buyers")}
                    >
                      Find Buyers
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "2.5rem 1rem", color: "var(--color-text-muted)" }}>
              <Package size={40} color="var(--color-border)" style={{ margin: "0 auto 0.75rem" }} />
              <p style={{ marginBottom: "1rem" }}>{t.noProduceMsg}</p>
              <button className="btn btn-primary" onClick={() => onTabChange("add-produce")}>
                <PlusCircle size={17} />
                {t.actionAddProduce}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 7. Farmer Journey Summary */}
      <div className="gov-card">
        <div className="gov-card-header">
          <span className="gov-card-title">🛤️ Farmer Journey Status</span>
          <button className="btn btn-secondary btn-sm" onClick={() => onTabChange("records")}>
            <FileText size={14} /> View Records
          </button>
        </div>
        <div className="gov-card-body">
          <div className="journey-steps">
            {[
              { emoji: "📝", label: "Add Produce", done: true },
              { emoji: "📊", label: "Check Prices", done: true },
              { emoji: "🏭", label: "Find Storage", done: true },
              { emoji: "🤝", label: "Find Buyer", done: true },
              { emoji: "💬", label: "Negotiate", done: false },
              { emoji: "💳", label: "Payment", done: false },
              { emoji: "🚚", label: "Transport", done: false },
            ].map((step, i, arr) => (
              <React.Fragment key={i}>
                <div className="journey-step">
                  <div 
                    className="journey-step-icon"
                    style={{ 
                      background: step.done ? "var(--color-success-bg)" : "var(--color-bg-subtle)",
                      border: step.done ? "2px solid var(--color-success-border)" : "2px solid var(--color-border)"
                    }}
                  >
                    <span>{step.emoji}</span>
                  </div>
                  <div className="journey-step-label" style={{ color: step.done ? "var(--color-success)" : "var(--color-text-subtle)", fontSize: "0.65rem" }}>
                    {step.label}
                    {step.done && <div>✓</div>}
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div className="journey-connector" style={{ background: step.done ? "var(--color-success-border)" : "var(--color-border)" }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
