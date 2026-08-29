import React, { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader.jsx";
import Table from "../../components/common/Table.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import Modal from "../../components/common/Modal.jsx";
import Button from "../../components/common/Button.jsx";
import Loading from "../../components/common/Loading.jsx";
import { api } from "../../services/api.js";
import { formatCurrency } from "../../utils/formatCurrency.js";
import { useToast } from "../../context/ToastContext.jsx";

function NewPOModal({ close, onAdd }) {
  const [form, setForm] = useState({ supplier: "", items: "", total: "" });
  const submit = (e) => {
    e.preventDefault();
    if (!form.supplier.trim() || !form.items || !form.total) return;
    onAdd(form);
    close();
  };
  return (
    <Modal title="New purchase order" onClose={close}>
      <form onSubmit={submit}>
        <div className="form-field mb-2">
          <label>Supplier</label>
          <input className="search-input w-100" value={form.supplier} onChange={(e) => setForm((f) => ({ ...f, supplier: e.target.value }))} placeholder="e.g. CoolAir Distribution" />
        </div>
        <div className="row g-2 mb-3">
          <div className="col-6 form-field">
            <label>Line items</label>
            <input type="number" min="1" className="search-input w-100" value={form.items} onChange={(e) => setForm((f) => ({ ...f, items: e.target.value }))} placeholder="0" />
          </div>
          <div className="col-6 form-field">
            <label>Estimated total (₱)</label>
            <input type="number" min="0" className="search-input w-100" value={form.total} onChange={(e) => setForm((f) => ({ ...f, total: e.target.value }))} placeholder="0" />
          </div>
        </div>
        <div className="d-flex justify-content-end gap-2">
          <Button type="button" variant="outline" className="px-4 py-2" onClick={close}>Cancel</Button>
          <Button type="submit" className="px-4 py-2">Create PO</Button>
        </div>
      </form>
    </Modal>
  );
}

export default function PurchaseOrders() {
  const notify = useToast();
  const [orders, setOrders] = useState(null);
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    api.getPurchaseOrders().then(setOrders);
  }, []);

  if (!orders) return <Loading />;

  const addPO = (form) => {
    const id = "PO-" + (1040 + orders.length + 1);
    setOrders((os) => os.concat([{ id, supplier: form.supplier, items: Number(form.items), total: Number(form.total), status: "Pending" }]));
    notify(id + " created for " + form.supplier + ".", "success");
  };

  const columns = [
    { key: "id", label: "PO #", className: "fw-semibold py-3" },
    { key: "supplier", label: "Supplier" },
    { key: "items", label: "Items" },
    { key: "total", label: "Total", render: (row) => formatCurrency(row.total) },
    { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status === "Approved" ? "ok" : "flagged"} /> },
  ];

  return (
    <div className="content-area">
      <PageHeader
        title="Purchase Orders"
        icon="bi-cart"
        action={<Button className="px-3 py-2" onClick={() => setShowNew(true)}><i className="bi bi-plus-lg me-1"></i>New PO</Button>}
      />
      <Table columns={columns} rows={orders} emptyMessage="No purchase orders yet." />
      {showNew && <NewPOModal close={() => setShowNew(false)} onAdd={addPO} />}
    </div>
  );
}
