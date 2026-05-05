// src/components/ui/RestaurantSearch.tsx
import { Search } from "lucide-react";

export const RestaurantSearch = () => (
  <div className="relative w-full max-w-xl">
    <input
      type="text"
      placeholder="Search for restaurants near SDSU..."
      className="w-full px-14 py-4 rounded-[30px] border-2 border-[#FDE68A]/50 bg-white focus:outline-none focus:border-[#E67E5F] transition-all text-lg"
    />
    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
  </div>
);