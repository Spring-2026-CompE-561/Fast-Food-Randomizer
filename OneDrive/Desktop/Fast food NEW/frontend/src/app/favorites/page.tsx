"use client";

import { useState } from "react";
import { Heart, Plus } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import RestaurantCard from "@/components/ui/RestaurantCard";
import { RestaurantCardGridSkeleton } from "@/components/ui/restaurant-card-skeleton";
import { useFavorites } from "@/hooks/use-favorites";
import { useHistory } from "@/hooks/use-history";
import { addFavorite, removeFavorite } from "@/lib/favorites";
import {
  looksOnCampus,
  priceFromRange,
  restaurantCardMotionClass,
} from "@/lib/restaurant-card-helpers";

export default function FavoritesPage() {
  const { favorites, loading, error } = useFavorites();
  const { historyItems } = useHistory();
  const [removing, setRemoving] = useState<number | null>(null);
  const [adding, setAdding] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  async function handleRemove(id: number) {
    setRemoving(id);
    try {
      await removeFavorite(id);
      window.location.reload();
    } catch {
      setRemoving(null);
    }
  }

  async function handleQuickAdd(restaurantName: string) {
    setAdding(restaurantName);
    setSuccessMsg(null);
    try {
      await addFavorite(0); // replace 0 with actual restaurant_id if available
      setSuccessMsg(`${restaurantName} added to favorites!`);
    } catch {
      // silently fail
    } finally {
      setAdding(null);
    }
  }

  // filter history items not already in favorites
  const favoriteNames = new Set(favorites.map((f) => f.name));
  const recentNotFavorited = historyItems
    .filter((h) => !favoriteNames.has(h.name))
    .slice(0, 4);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#E8F4FD] px-4 py-14 font-sans">
        <section className="text-center mb-16">
          <h1 className="text-7xl font-black text-[#111827]">Favorites</h1>
          <p className="mt-6 text-2xl text-[#334155]">Your saved restaurants</p>
        </section>

        <div className="w-full max-w-5xl mx-auto bg-white rounded-[30px] shadow-xl p-10 mb-10">
          <h2 className="text-3xl font-black mb-8 flex items-center justify-center gap-3">
            <Heart size={52} className="text-accent shrink-0" aria-hidden />
            Saved Places
          </h2>

          {error && (
            <p className="mb-6 text-center text-sm font-medium text-destructive">{error}</p>
          )}

          {loading && <RestaurantCardGridSkeleton count={4} />}

          {!loading && !error && favorites.length === 0 && (
            <div className="text-lg text-gray-500 text-center">
              No favorites yet — start exploring!
            </div>
          )}

          {!loading && !error && favorites.length > 0 && (
            <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 gap-8">
              {favorites.map((r) => (
                <div key={r.id} className="w-full flex flex-col items-center gap-2">
                  <RestaurantCard
                    name={r.name}
                    price={priceFromRange(r.price_range)}
                    category={r.cuisine}
                    onCampus={looksOnCampus(r.name)}
                    className={restaurantCardMotionClass}
                  />
                  <button
                    onClick={() => handleRemove(r.id)}
                    disabled={removing === r.id}
                    className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Heart size={16} className="fill-red-500" />
                    {removing === r.id ? "Removing..." : "Remove from favorites"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {recentNotFavorited.length > 0 && (
          <div className="w-full max-w-5xl mx-auto bg-white rounded-[30px] shadow-xl p-10">
            <h2 className="text-2xl font-black mb-6 text-center">
              Quick Add from Recent History
            </h2>

            {successMsg && (
              <p className="mb-4 text-center text-sm font-medium text-green-600">{successMsg}</p>
            )}

            <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 gap-8">
              {recentNotFavorited.map((h) => (
                <div key={h.name} className="w-full flex flex-col items-center gap-2">
                  <RestaurantCard
                    name={h.name}
                    price={h.price}
                    category={h.category}
                    onCampus={h.onCampus}
                    className={restaurantCardMotionClass}
                  />
                  <button
                    onClick={() => handleQuickAdd(h.name)}
                    disabled={adding === h.name}
                    className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    <Plus size={16} />
                    {adding === h.name ? "Adding..." : "Add to favorites"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
}