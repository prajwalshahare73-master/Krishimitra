import React, { useState } from "react";
import { MessageSquareQuote, Star, CheckCircle2, ShieldCheck, Send } from "lucide-react";
import { api } from "../services/api";

export default function Feedback({ facilities, buyers, t }) {
  const [targetType, setTargetType] = useState("facility");
  const [targetId, setTargetId] = useState(facilities[0]?.id || "FAC-01");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [reviewsList, setReviewsList] = useState([
    {
      id: "FB-01",
      farmerName: "Ramesh Patil",
      targetName: "Sahyadri Agro Cold Storage",
      targetType: "Cold Storage",
      rating: 5,
      comment: "Very good cold storage pre-cooling setup. Minimal weight loss for my tomato consignment.",
      date: "20 Sept 2026"
    },
    {
      id: "FB-02",
      farmerName: "Dnyaneshwar Shinde",
      targetName: "MahaAgro Kisan Producer Company",
      targetType: "FPO Buyer",
      rating: 5,
      comment: "Prompt weighing and immediate payment escrow confirmation within 30 minutes of delivery.",
      date: "24 Sept 2026"
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const selectedTarget = (targetType === "facility" ? facilities : buyers).find(x => x.id === targetId);
      const newReview = {
        id: `FB-${Date.now().toString().slice(-4)}`,
        farmerName: "Ramesh Patil (You)",
        targetName: selectedTarget ? selectedTarget.name : "Facility",
        targetType: targetType === "facility" ? "Agricultural Facility" : "Verified Buyer",
        rating,
        comment,
        date: "Today"
      };
      setReviewsList([newReview, ...reviewsList]);
      setSubmitted(true);
      setSubmitting(false);
      setComment("");
    }, 400);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
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
          <MessageSquareQuote size={22} color="var(--color-primary-800)" />
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-primary-900)" }}>
            {t.feedbackTitle} (किसान प्रतिपुष्टि एवं सेवा समीक्षा)
          </h2>
        </div>
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
          Your honest rating helps fellow farmers identify fair buyers, reputable cold storages, and reliable transport operators.
        </p>
      </div>

      {submitted && (
        <div style={{ background: "var(--color-success-bg)", border: "1px solid #86efac", borderRadius: "8px", padding: "1.25rem", marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <CheckCircle2 size={24} color="var(--color-success)" />
            <div>
              <strong style={{ color: "var(--color-success)", display: "block" }}>Feedback Registered Successfully!</strong>
              <span style={{ fontSize: "0.85rem", color: "#166534" }}>Thank you for strengthening the farmer community rating system.</span>
            </div>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => setSubmitted(false)}>Submit Another</button>
        </div>
      )}

      {/* 2. Feedback Form */}
      <div className="gov-card">
        <div className="gov-card-header">
          <strong style={{ fontSize: "1rem", color: "var(--color-primary-900)" }}>
            Rate a Facility, Buyer, or Logistics Partner
          </strong>
        </div>

        <div className="gov-card-body">
          <form onSubmit={handleSubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Select Entity Type *</label>
                <select 
                  className="form-select"
                  value={targetType}
                  onChange={(e) => setTargetType(e.target.value)}
                >
                  <option value="facility">Cold Storage / Processing Facility</option>
                  <option value="buyer">Bulk Buyer / FPO</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Select Organization / Centre *</label>
                <select 
                  className="form-select"
                  value={targetId}
                  onChange={(e) => setTargetId(e.target.value)}
                >
                  {targetType === "facility" ? (
                    facilities.map(f => <option key={f.id} value={f.id}>{f.name} ({f.location})</option>)
                  ) : (
                    buyers.map(b => <option key={b.id} value={b.id}>{b.name} ({b.crop})</option>)
                  )}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Your Rating (रेटिंग) *</label>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
                    aria-label={`${star} Stars`}
                  >
                    <Star 
                      size={28} 
                      fill={star <= rating ? "#f59e0b" : "none"} 
                      color={star <= rating ? "#f59e0b" : "#d1d5db"} 
                    />
                  </button>
                ))}
                <span style={{ marginLeft: "0.5rem", fontWeight: 700, color: "var(--color-primary-900)" }}>
                  {rating} of 5 Stars
                </span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Your Feedback / Review Comments *</label>
              <textarea 
                className="form-textarea"
                rows={3}
                placeholder="Share your experience regarding weighment accuracy, storage temperature, payment timeliness, or behavior..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>

            <div style={{ textAlign: "right" }}>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={submitting}
              >
                <Send size={15} />
                <span>{submitting ? "Submitting..." : t.submitFeedback}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 3. Community Reviews Feed */}
      <div className="gov-card">
        <div className="gov-card-header">
          <strong style={{ fontSize: "1rem", color: "var(--color-primary-900)" }}>
            Verified Farmer Community Reviews
          </strong>
        </div>

        <div className="gov-card-body" style={{ padding: 0 }}>
          {reviewsList.map((r, i) => (
            <div key={r.id || i} style={{ padding: "1.25rem", borderBottom: i < reviewsList.length - 1 ? "1px solid var(--color-border-light)" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                <div>
                  <strong style={{ fontSize: "0.95rem", color: "var(--color-primary-900)" }}>{r.targetName}</strong>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)", marginLeft: "0.5rem" }}>({r.targetType})</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                  {[...Array(r.rating)].map((_, idx) => (
                    <Star key={idx} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
              </div>

              <p style={{ fontSize: "0.875rem", color: "var(--color-text-main)", marginBottom: "0.4rem" }}>
                "{r.comment}"
              </p>

              <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                By <strong>{r.farmerName}</strong> • {r.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
