const {
  registration,
  login,
  logout,
  currentLogin,
  updateUserSubscription,
} = require("../models/users");

const registrationController = async (req, res) => {
  const { email, password } = req.body;

  const newUser = await registration(email, password);

  return res.json({
    status: "201",
    newUser,
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
    status: "200",
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

const updateUserSubscriptionController = async (req, res) => {
  const { _id: userId } = req.user;

  const { subscription } = req.body;

  await updateUserSubscription(userId, req.body);

  return res.json({
    status: "200",
    message: `user subscription updated to '${subscription}'`,
  });
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentLoginController,
  updateUserSubscriptionController,
};
