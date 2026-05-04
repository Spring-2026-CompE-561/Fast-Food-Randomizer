"use client";

import { useState } from "react";
import { randomizeRestaurant } from "@/lib/randomizer"

export function useRandomizer() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function runRandomizer(payload: unknown) {
    setLoading(true)
    setError(null)

    try {
      const data = await randomizeRestaurant(payload)
      setResult(data)
      return { ok: true as const, data }
    } catch {
      const msg = "We couldn’t pick a spot this time. Try again?"
      setError(msg)
      return { ok: false as const, error: msg }
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