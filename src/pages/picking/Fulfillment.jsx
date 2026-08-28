import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/common/Modal.jsx";
import Button from "../../components/common/Button.jsx";
import { useToast } from "../../context/ToastContext.jsx";

function DamageReportModal({ close, batchLabel }) {
  const notify = useToast();
  const [note, setNote] = useState("");
  const submit = () => {
    notify("Damage reported for " + batchLabel + ".", "success");
    close();
  };
  return (
    <Modal title="Report damaged batch" onClose={close}>
      <div className="form-field mb-3">
        <label>What's wrong with this batch?</label>
        <input className="search-input w-100" value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Water damage on outer packaging" />
      </div>
      <div className="d-flex justify-content-end gap-2">
        <Button variant="outline" className="px-4 py-2" onClick={close}>Cancel</Button>
        <Button className="px-4 py-2" onClick={submit}>Report damage</Button>
      </div>
    </Modal>
  );
}

function FifoOverrideModal({ close }) {
  const notify = useToast();
  const [reason, setReason] = useState("Older batch is damaged");
  const [remarks, setRemarks] = useState("");
  const reasons = ["Older batch is damaged", "Older batch not found", "Older Batch is Expired"];
  const confirm = () => {
    notify("FIFO override confirmed: " + reason + ".", "success");
    close();
  };
  return (
    <div className="modal-backdrop-custom">
      <div className="modal-tan">
        <h5 className="fw-bold text-center mb-3">FIFO Override</h5>
        <div className="fw-semibold mb-2">Select a reason:</div>
        {reasons.map((r) => (
          <div className="radio-row" key={r} onClick={() => setReason(r)} style={{ cursor: "pointer" }}>
            <div className={"radio-dot " + (reason === r ? "selected" : "")}></div>
            <span>{r}</span>
          </div>
        ))}
        <div className="fw-semibold mt-3 mb-2">Additional Remarks:</div>
        <input className="search-input w-100 mb-4" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
        <div className="d-flex justify-content-end gap-2">
          <Button variant="outline" className="px-4 py-2" onClick={close}>Cancel</Button>
          <Button className="px-4 py-2" onClick={confirm}>Confirm</Button>
        </div>
      </div>
    </div>
  );
}

export default function PickList() {
  const navigate = useNavigate();
  const notify = useToast();
  const [showDamage, setShowDamage] = useState(false);
  const [showOverride, setShowOverride] = useState(false);

  const goBack = () => navigate("/picking");

  const submitPick = () => {
    notify("Pick submitted for Item #000025.", "success");
    goBack();
  };

  return (
    <div className="mobile-shell" style={{ position: "relative" }}>
      <div className="mobile-side">
        <button className="back-btn" onClick={goBack}><i className="bi bi-arrow-left"></i></button>
        <h5 className="fw-bold">FIFO PICKING</h5>
      </div>
      <div className="mobile-main">
        <div className="item-header-bar">Item Number: #000025</div>
        <div className="mobile-body">
          <div className="field-label">Customer</div>
          <div className="field-box">ABC Hardware</div>

          <div className="field-label">Item Details</div>
          <div className="field-box" style={{ lineHeight: 1.9 }}>
            Product : Air Purifier Filter<br />
            SKU : APF-001<br />
            Batch : BATCH-001<br />
            Expiry : Oct. 10, 2026<br />
            Qty Req : 20 pcs
          </div>

          <div className="field-label">FIFO Recommendation</div>
          <div className="row g-3 mb-3">
            <div className="col-6">
              <div className="field-box text-center mb-0">Recommended Batch:<br /><strong>BATCH-001</strong></div>
            </div>
            <div className="col-6">
              <div className="field-box text-center mb-0">Quantity to Pick:<br /><strong>20 Items</strong></div>
            </div>
          </div>

          <div className="field-label">Report a Problem</div>
          <div className="row g-3 mb-4">
            <div className="col-6">
              <div className="field-box text-center mb-0" style={{ cursor: "pointer" }} onClick={() => setShowDamage(true)}>Older Batch Damaged</div>
            </div>
            <div className="col-6">
              <div className="field-box text-center mb-0" style={{ cursor: "pointer" }} onClick={() => setShowOverride(true)}>FIFO Override</div>
            </div>
          </div>

          <button className="btn-tan w-100 py-2 fw-bold" onClick={submitPick}>Submit</button>
        </div>
      </div>
      {showDamage && <DamageReportModal close={() => setShowDamage(false)} batchLabel="BATCH-001" />}
      {showOverride && <FifoOverrideModal close={() => setShowOverride(false)} />}
    </div>
  );
}
