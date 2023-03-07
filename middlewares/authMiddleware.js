const jsonwebtoken = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const [tokenType, token] = req.headers["authorization"].split(" ");

  if (!token) {
    res.status(401).json({ message: "Please, provide a token" });
    return;
  }

  try {
    const user = jsonwebtoken.decode(token, process.env.JWT_SECRET);
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
  authMiddleware,
};
