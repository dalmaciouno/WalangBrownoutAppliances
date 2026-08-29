import React, { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader.jsx";
import Loading from "../../components/common/Loading.jsx";
import { api } from "../../services/api.js";
import { downloadCSV } from "../../utils/formatCurrency.js";
import { useToast } from "../../context/ToastContext.jsx";

export default function InventoryReports() {
  const notify = useToast();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    api.getProducts().then(setProducts);
  }, []);

  if (!products) return <Loading />;

  const reportTypes = [
    ["bar-chart", "Stock levels"],
    ["graph-up-arrow", "Sales summary"],
    ["bag", "Purchasing history"],
  ];

  return (
    <div className="content-area">
      <PageHeader title="Reports" />
      <div className="row g-3">
        {reportTypes.map((r, i) => (
          <div className="col-4" key={i}>
            <div className="report-card">
              <div className="icon-badge"><i className={"bi bi-" + r[0]}></i></div>
              <div className="fw-bold mb-2">{r[1]}</div>
              <button
                className="btn-outline-tan px-3 py-1"
                style={{ fontSize: ".8rem" }}
                onClick={() => {
                  downloadCSV(
                    r[1].toLowerCase().replace(/\s+/g, "-") + ".csv",
                    [["Product", "Quantity", "Price"]].concat(products.map((p) => [p.name, p.qty, p.price]))
                  );
                  notify(r[1] + " downloaded.", "success");
                }}
              >
                Download CSV
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
