import React, { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader.jsx";
import Table from "../../components/common/Table.jsx";
import Modal from "../../components/common/Modal.jsx";
import Button from "../../components/common/Button.jsx";
import Loading from "../../components/common/Loading.jsx";
import { api } from "../../services/api.js";
import { useToast } from "../../context/ToastContext.jsx";

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

export default function StockAdjustments() {
  const [batches, setBatches] = useState(null);
  const [showAdjust, setShowAdjust] = useState(false);

  useEffect(() => {
    api.getBatches().then(setBatches);
  }, []);

  if (!batches) return <Loading />;

  const columns = [
    { key: "id", label: "Batch", className: "fw-semibold py-3" },
    { key: "product", label: "Product" },
    { key: "received", label: "Received" },
    { key: "qty", label: "Qty" },
  ];

  return (
    <div className="content-area">
      <PageHeader
        title="Stock Adjustments / Batches"
        action={<Button className="px-3 py-2" onClick={() => setShowAdjust(true)}>Adjust count</Button>}
      />
      <Table columns={columns} rows={batches} />
      {showAdjust && <AdjustCountModal close={() => setShowAdjust(false)} />}
    </div>
  );
}
