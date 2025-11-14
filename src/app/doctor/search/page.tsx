"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/DoctorSidebar";
import { Search, Calendar, Clock, User } from "lucide-react";

export default function DoctorSearchPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const token = localStorage.getItem("token");

    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (status) params.append("status", status);
    if (date) params.append("date", date);

    const res = await fetch(`/api/doctor/search?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setResults(data.appointments || []);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div style={{ display: "flex", background: "#f1f9ff", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "30px" }}>
        <h1 style={{ fontSize: 28, fontWeight: "bold", color: "#0369a1" }}>
          Search Appointments
        </h1>

        {/* FILTER CARD */}
        <div
          style={{
            marginTop: 25,
            background: "white",
            padding: 20,
            borderRadius: 12,
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          {/* Search Patient */}
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 600 }}>Search Patient</label>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Search size={16} />
              <input
                type="text"
                placeholder="Enter patient name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  flex: 1,
                  padding: 10,
                  border: "1px solid #d1d5db",
                  borderRadius: 8,
                }}
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label style={{ fontWeight: 600 }}>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #d1d5db",
              }}
            >
              <option value="ALL">All</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <label style={{ fontWeight: 600 }}>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #d1d5db",
              }}
            />
          </div>

          {/* Search Button */}
          <div style={{ alignSelf: "flex-end" }}>
            <button
              onClick={handleSearch}
              style={{
                background: "linear-gradient(to right, #06b6d4, #2563eb)",
                color: "white",
                padding: "10px 16px",
                borderRadius: 8,
                border: "none",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Search
            </button>
          </div>
        </div>

        {/* RESULTS TABLE */}
        <div
          style={{
            marginTop: 25,
            padding: 20,
            background: "white",
            borderRadius: 12,
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ marginBottom: 20, color: "#0369a1" }}>Search Results</h2>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#e2e8f0", textAlign: "left" }}>
                <th style={{ padding: 12 }}>Patient</th>
                <th style={{ padding: 12 }}>Email</th>
                <th style={{ padding: 12 }}>Status</th>
                <th style={{ padding: 12 }}>Date</th>
                <th style={{ padding: 12 }}>Time</th>
              </tr>
            </thead>

            <tbody>
              {results.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: 20 }}>
                    No appointments found
                  </td>
                </tr>
              ) : (
                results.map((appt: any) => (
                  <tr key={appt.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: 12 }}>{appt.patient.user.name}</td>
                    <td style={{ padding: 12 }}>{appt.patient.user.email}</td>
                    <td style={{ padding: 12 }}>{appt.status}</td>
                    <td style={{ padding: 12 }}>
                      {new Date(appt.slot.startTime).toLocaleDateString()}
                    </td>
                    <td style={{ padding: 12 }}>
                      {new Date(appt.slot.startTime).toLocaleTimeString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
