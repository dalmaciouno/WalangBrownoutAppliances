import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout.jsx";
import Login from "../pages/auth/Login.jsx";

import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import Users from "../pages/admin/Users.jsx";
import RolesPermissions from "../pages/admin/RolesPermissions.jsx";
import AuditLogs from "../pages/admin/AuditLogs.jsx";
import Settings from "../pages/admin/Settings.jsx";

import InventoryDashboard from "../pages/inventory/InventoryDashboard.jsx";
import Products from "../pages/inventory/Products.jsx";
import StockAdjustments from "../pages/inventory/StockAdjustments.jsx";
import StockMovements from "../pages/inventory/StockMovements.jsx";
import InventoryReports from "../pages/inventory/InventoryReports.jsx";

import WarehouseDashboard from "../pages/warehouse/WarehouseDashboard.jsx";
import Receiving from "../pages/warehouse/Receiving.jsx";
import StockMovement from "../pages/warehouse/StockMovement.jsx";
import WarehouseOrders from "../pages/warehouse/WarehouseOrders.jsx";

import PickingDashboard from "../pages/picking/PickingDashboard.jsx";
import PickingOrders from "../pages/picking/PickingOrders.jsx";
import PickList from "../pages/picking/PickList.jsx";
import Fulfillment from "../pages/picking/Fulfillment.jsx";

import PurchasingDashboard from "../pages/purchasing/PurchasingDashboard.jsx";
import PurchaseOrders from "../pages/purchasing/PurchaseOrders.jsx";
import Suppliers from "../pages/purchasing/Suppliers.jsx";
import PurchaseRequests from "../pages/purchasing/PurchaseRequests.jsx";

const ADMIN_NAV = [
  { to: "/admin", icon: "bi-grid", label: "Dashboard" },
  { to: "/admin/users", icon: "bi-person", label: "User Management" },
  { to: "/admin/roles", icon: "bi-shield-lock", label: "Roles & Permissions" },
  { to: "/admin/audit-logs", icon: "bi-clock-history", label: "Audit Logs" },
  { to: "/admin/settings", icon: "bi-gear", label: "Settings" },
];

const INVENTORY_NAV = [
  { to: "/inventory", icon: "bi-terminal", label: "Dashboard" },
  { to: "/inventory/products", icon: "bi-cart", label: "Products" },
  { to: "/inventory/adjustments", icon: "bi-box-seam", label: "Stock Adjustments" },
  { to: "/inventory/movements", icon: "bi-clock-history", label: "Stock Movements" },
  { to: "/inventory/reports", icon: "bi-graph-up", label: "Reports" },
];

const WAREHOUSE_NAV = [
  { to: "/warehouse", icon: "bi-grid", label: "Dashboard" },
  { to: "/warehouse/receiving", icon: "bi-box-arrow-in-down", label: "Receiving" },
  { to: "/warehouse/movements", icon: "bi-arrow-left-right", label: "Stock Movement" },
  { to: "/warehouse/orders", icon: "bi-truck", label: "Orders" },
  { to: "/picking", icon: "bi-clipboard-check", label: "Picking" },
];

const PICKING_NAV = [
  { to: "/picking", icon: "bi-grid", label: "Dashboard" },
  { to: "/picking/orders", icon: "bi-list-ul", label: "Picking Orders" },
  { to: "/picking/list", icon: "bi-box-seam", label: "Pick List" },
  { to: "/picking/fulfillment", icon: "bi-truck", label: "Fulfillment" },
];

const PURCHASING_NAV = [
  { to: "/purchasing", icon: "bi-terminal", label: "Dashboard" },
  { to: "/purchasing/orders", icon: "bi-cart", label: "Purchase Orders" },
  { to: "/purchasing/suppliers", icon: "bi-truck", label: "Suppliers" },
  { to: "/purchasing/requests", icon: "bi-file-earmark-text", label: "Purchase Requests" },
];

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route element={<MainLayout navItems={ADMIN_NAV} sidebarVariant="menu" requiredRolePrefix="/admin" />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/roles" element={<RolesPermissions />} />
        <Route path="/admin/audit-logs" element={<AuditLogs />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Route>

      <Route element={<MainLayout navItems={INVENTORY_NAV} sidebarVariant="icon" requiredRolePrefix="/inventory" />}>
        <Route path="/inventory" element={<InventoryDashboard />} />
        <Route path="/inventory/products" element={<Products />} />
        <Route path="/inventory/adjustments" element={<StockAdjustments />} />
        <Route path="/inventory/movements" element={<StockMovements />} />
        <Route path="/inventory/reports" element={<InventoryReports />} />
      </Route>

      <Route element={<MainLayout navItems={WAREHOUSE_NAV} sidebarVariant="sb" requiredRolePrefix="/warehouse" />}>
        <Route path="/warehouse" element={<WarehouseDashboard />} />
        <Route path="/warehouse/receiving" element={<Receiving />} />
        <Route path="/warehouse/movements" element={<StockMovement />} />
        <Route path="/warehouse/orders" element={<WarehouseOrders />} />
      </Route>

      <Route element={<MainLayout navItems={PICKING_NAV} sidebarVariant="sb" requiredRolePrefix="/picking" />}>
        <Route path="/picking" element={<PickingDashboard />} />
        <Route path="/picking/orders" element={<PickingOrders />} />
        <Route path="/picking/fulfillment" element={<Fulfillment />} />
      </Route>
      {/* Pick List uses its own full mobile-shell layout, no sidebar chrome */}
      <Route path="/picking/list" element={<PickList />} />

      <Route element={<MainLayout navItems={PURCHASING_NAV} sidebarVariant="brand" requiredRolePrefix="/purchasing" />}>
        <Route path="/purchasing" element={<PurchasingDashboard />} />
        <Route path="/purchasing/orders" element={<PurchaseOrders />} />
        <Route path="/purchasing/suppliers" element={<Suppliers />} />
        <Route path="/purchasing/requests" element={<PurchaseRequests />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
