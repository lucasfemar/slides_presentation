import orchestrator from "@/tests/orchestrator";
import jwt from "jsonwebtoken";
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
    test("Logging-in with existent user", async () => {
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
      const jwtDecode = jwt.verify(
        auth[1],
        `${process.env.USERTOKEN}`,
      ) as jwt.JwtPayload;
      expect(jwtDecode.name).toBe("Login User Test");
      expect(jwtDecode.email).toBe("loginUserTest@login.com");
      expect(jwtDecode.sessionId).toBeDefined();
    });
    test("Logging-in with invalid email", async () => {
      const response = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        body: JSON.stringify({
          email: "nonexistentEmail@login.com",
          password: "loginUserTest",
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      expect(response.status).toBe(401);
      const responseBody = await response.json();
      expect(responseBody.message).toBe(
        "Invalid credentials please try again!",
      );
    });
    test("Logging-in with invalid password", async () => {
      const response = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        body: JSON.stringify({
          email: "loginUserTest@login.com",
          password: "invalidPassword",
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      expect(response.status).toBe(401);
      const responseBody = await response.json();
      expect(responseBody.message).toBe(
        "Invalid credentials please try again!",
      );
    });
  });
});
