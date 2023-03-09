const express = require("express");

const router = express.Router();

const { asyncWrapper } = require("../../helpers/apiHelpers");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const {
  registerValidation,
  loginValidation,
} = require("../../middlewares/validationMiddleware");

const {
  registrationController,
  loginController,
  logoutController,
  currentLoginController,
} = require("../../controllers/authControllers");

router.post(
  "/register",
  registerValidation,
  asyncWrapper(registrationController)
);
router.get("/login", loginValidation, asyncWrapper(loginController));
router.post("/logout", authMiddleware, asyncWrapper(logoutController));
router.get("/current", authMiddleware, asyncWrapper(currentLoginController));

module.exports = router;
