"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/DoctorSidebar";
import { Calendar, Clock, User, CheckCircle } from "lucide-react";

export default function CompletedAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadCompleted();
  }, []);

  const loadCompleted = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/doctor/completed", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setAppointments(data.appointments || []);
  };

  return (
    <div style={{ display: "flex", background: "#f1f9ff", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "30px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#0369a1" }}>
          Completed Appointments
        </h1>

        <p style={{ marginTop: 5, color: "#475569" }}>
          All appointments marked as completed.
        </p>

        <div
          style={{
            marginTop: 30,
            display: "grid",
            gap: 20,
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          }}
        >
          {appointments.length === 0 ? (
            <p>No completed appointments found</p>
          ) : (
            appointments.map((appt: any) => (
              <CompletedCard key={appt.id} appt={appt} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function CompletedCard({ appt }: any) {
  const patient = appt.patient;
  const user = patient?.user;

  return (
    <div
      style={{
        background: "white",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
        borderLeft: "4px solid #2563eb",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ margin: 0, fontSize: 20 }}>{user?.name}</h2>

        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 12px",
            borderRadius: 20,
            background: "#dbeafe",
            color: "#1e40af",
            fontWeight: 600,
          }}
        >
          <CheckCircle size={18} /> Completed
        </span>
      </div>

      <p style={{ margin: "4px 0", color: "#475569" }}>{user?.email}</p>

      <div style={{ marginTop: 15 }}>
        <InfoRow
          icon={<Calendar size={18} />}
          label="Date"
          value={new Date(appt.slot.startTime).toLocaleDateString()}
        />
        <InfoRow
          icon={<Clock size={18} />}
          label="Time"
          value={new Date(appt.slot.startTime).toLocaleTimeString()}
        />
        <InfoRow
          icon={<User size={18} />}
          label="Problem"
          value={appt.description || "No description"}
        />
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: any) {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        marginBottom: 8,
        color: "#475569",
      }}
    >
      {icon}
      <strong>{label}:</strong> <span>{value}</span>
    </div>
  );
}
