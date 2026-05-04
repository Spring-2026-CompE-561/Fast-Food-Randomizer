"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useRestaurants } from "@/hooks/use-restaurants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

function priceLabel(range: number) {
  const n = Math.min(Math.max(range, 1), 4);
  return "$".repeat(n);
}

function BrowseSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="rounded-2xl border-border overflow-hidden">
          <CardHeader className="space-y-3">
            <Skeleton className="h-7 w-3/4 rounded-lg" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full rounded-md mb-2" />
            <Skeleton className="h-4 w-2/3 rounded-md" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

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

      {loading && <BrowseSkeleton />}

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pb-8">
          {restaurants.map((r: { id: number; name: string; cuisine: string; price_range: number }) => (
            <Card
              key={r.id}
              className="rounded-2xl border border-transparent shadow-md shadow-black/[0.06] transition-all duration-300 ease-out hover:scale-[1.025] hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20 hover:border-border hover:ring-2 hover:ring-primary/15"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-black text-card-foreground leading-snug">
                  {r.name}
                </CardTitle>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="secondary">{r.cuisine}</Badge>
                  <Badge variant="outline">{priceLabel(r.price_range)}</Badge>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm font-medium">
                Tap Randomizer when you&apos;re ready to let fate pick for you.
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
