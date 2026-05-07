"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { 
  Shuffle, 
  SlidersHorizontal, 
  MousePointerClick, 
  CircleDashed, 
  SquarePlay 
} from "lucide-react";
import {
  looksOnCampus,
  priceFromRange,
  restaurantCardMotionClass,
} from "@/lib/restaurant-card-helpers";
import { getRestaurantById } from "@/lib/restaurants";
import { promptLoginForRestaurantTags } from "@/lib/tag-login-toast";

// Define the available randomizer styles
type RandomizerMode = "button" | "wheel" | "slot";

export default function RandomizerPage() {
  const router = useRouter();
  const { result, loading, error, runRandomizer, mergeIntoResult } =
    useRandomizer();
  const { user } = useCurrentUser();
  const { isAuthenticated } = useAuth();
  const [filterDialogOpen, setFilterDialogOpen] = useState(true);
  const [tagSheetOpen, setTagSheetOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] =
    useState<RandomizerFilterState>(defaultFilters);
  const [filtersApplyHint, setFiltersApplyHint] = useState(false);
  
  const [mode, setMode] = useState<RandomizerMode>("button");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setTagSheetOpen(false);
  }, [result?.restaurant_id]);

  function handleApplyFilters(next: RandomizerFilterState) {
    setAppliedFilters(next);
    setFiltersApplyHint(true);
  }

  async function handleSpin() {
    setIsAnimating(true); // Start the visual animation immediately
    const f = sanitizeRandomizerFilters(appliedFilters);
    
    // The API request promise
    const apiPromise = runRandomizer({
      latitude: null,
      longitude: null,
      cuisine: f.cuisines.length > 0 ? f.cuisines : null,
      price_range: f.maxPrice,
      dietary_tag: f.dietary.length > 0 ? f.dietary : null,
      open_now: f.openNow,
    });

    if (mode === "button") {
      // For standard mode, just wait for the API
      await apiPromise;
      setIsAnimating(false);
      setFiltersApplyHint(false);
    } else {
      // For wheel/slot modes, enforce a MINIMUM delay of 2.5 seconds 
      // so the user actually gets to watch it spin, even if the API is instant.
      const delayPromise = new Promise((resolve) => setTimeout(resolve, 2500));
      
      // Wait for BOTH the API to finish and the 2.5s timer to run out
      await Promise.all([apiPromise, delayPromise]);
      
      setIsAnimating(false);
      setFiltersApplyHint(false);
    }
  }

  // Show visuals if the API is loading OR if our artificial animation timer is running
  const showVisuals = loading || isAnimating;

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
              Choose Your Style
            </CardTitle>
            <CardDescription className="text-center">
              Hungry but stuck deciding? Pick how you want to randomize!
            </CardDescription>

            {/* MODE SELECTOR BUTTONS */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <Button
                variant={mode === "button" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setMode("button")}
                disabled={showVisuals}
              >
                <MousePointerClick className="size-4 mr-2" />
                Standard
              </Button>
              <Button
                variant={mode === "wheel" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setMode("wheel")}
                disabled={showVisuals}
              >
                <CircleDashed className="size-4 mr-2" />
                Spin the Wheel
              </Button>
              <Button
                variant={mode === "slot" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setMode("slot")}
                disabled={showVisuals}
              >
                <SquarePlay className="size-4 mr-2" />
                Slot Machine
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {filtersApplyHint && !showVisuals && (
              <p className="rounded-2xl border border-primary/25 bg-primary/5 px-4 py-3 text-center text-sm text-muted-foreground">
                Preferences are set — tap{" "}
                <span className="font-bold text-foreground">Randomize</span>{" "}
                when you&apos;re ready for a pick.
              </p>
            )}

            <div className="flex justify-center">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="rounded-full gap-2 font-semibold text-muted-foreground"
                onClick={() => setFilterDialogOpen(true)}
                disabled={showVisuals}
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
                  disabled={showVisuals}
                  onClick={() => void handleSpin()}
                >
                  <Shuffle className="size-5 shrink-0 transition-transform duration-300 ease-out group-hover:rotate-[-8deg] group-hover:scale-110" />
                  {showVisuals ? "Finding your spot…" : "Randomize"}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                When you’re stuck choosing, we’ll suggest a restaurant for you.
              </TooltipContent>
            </Tooltip>

            {error && !showVisuals && (
              <p className="text-sm text-center text-destructive font-medium">{error}</p>
            )}

            {user?.email && !showVisuals && (
              <p className="text-center text-sm text-muted-foreground">
                Signed in as <span className="font-semibold text-foreground">{user.email}</span>
              </p>
            )}

            {/* VISUAL FEEDBACK / ANIMATION STATES */}
            {showVisuals && (
              <div className="flex w-full flex-col items-center justify-center min-h-[250px] py-4">
                {mode === "button" && <RestaurantCardSkeleton />}
                {mode === "wheel" && <WheelAnimation />}
                {mode === "slot" && <SlotMachineAnimation />}
              </div>
            )}

            {/* FINAL RESULT */}
            {!showVisuals && result && (
              <div className="flex w-full flex-col items-center space-y-3 animate-in fade-in zoom-in duration-500">
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
                      isAuthenticated
                        ? () => setTagSheetOpen(true)
                        : () =>
                            promptLoginForRestaurantTags(() =>
                              router.push("/login"),
                            )
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

// --- ENHANCED ANIMATION COMPONENTS ---

function WheelAnimation() {
  return (
    <div className="flex flex-col items-center gap-8 my-4">
      <div className="relative size-64">
        {/* The Classic Pointer/Peg */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 
          border-l-[16px] border-l-transparent 
          border-r-[16px] border-r-transparent 
          border-t-[32px] border-t-foreground z-20 
          drop-shadow-lg" 
        />
        
        {/* The Outer Rim */}
        <div className="absolute inset-0 rounded-full border-[10px] border-slate-800 bg-slate-800 shadow-2xl z-0" />
        
        {/* The Spinning Wheel (Alternating Yellow & Orange) */}
        <div 
          className="absolute inset-[10px] rounded-full animate-[spin_0.35s_linear_infinite]"
          style={{
            background: `conic-gradient(
              #f97316 0deg 30deg,    /* Orange */
              #eab308 30deg 60deg,   /* Yellow */
              #f97316 60deg 90deg,   /* Orange */
              #eab308 90deg 120deg,  /* Yellow */
              #f97316 120deg 150deg, /* Orange */
              #eab308 150deg 180deg, /* Yellow */
              #f97316 180deg 210deg, /* Orange */
              #eab308 210deg 240deg, /* Yellow */
              #f97316 240deg 270deg, /* Orange */
              #eab308 270deg 300deg, /* Yellow */
              #f97316 300deg 330deg, /* Orange */
              #eab308 330deg 360deg  /* Yellow */
            )`
          }}
        >
          {/* Inner Center Circle (Hub) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-16 bg-background rounded-full shadow-[inset_0_3px_6px_rgba(0,0,0,0.4)] border-4 border-slate-200 flex items-center justify-center z-10">
            <div className="size-4 bg-slate-800 rounded-full" />
          </div>
        </div>
      </div>
      <p className="text-sm font-bold animate-pulse text-muted-foreground tracking-widest uppercase">
        Spinning...
      </p>
    </div>
  );
}

function SlotMachineAnimation() {
  const [slots, setSlots] = useState(["🍔", "🍕", "🌮"]);
  const icons = ["🍔", "🍕", "🌮", "🍣", "🥗", "🥪", "🥩", "🍗", "🍜", "🍩"];

  useEffect(() => {
    // Rapidly change the emojis to simulate rolling
    const interval = setInterval(() => {
      setSlots([
        icons[Math.floor(Math.random() * icons.length)],
        icons[Math.floor(Math.random() * icons.length)],
        icons[Math.floor(Math.random() * icons.length)],
      ]);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 my-4">
      {/* Beefed up padding and borders for a larger machine */}
      <div className="relative flex gap-4 p-6 bg-muted rounded-[2rem] border-[8px] border-border shadow-inner overflow-hidden items-center">
        {/* Larger Fake Lever */}
        <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-6 h-24 bg-border rounded-r-xl shadow-md" />
        
        {slots.map((icon, i) => (
          <div 
            key={i} 
            /* Significantly larger slot windows and emojis */
            className="w-24 h-32 bg-background rounded-2xl shadow-lg flex items-center justify-center text-6xl border-2 border-border"
          >
            {icon}
          </div>
        ))}
      </div>
      <p className="text-sm font-bold animate-pulse text-muted-foreground tracking-widest uppercase">
        Rolling...
      </p>
    </div>
  );
}