"use client";

import Sidebar from "@/components/DoctorSidebar";
import { useEffect, useState } from "react";
import { FileSpreadsheet, Search } from "lucide-react";

// ------------------------
// Types for TypeScript
// ------------------------
interface Appointment {
  id: number;
  patient: {
    user: {
      name: string;
      email: string;
    };
  };
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  slot: {
    startTime: string;
  };
  description: string;
}

export default function DoctorReportPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filtered, setFiltered] = useState<Appointment[]>([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [date, setDate] = useState("");

  useEffect(() => {
    loadDummyReport();
  }, []);

  useEffect(() => {
    filterData();
  }, [search, status, date, appointments]);

  // -----------------------------------
  // DUMMY DATA ONLY (Pure Frontend)
  // -----------------------------------
  const loadDummyReport = () => {
    const dummy: Appointment[] = [
      {
        id: 1,
        patient: {
          user: { name: "Rahul Sharma", email: "rahul@example.com" },
        },
        status: "CONFIRMED",
        slot: { startTime: new Date().toISOString() },
        description: "Routine check-up",
      },
      {
        id: 2,
        patient: {
          user: { name: "Priya Singh", email: "priya@example.com" },
        },
        status: "COMPLETED",
        slot: {
          startTime: new Date(Date.now() - 86400000).toISOString(),
        },
        description: "Fever and headache",
      },
      {
        id: 3,
        patient: {
          user: { name: "Amit Patil", email: "amit@example.com" },
        },
        status: "PENDING",
        slot: {
          startTime: new Date(Date.now() + 86400000).toISOString(),
        },
        description: "Dental cleaning",
      },
      {
        id: 4,
        patient: {
          user: { name: "Suman Magar", email: "suman@example.com" },
        },
        status: "CANCELLED",
        slot: { startTime: new Date().toISOString() },
        description: "Cancelled by patient",
      },
    ];

    setAppointments(dummy);
    setFiltered(dummy);
  };

  // -----------------------------------
  // FILTER LOGIC
  // -----------------------------------
  const filterData = () => {
    let data = [...appointments];

    if (search.trim()) {
      data = data.filter((a) =>
        a.patient.user.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "ALL") {
      data = data.filter((a) => a.status === status);
    }

    if (date) {
      data = data.filter(
        (a) =>
          new Date(a.slot.startTime).toDateString() ===
          new Date(date).toDateString()
      );
    }

    setFiltered(data);
  };

  // -----------------------------------
  // EXPORT CSV
  // -----------------------------------
  const exportCSV = () => {
    let csv = "Patient,Email,Status,Date,Time,Description\n";

    filtered.forEach((a) => {
      csv += `${a.patient.user.name},${a.patient.user.email},${a.status},${new Date(
        a.slot.startTime
      ).toLocaleDateString()},${new Date(a.slot.startTime).toLocaleTimeString()},${
        a.description || "-"
      }\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "appointment_report.csv";
    a.click();
  };

  return (
    <div style={{ display: "flex", background: "#f1f9ff", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "30px" }}>
        <h1 style={{ fontSize: 28, fontWeight: "bold", color: "#0369a1" }}>
          Appointment Report
        </h1>

        {/* FILTERS */}
        <div
          style={{
            marginTop: 25,
            padding: 20,
            background: "white",
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          {/* SEARCH */}
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>
              Search Patient
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Search size={18} color="#666" />
              <input
                type="text"
                placeholder="Enter patient name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #d1d5db",
                }}
              />
            </div>
          </div>

          {/* STATUS */}
          <div>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Status</label>
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

          {/* DATE */}
          <div>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Date</label>
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

          {/* EXPORT BUTTON */}
          <div style={{ alignSelf: "flex-end" }}>
            <button
              onClick={exportCSV}
              style={{
                background: "linear-gradient(to right, #06b6d4, #2563eb)",
                color: "white",
                padding: "10px 18px",
                borderRadius: 8,
                border: "none",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
              }}
            >
              <FileSpreadsheet size={18} />
              Export CSV
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div
          style={{
            marginTop: 25,
            background: "white",
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            padding: 20,
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#e2e8f0", textAlign: "left" }}>
                <th style={{ padding: 12 }}>Patient</th>
                <th style={{ padding: 12 }}>Email</th>
                <th style={{ padding: 12 }}>Status</th>
                <th style={{ padding: 12 }}>Date</th>
                <th style={{ padding: 12 }}>Time</th>
                <th style={{ padding: 12 }}>Message</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: 20, textAlign: "center" }}>
                    No data found
                  </td>
                </tr>
              ) : (
                filtered.map((a) => (
                  <tr key={a.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: 12 }}>{a.patient.user.name}</td>
                    <td style={{ padding: 12 }}>{a.patient.user.email}</td>
                    <td style={{ padding: 12 }}>{a.status}</td>
                    <td style={{ padding: 12 }}>
                      {new Date(a.slot.startTime).toLocaleDateString()}
                    </td>
                    <td style={{ padding: 12 }}>
                      {new Date(a.slot.startTime).toLocaleTimeString()}
                    </td>
                    <td style={{ padding: 12 }}>
                      {a.description || "No message"}
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
