
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormControl from "@/shared/FormControl";
import HeadingLg from "@/shared/HeadingLg";
import Button from "@/shared/Button";
import NavigationLink from "@/shared/NavigationLink";
import { LoadingIcon } from "@/shared/Icon";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password || !form.confirm) {
      console.log("Please fill all fields.");
      return;
    }

    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // const res = await fetch("http://localhost:3001/auth/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     email: form.email,
      //     password: form.password,
      //   }),
      // });

      // const data = await res.json();

      // if (res.ok) {
      //   console.log("Registered successfully! Please login.");
      // router.push("/login");
      // toast.success("Register Successfully!");
      // } else {
      //   toast.error("Registration failed", data.message);
      //   console.log(data.message || "Registration failed.");
      // }
      const res = await fetch("http://localhost:3001/users?email=" + form.email);
      const existingUsers = await res.json();

      if (existingUsers.length > 0) {
        // alert("User already exists!");
        toast.error("User already exists!");
        return;
      }

      await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      router.push("/login");
      toast.success("Register Successfully!");
    } catch (err) {
      toast.error("Something went wrong", err);
      console.log("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <HeadingLg text="Create an Account" />

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

          <div>
            <FormControl
              label="Confirm Password"
              name="confirm"
              type="password"
              value={form.confirm}
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
              "Register"
            )}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <NavigationLink href="/login"> Login </NavigationLink>
        </p>
      </div>
    </div>
  );
}
