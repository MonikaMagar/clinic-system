# 🏥 Clinic Appointment System (Full-Stack Test Project)

A simplified **Clinic Appointment Management System** built using **Next.js (TypeScript)**, **Node.js API Routes (Next App Router)**, and **PostgreSQL (Prisma ORM)**.  
This project demonstrates core skills required for a full-stack role: authentication, CRUD operations, data modeling, API development, and frontend integration.

---

## 🎯 Test Objective

To assess the candidate’s capability to:

- Build a **full-stack web application** using Next.js (TypeScript)
- Design & implement **RESTful API routes** using the App Router
- Model relational data using **Prisma ORM + PostgreSQL**
- Implement **authentication & authorization** (JWT or NextAuth)
- Perform complete **CRUD operations** with validation & error handling
- Build a functional **frontend** that interacts with backend APIs
- Write clean, modular, type-safe code following best practices

⏱ **Test Duration:** 8 Hours

---

## 🚀 Features

### 👨‍⚕️ Doctor Module
- Manage doctor profile (name, specialization, bio, contact info)
- Create, edit, delete **available time slots**  
  - Start Time  
  - End Time  
  - Date  
- View all booked appointments
- Manage appointment status:
  - Accept
  - Cancel
  - Complete

---

### 🧑‍🧑‍🧒 Patient Module
- Register & login
- Browse doctors with specialization & availability
- View available slots
- Book an appointment
- Cancel appointments (within time limit)
- View appointment history (Pending, Confirmed, Cancelled, Completed)

---

### 📅 Appointment System
- Prevent slot conflicts (cannot double-book)
- Validate time and date ranges
- Maintain appointment statuses
- Slot → Appointment linkage
- Doctor → Slot → Appointment → Patient relations

---

### 🖥️ Frontend Pages (Minimal UI)
- Login / Register
- Doctor Dashboard
- Slot Management (CRUD)
- Doctor Appointment List (Accept/Cancel/Complete)
- Patient Doctor Listing
- Patient Appointment Booking
- My Appointments (Patient)
- Report Page (CSV Export)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14+ (TypeScript, App Router) |
| Backend | Next.js API Routes (Node) |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | JWT (or NextAuth optional) |
| UI | Tailwind / Bootstrap / MUI (optional) |

---

## 📂 Folder Structure

<img width="257" height="578" alt="image" src="https://github.com/user-attachments/assets/ebef4a46-36bc-4e74-b14a-e788513a1036" />



---

## 🧩 Database Schema (Prisma)

```prisma
model User {
  id        Int    @id @default(autoincrement())
  email     String @unique
  password  String
  name      String
  role      Role
  doctor    Doctor?
  patient   Patient?
}

model Doctor {
  id            Int     @id @default(autoincrement())
  userId        Int
  specialization String
  bio           String?
  contact       String?
  slots         Slot[]
  appointments  Appointment[]
}

model Patient {
  id           Int     @id @default(autoincrement())
  userId       Int
  appointments Appointment[]
}

model Slot {
  id         Int      @id @default(autoincrement())
  doctorId   Int
  startTime  DateTime
  endTime    DateTime
  date       DateTime
  isBooked   Boolean  @default(false)
  appointments Appointment[]
}

model Appointment {
  id        Int      @id @default(autoincrement())
  doctorId  Int
  patientId Int
  slotId    Int
  status    Status   @default(PENDING)
  description String?
}

enum Role {
  DOCTOR
  PATIENT
}

enum Status {
  PENDING
  CONFIRMED
  CANCELLED
  COMPLETED
}


# ----------------------------
# DATABASE (PostgreSQL + Prisma)
# ----------------------------
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/clinicdb?schema=public"

# Example:
# DATABASE_URL="postgresql://postgres:Bapu@123@localhost:5432/clinicdb?schema=public"


# ----------------------------
# JWT Secret (Authentication)
# ----------------------------
JWT_SECRET="your_super_secret_key_change_this"

# Use a long random string:
# JWT_SECRET="asjdh2318u23u1u2hj3123jh12u3jh12jh3jh123jh3123"


# ----------------------------
# NEXT.js Settings
# ----------------------------
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"


# ----------------------------
# Optional Email Config (Bonus)
# ----------------------------
# EMAIL_SERVER=""
# EMAIL_FROM=""

