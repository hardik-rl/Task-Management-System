"use client";

import { useAuth } from "@/app/context/AuthContext";
import { AddIcon, ListIcon, LogoutIcon } from "@/shared/Icon";
import { cn } from "@/shared/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState(null);
    const { setIsAuthenticated } = useAuth();

    const isActive = (path) =>
        pathname === path ? "bg-blue-100 text-blue-700 font-medium" : "";

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
        setIsAuthenticated(false);
        localStorage.removeItem("user");
        toast.success("Logout Successfully!");
    };

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <aside className="h-screen w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
            <h2 className="text-2xl font-bold mb-6 text-blue-700">TMS</h2>

            <nav className="flex flex-col space-y-3">
                <button
                    onClick={() => router.push("/tasks")}
                    className={cn(
                        "text-left flex gap-2 items-center px-3 py-2 cursor-pointer rounded hover:bg-blue-50 transition",
                        isActive("/tasks")
                    )}
                >
                    <ListIcon /> Task Dashboard
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
                    <LogoutIcon />  Logout
                </button>

                <div className="mt-4">
                    <button
                        className="flex gap-2 items-center text-left px-3 py-2 cursor-pointer rounded hover:bg-blue-50 transition"
                    >
                        <Image
                            src="https://docs.material-tailwind.com/img/face-2.jpg"
                            alt="avatar"
                            priority
                            width={20}
                            height={20}
                            className="relative inline-block h-9 w-9 !rounded-full object-cover object-center"
                        />
                        {user && (
                            <span className="text-xs">{user.email}</span>
                        )}
                    </button>
                </div>
            </nav>
        </aside>
    );
}
