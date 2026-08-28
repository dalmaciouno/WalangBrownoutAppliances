import React, { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader.jsx";
import StatCard from "../../components/dashboard/StatCard.jsx";
import { api } from "../../services/api.js";
import Loading from "../../components/common/Loading.jsx";

export default function AdminDashboard() {
  const [users, setUsers] = useState(null);
  const heights = [45, 65, 30, 70, 33, 40];

  useEffect(() => {
    api.getUsers().then(setUsers);
  }, []);

  if (!users) return <Loading />;

  const stats = [
    ["Total users", String(users.length)],
    ["Low Stock\nAlerts", "7"],
    ["Pending\nApprovals", "3"],
    ["Active Today", String(users.filter((u) => u.lastActive.startsWith("Today")).length)],
  ];

  return (
    <div className="content-area">
      <PageHeader title="Dashboard" />
      <div className="row g-3 mb-4">
        {stats.map((s, i) => (
          <div className="col-3" key={i}>
            <StatCard label={s[0]} value={s[1]} />
          </div>
        ))}
      </div>
      <div className="card-soft p-4">
        <div className="fw-bold mb-3">Weekly stock movement</div>
        <div className="bars-wrap">
          {heights.map((h, i) => (
            <div key={i} className="bar" style={{ height: h * 2.4 }}></div>
          ))}
        </div>
      </div>
    </div>
  );
}
