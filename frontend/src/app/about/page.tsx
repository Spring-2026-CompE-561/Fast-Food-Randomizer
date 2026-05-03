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
            <h1 className="text-7x1 font-black tracking-tight text-[#111827]">
                About Craveroll
            </h1>
            <p className="mt-6 text-2x1 text-[#334155]">
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

       </main>    
    );
}