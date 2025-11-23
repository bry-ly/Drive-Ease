import HeroSection from "@/components/layout/hero-section"
import Features from "@/components/layout/features"
import { CarsSection } from "@/components/cars/cars-section"
import { CarSearch } from "@/components/cars/car-search"
import { CarFilters } from "@/components/cars/car-filters"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Search, TrendingUp, Star, Users } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth-utils"
import FooterSection from "@/components/layout/footer"
import { PrismaClient } from "@prisma/client"

const basePrisma = prisma as unknown as PrismaClient

export default async function Home() {
  const user = await getCurrentUser().catch(() => null);
  
  // Get some stats and cars for the homepage
  let totalCars = 0;
  let totalBookings = 0;
  let carsForFilters: Array<{
    make: string;
    class: string;
    fuelType: string;
    drive: string;
    transmission: string;
    year: number;
    cityMpg: number;
    highwayMpg: number;
    combinationMpg: number;
  }> = [];

  try {
    [totalCars, totalBookings, carsForFilters] = await Promise.all([
      basePrisma.car.count(),
      basePrisma.booking.count(),
      basePrisma.car.findMany({
        select: {
          make: true,
          class: true,
          fuelType: true,
          drive: true,
          transmission: true,
          year: true,
          cityMpg: true,
          highwayMpg: true,
          combinationMpg: true,
        },
        take: 100,
      }),
    ]);
  } catch (error) {
    // If Prisma client not regenerated, just get cars
    try {
      totalCars = await basePrisma.car.count();
      carsForFilters = await basePrisma.car.findMany({
      select: {
        make: true,
        class: true,
        fuelType: true,
        drive: true,
        transmission: true,
        year: true,
        cityMpg: true,
        highwayMpg: true,
        combinationMpg: true,
      },
      take: 100,
      });
    } catch {
      totalCars = 0;
      carsForFilters = [];
    }
  }

  // Transform cars for filters component
  const filterCars = carsForFilters.map((car: {
    make: string;
    class: string;
    fuelType: string;
    drive: string;
    transmission: string;
    year: number;
    cityMpg: number;
    highwayMpg: number;
    combinationMpg: number;
  }) => ({
    make: car.make,
    class: car.class,
    fuel_type: car.fuelType,
    drive: car.drive,
    transmission: car.transmission,
    year: car.year,
    price_per_day: 50, // Default price until Prisma is regenerated
    city_mpg: car.cityMpg,
    highway_mpg: car.highwayMpg,
    combination_mpg: car.combinationMpg,
  }));

  return (
    <main>
      <HeroSection />
      <CarsSection 
        title="Our Fleet"
        description="Discover our wide selection of premium vehicles for every journey"
        limit={12}
        showFilters={true}
        showSearch={true}
      />
      <Features />
      <FooterSection />
    </main>
  )
}
