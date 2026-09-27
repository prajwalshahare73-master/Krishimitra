import React, { useState } from "react";
import { User, Phone, MapPin, Lock, ShieldCheck, ArrowRight, UserCheck, Sprout } from "lucide-react";

export default function Login({ onLoginSuccess, t }) {
  const [isRegister, setIsRegister] = useState(false);
  const [mobile, setMobile] = useState("9822014589");
  const [password, setPassword] = useState("123456");
  const [name, setName] = useState("Ramesh Dattatray Patil");
  const [district, setDistrict] = useState("Nashik");
  const [state, setState] = useState("Maharashtra");
  const [location, setLocation] = useState("Pimpalgaon Baswant, Niphad");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!mobile || mobile.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const farmerObj = {
        id: "FARMER-MH-4291",
        name: isRegister ? name : "Ramesh Dattatray Patil",
        mobile: mobile,
        location: isRegister ? location : "Pimpalgaon Baswant, Niphad",
        district: isRegister ? district : "Nashik",
        state: isRegister ? state : "Maharashtra",
        language: "en"
      };
      onLoginSuccess(farmerObj);
    }, 500);
  };

  const handleDemoFarmer = () => {
    onLoginSuccess({
      id: "FARMER-MH-4291",
      name: "Ramesh Dattatray Patil",
      mobile: "9822014589",
      location: "Pimpalgaon Baswant, Niphad",
      district: "Nashik",
      state: "Maharashtra",
      language: "en"
    });
  };

  return (
    <div style={{ maxWidth: "520px", margin: "1.5rem auto" }}>
      {/* Portal logo/context strip */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "var(--color-primary-50)", border: "1px solid var(--color-primary-200)", padding: "0.5rem 1rem", borderRadius: "var(--radius-full)" }}>
          <Sprout size={18} color="var(--color-primary-700)" />
          <span style={{ fontWeight: 700, color: "var(--color-primary-900)", fontSize: "0.9rem" }}>AgriSathi – Kisan Portal</span>
          <span className="badge badge-success" style={{ fontSize: "0.6rem" }}>Secure ✓</span>
        </div>
        <div style={{ fontSize: "0.775rem", color: "var(--color-text-subtle)", marginTop: "0.35rem" }}>
          राष्ट्रीय कृषि डिजिटल अवसंरचना • National Digital Agriculture Portal
        </div>
      </div>

      <div className="gov-card" style={{ overflow: "visible" }}>
        {/* Header */}
        <div 
          className="gov-card-header" 
          style={{ 
            background: "linear-gradient(135deg, var(--color-primary-800), var(--color-primary-950))",
            color: "#ffffff",
            borderRadius: "var(--radius-lg) var(--radius-lg) 0 0"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ShieldCheck size={20} color="#ffd54f" />
            <strong style={{ fontSize: "1rem" }}>
              {isRegister ? "Kisan Registration (किसान पंजीकरण)" : "Farmer Portal Login (किसान लॉगिन)"}
            </strong>
          </div>
          <span style={{ fontSize: "0.7rem", background: "rgba(255,255,255,0.15)", padding: "2px 8px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.2)" }}>
            Govt. Portal
          </span>
        </div>

        <div className="gov-card-body" style={{ padding: "1.5rem" }}>
          {error && (
            <div className="alert alert-danger" style={{ marginBottom: "1rem" }}>
              ⚠️ {error}
            </div>
          )}

          {/* Demo access banner */}
          <div style={{ background: "linear-gradient(135deg, #f0fdf4, #e8f5e9)", border: "1.5px solid var(--color-primary-200)", padding: "1rem", borderRadius: "var(--radius-lg)", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
              <div>
                <strong style={{ fontSize: "0.875rem", color: "var(--color-primary-900)", display: "block", marginBottom: "0.15rem" }}>
                  🧑‍🌾 Quick Demo Access
                </strong>
                <span style={{ fontSize: "0.775rem", color: "var(--color-text-muted)" }}>
                  Pre-filled Nashik farmer profile with produce &amp; APMC records
                </span>
              </div>
              <button 
                type="button" 
                className="btn btn-primary btn-sm"
                onClick={handleDemoFarmer}
                style={{ flexShrink: 0 }}
              >
                <UserCheck size={14} />
                <span>Instant Demo Login</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <>
                <div className="form-group">
                  <label className="form-label">
                    Full Name (किसान का पूरा नाम) <span className="required">*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <User size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-subtle)", pointerEvents: "none" }} />
                    <input 
                      type="text" 
                      className="form-input" 
                      style={{ paddingLeft: "2.25rem" }}
                      placeholder="e.g. Ramesh Dattatray Patil" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">State (राज्य) <span className="required">*</span></label>
                    <select 
                      className="form-select"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Rajasthan">Rajasthan</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">District (ज़िला) <span className="required">*</span></label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Nashik" 
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Village / Taluka (गाँव / तहसील) <span className="required">*</span></label>
                  <div style={{ position: "relative" }}>
                    <MapPin size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-subtle)", pointerEvents: "none" }} />
                    <input 
                      type="text" 
                      className="form-input"
                      style={{ paddingLeft: "2.25rem" }}
                      placeholder="e.g. Pimpalgaon Baswant, Niphad" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required 
                    />
                  </div>
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">
                Mobile Number (मोबाइल नंबर) <span className="required">*</span>
              </label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <span style={{ display: "inline-flex", alignItems: "center", padding: "0 0.85rem", background: "var(--color-bg-subtle)", border: "1.5px solid var(--color-border)", borderRadius: "var(--radius-md)", fontSize: "0.9rem", color: "var(--color-text-muted)", fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>
                  🇮🇳 +91
                </span>
                <input 
                  type="tel" 
                  className="form-input" 
                  placeholder="10-digit mobile number" 
                  maxLength={10}
                  value={mobile} 
                  onChange={(e) => setMobile(e.target.value)}
                  required 
                />
              </div>
              <span className="form-help">Verified via OTP or secure Kisan PIN</span>
            </div>

            <div className="form-group">
              <label className="form-label">
                Kisan Security PIN / Password (पिन / पासवर्ड) <span className="required">*</span>
              </label>
              <div style={{ position: "relative" }}>
                <Lock size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-subtle)", pointerEvents: "none" }} />
                <input 
                  type="password" 
                  className="form-input"
                  style={{ paddingLeft: "2.25rem" }}
                  placeholder="Enter 6-digit PIN or password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-lg" 
              style={{ width: "100%", marginTop: "1.25rem" }}
              disabled={loading}
            >
              {loading ? (
                <span>Verifying…</span>
              ) : (
                <>
                  <span>{isRegister ? "Complete Registration" : "Login to AgriSathi"}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Toggle register/login */}
          <div style={{ marginTop: "1.25rem", textAlign: "center", fontSize: "0.875rem", color: "var(--color-text-muted)", borderTop: "1px solid var(--color-border-light)", paddingTop: "1rem" }}>
            {isRegister ? (
              <span>
                Already registered?{" "}
                <button 
                  type="button" 
                  style={{ background: "none", border: "none", color: "var(--color-primary-800)", fontWeight: 700, cursor: "pointer", textDecoration: "underline", fontFamily: "inherit" }}
                  onClick={() => setIsRegister(false)}
                >
                  Farmer Login
                </button>
              </span>
            ) : (
              <span>
                New farmer on AgriSathi?{" "}
                <button 
                  type="button" 
                  style={{ background: "none", border: "none", color: "var(--color-primary-800)", fontWeight: 700, cursor: "pointer", textDecoration: "underline", fontFamily: "inherit" }}
                  onClick={() => setIsRegister(true)}
                >
                  Register Free Account
                </button>
              </span>
            )}
          </div>

          {/* Security assurance */}
          <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>
            <ShieldCheck size={13} color="var(--color-success)" />
            <span>256-bit SSL Encrypted • Data protected under Govt. Agriculture IT Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
