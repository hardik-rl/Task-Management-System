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
    console.log("Login API Response:", data);

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

// export const isUserAuthenticated = () => {
//   if (typeof window !== "undefined") {
//     return !!localStorage.getItem("token");
//   }
//   return false;
// };