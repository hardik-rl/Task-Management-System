"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import { cn } from "@/shared/utils";
import Loader from "@/shared/Loader";

export default function LayoutWithSidebar({ children }) {
  const { loading } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const hideSidebarPaths = ["/login", "/register"];
  const shouldShowSidebar = !hideSidebarPaths.includes(pathname);

  if (loading) return <Loader />;

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden flex">
      {/* Hamburger Button for Mobile */}
      {shouldShowSidebar && (
        <button
          className="md:hidden cursor-pointer fixed top-4 left-4 z-[99991] bg-white border border-gray-300 rounded w-9 h-9 shadow"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
      )}

      {/* Sidebar */}
      {shouldShowSidebar && (
        <>
          {/* Mobile Backdrop */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/30 z-[99990] md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </>
      )}

      {/* Main Content */}
      <main
        className={cn(
          "p-6 w-full",
          shouldShowSidebar ? "w-full md:w-[calc(100%-256px)]" : "flex-1 flex items-center justify-center"
        )}
      >
        {children}
      </main>
    </div>
  );
}
