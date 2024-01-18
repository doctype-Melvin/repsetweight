const { authCheck } = require("../middleware");

jest.mock("../middleware", () => ({
  authCheck: jest.fn((req, res, next) => next()),
}));
