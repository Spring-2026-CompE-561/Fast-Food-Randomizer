import Link from "next/link";
import { LayoutGrid, MoveRight, Shuffle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-73px)] bg-background flex flex-col items-center pt-20 px-4 font-sans">
      <div className="text-center mb-16 flex flex-col items-center space-y-5">
        <h1 className="text-8xl font-black tracking-tighter text-foreground">
          CraveRoll
        </h1>
        <p className="text-2xl font-bold tracking-tight text-muted-foreground">
          SDSU&apos;s Official Fast-Food Randomizer
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl pb-16">
        <Link
          href="/randomizer"
          className="group rounded-[45px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          <div
            className="bg-accent rounded-[45px] p-12 text-accent-foreground min-h-[420px] flex flex-col items-center justify-center text-center shadow-2xl shadow-accent/35 border border-transparent transition-all duration-300 ease-out
            hover:scale-[1.025] hover:-translate-y-2 hover:shadow-accent/45 hover:border-accent-foreground/20
            active:scale-[0.98] active:translate-y-0"
          >
            <Shuffle
              size={70}
              strokeWidth={2.5}
              className="mb-6 shrink-0 transition-transform duration-300 ease-out group-hover:rotate-[-8deg] group-hover:scale-110"
              aria-hidden
            />
            <h2 className="text-4xl font-black tracking-tight mb-4">Randomizer</h2>
            <p className="text-lg font-medium opacity-90 mb-8 leading-relaxed max-w-[320px] transition-opacity duration-300 group-hover:opacity-100">
              Feeling indecisive? Let fate choose your next meal! Filter by category and roll the
              dice.
            </p>
            <div className="flex items-center gap-2 text-xl font-black tracking-tight transition-[gap] duration-300 ease-out group-hover:gap-3">
              Get Started
              <MoveRight
                strokeWidth={3}
                className="size-7 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-2"
                aria-hidden
              />
            </div>
          </div>
        </Link>

        <Link
          href="/browse"
          className="group rounded-[45px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          <div
            className="bg-primary rounded-[45px] p-12 text-primary-foreground min-h-[420px] flex flex-col items-center justify-center text-center shadow-2xl shadow-primary/35 border border-transparent transition-all duration-300 ease-out
            hover:scale-[1.025] hover:-translate-y-2 hover:shadow-primary/45 hover:border-primary-foreground/20
            active:scale-[0.98] active:translate-y-0"
          >
            <LayoutGrid
              size={70}
              strokeWidth={2.5}
              className="mb-6 shrink-0 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:opacity-100"
              aria-hidden
            />
            <h2 className="text-4xl font-black tracking-tight mb-4">Browse All</h2>
            <p className="text-lg font-medium opacity-90 mb-8 leading-relaxed max-w-[320px] transition-opacity duration-300 group-hover:opacity-100">
              Know what you want? Browse through all SDSU restaurants and College Area favorites.
            </p>
            <div className="flex items-center gap-2 text-xl font-black tracking-tight transition-[gap] duration-300 ease-out group-hover:gap-3">
              Explore Restaurants
              <MoveRight
                strokeWidth={3}
                className="size-7 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-2"
                aria-hidden
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
