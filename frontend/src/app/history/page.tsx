// src/app/history/page.tsx

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