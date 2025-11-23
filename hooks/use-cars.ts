"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { CarProps } from "@/types";
import { APP_CONFIG } from "@/constants/config";
import { API_ENDPOINTS } from "@/constants/routes";

interface UseCarsOptions {
  initialCars?: CarProps[];
  initialTotal?: number;
  limit?: number;
}

// Request cache to prevent duplicate requests
const requestCache = new Map<string, { data: { cars: CarProps[]; total: number }; timestamp: number }>();
const ACTIVE_REQUESTS = new Map<string, Promise<{ cars: CarProps[]; total: number }>>();

interface UseCarsReturn {
  cars: CarProps[];
  total: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useCars(options: UseCarsOptions = {}): UseCarsReturn {
  const { 
    initialCars = [], 
    initialTotal = 0, 
    limit = APP_CONFIG.DEFAULT_CAR_LIMIT 
  } = options;
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<CarProps[]>(initialCars);
  const [total, setTotal] = useState<number>(initialTotal);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const previousQueryKeyRef = useRef<string>("");

  // Memoize the query key from search params
  // Use a stable string representation to prevent unnecessary recalculations
  const queryKey = useMemo(() => {
    const params = new URLSearchParams();
    
    // Get all search params in a stable order
    const paramKeys = Array.from(searchParams.keys()).sort();
    paramKeys.forEach(key => {
      const value = searchParams.get(key);
      if (value) {
        params.set(key, value);
      }
    });
    
    // Always set limit and offset to ensure consistency
    params.set("limit", limit.toString());
    params.set("offset", "0");
    
    return params.toString();
  }, [searchParams, limit]);

  // Fetch function with caching and deduplication
  const fetchCars = useCallback(async (signal?: AbortSignal): Promise<void> => {
    // Check cache first
    const cached = requestCache.get(queryKey);
    if (cached && Date.now() - cached.timestamp < APP_CONFIG.CACHE_DURATION) {
      setCars(cached.data.cars);
      setTotal(cached.data.total);
      setError(null);
      return;
    }

    // Check if there's an active request for this query
    const activeRequest = ACTIVE_REQUESTS.get(queryKey);
    if (activeRequest) {
      try {
        const data = await activeRequest;
        setCars(data.cars);
        setTotal(data.total);
        setError(null);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err);
        }
      }
      return;
    }

    // Create new request
    const requestPromise = (async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.CARS}?${queryKey}`, {
          signal,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch cars: ${response.statusText}`);
        }

        const data = await response.json();
        const result = {
          cars: data.cars || [],
          total: data.total || 0,
        };

        // Cache the result
        requestCache.set(queryKey, {
          data: result,
          timestamp: Date.now(),
        });

        return result;
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          throw err;
        }
        throw err instanceof Error ? err : new Error("Unknown error occurred");
      } finally {
        ACTIVE_REQUESTS.delete(queryKey);
      }
    })();

    ACTIVE_REQUESTS.set(queryKey, requestPromise);

    try {
      setIsLoading(true);
      setError(null);
      const data = await requestPromise;
      setCars(data.cars);
      setTotal(data.total);
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err);
        console.error("Error fetching cars:", err);
      }
    } finally {
      setIsLoading(false);
    }
  }, [queryKey]);

  // Refetch function
  const refetch = useCallback(async () => {
    // Clear cache for this query
    requestCache.delete(queryKey);
    // Cancel any active request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    // Create new abort controller
    abortControllerRef.current = new AbortController();
    await fetchCars(abortControllerRef.current.signal);
  }, [queryKey, fetchCars]);

  // Effect to fetch when query changes
  useEffect(() => {
    // Skip if query key hasn't actually changed
    if (queryKey === previousQueryKeyRef.current) {
      return;
    }

    // Update the previous query key
    previousQueryKeyRef.current = queryKey;

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();
    fetchCars(abortControllerRef.current.signal);

    // Cleanup
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [queryKey, fetchCars]);

  return {
    cars,
    total,
    isLoading,
    error,
    refetch,
  };
}

