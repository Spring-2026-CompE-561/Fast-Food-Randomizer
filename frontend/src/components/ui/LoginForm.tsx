"use client";

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
        </Link>
      </p>
    </div>
  );
}