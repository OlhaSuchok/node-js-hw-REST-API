const jsonwebtoken = require("jsonwebtoken");

const { NotAuthorizedError } = require("../helpers/errors");
const User = require("../service/schemas/users");

const authMiddleware = (req, res, next) => {
  const [tokenType, token] = req.headers["authorization"].split(" ");

  if (tokenType !== "Bearer") {
    next(new NotAuthorizedError("Unauthorized"));
  }

  if (!token) {
    next(new NotAuthorizedError("Not authorized"));
  }

  try {
    const user = jsonwebtoken.decode(token, process.env.JWT_SECRET);

    if (!user) {
      next(new NotAuthorizedError("Not authorized"));
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    next(new NotAuthorizedError("Invalid token"));
  }
};

module.exports = {
  authMiddleware,
};
