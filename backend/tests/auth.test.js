const supertest = require("supertest");
const app = require("../app");
const session = require("supertest-session");

describe("User Login / Logout", () => {
  let api;

  beforeAll(() => {
    api = session(app);
  });

  it("has a way of authenticating users", async () => {
    const response = await api
      .post("/api/auth/login")
      .send({ username: "demo", password: "demopass" });

    expect(response.status).toBe(200);
  });

  it("let's users navigate to the templates page", async () => {
    const response = await api.get("/api/templates/all");

    expect(response.status).toBe(200);
  });

  // Add more tests as needed

  afterAll(() => {
    api.destroy(); // Cleanup the session
  });
});
