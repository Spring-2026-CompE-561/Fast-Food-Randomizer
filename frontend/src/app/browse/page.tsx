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



"use client"

import { useRestaurants } from "@/hooks/use-restaurants"

export default function BrowsePage() {
  const { restaurants, loading, error } = useRestaurants()

  return (
    <div className="min-h-screen bg-[#E8F4FD] px-6 py-12 font-sans">

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-black text-[#111827]">
          Browse Restaurants
        </h1>
        <p className="mt-4 text-xl text-[#475569]">
          Explore all dining options near SDSU
        </p>
      </div>

      {/* Loading + Error */}
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">

        {restaurants.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-2xl p-6 shadow-md"
          >
            <h2 className="text-xl font-bold text-[#111827]">
              {r.name}
            </h2>
            <p className="text-[#64748B]">
              {r.cuisine}
            </p>
            <p className="text-[#94A3B8]">
              Price: {r.price_range}
            </p>
          </div>
        ))}

      </div>
    </div>
  )
}