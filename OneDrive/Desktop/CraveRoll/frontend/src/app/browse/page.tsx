"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { useRestaurants } from "@/hooks/use-restaurants";
import RestaurantCard from "@/components/ui/RestaurantCard";
import { RestaurantCardGridSkeleton } from "@/components/ui/restaurant-card-skeleton";
import { addFavorite, removeFavorite, getFavorites } from "@/lib/favorites";
import {
  looksOnCampus,
  priceFromRange,
  restaurantCardMotionClass,
} from "@/lib/restaurant-card-helpers";

export default function BrowsePage() {
  const { restaurants, loading, error } = useRestaurants();
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());
  const [toggling, setToggling] = useState<number | null>(null);

  useEffect(() => {
    if (error) {
      toast.error("Couldn't load your list", {
        description: "Check your connection and try refreshing the page.",
      });
    }
  }, [error]);

  useEffect(() => {
    async function loadFavorites() {
      try {
        const favs = (await getFavorites()) as { id: number; restaurant_id: number }[];
        setFavoriteIds(new Set(favs.map((f) => f.restaurant_id)));
      } catch {
        // not logged in, no favorites to load
      }
    }
    loadFavorites();
  }, []);

  async function handleToggleFavorite(restaurantId: number) {
    setToggling(restaurantId);
    try {
      if (favoriteIds.has(restaurantId)) {
        await removeFavorite(restaurantId);
        setFavoriteIds((prev) => {
          const next = new Set(prev);
          next.delete(restaurantId);
          return next;
        });
        toast.success("Removed from favorites");
      } else {
        await addFavorite(restaurantId);
        setFavoriteIds((prev) => new Set(prev).add(restaurantId));
        toast.success("Added to favorites!");
      }
    } catch {
      toast.error("Please log in to save favorites");
    } finally {
      setToggling(null);
    }
  }

  return (
    <div className="min-h-screen bg-background px-6 py-12 font-sans">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-black text-foreground tracking-tight">
          Browse Restaurants
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Explore dining options near SDSU — campus, College Area, and late-night picks.
        </p>
      </div>

      {loading && <RestaurantCardGridSkeleton />}

      {!loading && error && (
        <p className="text-center text-destructive font-medium">
          We couldn&apos;t load restaurants right now. Refresh the page and try again.
        </p>
      )}

      {!loading && !error && restaurants.length === 0 && (
        <p className="text-center text-muted-foreground">
          No restaurants loaded yet.
        </p>
      )}

      {!loading && !error && restaurants.length > 0 && (
        <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 gap-8 max-w-5xl mx-auto pb-8">
          {restaurants.map(
            (r: { id: number; name: string; cuisine: string; price_range: number }) => (
              <div key={r.id} className="w-full flex flex-col items-center gap-2">
                <RestaurantCard
                  name={r.name}
                  price={priceFromRange(r.price_range)}
                  category={r.cuisine}
                  onCampus={looksOnCampus(r.name)}
                  className={restaurantCardMotionClass}
                />
                <button
                  onClick={() => handleToggleFavorite(r.id)}
                  disabled={toggling === r.id}
                  className="flex items-center gap-2 text-sm transition-colors"
                  style={{ color: favoriteIds.has(r.id) ? "#E24B4A" : "#94A3B8" }}
                >
                  <Heart
                    size={16}
                    className={favoriteIds.has(r.id) ? "fill-red-500 text-red-500" : ""}
                  />
                  {toggling === r.id
                    ? "Saving..."
                    : favoriteIds.has(r.id)
                    ? "Saved to favorites"
                    : "Add to favorites"}
                </button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}