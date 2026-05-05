//This is the pop-up window page for when a user hits the "Randomizer" page
"use client";

import React from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
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
    <button className="px-6 py-2 rounded-full border-2 border-border font-bold text-muted-foreground hover:border-primary hover:text-primary transition-all bg-card whitespace-nowrap">
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
            <DialogTitle className="text-4xl font-black tracking-tighter text-foreground">
              Set Your Preferences
            </DialogTitle>
          </div>
          <DialogClose className="rounded-full p-2 hover:bg-muted transition-colors">
            <X size={24} className="text-muted-foreground" />
          </DialogClose>
        </DialogHeader>

        <p className="text-muted-foreground text-lg font-medium mb-8">
          Select your dietary needs, price range, and cuisine preferences to filter restaurants
        </p>

        <div className="space-y-10">
          {/* Dietary Preferences */}
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 text-xl font-black text-foreground">
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
            <h3 className="flex items-center gap-2 text-xl font-black text-foreground">
              <span className="text-2xl">💰</span> Price Range
            </h3>
            <div className="flex flex-wrap gap-3">
              {/* Highlighted state for price pills */}
              <button className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-black text-lg shadow-lg shadow-primary/25">
                $ (Cheap)
              </button>
              <button className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-black text-lg shadow-lg shadow-primary/25">
                $$ (Moderate)
              </button>
              <button className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-black text-lg shadow-lg shadow-primary/25">
                $$$ (Expensive)
              </button>
            </div>
          </section>

          {/* Cuisine Types */}
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 text-xl font-black text-foreground">
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
            className="px-10 h-14 rounded-2xl border-2 font-black text-lg text-muted-foreground"
          >
            Cancel
          </Button>
          <Button
            className="px-10 h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/25"
            onClick={() => {
              toast.success("Preferences saved", {
                description: "We'll use these on your next random spin.",
              });
              onClose();
            }}
          >
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}