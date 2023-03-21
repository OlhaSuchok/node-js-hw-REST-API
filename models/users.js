const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../service/schemas/users");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const Jimp = require("jimp");
const avatarsDir = path.join(__dirname, "../tmp");
const sgMail = require("@sendgrid/mail");

require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const {
  NotAuthorizedError,
  RegistrationConflictError,
  WrongParametersError,
  NotFound,
  BadRequest,
} = require("../helpers/errors");

const registration = async (email, password) => {
  const isUser = await User.findOne({ email });

  if (isUser) {
    throw new RegistrationConflictError(`Email '${email}' in use`);
  }

  const avatarURL = gravatar.url(email);

  const user = new User({
    email,
    password,
    avatarURL,
    verificationToken: uuidv4(),
  });

  await user.save();

  const createdUser = await User.findOne({ email });

  const verifyToken = createdUser.verificationToken;

  const msg = {
    to: email,
    from: "suchok_olya@ukr.net",
    subject: "Verify your email!",
    text: `Please, <a href="http:localhost:${process.env.PORT}/api/users/verify/${verifyToken}">confirm<a/> your email address.`,
    html: `Please, <a href="http:localhost:${process.env.PORT}/api/users/verify/${verifyToken}">confirm<a/> your email address.`,
  };
  await sgMail.send(msg);

  return {
    email: createdUser.email,
    subscription: createdUser.subscription,
    avatarURL,
    verificationToken: createdUser.verificationToken,
  };
};

const registrationConfirmation = async (verificationToken) => {
  const varificationUser = await User.findOne({ verificationToken });

  if (!varificationUser) {
    throw new NotFound("User not found");
  }

  const user = await User.findByIdAndUpdate(varificationUser._id, {
    verificationToken: null,
    verify: true,
  });

  if (!user) {
    throw new NotFound("User not found");
  }

  const msg = {
    to: user.email,
    from: "suchok_olya@ukr.net",
    subject: "Thank you for registration!",
    text: "<h1>and easy to do anywhere, even with Node.js</h1>",
    html: "<h1>and easy to do anywhere, even with Node.js</h1>",
  };

  await sgMail.send(msg);

  return user;
};

const resendConfirmation = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFound("User not found");
  }

  if (user.verify === true) {
    throw new BadRequest("Verification has already been passed");
  }

  const msg = {
    to: user.email,
    from: "suchok_olya@ukr.net",
    subject: "Verify your email!",
    text: `Please, <a href="http:localhost:${process.env.PORT}/api/users/verify/${user.verificationToken}">confirm<a/> your email address.`,
    html: `Please, <a href="http:localhost:${process.env.PORT}/api/users/verify/${user.verificationToken}">confirm<a/> your email address.`,
  };

  await sgMail.send(msg);

  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });

  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email, verify: true });

  if (!user) {
    throw new NotAuthorizedError("Email or password is wrong");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError("Email or password is wrong");
  }

  const token = jsonwebtoken.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "23h" }
  );

  return { user, token };
};

const logout = async (userId) => {
  const user = await User.findByIdAndUpdate(userId, { token: null });

  if (!user) {
    throw new NotAuthorizedError("Not authorized");
  }
};

const currentLogin = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new NotAuthorizedError("Not authorized");
  }

  const currentUser = {
    email: user.email,
    subscription: user.subscription,
  };

  return currentUser;
};

const updateUserSubscription = async (userId, body) => {
  const user = await User.findById(userId);
  const subscription = body.subscription;

  if (!user) {
    throw new NotAuthorized("Not authorized");
  }

  if (
    subscription !== "starter" &&
    subscription !== "pro" &&
    subscription !== "business"
  ) {
    throw new WrongParametersError(
      "Enter subscription type 'starter', 'pro' or 'business'"
    );
  }

  if (subscription === user.subscription) {
    throw new WrongParametersError(
      `Subscription '${subscription}' is already in use by account`
    );
  }

  await User.findByIdAndUpdate(userId, { subscription });
};

const upload = async (tempUpload, originalname) => {
  const filename = `${uuidv4()}_${originalname}`;

  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);

  const cover = path.join("avatars", filename);

  return cover;
};

const updateAvatar = async (userId, tempUpload, originalname) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new NotAuthorized("Not authorized");
  }

  const filename = `${uuidv4()}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(userId, { avatarURL });

  const updatedSizeUser = await User.findById(userId);

  if (updatedSizeUser) {
    Jimp.read(`./tmp/${filename}`, (err, lenna) => {
      if (err) throw err;
      lenna.resize(100, 100).write(`./public/avatars/${"updated" + filename}`);
    });

    await fs.unlink(`./tmp/${filename}`, (err) => {
      if (err) throw err;
    });
  }

  return avatarURL;
};

module.exports = {
  registration,
  registrationConfirmation,
  resendConfirmation,
  login,
  logout,
  currentLogin,
  updateUserSubscription,
  upload,
  updateAvatar,
};
