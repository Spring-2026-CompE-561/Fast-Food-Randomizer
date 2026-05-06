// src/app/history/page.tsx
"use client";

import { Clock, Heart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import RestaurantCard from "@/components/ui/RestaurantCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useHistory } from "@/hooks/use-history";
import { restaurantCardMotionClass } from "@/lib/restaurant-card-helpers";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";


//based on Next.js App Router page structure
export default function HistoryPage(){
  const { historyItems, loading, error } = useHistory();

  //track favorited state per item
  const [favoritedItems, setFavoritedItems] = useState<Record<string, boolean>>(
    {}
  );

  //tracking animation state
  const [animating, setAnimating] = useState<Record<string, boolean>>({});


  {loading && <p>Loading...</p>}
  {error && <p className="text-red-500">{error}</p>}

    return(
        //Page background and spacing
      <ProtectedRoute>
        <main className="min-h-screen bg-background px-4 py-14 font-sans">
            {/* Hero section */}
            <section className="text-center mb-16">
                <h1 className="text-7xl font-black tracking-tight text-foreground">
                    Roll History
                </h1>

                <p className="mt-6 text-2xl text-muted-foreground">
                    Your recent randomizer picks
                </p>
            </section>

            {/* Loading state */}
            {loading && (
                <p className="text-center text-muted-foreground">Loading...</p>
            )}

            {/* Error state */}
            {error && (
                <p className="text-center text-red-500">{error}</p>
            )}

             {/* Empty state: shown when the logged-in user has no randomizer history yet */}
             {!loading && historyItems.length === 0 && (
                <section className="flex flex-col items-center justify-center text-center mt-24">
                    <Clock size={110} className="text-muted-foreground/40 mb-8" />
                    <h2 className="text-3xl text-muted-foreground mb-4">
                        No history yet!
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Use the randomizer to start building your history
                    </p>
                </section>
            )}

            {/* History grid: shown when history data exists */}
            {!loading && historyItems.length > 0 && (
                <section className="mx-auto grid max-w-5xl grid-cols-1 justify-items-center gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {historyItems.map((item, index) => (
                        <div key={`${item.name}-${index}`} className="relative">
                            
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        type="button"
                                        aria-label={`Add ${item.name} to favorites`}
                                        className="absolute top-5 right-5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card shadow-sm"
                                        onClick={() => {
                                            setFavoritedItems((prev) => ({
                                                ...prev,
                                                [item.name]: !prev[item.name],
                                            }));

                                            setAnimating((prev) => ({
                                                ...prev,
                                                [item.name]: true,
                                            }));

                                            setTimeout(() => {
                                                setAnimating((prev) => ({
                                                    ...prev,
                                                    [item.name]: false,
                                                }));
                                            }, 200);
                                        }}
                                        >
                                            <Heart
                                                size={16}
                                                strokeWidth={2.5}
                                                className={cn(
                                                    "transition-transform duration-200",
                                                    favoritedItems[item.name]
                                                        ? "fill-primary text-primary"
                                                        : "text-muted-foreground",
                                                    animating[item.name] ? "scale-125" : "scale-100"
                                                )}
                                            />
                                    </button>
                                </TooltipTrigger>
                                    
                                <TooltipContent side="left">
                                    {favoritedItems[item.name]
                                        ? "Remove from favorites"
                                        : "Add to favorites"}
                                </TooltipContent>
                            </Tooltip>

                            {/* Number indicator: newest item appears as #1 */}
                            <span className="absolute top-7 left-7 z-10 text-sm font-black text-muted-foreground">
                                #{index + 1}
                            </span>

                             {/* Reusable restaurant card component */}
                             <RestaurantCard
                                name={item.name}
                                price={item.price}
                                category={item.category}
                                onCampus={item.onCampus}
                                hoursDisplay={item.hoursDisplay}
                                showTagReviews={false}
                                className={`${restaurantCardMotionClass} md:w-[320px] pt-14`}
                            />
                        </div>
                    ))}
                </section>
            )} 
        </main>
      </ProtectedRoute>
    );
}