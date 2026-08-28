import React, { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader.jsx";
import Table from "../../components/common/Table.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import Loading from "../../components/common/Loading.jsx";
import { api } from "../../services/api.js";
import { formatCurrency } from "../../utils/formatCurrency.js";

export default function WarehouseOrders() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    api.getPurchaseOrders().then(setOrders);
  }, []);

  if (!orders) return <Loading />;

  const columns = [
    { key: "id", label: "PO #", className: "fw-semibold py-3" },
    { key: "supplier", label: "Supplier" },
    { key: "items", label: "Items" },
    { key: "total", label: "Total", render: (row) => formatCurrency(row.total) },
    { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status === "Approved" ? "ok" : "flagged"} /> },
  ];

  return (
    <div className="content-area">
      <PageHeader title="Incoming orders" icon="bi-truck" />
      <Table columns={columns} rows={orders} emptyMessage="No incoming orders." />
    </div>
  );
}
