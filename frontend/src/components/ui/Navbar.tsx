"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Info, LayoutGrid, Menu, Shuffle, Heart, Clock, User } from "lucide-react";
import { Button } from "./button";
import { useAuth } from "@/hooks/use-auth";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const navHints: Partial<Record<string, string>> = {
  "/": "Your starting point for everything CraveRoll.",
  "/randomizer": "Let us surprise you with a spot worth trying.",
  "/browse": "See every restaurant CraveRoll lists in one place.",
  "/favorites": "View your saved favorite restaurants.",
  "/history": "See your recent randomizer picks.",
  "/about": "Our story, mission, and the team behind the app.",
};

function NavLinkDesktop({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: typeof Home;
}) {
  const pathname = usePathname();
  const active = pathname === href;
  const hint = navHints[href];

  const link = (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 text-sm font-bold transition-colors",
        active ? "text-primary" : "text-muted-foreground hover:text-primary"
      )}
    >
      <Icon size={18} strokeWidth={2.5} /> {label}
    </Link>
  );

  if (!hint) return link;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={6}>
        {hint}
      </TooltipContent>
    </Tooltip>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();

  const mobileLinkClass = (href: string) =>
    cn(
      "flex items-center gap-3 rounded-xl px-3 py-3 text-base font-bold transition-colors",
      pathname === href
        ? "bg-muted text-primary"
        : "text-foreground hover:bg-muted/70"
    );

  return (
    <nav className="flex items-center justify-between gap-4 px-4 sm:px-8 lg:px-12 py-4 bg-card border-b border-border sticky top-0 z-50 font-sans">
      <Link
        href="/"
        className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-primary shrink-0"
      >
        CraveRoll
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-1 justify-center">
        <div className="flex items-center gap-8 bg-muted px-6 py-2 rounded-full border border-border shadow-sm">
          <NavLinkDesktop href="/" label="Home" icon={Home} />
          <NavLinkDesktop href="/randomizer" label="Randomizer" icon={Shuffle} />
          <NavLinkDesktop href="/browse" label="Browse" icon={LayoutGrid} />
          
          {isAuthenticated && (
            <>
            <NavLinkDesktop href="/favorites" label="Favorites" icon={Heart} />
            <NavLinkDesktop href="/history" label="History" icon={Clock} />
            </>
          )}
          
          <NavLinkDesktop href="/about" label="About" icon={Info} />
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4 shrink-0">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/login"
              className="text-sm font-bold text-muted-foreground hover:text-primary px-4 transition-colors"
            >
              Login
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Welcome back — sign in to your account.
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/register">
              <Button className="font-black rounded-xl px-6 h-11 shadow-md shadow-primary/20">
                Sign Up
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            New here? Create a free CraveRoll account.
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex md:hidden items-center shrink-0">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon-sm"
              className="shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col w-[min(100vw-1rem,20rem)]">
            <SheetHeader>
              <SheetTitle className="text-left font-heading text-xl">
                Navigate
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 mt-6 flex-1">
              <SheetClose asChild>
                <Link href="/" className={mobileLinkClass("/")}>
                  <Home size={20} strokeWidth={2.5} /> Home
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/randomizer" className={mobileLinkClass("/randomizer")}>
                  <Shuffle size={20} strokeWidth={2.5} /> Randomizer
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/browse" className={mobileLinkClass("/browse")}>
                  <LayoutGrid size={20} strokeWidth={2.5} /> Browse
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/about" className={mobileLinkClass("/about")}>
                  <Info size={20} strokeWidth={2.5} /> About
                </Link>
              </SheetClose>
            </nav>
            <SheetFooter className="gap-2 sm:flex-col border-t border-border pt-4">
              <SheetClose asChild>
                <Button variant="outline" className="w-full font-bold" asChild>
                  <Link href="/login">Login</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button className="w-full font-black" asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
