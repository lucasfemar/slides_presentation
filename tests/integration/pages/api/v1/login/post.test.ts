import orchestrator from "@/tests/orchestrator";

beforeAll(async () => {
  await orchestrator.clearTable("users");
  await fetch("http://localhost:3000/api/v1/user", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Login User Test",
      phone: "11912345678",
      ministery: "testMinistery_1",
      email: "loginUserTest@login.com",
      password: "loginUserTest",
      status: true,
    }),
  });
});

describe("POST /api/v1/login", () => {
  describe("Anonymous user", () => {
    test("Logging-in existent user", async () => {
      const response = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        body: JSON.stringify({
          email: "loginUserTest@login.com",
          password: "loginUserTest",
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      expect(response.status).toBe(200);
      const responseBody = await response.json();
      expect(responseBody.message).toBe("User authenticated successfully!");
      const cookies = response.headers.getSetCookie();
      expect(cookies.length).toBeGreaterThan(0);
      const authCookie =
        cookies.find((cookie) => cookie.includes("auth")) || "";
      const auth = authCookie.split("=");
      expect(auth[0]).toBe("auth");
      expect(auth[1]).toBeDefined();
    });
  });
});
