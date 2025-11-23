import { requireAuth } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BookingCompleteForm } from "@/components/bookings/booking-complete-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { generateCarImageUrl } from "@/lib/utils";
import {
  IconCalendar,
  IconCurrencyPeso,
  IconArrowLeft,
  IconCheck,
} from "@tabler/icons-react";

const basePrisma = prisma as unknown as PrismaClient;

export default async function BookingCompletePage({
  params,
}: {
  params: { id: string };
}) {
  const user = await requireAuth();

  const booking = await basePrisma.booking.findUnique({
    where: { id: params.id },
    include: {
      car: {
        select: {
          id: true,
          make: true,
          model: true,
          year: true,
          images: true,
          pricePerDay: true,
          class: true,
          fuelType: true,
        },
      },
    },
  });

  if (!booking || booking.userId !== user.id) {
    notFound();
  }

  const days = Math.ceil(
    (booking.endDate.getTime() - booking.startDate.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const carImages = Array.isArray(booking.car.images)
    ? booking.car.images.filter((img): img is string => typeof img === "string")
    : typeof booking.car.images === "string"
    ? [booking.car.images]
    : [];

  const imageUrl =
    carImages.length > 0
      ? carImages[0]
      : generateCarImageUrl({
          make: booking.car.make,
          model: booking.car.model,
          year: booking.car.year,
        });

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12 lg:py-16">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/bookings">
              <IconArrowLeft className="mr-2 size-4" />
              Back to Bookings
            </Link>
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2 md:text-4xl">
              Complete Your Booking
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Provide additional information to finalize your rental
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <IconCheck className="size-4" />
            </div>
            <span className="hidden text-sm font-medium sm:inline">Booking Created</span>
          </div>
          <div className="h-px w-12 bg-primary" />
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full border-2 border-primary bg-primary text-primary-foreground">
              <span className="text-sm font-medium">2</span>
            </div>
            <span className="hidden text-sm font-medium sm:inline">Complete Info</span>
          </div>
          <div className="h-px w-12 bg-muted" />
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full border-2 border-muted bg-muted text-muted-foreground">
              <span className="text-sm font-medium">3</span>
            </div>
            <span className="hidden text-sm font-medium sm:inline">Confirmation</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
          {/* Booking Summary Card */}
          <Card className="lg:col-span-1 lg:sticky lg:top-4 lg:h-fit">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
              <CardDescription>Review your rental details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Car Image */}
              <div className="relative w-full h-48 rounded-lg overflow-hidden bg-muted">
                <Image
                  src={imageUrl}
                  alt={`${booking.car.make} ${booking.car.model}`}
                  fill
                  className="object-cover"
                  unoptimized={imageUrl.startsWith("/uploads/")}
                />
              </div>

              {/* Car Info */}
              <div>
                <h3 className="font-bold text-xl mb-2 capitalize">
                  {booking.car.make} {booking.car.model}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">{booking.car.year}</Badge>
                  {booking.car.class && (
                    <Badge variant="outline" className="capitalize">
                      {booking.car.class}
                    </Badge>
                  )}
                  {booking.car.fuelType && (
                    <Badge variant="outline" className="capitalize">
                      {booking.car.fuelType}
                    </Badge>
                  )}
                  <Badge
                    variant={
                      booking.status === "confirmed"
                        ? "default"
                        : booking.status === "pending"
                        ? "secondary"
                        : "outline"
                    }
                    className="capitalize"
                  >
                    {booking.status}
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* Booking Details */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <IconCalendar className="size-5 text-muted-foreground mt-0.5 shrink-0" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Rental Period</p>
                    <div className="text-sm text-muted-foreground space-y-0.5">
                      <p>
                        <span className="font-medium">From:</span>{" "}
                        {format(booking.startDate, "PPP")}
                      </p>
                      <p>
                        <span className="font-medium">To:</span>{" "}
                        {format(booking.endDate, "PPP")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <IconCalendar className="size-5 text-muted-foreground mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Duration</p>
                    <p className="text-sm text-muted-foreground">
                      {days} {days === 1 ? "day" : "days"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <IconCurrencyPeso className="size-5 text-muted-foreground mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Price Breakdown</p>
                    <div className="text-sm text-muted-foreground space-y-0.5 mt-1">
                      <div className="flex justify-between">
                        <span>Daily rate:</span>
                        <span>₱{booking.car.pricePerDay.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Days:</span>
                        <span>{days}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Total Price */}
              <div className="flex items-baseline justify-between">
                <span className="text-base font-semibold">Total Price</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-semibold text-muted-foreground">
                    ₱
                  </span>
                  <span className="text-2xl font-bold">
                    {booking.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button asChild variant="outline" className="w-full">
                <Link href={`/cars/${booking.car.id}`}>
                  View Car Details
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Additional Information Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>
                Help us prepare for your rental experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BookingCompleteForm bookingId={booking.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
