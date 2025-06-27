import { toast } from "react-toastify";

export const loginUser = async ({ username, email, password }) => {
  try {
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    toast.success("Login Successfully!");
    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};