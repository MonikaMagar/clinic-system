import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const today = new Date().toISOString().split("T")[0]; // "2025-02-15"

    // Load doctors + all slots
    const doctors = await prisma.doctor.findMany({
      include: {
        user: { select: { name: true, email: true } },
        slots: {
          orderBy: { date: "asc" },
        },
      },
    });

    const doctorList = await Promise.all(
      doctors.map(async (d) => {
        const slotsWithAvailability = await Promise.all(
          d.slots.map(async (s) => {
            const booked = await prisma.appointment.findFirst({
              where: {
                slotId: s.id,
                NOT: { status: "CANCELLED" },
              },
            });

            return {
              id: s.id,
              date: s.date,
              startTime: s.startTime,
              endTime: s.endTime,
              available: !booked,
            };
          })
        );

        return {
          id: d.id,
          name: d.user.name,
          email: d.user.email,
          specialization: d.specialization,
          bio: d.bio,
          contactInfo: d.contactInfo,

          // FILTER here because date is STRING
          slots: slotsWithAvailability.filter((slot) => slot.available && slot.date >= today),
        };
      })
    );

    return NextResponse.json({ doctors: doctorList });
  } catch (err) {
    console.error("GET_DOCTORS_ERR:", err);
    return NextResponse.json(
      { error: "Server error", details: String(err) },
      { status: 500 }
    );
  }
}
