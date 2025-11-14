import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: Request) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const token = auth.replace("Bearer ", "");
    const decoded: any = verifyToken(token);

    if (!decoded || decoded.role !== "DOCTOR")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const doctorId = decoded.doctorId;

    // COUNT APPOINTMENTS
    const total = await prisma.appointment.count({ where: { doctorId } });
    const pending = await prisma.appointment.count({
      where: { doctorId, status: "PENDING" },
    });
    const approved = await prisma.appointment.count({
      where: { doctorId, status: "CONFIRMED" },
    });
    const cancelled = await prisma.appointment.count({
      where: { doctorId, status: "CANCELLED" },
    });
    const completed = await prisma.appointment.count({
      where: { doctorId, status: "COMPLETED" },
    });

    return NextResponse.json({
      total,
      pending,
      approved,
      cancelled,
      completed,
    });
  } catch (err) {
    console.error("DASH_ERR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
