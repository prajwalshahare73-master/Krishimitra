import React, { useState } from "react";
import { PlusCircle, CheckCircle2, ArrowLeft, Image, Sparkles } from "lucide-react";

export default function AddProduce({ onAddProduceSuccess, onTabChange, farmer, t }) {
  const [cropName, setCropName] = useState("Tomato");
  const [variety, setVariety] = useState("Abhinav (Hybrid)");
  const [quantity, setQuantity] = useState("100");
  const [quality, setQuality] = useState("Grade A");
  const [harvestDate, setHarvestDate] = useState(new Date().toISOString().split("T")[0]);
  const [location, setLocation] = useState(farmer ? `${farmer.location}, ${farmer.district}` : "Pimpalgaon, Nashik");
  const [askingPrice, setAskingPrice] = useState("2300");
  const [photoUrl, setPhotoUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const popularCrops = [
    { name: "Tomato", defaultVariety: "Abhinav (Hybrid)", typicalPrice: 2350 },
    { name: "Onion", defaultVariety: "Gavran Red (Rabi)", typicalPrice: 2380 },
    { name: "Soybean", defaultVariety: "JS-335", typicalPrice: 4680 },
    { name: "Wheat", defaultVariety: "Sharbati (Lokwan)", typicalPrice: 2550 },
    { name: "Potato", defaultVariety: "Kufri Jyoti", typicalPrice: 1450 },
    { name: "Cotton", defaultVariety: "BT Hybrid Medium Staple", typicalPrice: 7350 },
    { name: "Chilli", defaultVariety: "Guntur Teja", typicalPrice: 12500 }
  ];

  const handleCropSelect = (crop) => {
    setCropName(crop.name);
    setVariety(crop.defaultVariety);
    setAskingPrice(crop.typicalPrice.toString());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");

    const newProduce = {
      cropName,
      variety,
      quantity: parseFloat(quantity) || 10,
      quality,
      harvestDate,
      location,
      askingPrice: parseFloat(askingPrice) || 0,
      photoUrl
    };

    setTimeout(() => {
      onAddProduceSuccess(newProduce);
      setSubmitting(false);
      setSuccessMsg("Agricultural produce saved successfully to your inventory! Proceeding to Dashboard...");
      setTimeout(() => {
        onTabChange("dashboard");
      }, 1200);
    }, 400);
  };

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      {/* Back button */}
      <div style={{ marginBottom: "1rem" }}>
        <button 
          className="btn btn-secondary btn-sm"
          onClick={() => onTabChange("dashboard")}
        >
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </button>
      </div>

      <div className="gov-card">
        <div className="gov-card-header" style={{ background: "var(--color-primary-800)", color: "#ffffff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <PlusCircle size={20} color="#ffd54f" />
            <strong style={{ fontSize: "1.1rem" }}>
              Add Agricultural Produce (फसल उपज प्रविष्टि)
            </strong>
          </div>
          <span style={{ fontSize: "0.75rem", background: "rgba(255,255,255,0.2)", padding: "2px 8px", borderRadius: "4px" }}>
            Form Standard 7.1
          </span>
        </div>

        <div className="gov-card-body" style={{ padding: "1.75rem" }}>
          {successMsg && (
            <div style={{ background: "var(--color-success-bg)", color: "var(--color-success)", padding: "0.85rem", borderRadius: "6px", fontSize: "0.9rem", marginBottom: "1.25rem", border: "1px solid #86efac", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CheckCircle2 size={18} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Quick Crop Selector Pills */}
          <div style={{ marginBottom: "1.5rem" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-text-subtle)", display: "block", marginBottom: "0.5rem", textTransform: "uppercase" }}>
              Popular Commodities (क्लिक करके चुनें):
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {popularCrops.map((c) => (
                <button
                  type="button"
                  key={c.name}
                  onClick={() => handleCropSelect(c)}
                  className="btn btn-secondary btn-sm"
                  style={{
                    backgroundColor: cropName === c.name ? "var(--color-primary-100)" : "#ffffff",
                    borderColor: cropName === c.name ? "var(--color-primary-800)" : "var(--color-border)",
                    color: cropName === c.name ? "var(--color-primary-900)" : "var(--color-text-main)",
                    fontWeight: cropName === c.name ? 700 : 500
                  }}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">
                  Crop Name (फसल का नाम) *
                </label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={cropName} 
                  onChange={(e) => setCropName(e.target.value)}
                  placeholder="e.g. Tomato, Onion, Soybean"
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Variety / Hybrid Name (किस्म / वाण)
                </label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={variety} 
                  onChange={(e) => setVariety(e.target.value)}
                  placeholder="e.g. Abhinav, Gavran Red, JS-335"
                />
              </div>
            </div>

            <div className="grid-3">
              <div className="form-group">
                <label className="form-label">
                  Quantity in Quintals (मात्रा - क्विंटल) *
                </label>
                <input 
                  type="number" 
                  step="0.1"
                  min="0.5"
                  className="form-input" 
                  value={quantity} 
                  onChange={(e) => setQuantity(e.target.value)}
                  required 
                />
                <span className="form-help">1 Quintal = 100 Kilograms</span>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Quality Grade (गुणवत्ता श्रेणी) *
                </label>
                <select 
                  className="form-select"
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  required
                >
                  <option value="Grade A">Grade A (Premium / Export Quality)</option>
                  <option value="Grade B">Grade B (Standard Market Grade)</option>
                  <option value="FAQ">Fair Average Quality (FAQ)</option>
                  <option value="Grade C">Grade C (Processing Grade)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Harvest Date (कटाई दिनांक) *
                </label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={harvestDate} 
                  onChange={(e) => setHarvestDate(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">
                  Expected / Asking Price (अपेक्षित दर - ₹/क्विंटल) *
                </label>
                <input 
                  type="number" 
                  step="10"
                  min="100"
                  className="form-input" 
                  value={askingPrice} 
                  onChange={(e) => setAskingPrice(e.target.value)}
                  placeholder="e.g. 2300"
                  required 
                />
                <span className="form-help">Recommended benchmark: Check live APMC Mandi modal price</span>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Farmgate / Pickup Location (खेत / गाँव का पता) *
                </label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Village, Taluka, District"
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Produce Photo (फसल का फोटो - कैमरा / फाइल)
              </label>
              
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 280px" }}>
                  <label 
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      padding: "0.85rem",
                      border: "2px dashed var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      background: "#f9fafb",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--color-primary-800)"
                    }}
                  >
                    <Image size={18} />
                    <span>📷 Tap to Take Photo with Camera or Browse</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      capture="environment"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setPhotoUrl(reader.result);
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  <span className="form-help">Real-time photos help buyers inspect moisture, grade, and color before bidding.</span>
                </div>

                {photoUrl && (
                  <div style={{ position: "relative", width: "100px", height: "80px", borderRadius: "6px", overflow: "hidden", border: "1px solid var(--color-border)" }}>
                    <img 
                      src={photoUrl} 
                      alt="Crop Preview" 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                    />
                    <button
                      type="button"
                      onClick={() => setPhotoUrl("")}
                      style={{
                        position: "absolute",
                        top: "2px",
                        right: "2px",
                        background: "rgba(0,0,0,0.6)",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                        fontSize: "12px",
                        lineHeight: 1
                      }}
                      title="Remove Photo"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1.5rem" }}>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => onTabChange("dashboard")}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary btn-lg"
                disabled={submitting}
              >
                {submitting ? "Saving Produce..." : "Save Produce (उपज सहेजें)"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
