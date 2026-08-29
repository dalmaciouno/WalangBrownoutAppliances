import React from "react";

export function Pill({ children, tone }) {
  return <span className={"pill " + (tone || "")}>{children}</span>;
}

export default function StatusBadge({ status }) {
  const ok = String(status).toLowerCase() === "active" || String(status).toLowerCase() === "ok";
  return <span className={ok ? "status-ok" : "status-flag"}>{status}</span>;
}
