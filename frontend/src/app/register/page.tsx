"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Based on Next.js App Router page structure
export default function RegisterPage() {
  return (
    // Uses Tailwind flex utilities for centering
    <main className="min-h-screen flex items-center justify-center">
      <div>
        <h1>Register Page</h1>

        {/* Form for user registration */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Input styling adapted from LoginForm.tsx and shadcn UI Input component */}
          <Input type="text" placeholder="Username" />
          {/* Email input using shadcn UI Input component */}
          <Input type="email" placeholder="Email" />
          {/* Password input using shadcn UI Input component */}
          <Input type="password" placeholder="Password" />

          {/* Submit button using shadcn UI button component*/}
          <Button type="submit">Sign Up</Button>
        </form>
      </div>
    </main>
  );
}