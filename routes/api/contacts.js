const express = require("express");

const router = express.Router();

const {
  getAllContactsController,
  getOneContactByIdController,
  deleteOneContactByIdController,
  addOneContactController,
  updateOneContactByIdController,
  updateStatusContactController,
} = require("../../controllers/contactsControllers");

const {
  addContactValidation,
  uptateContactValidation,
  updateStatusContactValidation,
} = require("../../middlewares/validationMiddleware");

router.get("/", getAllContactsController);

router.get("/:contactId", getOneContactByIdController);

router.post("/", addContactValidation, addOneContactController);

router.delete("/:contactId", deleteOneContactByIdController);

router.put(
  "/:contactId",
  uptateContactValidation,
  updateOneContactByIdController
);

router.patch(
  "/:contactId",
  updateStatusContactValidation,
  updateStatusContactController
);

module.exports = router;
