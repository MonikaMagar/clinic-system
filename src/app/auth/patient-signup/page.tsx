"use client";

import { useState } from "react";

export default function PatientSignup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
        role: "PATIENT",
        contactInfo: form.phone,
      }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* LEFT BLUE IMAGE */}
      <div
        style={{
          flex: 1,
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2017/01/31/13/14/doctor-2027767_1280.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* RIGHT FORM */}
      <div style={{ flex: 1, padding: "40px" }}>
        <h2>Patient Registration</h2>

        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <input
            className="input"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="input"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="input"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            type="password"
            className="input"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="btn">Register</button>

          <p style={{ marginTop: "10px" }}>
            Already registered?{" "}
            <a href="/auth/login" style={{ color: "#0284c7" }}>
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
