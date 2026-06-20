import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API_BASE = "/api";

const resources = {
  users: {
    label: "Users",
    title: "User management",
    description: "Create, update, inspect, and delete user records.",
    endpoint: "users",
    accent: "var(--accent-user)",
    fields: [
      { name: "name", label: "Name", type: "text", placeholder: "Asha Patel" },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "asha@example.com",
      },
      {
        name: "phone",
        label: "Phone Number",
        type: "tel",
        placeholder: "+91 98765 43210",
      },
      {
        name: "address",
        label: "Address",
        type: "text",
        placeholder: "Hyderabad, Telangana",
      },
    ],
  },
  products: {
    label: "Products",
    title: "Product catalog",
    description: "Maintain the item list that powers your storefront.",
    endpoint: "products",
    accent: "var(--accent-product)",
    fields: [
      {
        name: "name",
        label: "Name",
        type: "text",
        placeholder: "Wireless Headphones",
      },
      { name: "price", label: "Price", type: "number", placeholder: "4999" },
      {
        name: "category",
        label: "Category",
        type: "text",
        placeholder: "Audio",
      },
    ],
  },
  orders: {
    label: "Orders",
    title: "Order tracker",
    description: "Record order status and connect users to products.",
    endpoint: "orders",
    accent: "var(--accent-order)",
    fields: [
      {
        name: "userId",
        label: "User ID",
        type: "text",
        placeholder: "MongoDB ObjectId",
      },
      {
        name: "productId",
        label: "Product ID",
        type: "text",
        placeholder: "MongoDB ObjectId",
      },
      { name: "quantity", label: "Quantity", type: "number", placeholder: "1" },
      { name: "status", label: "Status", type: "text", placeholder: "Pending" },
    ],
  },
};

const createEmptyForm = (resourceKey) => {
  return resources[resourceKey].fields.reduce((form, field) => {
    form[field.name] = "";
    return form;
  }, {});
};

const normalizeValue = (field, value) => {
  if (field.type === "number") {
    return value === "" ? "" : Number(value);
  }

  return value.trim();
};

const extractFormValues = (fields, source) => {
  return fields.reduce((form, field) => {
    form[field.name] = source?.[field.name] ?? "";
    return form;
  }, {});
};

