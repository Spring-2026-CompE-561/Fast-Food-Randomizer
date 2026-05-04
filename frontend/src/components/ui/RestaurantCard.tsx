"use client";

import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RestaurantCardProps {
  name: string;
  emoji: string;
  rating: number;
  reviews: number;
  price: string;
  category: string;
  onCampus: boolean;
}

export default function RestaurantCard({
  name,
  emoji,
  rating,
  reviews,
  price,
  category,
  onCampus,
}: RestaurantCardProps) {
  return (
    <div className="bg-card rounded-[32px] p-8 shadow-sm border border-border flex flex-col gap-4 hover:shadow-md transition-shadow">
      <div className="text-5xl">{emoji}</div>

      <div>
        <h3 className="text-2xl font-black tracking-tight text-card-foreground">
          {name}
        </h3>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1 mt-1 w-fit cursor-help">
              <Star size={16} className="fill-primary text-primary" aria-hidden />
              <span className="font-bold text-foreground">{rating}</span>
              <span className="text-muted-foreground text-sm">({reviews})</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            Stars from student reviews — higher usually means a crowd favorite.
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
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
    </div>
  );
}
