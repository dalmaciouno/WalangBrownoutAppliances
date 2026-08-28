import React, { useState } from "react";
import PageHeader from "../../components/layout/PageHeader.jsx";
import Button from "../../components/common/Button.jsx";
import { useToast } from "../../context/ToastContext.jsx";

const ROWS = [
  ["lowStockAlerts", "Low stock alerts", "Notify when items fall below reorder point"],
  ["expiryAlerts", "Expiry alerts", "Notify about batches nearing expiry"],
  ["smsNotifications", "SMS notifications", "Send urgent alerts via SMS"],
  ["autoGeneratePO", "Auto-generate purchase orders", "Create draft POs automatically at reorder point"],
];

export default function Settings() {
  const notify = useToast();
  const [settings, setSettings] = useState({
    lowStockAlerts: true,
    expiryAlerts: true,
    smsNotifications: false,
    autoGeneratePO: false,
  });
  const toggle = (k) => setSettings((s) => ({ ...s, [k]: !s[k] }));

  return (
    <div className="content-area">
      <PageHeader title="Settings" icon="bi-gear" />
      <div className="card-soft p-4 mb-3">
        {ROWS.map((row) => (
          <div className="toggle-row" key={row[0]}>
            <div>
              <div className="fw-semibold">{row[1]}</div>
              <div className="text-muted" style={{ fontSize: ".82rem" }}>{row[2]}</div>
            </div>
            <div className="form-check form-switch m-0">
              <input
                className="form-check-input"
                type="checkbox"
                checked={settings[row[0]]}
                onChange={() => toggle(row[0])}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        ))}
      </div>
      <Button className="px-4 py-2" onClick={() => notify("Settings saved.", "success")}>
        Save settings
      </Button>
    </div>
  );
}
