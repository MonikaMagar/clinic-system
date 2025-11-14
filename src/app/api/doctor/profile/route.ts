import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/auth";

export async function GET(req: Request) {
  const user = getUser(req);
  if (!user || user.role !== "DOCTOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const doctor = await prisma.doctor.findUnique({
    where: { userId: user.userId },
  });

  return NextResponse.json(doctor);
}

export async function PUT(req: Request) {
  const user = getUser(req);
  if (!user || user.role !== "DOCTOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { specialization, bio, contactInfo } = await req.json();

  const updated = await prisma.doctor.update({
    where: { userId: user.userId },
    data: { specialization, bio, contactInfo },
  });

  return NextResponse.json({ message: "Profile updated", updated });
}
