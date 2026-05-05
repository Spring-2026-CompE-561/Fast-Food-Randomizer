"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { RestaurantReviewSheet } from "@/components/restaurant-review-sheet";
import RestaurantCard from "@/components/ui/RestaurantCard";
import { RestaurantCardGridSkeleton } from "@/components/ui/restaurant-card-skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useRestaurants } from "@/hooks/use-restaurants";
import {
  looksOnCampus,
  priceFromRange,
  restaurantCardMotionClass,
} from "@/lib/restaurant-card-helpers";

type RestaurantRow = {
  id: number;
  name: string;
  cuisine: string;
  price_range: number;
  review_tag_counts?: Record<string, number>;
};

function tagVoteTotal(r: RestaurantRow): number {
  return Object.values(r.review_tag_counts ?? {}).reduce((sum, n) => sum + n, 0);
}

export default function BrowsePage() {
  const { restaurants, loading, error, reload } = useRestaurants();
  const { isAuthenticated } = useAuth();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetRestaurant, setSheetRestaurant] = useState<RestaurantRow | null>(
    null
  );

  useEffect(() => {
    if (error) {
      toast.error("Couldn’t load your list", {
        description: "Check your connection and try refreshing the page.",
      });
    }
  }, [error]);

  function openSheet(r: RestaurantRow) {
    setSheetRestaurant(r);
    setSheetOpen(true);
  }

  const rows = restaurants as RestaurantRow[];
  const featuredRows = rows.filter((r) => tagVoteTotal(r) > 0);
  const otherRows = rows.filter((r) => tagVoteTotal(r) === 0);

  const gridClass =
    "grid grid-cols-1 justify-items-center md:grid-cols-2 gap-8 max-w-5xl mx-auto";

  function renderCards(list: RestaurantRow[]) {
    return list.map((r) => (
      <RestaurantCard
        key={r.id}
        name={r.name}
        price={priceFromRange(r.price_range)}
        category={r.cuisine}
        onCampus={looksOnCampus(r.name)}
        restaurantId={r.id}
        reviewTagCounts={r.review_tag_counts ?? null}
        onAddReviewTags={() => openSheet(r)}
        className={restaurantCardMotionClass}
      />
    ));
  }

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
        <p className="mt-3 text-sm text-muted-foreground">
          Signed-out? You can still browse.{" "}
          <Link href="/login" className="font-semibold text-primary underline-offset-4 hover:underline">
            Log in
          </Link>{" "}
          to add quick tags and help the crowd.
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
        <div className="pb-8">
          {featuredRows.length > 0 && (
            <section className="mb-12">
              <h2 className="mb-8 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Community picks
              </h2>
              <div className={gridClass}>{renderCards(featuredRows)}</div>
            </section>
          )}

          {otherRows.length > 0 && (
            <section className={featuredRows.length > 0 ? "mt-4" : ""}>
              {featuredRows.length > 0 && (
                <h2 className="mb-6 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  More restaurants
                </h2>
              )}
              <div className={gridClass}>{renderCards(otherRows)}</div>
            </section>
          )}
        </div>
      )}

      <RestaurantReviewSheet
        open={sheetOpen}
        onOpenChange={(open) => {
          setSheetOpen(open);
          if (!open) setSheetRestaurant(null);
        }}
        restaurantId={sheetRestaurant?.id ?? null}
        restaurantName={sheetRestaurant?.name ?? ""}
        isAuthenticated={isAuthenticated}
        onSaved={() => void reload()}
      />
    </div>
  );
}
