import { CarProps } from "@/types";
import { CarsGrid } from "./cars-grid";
import { prisma } from "@/lib/prisma";
import { carSchema } from "@/types";

interface CarsSectionProps {
  title?: string;
  description?: string;
  limit?: number;
  showFilters?: boolean;
  showSearch?: boolean;
}

async function getCars(limit = 12): Promise<{ cars: CarProps[]; total: number }> {
  try {
    const [cars, total] = await Promise.all([
      prisma.car.findMany({
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.car.count(),
    ]);

    const transformedCars = cars.map((car) => ({
      id: car.id,
      city_mpg: car.cityMpg,
      class: car.class,
      combination_mpg: car.combinationMpg,
      cylinders: car.cylinders,
      displacement: car.displacement,
      drive: car.drive,
      fuel_type: car.fuelType,
      highway_mpg: car.highwayMpg,
      make: car.make,
      model: car.model,
      transmission: car.transmission,
      year: car.year,
      price_per_day: car.pricePerDay ?? undefined,
      available: car.available ?? undefined,
      description: car.description ?? undefined,
      images: car.images ? (car.images as string[]) : undefined,
      location: car.location ?? undefined,
    }));

    const validatedCars = transformedCars.map((car) => carSchema.parse(car));

    return { cars: validatedCars, total };
  } catch (error) {
    console.error("Error fetching cars:", error);
    return { cars: [], total: 0 };
  }
}

export async function CarsSection({
  title = "Our Fleet",
  description = "Discover our wide selection of premium vehicles",
  limit = 12,
  showFilters = false,
  showSearch = false,
}: CarsSectionProps) {
  const { cars, total } = await getCars(limit);

  if (cars.length === 0) {
    return (
      <section id="cars" className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-balance text-4xl font-medium lg:text-5xl">
              {title}
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              No cars available at the moment. Please check back later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="cars" className="py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-balance text-4xl font-medium lg:text-5xl">
            {title}
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">{description}</p>
        </div>

        <CarsGrid
          initialCars={cars}
          total={total}
          showFilters={showFilters}
          showSearch={showSearch}
        />
      </div>
    </section>
  );
}

