import React, { useState } from "react";
import { 
  ShoppingBag, ShieldCheck, Star, MapPin, Phone, 
  MessageSquare, Search, Filter, TrendingUp, Package,
  CheckCircle2, Users, Award
} from "lucide-react";

export default function Buyers({ buyers, produceList, onStartDeal, onTabChange, t }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("All");

  const cropFilters = ["All", "Tomato", "Onion", "Soybean", "Wheat", "Cotton", "Potato"];

  const filteredBuyers = buyers.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrop = selectedCrop === "All" || b.crop.toLowerCase() === selectedCrop.toLowerCase();
    return matchesSearch && matchesCrop;
  });

  return (
    <div className="animate-fade-in">
      {/* 1. Page Header */}
      <div 
        style={{
          background: "linear-gradient(135deg, #fff9f0, #fef3c7)",
          border: "1.5px solid var(--color-amber-200)",
          borderRadius: "var(--radius-xl)",
          padding: "1.5rem",
          marginBottom: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "1rem"
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", marginBottom: "0.3rem" }}>
            <div style={{ background: "var(--color-amber-100)", padding: "0.4rem", borderRadius: "var(--radius-md)", color: "var(--color-amber-700)" }}>
              <ShoppingBag size={22} />
            </div>
            <h2 style={{ fontSize: "clamp(1.1rem, 2.5vw + 0.3rem, 1.45rem)", fontWeight: 800, color: "var(--color-amber-900)" }}>
              {t.buyersTitle}
            </h2>
          </div>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.5 }}>
            थोक खरीदार एवं एफपीओ बाजार • Direct farmgate procurement by licensed buyers, FPOs &amp; food supply chains.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
          {[
            { val: buyers.length, label: "Verified Buyers", icon: "✅" },
            { val: "4.9★", label: "Avg. Rating", icon: "⭐" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center", background: "#ffffff", border: "1px solid var(--color-amber-200)", padding: "0.6rem 0.85rem", borderRadius: "var(--radius-lg)" }}>
              <div style={{ fontSize: "0.65rem", color: "var(--color-text-subtle)", fontWeight: 600, textTransform: "uppercase", marginBottom: "0.1rem" }}>{s.icon} {s.label}</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--color-amber-900)" }}>{s.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Search & Filter */}
      <div className="gov-card" style={{ marginBottom: "1.25rem" }}>
        <div className="gov-card-body" style={{ padding: "1rem 1.25rem" }}>
          <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ flex: "1 1 240px", position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-subtle)", pointerEvents: "none" }} />
              <input 
                type="text" 
                className="form-input"
                style={{ paddingLeft: "2.25rem" }}
                placeholder="Search buyers, crop, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {cropFilters.map((c) => (
                <button
                  key={c}
                  className={`btn btn-sm ${selectedCrop === c ? "btn-accent" : "btn-secondary"}`}
                  onClick={() => setSelectedCrop(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div style={{ fontSize: "0.8rem", color: "var(--color-text-subtle)", marginBottom: "0.85rem", fontWeight: 500 }}>
        Showing {filteredBuyers.length} verified buyer{filteredBuyers.length !== 1 ? "s" : ""}
        {selectedCrop !== "All" && <span> for <strong>{selectedCrop}</strong></span>}
      </div>

      {/* 3. Buyer Cards */}
      {filteredBuyers.length > 0 ? (
        <div className="grid-2" style={{ gap: "1rem" }}>
          {filteredBuyers.map((b) => (
            <div key={b.id} className="entity-card" style={{ position: "relative", overflow: "hidden" }}>
              {/* Accent top bar */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: b.verified ? "var(--color-success)" : "var(--color-border)" }} />
              
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.85rem", paddingTop: "0.25rem" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
                    <strong style={{ fontSize: "0.975rem", color: "var(--color-primary-900)", lineHeight: 1.3 }}>
                      {b.name}
                    </strong>
                    {b.verified && (
                      <span title="Govt. & APMC Verified Buyer" style={{ color: "var(--color-success)", display: "inline-flex", flexShrink: 0 }}>
                        <ShieldCheck size={16} />
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)", marginTop: "2px" }}>
                    {b.companyType} • ID: {b.id}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "3px", background: "var(--color-amber-50)", border: "1px solid var(--color-amber-200)", padding: "0.22rem 0.5rem", borderRadius: "var(--radius-full)", fontSize: "0.8rem", fontWeight: 700, color: "var(--color-amber-700)", flexShrink: 0, marginLeft: "0.5rem" }}>
                  <Star size={12} fill="var(--color-amber-500)" color="var(--color-amber-500)" />
                  <span>{b.rating}</span>
                </div>
              </div>

              {/* Details Grid */}
              <div style={{ background: "var(--color-bg-subtle)", borderRadius: "var(--radius-md)", padding: "0.85rem", marginBottom: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "var(--color-text-subtle)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.03em" }}>Crop Needed</div>
                  <div style={{ fontWeight: 700, color: "var(--color-primary-800)", fontSize: "0.95rem", marginTop: "0.15rem" }}>
                    🌾 {b.crop}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "var(--color-text-subtle)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.03em" }}>Required Qty</div>
                  <div style={{ fontWeight: 700, color: "var(--color-text-main)", fontSize: "0.95rem", marginTop: "0.15rem" }}>
                    {b.requiredQuantity} Qtl
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "var(--color-text-subtle)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.03em" }}>Offered Price</div>
                  <div style={{ fontWeight: 800, color: "var(--color-success)", fontSize: "1.1rem", marginTop: "0.15rem" }}>
                    ₹{b.offeredPrice.toLocaleString()}<span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--color-text-muted)" }}>/Qtl</span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "var(--color-text-subtle)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.03em" }}>Distance</div>
                  <div style={{ fontWeight: 600, color: "var(--color-text-main)", fontSize: "0.9rem", marginTop: "0.15rem" }}>
                    📍 {b.distance} km
                  </div>
                </div>
              </div>

              {/* Location */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "1rem" }}>
                <MapPin size={14} color="var(--color-primary-700)" />
                <span>{b.location}</span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <a 
                  href={`tel:${b.contact}`}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: "0 1 auto" }}
                >
                  <Phone size={13} />
                  <span style={{ display: "none" }}>{b.contact}</span>
                  <span>Call</span>
                </a>
                <button 
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  onClick={() => {
                    const matchedProduce = produceList.find(p => p.cropName.toLowerCase() === b.crop.toLowerCase()) || produceList[0];
                    onStartDeal(b, matchedProduce);
                  }}
                >
                  <MessageSquare size={15} />
                  <span>Start Deal Room</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="gov-card">
          <div className="gov-card-body" style={{ textAlign: "center", padding: "3rem 1rem" }}>
            <ShoppingBag size={44} color="var(--color-border)" style={{ margin: "0 auto 1rem" }} />
            <h3 style={{ color: "var(--color-text-muted)", marginBottom: "0.5rem" }}>No Buyers Found</h3>
            <p style={{ color: "var(--color-text-subtle)", fontSize: "0.875rem" }}>
              Try adjusting your crop filter or search term.
            </p>
          </div>
        </div>
      )}

      {/* 4. How Deal Room Works */}
      <div className="gov-card" style={{ marginTop: "1.5rem" }}>
        <div className="gov-card-header">
          <span className="gov-card-title">💬 How the In-App Deal Room Works</span>
        </div>
        <div className="gov-card-body">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
            {[
              { step: "1", icon: "👆", title: "Start Deal Room", desc: "Click 'Start Deal Room' to open a private negotiation channel with the buyer." },
              { step: "2", icon: "💬", title: "Counter-Offer", desc: "Send your price & quantity counter-offers with full message audit trail." },
              { step: "3", icon: "🔒", title: "Lock Deal", desc: "Accept the final price and lock the deal terms. Immutable record is created." },
              { step: "4", icon: "💳", title: "Digital Payment", desc: "Receive guaranteed digital payment via UPI / DBT directly to your bank." },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--color-primary-100)", color: "var(--color-primary-800)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.8rem", flexShrink: 0, border: "2px solid var(--color-primary-200)" }}>
                  {s.step}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--color-text-main)", marginBottom: "0.2rem" }}>
                    {s.icon} {s.title}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", lineHeight: 1.5 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
