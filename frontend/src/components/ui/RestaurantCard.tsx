"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Tag } from "lucide-react";
import { ReviewTagIcon } from "@/components/review-tag-icon";
import { reviewTagsSortedByVotes } from "@/lib/review-tags";
import { cn } from "@/lib/utils";

interface RestaurantCardProps {
  name: string;
  price: string;
  category: string;
  onCampus: boolean;
  hoursDisplay?: string | null;
  /** When false (e.g. Randomizer), hide crowd tags + “Rate with tags” entirely for a tighter centered layout. */
  showTagReviews?: boolean;
  restaurantId?: number;
  reviewTagCounts?: Record<string, number> | null;
  onAddReviewTags?: () => void;
  className?: string;
}

export default function RestaurantCard({
  name,
  price,
  category,
  onCampus,
  hoursDisplay,
  showTagReviews = true,
  restaurantId,
  reviewTagCounts,
  onAddReviewTags,
  className,
}: RestaurantCardProps) {
  const tagsForCard = reviewTagsSortedByVotes(reviewTagCounts);

  return (
    <div
      className={cn(
        "mx-auto grid w-full max-w-md justify-items-center rounded-[32px] border border-border bg-card p-8 text-center shadow-sm transition-shadow hover:shadow-md",
        showTagReviews ? "gap-4" : "gap-3",
        className
      )}
    >
      <h3 className="w-full text-center text-balance text-2xl font-black tracking-tight text-card-foreground">
        {name}
      </h3>

      <div className="flex w-full flex-wrap justify-center gap-2">
        <Badge variant="secondary" className="font-semibold">
          {category}
        </Badge>
        <Badge variant="outline" className="font-semibold">
          {price}
        </Badge>
        {onCampus && (
          <Badge variant="default" className="font-semibold uppercase tracking-wide">
            On campus
          </Badge>
        )}
      </div>

      {hoursDisplay != null && hoursDisplay.trim() !== "" && (
        <div className="flex w-full justify-center px-2">
          <p className="flex max-w-sm flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-xs leading-snug text-muted-foreground">
            <Clock
              className="size-3.5 shrink-0 text-muted-foreground/85"
              aria-hidden
            />
            <span className="text-balance">{hoursDisplay}</span>
          </p>
        </div>
      )}

      {showTagReviews && (
        <>
          <div className="flex min-h-[2rem] w-full max-w-sm flex-col items-center justify-center gap-2">
            {tagsForCard.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-1.5">
                {tagsForCard.map(({ slug, count, label }) => (
                  <span
                    key={slug}
                    className="inline-flex items-center gap-1.5 rounded-full bg-muted/90 px-3 py-1 text-xs font-semibold text-foreground/95"
                  >
                    <ReviewTagIcon
                      slug={slug}
                      className="size-3.5 text-foreground/75"
                    />
                    <span>{label}</span>
                    {count > 1 && (
                      <span className="text-[10px] font-black tabular-nums text-muted-foreground">
                        ×{count}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            ) : (
              restaurantId != null &&
              (onAddReviewTags ? (
                <p className="text-center text-xs font-medium text-muted-foreground">
                  No crowd tags yet — tap below to add yours.
                </p>
              ) : (
                <p className="text-center text-xs font-medium text-muted-foreground">
                  No crowd tags yet.{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    Log in
                  </Link>{" "}
                  to add yours.
                </p>
              )))
            }
          </div>

          {restaurantId != null && onAddReviewTags && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={cn(
                "h-9 gap-2 rounded-full border-primary/40 text-xs font-bold text-primary",
                "hover:bg-primary/10 hover:text-primary hover:border-primary/50"
              )}
              onClick={onAddReviewTags}
            >
              <Tag className="size-3.5 shrink-0" aria-hidden />
              Rate with tags
            </Button>
          )}
        </>
      )}
    </div>
  );
}
