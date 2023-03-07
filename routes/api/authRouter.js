const express = require("express");

const router = express.Router();

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  registrationController,
  loginController,
  logoutController,
  currentLoginController,
} = require("../../controllers/authControllers");

router.post("/register", asyncWrapper(registrationController));
router.post("/login", asyncWrapper(loginController));
router.post("/logout", asyncWrapper(logoutController));
router.post("/current", asyncWrapper(currentLoginController));

module.exports = router;
