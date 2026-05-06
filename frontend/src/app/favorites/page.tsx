"use client";

import { useState } from "react";
import { Heart, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
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
  const { favorites, setFavorites, loading, error } = useFavorites();
  const { historyItems } = useHistory();
  const [removing, setRemoving] = useState<number | null>(null);
  const [adding, setAdding] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [animating, setAnimating] = useState<Record<number, boolean>>({});

  async function handleRemove(restaurantId: number) {
    setRemoving(restaurantId);

    try {
      await removeFavorite(restaurantId);

      setFavorites((prev) =>
        prev.filter((favorite) => favorite.restaurant_id !== restaurantId)
      );
    } catch (err) {
      console.error("Failed to remove favorite:", err);
    } finally {
      setRemoving(null);
    }
  }

  async function handleQuickAdd(restaurantName: string) {
    setAdding(restaurantName);
    setSuccessMsg(null);
    try {
      await addFavorite(0);
      setSuccessMsg(`${restaurantName} added to favorites!`);
    } catch {
    } finally {
      setAdding(null);
    }
  }

  const favoriteNames = new Set(favorites.map((f) => f.name));
  const recentNotFavorited = historyItems
    .filter((h) => !favoriteNames.has(h.name))
    .slice(0, 4);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-background px-4 py-14 font-sans">
        <section className="text-center mb-16">
          <h1 className="text-7xl font-black tracking-tight text-foreground">Favorites</h1>
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
              {favorites.map((item, index) => (
                <div key={item.id} className="relative">

                  <button
                    type="button"
                    aria-label={`Remove ${item.name} from favorites`}
                    className="absolute top-5 right-5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card shadow-sm"
                    onClick={() => {
                      void handleRemove(item.restaurant_id);

                      setAnimating((prev) => ({
                        ...prev,
                        [item.id]: true,
                      }));

                      setTimeout(() => {
                        setAnimating((prev) => ({
                          ...prev,
                          [item.id]: false,
                        }));
                      }, 200);
                    }}
                  >
                    <Heart
                      size={16}
                      strokeWidth={2.5}
                      className={cn(
                        "transition-transform duration-200",
                        "fill-primary text-primary",
                        animating[item.restaurant_id] ? "scale-125" : "scale-100"
                      )}
                    />
                  </button>

                  <span className="absolute top-7 left-7 z-10 text-sm font-black text-muted-foreground">
                    #{index + 1}
                  </span>

                  <RestaurantCard
                    name={item.name}
                    price={priceFromRange(item.price_range)}
                    category={item.cuisine}
                    onCampus={looksOnCampus(item.name)}
                    className={`${restaurantCardMotionClass} md:w-[320px] pt-14`}
                  />
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
              {recentNotFavorited.map((h, index) => (
                <div key={`${h.name}-${index}`} className="w-full flex flex-col items-center gap-2">
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