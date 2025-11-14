import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { doctorId, slotId, patientId } = await req.json();

    if (!doctorId || !slotId || !patientId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // check if slot already booked
    const existing = await prisma.appointment.findFirst({
      where: {
        slotId,
        NOT: { status: "CANCELLED" },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Slot already booked" },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        doctorId: Number(doctorId),
        patientId: Number(patientId),
        slotId,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, appointment });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server Error", details: String(err) },
      { status: 500 }
    );
  }
}
