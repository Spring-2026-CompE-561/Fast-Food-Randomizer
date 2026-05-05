import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import {
  Activity,
  BookOpen,
  Heart,
  Moon,
  Shuffle,
  Tag,
  UsersRound,
  UtensilsCrossed,
  Volume2,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { ReviewTagSlug } from "@/lib/review-tags";

const ICON_MAP = {
  fast: Zap,
  late_night: Moon,
  good_portions: UtensilsCrossed,
  hit_or_miss: Shuffle,
  good_for_groups: UsersRound,
  study_friendly: BookOpen,
  loud: Volume2,
  always_busy: Activity,
  date_spot: Heart,
} satisfies Record<ReviewTagSlug, ComponentType<LucideProps>>;

type Props = LucideProps & {
  slug: string;
};

export function ReviewTagIcon({ slug, className, ...props }: Props) {
  const Icon = ICON_MAP[slug as ReviewTagSlug] ?? Tag;
  return (
    <Icon
      className={cn("shrink-0 stroke-[2.25]", className)}
      aria-hidden
      {...props}
    />
  );
}
