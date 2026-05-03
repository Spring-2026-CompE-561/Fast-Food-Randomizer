//// src/app/about/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Shuffle, Star, Heart, MapPin } from "lucide-react";

//Based on Next.js App Router page structure
export default function AboutPage() {
    return (
       //Page background and spacing
       <main className="min-h-screen bg-[#E8F4FD] px-4 py-14 font-sans">
        {/* Hero section: introduces the About page */}
        <section className="text-center mb-16">
            <h1 className="text-7xl font-black tracking-tight text-[#111827]">
                About craveroll
            </h1>
            <p className="mt-6 text-2xl text-[#334155]">
                Your ultimate SDSU dining companion
            </p>
        </section>

        {/* Mission section: explains the purpose of craveroll */}
        <Card className="w-full max-w-5xl mx-auto rounded-[30px] shadow-xl border border-white/20 mb-12">
            <CardContent className="p-10">
                <h2 className="text-4xl font-black text-[#111827] mb-6">
                    Our Mission
                </h2>
                <p className="text-xl leading-relaxed text-[#475569]">
                    craveroll was built by SDSU students, for SDSU students. We
                    understand the daily struggle of deciding where to eat between
                    classes or after a long study session. Our mission is to make dining
                    decisions effortless, fun, and delicious!
                </p>
            </CardContent>
        </Card>
        
        {/* What We Offer section: highlights main features */}
        <Card className="w-full max-w-5xl mx-auto rounded-[30px] shadow-xl border border-white/20 mb-12">
            <CardContent className="p-10">
                <h2 className="text-4xl font-black text-[#111827] mb-10">
                    What We Offer
                </h2>

                {/* Grid of features from Tailwind's grid system */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* Feature 1: Randomizer */}
                    <div className="flex gap-5">
                        <Shuffle size={52} className="text-[#FF5722] shrink-0" />
                        <div>
                            <h3 className="text-2xl font-black text-[#111827] mb-3">
                                Smart Randomizer
                            </h3>
                            <p className="text-lg leading-relaxed text-[#64748B]">
                                Can't decide? Let our randomizer pick for you with customizable filters!
                            </p>
                        </div>
                    </div>

                    {/* Feature 2: Reviews */}
                    <div className="flex gap-5">
                        <Star size={52} className="text-[#EAB308] shrink-0" />
                        <div>
                            <h3 className="text-2xl font-black text-[#111827] mb-3">
                                Real Reviews
                            </h3>
                            <p className="text-lg leading-relaxed text-[#64748B]">
                                Authentic student reviews and ratings to help you choose wisely.
                            </p>
                        </div>
                    </div>

                    {/* Feature 3: Favorites */}
                    <div className="flex gap-5">
                        <Heart size={52} className="text-[#FF2D3D] shrink-0" />
                        <div>
                            <h3 className="text-2xl font-black text-[#111827] mb-3">
                                Save Favorites
                            </h3>
                            <p className="text-lg leading-relaxed text-[#64748B]">
                                Keep track of your go-to spots and discover new favorites.
                            </p>
                        </div>
                    </div>

                    {/* Feature 4: Locations */}
                    <div className="flex gap-5">
                        <MapPin size={52} className="text-[#22C55E] shrink-0" />
                        <div>
                            <h3 className="text-2xl font-black text-[#111827] mb-3">
                                31+ Locations
                            </h3>
                            <p className="text-lg leading-relaxed text-[#64748B]">
                                From on-campus dining to College Area favorites.
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        {/* Stats section: summarizes key craveroll numbers */}
        <section className="w-full max-w-5xl mx-auto bg-[#FF5722] rounded-[30px] p-10 shadow-xl text-white text-center mb-12">
            <h2 className="text-4xl font-black mb-10">By The Numbers</h2>

            {/* Responsive stats grid using Tailwind CSS grid utilities */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

                {/*  Restaurant count */}
                <div>
                    <p className="text-5xl font-black">31+</p>
                    <p className="mt-3 text-lg">Restaurants</p>
                </div>

            </div>
        </section>



    

       </main>    
    );
}