import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { appointmentId } = await req.json();

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { slot: true },
    });

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    // Check if already cancelled or completed
    if (appointment.status === "CANCELLED") {
      return NextResponse.json({ error: "Already cancelled" }, { status: 400 });
    }

    // Check time limit (cannot cancel after start)
    const appointmentDateTime = new Date(`${appointment.slot?.date}T${appointment.slot?.startTime}`);
    if (new Date() >= appointmentDateTime) {
      return NextResponse.json({ error: "Cannot cancel. Appointment time passed." }, { status: 400 });
    }

    // Update status
    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: "CANCELLED" },
    });

    return NextResponse.json({ message: "Appointment cancelled successfully" });

  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}
