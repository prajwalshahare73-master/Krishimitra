import React, { useState } from "react";
import { 
  TrendingUp, Search, MapPin, Clock, ArrowUpRight, 
  ArrowDownRight, Minus, RefreshCw, BarChart2, Filter 
} from "lucide-react";

export default function MarketPrice({ marketPrices, t }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("All");
  const [selectedDistrict, setSelectedDistrict] = useState("All");

  const cropOptions = ["All", "Tomato", "Onion", "Soybean", "Wheat", "Potato", "Cotton"];
  const districtOptions = ["All", "Nashik", "Latur", "Thane", "Indore", "Agra", "Rajkot"];

  const filteredPrices = marketPrices.filter((item) => {
    const matchesSearch = item.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.marketName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrop = selectedCrop === "All" || item.cropName.toLowerCase() === selectedCrop.toLowerCase();
    const matchesDistrict = selectedDistrict === "All" || item.district.toLowerCase() === selectedDistrict.toLowerCase();
    return matchesSearch && matchesCrop && matchesDistrict;
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem"
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
            <TrendingUp size={22} color="var(--color-primary-800)" />
            <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-primary-900)" }}>
              {t.mandiPriceTitle}
            </h2>
          </div>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
            Daily arrival and price quotations from regulated Agricultural Produce Market Committees (APMC) and e-NAM national terminals.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--color-primary-50)", padding: "0.4rem 0.75rem", borderRadius: "6px", border: "1px solid var(--color-primary-100)" }}>
          <Clock size={15} color="var(--color-primary-800)" />
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--color-primary-900)" }}>
            {t.lastUpdated}: Today, 11:30 AM (Agmarknet Live)
          </span>
        </div>
      </div>

      {/* 2. Interactive Search & Filters Bar */}
      <div className="gov-card">
        <div className="gov-card-body" style={{ padding: "1rem 1.25rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
            <div style={{ flex: "1 1 240px", position: "relative" }}>
              <input 
                type="text"
                className="form-input"
                placeholder="Search by crop, mandi name, or district..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div style={{ flex: "0 1 180px" }}>
              <select 
                className="form-select"
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                aria-label="Filter by Crop"
              >
                {cropOptions.map(c => <option key={c} value={c}>Crop: {c}</option>)}
              </select>
            </div>

            <div style={{ flex: "0 1 180px" }}>
              <select 
                className="form-select"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                aria-label="Filter by District"
              >
                {districtOptions.map(d => <option key={d} value={d}>District: {d}</option>)}
              </select>
            </div>

            <button 
              className="btn btn-secondary"
              onClick={() => { setSearchTerm(""); setSelectedCrop("All"); setSelectedDistrict("All"); }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* 3. Mandi Price Table (e-NAM Agmarknet Portal Layout) */}
      <div className="gov-card">
        <div className="gov-card-header">
          <span className="gov-card-title">
            <BarChart2 size={18} />
            Mandi Price Intelligence Table ({filteredPrices.length} Records)
          </span>
          <span className="badge badge-success">Official APMC Quotes</span>
        </div>

        <div className="gov-card-body" style={{ padding: 0 }}>
          <div className="gov-table-container" style={{ border: "none", borderRadius: 0 }}>
            <table className="gov-table">
              <thead>
                <tr>
                  <th>{t.crop}</th>
                  <th>Mandi / APMC Market</th>
                  <th>State & District</th>
                  <th>{t.minPrice}</th>
                  <th>{t.modalPrice}</th>
                  <th>{t.maxPrice}</th>
                  <th>{t.trend}</th>
                  <th>{t.lastUpdated}</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrices.length > 0 ? (
                  filteredPrices.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <strong style={{ fontSize: "0.95rem", color: "var(--color-primary-900)" }}>
                          {item.cropName}
                        </strong>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{item.marketName}</div>
                      </td>
                      <td>
                        <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                          {item.district}, {item.state}
                        </div>
                      </td>
                      <td>
                        <span style={{ color: "var(--color-text-muted)", fontWeight: 500 }}>
                          ₹{item.minPrice.toLocaleString()}
                        </span>
                      </td>
                      <td>
                        <strong style={{ fontSize: "1.05rem", color: "var(--color-primary-800)" }}>
                          ₹{item.modalPrice.toLocaleString()}
                        </strong>
                        <span style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)", display: "block" }}>
                          {item.unit}
                        </span>
                      </td>
                      <td>
                        <span style={{ color: "var(--color-success)", fontWeight: 600 }}>
                          ₹{item.maxPrice.toLocaleString()}
                        </span>
                      </td>
                      <td>
                        {item.trend === "UP" && (
                          <span className="badge badge-success" style={{ gap: "2px" }}>
                            <ArrowUpRight size={12} /> Up
                          </span>
                        )}
                        {item.trend === "DOWN" && (
                          <span className="badge badge-danger" style={{ gap: "2px" }}>
                            <ArrowDownRight size={12} /> Down
                          </span>
                        )}
                        {item.trend === "STABLE" && (
                          <span className="badge badge-neutral" style={{ gap: "2px" }}>
                            <Minus size={12} /> Steady
                          </span>
                        )}
                      </td>
                      <td>
                        <div style={{ fontSize: "0.775rem", color: "var(--color-text-subtle)" }}>
                          {item.updatedAt}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center", padding: "2.5rem", color: "var(--color-text-muted)" }}>
                      No market price data matching your criteria. Try adjusting your crop or district filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. Comparative Price Spread Advisory (Farmer Value Maximization) */}
      <div className="gov-card">
        <div className="gov-card-header" style={{ background: "#f8faf9" }}>
          <strong style={{ fontSize: "0.95rem", color: "var(--color-primary-900)" }}>
            💡 Smart Price Arbitrage Notice: Where should you sell?
          </strong>
        </div>
        <div className="gov-card-body">
          <div className="grid-2">
            <div style={{ borderLeft: "3px solid #16a34a", paddingLeft: "1rem" }}>
              <h4 style={{ fontSize: "0.9rem", color: "#166534", marginBottom: "0.25rem" }}>
                Tomato: Vashi APMC vs Pimpalgaon APMC
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                Vashi Mandi (Navi Mumbai) is offering <strong>₹2,750/Qtl</strong> vs Pimpalgaon at <strong>₹2,350/Qtl</strong> (+₹400/Qtl spread). For bulk consignments (&gt;50 Qtl), transport cost is ~₹140/Qtl, netting +₹260/Qtl higher farmgate realization.
              </p>
            </div>

            <div style={{ borderLeft: "3px solid #d97706", paddingLeft: "1rem" }}>
              <h4 style={{ fontSize: "0.9rem", color: "#92400e", marginBottom: "0.25rem" }}>
                Onion: Lasalgaon Export Price Trends
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                Lasalgaon modal rate is steady at <strong>₹2,380/Qtl</strong> with heavy domestic arrivals. Storage in WDRA registered chawl is recommended for 30 days as retail festival demand peaks in October.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
