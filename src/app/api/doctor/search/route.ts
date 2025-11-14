import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: Request) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const token = auth.replace("Bearer ", "");
    const decoded: any = verifyToken(token);

    if (!decoded || decoded.role !== "DOCTOR") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const doctorId = decoded.doctorId;
    const { search, status, date } = Object.fromEntries(new URL(req.url).searchParams);

    let filters: any = { doctorId };

    if (status && status !== "ALL") filters.status = status;

    const appointments = await prisma.appointment.findMany({
      where: {
        ...filters,
        ...(search
          ? {
              patient: {
                user: {
                  name: { contains: search, mode: "insensitive" },
                },
              },
            }
          : {}),
      },
      include: {
        patient: { include: { user: true } },
        slot: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const filtered = date
      ? appointments.filter(
          (a: any) =>
            new Date(a.slot.startTime).toDateString() ===
            new Date(date).toDateString()
        )
      : appointments;

    return NextResponse.json({ appointments: filtered });
  } catch (err) {
    console.error("SEARCH_ERROR:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
