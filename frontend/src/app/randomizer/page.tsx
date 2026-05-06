"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RestaurantReviewSheet } from "@/components/restaurant-review-sheet";
import { useAuth } from "@/hooks/use-auth";
import { useCurrentUser } from "@/hooks/use-curr-user";
import { useRandomizer } from "@/hooks/use-randomizer";
import {
  RandomizerFiltersDialog,
  defaultFilters,
  sanitizeRandomizerFilters,
  type RandomizerFilterState,
} from "@/components/randomizer-filters-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RestaurantCardSkeleton } from "@/components/ui/restaurant-card-skeleton";
import RestaurantCard from "@/components/ui/RestaurantCard";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Shuffle, SlidersHorizontal } from "lucide-react";
import {
  looksOnCampus,
  priceFromRange,
  restaurantCardMotionClass,
} from "@/lib/restaurant-card-helpers";
import { getRestaurantById } from "@/lib/restaurants";

export default function RandomizerPage() {
  const { result, loading, error, runRandomizer, mergeIntoResult } =
    useRandomizer();
  const { user } = useCurrentUser();
  const { isAuthenticated } = useAuth();
  const [filterDialogOpen, setFilterDialogOpen] = useState(true);
  const [tagSheetOpen, setTagSheetOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] =
    useState<RandomizerFilterState>(defaultFilters);
  const [filtersApplyHint, setFiltersApplyHint] = useState(false);

  useEffect(() => {
    if (result && !loading) {
      setFiltersApplyHint(false);
    }
  }, [result, loading]);

  useEffect(() => {
    setTagSheetOpen(false);
  }, [result?.restaurant_id]);

  function handleApplyFilters(next: RandomizerFilterState) {
    setAppliedFilters(next);
    setFiltersApplyHint(true);
  }

  async function handleSpin() {
    const f = sanitizeRandomizerFilters(appliedFilters);
    await runRandomizer({
      latitude: null,
      longitude: null,
      cuisine: f.cuisines.length > 0 ? f.cuisines : null,
      price_range: f.maxPrice,
      dietary_tag: f.dietary.length > 0 ? f.dietary : null,
      open_now: f.openNow,
    });
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-background px-4 py-10 md:py-14 font-sans">
      <div className="max-w-xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Randomizer
          </h1>
          <p className="text-muted-foreground text-lg">
            One tap — we pick a restaurant that fits SDSU life.
          </p>
        </div>

        <Card className="rounded-[28px] border-border shadow-lg">
          <CardHeader className="justify-items-center text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl font-black">
              <Shuffle className="size-7 text-primary shrink-0" aria-hidden />
              Spin the wheel
            </CardTitle>
            <CardDescription className="text-center">
              Hungry but stuck deciding? Tap below and we&apos;ll suggest a spot worth trying.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            {filtersApplyHint && (
              <p className="rounded-2xl border border-primary/25 bg-primary/5 px-4 py-3 text-center text-sm text-muted-foreground">
                Preferences are set — tap{" "}
                <span className="font-bold text-foreground">Randomize</span>{" "}
                when you&apos;re ready for a pick.
              </p>
            )}

            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full gap-2 font-semibold"
                onClick={() => setFilterDialogOpen(true)}
              >
                <SlidersHorizontal className="size-4" aria-hidden />
                Edit filters
              </Button>
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="lg"
                  className="group w-full h-14 text-lg font-black rounded-2xl gap-2 border border-transparent shadow-lg shadow-primary/25 transition-all duration-300 ease-out enabled:hover:scale-[1.025] enabled:hover:-translate-y-2 enabled:hover:shadow-xl enabled:hover:shadow-primary/40 enabled:hover:border-primary-foreground/25 enabled:active:scale-[0.98] enabled:active:translate-y-0 disabled:hover:scale-100 disabled:hover:translate-y-0 disabled:hover:shadow-lg disabled:hover:border-transparent"
                  disabled={loading}
                  onClick={() => void handleSpin()}
                >
                  <Shuffle className="size-5 shrink-0 transition-transform duration-300 ease-out group-hover:rotate-[-8deg] group-hover:scale-110" />
                  {loading ? "Finding your spot…" : "Randomize"}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                When you’re stuck choosing, we’ll suggest a restaurant for you.
              </TooltipContent>
            </Tooltip>

            {error && !loading && (
              <p className="text-sm text-center text-destructive font-medium">{error}</p>
            )}

            {user?.email && (
              <p className="text-center text-sm text-muted-foreground">
                Signed in as <span className="font-semibold text-foreground">{user.email}</span>
              </p>
            )}

            {loading && (
              <div className="flex w-full flex-col items-center">
                <RestaurantCardSkeleton />
              </div>
            )}

            {!loading && result && (
              <div className="grid w-full place-items-center gap-3">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-center">
                  Tonight&apos;s pick
                </p>
                <div className="grid w-full place-items-center">
                  <RestaurantCard
                    name={String(result.name ?? "Your spot")}
                    price={priceFromRange(result.price_range)}
                    category={
                      result.cuisine != null && String(result.cuisine).trim() !== ""
                        ? String(result.cuisine)
                        : "Restaurant"
                    }
                    onCampus={looksOnCampus(String(result.name ?? ""))}
                    hoursDisplay={
                      result.hours_display != null
                        ? String(result.hours_display)
                        : null
                    }
                    restaurantId={Number(result.restaurant_id)}
                    reviewTagCounts={result.review_tag_counts ?? null}
                    onAddReviewTags={
                      isAuthenticated ? () => setTagSheetOpen(true) : undefined
                    }
                    className={restaurantCardMotionClass}
                  />
                </div>
                {result.match_count != null && (
                  <p className="text-center text-xs text-muted-foreground">
                    {String(result.match_count)} places we considered
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <RandomizerFiltersDialog
        open={filterDialogOpen}
        onOpenChange={setFilterDialogOpen}
        initialFilters={appliedFilters}
        onApply={handleApplyFilters}
      />

      <RestaurantReviewSheet
        open={tagSheetOpen}
        onOpenChange={setTagSheetOpen}
        restaurantId={
          result?.restaurant_id != null ? Number(result.restaurant_id) : null
        }
        restaurantName={
          result?.name != null ? String(result.name) : ""
        }
        isAuthenticated={isAuthenticated}
        onSaved={async () => {
          const id =
            result?.restaurant_id != null ? Number(result.restaurant_id) : null;
          if (id == null) return;
          try {
            const r = (await getRestaurantById(id)) as {
              review_tag_counts?: Record<string, number>;
            };
            mergeIntoResult({
              review_tag_counts: r.review_tag_counts ?? {},
            });
          } catch {
            toast.error("Couldn’t refresh tag counts");
          }
        }}
      />
    </div>
  );
}
