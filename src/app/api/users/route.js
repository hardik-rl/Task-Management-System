// app/api/users/route.js

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  const users = [
    { email: "admin@example.com", password: "123456" },
    { email: "user@example.com", password: "password" }
  ];

  const user = users.find((u) => u.email === email);
  return new Response(JSON.stringify(user ? [user] : []), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
