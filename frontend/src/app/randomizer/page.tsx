"use client";

import { useState, useEffect } from "react";
import { useCurrentUser } from "@/hooks/use-curr-user";
import { useRandomizer } from "@/hooks/use-randomizer";
import {
  defaultFilters,
  type RandomizerFilterState,
} from "@/components/randomizer-filters-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RestaurantCardSkeleton } from "@/components/ui/restaurant-card-skeleton";
import RestaurantCard from "@/components/ui/RestaurantCard";

import { Shuffle, Target, Dices, MapPin, Settings2, SlidersHorizontal } from "lucide-react";
import {
  looksOnCampus,
  priceFromRange,
  restaurantCardMotionClass,
} from "@/lib/restaurant-card-helpers";

// Import your Modal component
import PreferencesModal from "@/components/ui/PreferenceModal"; 

// --- ANIMATION COMPONENTS ---
const SlotMachineAnimation = () => {
  const [emojis, setEmojis] = useState(["🍔", "🍕", "🌮"]);
  useEffect(() => {
    const items = ["🍔", "🍕", "🌮", "🍣", "🥗", "🥪", "🍟", "🍩", "🍜", "🍦", "🌯", "🥨"];
    const interval = setInterval(() => {
      setEmojis([
        items[Math.floor(Math.random() * items.length)],
        items[Math.floor(Math.random() * items.length)],
        items[Math.floor(Math.random() * items.length)]
      ]);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center gap-4 md:gap-6 py-10">
      {emojis.map((emoji, i) => (
        <div 
          key={i} 
          // Increased size from w-28 h-36 to w-32 h-40 (and w-36 h-48 on medium+ screens)
          // Increased text from text-7xl to text-8xl (and text-9xl on medium+ screens)
          className="w-32 h-40 md:w-36 md:h-48 bg-muted/40 rounded-3xl flex items-center justify-center text-8xl md:text-9xl shadow-2xl border-x-2 border-t-2 border-border border-b-[12px] md:border-b-[16px] border-b-muted/80 transition-all"
        >
          <span className="animate-bounce" style={{ animationDuration: '0.4s' }}>{emoji}</span>
        </div>
      ))}
    </div>
  );
};

const WheelAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 relative">
      <div className="absolute top-6 z-20 text-[#E67E5F] drop-shadow-lg scale-150">
        <MapPin size={40} className="rotate-180 fill-current stroke-white stroke-2" />
      </div>
      <div className="relative w-72 h-72 animate-spin flex items-center justify-center rounded-full overflow-hidden border-[12px] border-[#E67E5F] shadow-[0_20px_50px_rgba(230,126,95,0.3)]" style={{ animationDuration: '0.6s' }}>
         <div className="absolute inset-0 bg-[conic-gradient(#FDE68A_0deg_45deg,#E67E5F_45deg_90deg,#FFFDF0_90deg_135deg,#FDE68A_135deg_180deg,#E67E5F_180deg_225deg,#FFFDF0_225deg_270deg,#FDE68A_270deg_315deg,#E67E5F_315deg_360deg)]"></div>
         <div className="absolute w-12 h-12 bg-white rounded-full border-4 border-[#E67E5F] z-10 shadow-inner flex items-center justify-center">
            <div className="w-4 h-4 bg-[#E67E5F] rounded-full animate-pulse" />
         </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---
export default function RandomizerPage() {
  const { result, loading, error, runRandomizer } = useRandomizer();
  const { user } = useCurrentUser();
  
  const [activeTab, setActiveTab] = useState<"button" | "wheel" | "slot">("button");
  const [isAnimating, setIsAnimating] = useState(false);
  
  // State for the Preference Modal
  const [isPrefModalOpen, setIsPrefModalOpen] = useState(false);

  // Trigger modal when user first enters the "Randomizer" page
  useEffect(() => {
    setIsPrefModalOpen(true);
  }, []);
  // const [filterDialogOpen, setFilterDialogOpen] = useState(true);
  const [appliedFilters, setAppliedFilters] =
    useState<RandomizerFilterState>(defaultFilters);
  const [filtersApplyHint, setFiltersApplyHint] = useState(false);

  useEffect(() => {
    if (result && !loading) {
      setFiltersApplyHint(false);
    }
  }, [result, loading]);

  function handleApplyFilters(next: RandomizerFilterState) {
    setAppliedFilters(next);
    setFiltersApplyHint(true);
  }

  async function handleSpin() {
    setIsAnimating(true);
    const fetchPromise = runRandomizer({
      latitude: null,
      longitude: null,
      cuisine:
        appliedFilters.cuisines.length > 0 ? appliedFilters.cuisines : null,
      price_range: appliedFilters.maxPrice,
      dietary_tag:
        appliedFilters.dietary.length > 0 ? appliedFilters.dietary : null,
    });
    const animationTimer = new Promise((resolve) => setTimeout(resolve, 3000));
    await Promise.all([fetchPromise, animationTimer]);
    setIsAnimating(false);
  }

  const modeContent = {
    button: {
      title: "Quick Pick",
      icon: <Target className="size-7 text-primary shrink-0" aria-hidden />,
      btnIcon: <Target className="size-5 shrink-0 transition-transform duration-300 ease-out group-hover:scale-110" />,
      description: "No frills, just a fast and easy restaurant recommendation.",
      actionText: "Pick a Restaurant"
    },
    wheel: {
      title: "Spin the Wheel",
      icon: <Shuffle className="size-7 text-primary shrink-0" aria-hidden />,
      btnIcon: <Shuffle className="size-5 shrink-0 transition-transform duration-300 ease-out group-hover:rotate-[-180deg] group-hover:scale-110" />,
      description: "Tap below to watch the wheel spin for your next meal!",
      actionText: "Spin to Randomize"
    },
    slot: {
      title: "Slot Machine",
      icon: <Dices className="size-7 text-primary shrink-0" aria-hidden />,
      btnIcon: <Dices className="size-5 shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-110" />,
      description: "Pull the lever and let the food slots roll!",
      actionText: "Roll the Slots"
    }
  };

  const currentMode = modeContent[activeTab];
  const showLoadingVisual = loading || isAnimating;

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-background px-4 py-10 md:py-14 font-sans">
      <div className="max-w-xl mx-auto space-y-8">
        
        {/* Title Section */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Randomizer
          </h1>
          <p className="text-muted-foreground text-lg">
            One tap — we pick a restaurant that fits SDSU life.
          </p>
        </div>

        {/* --- CHANGE PREFERENCES BUTTON (NEW) --- */}
        <div className="flex justify-center">
          <button 
            onClick={() => setIsPrefModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border-2 border-[#E67E5F] text-[#E67E5F] font-black text-sm hover:bg-[#E67E5F] hover:text-white transition-all shadow-md shadow-[#E67E5F]/10 active:scale-95"
          >
            <Settings2 size={18} />
            Change Preferences
          </button>
        </div>

        {/* Mode Toggle Bar */}
        <div className="flex justify-center">
          <div className="bg-[#FDE68A] p-1.5 rounded-full flex items-center shadow-inner">
            {[
              { id: "button", label: "Button", icon: "🎯" },
              { id: "wheel", label: "Wheel", icon: "🎡" },
              { id: "slot", label: "Slot", icon: "🎰" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "button" | "wheel" | "slot")}
                disabled={showLoadingVisual}
                className={`px-6 py-2.5 rounded-full font-bold transition-all flex items-center gap-2 capitalize ${
                  activeTab === tab.id 
                    ? "bg-[#FFFDF0] text-[#111827] shadow-sm scale-105" 
                    : "text-[#856404] hover:text-[#111827] disabled:opacity-50"
                }`}
              >
                <span className="text-lg">{tab.icon}</span> 
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <Card className="rounded-[28px] border-border shadow-lg transition-all duration-300 overflow-visible">
          <CardHeader className="justify-items-center text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl font-black">
              {currentMode.icon}
              {currentMode.title}
            </CardTitle>
            <CardDescription className="text-center">
              {currentMode.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Visuals Area */}
            <div className="min-h-[320px] flex flex-col items-center justify-center">
                {showLoadingVisual ? (
                  <>
                    {activeTab === "wheel" && <WheelAnimation />}
                    {activeTab === "slot" && <SlotMachineAnimation />}
                    {activeTab === "button" && <RestaurantCardSkeleton />}
                  </>
                ) : !result ? (
                   <div className="flex flex-col items-center gap-4 opacity-20">
                      <div className="text-9xl grayscale">🎲</div>
                      <p className="font-bold text-xl uppercase tracking-widest">Ready to roll?</p>
                   </div>
                ) : (
                  <div className="flex w-full flex-col items-center space-y-3 animate-in fade-in zoom-in-95 duration-500">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#E67E5F] text-center">
                      Tonight&apos;s pick
                    </p>
                    <RestaurantCard
                      name={String(result.name ?? "Your spot")}
                      price={priceFromRange(result.price_range)}
                      category={
                        result.cuisine != null && String(result.cuisine).trim() !== ""
                          ? String(result.cuisine)
                          : "Restaurant"
                      }
                      onCampus={looksOnCampus(String(result.name ?? ""))}
                      className={restaurantCardMotionClass}
                    />
                  </div>
                )}
            </div>
            {filtersApplyHint && (
              <p className="rounded-2xl border border-primary/25 bg-primary/5 px-4 py-3 text-center text-sm text-muted-foreground">
                Preferences are set — tap{" "}
                <span className="font-bold text-foreground">Randomize</span>{" "}
                when you&apos;re ready for a pick.
              </p>
            )}

            {user?.email && (
              <p className="text-center text-sm text-muted-foreground">
                Signed in as <span className="font-semibold text-foreground">{user.email}</span>
              </p>
            )}

            <Button
              size="lg"
              className="group w-full h-16 text-xl font-black rounded-2xl gap-2 bg-[#E67E5F] hover:bg-[#d46d4f] text-white shadow-lg shadow-primary/25 transition-all duration-300"
              disabled={showLoadingVisual}
              onClick={() => void handleSpin()}
            >
              {currentMode.btnIcon}
              {showLoadingVisual ? "Spinning..." : currentMode.actionText}
            </Button>

            {error && !showLoadingVisual && (
              <p className="text-sm text-center text-destructive font-bold bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                ⚠️ {error}
              </p>
            )}
          </CardContent>
        </Card>

        {/* --- PREFERENCES MODAL INSTANCE --- */}
        <PreferencesModal
          isOpen={isPrefModalOpen}
          onClose={() => setIsPrefModalOpen(false)}
          initialFilters={appliedFilters}
          onApply={handleApplyFilters}
        />
      </div>
    </div>
  );
}