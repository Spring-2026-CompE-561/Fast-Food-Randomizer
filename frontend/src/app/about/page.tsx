import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  Heart,
  MapPin,
  Moon,
  Shuffle,
  SlidersHorizontal,
  Wallet,
} from "lucide-react";

type TeamMember = {
  name: string;
  bio: string;
  /** Optional: add `frontend/public/team/yourname.jpg` then set e.g. `photo: "/team/yourname.jpg"`. */
  photo?: string;
};

const team: TeamMember[] = [
  {
    name: "Valerie Joy Pinto",
    bio: "Keeps our API and data layer solid so random picks stay fast and trustworthy between classes.",
    photo: "/team/valpfp.jpg",
  },
  {
    name: "Sydney Kim",
    bio: "Shapes the CraveRoll experience on the web—layout, colors, and flows built for real SDSU schedules.",
    photo: "/team/sydneypfp.jpg",
  },
  {
    name: "Aliza Siddiqui",
    bio: "Bridges design and logic so filters and favorites feel obvious the first time you use them.",
    photo: "/team/alizapfp.JPEG",
  },
  {
    name: "Melina Kai Kwarcinski",
    bio: "Makes sure the app reflects how students actually eat: quick, social, and never overcomplicated.",
    photo: "/team/melinapfp.jpg",
  },
  {
    name: "Kaitlin Bituen",
    bio: "Helps tune copy and flows so the randomizer feels friendly, not like another homework assignment.",
    photo: "/team/kaitlinpfp.JPG",
  },
];

