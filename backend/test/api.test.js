// This test file executes basic tests:
// Login and logout functionality
// Check if routes are protected

require("dotenv").config();

const supertest = require("supertest");
const app = require("../app");

describe("Auth API", () => {
  const api = supertest(app);

  it("allows GET /api/auth/login", async () => {
    const response = await api.get("/api/auth/login");
    expect(response.statusCode).toBe(200);
  });

  it("protects POST /api/auth/login", async () => {
    const response = await api.post("/api/auth/login");
    expect(response.headers["location"]).toEqual("/login");
  });
});

// -------------------------------------------------------------------------------------------
describe("Users API", () => {
  const api = supertest(app);
  it("protects POST /api/users/find", async () => {
    const response = await api.post("/api/users/find").send({
      username: process.env.test_user,
    });

    expect(response.statusCode).toBe(401);
  });
});

// -------------------------------------------------------------------------------------------
describe("Templates API", () => {
  const api = supertest(app);

  it("protects GET /api/templates/all", async () => {
    const response = await api.get("/api/templates/all");
    expect(response.statusCode).toBe(401);
  });

  it("protects GET /api/templates/:id", async () => {
    const response = await api.get("/api/templates/1");
    expect(response.statusCode).toBe(401);
  });

  it("protects POST /api/templates/create", async () => {
    const response = await api.post("/api/templates/create");
    expect(response.statusCode).toBe(401);
  });
});

// -------------------------------------------------------------------------------------------
describe("Exercises API", () => {
  const api = supertest(app);

  it("protects GET /api/exercises/all", async () => {
    const response = await api.get("/api/exercises/all");
    expect(response.statusCode).toBe(401);
  });
});
