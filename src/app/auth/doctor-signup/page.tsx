"use client";

import { useState } from "react";

export default function DoctorSignup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    mobile: "",
    specialization: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const fullName = `${form.firstName} ${form.lastName}`;

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fullName,
        email: form.email,
        password: form.password,
        role: "DOCTOR",
        specialization: form.specialization,
        contactInfo: form.mobile,
      }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* LEFT SIDE IMAGE */}
      <div
        style={{
          flex: 1,
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2015/05/13/18/47/doctor-765016_1280.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "34px",
          fontWeight: "bold",
        }}
      >
        Doctor Appointment System
      </div>

      {/* RIGHT SIDE FORM */}
      <div style={{ flex: 1, padding: "50px" }}>
        <h2 style={{ marginBottom: "10px" }}>Sign Up</h2>
        <p style={{ color: "#666" }}>Access to our dashboard</p>

        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          {/* FIRST NAME */}
          <input
            className="input"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />

          {/* LAST NAME */}
          <input
            className="input"
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />

          {/* EMAIL */}
          <input
            className="input"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {/* USERNAME */}
          <input
            className="input"
            placeholder="Enter Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          {/* MOBILE */}
          <input
            className="input"
            placeholder="Mobile"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          />

          {/* SPECIALIZATION */}
          <select
            className="input"
            value={form.specialization}
            onChange={(e) => setForm({ ...form, specialization: e.target.value })}
          >
            <option>Select Specialization</option>
            <option>Cardiologist</option>
            <option>Dentist</option>
            <option>Neurologist</option>
            <option>Dermatologist</option>
          </select>

          {/* PASSWORD */}
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="btn">Register</button>

          <p style={{ marginTop: "10px" }}>
            Do you have an account?{" "}
            <a href="/auth/login" style={{ color: "#0284c7" }}>
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
