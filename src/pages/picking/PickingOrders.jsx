import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader.jsx";
import Table from "../../components/common/Table.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";

const ORDERS = [
  { id: "#000025", customer: "ABC Hardware", items: 1, qty: 20, status: "Pending" },
  { id: "#000026", customer: "Metro Cooling Supplies", items: 3, qty: 45, status: "Pending" },
  { id: "#000019", customer: "Northgate Appliances", items: 2, qty: 12, status: "Fulfilled" },
];

export default function PickingOrders() {
  const navigate = useNavigate();
  const [orders] = useState(ORDERS);

  const columns = [
    { key: "id", label: "Order #", className: "fw-semibold py-3" },
    { key: "customer", label: "Customer" },
    { key: "items", label: "Line items" },
    { key: "qty", label: "Total qty" },
    { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status === "Fulfilled" ? "ok" : "flagged"} /> },
    {
      key: "action",
      label: "",
      render: (row) =>
        row.status === "Pending" ? (
          <button className="btn-outline-tan px-3 py-1" style={{ fontSize: ".78rem" }} onClick={() => navigate("/picking/list")}>
            Pick
          </button>
        ) : (
          <span className="text-muted" style={{ fontSize: ".8rem" }}>Done</span>
        ),
    },
  ];

  return (
    <div className="content-area">
      <PageHeader title="Picking orders" icon="bi-list-ul" />
      <Table columns={columns} rows={orders} emptyMessage="No orders to pick." />
    </div>
  );
}
