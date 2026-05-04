// src/app/history/page.tsx

//Placeholders until backend/auth is connected
//Newest randomizer results appear first in array
const historyItems = [
  {
    name: "Los Primos Mexican Food",
    emoji: "🌯",
    rating: 4.5,
    reviews: 689,
    price: "$",
    category: "Mexican",
    onCampus: false,
  },
  {
    name: "Oggi's Pizza",
    emoji: "🍕",
    rating: 4.2,
    reviews: 534,
    price: "$$",
    category: "Pizza",
    onCampus: false,
  },
  {
    name: "Chipotle",
    emoji: "🌯",
    rating: 4.3,
    reviews: 2341,
    price: "$$",
    category: "Mexican",
    onCampus: true,
  },
];

//based on Next.js App Router page structure
export default function HistoryPage(){
    return(
        //Page background and spacing
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
        </main>
    );
}