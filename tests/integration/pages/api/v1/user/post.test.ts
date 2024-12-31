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
          name: `Test User`,
          phone: "11912345678",
          ministery: `testMinistery`,
          email: `testeMinistery@gmail.com`,
          password: `teste@password`,
          status: true,
        }),
      });
      const responseBody = await response.json();
      expect(response.status).toBe(201);
    });
  });
});
