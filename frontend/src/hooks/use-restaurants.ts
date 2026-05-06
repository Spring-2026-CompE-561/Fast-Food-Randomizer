"use client";

import { useCallback, useEffect, useState } from "react";
import { getRestaurants } from "@/lib/restaurants";

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getRestaurants();
      setRestaurants(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to fetch restaurants");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const reloadSilent = useCallback(async () => {
    try {
      const data = await getRestaurants();
      setRestaurants(Array.isArray(data) ? data : []);
    } catch {
      /* keep existing list */
    }
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") void reloadSilent();
    }, 30000);
    return () => window.clearInterval(id);
  }, [reloadSilent]);

  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === "visible") void reloadSilent();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [reloadSilent]);

  return {
    restaurants,
    loading,
    error,
    reload,
  };
}
