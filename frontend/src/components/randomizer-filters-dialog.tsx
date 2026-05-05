"use client";

import { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { chipPop, chipPopDietary } from "@/lib/auth-button-styles";
import { cn } from "@/lib/utils";

export type RandomizerFilterState = {
  /** `null` = any price; otherwise exact `price_range` tier (1–3). */
  maxPrice: number | null;
  /** Substrings matched against `cuisine` (ilike). */
  cuisines: string[];
  /** Substrings matched against `dietary_tags` (ilike). */
  dietary: string[];
};

const PRICE_OPTIONS: { label: string; value: number | null }[] = [
  { label: "Any", value: null },
  { label: "$", value: 1 },
  { label: "$$", value: 2 },
  { label: "$$$", value: 3 },
];

const CUISINE_OPTIONS = [
  "American",
  "Breakfast",
  "Cafe",
  "Chinese",
  "Convenience",
  "Dining Hall",
  "Fast Food",
  "Hawaiian",
  "Healthy",
  "Italian",
  "Japanese",
  "Mexican",
  "Middle Eastern",
  "Pizza",
  "Sandwich",
  "Smoothies",
  "Vegan",
  "Wings",
] as const;

/** Only tags with ≥2 restaurants in DB substring-match (`ilike %search%`) on seeded data. */
const DIETARY_OPTIONS: { label: string; search: string }[] = [
  { label: "Vegetarian", search: "vegetarian" },
  { label: "Vegan", search: "vegan" },
  { label: "Pescatarian", search: "pescatarian" },
];

const ALLOWED_DIETARY_SEARCHES = new Set(
  DIETARY_OPTIONS.map((o) => o.search)
);

const MAX_PRICE_TIER = 3;

export function defaultFilters(): RandomizerFilterState {
  return {
    maxPrice: null,
    cuisines: [],
    dietary: [],
  };
}

/** Drop removed tiers / dietary tags so API calls stay valid after UI changes. */
export function sanitizeRandomizerFilters(
  s: RandomizerFilterState
): RandomizerFilterState {
  const max =
    s.maxPrice == null ||
    s.maxPrice < 1 ||
    s.maxPrice > MAX_PRICE_TIER
      ? null
      : s.maxPrice;
  return {
    maxPrice: max,
    cuisines: [...s.cuisines],
    dietary: s.dietary.filter((x) => ALLOWED_DIETARY_SEARCHES.has(x)),
  };
}

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialFilters: RandomizerFilterState;
  onApply: (filters: RandomizerFilterState) => void;
};

export function RandomizerFiltersDialog({
  open,
  onOpenChange,
  initialFilters,
  onApply,
}: Props) {
  const [draft, setDraft] = useState<RandomizerFilterState>(initialFilters);

  useEffect(() => {
    if (open) {
      const next = sanitizeRandomizerFilters(initialFilters);
      setDraft({
        maxPrice: next.maxPrice,
        cuisines: [...next.cuisines],
        dietary: [...next.dietary],
      });
    }
  }, [open, initialFilters]);

  function toggleList(list: "cuisines" | "dietary", value: string) {
    setDraft((prev) => {
      const arr = prev[list];
      const next = arr.includes(value)
        ? arr.filter((x) => x !== value)
        : [...arr, value];
      return { ...prev, [list]: next };
    });
  }

  function handleApply() {
    onApply(sanitizeRandomizerFilters(draft));
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className={cn(
          "max-h-[min(90vh,720px)] gap-0 overflow-y-auto border-2 border-primary/20 p-0 sm:max-w-lg"
        )}
      >
        <div className="px-6 pt-6">
          <DialogHeader className="gap-2 text-center sm:text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/15 ring-2 ring-primary/20">
              <SlidersHorizontal className="size-7 text-primary" aria-hidden />
            </div>
            <DialogTitle className="font-heading text-xl font-black md:text-2xl">
              Spin preferences
            </DialogTitle>
            <DialogDescription>
              Choose price, cuisine, and dietary filters. You can change these anytime with{" "}
              <strong className="text-foreground">Edit filters</strong>.
            </DialogDescription>
          </DialogHeader>
        </div>

        <Separator />

        <div className="space-y-6 px-6 py-5">
          <section className="space-y-3">
            <Label className="text-base font-black text-foreground">Price</Label>
            <p className="text-xs text-muted-foreground">
              Exact tier — we only pick restaurants whose price matches this level ($ through $$$).
              Choose Any to ignore price.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {PRICE_OPTIONS.map(({ label, value }) => {
                const selected = draft.maxPrice === value;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() =>
                      setDraft((p) => ({ ...p, maxPrice: value }))
                    }
                    className={cn(
                      "rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors",
                      chipPop,
                      selected
                        ? "border-primary bg-primary text-primary-foreground shadow-md hover:shadow-xl hover:shadow-primary/40"
                        : "border-border bg-card text-muted-foreground shadow-sm shadow-black/[0.04] hover:border-primary/50 hover:text-foreground hover:shadow-primary/20"
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="space-y-3">
            <Label className="text-base font-black text-foreground">Cuisine</Label>
            <p className="text-xs text-muted-foreground">
              Tap one or more — leave empty to allow any cuisine.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {CUISINE_OPTIONS.map((c) => {
                const selected = draft.cuisines.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleList("cuisines", c)}
                    className={cn(
                      "rounded-full border-2 px-3 py-1.5 text-xs font-bold transition-colors sm:text-sm",
                      chipPop,
                      selected
                        ? "border-primary bg-primary/15 text-foreground shadow-sm ring-1 ring-primary/30 hover:border-primary hover:bg-primary/20"
                        : "border-border bg-muted/40 text-muted-foreground shadow-sm shadow-black/[0.04] hover:border-primary/40"
                    )}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="space-y-3">
            <Label className="text-base font-black text-foreground">Dietary</Label>
            <p className="text-xs text-muted-foreground">
              We match menu tags in our listings (e.g. vegetarian-friendly counts as vegetarian).
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {DIETARY_OPTIONS.map(({ label, search }) => {
                const selected = draft.dietary.includes(search);
                return (
                  <button
                    key={search}
                    type="button"
                    onClick={() => toggleList("dietary", search)}
                    className={cn(
                      "rounded-full border-2 px-3 py-1.5 text-xs font-bold transition-colors sm:text-sm",
                      chipPopDietary,
                      selected
                        ? "border-accent bg-accent/15 text-foreground shadow-sm ring-1 ring-accent/30 hover:border-accent hover:bg-accent/25"
                        : "border-border bg-muted/40 text-muted-foreground shadow-sm shadow-black/[0.04] hover:border-accent/50"
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <Separator />

        <DialogFooter className="flex-col gap-2 border-t bg-muted/30 p-4 sm:flex-col">
          <Button
            type="button"
            className="w-full rounded-2xl font-black"
            onClick={handleApply}
          >
            Apply
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full rounded-2xl font-semibold text-muted-foreground"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
