import React, { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader.jsx";
import SearchBar from "../../components/common/SearchBar.jsx";
import Loading from "../../components/common/Loading.jsx";
import { api } from "../../services/api.js";
import { formatCurrency } from "../../utils/formatCurrency.js";
import { LOW_STOCK_THRESHOLD } from "../../data/products.js";
import { useToast } from "../../context/ToastContext.jsx";

const FILTERS = ["Active", "Category", "Quantity", "Price"];

export default function Products() {
  const notify = useToast();
  const [products, setProducts] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Active");

  useEffect(() => {
    api.getProducts().then(setProducts);
  }, []);

  if (!products) return <Loading />;

  const restock = (name) => {
    setProducts((ps) => ps.map((p) => (p.name === name ? { ...p, qty: p.qty + 20 } : p)));
    notify(name + " restocked with 20 units.", "success");
  };

  const q = search.trim().toLowerCase();
  let visible = products.filter((p) => !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  if (filter === "Category") visible = visible.slice().sort((a, b) => a.category.localeCompare(b.category));
  else if (filter === "Quantity") visible = visible.slice().sort((a, b) => a.qty - b.qty);
  else if (filter === "Price") visible = visible.slice().sort((a, b) => b.price - a.price);

  return (
    <div className="content-area">
      <PageHeader title="Products List" />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search products" style={{ width: 260 }} />
        <div className="d-flex gap-2">
          {FILTERS.map((f) => (
            <button key={f} className={"filter-chip " + (filter === f ? "active" : "")} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <table className="table mb-0">
        <thead>
          <tr style={{ borderBottom: "2px solid var(--border-tan)" }}>
            <th className="pb-2" style={{ color: "var(--accent-dark)" }}>Product Name</th>
            <th className="pb-2" style={{ color: "var(--accent-dark)" }}>Category</th>
            <th className="pb-2" style={{ color: "var(--accent-dark)" }}>Quantity</th>
            <th className="pb-2" style={{ color: "var(--accent-dark)" }}>Price</th>
            <th className="pb-2"></th>
          </tr>
        </thead>
        <tbody>
          {visible.map((p) => (
            <tr key={p.id} style={{ borderBottom: "1px solid #EAE0C4" }}>
              <td className="py-3">{p.name}</td>
              <td className="text-muted">{p.category}</td>
              <td className={p.qty < LOW_STOCK_THRESHOLD ? "status-flag" : "text-muted"}>
                {p.qty}{p.qty < LOW_STOCK_THRESHOLD ? " (low)" : ""}
              </td>
              <td className="text-muted">{formatCurrency(p.price)}</td>
              <td>
                {p.qty < LOW_STOCK_THRESHOLD && (
                  <button className="btn-outline-tan px-2 py-1" style={{ fontSize: ".78rem" }} onClick={() => restock(p.name)}>
                    Restock
                  </button>
                )}
              </td>
            </tr>
          ))}
          {visible.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-muted py-4">No products match your search.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
