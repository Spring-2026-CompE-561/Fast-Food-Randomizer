"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RestaurantCardProps {
  name: string;
  price: string;
  category: string;
  onCampus: boolean;
  className?: string;
}

export default function RestaurantCard({
  name,
  price,
  category,
  onCampus,
  className,
}: RestaurantCardProps) {
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
    </div>
  );
}
