import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ---------------------------------------------------
// GET → get all slots OR get one slot
// ---------------------------------------------------
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const doctorId = searchParams.get("doctorId");
  const id = searchParams.get("id");

  // GET 1 slot by id
  if (id) {
    const slot = await prisma.slot.findUnique({
      where: { id },
    });

    return NextResponse.json(slot);
  }

  // GET all slots belonging to a doctor
  if (doctorId) {
    const slots = await prisma.slot.findMany({
      where: { doctorId: Number(doctorId) },
      orderBy: [
        { date: "asc" },
        { startTime: "asc" }
      ],
    });

    return NextResponse.json(slots);
  }

  return NextResponse.json(
    { error: "doctorId or id is required" },
    { status: 400 }
  );
}

// ---------------------------------------------------
// POST → create a new slot
// ---------------------------------------------------
export async function POST(req: Request) {
  const { doctorId, date, startTime, endTime } = await req.json();

  if (!doctorId || !date || !startTime || !endTime) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const slot = await prisma.slot.create({
    data: {
      doctorId: Number(doctorId),
      date,
      startTime,
      endTime,
    },
  });

  return NextResponse.json({ message: "Slot created", slot });
}

// ---------------------------------------------------
// DELETE → delete a slot
// ---------------------------------------------------
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Slot id is required" },
      { status: 400 }
    );
  }

  await prisma.slot.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Slot deleted" });
}
