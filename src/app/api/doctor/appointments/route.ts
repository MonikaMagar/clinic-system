import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/auth";

export async function GET(req: Request) {
  const user = getUser(req);
  if (!user || user.role !== "DOCTOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const appointments = await prisma.appointment.findMany({
    where: { doctorId: user.userId },
    include: {
      patient: { include: { user: true } },
      slot: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(appointments);
}
