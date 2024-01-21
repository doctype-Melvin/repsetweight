const supertest = require("supertest");
const app = require("../app");
const session = require("supertest-session");
require("dotenv").config();

describe("Authorize users", () => {
  let api;

  // Setup app
  beforeAll(() => {
    api = session(app);
  });

  it("verify credentials, create session", async () => {
    const response = await api.post("/api/auth/login").send({
      username: process.env.test_user,
      password: process.env.test_password,
    });

    expect(response.headers.location).toEqual("/");
  });

  it("allows access to protected routes after successful login", async () => {
    // All these endpoints use authCheck middleware
    const response = await api.get("/api/templates/all");
    expect(response.status).toBe(200);
    const response2 = await api.get("/api/templates/1");
    expect(response2.status).toBe(200);
    const response3 = await api.post("/api/templates/create");
    expect(response3.status).toBe(200);
  });

  it("successfully logs user out", async () => {
    const response = await api.get("/api/auth/logout");
    expect(response.headers.location).toEqual("/");
  });

  // Cleanup
  afterAll(async () => {
    api.destroy();
  });
});

describe("Protected routes", () => {
  const api = supertest(app);

  it("protects templates", async () => {
    const response = await api.get("/api/templates/all");
    expect(response.status).toBe(401);
    const response2 = await api.get("/api/templates/1");
    expect(response2.status).toBe(401);
    const response3 = await api.post("/api/templates/create");
    expect(response3.status).toBe(401);
  });
});
