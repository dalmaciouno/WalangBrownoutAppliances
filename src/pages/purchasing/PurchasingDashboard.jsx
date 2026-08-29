import React, { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader.jsx";
import Loading from "../../components/common/Loading.jsx";
import { api } from "../../services/api.js";
import { formatCurrency } from "../../utils/formatCurrency.js";

const BARS = [
  { m: "Feb", h: 60, color: "#7FA06B" },
  { m: "Mar", h: 55, color: "#7FA06B" },
  { m: "Apr", h: 72, color: "#C98A6B" },
  { m: "May", h: 48, color: "#7FA06B" },
  { m: "Jun", h: 80, color: "#C98A6B" },
  { m: "Jul", h: 66, color: "#7FA06B" },
];

export default function PurchasingDashboard() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    api.getPurchaseOrders().then(setOrders);
  }, []);

  if (!orders) return <Loading />;

  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const totalValue = orders.reduce((s, o) => s + o.total, 0);

  return (
    <div className="content-area">
      <PageHeader title="Dashboard" />
      <div className="row g-3 mb-4">
        <div className="col-4">
          <div className="kpi-pill-card">
            <div className="kpi-label">Open POs</div>
            <div className="kpi-value">{orders.length}</div>
          </div>
        </div>
        <div className="col-4">
          <div className="kpi-pill-card">
            <div className="kpi-label">Pending approval</div>
            <div className="kpi-value">{pendingCount}</div>
          </div>
        </div>
        <div className="col-4">
          <div className="kpi-pill-card">
            <div className="kpi-label">Total committed</div>
            <div className="kpi-value" style={{ fontSize: "1.4rem" }}>{formatCurrency(totalValue)}</div>
          </div>
        </div>
      </div>
      <div className="card-soft p-4">
        <div className="fw-bold mb-3">Monthly spend</div>
        <div className="mini-bars">
          {BARS.map((b, i) => (
            <div className="mini-bar-col" key={i}>
              <div className="mini-bar" style={{ height: b.h, background: b.color }}></div>
              <div className="text-muted" style={{ fontSize: ".72rem", marginTop: 6 }}>{b.m}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
