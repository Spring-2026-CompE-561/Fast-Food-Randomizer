"use client";

import Link from "next/link";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Based on Next.js App Router page structure
export default function RegisterPage() {
  return (
    // Uses Tailwind flex utilities for centering
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[480px] bg-white rounded-[50px] p-12 shadow-x1 border border-white/20">
        
        {/* Header styled to match LoginForm */}
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-6xl font-black tracking-tighter text-[#1E293B]">
            Create Account
          </h1>
          <p className="text-lg font-medium text-[#64748B]">
            Join Craveroll
          </p>
        </div>

        {/* Form for user registration */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Inputs styled same as LoginForm */}
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 px-6 text-lg focus:ring-orange-500"
            />
            <Input
              type="email"
              placeholder="Email"
              className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 px-6 text-lg focus:ring-orange-500"
            />
            <Input 
              type="password" 
              placeholder="Password"
              className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 px-6 text-lg focus:ring-orange-500"
            />
            <Input 
              type="password" 
              placeholder="Confirm Password"
              className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 px-6 text-lg focus:ring-orange-500"
            />
            </div>
          
          {/* styled button matching login */}
          <Button className="w-full h-16 bg-[#FF5722] hover:bg-[#E64A19] text-white text-2xl font-black rounded-2xl shadow-lg shadow-orange-100 mt-6 flex items-center justify-center gap-3 transition-transform active:scale-95">
            <UserPlus strokeWidth={3} size={28} /> Sign Up
          </Button>
        </form>

        {/* Footer link */}
        <div className="mt-10 text-center text-lg font-bold">
          <span className="text-[#64748B]">Already have an account? </span>
          <Link href="/login" className="text-[#FF5722] hover:underline underline-offset-4">
            Login
          </Link>
        </div>
        
      </div>
    </main>
  );
}