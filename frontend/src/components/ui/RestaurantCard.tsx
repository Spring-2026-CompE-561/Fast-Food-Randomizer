"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
import { ReviewTagIcon } from "@/components/review-tag-icon";
import { reviewTagsSortedByVotes } from "@/lib/review-tags";
import { cn } from "@/lib/utils";

interface RestaurantCardProps {
  name: string;
  price: string;
  category: string;
  onCampus: boolean;
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
  restaurantId,
  reviewTagCounts,
  onAddReviewTags,
  className,
}: RestaurantCardProps) {
  const tagsForCard = reviewTagsSortedByVotes(reviewTagCounts);

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-md justify-self-center bg-card rounded-[32px] p-8 shadow-sm border border-border flex flex-col items-center gap-4 text-center hover:shadow-md transition-shadow",
        className
      )}
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

      {restaurantId != null && onAddReviewTags && (
        <Button
          type="button"
          variant={tagsForCard.length > 0 ? "ghost" : "outline"}
          size="sm"
          className={cn(
            "h-9 gap-2 rounded-full text-xs font-bold",
            tagsForCard.length > 0
              ? "text-primary hover:text-primary"
              : "border-primary/40 text-primary"
          )}
          onClick={onAddReviewTags}
        >
          <Tag className="size-3.5 shrink-0" aria-hidden />
          Rate with tags
        </Button>
      )}
    </div>
  );
}
