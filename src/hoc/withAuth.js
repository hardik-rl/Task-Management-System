// app/hoc/withAuth.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function withAuth(Component) {
  return function ProtectedRoute(props) {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.replace("/login");
      }
    }, [isAuthenticated, loading, router]);

    if (loading) {
      return <p>Loading...</p>; // Or a spinner
    }

    if (!isAuthenticated) {
      return null; // Or a placeholder
    }

    return <Component {...props} />;
  };
}
