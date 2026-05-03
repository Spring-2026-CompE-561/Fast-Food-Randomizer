"use client"

import { useRandomizer } from "@/hooks/use-randomizer"

export default function RandomizerPage() {
  const { result, loading, error, runRandomizer } = useRandomizer()

  function handleClick() {
    runRandomizer({
      latitude: null,
      longitude: null,
      cuisine: null,
      price_range: null,
      dietary_tags: null,
      radius_miles: 1,
      user_id: null,
    })
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Randomizer Test Page</h1>

      <button onClick={handleClick}>
        Randomize
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>{result.name}</h2>
          <p>{result.cuisine}</p>
          <p>Price: {result.price_range}</p>
          <p>Matches: {result.match_count}</p>
        </div>
      )}
    </div>
  )
}