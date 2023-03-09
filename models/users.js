const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../service/schemas/users");

const {
  NotAuthorizedError,
  RegistrationConflictError,
} = require("../helpers/errors");

const registration = async (email, password) => {
  const isUser = await User.findOne({ email });

  if (isUser) {
    throw new RegistrationConflictError(`Email '${email}' in use`);
  }

  const user = new User({ email, password });
  await user.save();

  const createdUser = await User.findOne({ email });

  return {
    email: createdUser.email,
    subscription: createdUser.subscription,
  };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

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
  const user = await User.findByIdAndUpdate(userId, { token: "" });

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

module.exports = {
  registration,
  login,
  logout,
  currentLogin,
};
