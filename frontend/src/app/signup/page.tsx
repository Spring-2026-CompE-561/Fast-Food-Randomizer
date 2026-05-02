// src/app/register/page.tsx
import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    /* Centers the card on the light blue background */
    <div className="min-h-[calc(100vh-80px)] bg-[#E8F4FD] flex items-center justify-center px-4">
      <RegisterForm />
    </div>
  );
}