function App() {
  const [resourceKey, setResourceKey] = useState("users");
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState(createEmptyForm("users"));
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const resource = useMemo(() => resources[resourceKey], [resourceKey]);

  const loadRecords = async (activeResource = resource) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/${activeResource.endpoint}`);

      if (!response.ok) {
        throw new Error(`Failed to load ${activeResource.label.toLowerCase()}`);
      }

      const data = await response.json();
      const items = Array.isArray(data) ? data : (data?.data ?? []);
      setRecords(items);
    } catch (fetchError) {
      setError(fetchError.message);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFormData(createEmptyForm(resourceKey));
    setEditingId(null);
    setMessage("");
    loadRecords(resources[resourceKey]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceKey]);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const payload = resource.fields.reduce((result, field) => {
        result[field.name] = normalizeValue(field, formData[field.name] ?? "");
        return result;
      }, {});

      const response = await fetch(
        `${API_BASE}/${resource.endpoint}${editingId ? `/${editingId}` : ""}`,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(
          body.message || `Failed to ${editingId ? "update" : "create"} record`,
        );
      }

      setMessage(
        editingId
          ? `${resource.label.slice(0, -1)} updated successfully.`
          : `${resource.label.slice(0, -1)} created successfully.`,
      );
      setFormData(createEmptyForm(resourceKey));
      setEditingId(null);
      await loadRecords(resource);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (record) => {
    setEditingId(record._id);
    setFormData(extractFormValues(resource.fields, record));
    setMessage("Editing selected record.");
    setError("");
  };

  const handleDelete = async (record) => {
    const confirmed = window.confirm(
      `Delete this ${resource.label.slice(0, -1).toLowerCase()}?`,
    );

    if (!confirmed) {
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE}/${resource.endpoint}/${record._id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.message || "Failed to delete record");
      }

      if (editingId === record._id) {
        setEditingId(null);
        setFormData(createEmptyForm(resourceKey));
      }

      setMessage(`${resource.label.slice(0, -1)} deleted successfully.`);
      await loadRecords(resource);
    } catch (deleteError) {
      setError(deleteError.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">API</span>
          <div>
            <p className="eyebrow">React CRUD console</p>
            <h1>Store backend</h1>
          </div>
        </div>

        <p className="sidebar-copy">
          Manage users, products, and orders from one dashboard connected to
          <span> /api</span>.
        </p>

        <nav className="resource-switcher" aria-label="Resource switcher">
          {Object.entries(resources).map(([key, item]) => (
            <button
              key={key}
              type="button"
              className={
                key === resourceKey ? "resource-tab active" : "resource-tab"
              }
              onClick={() => setResourceKey(key)}
              style={
                key === resourceKey
                  ? { "--tab-accent": item.accent }
                  : undefined
              }
            >
              <span>{item.label}</span>
              <small>{item.title}</small>
            </button>
          ))}
        </nav>

        <div className="api-card">
          <p className="eyebrow">API base</p>
          <code>/api/{resource.endpoint}</code>
          <p>Vite proxies requests to the backend on port 3000.</p>
        </div>
      </aside>

      <main className="main-panel">
        <header
          className="hero-panel"
          style={{ "--hero-accent": resource.accent }}
        >
          <div>
            <p className="eyebrow">Live CRUD workspace</p>
            <h2>{resource.title}</h2>
            <p className="hero-copy">{resource.description}</p>
          </div>

          <div className="hero-stats">
            <div>
              <strong>{records.length}</strong>
              <span>Records</span>
            </div>
            <div>
              <strong>{editingId ? "Editing" : "Ready"}</strong>
              <span>Status</span>
            </div>
          </div>
        </header>

        <section className="content-grid">
          <form className="form-card" onSubmit={handleSubmit}>
            <div className="form-head">
              <div>
                <p className="eyebrow">
                  {editingId ? "Update record" : "Create record"}
                </p>
                <h3>{resource.label.slice(0, -1)}</h3>
              </div>
              {editingId ? (
                <button
                  type="button"
                  className="ghost-button"
                  onClick={() => {
                    setEditingId(null);
                    setFormData(createEmptyForm(resourceKey));
                    setMessage("Edit cancelled.");
                  }}
                >
                  Cancel
                </button>
              ) : null}
            </div>

            <div className="field-grid">
              {resource.fields.map((field) => (
                <label key={field.name} className="field">
                  <span>{field.label}</span>
                  <input
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleFieldChange}
                    min={field.type === "number" ? "0" : undefined}
                    step={field.type === "number" ? "1" : undefined}
                    required
                  />
                </label>
              ))}
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="primary-button"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update record"
                    : "Create record"}
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  setFormData(createEmptyForm(resourceKey));
                  setEditingId(null);
                  setMessage("Form cleared.");
                }}
              >
                Reset
              </button>
            </div>

            {message ? <p className="notice success">{message}</p> : null}
            {error ? <p className="notice error">{error}</p> : null}
          </form>

          <section className="table-card">
            <div className="table-head">
              <div>
                <p className="eyebrow">Collection data</p>
                <h3>{resource.label}</h3>
              </div>
              <button
                type="button"
                className="ghost-button"
                onClick={() => loadRecords(resource)}
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="empty-state">
                Loading {resource.label.toLowerCase()}...
              </div>
            ) : records.length === 0 ? (
              <div className="empty-state">
                No {resource.label.toLowerCase()} found yet.
              </div>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      {resource.fields.map((field) => (
                        <th key={field.name}>{field.label}</th>
                      ))}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record) => (
                      <tr key={record._id}>
                        <td>
                          <span className="mono-pill">{record._id}</span>
                        </td>
                        {resource.fields.map((field) => (
                          <td key={field.name}>{record[field.name] ?? "-"}</td>
                        ))}
                        <td>
                          <div className="row-actions">
                            <button
                              type="button"
                              className="link-button"
                              onClick={() => handleEdit(record)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="link-button danger"
                              onClick={() => handleDelete(record)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </section>
      </main>
    </div>
  );
}

export default App;
