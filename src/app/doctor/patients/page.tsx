"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/DoctorSidebar";
import { User, Calendar, Clock, FileText } from "lucide-react";

export default function DoctorPatientList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/doctor/patients", {
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
          Patient List
        </h1>

        <p style={{ marginTop: 5, color: "#475569" }}>
          View all patients who have booked appointments with you.
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
            <p>No patients found</p>
          ) : (
            appointments.map((appt: any) => (
              <PatientCard key={appt.id} appt={appt} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function PatientCard({ appt }: any) {
  const patient = appt.patient;
  const user = patient?.user;

  return (
    <div
      style={{
        background: "white",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ margin: 0, fontSize: 20 }}>{user?.name}</h2>
      <p style={{ margin: "4px 0", color: "#475569" }}>{user?.email}</p>

      <div style={{ marginTop: 15 }}>
        <InfoRow icon={<Calendar size={18} />} label="Date" value={new Date(appt.slot.startTime).toLocaleDateString()} />
        <InfoRow icon={<Clock size={18} />} label="Time" value={new Date(appt.slot.startTime).toLocaleTimeString()} />
        <InfoRow icon={<FileText size={18} />} label="Message" value={appt.description || "No message"} />
      </div>

      <div
        style={{
          marginTop: 15,
          padding: "6px 12px",
          borderRadius: 8,
          display: "inline-block",
          fontWeight: 600,
          background:
            appt.status === "CONFIRMED"
              ? "#d1fae5"
              : appt.status === "PENDING"
              ? "#fef3c7"
              : appt.status === "CANCELLED"
              ? "#fee2e2"
              : "#dbeafe",
          color:
            appt.status === "CONFIRMED"
              ? "#065f46"
              : appt.status === "PENDING"
              ? "#92400e"
              : appt.status === "CANCELLED"
              ? "#991b1b"
              : "#1e40af",
        }}
      >
        {appt.status}
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
