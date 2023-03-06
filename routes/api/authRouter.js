const express = require("express");

const router = express.Router();

const {
  registrationController,
  loginController,
  logoutController,
  currentLoginController,
} = require("../../controllers/authControllers");

router.post("/register", registrationController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/current", currentLoginController);

// router.get("/", getAllContactsController);
// router.get("/:contactId", getOneContactByIdController);
// router.post("/", addContactValidation, addOneContactController);
// router.delete("/:contactId", deleteOneContactByIdController);

module.exports = router;
