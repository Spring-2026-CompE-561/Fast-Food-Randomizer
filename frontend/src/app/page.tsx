// frontend/src/app/page.tsx
import Link from "next/link";
import { Shuffle, LayoutGrid, MoveRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-73px)] bg-[#E8F4FD] flex flex-col items-center pt-20 px-4 font-sans">
      {/* Hero Header */}
      <div className="text-center mb-16 space-y-2">
        <h1 className="text-8xl font-black tracking-tighter text-[#1E293B] lowercase">
          craveroll
        </h1>
        <p className="text-2xl font-bold tracking-tight text-[#475569]">
         SDSU's Official Fast-Food Randomizer
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        
        {/* Randomizer Card */}
        <Link href="/randomizer" className="group">
          <div className="bg-[#FF5722] rounded-[45px] p-12 text-white h-[420px] flex flex-col items-center justify-center text-center shadow-2xl transition-transform hover:scale-[1.01]">
            <Shuffle size={70} strokeWidth={2.5} className="mb-6" />
            <h2 className="text-4xl font-black tracking-tight mb-4">Randomizer</h2>
            <p className="text-lg font-medium opacity-90 mb-8 leading-relaxed max-w-[320px]">
              Feeling indecisive? Let fate choose your next meal! Filter by category and roll the dice.
            </p>
            <div className="flex items-center gap-2 text-xl font-black tracking-tight">
              Get Started <MoveRight strokeWidth={3} />
            </div>
          </div>
          <Link href="/randomizer" className="flex items-center gap-2 text-2xl font-bold group">
            Get Started <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* Browse All Card */}
        <Link href="/browse" className="group">
          <div className="bg-[#9333EA] rounded-[45px] p-12 text-white h-[420px] flex flex-col items-center justify-center text-center shadow-2xl transition-transform hover:scale-[1.01]">
            <LayoutGrid size={70} strokeWidth={2.5} className="mb-6" />
            <h2 className="text-4xl font-black tracking-tight mb-4">Browse All</h2>
            <p className="text-lg font-medium opacity-90 mb-8 leading-relaxed max-w-[320px]">
              Know what you want? Browse through all SDSU restaurants and College Area favorites.
            </p>
            <div className="flex items-center gap-2 text-xl font-black tracking-tight">
              Explore Restaurants <MoveRight strokeWidth={3} />
            </div>
          </div>
        </Link>

      </div>
    </main>
  );
}
