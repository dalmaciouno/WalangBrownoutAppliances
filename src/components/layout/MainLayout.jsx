import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Header from "./Header.jsx";
import Sidebar from "./SideBar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { canAccess } from "../../utils/permissions.js";

export default function MainLayout({ navItems, sidebarVariant, brand, requiredRolePrefix }) {
  const { user, role } = useAuth();
  const location = window.location;

  if (!user) return <Navigate to="/login" replace />;
  if (requiredRolePrefix && !canAccess(role, requiredRolePrefix)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header />
      <div className="device-frame d-flex">
        <Sidebar items={navItems} variant={sidebarVariant} brand={brand} />
        <div className="d-flex flex-column flex-fill" style={{ position: "relative" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
