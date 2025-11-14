import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const patientId = searchParams.get("patientId");

    if (!patientId) {
      return NextResponse.json({ error: "patientId is required" }, { status: 400 });
    }

    const appointments = await prisma.appointment.findMany({
      where: { patientId: Number(patientId) },
      include: {
        doctor: {
          include: {
            user: true,
          },
        },
        slot: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ appointments });
  } catch (error) {
    return NextResponse.json(
      { error: "Server Error", details: String(error) },
      { status: 500 }
    );
  }
}
