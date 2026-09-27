import React from "react";
import { User, Phone, MapPin, ShieldCheck, CreditCard, LogOut, CheckCircle } from "lucide-react";

export default function Profile({ farmer, onLogout, t }) {
  return (
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
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
          gap: "1rem",
          boxShadow: "var(--shadow-sm)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div style={{ width: "54px", height: "54px", borderRadius: "50%", background: "var(--color-primary-800)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: 800 }}>
            {farmer?.name?.charAt(0) || "R"}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-primary-900)" }}>
                {farmer?.name || "Ramesh Dattatray Patil"}
              </h2>
              <span className="badge badge-success">Govt. Verified</span>
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
              Kisan ID: <strong>{farmer?.id || "FARMER-MH-4291"}</strong> • Reg Date: 15 March 2026
            </div>
          </div>
        </div>

        <button 
          className="btn btn-secondary btn-sm"
          style={{ color: "var(--color-danger)", borderColor: "#fca5a5" }}
          onClick={onLogout}
        >
          <LogOut size={14} />
          <span>{t.logoutBtn}</span>
        </button>
      </div>

      {/* 2. Personal & Land Information */}
      <div className="gov-card">
        <div className="gov-card-header">
          <strong style={{ fontSize: "1rem", color: "var(--color-primary-900)" }}>
            Farmer KYC & Agricultural Profile
          </strong>
        </div>

        <div className="gov-card-body">
          <div className="grid-2" style={{ gap: "1.25rem" }}>
            <div>
              <span style={{ fontSize: "0.8rem", color: "var(--color-text-subtle)", fontWeight: 600 }}>Mobile Number:</span>
              <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-text-main)" }}>+91 {farmer?.mobile || "9822014589"}</div>
            </div>

            <div>
              <span style={{ fontSize: "0.8rem", color: "var(--color-text-subtle)", fontWeight: 600 }}>Aadhaar Seeding Status:</span>
              <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-success)", display: "flex", alignItems: "center", gap: "4px" }}>
                <CheckCircle size={15} /> Verified & Biometric Authenticated
              </div>
            </div>

            <div>
              <span style={{ fontSize: "0.8rem", color: "var(--color-text-subtle)", fontWeight: 600 }}>Village & Taluka:</span>
              <div style={{ fontSize: "1rem", fontWeight: 600 }}>{farmer?.location || "Pimpalgaon Baswant, Niphad"}</div>
            </div>

            <div>
              <span style={{ fontSize: "0.8rem", color: "var(--color-text-subtle)", fontWeight: 600 }}>District & State:</span>
              <div style={{ fontSize: "1rem", fontWeight: 600 }}>{farmer?.district || "Nashik"}, {farmer?.state || "Maharashtra"}</div>
            </div>

            <div>
              <span style={{ fontSize: "0.8rem", color: "var(--color-text-subtle)", fontWeight: 600 }}>Operational Land Holding:</span>
              <div style={{ fontSize: "1rem", fontWeight: 600 }}>4.8 Acres (Perennial Irrigated)</div>
            </div>

            <div>
              <span style={{ fontSize: "0.8rem", color: "var(--color-text-subtle)", fontWeight: 600 }}>Primary Crops Grown:</span>
              <div style={{ fontSize: "1rem", fontWeight: 600 }}>Tomato, Onion, Soybean, Wheat</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Direct Benefit Transfer (DBT) Settlement Bank Details */}
      <div className="gov-card">
        <div className="gov-card-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <CreditCard size={18} color="var(--color-primary-800)" />
            <strong style={{ fontSize: "1rem", color: "var(--color-primary-900)" }}>
              Direct Bank Settlement Account (DBT Linked)
            </strong>
          </div>
          <span className="badge badge-success">NPCI Linked</span>
        </div>

        <div className="gov-card-body">
          <div className="grid-2" style={{ background: "#f8faf9", padding: "1rem", borderRadius: "8px", border: "1px solid var(--color-border)" }}>
            <div>
              <span style={{ fontSize: "0.8rem", color: "var(--color-text-subtle)" }}>Bank Name:</span>
              <div style={{ fontWeight: 700, fontSize: "1rem" }}>State Bank of India</div>
            </div>
            <div>
              <span style={{ fontSize: "0.8rem", color: "var(--color-text-subtle)" }}>Account Number:</span>
              <div style={{ fontWeight: 700, fontSize: "1rem" }}>•••• •••• •••• 4892</div>
            </div>
            <div>
              <span style={{ fontSize: "0.8rem", color: "var(--color-text-subtle)" }}>IFSC Code:</span>
              <div style={{ fontWeight: 700 }}>SBIN0001234 (Pimpalgaon Branch)</div>
            </div>
            <div>
              <span style={{ fontSize: "0.8rem", color: "var(--color-text-subtle)" }}>e-NWR Warehouse Lien Account:</span>
              <div style={{ fontWeight: 700, color: "var(--color-success)" }}>Active & Eligible</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
