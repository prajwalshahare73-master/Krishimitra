import React, { useEffect, useRef } from "react";
import L from "leaflet";

export default function MapComponent({ facilities, selectedFacility, onSelectFacility }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Check if map already initialized
    if (!mapInstanceRef.current) {
      // Default to Nashik district center
      const map = L.map(mapContainerRef.current, {
        center: [20.08, 73.88],
        zoom: 11,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      // Add Farmer Farmgate Pin
      const farmerIcon = L.divIcon({
        className: "farmer-map-pin",
        html: `<div style="background-color: #1b5e20; color: white; border: 2px solid white; border-radius: 50%; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">🧑‍🌾</div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });
      L.marker([20.08, 73.88], { icon: farmerIcon })
        .addTo(map)
        .bindPopup("<b>Your Farm Location</b><br>Pimpalgaon Baswant, Nashik");

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear old markers
    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];

    // Add Facility Markers
    if (facilities && facilities.length > 0) {
      facilities.forEach((fac) => {
        let pinColor = "#2563eb"; // storage
        let pinIcon = "❄️";
        if (fac.type === "processing") {
          pinColor = "#d97706";
          pinIcon = "🏭";
        } else if (fac.type === "collection") {
          pinColor = "#059669";
          pinIcon = "⚖️";
        }

        const customIcon = L.divIcon({
          className: "fac-map-pin",
          html: `<div style="background-color: ${pinColor}; color: white; border: 2px solid white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-size: 14px; box-shadow: 0 2px 6px rgba(0,0,0,0.3); cursor: pointer;">${pinIcon}</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const marker = L.marker([fac.latitude, fac.longitude], { icon: customIcon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family: Inter, sans-serif; font-size: 13px; line-height: 1.4;">
              <strong style="color: #1b5e20; font-size: 14px;">${fac.name}</strong><br/>
              <span style="display: inline-block; padding: 2px 6px; font-size: 11px; font-weight: 600; text-transform: uppercase; background: #e8f5e9; color: #1b5e20; border-radius: 4px; margin: 4px 0;">${fac.type}</span><br/>
              📍 ${fac.location} (${fac.distance} km away)<br/>
              📦 <b>Capacity:</b> ${fac.availableCapacity}<br/>
              📞 <b>Contact:</b> ${fac.contact}
            </div>
          `);

        marker.on("click", () => {
          if (onSelectFacility) onSelectFacility(fac);
        });

        markersRef.current.push(marker);
      });
    }

    // Fly to selected facility if present
    if (selectedFacility && selectedFacility.latitude) {
      map.flyTo([selectedFacility.latitude, selectedFacility.longitude], 13, { duration: 1.2 });
    }
  }, [facilities, selectedFacility]);

  return (
    <div style={{ position: "relative", width: "100%", height: "420px", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--color-border)" }}>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 999,
          background: "rgba(255, 255, 255, 0.95)",
          padding: "6px 12px",
          borderRadius: "6px",
          border: "1px solid #d1d5db",
          fontSize: "12px",
          fontWeight: "600",
          boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
        }}
      >
        <span style={{ color: "#2563eb", marginRight: "8px" }}>● Cold Storage</span>
        <span style={{ color: "#d97706", marginRight: "8px" }}>● Processing</span>
        <span style={{ color: "#059669" }}>● Collection Hub</span>
      </div>
    </div>
  );
}
