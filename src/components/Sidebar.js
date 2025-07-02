"use client";
import { useAuth } from "@/app/context/AuthContext";
// import withAuth from "@/hoc/withAuth";
import { AddIcon, ListIcon, LogoutIcon } from "@/shared/Icon";
import { cn } from "@/shared/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Sidebar = ({ isOpen, onClose }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const { setIsAuthenticated, logout } = useAuth();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const isActive = (path) =>
    pathname === path ? "bg-blue-100 text-blue-700 font-medium" : "";

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    toast.success("Logout Successfully!");
    router.push("/login");
  };

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-full w-72 bg-white z-[99999] shadow-lg border-r border-gray-200 p-6 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:static md:translate-x-0 md:block md:h-auto md:shadow-none"
      )}
    >
      <div className="flex justify-between items-center mb-6 md:mb-4">
        <h2 className="text-2xl font-bold text-blue-700">TMS</h2>
        <button
          onClick={onClose}
          className="md:hidden text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          ✕
        </button>
      </div>

      <nav className="flex flex-col space-y-3">
        <button
          onClick={() => router.push("/tasks")}
          className={cn(
            "text-left flex gap-2 items-center px-3 py-2 cursor-pointer rounded hover:bg-blue-50 transition",
            isActive("/tasks")
          )}
        >
          <ListIcon /> Task List
        </button>

        <button
          onClick={() => router.push("/tasks/new")}
          className={cn(
            "text-left flex gap-2 items-center px-3 py-2 cursor-pointer rounded hover:bg-blue-50 transition",
            isActive("/tasks/new")
          )}
        >
          <AddIcon /> New Task
        </button>

        <hr className="my-4 border-gray-200" />

        <button
          onClick={handleLogout}
          className="flex gap-2 items-center text-left px-3 py-2 cursor-pointer rounded text-red-600 hover:bg-red-50 transition"
        >
          <LogoutIcon /> Logout
        </button>

        {user && (
          <div className="mt-4 flex items-center gap-2 px-3">
            <Image
              src="https://docs.material-tailwind.com/img/face-2.jpg"
              alt="avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-xs">{user.email}</span>
          </div>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar