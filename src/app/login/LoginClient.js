"use client";

import Login from "@/components/Login";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Loader from "@/shared/Loader";

const LoginClient = () => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/tasks");
    }
  }, [isAuthenticated, loading]);

  // if (loading) return <p>Loading...</p>;
  if (loading) return <Loader />;
  if (isAuthenticated) return null;

  return <Login />;
};

export default LoginClient;
