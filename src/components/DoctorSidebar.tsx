"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  CheckCircle,
  FileText,
  Search,
  Clock,
  UserCog,
} from "lucide-react";

export default function DoctorSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", href: "/doctor/dashboard", icon: <LayoutDashboard size={18} /> },
    { label: "Appointments", href: "/doctor/appointments", icon: <CalendarCheck size={18} /> },

   
    { label: "Reports", href: "/doctor/report", icon: <FileText size={18} /> },
    { label: "Search Appointment", href: "/doctor/search", icon: <Search size={18} /> },
    { label: "Slots", href: "/doctor/slots", icon: <Clock size={18} /> },
    { label: "Profile", href: "/doctor/profile", icon: <UserCog size={18} /> },
  ];

  return (
    <div
      style={{
        width: "250px",
        padding: "25px",
        background: "#f0f7ff",
        borderRight: "1px solid #dbeafe",
        minHeight: "100vh",
        boxShadow: "2px 0 18px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* LOGO */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <h2
          style={{
            fontSize: "26px",
            fontWeight: "bold",
            color: "#0284c7",
            margin: 0,
          }}
        >
          DAS
        </h2>
        <p style={{ fontSize: "13px", color: "#64748b", marginTop: 4 }}>
          Doctor Panel
        </p>
      </div>

      {/* MENU TITLE */}
      <p
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: "#7c8aa5",
          marginBottom: 10,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        Main Menu
      </p>

      {/* MENU ITEMS */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {menuItems.map((item) => (
          <SidebarItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={pathname === item.href}
          />
        ))}
      </div>
    </div>
  );
}

function SidebarItem({ label, href, icon, active }: any) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        borderRadius: 10,
        fontSize: "15px",
        fontWeight: 500,
        textDecoration: "none",
        background: active ? "#0284c7" : "transparent",
        color: active ? "white" : "#334155",
        transition: "0.2s ease",
      }}
    >
      <span style={{ opacity: active ? 1 : 0.7 }}>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
