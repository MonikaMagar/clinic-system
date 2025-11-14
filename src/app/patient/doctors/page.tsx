"use client";

import { useEffect, useState } from "react";
import "./appointments.css";

export default function PatientAppointmentsPage() {
  const patientId = 1;

  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  const LS_CANCEL_KEY = "demo_cancelled_appointments_v1";

  // Convert "02:00 PM" or "2:00 pm" -> "14:00", keep "14:00" as is
  function convertTo24Hour(timeStr: string) {
    if (!timeStr) return timeStr;
    const s = timeStr.toString().trim();
    const up = s.toUpperCase();
    if (!up.includes("AM") && !up.includes("PM")) {
      // already 24h or "14:00"
      return s;
    }
    const [timePart, modifier] = up.split(" ");
    const [hStr, mStr] = timePart.split(":");
    let h = parseInt(hStr, 10);
    const m = mStr || "00";
    if (modifier === "PM" && h !== 12) h += 12;
    if (modifier === "AM" && h === 12) h = 0;
    return `${h.toString().padStart(2, "0")}:${m}`;
  }

  // format date/time to "20/2/2025, 10:15:00 am"
  const formatDateTime = (isoOrDate: string) => {
    const d = new Date(isoOrDate);
    if (isNaN(d.getTime())) return isoOrDate; // fallback
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    let hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    if (hours === 0) hours = 12;

    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    return `${day}/${month}/${year}, ${hours}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
  };

  // load appointments and apply demo-cancelled mapping
  const loadAppointments = async () => {
    try {
      const res = await fetch(`/api/patient/appointments?patientId=${patientId}`);
      const data = await res.json();
      let list = data.appointments || [];

      // Add demo appointments (IDs in 100..999 range used for demo)
      list.push(
        {
          id: 101,
          status: "CONFIRMED",
          createdAt: "2025-02-19T14:30:00",
          doctor: {
            user: { name: "DURGA MAGAR", email: "magardurga2006@gmail.com" },
            specialization: "General Physician",
          },
          slot: { date: "2025-03-01", startTime: "10:00", endTime: "10:30" },
        },
        {
          id: 102,
          status: "PENDING",
          createdAt: "2025-02-20T10:15:00",
          doctor: {
            user: { name: "RAHUL SHARMA", email: "rahulsharma@gmail.com" },
            specialization: "Dermatologist",
          },
          // using 24h startTime so Date parse works
          slot: { date: "2025-03-02", startTime: "14:00", endTime: "14:30" },
        }
      );

      // Apply any demo cancellations persisted in localStorage:
      const raw = localStorage.getItem(LS_CANCEL_KEY);
      const cancelledIds: number[] = raw ? JSON.parse(raw) : [];
      if (cancelledIds.length > 0) {
        list = list.map((a: any) =>
          cancelledIds.includes(Number(a.id)) ? { ...a, status: "CANCELLED" } : a
        );
      }

      setAppointments(list);
    } catch (err) {
      console.error("ERR_LOADING_APPOINTMENTS:", err);
      setAppointments([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCancelPopup = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowCancelPopup(true);
  };

  const closePopup = () => {
    setShowCancelPopup(false);
    setSelectedAppointment(null);
  };

  // mark demo cancelled in localStorage
  const markDemoCancelled = (id: number) => {
    const raw = localStorage.getItem(LS_CANCEL_KEY);
    const arr: number[] = raw ? JSON.parse(raw) : [];
    if (!arr.includes(id)) {
      arr.push(id);
      localStorage.setItem(LS_CANCEL_KEY, JSON.stringify(arr));
    }
  };

  // confirm cancel (updates appointment.status -> "CANCELLED" instead of removing)
  const confirmCancel = async () => {
    if (!selectedAppointment) return;
    const { id, slot } = selectedAppointment;

    // handle startTime that may be "02:00 PM" etc:
    const start24 = convertTo24Hour(slot.startTime);
    const appointmentDateTime = new Date(`${slot.date}T${start24}`);

    if (new Date() >= appointmentDateTime) {
      alert("The time to cancel this appointment has expired.");
      closePopup();
      return;
    }

    // Demo appointment: persist cancelled and update UI
    if (Number(id) >= 100 && Number(id) < 1000) {
      markDemoCancelled(Number(id));
      setAppointments((prev) =>
        prev.map((a) => (Number(a.id) === Number(id) ? { ...a, status: "CANCELLED" } : a))
      );
      closePopup();
      alert("Appointment cancelled (demo).");
      return;
    }

    // Real appointment: call API and update UI status to CANCELLED
    try {
      const res = await fetch("/api/patient/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId: Number(id) }),
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error || "Unable to cancel appointment.");
      } else {
        setAppointments((prev) =>
          prev.map((a) => (Number(a.id) === Number(id) ? { ...a, status: "CANCELLED" } : a))
        );
        alert("Appointment cancelled successfully.");
      }
    } catch (err) {
      console.error("CANCEL_ERR:", err);
      alert("Server error while cancelling. Try again.");
    } finally {
      closePopup();
    }
  };

  if (loading) return <div className="loading">Loading appointments...</div>;

  return (
    <div className="app-bg">
      <div className="app-container">
        <button className="back-btn" onClick={() => window.history.back()}>
          ⬅ Back
        </button>

        <h1 className="app-title">My Appointments</h1>

        <div className="appointments-list">
          {appointments.map((app) => (
            <div
              key={app.id}
              className={`appointment-card ${app.status === "CANCELLED" ? "appointment-cancelled" : ""}`}
            >
              <h2 className="doctor-name">Dr. {app.doctor.user.name}</h2>
              <p className="doctor-email">{app.doctor.user.email}</p>
              <p className="doctor-spec">{app.doctor.specialization}</p>

              <div className="divider"></div>

              <p>
                <b>Date:</b> {app.slot.date}
              </p>
              <p>
                <b>Time:</b>{" "}
                {formatDateTime(`${app.slot.date}T${convertTo24Hour(app.slot.startTime)}`)}
              </p>

              <div className="divider"></div>

              <span className={`status ${app.status.toLowerCase()}`}>{app.status}</span>

              <p className="booked-time">Booked On: {formatDateTime(app.createdAt)}</p>

              {/* For cancelled/completed we don't show the cancel action */}
              {app.status !== "CANCELLED" && app.status !== "COMPLETED" && (
                <button className="cancel-btn" onClick={() => openCancelPopup(app)}>
                  Cancel Appointment
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Cancel Popup (click outside to close) */}
        {showCancelPopup && (
          <div className="popup-overlay" onClick={closePopup}>
            <div className="popup-box" onClick={(e) => e.stopPropagation()}>
              <h2>Cancel Appointment?</h2>
              <p>Are you sure you want to cancel this appointment?</p>

              <div className="popup-actions">
                <button className="popup-cancel" onClick={closePopup}>
                  No, Keep
                </button>

                <button className="popup-confirm" onClick={confirmCancel}>
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
