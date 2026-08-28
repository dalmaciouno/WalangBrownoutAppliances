import React from "react";
import PageHeader from "../../components/layout/PageHeader.jsx";
import { roles } from "../../data/users.js";
import { categories } from "../../data/products.js";

export default function RolesPermissions() {
  return (
    <div className="content-area">
      <PageHeader title="Roles & Permissions" icon="bi-shield-lock" />
      <div className="row g-3 mb-4">
        {roles.map((r) => (
          <div className="col-6" key={r.id}>
            <div className="card-soft p-3 h-100">
              <div className="d-flex align-items-center gap-2 mb-1">
                <i className={"bi " + r.icon} style={{ color: "var(--accent-dark)" }}></i>
                <div className="fw-bold">{r.label}</div>
              </div>
              <div className="text-muted" style={{ fontSize: ".85rem" }}>{r.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="card-soft p-3">
        <div className="fw-bold mb-3">Item categories</div>
        {categories.map((c, i) => (
          <div key={i} className="d-flex justify-content-between py-2" style={{ borderBottom: "1px solid #EEE3C6" }}>
            <span>{c.name}</span>
            <span className="text-muted">{c.skus} SKUs</span>
          </div>
        ))}
      </div>
    </div>
  );
}
