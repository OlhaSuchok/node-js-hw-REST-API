const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../service/schemas/users");

const { NotAuthorized } = require("../helpers/errors");

const registration = async (email, password) => {
  const user = new User({ email, password });
  await user.save();
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    return;
  }

  const token = jsonwebtoken.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );

  return { user, token };
};

const logout = async () => {};

const currentLogin = async () => {};

module.exports = {
  registration,
  login,
  logout,
  currentLogin,
};
