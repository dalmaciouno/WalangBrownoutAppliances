import React, { useState } from "react";
import PageHeader from "../../components/layout/PageHeader.jsx";
import Table from "../../components/common/Table.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import Button from "../../components/common/Button.jsx";
import { useToast } from "../../context/ToastContext.jsx";

const INITIAL = [
  { id: "#000019", customer: "Northgate Appliances", status: "Packed" },
  { id: "#000017", customer: "ABC Hardware", status: "Shipped" },
  { id: "#000021", customer: "Metro Cooling Supplies", status: "Packed" },
];

export default function Fulfillment() {
  const notify = useToast();
  const [orders, setOrders] = useState(INITIAL);

  const markShipped = (id) => {
    setOrders((os) => os.map((o) => (o.id === id ? { ...o, status: "Shipped" } : o)));
    notify(id + " marked as shipped.", "success");
  };

  const columns = [
    { key: "id", label: "Order #", className: "fw-semibold py-3" },
    { key: "customer", label: "Customer" },
    { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status === "Shipped" ? "ok" : "flagged"} /> },
    {
      key: "action",
      label: "",
      render: (row) =>
        row.status === "Packed" ? (
          <Button className="px-3 py-1" style={{ fontSize: ".78rem" }} onClick={() => markShipped(row.id)}>
            Mark shipped
          </Button>
        ) : (
          <span className="text-muted" style={{ fontSize: ".8rem" }}>—</span>
        ),
    },
  ];

  return (
    <div className="content-area">
      <PageHeader title="Fulfillment" icon="bi-truck" />
      <Table columns={columns} rows={orders} />
    </div>
  );
}
