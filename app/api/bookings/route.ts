import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-utils";
import { bookingSchema } from "@/types";
import { z } from "zod";

const createBookingSchema = z.object({
  carId: z.string(),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().transform((str) => new Date(str)),
});

export async function GET() {
  try {
    const user = await requireAuth();

    const bookings = await prisma.booking.findMany({
      where: { userId: user.id },
      include: {
        car: {
          select: {
            id: true,
            make: true,
            model: true,
            year: true,
            pricePerDay: true,
            images: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const transformedBookings = bookings.map((booking) => ({
      id: booking.id,
      user_id: booking.userId,
      car_id: booking.carId,
      start_date: booking.startDate,
      end_date: booking.endDate,
      total_price: booking.totalPrice,
      status: booking.status,
      created_at: booking.createdAt,
      updated_at: booking.updatedAt,
      car: booking.car,
    }));

    return NextResponse.json({ bookings: transformedBookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const { carId, startDate, endDate } = createBookingSchema.parse(body);

    // Validate dates
    if (startDate >= endDate) {
      return NextResponse.json(
        { error: "End date must be after start date" },
        { status: 400 }
      );
    }

    if (startDate < new Date()) {
      return NextResponse.json(
        { error: "Start date cannot be in the past" },
        { status: 400 }
      );
    }

    // Check for conflicting bookings
    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        carId,
        status: { in: ["pending", "confirmed"] },
        OR: [
          {
            startDate: { lte: endDate },
            endDate: { gte: startDate },
          },
        ],
      },
    });

    if (conflictingBooking) {
      return NextResponse.json(
        { error: "Car is not available for the selected dates" },
        { status: 400 }
      );
    }

    // Get car price
    const car = await prisma.car.findUnique({
      where: { id: carId },
      select: { pricePerDay: true },
    });

    if (!car) {
      return NextResponse.json(
        { error: "Car not found" },
        { status: 404 }
      );
    }

    // Calculate total price
    const days = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = car.pricePerDay * days;

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        carId,
        startDate,
        endDate,
        totalPrice,
        status: "pending",
      },
      include: {
        car: {
          select: {
            id: true,
            make: true,
            model: true,
            year: true,
          },
        },
      },
    });

    const transformedBooking = {
      id: booking.id,
      user_id: booking.userId,
      car_id: booking.carId,
      start_date: booking.startDate,
      end_date: booking.endDate,
      total_price: booking.totalPrice,
      status: booking.status,
      created_at: booking.createdAt,
      updated_at: booking.updatedAt,
    };

    return NextResponse.json(
      { booking: transformedBooking },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

