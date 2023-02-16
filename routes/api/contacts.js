const express = require("express");

const router = express.Router();

const contactsController = require("../../controllers/contactsControllers");

// router.get("/", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

router.get("/", contactsController.getAllContacts);

// router.get("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

router.get("/:contactId", contactsController.getOneContactById);

// router.post("/", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

router.post("/", contactsController.addOneContact);

// router.delete("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

router.delete("/:contactId", contactsController.deleteOneContactById);

// router.put("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

router.put("/:contactId", contactsController.updateOneContactById);

module.exports = router;
