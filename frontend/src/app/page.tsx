// src/app/page.tsx
import Link from "next/link";
import { Shuffle, LayoutGrid, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-6 pt-16 pb-24 text-center">
      {/* Hero Header */}
      <div className="mb-20 space-y-4">
        <h1 className="text-[120px] font-serif font-bold leading-none text-[#2D2D2D]">
          CraveRoll
        </h1>
        <p className="text-3xl font-bold text-slate-600 tracking-tight">
          SDSU'S Official Fast-Food Randomizer
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {/* Randomizer Card */}
        <div className="bg-[#E67E5F] rounded-[60px] p-16 text-white flex flex-col items-center justify-between min-h-[500px] shadow-lg">
          <Shuffle size={80} strokeWidth={2.5} />
          <div className="space-y-4">
            <h2 className="text-6xl font-serif font-bold">Randomizer</h2>
            <p className="text-xl font-medium max-w-xs mx-auto leading-relaxed opacity-90">
              Feeling indecisive? Let fate choose your next meal! Filter by category and roll the dice.
            </p>
          </div>
          <Link href="/randomizer" className="flex items-center gap-2 text-2xl font-bold group">
            Get Started <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* Browse Card */}
        <div className="bg-[#F0BB54] rounded-[60px] p-16 text-[#2D2D2D] flex flex-col items-center justify-between min-h-[500px] shadow-lg">
          <LayoutGrid size={80} strokeWidth={2.5} />
          <div className="space-y-4">
            <h2 className="text-6xl font-serif font-bold">Browse All</h2>
            <p className="text-xl font-medium max-w-xs mx-auto leading-relaxed opacity-80">
              Know what you want? Browse through all SDSU restaurants and College Area favorites.
            </p>
          </div>
          <Link href="/browse" className="flex items-center gap-2 text-2xl font-bold group">
            Explore Restaurants <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </main>
  );
}