// src/app/register/page.tsx
"use client";

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

import Link from "next/link";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { authPopPrimary } from "@/lib/auth-button-styles";

// Based on Next.js App Router page structure
export default function RegisterPage() {
  const router = useRouter()
  const { register, loading, error } = useAuth()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    const success = await register(username, email, password);

    if(success) {
      router.push("/login");
    }

  }

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
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Inputs styled same as LoginForm */}
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              className="h-14 rounded-2xl border-border bg-muted/50 px-6 text-lg focus-visible:ring-ring"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
            <Input 
              type="password" 
              placeholder="Confirm Password"
              className="h-14 rounded-2xl border-border bg-muted/50 px-6 text-lg focus-visible:ring-ring"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            <UserPlus
              strokeWidth={3}
              size={28}
              className="shrink-0 transition-transform duration-300 ease-out group-hover:scale-110"
            />
            Sign Up
          </Button>
        </form>

        {error && (
          <p className="text-red-500 mt-4 text-center">{error}</p>
        )}

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