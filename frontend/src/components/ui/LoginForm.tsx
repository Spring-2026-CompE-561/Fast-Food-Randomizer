// src/components/LoginForm.tsx
"use client";

import Link from "next/link";
import { LogIn } from "lucide-react"; // Make sure lucide-react is installed
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  return (
    <div className="w-full max-w-[450px] bg-white rounded-[40px] p-10 shadow-xl border border-slate-100">
      <div className="text-center mb-8 space-y-2">
        <h1 className="text-5xl font-black tracking-tight text-slate-900">
          Welcome Back!
        </h1>
        <p className="text-slate-500 font-medium">
          Log in to your craveroll account
        </p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Input 
          type="email" 
          placeholder="Email" 
          className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 px-6 focus:ring-orange-500"
        />
        <Input 
          type="password" 
          placeholder="Password" 
          className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 px-6 focus:ring-orange-500"
        />
        
        <Button className="w-full h-14 bg-[#FF5722] hover:bg-[#F4511E] text-white text-xl font-bold rounded-2xl mt-4 flex items-center justify-center gap-2">
          <LogIn size={20} strokeWidth={3} /> Login
        </Button>
      </form>

      <div className="mt-8 text-center font-bold">
        <span className="text-slate-500">New here? </span>
        <Link href="/signup" className="text-[#FF5722] hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
}