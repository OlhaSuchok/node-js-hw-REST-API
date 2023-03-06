const User = require("../service/schemas/users");
const bcrypt = require("bcrypt");

const registration = async (email, password) => {
  const user = new User({ email, password: await bcrypt.hash(password, 10) });
  await user.save();
  //   const newUser = await user.save();
};

const login = async () => {};

const logout = async () => {};

const currentLogin = async () => {};

module.exports = {
  registration,
  login,
  logout,
  currentLogin,
};
