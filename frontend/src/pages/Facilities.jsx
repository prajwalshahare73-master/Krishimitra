import React, { useState } from "react";
import { Warehouse, Factory, MapPin, Phone, CheckCircle2, Navigation, Layers } from "lucide-react";
import MapComponent from "../components/MapComponent";

export default function Facilities({ facilities, t }) {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedFacility, setSelectedFacility] = useState(facilities[0] || null);

  const filteredFacilities = facilities.filter((f) => {
    if (selectedType === "all") return true;
    return f.type.toLowerCase() === selectedType.toLowerCase();
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
          <Warehouse size={22} color="var(--color-primary-800)" />
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-primary-900)" }}>
            {t.facilitiesTitle}
          </h2>
        </div>
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
          Locate registered cold storages, government WDRA warehouses, agro-processing clusters, and collection centres within your radius.
        </p>
      </div>

      {/* 2. Interactive Map Container (PRD Section 9 & 23) */}
      <div className="gov-card">
        <div className="gov-card-header">
          <span className="gov-card-title">
            <Navigation size={18} />
            Interactive Agro-Infrastructure GIS Map (Nashik & Surrounding Mandi Clusters)
          </span>
          <span className="badge badge-success">GPS Geo-Tagged</span>
        </div>
        <div className="gov-card-body" style={{ padding: "0.5rem" }}>
          <MapComponent 
            facilities={filteredFacilities} 
            selectedFacility={selectedFacility}
            onSelectFacility={(fac) => setSelectedFacility(fac)}
          />
        </div>
      </div>

      {/* 3. Facility Type Filter Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", overflowX: "auto" }}>
        <button 
          className={`btn btn-sm ${selectedType === "all" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setSelectedType("all")}
        >
          {t.tabAll} ({facilities.length})
        </button>
        <button 
          className={`btn btn-sm ${selectedType === "storage" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setSelectedType("storage")}
        >
          ❄️ {t.tabStorage}
        </button>
        <button 
          className={`btn btn-sm ${selectedType === "processing" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setSelectedType("processing")}
        >
          🏭 {t.tabProcessing}
        </button>
        <button 
          className={`btn btn-sm ${selectedType === "collection" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setSelectedType("collection")}
        >
          ⚖️ {t.tabCollection}
        </button>
      </div>

      {/* 4. Facilities List Directory (PRD Section 9 Card Specifications) */}
      <div className="grid-2">
        {filteredFacilities.map((fac) => {
          const isSelected = selectedFacility && selectedFacility.id === fac.id;
          return (
            <div 
              key={fac.id} 
              className="gov-card" 
              style={{
                borderColor: isSelected ? "var(--color-primary-800)" : "var(--color-border)",
                borderWidth: isSelected ? "2px" : "1px",
                boxShadow: isSelected ? "var(--shadow-hover)" : "var(--shadow-card)",
                transition: "all 0.2s"
              }}
            >
              <div className="gov-card-header" style={{ background: isSelected ? "var(--color-primary-50)" : "#fafbfc" }}>
                <div>
                  <strong style={{ fontSize: "1rem", color: "var(--color-primary-900)", display: "block" }}>
                    {fac.name}
                  </strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)", marginTop: "2px" }}>
                    ID: {fac.id}
                  </div>
                </div>
                <div>
                  {fac.type === "storage" && <span className="badge badge-info">Cold Storage</span>}
                  {fac.type === "processing" && <span className="badge badge-warning">Food Processor</span>}
                  {fac.type === "collection" && <span className="badge badge-success">Collection Hub</span>}
                </div>
              </div>

              <div className="gov-card-body">
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.875rem", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                    <MapPin size={16} color="var(--color-primary-800)" style={{ marginTop: "2px", flexShrink: 0 }} />
                    <div>
                      <strong>{fac.location}</strong>
                      <span style={{ color: "var(--color-amber-700)", fontWeight: 700, marginLeft: "0.5rem" }}>
                        ({fac.distance} km from farm)
                      </span>
                      <div style={{ fontSize: "0.775rem", color: "var(--color-text-subtle)" }}>{fac.address}</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Layers size={16} color="var(--color-primary-800)" style={{ flexShrink: 0 }} />
                    <span><b>Capacity:</b> {fac.capacity} • <span style={{ color: "var(--color-success)", fontWeight: 600 }}>{fac.availableCapacity}</span></span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Phone size={16} color="var(--color-primary-800)" style={{ flexShrink: 0 }} />
                    <span><b>Direct Contact:</b> <a href={`tel:${fac.contact}`} style={{ color: "var(--color-primary-800)", fontWeight: 600 }}>{fac.contact}</a></span>
                  </div>

                  <div style={{ background: "#f8faf9", padding: "0.5rem 0.75rem", borderRadius: "6px", border: "1px solid #e2e8f0", fontSize: "0.8rem" }}>
                    <b>Tariff / Subsidy:</b> {fac.rate}
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid var(--color-border-light)" }}>
                  <div style={{ fontSize: "0.775rem", color: "var(--color-text-muted)" }}>
                    Supported: {fac.supportedCrops.join(", ")}
                  </div>

                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => setSelectedFacility(fac)}
                    >
                      <MapPin size={13} />
                      <span>{t.viewOnMap}</span>
                    </button>
                    <a 
                      href={`tel:${fac.contact}`}
                      className="btn btn-primary btn-sm"
                    >
                      <Phone size={13} />
                      <span>{t.inquireNow}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
