"use client"

import { useRestaurants } from "@/hooks/use-restaurants"

export default function BrowsePage() {
  const { restaurants, loading, error } = useRestaurants()

  return (
    <div style={{ padding: "20px" }}>
      <h1>Browse Restaurants</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {restaurants.length > 0 && (
        <ul>
          {restaurants.map((r) => (
            <li key={r.id}>
              {r.name} - {r.cuisine} - Price: {r.price_range}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}