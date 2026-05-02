// src/components/RegisterForm.tsx
"use client";

import Link from "next/link";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterForm() {
  return (
    <div className="w-full max-w-[480px] bg-white rounded-[50px] p-12 shadow-2xl border border-white/20">
      {/* Header section matches mockup style */}
      <div className="text-center mb-10 space-y-2">
        <h1 className="text-6xl font-black tracking-tighter text-[#1E293B]">
          Join craveroll!
        </h1>
        <p className="text-lg font-medium text-[#64748B]">
          Create your account
        </p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-4">
          <Input 
            type="email" 
            placeholder="Email" 
            className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 px-6 text-lg focus:ring-orange-500"
          />
          <Input 
            type="text" 
            placeholder="Username" 
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

        {/* Brand orange button with UserPlus icon */}
        <Button className="w-full h-16 bg-[#FF5722] hover:bg-[#E64A19] text-white text-2xl font-black rounded-2xl shadow-lg shadow-orange-100 mt-6 flex items-center justify-center gap-3 transition-transform active:scale-95">
           <UserPlus strokeWidth={3} size={28} /> Sign Up
        </Button>
      </form>

      {/* Footer link to existing login page */}
      <div className="mt-10 text-center text-lg font-bold">
        <span className="text-[#64748B]">Already have an account? </span>
        <Link href="/login" className="text-[#FF5722] hover:underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  );
}