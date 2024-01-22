const supertest = require("supertest");
const app = require("../app");
const session = require("supertest-session");
const { models } = require("../database/dbConnect");
const { Exercise } = models;
require("dotenv").config();

jest.mock("../database/dbConnect", () => ({
  models: {
    Exercise: {
      create: jest.fn(),
    },
  },
}));

describe("CREATE functionality for different routes", () => {
  const api = supertest(app);

  it("should create an exercise", async () => {
    const mockExercise = {
      name: "test",
      category: "test",
      target: "test",
      equipment: "test",
      user_added: 1,
    };

    Exercise.create.mockResolvedValueOnce(mockExercise);

    const response = await api.post("/api/exercises/add").send(mockExercise);
    expect(response.body).toEqual({ data: mockExercise });
  });
});
