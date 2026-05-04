"use client"

import { useEffect, useState } from "react"
import { getFavorites } from "@/lib/favorites"
import { getRestaurants } from "@/lib/restaurants"

type Restaurant = {
  id: number;
  name: string;
  cuisine: string;
  price_range: number;
};

type FavoriteEntry = {
  id: number;
  user_id: number;
  restaurant_id: number;
};

export function useFavorites() {
  const [favorites, setFavorites] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        const favs = (await getFavorites()) as FavoriteEntry[];
        const restaurants = (await getRestaurants()) as Restaurant[];

        const restaurantMap = new Map(
          restaurants.map((r: any) => [r.id, r])
        )

        const combined = favs.map((f: any) => {
          const restaurant = restaurantMap.get(f.restaurant_id)

          return {
            name: restaurant?.name ?? "Unknown",
            emoji: "🍽️",
            rating: 4.5,
            reviews: 100,
            price: "$".repeat(restaurant?.price_range ?? 1),
            category: restaurant?.cuisine ?? "Unknown",
            onCampus: true,
            restaurant_id: f.restaurant_id,
          }
        })

        setFavorites(combined)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { favorites, loading, error }
}