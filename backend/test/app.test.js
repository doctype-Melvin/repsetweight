const supertest = require("supertest");
const request = require("supertest");
const app = require("../app");
const models = require("../database/dbConnect");

describe("Auth API", () => {
  const api = supertest(app);

  it("should return 200 OK at /auth/login", async () => {
    const response = await api.get("/api/auth/login");
    expect(response.statusCode).toBe(200);
  });

  it("should return 401 unauthorized at /auth/login", async () => {
    const response = await api.post("/api/auth/login");
    expect(response.statusCode).toBe(401);
  });

  it("should authorize users with the right credentials", async () => {
    const response = await api
      .post("/api/auth/login")
      .send({ username: "demo", password: "demopass" });
    expect(response.statusCode).toBe(302);
  });

  it("should logout users", async () => {
    const response = await api.post("/api/auth/logout");
    expect(response.statusCode).toBe(302);
  });
});

describe("Users API", () => {
  const api = supertest(app);
  it("should find a user", async () => {
    const response = await api
      .post("/api/users/find")
      .send({ username: "demo", password: "demopass" });
    expect(response.statusCode).toBe(200);
  });
});

describe("Templates API", () => {
  const api = supertest(app);
  it("should find all public templates", async () => {
    const response = await api.get("/api/templates/all");
    expect(response.statusCode).toBe(200);
  });
});
