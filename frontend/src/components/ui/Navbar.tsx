// frontend/src/components/ui/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Shuffle, LayoutGrid, Info } from "lucide-react";
import { Button } from "./button";

export default function Navbar() {
  //usePathname gets current route
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-12 py-4 bg-card border-b border-border sticky top-0 z-50 font-sans">
      {/* Logo */}
      <Link
        href="/"
        className="font-heading text-3xl font-semibold tracking-tight text-primary"
      >
        CraveRoll
      </Link>
      
      {/* Centered Navigation Menu */}
      <div className="flex items-center gap-8 bg-muted px-6 py-2 rounded-full border border-border shadow-sm">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-primary">
          <Home size={18} strokeWidth={2.5} /> Home
        </Link>
        <Link href="/randomizer" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
          <Shuffle size={18} strokeWidth={2.5} /> Randomizer
        </Link>
        <Link href="/browse" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
          <LayoutGrid size={18} strokeWidth={2.5} /> Browse
        </Link>

        {/* Added About Link here */}
        <Link href="/about" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
          <Info size={18} strokeWidth={2.5} /> About
        </Link>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm font-bold text-muted-foreground hover:text-primary px-4 transition-colors">
          Login
        </Link>
        <Link href="/register">
          <Button className="font-black rounded-xl px-6 h-11 shadow-md shadow-primary/20">
            Sign Up
          </Button>
        </Link>
      </div>
    </nav>
  );
}