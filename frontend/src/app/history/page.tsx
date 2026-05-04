// src/app/history/page.tsx
"use client";

import { Clock } from "lucide-react";
import RestaurantCard from "@/components/ui/RestaurantCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useHistory } from "@/hooks/use-history";


//based on Next.js App Router page structure
export default function HistoryPage(){
  const { historyItems, loading, error } = useHistory();

  {loading && <p>Loading...</p>}
  {error && <p className="text-red-500">{error}</p>}

    return(
        //Page background and spacing
      <ProtectedRoute>
        <main className="min-h-screen bg-background px-4 py-14 font-sans">
            {/* Hero section */}
            <section className="text-center mb-16">
                <div className="flex items-center justify-center gap-6">
                    <span className="text-6xl">📜</span>
                    <h1 className="text-7xl font-black tracking-tight text-foreground">
                        Roll History
                    </h1>
                </div>

                <p className="mt-6 text-2xl text-muted-foreground">
                    Your recent randomizer picks
                </p>
            </section>

             {/* Empty state: shown when the logged-in user has no randomizer history yet */}
             {historyItems.length === 0 && (
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
            {historyItems.length > 0 && (
                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {historyItems.map((item, index) => (
                        <div key={`${item.name}-${index}`} className="relative">
                            {/* Number indicator: newest item appears as #1 */}
                            <span className="absolute top-6 right-6 z-10 text-muted-foreground font-bold">
                                #{index + 1}
                            </span> 

                             {/* Reusable restaurant card component */}
                             <RestaurantCard
                                name={item.name}
                                emoji={item.emoji}
                                rating={item.rating}
                                reviews={item.reviews}
                                price={item.price}
                                category={item.category}
                                onCampus={item.onCampus}
                            />
                        </div>
                    ))}
                </section>
            )} 
        </main>
      </ProtectedRoute>
    );
}