"use client"

import { useEffect, useState } from "react"
import { getRestaurants } from "@/lib/restaurants"

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        const data = await getRestaurants()
        setRestaurants(data)
      } catch (err) {
        setError("Failed to fetch restaurants")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return {
    restaurants,
    loading,
    error,
  }
}