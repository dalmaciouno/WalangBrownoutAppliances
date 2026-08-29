import React, { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader.jsx";
import SearchBar from "../../components/common/SearchBar.jsx";
import Table from "../../components/common/Table.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import Modal from "../../components/common/Modal.jsx";
import Button from "../../components/common/Button.jsx";
import Loading from "../../components/common/Loading.jsx";
import { api } from "../../services/api.js";
import { roleOptions } from "../../data/users.js";
import { useToast } from "../../context/ToastContext.jsx";

function AddUserModal({ close, onAdd }) {
  const [form, setForm] = useState({ name: "", role: roleOptions[0], email: "" });
  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    onAdd(form);
    close();
  };
  return (
    <Modal title="Add user" onClose={close}>
      <form onSubmit={submit}>
        <div className="form-field mb-2">
          <label>Name</label>
          <input className="search-input w-100" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Full name" />
        </div>
        <div className="form-field mb-2">
          <label>Email</label>
          <input type="email" className="search-input w-100" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="name@company.com" />
        </div>
        <div className="form-field mb-3">
          <label>Role</label>
          <select className="search-input w-100" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}>
            {roleOptions.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
        <div className="d-flex justify-content-end gap-2">
          <Button type="button" variant="outline" className="px-4 py-2" onClick={close}>Cancel</Button>
          <Button type="submit" className="px-4 py-2">Add user</Button>
        </div>
      </form>
    </Modal>
  );
}

export default function Users() {
  const notify = useToast();
  const [users, setUsers] = useState(null);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    api.getUsers().then(setUsers);
  }, []);

  if (!users) return <Loading />;

  const q = search.trim().toLowerCase();
  const visible = users.filter((u) => !q || u.name.toLowerCase().includes(q) || u.role.toLowerCase().includes(q));

  const addUser = (form) => {
    setUsers((u) => u.concat([{ name: form.name, role: form.role, lastActive: "Just now", status: "Active" }]));
    notify(form.name + " added as " + form.role + ".", "success");
  };

  const columns = [
    { key: "name", label: "Name", className: "fw-semibold py-3" },
    { key: "role", label: "Role" },
    { key: "lastActive", label: "Last Active", className: "text-muted" },
    { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="content-area">
      <PageHeader
        title="User Management"
        icon="bi-person"
        action={
          <Button className="px-3 py-2" onClick={() => setShowAdd(true)}>
            <i className="bi bi-person-plus me-1"></i>Add user
          </Button>
        }
      />
      <SearchBar value={search} onChange={setSearch} placeholder="Search users..." className="w-100 mb-3" />
      <Table columns={columns} rows={visible} emptyMessage="No users match your search." />
      {showAdd && <AddUserModal close={() => setShowAdd(false)} onAdd={addUser} />}
    </div>
  );
}
