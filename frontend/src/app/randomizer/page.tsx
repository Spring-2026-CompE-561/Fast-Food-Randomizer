"use client";

import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-curr-user";
import { useRandomizer } from "@/hooks/use-randomizer";
import {
  defaultFilters,
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

export default function RandomizerPage() {
  const { result, loading, error, runRandomizer } = useRandomizer();
  const { user } = useCurrentUser();
  const [filterDialogOpen, setFilterDialogOpen] = useState(true);
  const [appliedFilters, setAppliedFilters] =
    useState<RandomizerFilterState>(defaultFilters);
  const [filtersApplyHint, setFiltersApplyHint] = useState(false);

  useEffect(() => {
    if (result && !loading) {
      setFiltersApplyHint(false);
    }
  }, [result, loading]);

  function handleApplyFilters(next: RandomizerFilterState) {
    setAppliedFilters(next);
    setFiltersApplyHint(true);
  }

  async function handleSpin() {
    await runRandomizer({
      latitude: null,
      longitude: null,
      cuisine:
        appliedFilters.cuisines.length > 0 ? appliedFilters.cuisines : null,
      price_range: appliedFilters.maxPrice,
      dietary_tag:
        appliedFilters.dietary.length > 0 ? appliedFilters.dietary : null,
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
          <CardContent className="space-y-6">
            {filtersApplyHint && (
              <p className="rounded-2xl border border-primary/25 bg-primary/5 px-4 py-3 text-center text-sm text-muted-foreground">
                Preferences are set — tap{" "}
                <span className="font-bold text-foreground">Randomize</span>{" "}
                when you&apos;re ready for a pick.
              </p>
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
              <div className="flex w-full flex-col items-center space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-center">
                  Tonight&apos;s pick
                </p>
                <RestaurantCard
                  name={String(result.name ?? "Your spot")}
                  price={priceFromRange(result.price_range)}
                  category={
                    result.cuisine != null && String(result.cuisine).trim() !== ""
                      ? String(result.cuisine)
                      : "Restaurant"
                  }
                  onCampus={looksOnCampus(String(result.name ?? ""))}
                  className={restaurantCardMotionClass}
                />
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
    </div>
  );
}
