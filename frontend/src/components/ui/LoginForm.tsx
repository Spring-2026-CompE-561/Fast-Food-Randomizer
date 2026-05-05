"use client";

<<<<<<< HEAD
import React, { useState } from "react";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    // White card with subtle yellow border
    <div className="bg-white rounded-[40px] shadow-xl p-10 w-full max-w-lg text-center border border-[#FDE68A]/30">
      
      <h1 className="text-5xl font-black text-[#111827] mb-2 tracking-tight">
        Welcome Back!
      </h1>
      <p className="text-gray-500 text-lg mb-8">
        Login to your craveroll account
      </p>

      <form className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-[#FFFDF0]/50 focus:outline-none focus:ring-2 focus:ring-[#E67E5F]/20 focus:border-[#E67E5F] transition-all text-lg"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-[#FFFDF0]/50 focus:outline-none focus:ring-2 focus:ring-[#E67E5F]/20 focus:border-[#E67E5F] transition-all text-lg"
          required
        />

        {/* Login Button updated to #E67E5F */}
        <button
          type="submit"
          className="w-full bg-[#E67E5F] hover:bg-[#D46B4C] text-white font-black py-4 rounded-2xl text-xl shadow-lg shadow-orange-100 flex items-center justify-center gap-3 mt-4 transition-all active:scale-[0.98]"
        >
          <LogIn size={24} />
          Login
        </button>
      </form>

      <p className="mt-8 text-gray-600 text-lg">
        Don't have an account?{" "}
        <Link href="/signup" className="text-[#E67E5F] font-bold hover:underline">
          Sign Up
=======
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn } from "lucide-react";
// Ensure these paths match where your shadcn components are
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { authPopPrimary } from "@/lib/auth-button-styles";

export default function LoginForm() {
  const { login, loading, error } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const success = await login(email, password);
    if(success) {
      router.push("/randomizer");
    }
  }

  return (
    <div className="w-full max-w-[480px] bg-card rounded-[50px] p-12 shadow-xl border border-border">
      {/* Header section with high-weight font */}
      <div className="text-center mb-10 space-y-2">
        <h1 className="text-6xl font-black tracking-tighter text-card-foreground">
          Welcome Back!
        </h1>
        <p className="text-lg font-medium text-muted-foreground">
          Login to CraveRoll
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input 
            type="email" 
            placeholder="Email" 
            className="h-14 rounded-2xl border-border bg-muted/50 px-6 text-lg focus-visible:ring-ring"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            type="password" 
            placeholder="Password" 
            className="h-14 rounded-2xl border-border bg-muted/50 px-6 text-lg focus-visible:ring-ring"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className={cn(
            "w-full h-16 text-2xl font-black rounded-2xl mt-6 flex items-center justify-center gap-3",
            authPopPrimary
          )}
        >
          <LogIn
            strokeWidth={3}
            size={28}
            className="shrink-0 transition-transform duration-300 ease-out group-hover:scale-110"
          />
          Login
        </Button>
      </form>

      {error && (
        <p className="mt-4 text-center text-sm font-semibold text-red-500">
          {error}
        </p>
      )}

      <div className="mt-10 text-center text-lg font-bold">
        <span className="text-muted-foreground">Don't have an account? </span>
        <Link href="/register" className="text-primary hover:underline underline-offset-4">
          Sign up
>>>>>>> 086a7dabcb9b23a259bc9af2fc6079f49dbb8c04
        </Link>
      </p>
    </div>
  );
}