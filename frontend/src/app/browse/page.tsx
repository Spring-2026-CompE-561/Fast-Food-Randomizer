"use client"

import { useRestaurants } from "@/hooks/use-restaurants"

export default function BrowsePage() {
  const { restaurants, loading, error } = useRestaurants()

  return (
    <div className="min-h-screen bg-[#E8F4FD] px-6 py-12 font-sans">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-black text-[#111827]">Browse Restaurants</h1>
        <p className="mt-4 text-xl text-[#475569]">Explore all dining options near SDSU</p>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {restaurants.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-[#111827]">{r.name}</h2>
            <p className="text-[#64748B]">{r.cuisine}</p>
            <p className="text-[#94A3B8]">Price: {r.price_range}</p>
          </div>
        ))}
      </div>
    </div>
  )
}