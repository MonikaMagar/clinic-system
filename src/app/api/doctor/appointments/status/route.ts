import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/auth";

export async function PUT(req: Request) {
  const user = getUser(req);
  if (!user || user.role !== "DOCTOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { appointmentId, status } = await req.json();

  const validStatus = ["CONFIRMED", "CANCELLED", "COMPLETED"];

  if (!validStatus.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const updated = await prisma.appointment.update({
    where: { id: appointmentId },
    data: { status },
  });

  return NextResponse.json({ message: "Status Updated", updated });
}
