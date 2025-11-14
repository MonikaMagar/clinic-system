"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/DoctorSidebar";
import { Calendar, Clock, User, FileText, CheckCircle } from "lucide-react";

export default function AppointmentDetail() {
  const params = useParams();
  const id = params.id;

  const [appt, setAppt] = useState<any>(null);

  useEffect(() => {
    loadDetail();
  }, []);

  const loadDetail = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`/api/doctor/appointment/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (data.appointment) setAppt(data.appointment);
  };

  if (!appt)
    return (
      <div style={{ padding: 30 }}>
        <p>Loading appointment details...</p>
      </div>
    );

  const patient = appt.patient.user;

  return (
    <div style={{ display: "flex", background: "#f1f9ff", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "30px" }}>
        <h1 style={{ fontSize: 28, fontWeight: "bold", color: "#0369a1" }}>
          Appointment Details
        </h1>

        {/* CARD */}
        <div
          style={{
            marginTop: 30,
            background: "white",
            padding: 30,
            borderRadius: 12,
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
            maxWidth: 800,
          }}
        >
          {/* HEADER */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: 22 }}>{patient.name}</h2>
              <p style={{ color: "#475569", marginTop: 5 }}>{patient.email}</p>
            </div>

            <span
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "#dbeafe",
                color: "#1e40af",
                fontWeight: 600,
              }}
            >
              <CheckCircle size={18} /> {appt.status}
            </span>
          </div>

          {/* DETAILS */}
          <DetailRow
            icon={<Calendar size={20} />}
            label="Date"
            value={new Date(appt.slot.startTime).toLocaleDateString()}
          />
          <DetailRow
            icon={<Clock size={20} />}
            label="Time"
            value={new Date(appt.slot.startTime).toLocaleTimeString()}
          />
          <DetailRow
            icon={<User size={20} />}
            label="Patient Contact"
            value={appt.patient.contactInfo || "No phone"}
          />

          <DetailRow
            icon={<FileText size={20} />}
            label="Description"
            value={appt.description || "No description provided"}
          />
        </div>
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value }: any) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        marginBottom: 15,
        alignItems: "start",
      }}
    >
      {icon}
      <div>
        <strong style={{ display: "block", marginBottom: 4 }}>{label}</strong>
        <span style={{ color: "#475569" }}>{value}</span>
      </div>
    </div>
  );
}
