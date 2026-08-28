import React, { useState } from "react";
import PageHeader from "../../components/layout/PageHeader.jsx";
import Modal from "../../components/common/Modal.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";

const TABS = ["Received", "Sold", "Transferred", "Adjusted", "Returned"];
const ITEMS = [
  { name: "Replacement filter", sku: "FR-220", icon: "bi-funnel" },
  { name: "Portable AC 12k", sku: "AC-PORT-12K", icon: "bi-wind" },
  { name: "Smart Thermostat X1", sku: "THM-X1", icon: "bi-thermometer-half" },
];

function ItemPickerModal({ close, onSelect }) {
  return (
    <Modal title="Choose item" onClose={close}>
      {ITEMS.map((it, i) => (
        <div
          key={i}
          className="d-flex align-items-center gap-3 p-2 mb-2"
          style={{ background: "#fff", borderRadius: 10, cursor: "pointer" }}
          onClick={() => { onSelect(it); close(); }}
        >
          <div className="placeholder-icon" style={{ width: 40, height: 40, fontSize: "1.1rem" }}>
            <i className={"bi " + it.icon}></i>
          </div>
          <div>
            <div className="fw-bold">{it.name}</div>
            <div className="text-muted" style={{ fontSize: ".8rem" }}>{it.sku}</div>
          </div>
        </div>
      ))}
      <div className="d-flex justify-content-end mt-2">
        <button className="btn-outline-tan px-4 py-2" onClick={close}>Cancel</button>
      </div>
    </Modal>
  );
}

export default function Receiving() {
  const { user } = useAuth();
  const notify = useToast();
  const [tab, setTab] = useState("Received");
  const [batch, setBatch] = useState("B-101");
  const [item, setItem] = useState(ITEMS[0]);
  const [showPicker, setShowPicker] = useState(false);
  const [qty, setQty] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [reason, setReason] = useState("");

  const confirm = () => {
    if (!qty) { notify("Enter a quantity to continue.", "error"); return; }
    if (batch === "B-114" && !reason.trim()) { notify("Override reason is required for a non-FIFO batch.", "error"); return; }
    notify(tab + " recorded: " + qty + " unit(s) of " + item.name + " (" + batch + ").", "success");
    setQty(""); setUnitPrice(""); setReason("");
  };

  return (
    <div className="content-area">
      <PageHeader title="New stock transaction" />
      <div className="d-flex gap-2 mb-4 flex-wrap">
        {TABS.map((t) => (
          <button key={t} className={"filter-pill " + (tab === t ? "active" : "")} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className="card-soft p-3 d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-3">
          <div className="placeholder-icon" style={{ width: 46, height: 46, fontSize: "1.2rem" }}>
            <i className={"bi " + item.icon}></i>
          </div>
          <div>
            <div className="fw-bold">{item.name}</div>
            <div className="text-muted" style={{ fontSize: ".85rem" }}>SKU {item.sku}</div>
          </div>
        </div>
        <button className="btn-outline-tan px-3 py-1" onClick={() => setShowPicker(true)}>Change</button>
      </div>

      <div className="fw-semibold mb-2">Select batch</div>
      <div
        className="d-flex justify-content-between align-items-center px-3 py-2 mb-2"
        style={{ background: batch === "B-101" ? "var(--pill-tan)" : "#fff", borderRadius: 12, cursor: "pointer", boxShadow: "var(--shadow)" }}
        onClick={() => setBatch("B-101")}
      >
        <span>B-101 · Apr 02 · qty 12</span>
        <span className="fw-bold" style={{ fontSize: ".8rem" }}>FIFO</span>
      </div>
      <div
        className="d-flex justify-content-between align-items-center px-3 py-2 mb-3"
        style={{ background: batch === "B-114" ? "var(--pill-tan)" : "#fff", borderRadius: 12, cursor: "pointer", boxShadow: "var(--shadow)" }}
        onClick={() => setBatch("B-114")}
      >
        <span>B-114 · Jun 30 · qty 20</span>
        <span className="text-muted" style={{ fontSize: ".8rem" }}>select</span>
      </div>

      {batch === "B-114" && (
        <div className="card-soft p-3 mb-3" style={{ background: "#F6EFD9" }}>
          <div className="d-flex align-items-center gap-2 fw-semibold mb-2">
            <i className="bi bi-exclamation-triangle"></i>
            <span>Override reason needed — this isn't the oldest batch</span>
          </div>
          <input className="search-input w-100" placeholder="Reason" value={reason} onChange={(e) => setReason(e.target.value)} />
        </div>
      )}

      <div className="row g-2 mb-3">
        <div className="col-6 form-field">
          <label>Quantity</label>
          <input type="number" min="1" className="search-input w-100" placeholder="0" value={qty} onChange={(e) => setQty(e.target.value)} />
        </div>
        <div className="col-6 form-field">
          <label>Unit price (optional)</label>
          <input type="number" min="0" className="search-input w-100" placeholder="0.00" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} />
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <span>By <strong>{(user && user.name) || "V. Devera"}</strong></span>
        <span className="text-muted">Time: <strong>Auto</strong></span>
      </div>
      <button className="btn-tan w-100 py-2 fw-bold mt-3" onClick={confirm}>Confirm</button>
      {showPicker && <ItemPickerModal close={() => setShowPicker(false)} onSelect={setItem} />}
    </div>
  );
}
