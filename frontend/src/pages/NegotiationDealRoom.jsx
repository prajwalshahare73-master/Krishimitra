import React, { useState } from "react";
import { 
  MessageSquare, ShieldCheck, CheckCircle2, XCircle, 
  Send, Lock, CreditCard, ArrowRight, CornerDownRight, User 
} from "lucide-react";

export default function NegotiationDealRoom({ 
  negotiation, 
  onSendCounter, 
  onAcceptDeal, 
  onRejectDeal, 
  onProceedToPayment, 
  t 
}) {
  const [counterPrice, setCounterPrice] = useState(negotiation?.farmerPrice || 2300);
  const [counterQty, setCounterQty] = useState(negotiation?.offeredQuantity || 100);
  const [customMsg, setCustomMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!negotiation) {
    return (
      <div className="gov-card">
        <div className="gov-card-body" style={{ textAlign: "center", padding: "3rem" }}>
          <MessageSquare size={36} color="var(--color-primary-800)" style={{ margin: "0 auto 1rem" }} />
          <h3>No Active Negotiation Deal Room Selected</h3>
          <p style={{ color: "var(--color-text-muted)", marginTop: "0.5rem" }}>
            Please select a buyer from the "Buyers & Sell" screen to initiate a transparent in-app negotiation.
          </p>
        </div>
      </div>
    );
  }

  const isConfirmed = negotiation.status === "DEAL_CONFIRMED";
  const isRejected = negotiation.status === "DEAL_REJECTED";

  const handleSendOffer = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      onSendCounter(negotiation.id, parseFloat(counterPrice), parseFloat(counterQty), customMsg);
      setCustomMsg("");
      setSubmitting(false);
    }, 300);
  };

  return (
    <div style={{ maxWidth: "880px", margin: "0 auto" }}>
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
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
            <MessageSquare size={22} color="var(--color-primary-800)" />
            <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-primary-900)" }}>
              {t.dealRoomTitle}
            </h2>
          </div>
          <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
            Deal ID: <strong>{negotiation.id}</strong> • Commodity: <strong>{negotiation.cropName}</strong> • Counterparty: <strong>{negotiation.buyerName}</strong>
          </div>
        </div>

        <div>
          {isConfirmed && <span className="badge badge-success" style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}>✓ Deal Confirmed & Locked</span>}
          {isRejected && <span className="badge badge-danger">Declined</span>}
          {!isConfirmed && !isRejected && <span className="badge badge-warning">Negotiating In Progress</span>}
        </div>
      </div>

      {/* 2. Current Terms Summary Box (PRD Section 12 & 13) */}
      <div className="gov-card">
        <div className="gov-card-header" style={{ background: isConfirmed ? "#f0fdf4" : "#fafbfc" }}>
          <strong style={{ fontSize: "0.95rem", color: "var(--color-primary-900)" }}>
            Current Negotiated Term Sheet
          </strong>
          {isConfirmed && (
            <span style={{ fontSize: "0.8rem", color: "var(--color-success)", fontWeight: 700 }}>
              <Lock size={13} style={{ display: "inline", marginRight: "3px" }} /> Price & Quantity Locked for Settlement
            </span>
          )}
        </div>

        <div className="gov-card-body">
          <div className="grid-4" style={{ textAlign: "center" }}>
            <div style={{ borderRight: "1px solid #e5e7eb", padding: "0.5rem" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)", fontWeight: 600 }}>Farmer Asking Rate</div>
              <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-primary-900)" }}>
                ₹{negotiation.farmerPrice?.toLocaleString()}
                <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--color-text-muted)", display: "block" }}>/Quintal</span>
              </div>
            </div>

            <div style={{ borderRight: "1px solid #e5e7eb", padding: "0.5rem" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)", fontWeight: 600 }}>Buyer Counter Offer</div>
              <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-amber-700)" }}>
                ₹{negotiation.buyerPrice?.toLocaleString()}
                <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--color-text-muted)", display: "block" }}>/Quintal</span>
              </div>
            </div>

            <div style={{ borderRight: "1px solid #e5e7eb", padding: "0.5rem" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)", fontWeight: 600 }}>Agreed Quantity</div>
              <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-primary-900)" }}>
                {negotiation.offeredQuantity}
                <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--color-text-muted)", display: "block" }}>Quintals</span>
              </div>
            </div>

            <div style={{ padding: "0.5rem" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)", fontWeight: 600 }}>Gross Total Payable</div>
              <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-success)" }}>
                ₹{((negotiation.finalPrice || negotiation.buyerPrice || negotiation.farmerPrice) * negotiation.offeredQuantity).toLocaleString()}
                <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--color-text-muted)", display: "block" }}>Net Farmgate</span>
              </div>
            </div>
          </div>

          {/* Deal Confirmation Banner & Proceed to Payment button */}
          {isConfirmed && (
            <div style={{ marginTop: "1.25rem", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "1rem 1.25rem", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <strong style={{ color: "#166534", fontSize: "0.95rem", display: "block" }}>
                  🎉 Both parties accepted the agreed rate of ₹{(negotiation.finalPrice || negotiation.buyerPrice)?.toLocaleString()}/Quintal!
                </strong>
                <span style={{ fontSize: "0.825rem", color: "#15803d" }}>
                  The contract is locked. Proceed to complete digital payment escrow and generate the sale receipt.
                </span>
              </div>
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => onProceedToPayment(negotiation)}
              >
                <CreditCard size={18} />
                <span>{t.proceedToPayment}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. In-App Negotiation Chat & Offer Timeline */}
      <div className="gov-card">
        <div className="gov-card-header">
          <span className="gov-card-title">
            <MessageSquare size={17} />
            Negotiation Thread & Audit History
          </span>
          <span style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>e-NAM Compliant Audit Trail</span>
        </div>

        <div className="gov-card-body">
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxHeight: "380px", overflowY: "auto", paddingRight: "0.5rem", marginBottom: "1.5rem" }}>
            {negotiation.messages?.map((m) => {
              const isFarmer = m.senderRole === "farmer";
              const isSystem = m.senderRole === "system";

              if (isSystem) {
                return (
                  <div key={m.id} style={{ background: "#f0fdf4", border: "1px dashed #86efac", padding: "0.6rem 1rem", borderRadius: "6px", fontSize: "0.825rem", textAlign: "center", color: "#166534" }}>
                    {m.message}
                  </div>
                );
              }

              return (
                <div 
                  key={m.id} 
                  style={{
                    alignSelf: isFarmer ? "flex-end" : "flex-start",
                    maxWidth: "80%",
                    background: isFarmer ? "var(--color-primary-50)" : "#f3f4f6",
                    border: `1px solid ${isFarmer ? "var(--color-primary-100)" : "#e5e7eb"}`,
                    padding: "0.85rem 1rem",
                    borderRadius: "8px",
                    boxShadow: "var(--shadow-sm)"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", marginBottom: "0.3rem" }}>
                    <strong style={{ fontSize: "0.8rem", color: isFarmer ? "var(--color-primary-900)" : "var(--color-text-main)" }}>
                      {m.senderName}
                    </strong>
                    <span style={{ fontSize: "0.7rem", color: "var(--color-text-subtle)" }}>
                      {m.createdAt?.split("T")[1]?.slice(0, 5) || "Today"}
                    </span>
                  </div>

                  <p style={{ fontSize: "0.9rem", color: "var(--color-text-main)", marginBottom: "0.5rem" }}>
                    {m.message}
                  </p>

                  {m.offerPrice && (
                    <div style={{ background: "#ffffff", padding: "0.35rem 0.65rem", borderRadius: "4px", border: "1px solid #d1d5db", display: "inline-flex", gap: "0.75rem", fontSize: "0.8rem", fontWeight: 700 }}>
                      <span>Price: <strong style={{ color: "var(--color-primary-800)" }}>₹{m.offerPrice}/Qtl</strong></span>
                      {m.offerQuantity && <span>Qty: <strong>{m.offerQuantity} Qtl</strong></span>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Box: Offer Controls (If not confirmed yet) */}
          {!isConfirmed && !isRejected && (
            <div style={{ borderTop: "2px solid var(--color-border-light)", paddingTop: "1.25rem" }}>
              <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                  Do you accept the buyer's current offer of <strong>₹{negotiation.buyerPrice}/Quintal</strong>?
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button 
                    type="button" 
                    className="btn btn-secondary btn-sm"
                    style={{ color: "var(--color-danger)", borderColor: "#fca5a5" }}
                    onClick={() => onRejectDeal(negotiation.id)}
                  >
                    <XCircle size={14} />
                    <span>{t.rejectDealBtn}</span>
                  </button>

                  <button 
                    type="button" 
                    className="btn btn-primary btn-sm"
                    style={{ background: "var(--color-success)", borderColor: "#166534" }}
                    onClick={() => onAcceptDeal(negotiation.id)}
                  >
                    <CheckCircle2 size={14} />
                    <span>{t.acceptDealBtn}</span>
                  </button>
                </div>
              </div>

              {/* Counter Offer Form */}
              <form onSubmit={handleSendOffer} style={{ background: "#f8faf9", padding: "1rem", borderRadius: "8px", border: "1px solid var(--color-border)" }}>
                <strong style={{ fontSize: "0.85rem", color: "var(--color-primary-900)", display: "block", marginBottom: "0.75rem" }}>
                  Submit Counter Offer to Buyer:
                </strong>

                <div className="grid-3" style={{ marginBottom: "0.75rem" }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: "0.775rem" }}>Your Counter Price (₹/Qtl)</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      value={counterPrice} 
                      onChange={(e) => setCounterPrice(e.target.value)}
                      required 
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: "0.775rem" }}>Quantity (Quintals)</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      value={counterQty} 
                      onChange={(e) => setCounterQty(e.target.value)}
                      required 
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: "0.775rem" }}>Custom Note / Remark</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Can supply ready crates by tomorrow"
                      value={customMsg}
                      onChange={(e) => setCustomMsg(e.target.value)}
                    />
                  </div>
                </div>

                {/* Farmer Quick Response Chips */}
                <div style={{ marginBottom: "0.85rem" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)", fontWeight: 600, display: "block", marginBottom: "0.35rem" }}>
                    Quick Responses (क्विक रिप्लाई):
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {[
                      "Farmgate pickup required (खेत से लोडिंग चाहिए)",
                      "Grade A export quality guaranteed (उत्तम गुणवत्ता)",
                      "Ready for dispatch tomorrow (कल उठाव संभव)",
                      "Final price, cannot lower further (अंतिम भाव)",
                      "Payment release on APMC weighment (तौल पर भुगतान)"
                    ].map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => setCustomMsg(chip)}
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem", minHeight: "26px" }}
                      >
                        + {chip}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={submitting}
                  >
                    <Send size={15} />
                    <span>{submitting ? "Sending..." : t.sendCounterOffer}</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
