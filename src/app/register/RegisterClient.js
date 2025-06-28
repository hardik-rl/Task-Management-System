"use client";

import Register from "@/components/Register";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";

export default function RegisterClient() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/tasks");
    }
  }, [isAuthenticated, loading]);

  if (loading) return <p>Loading...</p>;
  if (isAuthenticated) return null;

  return <Register />;
}
