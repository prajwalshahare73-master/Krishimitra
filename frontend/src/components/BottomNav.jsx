import React from "react";
import { Home, LayoutDashboard, Plus, TrendingUp, Warehouse, ShoppingBag, User } from "lucide-react";

export default function BottomNav({ activeTab, onTabChange, t, farmer }) {
  const navItems = [
    { tab: "welcome", icon: <Home size={20} />, label: t.navHome },
    { tab: "dashboard", icon: <LayoutDashboard size={20} />, label: t.navDashboard },
    { tab: null, icon: null, label: null, isCTA: true }, // Center CTA
    { tab: "prices", icon: <TrendingUp size={20} />, label: t.navPrices },
    { tab: "buyers", icon: <ShoppingBag size={20} />, label: t.navBuyers },
  ];

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Bottom Navigation">
      {navItems.map((item, i) => {
        if (item.isCTA) {
          return (
            <button
              key="cta"
              className="mobile-nav-btn mobile-action-add"
              onClick={() => onTabChange("add-produce")}
              aria-label="Add New Produce"
            >
              <Plus size={26} />
            </button>
          );
        }
        return (
          <button
            key={item.tab}
            className={`mobile-nav-btn ${activeTab === item.tab ? "active" : ""}`}
            onClick={() => onTabChange(item.tab)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
