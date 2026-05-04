"use client";

import React, { useState } from "react";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { PreferenceTrigger } from "@/components/ui/PreferencesTrigger";
import PreferencesModal from "@/components/ui/PreferenceModal";
import { Heart, History, User, LogOut, Search, Menu } from "lucide-react";

export default function RandomizerPage() {
  // Toggle this state to switch between Guest and Logged In views
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [activeTab, setActiveTab] = useState("button");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#FFFDF0] flex flex-col items-center font-sans">
      
      {/* --- CONDITIONAL NAVBAR --- */}
      {isLoggedIn ? (
        // Extended Navbar (Member)
        <nav className="w-full bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between shadow-sm">
          <div className="text-2xl font-black text-[#111827]">craveroll</div>
          <div className="flex items-center gap-8 font-bold text-[#4B5563]">
            <button className="flex items-center gap-2 hover:text-[#E67E5F]">Home</button>
            <button className="flex items-center gap-2 text-[#E67E5F]">Randomizer</button>
            <button className="flex items-center gap-2 hover:text-[#E67E5F]">Browse</button>
            <button className="flex items-center gap-2 hover:text-[#E67E5F]">About</button>
            <button className="flex items-center gap-2 hover:text-[#E67E5F]"><Heart size={18} /> Favorites</button>
            <button className="flex items-center gap-2 hover:text-[#E67E5F]"><History size={18} /> History</button>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gray-100 rounded-full"><User size={20} /></div>
            <button className="border-2 border-gray-200 px-4 py-2 rounded-xl font-bold flex items-center gap-2">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </nav>
      ) : (
        // Basic Navbar (Guest)
        <nav className="mt-6 bg-[#FDE68A] rounded-full px-8 py-3 flex items-center gap-10 shadow-sm">
          <button className="font-bold text-[#856404] flex items-center gap-2">Home</button>
          <button className="bg-white px-6 py-2 rounded-full font-black text-[#111827] shadow-sm flex items-center gap-2">
            Randomizer
          </button>
          <button className="font-bold text-[#856404]">Browse</button>
          <button className="font-bold text-[#856404]">About</button>
        </nav>
      )}

      {/* --- SEARCH BAR (New Component) --- */}
      <div className="mt-16 w-full max-w-2xl px-6 relative">
        <input 
          type="text" 
          placeholder="Search for restaurants near you..." 
          className="w-full py-4 px-14 rounded-[30px] border-2 border-[#FDE68A] bg-white text-lg focus:outline-none focus:border-[#E67E5F] transition-all"
        />
        <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      <div className="text-center mt-12 mb-8">
        <h1 className="text-7xl font-black text-[#111827] mb-4 tracking-tighter">Randomizer</h1>
        <p className="text-2xl text-[#4B5563] font-medium">Set your preferences and roll the dice!</p>
      </div>

      <div className="mb-10">
        <PreferenceTrigger onClick={() => setIsModalOpen(true)} />
      </div>

      <div className="mb-24">
        <ModeToggle activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="text-[160px] mb-10 drop-shadow-2xl">🎯</div>
        <button className="bg-[#E67E5F] text-white text-2xl font-black px-14 py-6 rounded-full shadow-xl shadow-orange-500/20 hover:scale-105 transition-transform">
          Randomize! 🎲
        </button>
        
        {/* Conditional Footer Text */}
        {!isLoggedIn && (
          <button 
            onClick={() => setIsLoggedIn(true)}
            className="mt-8 text-[#E67E5F] font-black underline decoration-2 underline-offset-4"
          >
            Join craveroll to save your favorite restaurants!
          </button>
        )}
      </div>

      <PreferencesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}