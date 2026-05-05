import { Skeleton } from "@/components/ui/skeleton";

export function RestaurantCardSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center justify-self-center gap-4 rounded-[32px] border border-border bg-card p-8 text-center shadow-sm">
      <Skeleton className="mx-auto h-8 w-4/5 rounded-lg" />
      <div className="flex flex-wrap justify-center gap-2">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
      <Skeleton className="h-4 w-[85%] max-w-xs rounded-md" />
    </div>
  );
}

export function RestaurantCardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 gap-8 max-w-5xl mx-auto pb-8">
      {Array.from({ length: count }).map((_, i) => (
        <RestaurantCardSkeleton key={i} />
      ))}
    </div>
  );
}
