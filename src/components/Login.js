"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormControl from "@/shared/FormControl";
import HeadingLg from "@/shared/HeadingLg";
import Button from "@/shared/Button";
import NavigationLink from "@/shared/NavigationLink";
import { LoadingIcon } from "@/shared/Icon";
import { toast } from "react-toastify";
import ApiCalling from "@/shared/api/ApiCalling";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginComponent() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please fill all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await ApiCalling.apiCallGet(`/users?email=${form.email}`);
      const users = res.data;

      if (users.length === 0) {
        toast.error("Invalid login credentials");
        return;
      }

      const user = users[0];

      if (user.password !== form.password) {
        toast.error("Invalid password");
        return;
      }

      if (users.length === 1) {
        const accessToken = Math.random().toString(36).substring(2);
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        login(accessToken);

        toast.success("Login Successfully!");
        router.push("/tasks");
      } else {
        toast.error("Invalid credentials");
      }

    } catch (err) {
      console.log(err, "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full sm:min-w-[400px] max-w-md bg-white p-8 rounded-lg shadow-md">
        <HeadingLg text="Login" />
        <form onSubmit={handleSubmit} className="space-y-4">
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
