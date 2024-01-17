const authCheck = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

const auth = async (api) => {
  const response = await api.post("/api/auth/login").send({
    username: process.env.test_user,
    password: process.env.test_password,
  });

  return response;
};

module.exports = { authCheck, auth };
