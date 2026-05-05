"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ApiUnauthorizedError } from "@/lib/api";
import { ReviewTagIcon } from "@/components/review-tag-icon";
import { REVIEW_TAG_OPTIONS, type ReviewTagSlug } from "@/lib/review-tags";
import { fetchMyRestaurantTags, putMyRestaurantTags } from "@/lib/reviews";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  restaurantId: number | null;
  restaurantName: string;
  isAuthenticated: boolean;
  onSaved: () => void;
};

export function RestaurantReviewSheet({
  open,
  onOpenChange,
  restaurantId,
  restaurantName,
  isAuthenticated,
  onSaved,
}: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadTags = useCallback(async () => {
    if (restaurantId == null || !isAuthenticated) return;
    setLoading(true);
    try {
      const data = await fetchMyRestaurantTags(restaurantId);
      setSelected(new Set(data.tags));
    } catch (e) {
      if (e instanceof ApiUnauthorizedError) {
        setSelected(new Set());
      } else {
        toast.error("Couldn’t load your tags");
      }
    } finally {
      setLoading(false);
    }
  }, [restaurantId, isAuthenticated]);

  useEffect(() => {
    if (open && restaurantId != null && isAuthenticated) {
      void loadTags();
    }
    if (open && !isAuthenticated) {
      setSelected(new Set());
    }
  }, [open, restaurantId, isAuthenticated, loadTags]);

  function toggle(slug: ReviewTagSlug) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  async function handleSave() {
    if (restaurantId == null) return;
    if (!isAuthenticated) {
      toast.message("Sign in to save tags", {
        description: "Create an account or log in first.",
      });
      return;
    }
    setSaving(true);
    try {
      await putMyRestaurantTags(restaurantId, [...selected]);
      toast.success("Tags saved");
      onSaved();
      onOpenChange(false);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-[28px] px-6 pb-8 pt-2 max-h-[85vh]">
        <SheetHeader className="text-left pb-2">
          <SheetTitle className="font-heading text-xl font-black">
            Quick tags
          </SheetTitle>
          <SheetDescription className="text-base">
            {restaurantName ? (
              <>
                Tap what fits for{" "}
                <span className="font-semibold text-foreground">{restaurantName}</span>.
              </>
            ) : (
              "Tap what fits — no essays required."
            )}
          </SheetDescription>
        </SheetHeader>

        {!isAuthenticated ? (
          <div className="rounded-2xl border border-border bg-muted/40 px-4 py-6 text-center text-sm text-muted-foreground">
            <p className="mb-4">
              Sign in to add tags and help other Aztecs decide faster.
            </p>
            <Button asChild className="rounded-full font-black">
              <Link href="/login">Log in</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 py-4">
              {REVIEW_TAG_OPTIONS.map(({ slug, label }) => {
                const on = selected.has(slug);
                return (
                  <button
                    key={slug}
                    type="button"
                    disabled={loading}
                    onClick={() => toggle(slug)}
                    className={cn(
                      "group inline-flex items-center gap-2 rounded-full border-2 px-4 py-2.5 text-sm font-bold transition-all duration-200",
                      on
                        ? "border-primary bg-primary text-primary-foreground shadow-md scale-[1.02]"
                        : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    )}
                  >
                    <ReviewTagIcon
                      slug={slug}
                      className={cn(
                        "size-4 transition-colors",
                        on
                          ? "text-primary-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      )}
                    />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            <SheetFooter className="flex-row gap-3 sm:justify-stretch">
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-full font-semibold"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="flex-1 rounded-full font-black"
                disabled={saving || loading}
                onClick={() => void handleSave()}
              >
                {saving ? "Saving…" : "Save"}
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
