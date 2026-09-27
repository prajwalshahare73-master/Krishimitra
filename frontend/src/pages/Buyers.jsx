import React, { useState } from "react";
import { 
  ShoppingBag, ShieldCheck, Star, MapPin, Phone, 
  ArrowRight, Search, CheckCircle, MessageSquare 
} from "lucide-react";

export default function Buyers({ buyers, produceList, onStartDeal, onTabChange, t }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("All");

  const cropFilters = ["All", "Tomato", "Onion", "Soybean", "Wheat"];

  const filteredBuyers = buyers.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrop = selectedCrop === "All" || b.crop.toLowerCase() === selectedCrop.toLowerCase();
    return matchesSearch && matchesCrop;
  });

  return (
    <div>
      {/* 1. Header Banner */}
      <div 
        style={{
          background: "var(--color-bg-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          padding: "1.25rem 1.5rem",
          marginBottom: "1.5rem",
          boxShadow: "var(--shadow-sm)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
          <ShoppingBag size={22} color="var(--color-primary-800)" />
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-primary-900)" }}>
            {t.buyersTitle} (थोक खरीदार एवं एफपीओ बाजार)
          </h2>
        </div>
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
          Direct farmgate procurement by licensed agricultural buyers, food supply chains, and farmer producer companies (FPOs).
        </p>
      </div>

      {/* 2. Filters & Search */}
      <div className="gov-card">
        <div className="gov-card-body" style={{ padding: "1rem 1.25rem" }}>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ flex: "1 1 250px" }}>
              <input 
                type="text" 
                className="form-input"
                placeholder="Search by buyer name, crop, or mandi location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {cropFilters.map((c) => (
                <button
                  key={c}
                  className={`btn btn-sm ${selectedCrop === c ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => setSelectedCrop(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Buyers Directory List */}
      <div className="grid-2">
        {filteredBuyers.map((b) => (
          <div key={b.id} className="gov-card" style={{ marginBottom: "1rem" }}>
            <div className="gov-card-header">
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <strong style={{ fontSize: "1.05rem", color: "var(--color-primary-900)" }}>
                    {b.name}
                  </strong>
                  {b.verified && (
                    <span title="Govt. & APMC Verified Buyer" style={{ color: "#16a34a", display: "inline-flex" }}>
                      <ShieldCheck size={16} />
                    </span>
                  )}
                </div>
                <div style={{ fontSize: "0.775rem", color: "var(--color-text-subtle)", marginTop: "2px" }}>
                  {b.companyType} • ID: {b.id}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "3px", background: "#fef3c7", padding: "2px 8px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: 700, color: "#b45309" }}>
                <Star size={13} fill="#b45309" color="#b45309" />
                <span>{b.rating}</span>
              </div>
            </div>

            <div className="gov-card-body">
              <div className="grid-2" style={{ marginBottom: "1rem", background: "#f8faf9", padding: "0.85rem", borderRadius: "6px" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)", fontWeight: 600 }}>Required Crop:</div>
                  <strong style={{ fontSize: "1rem", color: "var(--color-primary-800)" }}>{b.crop}</strong>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)", fontWeight: 600 }}>Procurement Target:</div>
                  <strong style={{ fontSize: "1rem", color: "var(--color-text-main)" }}>{b.requiredQuantity} Quintals</strong>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)", fontWeight: 600 }}>Offered Procurement Price:</div>
                  <strong style={{ fontSize: "1.1rem", color: "var(--color-success)" }}>₹{b.offeredPrice.toLocaleString()} /Qtl</strong>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)", fontWeight: 600 }}>Distance:</div>
                  <span style={{ fontSize: "0.9rem", color: "var(--color-text-main)", fontWeight: 600 }}>📍 {b.distance} km away</span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.5rem" }}>
                <a 
                  href={`tel:${b.contact}`}
                  className="btn btn-secondary btn-sm"
                >
                  <Phone size={13} />
                  <span>{b.contact}</span>
                </a>

                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    const matchedProduce = produceList.find(p => p.cropName.toLowerCase() === b.crop.toLowerCase()) || produceList[0];
                    onStartDeal(b, matchedProduce);
                  }}
                >
                  <MessageSquare size={14} />
                  <span>Start In-App Deal Room</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
