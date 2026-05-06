import Link from "next/link";
import { HelpCircle, LayoutGrid, MoveRight, Shuffle } from "lucide-react";
import { googleSearchHref } from "@/lib/restaurant-card-helpers";

/** Curated picks aligned with CraveRoll listings (seed data). Not live ranked—browse for full list. */
const HOME_FAQ_BLOCKS: {
  question: string;
  blurb: string;
  restaurants: string[];
}[] = [
  {
    question: "What are some of the best restaurants with outdoor seating?",
    blurb: "Sit-down and street-front spots near SDSU & College Ave where patio or sidewalk seating is common—always double-check with the venue.",
    restaurants: [
      "Eureka!",
      "Garden Restaurant (SDSU)",
      "Rubio’s Coastal Grill (SDSU)",
      "Pesto Italian Craft Kitchen",
      "Cafe Madeline",
      "Lolita’s Mexican Food",
      "Chipotle Mexican Grill (SDSU)",
      "Broken Yolk Cafe (SDSU)",
    ],
  },
  {
    question: "What are some of the best restaurants for lunch?",
    blurb: "Fast, filling midday picks students actually use between classes or before study blocks.",
    restaurants: [
      "Subway (SDSU)",
      "Panda Express (SDSU)",
      "Chipotle Mexican Grill (SDSU)",
      "Which Wich (SDSU)",
      "The Halal Shack (SDSU)",
      "Habit Burger Grill (SDSU)",
      "Shake Smart (SDSU)",
      "Everbowl (SDSU)",
      "Taco Bell (College Area)",
      "Starbucks (Aztec Student Union)",
    ],
  },
  {
    question: "What are some of the best vegan-friendly restaurants?",
    blurb: "Places with clearly labeled vegan bowls, burritos, or plant-forward menus in our listings.",
    restaurants: [
      "The Radical Beet",
      "Everbowl (SDSU)",
      "Chipotle Mexican Grill (SDSU)",
      "University Towers Kitchen (UTK)",
    ],
  },
];

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
            className="bg-accent/75 rounded-[45px] p-12 text-accent/75-foreground min-h-[420px] flex flex-col items-center justify-center text-center shadow-2xl shadow-accent/35 border border-transparent transition-all duration-300 ease-out
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
            className="bg-primary/75 rounded-[45px] p-12 text-primary-foreground min-h-[420px] flex flex-col items-center justify-center text-center shadow-2xl shadow-primary/35 border border-transparent transition-all duration-300 ease-out
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

      <section
        className="w-full max-w-5xl border-t border-border mt-10 pt-16 pb-24"
        aria-labelledby="home-faq-heading"
      >
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <span className="inline-flex items-center justify-center rounded-2xl bg-primary/10 p-3 ring-2 ring-primary/15">
            <HelpCircle className="size-8 text-primary" aria-hidden />
          </span>
          <h2
            id="home-faq-heading"
            className="text-3xl md:text-4xl font-black tracking-tight text-foreground"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Quick answers based on spots we list around campus. See every venue on{" "}
            <Link href="/browse" className="font-semibold text-primary underline-offset-4 hover:underline">
              Browse
            </Link>{" "}
            or roll the dice on the{" "}
            <Link
              href="/randomizer"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Randomizer
            </Link>
            .
          </p>
        </div>

        <div className="space-y-14">
          {HOME_FAQ_BLOCKS.map(({ question, blurb, restaurants }) => (
            <article key={question}>
              <h3 className="text-xl md:text-2xl font-black text-foreground leading-snug mb-3 text-center">
                {question}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-3xl mx-auto text-center">
                {blurb}
              </p>
              <ul className="mx-auto grid w-full max-w-4xl grid-cols-1 justify-items-center gap-y-2 sm:grid-cols-2 sm:gap-x-12">
                {restaurants.map((name) => (
                  <li key={name} className="text-center leading-snug">
                    <a
                      href={googleSearchHref(name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm md:text-base font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                      aria-label={`Search Google for ${name}`}
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
