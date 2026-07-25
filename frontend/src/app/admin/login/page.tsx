"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error);
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-[#0e1412] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="relative h-[65px] w-[180px] mx-auto mb-6">
            <Image
              src="/logo-white.png"
              alt="Misuni Jewels"
              fill
              className="object-contain"
              priority
            />
          </div>
          <p className="text-[0.6rem] tracking-[0.35rem] uppercase text-white/40 font-sans">
            Admin Panel
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#1a2421] border border-white/5 p-8 sm:p-10">
          <h1 className="text-white text-[0.75rem] tracking-[0.25rem] uppercase font-bold font-sans mb-8">
            Sign In
          </h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 mb-6 text-[0.7rem] tracking-wider font-sans">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-white/50 text-[0.6rem] tracking-[0.2rem] uppercase font-bold font-sans block mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#0e1412] border border-white/10 text-white px-4 py-3 text-sm tracking-wider font-sans focus:outline-none focus:border-[#798d8c] transition-colors placeholder:text-white/20"
                placeholder="admin@misunijewels.com"
              />
            </div>

            <div>
              <label className="text-white/50 text-[0.6rem] tracking-[0.2rem] uppercase font-bold font-sans block mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#0e1412] border border-white/10 text-white px-4 py-3 text-sm tracking-wider font-sans focus:outline-none focus:border-[#798d8c] transition-colors placeholder:text-white/20"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#798d8c] text-white py-4 text-[0.7rem] tracking-[0.25rem] uppercase font-bold font-sans hover:bg-[#667a79] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-white/20 text-[0.55rem] tracking-[0.2rem] uppercase font-sans">
          &copy; {new Date().getFullYear()} Misuni Jewels — Admin Access Only
        </p>
      </div>
    </div>
  );
}
