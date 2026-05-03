// src/app/login/page.tsx
import LoginForm from "@/components/ui/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#E8F4FD] flex items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}