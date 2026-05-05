"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-curr-user";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, loading, error } = useCurrentUser();

  useEffect(() => {
    if (!loading && error) {
      router.push("/login");
    }
  }, [loading, error, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !user) {
    return null;
  }

  return <>{children}</>;
}