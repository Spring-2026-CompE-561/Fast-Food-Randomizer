"use client"

import { Heart } from "lucide-react"
import { useState } from "react"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([1, 2])

  const restaurants = [
    { id: 1, name: "Chipotle", cuisine: "Mexican" },
    { id: 2, name: "Chick-fil-A", cuisine: "Fast Food" },
    { id: 3, name: "Panda Express", cuisine: "Chinese" }
  ]

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id]
    )
  }

  return (
    <main className="min-h-screen bg-[#E8F4FD] px-4 py-14 font-sans">
      <section className="text-center mb-16">
        <h1 className="text-7xl font-black text-[#111827]">Favorites</h1>
        <p className="mt-6 text-2xl text-[#334155]">
          Your saved restaurants
        </p>
      </section>

      <div className="w-full max-w-5xl mx-auto bg-white rounded-[30px] shadow-xl p-10">
        <h2 className="text-3xl font-black mb-8">Saved Places</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {restaurants.map((r) => (
            <div
              key={r.id}
              className="bg-gray-50 rounded-2xl p-6 shadow-md relative"
            >
              <h3 className="text-xl font-bold">{r.name}</h3>
              <p className="text-gray-600">{r.cuisine}</p>

              {/* Heart Button */}
              <button
                onClick={() => toggleFavorite(r.id)}
                className="absolute top-4 right-4"
              >
                <Heart
                  className={
                    favorites.includes(r.id)
                      ? "text-red-500 fill-red-500"
                      : "text-gray-400"
                  }
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}