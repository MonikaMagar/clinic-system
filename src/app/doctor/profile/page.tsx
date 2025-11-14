"use client";

import { useState } from "react";
import Sidebar from "@/components/DoctorSidebar";
import { LogOut } from "lucide-react";

export default function DoctorProfile() {
  const [profile, setProfile] = useState({
    specialization: "",
    bio: "",
    contact: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/doctor/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(profile),
    });

    const data = await res.json();
    alert(data.message);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={{ display: "flex", background: "#f1f9ff", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "30px" }}>
        {/* Top Bar */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "#0369a1" }}>
            Doctor Profile
          </h2>

          {/* Logout Button */}
          <button
            onClick={logout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "8px 12px",
              background: "#ef4444",
              color: "white",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "500",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#dc2626")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#ef4444")
            }
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* FORM CARD */}
        <div
          style={{
            marginTop: "25px",
            background: "white",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            maxWidth: "450px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <label style={{ fontWeight: 600 }}>Specialization</label>
            <input
              className="input"
              placeholder="e.g. Cardiologist"
              onChange={(e) =>
                setProfile({ ...profile, specialization: e.target.value })
              }
            />

            <label style={{ fontWeight: 600, marginTop: "15px" }}>Bio</label>
            <textarea
              className="input"
              placeholder="Short description about your experience"
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              rows={4}
            />

            <label style={{ fontWeight: 600, marginTop: "15px" }}>
              Contact Info
            </label>
            <input
              className="input"
              placeholder="Phone or email"
              onChange={(e) =>
                setProfile({ ...profile, contact: e.target.value })
              }
            />

            <button
              className="btn"
              style={{
                width: "100%",
                marginTop: "20px",
                padding: "12px",
                background: "linear-gradient(to right, #06b6d4, #2563eb)",
                color: "white",
                fontWeight: "600",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
