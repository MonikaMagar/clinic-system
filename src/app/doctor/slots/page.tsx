"use client";

import { useEffect, useState } from "react";
import "./style.css"; // import CSS file

export default function DoctorSlotsPage() {
  const doctorId = 1; // Number required (Doctor.id)

  const [slots, setSlots] = useState([]);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Fetch all slots
  const loadSlots = async () => {
    const res = await fetch(`/api/doctor/slots?doctorId=${doctorId}`);
    const data = await res.json();
    setSlots(data);
  };

  // Create slot
  const createSlot = async (e: any) => {
    e.preventDefault();

    await fetch("/api/doctor/slots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doctorId,
        date,
        startTime,
        endTime,
      }),
    });

    loadSlots();
    setDate("");
    setStartTime("");
    setEndTime("");
  };

  // Delete Slot
  const deleteSlot = async (id: string) => {
    await fetch(`/api/doctor/slots?id=${id}`, { method: "DELETE" });
    loadSlots();
  };

  useEffect(() => {
    loadSlots();
  }, []);

  return (
    <div className="page-bg">
      <div className="container">

        {/* Header */}
        <div className="card">
          <h1 className="title">Doctor Available Slots</h1>
          <p className="subtitle">Manage your appointment availability</p>
        </div>

        {/* Create Slot Form */}
        <div className="card">
          <h2 className="title" style={{ fontSize: "22px" }}>Add New Slot</h2>

          <form onSubmit={createSlot} className="space">
            <div style={{ marginBottom: "16px" }}>
              <label className="input-label">Date</label>
              <input
                type="date"
                className="input-field"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label className="input-label">Start Time</label>
              <input
                type="time"
                className="input-field"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label className="input-label">End Time</label>
              <input
                type="time"
                className="input-field"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>

            <button className="btn-primary">Add Slot</button>
          </form>
        </div>

        {/* Slot List */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <h2 className="title" style={{ fontSize: "22px" }}>Your Slots</h2>

            <span className="badge">
              {slots.length} {slots.length === 1 ? "slot" : "slots"}
            </span>
          </div>

          <div className="space-y">
            {slots.length === 0 ? (
              <p className="subtitle" style={{ textAlign: "center", padding: "40px 0" }}>
                No slots added yet.
              </p>
            ) : (
              slots.map((slot: any) => (
                <div key={slot.id} className="slot-card">
                  <div>
                    <p className="slot-date">{slot.date}</p>
                    <p className="slot-time">
                      {slot.startTime} - {slot.endTime}
                    </p>
                  </div>

                  <button className="btn-delete" onClick={() => deleteSlot(slot.id)}>
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
