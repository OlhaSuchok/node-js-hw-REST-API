const bcrypt = require("bcrypt");

const {
  registration,
  login,
  logout,
  currentLogin,
} = require("../models/users");

const registrationController = async (req, res) => {
  const { email, password } = req.body;

  await registration(email, password);

  return res.json({
    status: "success",
    code: 201,
    message: "Created",
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const loginData = await login(email, password);
  const token = loginData.token;

  const user = {
    email: loginData.user.email,
    subscription: loginData.user.subscription,
  };

  return res.json({
    status: "success",
    token,
    user,
  });
};

const logoutController = async (req, res) => {
  const { _id: userId } = req.user;
  await logout(userId);

  return res.json({
    status: "204",
    message: "No Content",
  });
};

const currentLoginController = async (req, res) => {
  const { _id: userId } = req.user;

  const currentUser = await currentLogin(userId);

  return res.json({
    status: "200",
    currentUser,
  });
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentLoginController,
};
