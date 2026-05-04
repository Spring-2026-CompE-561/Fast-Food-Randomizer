"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UserPlus } from "lucide-react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registry Data:", formData);
  };

  return (
    // 1. Background changed to Cream (#FFFDF0)
    <main className="min-h-screen bg-[#FFFDF0] flex items-center justify-center pt-20 px-6 font-sans">
      
      {/* 2. Card Container */}
      <div className="bg-white rounded-[40px] shadow-xl p-10 w-full max-w-lg text-center border border-[#FDE68A]/30">
        
        <h1 className="text-5xl font-black text-[#111827] mb-2 tracking-tight">
          Join craveroll!
        </h1>
        <p className="text-gray-500 text-lg mb-8">
          Create your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-[#FFFDF0]/50 focus:outline-none focus:ring-2 focus:ring-[#E67E5F]/20 focus:border-[#E67E5F] transition-all text-lg"
            required
          />

          {/* 3. Button updated to #E67E5F */}
          <button
            type="submit"
            className="w-full bg-[#E67E5F] hover:bg-[#D46B4C] text-white font-black py-4 rounded-2xl text-xl shadow-lg shadow-orange-100 flex items-center justify-center gap-3 mt-4 transition-all active:scale-[0.98]"
          >
            <UserPlus size={24} />
            Sign Up
          </button>
        </form>

        <p className="mt-8 text-gray-600 text-lg">
          Already have an account?{" "}
          <Link href="/login" className="text-[#E67E5F] font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}