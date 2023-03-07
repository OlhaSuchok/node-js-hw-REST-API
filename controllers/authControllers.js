const bcrypt = require("bcrypt");

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
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await login(email, password);

  if (!user) {
    return res.json({
      status: "Unauthorized",
      code: 401,
      message: `There is no user with email '${email}'`,
    });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.json({
      status: "Unauthorized",
      code: 401,
      message: "Password is wrong",
    });
  }

  return res.json({
    status: "success",
  });
};

const logoutController = async (req, res) => {};

const currentLoginController = async (req, res) => {};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentLoginController,
};
