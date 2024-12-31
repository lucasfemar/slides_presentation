import orchestrator from "tests/orchestrator";
beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearTable("users");

  for (let i = 1; i <= 5; i++) {
    await fetch("http://localhost:3000/api/v1/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `Test User ${i}`,
        phone: "11912345678",
        ministery: `testMinistery_${i}`,
        email: `testeMinistery_${i}@gmail.com`,
        password: `teste_${i}@password`,
        status: true,
      }),
    });
  }
});

describe("GET /api/v1/user", () => {
  describe("Anonymous user", () => {
    test("Retrievinhg list of users", async () => {
      const response = await fetch("http://localhost:3000/api/v1/user");
      const responseBody = await response.json();
      expect(responseBody.length).toBe(5);
      expect(responseBody[0].name).toBe("Test User 1");
    });
  });
});
