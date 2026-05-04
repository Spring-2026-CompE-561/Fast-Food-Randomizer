"use client";

import { useState } from "react";

export type FavoriteRestaurant = {
  id: number;
  name: string;
  cuisine: string;
  price_range: number;
};

/**
 * Saved favorites for the current user. Empty until the favorites API is wired.
 */
export function useFavorites() {
  const [favorites] = useState<FavoriteRestaurant[]>([]);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  return { favorites, loading, error };
}
