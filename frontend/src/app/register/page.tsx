// src/app/register/page.tsx
"use client";

import Link from "next/link";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Based on Next.js App Router page structure
export default function RegisterPage() {
  return (
    // Uses Tailwind flex utilities for centering
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-[480px] bg-card rounded-[50px] p-12 shadow-xl border border-border">
        
        {/* Header styled to match LoginForm */}
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-6xl font-black tracking-tighter text-card-foreground">
            Create Account
          </h1>
          <p className="text-lg font-medium text-muted-foreground">
            Join CraveRoll
          </p>
        </div>

        {/* Form for user registration */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Inputs styled same as LoginForm */}
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              className="h-14 rounded-2xl border-border bg-muted/50 px-6 text-lg focus-visible:ring-ring"
            />
            <Input
              type="email"
              placeholder="Email"
              className="h-14 rounded-2xl border-border bg-muted/50 px-6 text-lg focus-visible:ring-ring"
            />
            <Input 
              type="password" 
              placeholder="Password"
              className="h-14 rounded-2xl border-border bg-muted/50 px-6 text-lg focus-visible:ring-ring"
            />
            <Input 
              type="password" 
              placeholder="Confirm Password"
              className="h-14 rounded-2xl border-border bg-muted/50 px-6 text-lg focus-visible:ring-ring"
            />
            </div>
          
          <Button className="w-full h-16 text-2xl font-black rounded-2xl shadow-lg shadow-primary/25 mt-6 flex items-center justify-center gap-3 transition-transform active:scale-95">
            <UserPlus strokeWidth={3} size={28} /> Sign Up
          </Button>
        </form>

        {/* Footer link */}
        <div className="mt-10 text-center text-lg font-bold">
          <span className="text-muted-foreground">Already have an account? </span>
          <Link href="/login" className="text-primary hover:underline underline-offset-4">
            Login
          </Link>
        </div>

      </div>
    </main>
  );
}