import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role.toUpperCase() === "DOCTOR" ? "DOCTOR" : "PATIENT",
      },
    });

    // Doctor profile
    if (role.toUpperCase() === "DOCTOR") {
      await prisma.doctor.create({
        data: {
          userId: user.id,
          specialization: "",
          bio: "",
          contactInfo: "",
        },
      });
    } else {
      // Patient
      await prisma.patient.create({
        data: { userId: user.id },
      });
    }

    return NextResponse.json({ message: "Signup successful" }, { status: 201 });

  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
