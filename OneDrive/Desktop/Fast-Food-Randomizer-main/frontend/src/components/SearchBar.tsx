// frontend/src/components/SearchBar.tsx
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
      <input
        type="text"
        placeholder="Search restaurants..."
        className="w-full h-16 pl-16 pr-8 rounded-full border-2 border-slate-100 bg-white shadow-sm focus:border-orange-500 focus:outline-none text-lg font-medium transition-all"
      />
    </div>
  );
}