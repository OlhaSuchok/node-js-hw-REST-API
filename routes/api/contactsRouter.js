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

const { authMiddleware } = require("../../middlewares/authMiddleware");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const { isValidId } = require("../../helpers/isValidId");

router.use(authMiddleware);

router.get("/", asyncWrapper(getAllContactsController));

router.get("/:contactId", isValidId, asyncWrapper(getOneContactByIdController));

router.post("/", addContactValidation, asyncWrapper(addOneContactController));

router.delete("/:contactId", asyncWrapper(deleteOneContactByIdController));

router.put(
  "/:contactId",
  uptateContactValidation,
  asyncWrapper(updateOneContactByIdController)
);

router.patch(
  "/:contactId",
  updateStatusContactValidation,
  asyncWrapper(updateStatusContactController)
);

module.exports = router;
