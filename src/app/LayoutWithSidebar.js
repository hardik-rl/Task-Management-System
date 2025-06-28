"use client";

import Sidebar from "@/components/Sidebar";
import { useAuth } from "./context/AuthContext";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils";

export default function LayoutWithSidebar({ children }) {
  const { loading } = useAuth();
  const pathname = usePathname();

  const hideSidebarPaths = ["/login", "/register"];
  const shouldShowSidebar = !hideSidebarPaths.includes(pathname);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen overflow-hidden">
      {shouldShowSidebar && <Sidebar />}
      <main
        className={cn(
          shouldShowSidebar
            ? "w-full md:w-[calc(100%-256px)]"
            : "flex-1",
          "p-6 bg-gray-50"
        )}
      >
        {children}
      </main>
    </div>
  );
}
