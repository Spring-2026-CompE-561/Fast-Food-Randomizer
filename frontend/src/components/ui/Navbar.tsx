// frontend/src/components/ui/Navbar.tsx
import Link from "next/link";
import { Home, Shuffle, LayoutGrid, Info } from "lucide-react";
import { Button } from "./button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-12 py-4 bg-white border-b sticky top-0 z-50 font-sans">
      {/* Logo */}
      <Link href="/" className="text-3xl font-black tracking-tighter text-[#1e293b] lowercase">
        craveroll
      </Link>
      
      {/* Centered Navigation Menu */}
      <div className="flex items-center gap-8 bg-[#fff5f0] px-6 py-2 rounded-full border border-orange-100 shadow-sm">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-orange-600">
          <Home size={18} strokeWidth={2.5} /> Home
        </Link>
        <Link href="/randomizer" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-orange-600 transition-colors">
          <Shuffle size={18} strokeWidth={2.5} /> Randomizer
        </Link>
        <Link href="/browse" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-orange-600 transition-colors">
          <LayoutGrid size={18} strokeWidth={2.5} /> Browse
        </Link>
        {/* Added About Link here */}
        <Link href="/about" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-orange-600 transition-colors">
          <Info size={18} strokeWidth={2.5} /> About
        </Link>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-orange-600 px-4">
          Login
        </Link>
        <Button className="bg-[#ff5722] hover:bg-[#e64a19] font-black rounded-xl px-6 text-white h-11">
          Sign Up
        </Button>
      </div>
    </nav>
  );
}