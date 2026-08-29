import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";

const ROLE_LABEL = {
  staff: "Warehouse Staff — FIFO Picking",
  admin: "Admin Panel",
  manager: "Purchasing Manager",
  products: "Inventory Clerk",
};

export default function Header() {
  const { user, role } = useAuth();
  return (
    <div className="text-center mb-3">
      <h5 className="fw-bold mb-1" style={{ fontFamily: "'Poppins',sans-serif" }}>
        WalangBrownout — Inventory System
      </h5>
      <div style={{ color: "#7a6c50", fontSize: ".85rem" }}>
        {user ? `Signed in as ${user.name} · ${ROLE_LABEL[role] || role}` : "Sign in to continue"}
      </div>
    </div>
  );
}
