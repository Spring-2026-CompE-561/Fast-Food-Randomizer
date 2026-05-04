//This is the pop-up window page for when a user hits the "Randomizer" page
"use client";

import React from "react";
import { X, Target, Utensils, Salad, Banknote } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PreferencesModal({ isOpen, onClose }: PreferencesModalProps) {
  // Helper to render the selection pills
  const FilterPill = ({ label, icon }: { label: string; icon?: string }) => (
    <button className="px-6 py-2 rounded-full border-2 border-slate-200 font-bold text-slate-600 hover:border-[#FF5722] hover:text-[#FF5722] transition-all bg-white whitespace-nowrap">
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-[40px] p-10 border-none shadow-2xl">
        <DialogHeader className="flex flex-row items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎯</span>
            <DialogTitle className="text-4xl font-black tracking-tighter text-[#1E293B]">
              Set Your Preferences
            </DialogTitle>
          </div>
          <DialogClose className="rounded-full p-2 hover:bg-slate-100 transition-colors">
            <X size={24} className="text-slate-400" />
          </DialogClose>
        </DialogHeader>

        <p className="text-[#64748B] text-lg font-medium mb-8">
          Select your dietary needs, price range, and cuisine preferences to filter restaurants
        </p>

        <div className="space-y-10">
          {/* Dietary Preferences */}
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 text-xl font-black text-[#1E293B]">
              <span className="text-2xl">🥗</span> Dietary Preferences
            </h3>
            <div className="flex flex-wrap gap-3">
              <FilterPill label="Vegetarian" />
              <FilterPill label="Vegan" />
              <FilterPill label="Gluten-Free" />
            </div>
          </section>

          {/* Price Range */}
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 text-xl font-black text-[#1E293B]">
              <span className="text-2xl">💰</span> Price Range
            </h3>
            <div className="flex flex-wrap gap-3">
              {/* Highlighted state for price pills */}
              <button className="px-8 py-3 rounded-full bg-[#FF5722] text-white font-black text-lg shadow-lg shadow-orange-100">
                $ (Cheap)
              </button>
              <button className="px-8 py-3 rounded-full bg-[#FF5722] text-white font-black text-lg shadow-lg shadow-orange-100">
                $$ (Moderate)
              </button>
              <button className="px-8 py-3 rounded-full bg-[#FF5722] text-white font-black text-lg shadow-lg shadow-orange-100">
                $$$ (Expensive)
              </button>
            </div>
          </section>

          {/* Cuisine Types */}
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 text-xl font-black text-[#1E293B]">
              <span className="text-2xl">🍴</span> Cuisine Types
            </h3>
            <div className="flex flex-wrap gap-3">
              <FilterPill label="Burger" icon="🍔" />
              <FilterPill label="Pizza" icon="🍕" />
              <FilterPill label="Chicken" icon="🍗" />
              <FilterPill label="Mexican" icon="🌮" />
              <FilterPill label="Asian" icon="🍙" />
              <FilterPill label="Sandwich" icon="🥪" />
              <FilterPill label="Mediterranean" icon="🥙" />
              <FilterPill label="Healthy" icon="🥗" />
              <FilterPill label="Cafe" icon="☕" />
            </div>
          </section>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-12">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="px-10 h-14 rounded-2xl border-2 font-black text-lg text-slate-500"
          >
            Cancel
          </Button>
          <Button 
            className="px-10 h-14 rounded-2xl bg-[#FF5722] hover:bg-[#E64A19] font-black text-lg shadow-xl shadow-orange-100"
          >
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}