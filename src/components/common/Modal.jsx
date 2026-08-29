import React from "react";

export default function Modal({ title, onClose, children, width }) {
  return (
    <div className="modal-backdrop-custom" onClick={onClose}>
      <div className="modal-tan" style={width ? { width } : undefined} onClick={(e) => e.stopPropagation()}>
        <h5 className="fw-bold text-center mb-3">{title}</h5>
        {children}
      </div>
    </div>
  );
}
