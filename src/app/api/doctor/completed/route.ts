import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: Request) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = auth.replace("Bearer ", "");
    const decoded: any = verifyToken(token);

    if (!decoded || decoded.role !== "DOCTOR") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const doctorId = decoded.doctorId;

    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        status: "COMPLETED",
      },
      include: {
        patient: { include: { user: true } },
        slot: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ appointments });
  } catch (err) {
    console.error("GET_COMPLETED_APPTS_ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
