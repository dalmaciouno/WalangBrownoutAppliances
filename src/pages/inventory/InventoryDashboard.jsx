import React, { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader.jsx";
import StatCard from "../../components/dashboard/StatCard.jsx";
import Loading from "../../components/common/Loading.jsx";
import { api } from "../../services/api.js";
import { formatCurrency } from "../../utils/formatCurrency.js";
import { LOW_STOCK_THRESHOLD } from "../../data/products.js";

export default function InventoryDashboard() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    api.getProducts().then(setProducts);
  }, []);

  if (!products) return <Loading />;

  const lowStockCount = products.filter((p) => p.qty < LOW_STOCK_THRESHOLD).length;
  const totalValue = products.reduce((s, p) => s + p.qty * p.price, 0);

  return (
    <div className="content-area">
      <PageHeader title="Dashboard" />
      <div className="row g-3">
        <div className="col-4">
          <StatCard label="Total products" value={products.length} />
        </div>
        <div className="col-4">
          <StatCard label="Low stock" value={lowStockCount} />
        </div>
        <div className="col-4">
          <StatCard label="Total value" value={formatCurrency(totalValue)} fontSize="1.3rem" />
        </div>
      </div>
    </div>
  );
}
