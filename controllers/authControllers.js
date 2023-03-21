const { v4: uuidv4 } = require("uuid");

const avatars = [];

const {
  registration,
  registrationConfirmation,
  login,
  logout,
  currentLogin,
  updateUserSubscription,
  upload,
  updateAvatar,
} = require("../models/users");

const registrationController = async (req, res) => {
  const { email, password } = req.body;

  const newUser = await registration(email, password);

  return res.json({
    status: "201",
    newUser,
  });
};

const registrationConfirmationController = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await registrationConfirmation(verificationToken);

  console.log("verificationToken", verificationToken);
  console.log("user", user);

  return res.json({
    status: "200",
    message: "Verification successful",
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
    message: `User subscription updated to '${subscription}'`,
  });
};

const uploadController = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;

  const cover = await upload(tempUpload, originalname);

  const newAvatar = {
    id: uuidv4(),
    ...req.body,
    cover,
  };

  avatars.push(newAvatar);

  res.json({
    status: "success",
    avatars,
  });
};

const updateAvatarController = async (req, res) => {
  const { _id: userId } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const avatarURL = await updateAvatar(userId, tempUpload, originalname);

  res.json({
    status: "avatar updated successfully",
    avatarURL,
  });
};

module.exports = {
  registrationController,
  registrationConfirmationController,
  loginController,
  logoutController,
  currentLoginController,
  updateUserSubscriptionController,
  uploadController,
  updateAvatarController,
};
