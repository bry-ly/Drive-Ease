import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-utils";
import { updateBookingStatusSchema, updateBookingSchema } from "@/lib/schemas/admin";
import { z } from "zod";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();
    const body = await request.json();
    
    // Try full update schema first, fallback to status-only
    let validatedData;
    try {
      validatedData = updateBookingSchema.parse(body);
    } catch {
      validatedData = updateBookingStatusSchema.parse(body);
    }

    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: {
        car: {
          select: { make: true, model: true, year: true },
        },
        user: {
          select: { name: true, email: true },
        },
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // Transform data for Prisma
    const prismaData: {
      status?: string;
      startDate?: Date;
      endDate?: Date;
      totalPrice?: number;
    } = {};
    if (validatedData.status !== undefined) prismaData.status = validatedData.status;
    if (validatedData.startDate !== undefined) prismaData.startDate = validatedData.startDate;
    if (validatedData.endDate !== undefined) prismaData.endDate = validatedData.endDate;
    if (validatedData.totalPrice !== undefined) prismaData.totalPrice = validatedData.totalPrice;

    const updatedBooking = await prisma.booking.update({
      where: { id: params.id },
      data: prismaData,
      include: {
        car: {
          select: { make: true, model: true, year: true },
        },
        user: {
          select: { name: true, email: true },
        },
      },
    });

    return NextResponse.json({ booking: updatedBooking, success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}
