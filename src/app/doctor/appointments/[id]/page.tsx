"use client";

import Sidebar from "@/components/DoctorSidebar";

export default function AppointmentDetail() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "20px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Appointment Details</h2>

        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            borderRadius: "10px",
            background: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <p><strong>Appointment Number:</strong> 749133529</p>
          <p><strong>Patient Name:</strong> Garima Singh</p>
          <p><strong>Email:</strong> grm12@gmail.com</p>
          <p><strong>Contact:</strong> 14142536</p>
          <p><strong>Date:</strong> 2024-03-10</p>
          <p><strong>Time:</strong> 15:05</p>
          <p><strong>Message:</strong> Need Appointment</p>
          <p><strong>Status:</strong> Completed</p>
        </div>
      </div>
    </div>
  );
}
