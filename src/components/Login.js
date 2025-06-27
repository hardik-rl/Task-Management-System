"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormControl from "@/shared/FormControl";
import HeadingLg from "@/shared/HeadingLg";
import Button from "@/shared/Button";
import NavigationLink from "@/shared/NavigationLink";

export default function Login() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            console.log("Please fill all fields.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok && data.token) {
                localStorage.setItem("token", data.token);
                console.log("Logged in successfully!");
                router.push("/tasks");
            } else {
                console.log(data.message || "Login failed");
            }
        } catch (err) {
            console.log("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <HeadingLg text="Login" />
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <FormControl
                            label="Email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter Your Email"
                            required
                        // error={errors.email}
                        />
                    </div>

                    <div>
                        <FormControl
                            label="Password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                        // error={errors.password}
                        />
                    </div>
                    <Button disabled={loading}>{loading ? "Logging in..." : "Login"}</Button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-6">
                    Don’t have an account?
                    <NavigationLink href="/register"> Register </NavigationLink>
                </p>
            </div>
        </div>
    );
}
