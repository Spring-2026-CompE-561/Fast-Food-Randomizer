"use client";

import { useEffect, useState } from "react";
import { getFavorites } from "@/lib/favorites";
import { getRestaurants } from "@/lib/restaurants";

export type FavoriteRestaurant = {
  id: number;
  name: string;
  cuisine: string;
  price_range: number;
  hours_display?: string | null;
};

type Restaurant = {
  id: number;
  name: string;
  cuisine: string;
  price_range: number;
  hours_display?: string | null;
};

type FavoriteEntry = {
  id: number;
  user_id: number;
  restaurant_id: number;
};

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteRestaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const favsRaw = await getFavorites();
        const favs = (Array.isArray(favsRaw) ? favsRaw : []) as FavoriteEntry[];
        const restaurants = (await getRestaurants()) as Restaurant[];

        const restaurantMap = new Map(restaurants.map((r) => [r.id, r]));

        const combined: FavoriteRestaurant[] = favs.map((f) => {
          const restaurant = restaurantMap.get(f.restaurant_id);
          const name = restaurant?.name ?? "Unknown";

          return {
            id: f.id,
            name,
            cuisine: restaurant?.cuisine ?? "Unknown",
            price_range: restaurant?.price_range ?? 1,
            hours_display: restaurant?.hours_display ?? null,
          };
        });

        setFavorites(combined);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to load favorites";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    void fetchData();
  }, []);

  return { favorites, loading, error };
}
