"use client";

// Based on Next.js App Router page structure
export default function RegisterPage() {
  return (
    // Uses Tailwind flex utilities for centering
    <main className="min-h-screen flex items-center justify-center">
      <div>
        <h1>Register Page</h1>

        {/* Form for user registration */}
        <form>
          {/* Input styling adapted from LoginForm.tsx and shadcn UI Input component */}
          <input placeholder="Username" />
          <input placeholder="Email" />
          <input placeholder="Password" />

          {/* Submit button */}
          <button>Sign Up</button>
        </form>
      </div>
    </main>
  );
}