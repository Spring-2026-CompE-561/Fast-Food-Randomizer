"use client";

import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface RestaurantCardProps {
  name: string;
  price: string;
  category: string;
  onCampus: boolean;
  /** Hours of operation line from the API (e.g. &quot;Mon–Sun 7:00 AM–9:00 PM&quot;). */
  hoursDisplay?: string | null;
  className?: string;
}

export default function RestaurantCard({
  name,
  price,
  category,
  onCampus,
  hoursDisplay,
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

      {hoursDisplay != null && String(hoursDisplay).trim() !== "" && (
        <p className="flex w-full max-w-sm items-start justify-center gap-2 text-sm leading-snug text-muted-foreground">
          <Clock className="size-4 shrink-0 mt-0.5 text-primary/80" aria-hidden />
          <span>{hoursDisplay}</span>
        </p>
      )}
    </div>
  );
}
