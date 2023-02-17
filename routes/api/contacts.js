const express = require("express");

const router = express.Router();

const contactsController = require("../../controllers/contactsControllers");

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", contactsController.getOneContactById);

router.post("/", contactsController.addOneContact);

router.delete("/:contactId", contactsController.deleteOneContactById);

router.put("/:contactId", contactsController.updateOneContactById);

router.patch("/:contactId", contactsController.updateBitOneContactById);

module.exports = router;
