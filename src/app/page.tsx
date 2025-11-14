"use client";

import { useState } from "react";

export default function AuthPage() {
  const [tab, setTab] = useState<
    "login" | "patient-signup" | "doctor-signup"
  >("login");

  // FORM STATES
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const [patientForm, setPatientForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [doctorForm, setDoctorForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    mobile: "",
    specialization: "",
    password: "",
  });

  // LOGIN HANDLER
  const handleLogin = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm),
    });

    const data = await res.json();
    alert(data.message);

    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href =
        data.role === "DOCTOR"
          ? "/doctor/dashboard"
          : "/patient/appointments";
    }
  };

  // PATIENT SIGNUP HANDLER
  const handlePatientSignup = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: patientForm.name,
        email: patientForm.email,
        password: patientForm.password,
        role: "PATIENT",
        contactInfo: patientForm.phone,
      }),
    });

    const data = await res.json();
    alert(data.message);
  };

  // DOCTOR SIGNUP HANDLER
  const handleDoctorSignup = async (e: any) => {
    e.preventDefault();

    const fullName = `${doctorForm.firstName} ${doctorForm.lastName}`;

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fullName,
        email: doctorForm.email,
        username: doctorForm.username,
        password: doctorForm.password,
        role: "DOCTOR",
        specialization: doctorForm.specialization,
        contactInfo: doctorForm.mobile,
      }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* LEFT IMAGE */}
      <div
        style={{
          flex: 1,
          backgroundImage:
            "url('https://sapremclinic.in/hospital/assets/model3-B5sxlzuL.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "32px",
          fontWeight: "bold",
          padding: "20px",
        }}
      >
        Doctor Appointment System
      </div>

      {/* RIGHT SIDE FORM CARD */}
      <div
        style={{
          flex: 1,
          padding: "60px",
          background: "white",
        }}
      >
        {/* TOP BUTTONS */}
        <div style={{ display: "flex", gap: 12, marginBottom: 25 }}>
          <button className="btn-nav" onClick={() => setTab("login")}>
            Login
          </button>
          <button
            className="btn-nav"
            onClick={() => setTab("patient-signup")}
          >
            Patient Signup
          </button>
          <button
            className="btn-nav"
            onClick={() => setTab("doctor-signup")}
          >
            Doctor Signup
          </button>
        </div>

        {/* CARD */}
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "14px",
            boxShadow: "0 8px 22px rgba(0, 0, 0, 0.1)",
            maxWidth: "420px",
          }}
        >
          {/* LOGIN FORM */}
          {tab === "login" && (
            <>
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                <input
                  className="input"
                  placeholder="Email"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                />
                <button className="btn">Login</button>
              </form>
            </>
          )}

          {/* PATIENT SIGNUP */}
          {tab === "patient-signup" && (
            <>
              <h2>Patient Signup</h2>
              <form onSubmit={handlePatientSignup}>
                <input
                  className="input"
                  placeholder="Full Name"
                  value={patientForm.name}
                  onChange={(e) =>
                    setPatientForm({ ...patientForm, name: e.target.value })
                  }
                />
                <input
                  className="input"
                  placeholder="Email"
                  value={patientForm.email}
                  onChange={(e) =>
                    setPatientForm({ ...patientForm, email: e.target.value })
                  }
                />
                <input
                  className="input"
                  placeholder="Phone"
                  value={patientForm.phone}
                  onChange={(e) =>
                    setPatientForm({ ...patientForm, phone: e.target.value })
                  }
                />
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  value={patientForm.password}
                  onChange={(e) =>
                    setPatientForm({
                      ...patientForm,
                      password: e.target.value,
                    })
                  }
                />
                <button className="btn">Register</button>
              </form>
            </>
          )}

          {/* DOCTOR SIGNUP */}
          {tab === "doctor-signup" && (
            <>
              <h2>Doctor Signup</h2>
              <form onSubmit={handleDoctorSignup}>
                <input
                  className="input"
                  placeholder="First Name"
                  value={doctorForm.firstName}
                  onChange={(e) =>
                    setDoctorForm({
                      ...doctorForm,
                      firstName: e.target.value,
                    })
                  }
                />
                <input
                  className="input"
                  placeholder="Last Name"
                  value={doctorForm.lastName}
                  onChange={(e) =>
                    setDoctorForm({
                      ...doctorForm,
                      lastName: e.target.value,
                    })
                  }
                />
                <input
                  className="input"
                  placeholder="Email"
                  value={doctorForm.email}
                  onChange={(e) =>
                    setDoctorForm({
                      ...doctorForm,
                      email: e.target.value,
                    })
                  }
                />
                <input
                  className="input"
                  placeholder="Username"
                  value={doctorForm.username}
                  onChange={(e) =>
                    setDoctorForm({
                      ...doctorForm,
                      username: e.target.value,
                    })
                  }
                />
                <input
                  className="input"
                  placeholder="Mobile"
                  value={doctorForm.mobile}
                  onChange={(e) =>
                    setDoctorForm({
                      ...doctorForm,
                      mobile: e.target.value,
                    })
                  }
                />

                <select
                  className="input"
                  value={doctorForm.specialization}
                  onChange={(e) =>
                    setDoctorForm({
                      ...doctorForm,
                      specialization: e.target.value,
                    })
                  }
                >
                  <option>Select Specialization</option>
                  <option>Cardiologist</option>
                  <option>Dentist</option>
                  <option>Neurologist</option>
                  <option>Dermatologist</option>
                </select>

                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  value={doctorForm.password}
                  onChange={(e) =>
                    setDoctorForm({
                      ...doctorForm,
                      password: e.target.value,
                    })
                  }
                />

                <button className="btn">Register</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
