// src/components/ui/PreferenceTrigger.tsx
import { Target } from "lucide-react";

export const PreferenceTrigger = ({ onClick }: { onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="bg-[#E67E5F] text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 shadow-md hover:bg-[#d46b4c] transition-all active:scale-95"
  >
    <span className="text-lg">🎯</span> Change Preferences
  </button>
);