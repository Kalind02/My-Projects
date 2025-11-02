// src/components/Home.js
import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export default function Home({ user, onLogout }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // basic front-end checks
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("Please fill out name, email, and message.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_BASE}/contact`, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setErrorMsg(
        err?.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold text-danger" href="/">
            FoodExpress
          </a>
          <div className="ms-auto d-flex align-items-center gap-3">
            <a className="nav-link" href="/restaurants">Restaurants</a>
            <a className="nav-link" href="/orders">My Orders</a>
            <a className="nav-link" href="/cart">Cart</a>
            {user ? (
              <>
                <span className="fw-semibold">👤 {user.name || user.email}</span>
                <button className="btn btn-outline-danger btn-sm" onClick={onLogout}>
                  Logout
                </button>
              </>
            ) : (
              <a className="btn btn-danger btn-sm" href="/login">Login</a>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header
        className="py-5 text-center text-white"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <h1 className="display-5 fw-bold">Delicious food, delivered fast.</h1>
          <p className="lead">Order from the best restaurants. Prices in ₹ INR.</p>
          <a className="btn btn-danger btn-lg mt-2" href="/restaurants">
            Explore Restaurants
          </a>
        </div>
      </header>

      {/* HOW IT WORKS */}
      <section className="py-5" style={{ background: "#fff5ef" }}>
        <div className="container">
          <h2 className="text-center text-danger fw-bold mb-4">🚀 How It Works</h2>
          <div className="row g-4">
            {[
              {
                icon: "🛍️",
                title: "Choose Restaurant",
                desc: "Browse a wide range of restaurants and cuisines.",
              },
              {
                icon: "🍕",
                title: "Select Your Meal",
                desc: "Add your favorite dishes to the cart.",
              },
              {
                icon: "💳",
                title: "Make Payment",
                desc: "Choose UPI or Cash on Delivery for easy checkout.",
              },
              {
                icon: "🚚",
                title: "Get It Delivered",
                desc: "Sit back and relax — your food is on the way!",
              },
            ].map((step, i) => (
              <div key={i} className="col-md-3">
                <div className="card shadow-sm border-0 h-100 p-4 rounded-4">
                  <div className="fs-1 mb-3">{step.icon}</div>
                  <h5 className="fw-bold text-danger">{step.title}</h5>
                  <p className="text-muted mt-2">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (kept lightweight) */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold text-danger mb-5">💬 What Our Customers Say</h2>
          <div className="row g-4 justify-content-center">
            {[
              {
                name: "Aarav Patel",
                text: "FoodExpress never disappoints! Super fast delivery and the food always tastes amazing. ❤️",
              },
              {
                name: "Priya Sharma",
                text: "Absolutely love how easy it is to order from my favorite restaurants. Highly recommend!",
              },
              {
                name: "Rohan Mehta",
                text: "Great variety, easy payments, and amazing offers. It’s my go-to app for dinner time!",
              },
            ].map((review, i) => (
              <div key={i} className="col-md-4">
                <div className="card shadow-sm border-0 h-100 p-4 rounded-4">
                  <p className="fst-italic text-muted mb-3">“{review.text}”</p>
                  <h6 className="fw-bold text-danger">— {review.name}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT US (wired to backend) */}
      <section className="py-5 bg-white">
        <div className="container">
          <h4 className="text-center text-danger fw-bold mb-4">Contact Us</h4>
          <div className="row justify-content-center">
            <div className="col-md-8">
              {submitted ? (
                <div className="alert alert-success text-center">
                  ✅ Thank you! Your message has been sent.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-light p-4 rounded-4 shadow-sm">
                  {errorMsg && (
                    <div className="alert alert-danger py-2">{errorMsg}</div>
                  )}

                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Type your message here."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>

                  <div className="text-center">
                    <button className="btn btn-danger px-4" type="submit" disabled={loading}>
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          backgroundColor: "#222",
          color: "#fff",
          padding: "40px 0 10px",
          textAlign: "center",
        }}
      >
        <div className="container">
          <p className="mb-2">© {new Date().getFullYear()} FoodExpress • Made with ❤️</p>
          <small style={{ color: "#bbb" }}>
            This is a demo Online Food Ordering System for learning purposes.
          </small>
        </div>
      </footer>
    </>
  );
}
