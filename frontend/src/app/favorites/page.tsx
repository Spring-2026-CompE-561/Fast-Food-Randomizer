"use client";

import { Heart } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import RestaurantCard from "@/components/ui/RestaurantCard";
import { RestaurantCardGridSkeleton } from "@/components/ui/restaurant-card-skeleton";
import { useFavorites } from "@/hooks/use-favorites";
import {
  looksOnCampus,
  priceFromRange,
  restaurantCardMotionClass,
} from "@/lib/restaurant-card-helpers";

export default function FavoritesPage() {
  const { favorites, loading } = useFavorites();

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#E8F4FD] px-4 py-14 font-sans">
        <section className="text-center mb-16">
          <h1 className="text-7xl font-black text-[#111827]">Favorites</h1>
          <p className="mt-6 text-2xl text-[#334155]">Your saved restaurants</p>
        </section>

        <div className="w-full max-w-5xl mx-auto bg-white rounded-[30px] shadow-xl p-10">
          <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
            <Heart size={52} className="text-accent shrink-0" aria-hidden />
            Saved Places
          </h2>

          {loading && <RestaurantCardGridSkeleton count={4} />}

          {!loading && favorites.length === 0 && (
            <div className="text-lg text-gray-500">
              No favorites yet — start exploring!
            </div>
          )}

          {!loading && favorites.length > 0 && (
            <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 gap-8">
              {favorites.map((r) => (
                <RestaurantCard
                  key={r.id}
                  name={r.name}
                  price={priceFromRange(r.price_range)}
                  category={r.cuisine}
                  onCampus={looksOnCampus(r.name)}
                  className={restaurantCardMotionClass}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
