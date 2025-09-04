const fetch = require("node-fetch");

async function test() {
  const res = await fetch("http://localhost:4000/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "test@test.com", password: "hemligt123" })
  });

  const data = await res.json();
  console.log("Register response:", data);
}

test();
