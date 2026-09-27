import React from "react";
import { Home, LayoutDashboard, Plus, TrendingUp, Warehouse, ShoppingBag } from "lucide-react";

export default function BottomNav({ activeTab, onTabChange, t }) {
  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Bottom Navigation">
      <button 
        className={`mobile-nav-btn ${activeTab === "welcome" ? "active" : ""}`}
        onClick={() => onTabChange("welcome")}
      >
        <Home size={18} />
        <span>{t.navHome}</span>
      </button>

      <button 
        className={`mobile-nav-btn ${activeTab === "dashboard" ? "active" : ""}`}
        onClick={() => onTabChange("dashboard")}
      >
        <LayoutDashboard size={18} />
        <span>{t.navDashboard}</span>
      </button>

      <button 
        className="mobile-nav-btn mobile-action-add"
        onClick={() => onTabChange("add-produce")}
        aria-label="Add Produce"
      >
        <Plus size={24} />
      </button>

      <button 
        className={`mobile-nav-btn ${activeTab === "prices" ? "active" : ""}`}
        onClick={() => onTabChange("prices")}
      >
        <TrendingUp size={18} />
        <span>{t.navPrices}</span>
      </button>

      <button 
        className={`mobile-nav-btn ${activeTab === "facilities" ? "active" : ""}`}
        onClick={() => onTabChange("facilities")}
      >
        <Warehouse size={18} />
        <span>{t.navFacilities}</span>
      </button>
    </nav>
  );
}
