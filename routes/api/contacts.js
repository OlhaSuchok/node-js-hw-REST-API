const express = require("express");

const router = express.Router();

const contactsController = require("../../controllers/contactsControllers");

const {
  addContactValidation,
  uptateContactValidation,
  patchContactValidation,
} = require("../../middlewares/validationMiddleware");

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", contactsController.getOneContactById);

router.post("/", addContactValidation, contactsController.addOneContact);

router.delete("/:contactId", contactsController.deleteOneContactById);

router.put(
  "/:contactId",
  uptateContactValidation,
  contactsController.updateOneContactById
);

router.patch(
  "/:contactId",
  patchContactValidation,
  contactsController.patchContactById
);

module.exports = router;
