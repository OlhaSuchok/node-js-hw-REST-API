const jsonwebtoken = require("jsonwebtoken");

const { NotAuthorizedError } = require("../helpers/errors");

const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      next(
        new NotAuthorizedError(
          "Please, provade a token in request authorization"
        )
      );
    }

    const [tokenType, token] = req.headers["authorization"].split(" ");

    if (tokenType !== "Bearer") {
      next(new NotAuthorizedError("Unauthorized"));
    }

    if (!token) {
      next(new NotAuthorizedError("Unauthorized"));
    }

    const user = jsonwebtoken.decode(token, process.env.JWT_SECRET);

    if (!user) {
      next(new NotAuthorizedError("Unauthorized"));
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
