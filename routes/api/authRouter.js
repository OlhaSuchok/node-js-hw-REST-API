const express = require("express");
const router = express.Router();
const path = require("path");

const { asyncWrapper } = require("../../helpers/apiHelpers");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { uploadMiddleware } = require("../../middlewares/uploadMiddleware");

const FILE_DIR = path.resolve("./tmp");

const {
  registerValidation,
  loginValidation,
  // registrationConfirmationValidation,
  resendConfirmationValidation,
} = require("../../middlewares/validationMiddleware");

const {
  registrationController,
  registrationConfirmationController,
  resendConfirmationController,
  loginController,
  logoutController,
  currentLoginController,
  updateUserSubscriptionController,
  uploadController,
  updateAvatarController,
} = require("../../controllers/authControllers");

router.post(
  "/register",
  registerValidation,
  asyncWrapper(registrationController)
);
router.get(
  "/verify/:verificationToken",
  asyncWrapper(registrationConfirmationController)
);
router.post(
  "/verify",
  resendConfirmationValidation,
  asyncWrapper(resendConfirmationController)
);
router.get("/login", loginValidation, asyncWrapper(loginController));
router.post("/logout", authMiddleware, asyncWrapper(logoutController));
router.get("/current", authMiddleware, asyncWrapper(currentLoginController));
router.patch(
  "/",
  authMiddleware,
  asyncWrapper(updateUserSubscriptionController)
);
router.post(
  "/upload",
  uploadMiddleware.single("avatar"),
  asyncWrapper(uploadController)
);
router.patch(
  "/avatars",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  asyncWrapper(updateAvatarController)
);

router.use("/download", express.static(FILE_DIR));

module.exports = router;
