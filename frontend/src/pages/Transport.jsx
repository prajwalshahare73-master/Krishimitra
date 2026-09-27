import React, { useState } from "react";
import { Truck, Phone, MapPin, CheckCircle2, ShieldCheck, Calendar, ArrowRight } from "lucide-react";

export default function Transport({ transportList, onTabChange, t }) {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [pickupDate, setPickupDate] = useState(new Date().toISOString().split("T")[0]);
  const [calcDistance, setCalcDistance] = useState("15");
  const [calcRate, setCalcRate] = useState("18");

  const handleBookVehicle = (veh) => {
    setSelectedVehicle(veh);
    setBookingSuccess(true);
  };

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
          <Truck size={22} color="var(--color-primary-800)" />
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-primary-900)" }}>
            {t.transportTitle} (कृषि परिवहन एवं लॉजिस्टिक्स)
          </h2>
        </div>
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
          Book verified local mini-trucks, tractor trolleys, and refrigerated cold-chain vans for farmgate-to-mandi or farmgate-to-storage haulage.
        </p>
      </div>

      {bookingSuccess && selectedVehicle && (
        <div style={{ background: "var(--color-success-bg)", border: "1px solid #86efac", borderRadius: "8px", padding: "1.25rem", marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <strong style={{ fontSize: "1rem", color: "var(--color-success)", display: "block" }}>
              ✓ Transport Pickup Request Scheduled!
            </strong>
            <span style={{ fontSize: "0.85rem", color: "#166534" }}>
              Driver <strong>{selectedVehicle.providerName}</strong> has been notified for pickup on {pickupDate}. Contact: <strong>{selectedVehicle.contact}</strong>
            </span>
          </div>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setBookingSuccess(false)}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 2. Farmgate Logistics Fare Estimator */}
      <div className="gov-card" style={{ marginBottom: "1.5rem" }}>
        <div className="gov-card-header">
          <strong style={{ fontSize: "0.95rem", color: "var(--color-primary-900)" }}>
            🧮 Farmgate-to-Mandi Haulage Fare Calculator (भाड़ा कैलकुलेटर)
          </strong>
          <span style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>Transparent Rates</span>
        </div>
        <div className="gov-card-body">
          <div className="grid-3" style={{ alignItems: "center" }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: "0.8rem" }}>Approx Distance (km)</label>
              <input 
                type="number" 
                className="form-input" 
                value={calcDistance} 
                onChange={(e) => setCalcDistance(e.target.value)}
                min="1"
                placeholder="e.g. 15"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: "0.8rem" }}>Vehicle Rate Type</label>
              <select 
                className="form-select"
                value={calcRate}
                onChange={(e) => setCalcRate(e.target.value)}
              >
                <option value="14">Tractor Trolley (₹14/km)</option>
                <option value="18">Mini Truck Bolero/Ace (₹18/km)</option>
                <option value="24">6-Wheeler Medium Lorry (₹24/km)</option>
                <option value="32">Reefer Cold Van (₹32/km)</option>
              </select>
            </div>

            <div style={{ background: "#f8faf9", padding: "0.75rem 1rem", borderRadius: "6px", border: "1px solid #e2e8f0", textAlign: "center" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)", fontWeight: 600 }}>Estimated One-Way Fare:</span>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--color-success)" }}>
                ₹{((parseFloat(calcDistance) || 0) * (parseFloat(calcRate) || 0)).toLocaleString()}
              </div>
              <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)" }}>Includes toll & standard loading</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Transport Cards Grid (PRD Section 14) */}
      <div className="grid-2">
        {transportList.map((tr) => (
          <div key={tr.id} className="gov-card">
            <div className="gov-card-header">
              <div>
                <strong style={{ fontSize: "1.05rem", color: "var(--color-primary-900)" }}>
                  {tr.providerName}
                </strong>
                <div style={{ fontSize: "0.775rem", color: "var(--color-text-subtle)", marginTop: "2px" }}>
                  ID: {tr.id} • Stand: {tr.location}
                </div>
              </div>
              <span className="badge badge-success">
                {tr.availability}
              </span>
            </div>

            <div className="gov-card-body">
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.875rem", marginBottom: "1rem" }}>
                <div>
                  <span style={{ color: "var(--color-text-subtle)" }}>Vehicle Category:</span>
                  <div style={{ fontWeight: 700, color: "var(--color-primary-800)" }}>{tr.vehicleType}</div>
                </div>

                <div className="grid-2" style={{ background: "#f8faf9", padding: "0.75rem", borderRadius: "6px" }}>
                  <div>
                    <span style={{ color: "var(--color-text-subtle)", fontSize: "0.75rem" }}>Rated Load Capacity:</span>
                    <strong style={{ display: "block" }}>{tr.capacity}</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--color-text-subtle)", fontSize: "0.75rem" }}>Tariff:</span>
                    <strong style={{ display: "block", color: "var(--color-success)" }}>₹{tr.pricePerKm} / km</strong>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <MapPin size={16} color="var(--color-primary-800)" />
                  <span><b>Current Stand:</b> {tr.location} ({tr.distance} km from your farm)</span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid var(--color-border-light)" }}>
                <a 
                  href={`tel:${tr.contact}`}
                  className="btn btn-secondary btn-sm"
                >
                  <Phone size={13} />
                  <span>Call {tr.contact}</span>
                </a>

                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => handleBookVehicle(tr)}
                >
                  <Truck size={14} />
                  <span>{t.bookVehicle}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
