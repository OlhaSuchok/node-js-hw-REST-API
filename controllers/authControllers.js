const {
  registration,
  login,
  logout,
  currentLogin,
} = require("../models/users");

const registrationController = async (req, res) => {
  const { email, password } = req.body;

  const newUser = await registration(email, password);

  return res.json({
    status: "success",
    code: 201,
    message: "Created",
    data: {
      newUser,
    },
  });
};

const loginController = async (req, res) => {};

const logoutController = async (req, res) => {};

const currentLoginController = async (req, res) => {};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentLoginController,
};
