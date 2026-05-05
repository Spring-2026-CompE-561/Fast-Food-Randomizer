"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useRestaurants } from "@/hooks/use-restaurants";
import RestaurantCard from "@/components/ui/RestaurantCard";
import { RestaurantCardGridSkeleton } from "@/components/ui/restaurant-card-skeleton";
import {
  looksOnCampus,
  priceFromRange,
  restaurantCardMotionClass,
} from "@/lib/restaurant-card-helpers";

export default function BrowsePage() {
  const { restaurants, loading, error } = useRestaurants();

  useEffect(() => {
    if (error) {
      toast.error("Couldn’t load your list", {
        description: "Check your connection and try refreshing the page.",
      });
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-background px-6 py-12 font-sans">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-black text-foreground tracking-tight">
          Browse Restaurants
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Explore dining options near SDSU — campus, College Area, and late-night
          picks.
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
              <RestaurantCard
                key={r.id}
                name={r.name}
                price={priceFromRange(r.price_range)}
                category={r.cuisine}
                onCampus={looksOnCampus(r.name)}
                className={restaurantCardMotionClass}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}
