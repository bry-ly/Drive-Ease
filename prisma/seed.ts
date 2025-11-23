import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const cars = [
  {
    cityMpg: 23,
    class: "midsize",
    combinationMpg: 25,
    cylinders: 4,
    displacement: 2.0,
    drive: "fwd",
    fuelType: "gas",
    highwayMpg: 28,
    make: "Toyota",
    model: "Camry",
    transmission: "a",
    year: 2023,
  },
  {
    cityMpg: 28,
    class: "compact",
    combinationMpg: 30,
    cylinders: 4,
    displacement: 1.8,
    drive: "fwd",
    fuelType: "gas",
    highwayMpg: 33,
    make: "Honda",
    model: "Civic",
    transmission: "a",
    year: 2024,
  },
  {
    cityMpg: 18,
    class: "suv",
    combinationMpg: 20,
    cylinders: 6,
    displacement: 3.5,
    drive: "awd",
    fuelType: "gas",
    highwayMpg: 23,
    make: "Ford",
    model: "Explorer",
    transmission: "a",
    year: 2023,
  },
  {
    cityMpg: 30,
    class: "compact",
    combinationMpg: 33,
    cylinders: 4,
    displacement: 2.0,
    drive: "fwd",
    fuelType: "hybrid",
    highwayMpg: 36,
    make: "Toyota",
    model: "Prius",
    transmission: "a",
    year: 2024,
  },
  {
    cityMpg: 20,
    class: "sports car",
    combinationMpg: 22,
    cylinders: 6,
    displacement: 3.0,
    drive: "rwd",
    fuelType: "gas",
    highwayMpg: 25,
    make: "BMW",
    model: "3 Series",
    transmission: "a",
    year: 2023,
  },
  {
    cityMpg: 25,
    class: "midsize",
    combinationMpg: 27,
    cylinders: 4,
    displacement: 2.5,
    drive: "fwd",
    fuelType: "gas",
    highwayMpg: 30,
    make: "Nissan",
    model: "Altima",
    transmission: "a",
    year: 2024,
  },
  {
    cityMpg: 15,
    class: "pickup",
    combinationMpg: 17,
    cylinders: 8,
    displacement: 5.7,
    drive: "4wd",
    fuelType: "gas",
    highwayMpg: 20,
    make: "Ram",
    model: "1500",
    transmission: "a",
    year: 2023,
  },
  {
    cityMpg: 26,
    class: "compact",
    combinationMpg: 28,
    cylinders: 4,
    displacement: 2.0,
    drive: "fwd",
    fuelType: "gas",
    highwayMpg: 31,
    make: "Mazda",
    model: "CX-5",
    transmission: "a",
    year: 2024,
  },
  {
    cityMpg: 22,
    class: "suv",
    combinationMpg: 24,
    cylinders: 6,
    displacement: 3.6,
    drive: "awd",
    fuelType: "gas",
    highwayMpg: 27,
    make: "Jeep",
    model: "Grand Cherokee",
    transmission: "a",
    year: 2023,
  },
  {
    cityMpg: 32,
    class: "compact",
    combinationMpg: 35,
    cylinders: 4,
    displacement: 1.6,
    drive: "fwd",
    fuelType: "hybrid",
    highwayMpg: 38,
    make: "Hyundai",
    model: "Elantra Hybrid",
    transmission: "a",
    year: 2024,
  },
  {
    cityMpg: 19,
    class: "luxury",
    combinationMpg: 21,
    cylinders: 6,
    displacement: 3.0,
    drive: "awd",
    fuelType: "gas",
    highwayMpg: 24,
    make: "Mercedes-Benz",
    model: "C-Class",
    transmission: "a",
    year: 2023,
  },
  {
    cityMpg: 24,
    class: "midsize",
    combinationMpg: 26,
    cylinders: 4,
    displacement: 2.4,
    drive: "fwd",
    fuelType: "gas",
    highwayMpg: 29,
    make: "Kia",
    model: "Optima",
    transmission: "a",
    year: 2024,
  },
];

async function main() {
  console.log("🌱 Starting seed...");

  for (const car of cars) {
    const created = await prisma.car.upsert({
      where: {
        id: `${car.make}-${car.model}-${car.year}`
          .toLowerCase()
          .replace(/\s+/g, "-"),
      },
      update: car,
      create: {
        ...car,
        id: `${car.make}-${car.model}-${car.year}`
          .toLowerCase()
          .replace(/\s+/g, "-"),
      },
    });
    console.log(
      `✅ Seeded car: ${created.make} ${created.model} ${created.year}`
    );
  }

  console.log("✨ Seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

