import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const load = async () => {
      try {
        const res = await api.get("/orders");
        const data = Array.isArray(res.data) ? res.data : [];

        // ✅ Deduplicate by Mongo _id (defensive in case the API returns duplicates)
        const byId = new Map();
        for (const o of data) {
          if (!byId.has(o._id)) byId.set(o._id, o);
        }

        // (Optional) ensure newest first even if backend forgets to sort
        const uniqueSorted = [...byId.values()].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setOrders(uniqueSorted);
      } catch (err) {
        alert(err?.response?.data?.message || "Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [navigate]);

  const noOrders = !loading && orders.length === 0;

  return (
    <div
      className="py-5"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.95)), url('https://images.unsplash.com/photo-1606788075761-676fa0c55288?auto=format&fit=crop&w=1400&q=80')",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <div className="container">

        {/* 🔙 Back actions */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button
            className="btn btn-outline-secondary"
            onClick={() => {
              // try to go back; if there's no history entry, go home
              if (window.history.length > 1) navigate(-1);
              else navigate("/");
            }}
          >
            ← Back
          </button>

          <button
            className="btn btn-outline-danger"
            onClick={() => navigate("/")}
          >
            🏠 Home
          </button>
        </div>

        <h2 className="text-danger fw-bold text-center mb-4">📦 My Orders</h2>

        {loading ? (
          <p className="text-center text-muted">Loading your orders…</p>
        ) : noOrders ? (
          <div className="text-center mt-5">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty Orders"
              style={{ width: "150px", marginBottom: "20px", opacity: 0.8 }}
            />
            <h5 className="text-muted mb-3">No orders yet.</h5>
            <button
              className="btn btn-danger px-4"
              onClick={() => navigate("/restaurants")}
            >
              🍴 Go to Restaurants
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {orders.map((order) => (
              <div key={order._id} className="col-md-4">
                <div className="card shadow-sm rounded-4 h-100">
                  <div className="card-body">
                    <h6 className="fw-bold text-danger mb-2">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </h6>
                    <p className="text-muted small mb-2">
                      Placed: {new Date(order.createdAt).toLocaleString()}
                    </p>
                    <ul className="list-group mb-3">
                      {order.items.map((it, idx) => (
                        <li
                          key={idx}
                          className="list-group-item d-flex justify-content-between"
                        >
                          <span>
                            {(it.name || it?.foodItem?.name || "Item")} × {it.quantity}
                          </span>
                          <span>
                            {typeof it.price === "number"
                              ? `₹${(it.price * it.quantity).toFixed(2)}`
                              : ""}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="d-flex justify-content-between">
                      <span className="fw-semibold">Status: {order.status}</span>
                      <span className="fw-bold text-success">
                        Total: ₹{Number(order.total).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
