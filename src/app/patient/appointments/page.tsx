"use client";

import { useEffect, useState } from "react";
import "./style.css"; // external CSS

export default function DoctorsListPage() {
  const patientId = 1;

  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

  // Load doctors + dummy doctor
  const loadDoctors = async () => {
    try {
      const res = await fetch("/api/patient/doctors");
      const data = await res.json();

      let list = data.doctors || [];

      list.push({
        id: 999,
        name: "DURGA MAGAR",
        email: "magardurga2006@gmail.com",
        specialization: "General Physician",
        bio: "Experienced, caring and trusted doctor.",
        contactInfo: "9876543210",
        slots: [
          { id: "slot1", date: "2025-03-01", startTime: "10:00", endTime: "10:30" },
          { id: "slot2", date: "2025-03-01", startTime: "11:00", endTime: "11:30" },
          { id: "slot3", date: "2025-03-02", startTime: "02:00", endTime: "02:30" },
        ],
      });

      setDoctors(list);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  // Open modal
  const openModal = (doc: any) => {
    setSelectedDoctor(doc);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedDoctor(null);
  };

  // Book Appointment
  const bookAppointment = async (doctorId: number, slotId: string) => {
    if (doctorId === 999) {
      setMsg("Appointment booked successfully!");
      setShowModal(false);
      setTimeout(() => setMsg(""), 2500);
      return;
    }

    const res = await fetch("/api/patient/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ doctorId, slotId, patientId }),
    });

    const data = await res.json();
    setMsg(data.error ? data.error : "Appointment booked successfully!");

    setShowModal(false);
    setTimeout(() => setMsg(""), 2500);
  };

  if (loading) return <h1 className="loading">Loading doctors...</h1>;

  return (
    <div className="page-bg">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-logo">ClinicSys</div>

        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/patient/doctors" className="active-link">Doctors</a></li>
          <li><a href="/patient/doctors">My Appointments</a></li>
        </ul>

        <button className="nav-logout" onClick={() => alert("Logged Out!")}>
          Logout
        </button>
      </nav>

      <div className="container">

        {msg && <div className="success">{msg}</div>}

        <h1 className="title-main">Available Doctors</h1>

        {/* Doctor List */}
        <div className="doctor-list">
          {doctors.map((doc) => (
            <div key={doc.id} className="doctor-card" onClick={() => openModal(doc)}>
              <h2 className="doctor-name">Dr. {doc.name}</h2>
              <p className="email">{doc.email}</p>
              <p className="spec">{doc.specialization}</p>
            </div>
          ))}
        </div>

        {/* Info + Footer */}
        <div className="info-section">
          <h2>Why Choose Our Clinic?</h2>
          <p>
            We provide experienced doctors and an easy online appointment system.
          </p>

          <div className="info-grid">
            <div className="info-card">
              <h3>✔ 24/7 Support</h3>
              <p>Ask any questions anytime.</p>
            </div>
            <div className="info-card">
              <h3>✔ Trusted Doctors</h3>
              <p>Qualified & experienced professionals.</p>
            </div>
            <div className="info-card">
              <h3>✔ Easy Booking</h3>
              <p>Book appointments in one click.</p>
            </div>
          </div>
        </div>

        <footer className="footer">
          <p>© 2025 Clinic Booking System</p>
          <p>Made with ❤️ by Monika</p>
        </footer>

        {/* MODAL */}
        {showModal && selectedDoctor && (
          <div className="modal-overlay">
            <div className="modal-box">
              <button className="close-btn" onClick={closeModal}>✖</button>

              <h2 className="modal-title">Dr. {selectedDoctor.name}</h2>
              <p className="modal-email">{selectedDoctor.email}</p>
              <p className="modal-spec">{selectedDoctor.specialization}</p>

              <h3 className="slot-title">Available Slots</h3>

              <div className="slot-list">
                {selectedDoctor.slots.map((slot: any) => (
                  <div key={slot.id} className="slot-card">
                    <div>
                      <p className="slot-date">{slot.date}</p>
                      <p className="slot-time">{slot.startTime} - {slot.endTime}</p>
                    </div>

                    <button
                      className="book-btn"
                      onClick={() => bookAppointment(selectedDoctor.id, slot.id)}
                    >
                      Book
                    </button>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
