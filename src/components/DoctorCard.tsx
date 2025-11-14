"use client";

import React from "react";

type Slot = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  available: boolean;
};

type Props = {
  doctor: {
    id: number;
    name: string;
    email?: string;
    specialization?: string;
    bio?: string | null;
    contactInfo?: string | null;
    slots: Slot[];
  };
  onSelectSlot: (doctorId: number, slot: Slot) => void;
};

export default function DoctorCard({ doctor, onSelectSlot }: Props) {
  return (
    <div
      style={{
        background: "white",
        padding: 16,
        borderRadius: 10,
        boxShadow: "0 6px 18px rgba(2,132,199,0.08)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div>
          <h3 style={{ margin: 0 }}>{doctor.name}</h3>
          <p style={{ margin: "6px 0 0", color: "#555" }}>{doctor.specialization}</p>
          {doctor.contactInfo && (
            <p style={{ margin: "6px 0 0", color: "#777", fontSize: 13 }}>
              {doctor.contactInfo}
            </p>
          )}
        </div>

        <div style={{ textAlign: "right", fontSize: 13, color: "#0369a1" }}>
          <div style={{ fontWeight: 700 }}>{doctor.slots.length}</div>
          <div style={{ color: "#6b7280" }}>slots</div>
        </div>
      </div>

      <hr style={{ margin: "12px 0", border: "none", borderTop: "1px solid #eef6fb" }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {doctor.slots.length === 0 && (
          <div style={{ color: "#6b7280", fontSize: 13 }}>No available slots</div>
        )}

        {doctor.slots.map((s) => {
          const start = new Date(s.startTime);
          const end = new Date(s.endTime);
          const dateStr = start.toLocaleDateString();
          const timeStr = `${start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

          return (
            <div
              key={s.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 10px",
                borderRadius: 8,
                background: "#f7fdff",
                border: "1px solid #e6f7ff",
              }}
            >
              <div style={{ fontSize: 13 }}>
                <div style={{ fontWeight: 600 }}>{dateStr}</div>
                <div style={{ color: "#555" }}>{timeStr}</div>
              </div>

              <div>
                <button
                  onClick={() => onSelectSlot(doctor.id, s)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: "none",
                    background: "#0284c7",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Book
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
