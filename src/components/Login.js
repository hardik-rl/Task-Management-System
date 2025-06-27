"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormControl from "@/shared/FormControl";
import HeadingLg from "@/shared/HeadingLg";
import Button from "@/shared/Button";
import NavigationLink from "@/shared/NavigationLink";
import { loginUser } from "@/app/api/auth";
import { LoadingIcon } from "@/shared/Icon";

export default function LoginComponent() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      console.log("Please fill all fields.");
      return;
    }

    setLoading(true);
    try {

      const data = await loginUser(form);

      router.push("/tasks");
      localStorage.setItem("token", data.accessToken);

    } catch (err) {
      console.log(err, "Something went wrong");
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
              label="Name"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Your Name"
              required
            // error={errors.email}
            />
          </div>

          <div>
            <FormControl
              label="Email"
              name="email"
              type="text"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
            // required
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
          <Button disabled={loading} className="flex items-center justify-center gap-2">
            {loading ? (
              <LoadingIcon />
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?
          <NavigationLink href="/register"> Register </NavigationLink>
        </p>
      </div>
    </div>
  );
}
