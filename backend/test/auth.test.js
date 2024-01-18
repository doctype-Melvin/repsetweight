// This test file is responsible for testing protected
// routes when users are authenticated

const supertest = require("supertest");
const app = require("../app");
const { application } = require("express");

describe("Testing user authentication", () => {
  const api = supertest(app);

  it("allows users to log in", async () => {
    const response = await api.post("/api/auth/login").send({
      username: process.env.test_user,
      password: process.env.test_password,
    });
    expect(response.statusCode).toBe(302);
  });

  it("redirects in case of failed login", async () => {
    const response = await api.post("/api/auth/login").send({
      username: "wrong_username",
      password: "wrong_password",
    });
    expect(response.statusCode).toBe(302);
  });

  afterAll(async () => {
    await api.post("/api/auth/logout");
  });
});
