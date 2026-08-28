import React from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader.jsx";
import { Pill } from "../../components/common/StatusBadge.jsx";

export default function PickingDashboard() {
  const navigate = useNavigate();

  return (
    <div className="content-area">
      <PageHeader title="Picking" icon="bi-box-seam" />
      <div className="row g-3 mb-3">
        <div className="col-6">
          <div className="card-soft p-3">
            <div className="fw-semibold">Orders to pick</div>
            <div className="fs-3 fw-bold my-1">4</div>
            <Pill>pending</Pill>
          </div>
        </div>
        <div className="col-6">
          <div className="card-soft p-3">
            <div className="fw-semibold">Fulfilled today</div>
            <div className="fs-3 fw-bold my-1">11</div>
            <Pill tone="green">complete</Pill>
          </div>
        </div>
      </div>
      <button className="btn-tan w-100 py-3 fw-bold" style={{ fontSize: "1.05rem" }} onClick={() => navigate("/picking/list")}>
        Start FIFO picking
      </button>
    </div>
  );
}
