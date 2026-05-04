import { useState } from "react"
import { randomizeRestaurant } from "@/lib/randomizer"

export function useRandomizer() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function runRandomizer(payload: any) {
    setLoading(true)
    setError(null)

    try {
      const data = await randomizeRestaurant(payload)
      setResult(data)
    } catch (err) {
      setError("Failed to fetch restaurant.")
    } finally {
      setLoading(false)
    }
  }

  return {
    result,
    loading,
    error,
    runRandomizer,
  }
}
