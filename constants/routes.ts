/**
 * Application route constants
 * Centralized route definitions for consistency and maintainability
 */

export const ROUTES = {
  // Public routes
  HOME: "/",
  CARS: "/cars",
  CAR_DETAIL: (id: string) => `/cars/${id}`,
  BOOKINGS: "/bookings",
  BOOKING_DETAIL: (id: string) => `/bookings/${id}`,
  BOOKING_COMPLETE: (id: string) => `/bookings/${id}/complete`,
  
  // Auth routes
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  
  // Dashboard routes
  DASHBOARD: "/dashboard",
  DASHBOARD_CARS: "/dashboard/cars",
  DASHBOARD_BOOKINGS: "/dashboard/bookings",
  DASHBOARD_USERS: "/dashboard/users",
  DASHBOARD_ANALYTICS: "/dashboard/analytics",
} as const;

/**
 * API endpoint constants
 */
export const API_ENDPOINTS = {
  CARS: "/api/cars",
  CAR_DETAIL: (id: string) => `/api/cars/${id}`,
  BOOKINGS: "/api/bookings",
  BOOKING_DETAIL: (id: string) => `/api/bookings/${id}`,
  BOOKING_COMPLETE: (id: string) => `/api/bookings/${id}/complete`,
  FAVORITES: "/api/favorites",
  REVIEWS: "/api/reviews",
  AUTH: "/api/auth",
  ADMIN_CARS: "/api/admin/cars",
  ADMIN_CAR_DETAIL: (id: string) => `/api/admin/cars/${id}`,
  ADMIN_USERS: "/api/admin/users",
  ADMIN_USER_DETAIL: (id: string) => `/api/admin/users/${id}`,
} as const;

