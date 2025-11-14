"use client";

import type { CSSProperties } from "react";
import Sidebar from "@/components/DoctorSidebar";

export default function AppointmentList() {
  const data = [
    {
      number: "749133529",
      name: "Garima Singh",
      email: "grm12@gmail.com",
      date: "2024-03-10",
      time: "15:05",
      status: "Completed",
    },
  ];

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "20px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
          Appointments Lists
        </h2>

        <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#e2e8f0" }}>
              <th style={th}>Number</th>
              <th style={th}>Name</th>
              <th style={th}>Email</th>
              <th style={th}>Date</th>
              <th style={th}>Time</th>
              <th style={th}>Status</th>
              <th style={th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((appointment) => (
              <tr key={appointment.number} style={tr}>
                <td style={td}>{appointment.number}</td>
                <td style={td}>{appointment.name}</td>
                <td style={td}>{appointment.email}</td>
                <td style={td}>{appointment.date}</td>
                <td style={td}>{appointment.time}</td>
                <td style={td}>{appointment.status}</td>
                <td style={td}>
                  <a
                    href={`/doctor/appointments/${appointment.number}`}
                    style={{ color: "#0284c7", fontWeight: "bold" }}
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
const th: CSSProperties = { padding: "12px", textAlign: "left" };
const td: CSSProperties = { padding: "12px", borderBottom: "1px solid #e2e8f0" };
const tr: CSSProperties = { background: "#fff" };
