import { z } from "zod";

export const carSchema = z.object({
  id: z.string().optional(),
  city_mpg: z.number().int().positive(),
  class: z.string().min(1),
  combination_mpg: z.number().int().positive(),
  cylinders: z.number().int().positive(),
  displacement: z.number().positive(),
  drive: z.string().min(1),
  fuel_type: z.string().min(1),
  highway_mpg: z.number().int().positive(),
  make: z.string().min(1),
  model: z.string().min(1),
  transmission: z.string().min(1),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  price_per_day: z.number().positive().optional(),
  available: z.boolean().optional(),
  description: z.string().nullish(),
  images: z.array(z.string()).nullish(),
  location: z.string().nullish(),
});

export type CarProps = z.infer<typeof carSchema>;

export const bookingStatusSchema = z.enum([
  "pending",
  "confirmed",
  "completed",
  "cancelled",
]);

export const bookingSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  car_id: z.string(),
  start_date: z.date(),
  end_date: z.date(),
  total_price: z.number().positive(),
  status: bookingStatusSchema,
  created_at: z.date(),
  updated_at: z.date(),
});

export type BookingProps = z.infer<typeof bookingSchema>;

export const favoriteSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  car_id: z.string(),
  created_at: z.date(),
});

export type FavoriteProps = z.infer<typeof favoriteSchema>;

