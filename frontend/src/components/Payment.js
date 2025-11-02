// src/components/Payment.js
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation() || {};

  // Try state first, then sessionStorage checkoutDraft (survives refresh)
  const draftFromState = state || null;
  const draftFromSession = (() => {
    try {
      return JSON.parse(sessionStorage.getItem("checkoutDraft") || "null");
    } catch {
      return null;
    }
  })();

  const draft = draftFromState || draftFromSession || null;

  const user = useMemo(() => {
    return (
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(localStorage.getItem("currentUser"))
    );
  }, []);

  const [cartItems, setCartItems] = useState(draft?.cart || []);
  const [paymentMethod, setPaymentMethod] = useState(draft?.method || "");
  const [address, setAddress] = useState(draft?.address || "");
  const [notes] = useState(draft?.notes || "");

  const [timeLeft, setTimeLeft] = useState(0);
  const [orderStarted, setOrderStarted] = useState(false);
  const [halfTimeWarning, setHalfTimeWarning] = useState(false);

  const timerRef = useRef(null);
  const keyRef = useRef(null);        // idempotency key
  const isPlacingRef = useRef(false); // guard against double POST

  const navigateHome = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setOrderStarted(false);
    sessionStorage.removeItem("checkoutDraft"); // cleanup
    setTimeout(() => navigate("/", { replace: true }), 0);
  }, [navigate]);

  // derive totals
  const subtotal = draft?.total != null ? Number(draft.total) : cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const gst = subtotal * 0.05;
  const delivery = subtotal > 0 ? 40 : 0;
  const finalTotal = subtotal + gst + delivery;

  const newClientKey = () => {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID();
    return `key_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  };

  const startOrderCountdown = (seconds) => {
    keyRef.current = newClientKey();
    isPlacingRef.current = false;

    setTimeLeft(seconds);
    setOrderStarted(true);
    setHalfTimeWarning(false);
    if (timerRef.current) clearInterval(timerRef.current);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          timerRef.current = null;
          handleCompleteOrder();
          return 0;
        }
        if (prev === Math.floor(seconds / 2)) setHalfTimeWarning(true);
        return prev - 1;
      });
    }, 1000);

    timerRef.current = interval;
  };

  useEffect(() => {
    if (!user) {
      alert("Please login to continue with payment.");
      navigate("/login", { replace: true });
      return;
    }

    // If still missing critical details, rebuild from localStorage cart or send back
    if (!draft || !draft.cart?.length || !draft.method || !draft.address?.trim()) {
      const cartLS = JSON.parse(localStorage.getItem("cart") || "[]");
      if (cartLS.length) {
        // fallback: let user confirm details here instead of blocking
        setCartItems(cartLS);
        setPaymentMethod("COD");
        setAddress("");
      } else {
        alert("Missing order details. Redirecting to your cart.");
        navigate("/cart", { replace: true });
        return;
      }
    }

    // Always start a fixed 1-minute timer
    startOrderCountdown(60);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  const handleCompleteOrder = async () => {
    if (isPlacingRef.current) return;
    isPlacingRef.current = true;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login again.");
      navigate("/login", { replace: true });
      return;
    }

    try {
      const payload = {
        items: cartItems.map((i) => ({ name: i.name, price: i.price, quantity: i.qty })),
        total: Number(finalTotal.toFixed(2)),
        clientKey: keyRef.current,
        meta: { paymentMethod, address, notes },
      };

      await api.post("/orders", payload, { headers: { "Idempotency-Key": keyRef.current } });

      localStorage.removeItem("cart");
      sessionStorage.removeItem("checkoutDraft");
      alert("✅ Your order has been placed!");
      navigateHome();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to place order.");
      navigateHome();
    }
  };

  const handleCancelOrder = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    localStorage.removeItem("cart");
    sessionStorage.removeItem("checkoutDraft");
    alert("❌ Your order has been cancelled.");
    navigateHome();
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url('https://images.unsplash.com/photo-1627366422957-3efa9c6df0fc?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
      }}
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: "640px", width: "100%", borderRadius: "20px" }}>
        <h2 className="text-danger mb-3">💳 Payment Summary</h2>

        <div className="text-start mb-3">
          <div className="mb-2">
            <span className="fw-semibold">Payment Method: </span>
            <span>{paymentMethod === "UPI" ? "UPI" : "Cash on Delivery"}</span>
          </div>
          <div className="mb-2">
            <span className="fw-semibold">Delivery Address:</span>
            <div className="mt-1 p-2 bg-light rounded-3">{address || "—"}</div>
          </div>
          {notes ? (
            <div className="mb-2">
              <span className="fw-semibold">Notes:</span>
              <div className="mt-1 p-2 bg-light rounded-3">{notes}</div>
            </div>
          ) : null}
        </div>

        <ul className="list-group mb-3 text-start">
          {cartItems.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between">
              <span>{item.name} × {item.qty}</span>
              <span>₹{(item.price * item.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <div className="text-start mb-3">
          <p className="mb-1">Subtotal: ₹{subtotal.toFixed(2)}</p>
          <p className="mb-1">GST (5%): ₹{gst.toFixed(2)}</p>
          <p className="mb-2">Delivery Fee: ₹{delivery.toFixed(2)}</p>
          <h5 className="mb-0">Total: ₹{finalTotal.toFixed(2)}</h5>
        </div>

        <div className="mt-3">
          <h4 className="fw-bold text-success">⏳ Order in Progress: {formatTime(timeLeft)}</h4>
          {halfTimeWarning && <p className="text-warning mt-2">⚠️ Halfway done! It’ll be ready soon!</p>}
        </div>

        <div className="mt-4 d-flex justify-content-center gap-3">
          <button className="btn btn-outline-danger" onClick={handleCancelOrder}>Cancel Order</button>
        </div>

        <div className="text-center mt-4">
          <button type="button" className="btn btn-outline-secondary w-100" onClick={navigateHome}>
            🏠 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
