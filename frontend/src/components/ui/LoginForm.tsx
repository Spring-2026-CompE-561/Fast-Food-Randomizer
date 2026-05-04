// frontend/src/components/LoginForm.tsx
"use client";

import Link from "next/link";
import { LogIn } from "lucide-react";
// Ensure these paths match where your shadcn components are
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input";

export default function LoginForm() {
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

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-4">
          <Input 
            type="text" 
            placeholder="Email or Username" 
            className="h-14 rounded-2xl border-border bg-muted/50 px-6 text-lg focus-visible:ring-ring"
          />
          <Input 
            type="password" 
            placeholder="Password" 
            className="h-14 rounded-2xl border-border bg-muted/50 px-6 text-lg focus-visible:ring-ring"
          />
        </div>

        <Button className="w-full h-16 text-2xl font-black rounded-2xl shadow-lg shadow-primary/25 mt-6 flex items-center justify-center gap-3 transition-transform active:scale-95">
           <LogIn strokeWidth={3} size={28} /> Login
        </Button>
      </form>

      <div className="mt-10 text-center text-lg font-bold">
        <span className="text-muted-foreground">Don't have an account? </span>
        <Link href="/register" className="text-primary hover:underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </div>
  );
}