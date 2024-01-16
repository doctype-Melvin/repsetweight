const supertest = require("supertest");
const request = require("supertest");
const app = require("../app");
const api = supertest(app);

describe("Auth API", () => {
  it("should return 200 OK at /auth/login", async () => {
    return api.get("/api/auth/login").expect(200);
  });

  //   it("should return 401 unauthorized at /auth/login", async () => {
  //     const response = await request(app).post("/api/auth/login");
  //     expect(response.statusCode).toBe(401);
  //   });
});
