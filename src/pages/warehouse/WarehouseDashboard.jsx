import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { Pill } from "../../components/common/StatusBadge.jsx";
import RecentActivity from "../../components/dashboard/RecentActivity.jsx";
import Modal from "../../components/common/Modal.jsx";
import Button from "../../components/common/Button.jsx";
import { useToast } from "../../context/ToastContext.jsx";

function TransferModal({ close }) {
  const notify = useToast();
  const [form, setForm] = useState({ item: "", from: "Bin A-07", to: "Bin B-03", qty: "" });
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.item.trim() || !form.qty) {
      notify("Please fill in item and quantity.", "error");
      return;
    }
    notify("Transferred " + form.qty + " unit(s) of " + form.item + " from " + form.from + " to " + form.to + ".", "success");
    close();
  };
  return (
    <Modal title="Transfer stock" onClose={close}>
      <form onSubmit={submit}>
        <div className="form-field mb-2">
          <label>Item / SKU</label>
          <input className="search-input w-100" value={form.item} onChange={(e) => update("item", e.target.value)} placeholder="e.g. Replacement filter FR-220" />
        </div>
        <div className="row g-2 mb-2">
          <div className="col-6 form-field">
            <label>From</label>
            <input className="search-input w-100" value={form.from} onChange={(e) => update("from", e.target.value)} />
          </div>
          <div className="col-6 form-field">
            <label>To</label>
            <input className="search-input w-100" value={form.to} onChange={(e) => update("to", e.target.value)} />
          </div>
        </div>
        <div className="form-field mb-3">
          <label>Quantity</label>
          <input type="number" min="1" className="search-input w-100" value={form.qty} onChange={(e) => update("qty", e.target.value)} placeholder="0" />
        </div>
        <div className="d-flex justify-content-end gap-2">
          <Button type="button" variant="outline" className="px-4 py-2" onClick={close}>Cancel</Button>
          <Button type="submit" className="px-4 py-2">Confirm transfer</Button>
        </div>
      </form>
    </Modal>
  );
}

function AdjustCountModal({ close }) {
  const notify = useToast();
  const [form, setForm] = useState({ item: "", newCount: "", reason: "" });
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.item.trim() || form.newCount === "") {
      notify("Please fill in item and new count.", "error");
      return;
    }
    notify("Count adjusted for " + form.item + " to " + form.newCount + " units.", "success");
    close();
  };
  return (
    <Modal title="Adjust count" onClose={close}>
      <form onSubmit={submit}>
        <div className="form-field mb-2">
          <label>Item / SKU</label>
          <input className="search-input w-100" value={form.item} onChange={(e) => update("item", e.target.value)} placeholder="e.g. Smart Thermostat X1" />
        </div>
        <div className="form-field mb-2">
          <label>New count</label>
          <input type="number" min="0" className="search-input w-100" value={form.newCount} onChange={(e) => update("newCount", e.target.value)} placeholder="0" />
        </div>
        <div className="form-field mb-3">
          <label>Reason</label>
          <input className="search-input w-100" value={form.reason} onChange={(e) => update("reason", e.target.value)} placeholder="e.g. physical recount" />
        </div>
        <div className="d-flex justify-content-end gap-2">
          <Button type="button" variant="outline" className="px-4 py-2" onClick={close}>Cancel</Button>
          <Button type="submit" className="px-4 py-2">Save adjustment</Button>
        </div>
      </form>
    </Modal>
  );
}

export default function WarehouseDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showTransfer, setShowTransfer] = useState(false);
  const [showAdjust, setShowAdjust] = useState(false);
  const firstName = user && user.name ? user.name.split(" ")[0] : "there";

  const activity = [
    { text: "Filter FR-220 · +48 received", meta: "09:14" },
    { text: "AC-Port-12k · -2 sold", meta: "08:52" },
    { text: "Thermo-S1 · adjusted", meta: "flagged" },
  ];

  return (
    <div className="content-area">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h4 className="fw-bold mb-0">Good Day, {firstName}</h4>
          <div className="text-muted" style={{ color: "var(--text-muted)" }}>Warehouse Staff</div>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-6">
          <button className="btn-tan w-100 py-3 fw-bold" style={{ fontSize: "1.05rem" }} onClick={() => navigate("/picking/list")}>
            Receive stock
          </button>
        </div>
        <div className="col-6">
          <button className="btn-outline-tan w-100 py-3 fw-bold" style={{ fontSize: "1.05rem" }} onClick={() => navigate("/picking/list")}>
            Pick order
          </button>
        </div>
        <div className="col-6">
          <button className="btn-outline-tan w-100 py-3 fw-bold" style={{ fontSize: "1.05rem" }} onClick={() => setShowTransfer(true)}>
            Transfer
          </button>
        </div>
        <div className="col-6">
          <button className="btn-outline-tan w-100 py-3 fw-bold" style={{ fontSize: "1.05rem" }} onClick={() => setShowAdjust(true)}>
            Adjust count
          </button>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-6">
          <div className="card-soft p-3">
            <div className="fw-semibold">Low stock</div>
            <div className="fs-3 fw-bold my-1">6</div>
            <Pill>review</Pill>
          </div>
        </div>
        <div className="col-6">
          <div className="card-soft p-3">
            <div className="fw-semibold">Expiring 30d</div>
            <div className="fs-3 fw-bold my-1">3</div>
            <Pill>batches</Pill>
          </div>
        </div>
        <div className="col-6">
          <div className="card-soft p-3">
            <div className="fw-semibold">Flagged</div>
            <div className="fs-3 fw-bold my-1">1</div>
            <Pill tone="pink">mismatch</Pill>
          </div>
        </div>
        <div className="col-6">
          <div className="card-soft p-3">
            <div className="fw-semibold">Transfers</div>
            <div className="fs-3 fw-bold my-1">2</div>
            <Pill>pending</Pill>
          </div>
        </div>
      </div>

      <RecentActivity items={activity} />

      <div className="card-soft p-3">
        <div className="fw-semibold mb-2">Today's tasks</div>
        <div style={{ fontSize: ".92rem" }}>Pick FIFO batch B-114</div>
        <div style={{ fontSize: ".92rem" }}>Recount bin A-07</div>
      </div>

      {showTransfer && <TransferModal close={() => setShowTransfer(false)} />}
      {showAdjust && <AdjustCountModal close={() => setShowAdjust(false)} />}
    </div>
  );
}
