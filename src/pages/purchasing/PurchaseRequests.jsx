import React, { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader.jsx";
import Table from "../../components/common/Table.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import Button from "../../components/common/Button.jsx";
import Loading from "../../components/common/Loading.jsx";
import { api } from "../../services/api.js";
import { useToast } from "../../context/ToastContext.jsx";

export default function PurchaseRequests() {
  const notify = useToast();
  const [requests, setRequests] = useState(null);

  useEffect(() => {
    api.getPurchaseRequests().then(setRequests);
  }, []);

  if (!requests) return <Loading />;

  const convert = (id) => {
    setRequests((rs) => rs.map((r) => (r.id === id ? { ...r, status: "Converted to PO" } : r)));
    notify(id + " converted to a purchase order.", "success");
  };

  const columns = [
    { key: "id", label: "Request #", className: "fw-semibold py-3" },
    { key: "requestedBy", label: "Requested by" },
    { key: "item", label: "Item" },
    { key: "qty", label: "Qty" },
    { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status === "Converted to PO" ? "ok" : "flagged"} /> },
    {
      key: "action",
      label: "",
      render: (row) =>
        row.status === "Pending review" ? (
          <Button className="px-3 py-1" style={{ fontSize: ".78rem" }} onClick={() => convert(row.id)}>
            Convert to PO
          </Button>
        ) : (
          <span className="text-muted" style={{ fontSize: ".8rem" }}>—</span>
        ),
    },
  ];

  return (
    <div className="content-area">
      <PageHeader title="Purchase Requests" icon="bi-file-earmark-text" />
      <Table columns={columns} rows={requests} emptyMessage="No purchase requests." />
    </div>
  );
}
