"use client"

import { useEffect, useState } from "react"
import { getHistory } from "@/lib/history"
import { getRestaurants } from "@/lib/restaurants"
import { looksOnCampus, priceFromRange } from "@/lib/restaurant-card-helpers"

type Restaurant = {
  id: number;
  name: string;
  cuisine: string;
  price_range: number;
  hours_display?: string | null;
};

type HistoryEntry = {
  id: number;
  user_id: number;
  restaurant_id: number;
  selected_at: string;
};

export function useHistory() {
  const [historyItems, setHistoryItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        const history = (await getHistory()) as HistoryEntry[];
        const restaurants = (await getRestaurants()) as Restaurant[];

        // map restaurant_id → restaurant data
        const restaurantMap = new Map(
          restaurants.map((r: any) => [r.id, r])
        )

        const combined = history.map((h: any) => {
          const restaurant = restaurantMap.get(h.restaurant_id)
          const name = restaurant?.name ?? "Unknown"

          return {
            name,
            price: priceFromRange(restaurant?.price_range),
            category: restaurant?.cuisine ?? "Unknown",
            onCampus: looksOnCampus(name),
            hours_display: restaurant?.hours_display ?? null,
          }
        })

        setHistoryItems(combined)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { historyItems, loading, error }
}