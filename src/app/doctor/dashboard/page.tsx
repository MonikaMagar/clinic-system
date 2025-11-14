"use client";

import Sidebar from "@/components/DoctorSidebar";
import {
  CalendarCheck,
  UserCheck,
  CheckCircle2,
  XCircle,
  ClipboardList,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function DoctorDashboard() {
  const [stats, setStats] = useState({
    total: 5,
    pending: 1,
    approved: 2,
    cancelled: 1,
    completed: 1,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/doctor/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setStats(data);
  };

  return (
    <div style={{ display: "flex", background: "#f8fafc", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "30px" }}>
        <h2
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            color: "#1e293b",
          }}
        >
          Doctor Dashboard
        </h2>

        <h3
          style={{
            marginTop: "8px",
            color: "#0284c7",
            fontWeight: 600,
            fontSize: "20px",
          }}
        >
          Welcome, Doctor 👨‍⚕️
        </h3>

        {/* CARDS */}
        <div
          style={{
            marginTop: "35px",
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          <DashboardCard
            title="All Appointments"
            value={stats.total}
            icon={<ClipboardList size={35} color="#1d4ed8" />}
            gradient="linear-gradient(135deg, #93c5fd, #60a5fa)"
          />

          <DashboardCard
            title="New Appointments"
            value={stats.pending}
            icon={<CalendarCheck size={35} color="#0c4a6e" />}
            gradient="linear-gradient(135deg, #67e8f9, #22d3ee)"
          />

          <DashboardCard
            title="Approved"
            value={stats.approved}
            icon={<UserCheck size={35} color="#4c1d95" />}
            gradient="linear-gradient(135deg, #c4b5fd, #a78bfa)"
          />

          <DashboardCard
            title="Cancelled"
            value={stats.cancelled}
            icon={<XCircle size={35} color="#b91c1c" />}
            gradient="linear-gradient(135deg, #fca5a5, #f87171)"
          />

          <DashboardCard
            title="Completed"
            value={stats.completed}
            icon={<CheckCircle2 size={35} color="#1e40af" />}
            gradient="linear-gradient(135deg, #a5b4fc, #818cf8)"
          />
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon, gradient }: any) {
  return (
    <div
      style={{
        background: gradient,
        padding: "25px",
        borderRadius: "16px",
        color: "white",
        boxShadow: "0 10px 22px rgba(0,0,0,0.15)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3 style={{ fontSize: "28px", margin: 0 }}>{value}</h3>
          <p style={{ margin: "5px 0 0", fontSize: "15px" }}>{title}</p>
        </div>
        <div>{icon}</div>
      </div>
    </div>
  );
}