function teamAvatarUrl(name: string) {
  const params = new URLSearchParams({
    size: "320",
    name,
    background: "ff9b17",
    color: "2a1810",
    bold: "true",
  });
  return `https://ui-avatars.com/api/?${params.toString()}`;
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-14 font-sans">
      <section className="text-center mb-16">
        <h1 className="text-7xl font-black tracking-tight text-foreground">
          About CraveRoll
        </h1>
        <p className="mt-6 text-2xl text-muted-foreground max-w-2xl mx-auto">
          Built by SDSU students for SDSU life—turning indecision into instant plans.
        </p>
      </section>

      <Card className="w-full max-w-5xl mx-auto rounded-[30px] shadow-xl border border-border mb-12">
        <CardContent className="p-10 md:p-12">
          <h2 className="text-4xl font-black text-foreground mb-8 text-center">
            Our Mission
          </h2>
          <div className="space-y-8 text-center text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto">
            <p>
              CraveRoll was built <span className="text-foreground font-semibold">by SDSU students, for SDSU students</span>.
              We know the scramble between lectures, the 10:30 p.m. library hunger, and the reality
              of making rent, tuition, and still eating something decent this week.
            </p>
            <p>
              That is why we designed CraveRoll specifically around how Aztecs actually move: short
              walks, weird hours, and budgets that do not pretend everyone is on a brunch budget.
            </p>
            <div>
              <p className="text-foreground font-semibold mb-4">
                Our listings lean into the spots you really use, including:
              </p>
              <ul className="space-y-5">
                <li className="mx-auto flex max-w-2xl items-start justify-center gap-3 text-center">
                  <Building2
                    className="size-9 shrink-0 text-primary mt-0.5"
                    aria-hidden
                  />
                  <span>
                    <strong className="text-foreground">On campus</strong> — quick bites between
                    classes, coffee runs, and dining options you can reach without missing the
                    next lecture.
                  </span>
                </li>
                <li className="mx-auto flex max-w-2xl items-start justify-center gap-3 text-center">
                  <Moon className="size-9 shrink-0 text-primary mt-0.5" aria-hidden />
                  <span>
                    <strong className="text-foreground">Late-night eats</strong> — places that are
                    still an option when your study block runs past dinner and the dining hall
                    window is long gone.
                  </span>
                </li>
                <li className="mx-auto flex max-w-2xl items-start justify-center gap-3 text-center">
                  <Wallet className="size-9 shrink-0 text-primary mt-0.5" aria-hidden />
                  <span>
                    <strong className="text-foreground">Cheap student options</strong> — meals that
                    respect a real college wallet, from quick solo runs to splitting something
                    affordable with roommates.
                  </span>
                </li>
              </ul>
            </div>
            <p className="mx-auto max-w-2xl border-t-4 border-primary pt-5 text-foreground/95 font-medium">
              CraveRoll is built for real student budgets and real student schedules—so you spend
              less time debating &quot;where should we eat?&quot; and more time eating.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-5xl mx-auto rounded-[30px] shadow-xl border border-border mb-12">
        <CardContent className="p-10">
          <h2 className="text-4xl font-black text-foreground mb-10 text-center">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="flex flex-col items-center gap-4 text-center">
              <Shuffle size={52} className="text-accent shrink-0" aria-hidden />
              <div>
                <h3 className="text-2xl font-black text-foreground mb-3">
                  Smart Randomizer
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Can&apos;t decide? Let our randomizer pick for you with customizable filters.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <SlidersHorizontal size={52} className="text-primary shrink-0" aria-hidden />
              <div>
                <h3 className="text-2xl font-black text-foreground mb-3">
                  Smart Filters
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Sort by cuisine, price, and preferences so you only see spots that fit your budget
                  and your mood.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <Heart size={52} className="text-accent shrink-0" aria-hidden />
              <div>
                <h3 className="text-2xl font-black text-foreground mb-3">
                  Save Favorites
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Keep track of your go-to spots and discover new favorites.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <MapPin size={52} className="text-chart-2 shrink-0" aria-hidden />
              <div>
                <h3 className="text-2xl font-black text-foreground mb-3">
                  31+ Local Spots Around SDSU
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  On-campus dining and College Area walkable favorites built for how Aztecs actually
                  eat between classes.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="w-full max-w-5xl mx-auto bg-accent rounded-[30px] p-10 shadow-xl text-accent-foreground text-center mb-12 shadow-accent/30">
        <h2 className="text-4xl font-black mb-10">By The Numbers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <p className="text-5xl font-black">31+</p>
            <p className="mt-3 text-lg">Restaurants</p>
          </div>
          <div>
            <p className="text-5xl font-black">10</p>
            <p className="mt-3 text-lg">Categories</p>
          </div>
          <div>
            <p className="text-5xl font-black">∞</p>
            <p className="mt-3 text-lg">Possibilities</p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-5xl mx-auto mb-8 px-10">
        <h2 className="text-4xl font-black text-foreground mb-3 text-center">
          Meet The Team
        </h2>
        <div className="mb-12 w-full space-y-5 text-center text-muted-foreground text-lg leading-relaxed">
          <p>
            <strong className="font-semibold text-foreground">CraveRoll</strong> was built by a group
            of students at{" "}
            <strong className="font-semibold text-foreground">
              San Diego State University
            </strong>{" "}
            as part of{" "}
            <strong className="font-semibold text-foreground">COMPE 561</strong>, where we
            collaborated to design and develop a full-stack application from the ground up. Each of
            us contributed to different parts of the project, from frontend design to backend
            development, all while learning how to work as a real development team.
          </p>
          <p>
            We&apos;d also like to give a special thank you to{" "}
            <strong className="font-semibold text-foreground">Ugur Dogan</strong> for guiding us
            throughout the course and teaching us the skills that made this project possible. His
            support and instruction played a huge role in bringing{" "}
            <strong className="font-semibold text-foreground">CraveRoll</strong> to life.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
          {team.map(({ name, bio, photo }) => (
            <div
              key={name}
              className="flex flex-col items-center text-center rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <img
                src={photo ?? teamAvatarUrl(name)}
                alt={name}
                width={160}
                height={160}
                className="w-40 h-40 rounded-2xl object-cover border-2 border-border shadow-md mb-5 bg-muted"
              />
              <h3 className="font-heading text-xl font-semibold text-card-foreground leading-snug">
                {name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{bio}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
