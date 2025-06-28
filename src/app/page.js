// import React from 'react'

// const Home = () => {
//   return (
//     <div className='text-4xl my-8 text-center'>Welcome To Task Management System</div>
//   )
// }

// export default Home


"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      router.push(isAuthenticated ? "/tasks" : "/login");
    }
  }, [isAuthenticated, loading]);

  return null;
}
