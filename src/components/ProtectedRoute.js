"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  console.log(isAuthenticated, "isAuthenticated");
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, loading]);

  if (loading) return <div>Loading...</div>;
  return children;
  // return isAuthenticated ? children : null;
}
