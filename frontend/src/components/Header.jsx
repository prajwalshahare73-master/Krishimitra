import React from "react";
import { 
  PhoneCall, Globe, User, PlusCircle, LayoutDashboard, 
  TrendingUp, Warehouse, ShoppingBag, Truck, FileText, 
  MessageSquareQuote, Sparkles, Home 
} from "lucide-react";

export default function Header({ 
  currentLang, 
  onLangChange, 
  fontSize, 
  onFontSizeChange, 
  activeTab, 
  onTabChange, 
  farmer, 
  t 
}) {
  return (
    <header>
      {/* 1. Government-grade Top Utility Bar */}
      <div className="gov-top-bar">
        <div className="gov-container gov-top-bar-inner">
          <div className="gov-helpline">
            <PhoneCall size={14} color="#ffd54f" />
            <span>{t.kisanHelpline} <strong>1800-180-1551</strong> (Kisan Call Centre 24x7)</span>
          </div>

          <div className="gov-accessibility-controls">
            <span style={{ fontSize: "0.75rem", opacity: 0.9 }}>{t.fontSize}:</span>
            <button 
              className="gov-font-size-btn" 
              onClick={() => onFontSizeChange("sm")}
              title="Small text"
            >
              A-
            </button>
            <button 
              className="gov-font-size-btn" 
              onClick={() => onFontSizeChange("md")}
              title="Normal text"
            >
              A
            </button>
            <button 
              className="gov-font-size-btn" 
              onClick={() => onFontSizeChange("lg")}
              title="Large text"
            >
              A+
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginLeft: "0.5rem" }}>
              <Globe size={13} />
              <select 
                className="gov-lang-select" 
                value={currentLang} 
                onChange={(e) => onLangChange(e.target.value)}
                aria-label="Language selector"
              >
                <option value="en">English (EN)</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="mr">मराठी (Marathi)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Official Portal Main Header */}
      <div className="gov-portal-header">
        <div className="gov-container gov-header-inner">
          <div 
            className="gov-branding-area" 
            style={{ cursor: "pointer" }} 
            onClick={() => onTabChange("welcome")}
          >
            <img 
              src="/logo-leaf.svg" 
              alt="AgriSathi Emblem" 
              className="gov-logo-img" 
            />
            <div className="gov-brand-titles">
              <span className="gov-portal-title">{t.portalName}</span>
              <span className="gov-portal-subtitle">{t.portalSubtitle}</span>
              <span className="gov-portal-tagline">🌾 {t.tagline}</span>
            </div>
          </div>

          {/* Farmer Identity & Quick Status */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            {farmer ? (
              <div 
                className="gov-user-chip" 
                style={{ cursor: "pointer" }}
                onClick={() => onTabChange("profile")}
                title="View Farmer Profile"
              >
                <div className="gov-user-avatar">
                  {farmer.name ? farmer.name.charAt(0) : "K"}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--color-primary-900)" }}>
                    {t.welcomeFarmer}, {farmer.name.split(" ")[0]}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>
                    {farmer.district}, {farmer.state}
                  </div>
                </div>
              </div>
            ) : (
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => onTabChange("login")}
              >
                <User size={15} />
                {t.loginBtn}
              </button>
            )}

            <button 
              className="btn btn-accent btn-sm"
              onClick={() => onTabChange("add-produce")}
              title="Add Harvested Produce"
            >
              <PlusCircle size={16} />
              <span>+ {t.navAddProduce}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Navigation Bar */}
      <nav className="gov-nav-bar" aria-label="Main Agriculture Portal Navigation">
        <div className="gov-container">
          <ul className="gov-nav-list">
            <li className="gov-nav-item">
              <button 
                className={`gov-nav-btn ${activeTab === "welcome" ? "active" : ""}`}
                onClick={() => onTabChange("welcome")}
              >
                <Home size={15} />
                <span>{t.navHome}</span>
              </button>
            </li>
            <li className="gov-nav-item">
              <button 
                className={`gov-nav-btn ${activeTab === "dashboard" ? "active" : ""}`}
                onClick={() => onTabChange("dashboard")}
              >
                <LayoutDashboard size={15} />
                <span>{t.navDashboard}</span>
              </button>
            </li>
            <li className="gov-nav-item">
              <button 
                className={`gov-nav-btn ${activeTab === "prices" ? "active" : ""}`}
                onClick={() => onTabChange("prices")}
              >
                <TrendingUp size={15} />
                <span>{t.navPrices}</span>
              </button>
            </li>
            <li className="gov-nav-item">
              <button 
                className={`gov-nav-btn ${activeTab === "facilities" ? "active" : ""}`}
                onClick={() => onTabChange("facilities")}
              >
                <Warehouse size={15} />
                <span>{t.navFacilities}</span>
              </button>
            </li>
            <li className="gov-nav-item">
              <button 
                className={`gov-nav-btn ${activeTab === "buyers" ? "active" : ""}`}
                onClick={() => onTabChange("buyers")}
              >
                <ShoppingBag size={15} />
                <span>{t.navBuyers}</span>
              </button>
            </li>
            <li className="gov-nav-item">
              <button 
                className={`gov-nav-btn ${activeTab === "recommendation" ? "active" : ""}`}
                onClick={() => onTabChange("recommendation")}
              >
                <Sparkles size={15} color="#ffd54f" />
                <span>{t.smartRecTitle.split(" ")[0]} Advisory</span>
              </button>
            </li>
            <li className="gov-nav-item">
              <button 
                className={`gov-nav-btn ${activeTab === "deal-room" ? "active" : ""}`}
                onClick={() => onTabChange("deal-room")}
              >
                <MessageSquareQuote size={15} />
                <span>In-App Deals</span>
              </button>
            </li>
            <li className="gov-nav-item">
              <button 
                className={`gov-nav-btn ${activeTab === "transport" ? "active" : ""}`}
                onClick={() => onTabChange("transport")}
              >
                <Truck size={15} />
                <span>{t.navTransport}</span>
              </button>
            </li>
            <li className="gov-nav-item">
              <button 
                className={`gov-nav-btn ${activeTab === "records" ? "active" : ""}`}
                onClick={() => onTabChange("records")}
              >
                <FileText size={15} />
                <span>{t.navRecords}</span>
              </button>
            </li>
            <li className="gov-nav-item">
              <button 
                className={`gov-nav-btn ${activeTab === "feedback" ? "active" : ""}`}
                onClick={() => onTabChange("feedback")}
              >
                <span>{t.navFeedback}</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* 4. Live Agricultural Advisory & Market Ticker */}
      <div className="gov-announcement-ticker">
        <div className="gov-container" style={{ display: "flex", alignItems: "center" }}>
          <span className="gov-ticker-badge">Live Advisory</span>
          <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            🌾 Pimpalgaon APMC: Tomato arrivals 14,200 crates; Modal price steady at ₹2,350/Qtl • Lasalgaon Mandi: Onion modal rate ₹2,380/Qtl (Up +₹70) • Cold storage booking subsidy active under Mission for Integrated Development of Horticulture (MIDH).
          </div>
        </div>
      </div>
    </header>
  );
}
