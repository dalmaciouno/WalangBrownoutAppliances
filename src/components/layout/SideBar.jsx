import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

/**
 * items: [{ to, icon, label }]
 * brand: text shown at the top of the sidebar
 * variant: "sb" | "menu" | "icon" | "brand" — matches the original prototype's sidebar skins
 */
export default function Sidebar({ items, brand = "WalangBrownout", variant = "sb" }) {
  const { user, logout } = useAuth();

  const wrapClass =
    variant === "menu" ? "menu-side" : variant === "icon" ? "icon-side" : variant === "brand" ? "brand-side" : "sb";
  const linkClass = variant === "menu" ? "menu-link" : variant === "icon" ? "icon-link" : "sb-link";

  const nav = (
    <>
      {items.map((it) => (
        <NavLink
          key={it.to}
          to={it.to}
          className={({ isActive }) => linkClass + (isActive ? " active" : "")}
        >
          <i className={"bi " + it.icon}></i>
          <span>{it.label}</span>
        </NavLink>
      ))}
    </>
  );

  return (
    <div className={wrapClass + " d-flex flex-column"}>
      {variant === "brand" ? (
        <>
          <div className="brand-header">{brand}</div>
          <div className="brand-nav">{nav}</div>
        </>
      ) : (
        <div>
          {variant === "menu" ? <div className="menu-title">MENU</div> : <div className="sb-brand">{brand}</div>}
          {nav}
        </div>
      )}
      <div className={"mt-auto" + (variant === "brand" ? " brand-nav pt-0" : "")}>
        <div className="sidebar-footer-user">
          Signed in as <strong>{user && user.name}</strong>
        </div>
        <div className="logout-link" onClick={logout}>
          <i className="bi bi-box-arrow-left"></i>
          <span>Log out</span>
        </div>
      </div>
    </div>
  );
}
