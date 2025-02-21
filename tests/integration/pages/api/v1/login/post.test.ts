import { generateUserPassword } from "@/src/utils";
import orchestrator from "@/tests/orchestrator";
import prisma from "lib/prisma";
import jwt from "jsonwebtoken";

beforeAll(async () => {
  await orchestrator.clearTable("users");
  const user = {
    name: "Login User Test",
    phone: "11912345678",
    ministery: "testMinistery_1",
    email: "loginUserTest@login.com",
    password: generateUserPassword("loginUserTest"),
    status: true,
  };
  await prisma.users.create({ data: user });
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
      const responseBody = await response.json();
      expect(response.status).toBe(200);
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
      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "AuthenticationError",
        message: "Credenciais invalidas, por favor tente novamente.",
        action: "Verifique se o token de sessão é valido.",
        status_code: 403,
      });
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
      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "AuthenticationError",
        message: "Credenciais invalidas, por favor tente novamente.",
        action: "Verifique se o token de sessão é valido.",
        status_code: 403,
      });
    });
  });
});
