"use client";

import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);

    if (data.token) {
      localStorage.setItem("token", data.token);

      if (data.role === "DOCTOR") {
        window.location.href = "/doctor/dashboard";
      } else {
        window.location.href = "/patient/appointments";
      }
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div
        style={{
          flex: 1,
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2017/08/10/03/30/doctor-2611496_1280.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div style={{ flex: 1, padding: "40px" }}>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="btn">Login</button>
        </form>
      </div>
    </div>
  );
}
