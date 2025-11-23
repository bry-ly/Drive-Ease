import { z } from "zod";

// Car schemas
export const createCarSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  class: z.string().min(1, "Class is required"),
  fuelType: z.string().min(1, "Fuel type is required"),
  cityMpg: z.number().int().positive("City MPG must be positive"),
  highwayMpg: z.number().int().positive("Highway MPG must be positive"),
  combinationMpg: z.number().int().positive("Combination MPG must be positive"),
  cylinders: z.number().int().positive("Cylinders must be positive"),
  displacement: z.number().positive("Displacement must be positive"),
  drive: z.string().min(1, "Drive type is required"),
  transmission: z.string().min(1, "Transmission is required"),
  pricePerDay: z.number().positive().default(50.0),
  available: z.boolean().default(true),
  description: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  images: z.array(z.string()).default([]),
});

export const updateCarSchema = z.object({
  make: z.string().min(1).optional(),
  model: z.string().min(1).optional(),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional(),
  pricePerDay: z.number().positive().optional(),
  available: z.boolean().optional(),
  class: z.string().min(1).optional(),
  fuelType: z.string().min(1).optional(),
  cityMpg: z.number().int().positive().optional(),
  highwayMpg: z.number().int().positive().optional(),
  combinationMpg: z.number().int().positive().optional(),
  cylinders: z.number().int().positive().optional(),
  displacement: z.number().positive().optional(),
  drive: z.string().min(1).optional(),
  transmission: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  images: z.array(z.string()).nullable().optional(),
});

export const carImageUploadSchema = z.object({
  carId: z.string().uuid(),
  image: z.instanceof(File).refine(
    (file) => file.size <= 5 * 1024 * 1024, // 5MB
    "Image size must be less than 5MB"
  ).refine(
    (file) => ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type),
    "Image must be JPEG, PNG, or WebP"
  ),
});

// Booking schemas
export const updateBookingStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
});

export const updateBookingSchema = z.object({
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  totalPrice: z.number().positive().optional(),
}).refine(
  (data) => {
    if (data.startDate && data.endDate) {
      return data.startDate < data.endDate;
    }
    return true;
  },
  {
    message: "End date must be after start date",
    path: ["endDate"],
  }
);

// User schemas
export const updateUserRoleSchema = z.object({
  role: z.enum(["user", "admin"]),
});

export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  role: z.enum(["user", "admin"]).optional(),
  image: z.string().url().nullable().optional(),
});

// Bulk operations
export const bulkDeleteSchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(100),
});

export const bulkUpdateCarSchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(100),
  data: updateCarSchema,
});

export const bulkUpdateBookingSchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(100),
  data: updateBookingStatusSchema,
});

