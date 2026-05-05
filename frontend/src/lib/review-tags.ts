/** Must match backend ALLOWED_REVIEW_TAG_SLUGS order for ties. */
export const REVIEW_TAG_SLUGS = [
  "fast",
  "late_night",
  "good_portions",
  "hit_or_miss",
  "good_for_groups",
  "study_friendly",
  "loud",
  "always_busy",
  "date_spot",
] as const;

export type ReviewTagSlug = (typeof REVIEW_TAG_SLUGS)[number];

export const REVIEW_TAG_OPTIONS: { slug: ReviewTagSlug; label: string }[] = [
  { slug: "fast", label: "Fast" },
  { slug: "late_night", label: "Late night" },
  { slug: "good_portions", label: "Good portions" },
  { slug: "hit_or_miss", label: "Hit or miss" },
  { slug: "good_for_groups", label: "Good for groups" },
  { slug: "study_friendly", label: "Study-friendly" },
  { slug: "loud", label: "Loud" },
  { slug: "always_busy", label: "Always busy" },
  { slug: "date_spot", label: "Date spot" },
];

const LABEL_BY_SLUG = Object.fromEntries(
  REVIEW_TAG_OPTIONS.map((o) => [o.slug, o.label])
) as Record<ReviewTagSlug, string>;

const KNOWN_SLUG_SET = new Set<string>(REVIEW_TAG_SLUGS);

export function reviewTagLabel(slug: string): string {
  return LABEL_BY_SLUG[slug as ReviewTagSlug] ?? slug;
}

export function reviewTagsSortedByVotes(
  counts: Record<string, number> | null | undefined
): { slug: string; count: number; label: string }[] {
  const entries = Object.entries(counts ?? {}).filter(
    ([slug, n]) => n > 0 && KNOWN_SLUG_SET.has(slug)
  );
  const orderIdx = (s: string) => {
    const i = REVIEW_TAG_SLUGS.indexOf(s as ReviewTagSlug);
    return i === -1 ? 99 : i;
  };
  entries.sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return orderIdx(a[0]) - orderIdx(b[0]);
  });
  return entries.map(([slug, count]) => ({
    slug,
    count,
    label: reviewTagLabel(slug),
  }));
}
