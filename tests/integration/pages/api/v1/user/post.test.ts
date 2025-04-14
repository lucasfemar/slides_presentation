import orchestrator from "tests/orchestrator";
beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearTable("users");
});

describe("POST /api/v1/user", () => {
  describe("Anonymous user", () => {
    test("Creating new user", async () => {
      const response = await fetch("http://localhost:3000/api/v1/user", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          name: `user test`,
          phone: "11912345678",
          ministery: "testMinistery",
          email: "teste@gmail.com",
          password: "Teste@2025",
          status: true,
        }),
      });
      expect(response.status).toBe(201);
      const responseBody = await response.json();

      expect(responseBody).toEqual({
        created_date: "2025-04-12T17:49:55.881Z",
        email: "teste@gmail.com",
        id: "cm9eigtuw0003a7tfawx68d03",
        ministery: "testMinistery",
        name: "user test",
        password:
          "$2b$10$ATKJbuMlW6SC1A.0i.h6Z..WCK1lndU2/S/sUbHD8MLXcHzJUxKKK",
        phone: "11912345678",
        status: false,
        update_date: "2025-04-12T17:49:55.881Z",
      });
    });
  });
});
