"use client";

import { useCurrentUser } from "@/hooks/use-curr-user";
import { useRandomizer } from "@/hooks/use-randomizer";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Shuffle } from "lucide-react";

export default function RandomizerPage() {
  const { result, loading, error, runRandomizer } = useRandomizer();
  const { user } = useCurrentUser();

  async function handleSpin() {
    const out = await runRandomizer({
      latitude: null,
      longitude: null,
      cuisine: null,
      price_range: null,
      dietary_tags: null,
      radius_miles: 1,
      user_id: user?.id ?? null,
    });

    if (out.ok && out.data && typeof out.data === "object") {
      const d = out.data as {
        name?: string;
        cuisine?: string;
        price_range?: unknown;
      };
      if (d.name) {
        toast.success(`You're eating at ${d.name}`, {
          description:
            typeof d.cuisine === "string"
              ? `${d.cuisine} · ${priceDots(d.price_range)}`
              : undefined,
        });
      }
    } else if (!out.ok) {
      toast.error(out.error);
    }
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
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-black">
              <Shuffle className="size-7 text-primary shrink-0" aria-hidden />
              Spin the wheel
            </CardTitle>
            <CardDescription>
              Hungry but stuck deciding? Tap below and we&apos;ll suggest a spot worth trying.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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
              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-6">
                <Skeleton className="h-8 w-4/5 mx-auto rounded-lg" />
                <Skeleton className="h-5 w-full rounded-md" />
                <Skeleton className="h-5 w-2/3 rounded-md" />
                <div className="flex gap-2 justify-center pt-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </div>
            )}

            {!loading && result && (
              <div className="rounded-2xl border border-border bg-card p-6 text-center space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Tonight&apos;s pick
                </p>
                <h2 className="text-3xl font-black text-card-foreground">{result.name}</h2>
                <div className="flex flex-wrap gap-2 justify-center">
                  {result.cuisine && (
                    <Badge variant="secondary">{String(result.cuisine)}</Badge>
                  )}
                  <Badge variant="outline">{priceDots(result.price_range)}</Badge>
                  {result.match_count != null && (
                    <Badge variant="outline">{result.match_count} places we considered</Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function priceDots(price_range: unknown) {
  const n =
    typeof price_range === "number"
      ? price_range
      : typeof price_range === "string"
        ? parseInt(price_range, 10)
        : NaN;
  const safe = Number.isFinite(n) ? Math.min(Math.max(n, 1), 4) : 2;
  return "$".repeat(safe);
}
