require("dotenv").config();
const { auth } = require("../middleware");
const supertest = require("supertest");
const app = require("../app");

describe("Auth API", () => {
  const api = supertest(app);

  it("should return 200 OK at get /auth/login", async () => {
    const response = await api.get("/api/auth/login");
    expect(response.statusCode).toBe(200);
  });

  it("should return 401 unauthorized at /auth/login", async () => {
    const response = await api.post("/api/auth/login");
    expect(response.statusCode).toBe(401);
  });

  it("should authorize users with the right credentials", async () => {
    const response = await api.post("/api/auth/login").send({
      username: process.env.test_user,
      password: process.env.test_password,
    });
    expect(response.statusCode).toBe(200);
  });

  it("should logout users", async () => {
    const response = await api.post("/api/auth/logout");
    expect(response.statusCode).toBe(302);
  });
});

describe("Users API", () => {
  const api = supertest(app);
  it("should find a user", async () => {
    const response = await api.post("/api/users/find").send({
      username: process.env.test_user,
      password: process.env.test_password,
    });

    expect(response.statusCode).toBe(200);
  });
});

describe("Templates API", () => {
  const api = supertest(app);

  it("denies access for unauthorized users", async () => {
    const response = await api.get("/api/templates/all");
    expect(response.statusCode).toBe(401);
  });

  it("denies access to template detail for unauthorized users", async () => {
    const response = await api.get("/api/templates/1");
    expect(response.statusCode).toBe(401);
  });

  it("protects endpoint from unauthorized users", async () => {
    const response = await api.post("/api/templates/create");
    expect(response.statusCode).toBe(401);
  });
});

describe("Exercises API", () => {
  const api = supertest(app);

  it("protects route /api/exercises/all from unauthorized users", async () => {
    const response = await api.get("/api/exercises/all");
    expect(response.statusCode).toBe(401);
  });
});
