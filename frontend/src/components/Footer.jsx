import React from "react";
import { ShieldCheck, PhoneCall, ExternalLink, HelpCircle } from "lucide-react";

export default function Footer({ t, onTabChange }) {
  return (
    <footer className="gov-footer">
      <div className="gov-container">
        <div className="gov-footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.85rem" }}>
              <img src="/logo-leaf.svg" alt="AgriSathi Logo" style={{ width: "32px", height: "32px" }} />
              <strong style={{ fontSize: "1.2rem", color: "#ffffff" }}>{t.portalName}</strong>
            </div>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "#cbd5e1", marginBottom: "1rem" }}>
              {t.footerText}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "#86efac" }}>
              <ShieldCheck size={16} />
              <span>Direct Bank Transfer (DBT) & e-NWR Warehousing Enabled</span>
            </div>
          </div>

          <div>
            <h4 style={{ color: "#ffffff", fontSize: "0.95rem", marginBottom: "0.85rem", borderBottom: "2px solid #2e7d32", paddingBottom: "0.3rem" }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.85rem" }}>
              <li><a href="#welcome" onClick={(e) => { e.preventDefault(); onTabChange("welcome"); }}>{t.navHome}</a></li>
              <li><a href="#dashboard" onClick={(e) => { e.preventDefault(); onTabChange("dashboard"); }}>{t.navDashboard}</a></li>
              <li><a href="#prices" onClick={(e) => { e.preventDefault(); onTabChange("prices"); }}>{t.navPrices}</a></li>
              <li><a href="#facilities" onClick={(e) => { e.preventDefault(); onTabChange("facilities"); }}>{t.navFacilities}</a></li>
              <li><a href="#buyers" onClick={(e) => { e.preventDefault(); onTabChange("buyers"); }}>{t.navBuyers}</a></li>
              <li><a href="#records" onClick={(e) => { e.preventDefault(); onTabChange("records"); }}>{t.navRecords}</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: "#ffffff", fontSize: "0.95rem", marginBottom: "0.85rem", borderBottom: "2px solid #2e7d32", paddingBottom: "0.3rem" }}>
              National Portals
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.85rem" }}>
              <li>
                <a href="https://enam.gov.in" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  e-NAM National Portal <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://agmarknet.gov.in" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  Agmarknet Daily Prices <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://pmkisan.gov.in" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  PM-KISAN Samman Nidhi <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://wdra.gov.in" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  WDRA Registered Warehouses <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: "#ffffff", fontSize: "0.95rem", marginBottom: "0.85rem", borderBottom: "2px solid #2e7d32", paddingBottom: "0.3rem" }}>
              Kisan Support Desk
            </h4>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem", marginBottom: "0.75rem" }}>
              <PhoneCall size={16} color="#ffd54f" style={{ marginTop: "3px", flexShrink: 0 }} />
              <div>
                <strong style={{ color: "#ffffff" }}>1800-180-1551</strong>
                <div style={{ fontSize: "0.75rem", color: "#cbd5e1" }}>Kisan Call Centre (Toll-Free, 6 AM to 10 PM)</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem" }}>
              <HelpCircle size={16} color="#93c5fd" style={{ marginTop: "3px", flexShrink: 0 }} />
              <div>
                <strong style={{ color: "#ffffff" }}>Farmer Grievance Desk</strong>
                <div style={{ fontSize: "0.75rem", color: "#cbd5e1" }}>Near APMC Yard, Sub-divisional Office</div>
              </div>
            </div>
          </div>
        </div>

        <div className="gov-footer-bottom">
          <div>
            © {new Date().getFullYear()} AgriSathi – Smart Agriculture Produce Management Platform. Designed for Indian Farmers.
          </div>
          <div>
            Adheres to National e-Governance Agriculture Guidelines • Mobile First • Accessible
          </div>
        </div>
      </div>
    </footer>
  );
}
