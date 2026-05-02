// src/app/login/page.tsx
import LoginForm from "@/components/ui/LoginForm";

export default function LoginPage() {
  return (
    // This matches the light blue background from your mockups
    <main className="min-h-screen bg-[#E8F4FD] flex items-center justify-center px-4">
      <LoginForm />
    </main>
  );
}