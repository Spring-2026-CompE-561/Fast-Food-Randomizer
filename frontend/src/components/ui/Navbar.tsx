"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Shuffle, LayoutGrid, Info } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-12 py-6 bg-[#FFFDF0] w-full border-b border-transparent">
      
      {/* Logo */}
      <Link href="/" className="text-4xl font-serif font-black text-[#C27803] tracking-tight hover:opacity-80 transition-opacity">
        CraveRoll
      </Link>

      {/* Center Pill Nav */}
      <div className="bg-[#FEF9C3] border border-[#FDE68A] rounded-full p-1.5 flex items-center gap-1 shadow-sm">
        <NavLink href="/" icon={<Home size={18} />} label="Home" active={pathname === "/"} />
        <NavLink href="/randomizer" icon={<Shuffle size={18} />} label="Randomizer" active={pathname === "/randomizer"} />
        <NavLink href="/browse" icon={<LayoutGrid size={18} />} label="Browse" active={pathname === "/browse"} />
        <NavLink href="/about" icon={<Info size={18} />} label="About" active={pathname === "/about"} />
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-6">
        <Link href="/login" className="font-bold text-[#2D2D2D] hover:text-black">
          Login
        </Link>
        <Link href="/signup" className="bg-[#E67E5F] text-white px-8 py-2.5 rounded-full font-bold shadow-sm hover:bg-[#d46b4c] transition-all">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

function NavLink({ href, icon, label, active }: { href: string, icon: React.ReactNode, label: string, active: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${
        active 
          ? 'bg-[#FDE68A] text-[#2D2D2D] shadow-sm' 
          : 'text-[#8c8c8c] hover:text-[#2D2D2D] hover:bg-white/50'
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}