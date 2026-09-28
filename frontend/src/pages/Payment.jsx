import React, { useState } from "react";
import { 
  CreditCard, CheckCircle2, ShieldCheck, Printer, 
  ArrowRight, FileText, Truck, ArrowLeft, QrCode 
} from "lucide-react";

export default function Payment({ 
  negotiation, 
  onPaymentSuccess, 
  onTabChange, 
  farmer, 
  t 
}) {
  const [paymentMethod, setPaymentMethod] = useState("ESCROW");
  const [processing, setProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);

  const price = negotiation?.finalPrice || negotiation?.buyerPrice || 2300;
  const quantity = negotiation?.offeredQuantity || 100;
  const totalAmount = price * quantity;
  const mandiCess = Math.round(totalAmount * 0.01); // 1% APMC statutory cess
  const netPayable = totalAmount;

  const handlePayNow = () => {
    setProcessing(true);
    setTimeout(() => {
      const paymentData = {
        id: `PAY-${Date.now().toString().slice(-6)}`,
        saleId: `SALE-${Date.now().toString().slice(-5)}`,
        negotiationId: negotiation?.id || "NEG-901",
        cropName: negotiation?.cropName || "Tomato",
        quantity: quantity,
        agreedPrice: price,
        amount: netPayable,
        paymentMethod: paymentMethod,
        paymentStatus: "SUCCESS",
        transactionId: `AGRI-TXN-${Date.now()}`,
        receiptNumber: `REC-AS-${Math.floor(100000 + Math.random() * 900000)}`,
        paidAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
      };
      setPaymentResult(paymentData);
      onPaymentSuccess(paymentData);
      setProcessing(false);
    }, 1200);
  };

  return (
    <div style={{ maxWidth: "780px", margin: "0 auto" }}>
      {/* Back button */}
      <div style={{ marginBottom: "1rem" }}>
        <button 
          className="btn btn-secondary btn-sm"
          onClick={() => onTabChange("deal-room")}
        >
          <ArrowLeft size={16} />
          <span>Back to Deal Room</span>
        </button>
      </div>

      {!paymentResult ? (
        /* Payment Checkout View */
        <div className="gov-card">
          <div className="gov-card-header" style={{ background: "var(--color-primary-800)", color: "#ffffff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CreditCard size={20} color="#ffd54f" />
              <strong style={{ fontSize: "1.1rem" }}>
                {t.paymentTitle} (सुरक्षित डिजिटल भुगतान)
              </strong>
            </div>
            <span style={{ fontSize: "0.75rem", background: "rgba(255,255,255,0.2)", padding: "2px 8px", borderRadius: "4px" }}>
              Encrypted Escrow
            </span>
          </div>

          <div className="gov-card-body" style={{ padding: "1.75rem" }}>
            {/* Deal Summary */}
            <div style={{ background: "#f8faf9", border: "1px solid var(--color-border)", borderRadius: "8px", padding: "1.25rem", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1rem", color: "var(--color-primary-900)", marginBottom: "0.85rem", borderBottom: "1px solid var(--color-border-light)", paddingBottom: "0.5rem" }}>
                {t.dealSummary} (Contract Ref: {negotiation?.id || "NEG-901"})
              </h3>

              <div className="grid-2" style={{ gap: "0.75rem", fontSize: "0.875rem" }}>
                <div>
                  <span style={{ color: "var(--color-text-subtle)" }}>Farmer Seller:</span>
                  <div style={{ fontWeight: 700 }}>{farmer?.name || "Ramesh Patil"} (ID: {farmer?.id || "FARMER-MH-4291"})</div>
                </div>
                <div>
                  <span style={{ color: "var(--color-text-subtle)" }}>Procuring Buyer:</span>
                  <div style={{ fontWeight: 700 }}>{negotiation?.buyerName || "MahaAgro Kisan Producer Company"}</div>
                </div>
                <div>
                  <span style={{ color: "var(--color-text-subtle)" }}>Crop & Variety:</span>
                  <div style={{ fontWeight: 700 }}>{negotiation?.cropName || "Tomato (Grade A)"}</div>
                </div>
                <div>
                  <span style={{ color: "var(--color-text-subtle)" }}>Confirmed Lot Quantity:</span>
                  <div style={{ fontWeight: 700 }}>{quantity} Quintals</div>
                </div>
              </div>

              <div style={{ marginTop: "1rem", paddingTop: "0.85rem", borderTop: "1px dashed #d1d5db", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-primary-900)" }}>
                  Agreed Rate per Quintal:
                </span>
                <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--color-primary-800)" }}>
                  ₹{price.toLocaleString()} /Qtl
                </span>
              </div>

              <div style={{ marginTop: "0.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--color-primary-900)" }}>
                  {t.totalPayable}:
                </span>
                <span style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--color-success)" }}>
                  ₹{netPayable.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label className="form-label" style={{ marginBottom: "0.75rem" }}>
                {t.selectPaymentMethod} (निपटान चैनल):
              </label>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <label 
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                    padding: "0.85rem 1rem",
                    borderRadius: "6px",
                    border: paymentMethod === "ESCROW" ? "2px solid var(--color-primary-800)" : "1px solid var(--color-border)",
                    background: paymentMethod === "ESCROW" ? "var(--color-primary-50)" : "#ffffff",
                    cursor: "pointer"
                  }}
                >
                  <input 
                    type="radio" 
                    name="payMethod" 
                    value="ESCROW" 
                    checked={paymentMethod === "ESCROW"} 
                    onChange={() => setPaymentMethod("ESCROW")}
                  />
                  <div>
                    <strong style={{ display: "block", fontSize: "0.95rem", color: "var(--color-primary-900)" }}>
                      🛡️ KrishiMitra Smart Escrow Guarantee (Recommended)
                    </strong>
                    <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                      Buyer funds are locked in designated escrow. Released automatically upon produce weighment at gate.
                    </span>
                  </div>
                </label>

                <label 
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                    padding: "0.85rem 1rem",
                    borderRadius: "6px",
                    border: paymentMethod === "UPI" ? "2px solid var(--color-primary-800)" : "1px solid var(--color-border)",
                    background: paymentMethod === "UPI" ? "var(--color-primary-50)" : "#ffffff",
                    cursor: "pointer"
                  }}
                >
                  <input 
                    type="radio" 
                    name="payMethod" 
                    value="UPI" 
                    checked={paymentMethod === "UPI"} 
                    onChange={() => setPaymentMethod("UPI")}
                  />
                  <div>
                    <strong style={{ display: "block", fontSize: "0.95rem", color: "var(--color-primary-900)" }}>
                      📱 Unified Payments Interface (UPI 2.0 / Mandate)
                    </strong>
                    <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                      Direct instant settlement via BHIM, PhonePe, or Google Pay.
                    </span>
                  </div>
                </label>

                <label 
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                    padding: "0.85rem 1rem",
                    borderRadius: "6px",
                    border: paymentMethod === "DBT" ? "2px solid var(--color-primary-800)" : "1px solid var(--color-border)",
                    background: paymentMethod === "DBT" ? "var(--color-primary-50)" : "#ffffff",
                    cursor: "pointer"
                  }}
                >
                  <input 
                    type="radio" 
                    name="payMethod" 
                    value="DBT" 
                    checked={paymentMethod === "DBT"} 
                    onChange={() => setPaymentMethod("DBT")}
                  />
                  <div>
                    <strong style={{ display: "block", fontSize: "0.95rem", color: "var(--color-primary-900)" }}>
                      🏦 Direct Bank Transfer (DBT / RTGS / NEFT)
                    </strong>
                    <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                      Bank-to-bank electronic transfer linked to Kisan Aadhaar & IFSC.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Pay Button */}
            <button 
              className="btn btn-primary btn-lg"
              style={{ width: "100%" }}
              onClick={handlePayNow}
              disabled={processing}
            >
              {processing ? (
                "Processing Secure Bank Settlement..."
              ) : (
                <>
                  <ShieldCheck size={20} />
                  <span>Execute Settlement of ₹{netPayable.toLocaleString()}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Official Sale Receipt & Tax Invoice View (PRD Section 13) */
        <div>
          {/* Success Banner */}
          <div style={{ background: "var(--color-success-bg)", border: "1px solid #86efac", borderRadius: "8px", padding: "1.25rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <CheckCircle2 size={32} color="var(--color-success)" style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: "1.1rem", color: "var(--color-success)", display: "block" }}>
                {t.paymentSuccessTitle}
              </strong>
              <span style={{ fontSize: "0.85rem", color: "#166534" }}>
                Transaction recorded and escrow confirmed. Produce status updated to <strong>SOLD</strong> in your digital ledger.
              </span>
            </div>
          </div>

          {/* Printable Official Tax Invoice & APMC Bill */}
          <div 
            id="printable-sale-receipt" 
            className="gov-card" 
            style={{ border: "2px solid #143e18", background: "#ffffff" }}
          >
            <div style={{ padding: "2rem", borderBottom: "2px solid #143e18" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <img src="/logo.png" alt="KrishiMitra Emblem" style={{ width: "48px", height: "48px", objectFit: "contain", borderRadius: "6px" }} />
                  <div>
                    <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--color-primary-900)", lineHeight: 1.1 }}>
                      KrishiMitra Digital Settlement Slip
                    </h2>
                    <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                      National Agricultural Produce Trade & Settlement Act Compliant
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span className="badge badge-success" style={{ fontSize: "0.8rem", padding: "4px 10px" }}>
                    PAID & SETTLED
                  </span>
                  <div style={{ fontSize: "0.775rem", color: "var(--color-text-subtle)", marginTop: "4px" }}>
                    Timestamp: {paymentResult.paidAt}
                  </div>
                </div>
              </div>
            </div>

            <div className="gov-card-body" style={{ padding: "2rem" }}>
              <div className="grid-2" style={{ marginBottom: "1.5rem", fontSize: "0.875rem" }}>
                <div style={{ borderLeft: "3px solid #1b5e20", paddingLeft: "0.75rem" }}>
                  <strong style={{ color: "var(--color-primary-900)", display: "block", marginBottom: "0.25rem" }}>
                    Farmer (Seller) Details:
                  </strong>
                  <div>Name: <strong>{farmer?.name || "Ramesh Dattatray Patil"}</strong></div>
                  <div>Kisan ID: <strong>{farmer?.id || "FARMER-MH-4291"}</strong></div>
                  <div>Location: {farmer?.location || "Pimpalgaon Baswant"}, {farmer?.district}</div>
                  <div>Mobile: +91 {farmer?.mobile || "9822014589"}</div>
                </div>

                <div style={{ borderLeft: "3px solid #b45309", paddingLeft: "0.75rem" }}>
                  <strong style={{ color: "var(--color-amber-900)", display: "block", marginBottom: "0.25rem" }}>
                    Buyer (Purchaser) Details:
                  </strong>
                  <div>Organization: <strong>{negotiation?.buyerName || "MahaAgro Kisan Producer Company"}</strong></div>
                  <div>Channel: In-App Escrow Trade</div>
                  <div>Buyer Verification: APMC Reg. Verified</div>
                  <div>Settlement Account: State Bank of India (DBT)</div>
                </div>
              </div>

              {/* Transaction Breakdown Table */}
              <div className="gov-table-container" style={{ marginBottom: "1.5rem" }}>
                <table className="gov-table">
                  <thead>
                    <tr>
                      <th>Commodity Description</th>
                      <th>Lot Quantity</th>
                      <th>Agreed Unit Rate</th>
                      <th>Gross Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>{paymentResult.cropName}</strong>
                        <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>Contract ID: {paymentResult.negotiationId}</div>
                      </td>
                      <td><strong>{paymentResult.quantity}</strong> Quintals</td>
                      <td>₹{paymentResult.agreedPrice.toLocaleString()} /Qtl</td>
                      <td><strong style={{ color: "var(--color-primary-900)" }}>₹{paymentResult.amount.toLocaleString()}</strong></td>
                    </tr>
                    <tr>
                      <td colSpan={3} style={{ textAlign: "right", fontWeight: 600 }}>APMC Market Development Cess (1% Absorbed):</td>
                      <td>₹{mandiCess.toLocaleString()}</td>
                    </tr>
                    <tr style={{ background: "#f8faf9" }}>
                      <td colSpan={3} style={{ textAlign: "right", fontWeight: 800, fontSize: "1rem" }}>Net Farmgate Payment Credited:</td>
                      <td><strong style={{ fontSize: "1.2rem", color: "var(--color-success)" }}>₹{paymentResult.amount.toLocaleString()}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Receipt Footer with Transaction ID & QR Code representation */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", borderTop: "1px solid var(--color-border-light)", paddingTop: "1rem" }}>
                <div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-text-subtle)" }}>Official Receipt Number:</div>
                  <strong style={{ fontSize: "1rem", color: "var(--color-primary-800)" }}>{paymentResult.receiptNumber}</strong>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-text-subtle)", marginTop: "4px" }}>Transaction ID:</div>
                  <code style={{ fontSize: "0.85rem", background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px" }}>{paymentResult.transactionId}</code>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "#f8faf9", padding: "0.5rem 0.75rem", borderRadius: "6px", border: "1px solid var(--color-border)" }}>
                  <QrCode size={40} color="#1b5e20" />
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>
                    Digital Seal Verified<br />
                    Scan to verify on e-NAM / KrishiMitra
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons post-payment */}
          <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
            <button 
              className="btn btn-secondary"
              onClick={() => window.print()}
            >
              <Printer size={16} />
              <span>{t.downloadReceipt}</span>
            </button>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button 
                className="btn btn-primary"
                onClick={() => onTabChange("transport")}
              >
                <Truck size={16} />
                <span>Arrange Farmgate Transport</span>
              </button>

              <button 
                className="btn btn-secondary"
                onClick={() => onTabChange("records")}
              >
                <FileText size={16} />
                <span>View in Digital Passbook</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
