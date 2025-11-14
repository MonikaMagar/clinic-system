import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: Request) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const token = auth.replace("Bearer ", "");
    let decoded: any = null;

    try {
      decoded = verifyToken(token);
    } catch (err) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }

    if (!decoded || decoded.role !== "DOCTOR") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!decoded.doctorId) {
      return NextResponse.json(
        { error: "doctorId missing in token" },
        { status: 400 }
      );
    }

    const appointments = await prisma.appointment.findMany({
      where: { doctorId: decoded.doctorId || 0 },
      include: {
        patient: { include: { user: true } },
        slot: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ appointments });
  } catch (err) {
    console.error("REPORT_ERROR:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
