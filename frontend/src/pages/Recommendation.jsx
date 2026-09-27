import React, { useState, useEffect } from "react";
import { 
  Sparkles, CheckCircle, TrendingUp, Warehouse, 
  Factory, ArrowRight, DollarSign, ShieldAlert, 
  HelpCircle, ChevronRight 
} from "lucide-react";
import { api } from "../services/api";

export default function Recommendation({ 
  produceList, 
  selectedProduceId, 
  onSelectProduce, 
  onTabChange, 
  t 
}) {
  const [currentId, setCurrentId] = useState(selectedProduceId || (produceList[0]?.id || "PROD-101"));
  const [advisory, setAdvisory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentId) return;
    setLoading(true);
    api.getRecommendation(currentId)
      .then((res) => {
        setAdvisory(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [currentId]);

  const selectedItem = produceList.find(p => p.id === currentId) || produceList[0] || { cropName: "Tomato", quantity: 120, quality: "Grade A" };

  return (
    <div>
      {/* 1. Header Banner */}
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
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
          <Sparkles size={22} color="var(--color-amber-700)" />
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-amber-900)" }}>
            {t.smartRecTitle} (स्मार्ट उपज निर्णय सलाहकार)
          </h2>
        </div>
        <p style={{ fontSize: "0.875rem", color: "#854d0e" }}>
          {t.smartRecSub}. Combines real-time APMC arrivals, commodity perishability, local cold storage availability, and processing value addition.
        </p>
      </div>

      {/* 2. Select Produce to Analyze */}
      <div className="gov-card">
        <div className="gov-card-body" style={{ padding: "1rem 1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <strong style={{ fontSize: "0.9rem", color: "var(--color-primary-900)" }}>
              Select Produce from Inventory:
            </strong>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {produceList.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setCurrentId(p.id)}
                  className={`btn btn-sm ${currentId === p.id ? "btn-primary" : "btn-secondary"}`}
                >
                  <span>{p.cropName} ({p.quantity} Qtl)</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Primary Recommendation Verdict */}
      {advisory && (
        <div className="gov-card" style={{ borderColor: advisory.recommendation === "SELL_NOW" ? "#16a34a" : "#d97706", borderWidth: "2px" }}>
          <div className="gov-card-header" style={{ background: advisory.recommendation === "SELL_NOW" ? "#f0fdf4" : "#fffbeb" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CheckCircle size={20} color={advisory.recommendation === "SELL_NOW" ? "#16a34a" : "#d97706"} />
              <strong style={{ fontSize: "1.1rem", color: advisory.recommendation === "SELL_NOW" ? "#15803d" : "#b45309" }}>
                Primary Recommendation: {advisory.recommendationTitle}
              </strong>
            </div>
            <span className="badge badge-success">
              Confidence Score: {Math.round((advisory.confidence || 0.9) * 100)}%
            </span>
          </div>

          <div className="gov-card-body">
            <p style={{ fontSize: "1rem", color: "var(--color-text-main)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
              {advisory.reason}
            </p>

            <div className="grid-3" style={{ background: "#f8faf9", padding: "1rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)", fontWeight: 600 }}>Your Expected Rate</div>
                <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text-main)" }}>
                  ₹{advisory.marketComparison?.yourAskingPrice?.toLocaleString()} /Qtl
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)", fontWeight: 600 }}>Current Mandi Modal Rate</div>
                <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-success)" }}>
                  ₹{advisory.marketComparison?.currentMandiModalPrice?.toLocaleString()} /Qtl
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)", fontWeight: 600 }}>Mandi Peak / Maximum Rate</div>
                <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-primary-800)" }}>
                  ₹{advisory.marketComparison?.maxMandiPrice?.toLocaleString()} /Qtl
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Three Actionable Pathways (PRD Section 10: Sell Now vs Store vs Process) */}
      <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--color-primary-900)", marginBottom: "1rem" }}>
        Comparative Evaluation of All 3 Pathways:
      </h3>

      <div className="grid-3">
        {/* Pathway 1: Sell Now */}
        <div 
          className="gov-card"
          style={{
            borderTop: advisory?.recommendation === "SELL_NOW" ? "4px solid #16a34a" : "1px solid var(--color-border)",
            background: advisory?.recommendation === "SELL_NOW" ? "#ffffff" : "#fdfefe"
          }}
        >
          <div className="gov-card-header">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <TrendingUp size={18} color="#16a34a" />
              <strong style={{ fontSize: "1rem", color: "#166534" }}>Option 1: {t.sellNow}</strong>
            </div>
            {advisory?.recommendation === "SELL_NOW" && (
              <span className="badge badge-success">Recommended</span>
            )}
          </div>
          <div className="gov-card-body">
            <div style={{ marginBottom: "0.85rem", fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.5 }}>
              Immediate liquidity. Farmgate pickup available via active bulk buyers with zero storage or post-harvest loss.
            </div>
            <div style={{ background: "#f0fdf4", padding: "0.75rem", borderRadius: "6px", marginBottom: "1rem", fontSize: "0.85rem" }}>
              <strong>Estimated Net Realization:</strong><br />
              {selectedItem.quantity} Qtl × ₹2,350 = <span style={{ color: "#15803d", fontWeight: 700 }}>₹{(selectedItem.quantity * 2350).toLocaleString()}</span>
            </div>
            <button 
              className="btn btn-primary"
              style={{ width: "100%" }}
              onClick={() => onTabChange("buyers")}
            >
              <span>Connect with Buyers</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Pathway 2: Store */}
        <div 
          className="gov-card"
          style={{
            borderTop: advisory?.recommendation === "STORE" ? "4px solid #d97706" : "1px solid var(--color-border)",
            background: advisory?.recommendation === "STORE" ? "#ffffff" : "#fdfefe"
          }}
        >
          <div className="gov-card-header">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Warehouse size={18} color="#d97706" />
              <strong style={{ fontSize: "1rem", color: "#92400e" }}>Option 2: {t.store}</strong>
            </div>
            {advisory?.recommendation === "STORE" && (
              <span className="badge badge-warning">Recommended</span>
            )}
          </div>
          <div className="gov-card-body">
            <div style={{ marginBottom: "0.85rem", fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.5 }}>
              Hold for 30–60 days in cold room or WDRA silo. Qualifies for e-NWR pledge loan at 7% subsidised interest.
            </div>
            <div style={{ background: "#fffbeb", padding: "0.75rem", borderRadius: "6px", marginBottom: "1rem", fontSize: "0.85rem" }}>
              <strong>Storage Rental & Gain:</strong><br />
              Storage Cost: ₹85/Qtl/mo • Expected Price: ₹2,600/Qtl (Net +₹165/Qtl)
            </div>
            <button 
              className="btn btn-secondary"
              style={{ width: "100%" }}
              onClick={() => onTabChange("facilities")}
            >
              <span>Find Cold Storage</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Pathway 3: Process */}
        <div 
          className="gov-card"
          style={{
            borderTop: advisory?.recommendation === "PROCESS" ? "4px solid #0284c7" : "1px solid var(--color-border)",
            background: advisory?.recommendation === "PROCESS" ? "#ffffff" : "#fdfefe"
          }}
        >
          <div className="gov-card-header">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Factory size={18} color="#0284c7" />
              <strong style={{ fontSize: "1rem", color: "#075985" }}>Option 3: {t.process}</strong>
            </div>
          </div>
          <div className="gov-card-body">
            <div style={{ marginBottom: "0.85rem", fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.5 }}>
              Contract processing into pulp/puree or dehydrated flakes. Protects against seasonal price crashes.
            </div>
            <div style={{ background: "#f0f9ff", padding: "0.75rem", borderRadius: "6px", marginBottom: "1rem", fontSize: "0.85rem" }}>
              <strong>Cluster Procurement:</strong><br />
              Godavari Agro Unit offering buyback at ₹2,450/Qtl net.
            </div>
            <button 
              className="btn btn-secondary"
              style={{ width: "100%" }}
              onClick={() => onTabChange("facilities")}
            >
              <span>View Processing Units</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
