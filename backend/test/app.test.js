const supertest = require("supertest");
const request = require("supertest");
const app = require("../app");
const models = require("../database/dbConnect");
require("dotenv").config();

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
      .send({
        username: process.env.test_user,
        password: process.env.test_password,
      });
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
      .send({
        username: process.env.test_user,
        password: process.env.test_password,
      });
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

describe("Exercises API", () => {
  const api = supertest(app);
  it("needs authentication for protected route /api/exercises/all", async () => {
    const auth = await api
      .post("/api/auth/login")
      .send({
        username: process.env.test_user,
        password: process.env.test_password,
      });
    if (auth.statusCode === 401) {
      console.log("You must be logged in to test this endpoint");
      expect(auth.statusCode).toBe(200);
    } else {
      const response = await api.get("/api/exercises/all");
      expect(response.statusCode).toBe(200);
    }
    // const response = await api.get("/api/exercises/all");
    // expect(response.statusCode).toBe(200);
  });
});
