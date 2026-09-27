import React from "react";
import { 
  PlusCircle, TrendingUp, Warehouse, ShoppingBag, 
  Truck, Sparkles, CheckCircle2, ArrowRight, Clock, 
  AlertTriangle, MapPin, Tag, ChevronRight, FileText, Factory 
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
    <div>
      {/* 1. Farmer Welcome & Location Bar */}
      <div 
        style={{
          background: "var(--color-bg-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          padding: "1.25rem 1.5rem",
          marginBottom: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          boxShadow: "var(--shadow-sm)"
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
            <span style={{ fontSize: "1.25rem" }}>🌾</span>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-primary-900)" }}>
              {t.welcomeFarmer}, {farmer?.name || "Kisan Bandhu"}
            </h2>
            <span className="badge badge-success">KYC Verified</span>
          </div>
          <div style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <span>📍 {farmer?.location || "Pimpalgaon Baswant, Niphad"}, {farmer?.district}, {farmer?.state}</span>
            <span>•</span>
            <span>Kisan ID: <strong>{farmer?.id || "FARMER-MH-4291"}</strong></span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button 
            className="btn btn-primary"
            onClick={() => onTabChange("add-produce")}
          >
            <PlusCircle size={17} />
            <span>{t.actionAddProduce}</span>
          </button>
        </div>
      </div>

      {/* Agro-Climatic Weather & Harvest Dispatch Advisory */}
      <div 
        style={{
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: "var(--radius-lg)",
          padding: "0.85rem 1.25rem",
          marginBottom: "1.25rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{ fontSize: "1.35rem" }}>⛅</span>
          <div>
            <strong style={{ fontSize: "0.875rem", color: "#166534" }}>
              Nashik Agro-Climatic Advisory: 29°C (Clear & Dry Conditions)
            </strong>
            <div style={{ fontSize: "0.775rem", color: "#15803d" }}>
              Optimal conditions for Tomato plucking & Onion shade curing • No rainfall expected for next 4 days • Safe for open tractor/truck haulage.
            </div>
          </div>
        </div>
        <span className="badge badge-success">
          IMD Agromet Active
        </span>
      </div>

      {/* 2. Key Summary Cards */}
      <div className="grid-4" style={{ marginBottom: "1.5rem" }}>
        <div className="gov-card" style={{ marginBottom: 0 }}>
          <div className="gov-card-body" style={{ padding: "1rem 1.25rem" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--color-text-subtle)", fontWeight: 600, textTransform: "uppercase" }}>
              {t.statsActiveProduce}
            </div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--color-primary-800)", marginTop: "0.25rem" }}>
              {activeProduce.length} <span style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Lots ({totalQuantity} Qtl)</span>
            </div>
          </div>
        </div>

        <div className="gov-card" style={{ marginBottom: 0 }}>
          <div className="gov-card-body" style={{ padding: "1rem 1.25rem" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--color-text-subtle)", fontWeight: 600, textTransform: "uppercase" }}>
              Tomato APMC Realization
            </div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--color-success)", marginTop: "0.25rem" }}>
              ₹2,350 <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--color-text-muted)" }}>/Qtl (▲ +₹120)</span>
            </div>
          </div>
        </div>

        <div className="gov-card" style={{ marginBottom: 0 }}>
          <div className="gov-card-body" style={{ padding: "1rem 1.25rem" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--color-text-subtle)", fontWeight: 600, textTransform: "uppercase" }}>
              Active Buyer Deals
            </div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--color-amber-700)", marginTop: "0.25rem" }}>
              1 <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Confirmed (₹2.30 L)</span>
            </div>
          </div>
        </div>

        <div className="gov-card" style={{ marginBottom: 0 }}>
          <div className="gov-card-body" style={{ padding: "1rem 1.25rem" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--color-text-subtle)", fontWeight: 600, textTransform: "uppercase" }}>
              Total Settled Revenue
            </div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--color-primary-900)", marginTop: "0.25rem" }}>
              ₹3,72,000 <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Direct DBT</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Smart Produce Recommendation Banner (PRD Section 6 & 10) */}
      <div 
        style={{
          background: "linear-gradient(to right, #fefce8, #fef9c3)",
          border: "1px solid #fef08a",
          borderRadius: "var(--radius-lg)",
          padding: "1.25rem 1.5rem",
          marginBottom: "1.5rem",
          boxShadow: "var(--shadow-sm)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
              <Sparkles size={18} color="#b45309" />
              <strong style={{ fontSize: "1rem", color: "var(--color-amber-900)" }}>
                {t.smartRecTitle} (फसल विपणन सलाह)
              </strong>
              <span className="badge badge-warning">High Priority</span>
            </div>
            <p style={{ fontSize: "0.925rem", color: "#854d0e", lineHeight: 1.5, maxWidth: "750px" }}>
              Your <strong>Tomato produce (120 Quintals)</strong> harvested on 22 Sept is ready. Current Pimpalgaon APMC mandi price is <strong>₹2,350/Qtl</strong> (trending upward). Suggested options: <strong>Sell Now</strong> to MahaAgro FPO or <strong>Process</strong> into tomato paste cluster 5.8 km away.
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button 
              className="btn btn-accent btn-sm"
              onClick={() => {
                if (produceList[0]) onSelectProduceForAdvisory(produceList[0].id);
                onTabChange("recommendation");
              }}
            >
              <span>View Full Advisory</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Quick Actions Grid (PRD Section 6) */}
      <div className="gov-card">
        <div className="gov-card-header">
          <span className="gov-card-title">{t.quickActions}</span>
          <span style={{ fontSize: "0.8rem", color: "var(--color-text-subtle)" }}>Single-touch access to key services</span>
        </div>
        <div className="gov-card-body">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
            <button 
              className="btn btn-secondary"
              style={{ justifyContent: "flex-start", padding: "1rem", height: "auto" }}
              onClick={() => onTabChange("add-produce")}
            >
              <div style={{ background: "#e8f5e9", color: "#1b5e20", padding: "0.5rem", borderRadius: "6px", marginRight: "0.5rem" }}>
                <PlusCircle size={22} />
              </div>
              <div style={{ textAlign: "left" }}>
                <strong style={{ display: "block", fontSize: "0.9rem" }}>{t.actionAddProduce}</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>Record new crop harvest</span>
              </div>
            </button>

            <button 
              className="btn btn-secondary"
              style={{ justifyContent: "flex-start", padding: "1rem", height: "auto" }}
              onClick={() => onTabChange("prices")}
            >
              <div style={{ background: "#e8f5e9", color: "#1b5e20", padding: "0.5rem", borderRadius: "6px", marginRight: "0.5rem" }}>
                <TrendingUp size={22} />
              </div>
              <div style={{ textAlign: "left" }}>
                <strong style={{ display: "block", fontSize: "0.9rem" }}>{t.actionCheckPrices}</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>Live Agmarknet rates</span>
              </div>
            </button>

            <button 
              className="btn btn-secondary"
              style={{ justifyContent: "flex-start", padding: "1rem", height: "auto" }}
              onClick={() => onTabChange("facilities")}
            >
              <div style={{ background: "#fef3c7", color: "#b45309", padding: "0.5rem", borderRadius: "6px", marginRight: "0.5rem" }}>
                <Warehouse size={22} />
              </div>
              <div style={{ textAlign: "left" }}>
                <strong style={{ display: "block", fontSize: "0.9rem" }}>{t.actionFindStorage}</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>Cold storage & WDRA silos</span>
              </div>
            </button>

            <button 
              className="btn btn-secondary"
              style={{ justifyContent: "flex-start", padding: "1rem", height: "auto" }}
              onClick={() => onTabChange("buyers")}
            >
              <div style={{ background: "#e0f2fe", color: "#0369a1", padding: "0.5rem", borderRadius: "6px", marginRight: "0.5rem" }}>
                <ShoppingBag size={22} />
              </div>
              <div style={{ textAlign: "left" }}>
                <strong style={{ display: "block", fontSize: "0.9rem" }}>{t.actionFindBuyers}</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>Verified FPOs & traders</span>
              </div>
            </button>

            <button 
              className="btn btn-secondary"
              style={{ justifyContent: "flex-start", padding: "1rem", height: "auto" }}
              onClick={() => onTabChange("transport")}
            >
              <div style={{ background: "#f3e8ff", color: "#7e22ce", padding: "0.5rem", borderRadius: "6px", marginRight: "0.5rem" }}>
                <Truck size={22} />
              </div>
              <div style={{ textAlign: "left" }}>
                <strong style={{ display: "block", fontSize: "0.9rem" }}>{t.actionBookTransport}</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>Pickups & reefer vans</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 5. Recent Produce Inventory (PRD Section 6) */}
      <div className="gov-card">
        <div className="gov-card-header">
          <span className="gov-card-title">
            {t.recentProduce}
          </span>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => onTabChange("add-produce")}
          >
            + {t.actionAddProduce}
          </button>
        </div>

        <div className="gov-card-body" style={{ padding: 0 }}>
          <div className="gov-table-container" style={{ border: "none", borderRadius: 0 }}>
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
                {produceList && produceList.length > 0 ? (
                  produceList.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <strong style={{ color: "var(--color-primary-900)" }}>{p.cropName}</strong>
                        <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>ID: {p.id}</div>
                      </td>
                      <td>{p.variety || "Standard"}</td>
                      <td><strong>{p.quantity}</strong> Quintals</td>
                      <td>
                        <span className="badge badge-info">{p.quality}</span>
                      </td>
                      <td>₹{p.askingPrice?.toLocaleString()}</td>
                      <td>{p.harvestDate}</td>
                      <td>
                        {p.status === "ACTIVE" && <span className="badge badge-success">Ready / Active</span>}
                        {p.status === "IN_NEGOTIATION" && <span className="badge badge-warning">Negotiating</span>}
                        {p.status === "SOLD" && <span className="badge badge-neutral">Sold & Settled</span>}
                        {p.status === "STORED" && <span className="badge badge-info">In Cold Storage</span>}
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "0.35rem" }}>
                          <button 
                            className="btn btn-secondary btn-sm"
                            title="Analyze Sell vs Store vs Process"
                            onClick={() => {
                              onSelectProduceForAdvisory(p.id);
                              onTabChange("recommendation");
                            }}
                          >
                            <Sparkles size={13} color="#b45309" />
                            <span>Advisory</span>
                          </button>
                          <button 
                            className="btn btn-primary btn-sm"
                            title="Find buyers for this crop"
                            onClick={() => onTabChange("buyers")}
                          >
                            <span>Buyers</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center", padding: "2rem", color: "var(--color-text-muted)" }}>
                      {t.noProduceMsg}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
