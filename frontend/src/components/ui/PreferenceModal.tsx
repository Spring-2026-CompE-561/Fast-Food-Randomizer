"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Option definitions for cleaner mapping
const DIETARY_OPTIONS = ["Vegetarian", "Vegan", "Gluten-Free"];
const PRICE_OPTIONS = ["$", "$$", "$$$"];
const CUISINE_OPTIONS = [
  { label: "Burger", icon: "🍔" },
  { label: "Pizza", icon: "🍕" },
  { label: "Chicken", icon: "🍗" },
  { label: "Mexican", icon: "🌮" },
  { label: "Asian", icon: "🍙" },
  { label: "Sandwich", icon: "🥪" },
  { label: "Healthy", icon: "🥗" },
  { label: "Cafe", icon: "☕" },
];

export default function PreferencesModal({ isOpen, onClose }: PreferencesModalProps) {
  // State for multiple selections
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

  // Helper to toggle selections in an array
  const toggleSelection = (
    value: string,
    setArray: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setArray((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Helper to render the selection pills
  const FilterPill = ({
    label,
    icon,
    isSelected,
    onClick,
  }: {
    label: string;
    icon?: string;
    isSelected: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full border-2 font-bold text-sm transition-all whitespace-nowrap ${
        isSelected
          ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/25 scale-105"
          : "border-border text-muted-foreground hover:border-primary hover:text-primary bg-card"
      }`}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {label}
    </button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-[32px] p-8 border-none shadow-2xl">
        <DialogHeader className="mb-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            <DialogTitle className="text-2xl font-black tracking-tight text-foreground">
              Set Your Preferences
            </DialogTitle>
          </div>
        </DialogHeader>

        <p className="text-muted-foreground text-sm font-medium mb-6">
          Filter restaurants by dietary needs, price, and cuisine. Select all that apply.
        </p>

        <div className="space-y-6">
          {/* Dietary Preferences */}
          <section className="space-y-3">
            <h3 className="flex items-center gap-2 text-lg font-black text-foreground">
              <span className="text-xl">🥗</span> Dietary
            </h3>
            <div className="flex flex-wrap gap-2">
              {DIETARY_OPTIONS.map((diet) => (
                <FilterPill
                  key={diet}
                  label={diet}
                  isSelected={selectedDietary.includes(diet)}
                  onClick={() => toggleSelection(diet, setSelectedDietary)}
                />
              ))}
            </div>
          </section>

          {/* Price Range */}
          <section className="space-y-3">
            <h3 className="flex items-center gap-2 text-lg font-black text-foreground">
              <span className="text-xl">💰</span> Price Range
            </h3>
            <div className="flex flex-wrap gap-2">
              {PRICE_OPTIONS.map((price) => {
                const isSelected = selectedPrices.includes(price);
                return (
                  <button
                    key={price}
                    onClick={() => toggleSelection(price, setSelectedPrices)}
                    className={`px-5 py-2 rounded-full border-2 font-black text-sm transition-all ${
                      isSelected
                        ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/25 scale-105"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary bg-card"
                    }`}
                  >
                    {price}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Cuisine Types */}
          <section className="space-y-3">
            <h3 className="flex items-center gap-2 text-lg font-black text-foreground">
              <span className="text-xl">🍴</span> Cuisines
            </h3>
            <div className="flex flex-wrap gap-2">
              {CUISINE_OPTIONS.map((cuisine) => (
                <FilterPill
                  key={cuisine.label}
                  label={cuisine.label}
                  icon={cuisine.icon}
                  isSelected={selectedCuisines.includes(cuisine.label)}
                  onClick={() => toggleSelection(cuisine.label, setSelectedCuisines)}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-6 h-12 rounded-xl border-2 font-black text-base text-muted-foreground"
          >
            Cancel
          </Button>
          <Button
            className="px-6 h-12 rounded-xl font-black text-base shadow-lg shadow-primary/25"
            onClick={() => {
              // You can pass the state objects to your backend or context here
              console.log({ selectedDietary, selectedPrices, selectedCuisines });
              
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