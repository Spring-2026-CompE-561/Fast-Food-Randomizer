/** Price badge from API `price_range` (1–4). */
export function priceFromRange(range: number | string | null | undefined): string {
  const n =
    typeof range === "number"
      ? range
      : typeof range === "string"
        ? parseInt(range, 10)
        : NaN;
  const safe = Number.isFinite(n) ? Math.min(Math.max(n, 1), 4) : 2;
  return "$".repeat(safe);
}

/** Heuristic until API exposes on-campus flag */
export function looksOnCampus(name: string): boolean {
  const n = name.toLowerCase();
  return (
    n.includes("(sdsu)") ||
    n.includes("student union") ||
    n.includes("aztec market") ||
    n.includes("(utk)") ||
    n.includes("south campus plaza") ||
    n.includes("shake smart")
  );
}

/** Shared motion for restaurant cards (Browse, History, Randomizer, Favorites). */
export const restaurantCardMotionClass =
  "transition-all duration-300 ease-out hover:scale-[1.025] hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20 hover:border-primary/20 hover:ring-2 hover:ring-primary/15";
