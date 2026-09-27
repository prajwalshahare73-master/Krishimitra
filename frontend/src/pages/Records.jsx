import React, { useState } from "react";
import { FileText, Download, CheckCircle, Tag, Filter, Printer, ExternalLink } from "lucide-react";

export default function Records({ produceList, salesList, farmer, t }) {
  const [filterType, setFilterType] = useState("all");

  const totalSalesRevenue = salesList.reduce((acc, curr) => acc + (parseFloat(curr.saleAmount) || 0), 0);
  const totalHarvestedQty = produceList.reduce((acc, curr) => acc + (parseFloat(curr.quantity) || 0), 0);

  return (
    <div>
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
          <FileText size={22} color="var(--color-primary-800)" />
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-primary-900)" }}>
            {t.myRecordsTitle} (किसान डिजिटल पासबुक एवं बिक्री अभिलेख)
          </h2>
        </div>
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
          Official ledger of all registered harvest lots, completed buyer transactions, DBT payments, and verifiable tax receipts.
        </p>
      </div>

      {/* 2. Passbook Financial Summary */}
      <div className="grid-3" style={{ marginBottom: "1.5rem" }}>
        <div className="gov-card" style={{ marginBottom: 0 }}>
          <div className="gov-card-body">
            <span style={{ fontSize: "0.8rem", color: "var(--color-text-subtle)", fontWeight: 600 }}>
              Gross Settled Farm Income:
            </span>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--color-success)", marginTop: "0.25rem" }}>
              ₹{totalSalesRevenue.toLocaleString()}
            </div>
            <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
              {salesList.length} Completed transactions
            </span>
          </div>
        </div>

        <div className="gov-card" style={{ marginBottom: 0 }}>
          <div className="gov-card-body">
            <span style={{ fontSize: "0.8rem", color: "var(--color-text-subtle)", fontWeight: 600 }}>
              Total Harvest Logged:
            </span>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--color-primary-800)", marginTop: "0.25rem" }}>
              {totalHarvestedQty} <span style={{ fontSize: "1rem", fontWeight: 500 }}>Quintals</span>
            </div>
            <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
              {produceList.length} Total registered crop lots
            </span>
          </div>
        </div>

        <div className="gov-card" style={{ marginBottom: 0 }}>
          <div className="gov-card-body">
            <span style={{ fontSize: "0.8rem", color: "var(--color-text-subtle)", fontWeight: 600 }}>
              Primary Settlement Bank:
            </span>
            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--color-primary-900)", marginTop: "0.25rem" }}>
              State Bank of India (DBT)
            </div>
            <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
              A/c: **** 4892 • IFSC: SBIN0001234
            </span>
          </div>
        </div>
      </div>

      {/* 3. Filter Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem" }}>
        <button 
          className={`btn btn-sm ${filterType === "all" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setFilterType("all")}
        >
          All Records
        </button>
        <button 
          className={`btn btn-sm ${filterType === "sales" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setFilterType("sales")}
        >
          Completed Sales & Receipts ({salesList.length})
        </button>
        <button 
          className={`btn btn-sm ${filterType === "produce" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setFilterType("produce")}
        >
          Produce Inventory ({produceList.length})
        </button>
      </div>

      {/* 4. Sales Records Table (PRD Section 12 & 15) */}
      {(filterType === "all" || filterType === "sales") && (
        <div className="gov-card">
          <div className="gov-card-header">
            <span className="gov-card-title">
              <CheckCircle size={18} color="var(--color-success)" />
              {t.salesHistory} ({salesList.length} Settled Transactions)
            </span>
            <button className="btn btn-secondary btn-sm" onClick={() => window.print()}>
              <Printer size={14} />
              <span>Print Ledger</span>
            </button>
          </div>

          <div className="gov-card-body" style={{ padding: 0 }}>
            <div className="table-scroll-hint">↔ Scroll horizontally to view complete records</div>
            <div className="gov-table-container" style={{ border: "none", borderRadius: 0 }}>
              <table className="gov-table">
                <thead>
                  <tr>
                    <th>Sale ID & Date</th>
                    <th>Commodity</th>
                    <th>Lot Quantity</th>
                    <th>Procuring Buyer</th>
                    <th>Agreed Rate</th>
                    <th>Settled Amount</th>
                    <th>Status</th>
                    <th>Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {salesList.length > 0 ? (
                    salesList.map((s) => (
                      <tr key={s.id}>
                        <td>
                          <strong>{s.id}</strong>
                          <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>{s.saleDate}</div>
                        </td>
                        <td><strong>{s.crop}</strong></td>
                        <td>{s.quantity} Quintals</td>
                        <td>{s.buyerName}</td>
                        <td>₹{s.agreedPrice?.toLocaleString()} /Qtl</td>
                        <td>
                          <strong style={{ color: "var(--color-success)", fontSize: "0.95rem" }}>
                            ₹{s.saleAmount?.toLocaleString()}
                          </strong>
                        </td>
                        <td>
                          <span className="badge badge-success">{s.paymentStatus}</span>
                        </td>
                        <td>
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => window.print()}
                            title="Print Tax Invoice"
                          >
                            <Download size={13} />
                            <span>Slip</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} style={{ textAlign: "center", padding: "2rem", color: "var(--color-text-muted)" }}>
                        No completed sales yet. Completed buyer deals appear here automatically.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 5. Produce Lots Table */}
      {(filterType === "all" || filterType === "produce") && (
        <div className="gov-card">
          <div className="gov-card-header">
            <span className="gov-card-title">
              Harvested Produce Register
            </span>
          </div>

          <div className="gov-card-body" style={{ padding: 0 }}>
            <div className="gov-table-container" style={{ border: "none", borderRadius: 0 }}>
              <table className="gov-table">
                <thead>
                  <tr>
                    <th>Produce ID</th>
                    <th>Crop & Variety</th>
                    <th>Quantity</th>
                    <th>Grade</th>
                    <th>Harvest Date</th>
                    <th>Expected Rate</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {produceList.map((p) => (
                    <tr key={p.id}>
                      <td><strong>{p.id}</strong></td>
                      <td>
                        <strong>{p.cropName}</strong>
                        <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>{p.variety}</div>
                      </td>
                      <td>{p.quantity} Quintals</td>
                      <td><span className="badge badge-info">{p.quality}</span></td>
                      <td>{p.harvestDate}</td>
                      <td>₹{p.askingPrice?.toLocaleString()} /Qtl</td>
                      <td>
                        {p.status === "ACTIVE" && <span className="badge badge-success">Active / Available</span>}
                        {p.status === "IN_NEGOTIATION" && <span className="badge badge-warning">Negotiating</span>}
                        {p.status === "SOLD" && <span className="badge badge-neutral">Sold</span>}
                        {p.status === "STORED" && <span className="badge badge-info">Stored</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
