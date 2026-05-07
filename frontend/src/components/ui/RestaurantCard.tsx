"use client";

import type { KeyboardEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Tag } from "lucide-react";
import { ReviewTagIcon } from "@/components/review-tag-icon";
import { googleSearchHref } from "@/lib/restaurant-card-helpers";
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
  onFavoriteClick?: () => void;
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
  onFavoriteClick,
}: RestaurantCardProps) {
  const tagsForCard = reviewTagsSortedByVotes(reviewTagCounts);

  function openGoogleSearch() {
    window.open(
      googleSearchHref(name),
      "_blank",
      "noopener,noreferrer"
    );
  }

  function handleCardClick() {
    openGoogleSearch();
  }

  function handleCardKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    openGoogleSearch();
  }

  return (
    <div
      className={cn(
        "mx-auto grid w-full max-w-md justify-items-center rounded-[32px] border border-border bg-card p-8 text-center shadow-sm transition-shadow hover:shadow-md",
        showTagReviews ? "gap-4" : "gap-3",
        className
      )}
    >
      {/* Link region excludes the tag button so we don’t nest interactive controls */}
      <div
        role="link"
        tabIndex={0}
        aria-label={`${name}. Opens Google search in a new tab`}
        className="flex w-full cursor-pointer flex-col items-center gap-4 text-center rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        onClick={handleCardClick}
        onKeyDown={handleCardKeyDown}
      >
        <div className="w-full">
          <h3 className="text-2xl font-black tracking-tight text-card-foreground">
            {name}
          </h3>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
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

        <div className="flex min-h-[2rem] w-full max-w-sm flex-col items-center gap-2">
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
            onAddReviewTags && (
              <p className="text-center text-xs font-medium text-muted-foreground">
                No crowd tags yet — tap below to add yours.
              </p>
            )
          )}
        </div>
      </div>

      {restaurantId != null && onAddReviewTags && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={cn(
            "h-9 min-h-9 shrink-0 gap-2 rounded-full border-primary/40 px-4 text-xs font-bold text-primary",
            "hover:bg-primary/10 hover:text-primary hover:border-primary/50",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onAddReviewTags();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") e.stopPropagation();
          }}
        >
          <Tag className="size-3.5 shrink-0 text-primary" aria-hidden />
          Rate with tags
        </Button>
      )}
    </div>
  );
}
