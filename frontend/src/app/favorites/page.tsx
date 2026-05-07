"use client";

import { useState } from "react";
import { Heart, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ProtectedRoute from "@/components/ProtectedRoute";
import RestaurantCard from "@/components/ui/RestaurantCard";
import { RestaurantCardGridSkeleton } from "@/components/ui/restaurant-card-skeleton";
import { useFavorites } from "@/hooks/use-favorites";
import type { HistoryListItem } from "@/hooks/use-history";
import { useHistory } from "@/hooks/use-history";
import { addFavorite, removeFavorite } from "@/lib/favorites";
import {
  looksOnCampus,
  priceFromRange,
  restaurantCardMotionClass,
} from "@/lib/restaurant-card-helpers";

function recentRollsNotInFavorites(
  historyItems: HistoryListItem[],
  favoritedRestaurantIds: Set<number>,
  limit: number,
): HistoryListItem[] {
  const sorted = [...historyItems].sort(
    (a, b) =>
      new Date(b.selected_at).getTime() - new Date(a.selected_at).getTime(),
  );
  const seen = new Set<number>();
  const out: HistoryListItem[] = [];
  for (const row of sorted) {
    if (!Number.isFinite(row.restaurant_id) || row.restaurant_id <= 0) continue;
    if (favoritedRestaurantIds.has(row.restaurant_id)) continue;
    if (seen.has(row.restaurant_id)) continue;
    seen.add(row.restaurant_id);
    out.push(row);
    if (out.length >= limit) break;
  }
  return out;
}

type FavoriteCreatedResponse = {
  id: number;
  user_id: number;
  restaurant_id: number;
};

export default function FavoritesPage() {
  const { favorites, setFavorites, loading, error } = useFavorites();
  const { historyItems, loading: historyLoading } = useHistory();
  const [removing, setRemoving] = useState<number | null>(null);
  const [addingRestaurantId, setAddingRestaurantId] = useState<number | null>(
    null,
  );
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

  async function handleQuickAdd(row: HistoryListItem) {
    const rid = row.restaurant_id;
    setAddingRestaurantId(rid);
    setSuccessMsg(null);
    try {
      const created = (await addFavorite(rid)) as FavoriteCreatedResponse;
      setFavorites((prev) => [
        ...prev,
        {
          id: created.id,
          restaurant_id: created.restaurant_id,
          name: row.name,
          cuisine: row.category,
          price_range: row.price_range,
          hours_display: row.hoursDisplay,
        },
      ]);
      setSuccessMsg(`${row.name} added to favorites!`);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Could not add this restaurant.";
      toast.error(msg);
    } finally {
      setAddingRestaurantId(null);
    }
  }

  const favoriteRestaurantIds = new Set(
    favorites.map((f) => f.restaurant_id),
  );
  const recentNotFavorited =
    loading || historyLoading
      ? []
      : recentRollsNotInFavorites(historyItems, favoriteRestaurantIds, 6);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-background px-4 py-14 font-sans">
        <section className="text-center mb-16">
          <h1 className="text-7xl font-black tracking-tight text-foreground">Favorites</h1>
          <p className="mt-6 text-2xl text-muted-foreground">
            Your saved restaurants
          </p>
        </section>

        <div className="w-full max-w-5xl mx-auto bg-primary/75 rounded-[30px] shadow-xl p-10 mb-10">
          <h2 className="text-3xl font-black mb-8 flex items-center justify-center gap-3">
            {/* <Heart size={52} className="text-accent shrink-0" aria-hidden /> */}
            Saved Places
          </h2>

          {error && (
            <p className="mb-6 text-center text-sm font-medium text-destructive">{error}</p>
          )}

          {loading && <RestaurantCardGridSkeleton count={4} />}

          {!loading && !error && favorites.length === 0 && (
            <div className="text-lg text-muted-foreground text-center">
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
                        "fill-accent text-accent",
                        animating[item.id] ? "scale-125" : "scale-100"
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
                    hoursDisplay={item.hours_display ?? null}
                    showTagReviews={false}
                    className={`${restaurantCardMotionClass} md:w-[320px] pt-14`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {!loading &&
          !historyLoading &&
          recentNotFavorited.length > 0 && (
          <div className="w-full max-w-5xl mx-auto bg-accent/75 rounded-[30px] shadow-xl p-10">
            <h2 className="text-2xl font-black mb-2 text-center">
              Quick Add from Recent Picks
            </h2>
            <p className="mb-6 text-center text-sm text-muted-foreground max-w-xl mx-auto">
              Places you spun on the randomizer but haven&apos;t saved yet. Tap to
              add them to your list.
            </p>

            {successMsg && (
              <p className="mb-4 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
                {successMsg}
              </p>
            )}

            <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 gap-8">
              {recentNotFavorited.map((h) => (
                <div
                  key={h.restaurant_id}
                  className="w-full flex flex-col items-center gap-3"
                >
                  <RestaurantCard
                    name={h.name}
                    price={h.price}
                    category={h.category}
                    onCampus={h.onCampus}
                    hoursDisplay={h.hoursDisplay}
                    showTagReviews={false}
                    className={restaurantCardMotionClass}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="rounded-full gap-2 font-semibold"
                    onClick={() => void handleQuickAdd(h)}
                    disabled={addingRestaurantId === h.restaurant_id}
                  >
                    <Plus className="size-4 shrink-0" aria-hidden />
                    {addingRestaurantId === h.restaurant_id
                      ? "Adding…"
                      : "Add to favorites"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
}