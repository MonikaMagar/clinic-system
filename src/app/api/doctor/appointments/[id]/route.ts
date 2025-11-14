import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
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
    const apptId = Number(params.id);

    const appointment = await prisma.appointment.findUnique({
      where: {
        id: apptId,
        doctorId,
      },
      include: {
        patient: {
          include: { user: true },
        },
        slot: true,
      },
    });

    if (!appointment) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ appointment });
  } catch (err) {
    console.error("GET_APPOINTMENT_DETAIL_ERR:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
