/**
 * Application configuration constants
 */

export const APP_CONFIG = {
  NAME: "Drive Ease",
  DESCRIPTION: "Rent Your Perfect Car Today",
  DEFAULT_CAR_LIMIT: 12,
  DEFAULT_PAGE_SIZE: 12,
  CACHE_DURATION: 5000, // 5 seconds in milliseconds
} as const;

export const SORT_OPTIONS = {
  NEWEST_FIRST: "created_at_desc",
  OLDEST_FIRST: "created_at_asc",
  PRICE_LOW_TO_HIGH: "price_asc",
  PRICE_HIGH_TO_LOW: "price_desc",
  YEAR_NEWEST: "year_desc",
  YEAR_OLDEST: "year_asc",
  MPG_HIGHEST: "combination_mpg_desc",
  MPG_LOWEST: "combination_mpg_asc",
  MAKE_A_TO_Z: "make_asc",
  MAKE_Z_TO_A: "make_desc",
} as const;

export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export const BOOKING_STATUS_LABELS = {
  [BOOKING_STATUS.PENDING]: "Pending",
  [BOOKING_STATUS.CONFIRMED]: "Confirmed",
  [BOOKING_STATUS.COMPLETED]: "Completed",
  [BOOKING_STATUS.CANCELLED]: "Cancelled",
} as const;

