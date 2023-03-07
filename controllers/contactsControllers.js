const {
  getAllContacts,
  getOneContactById,
  deleteOneContactById,
  addOneContact,
  updateOneContactById,
  updateStatusContact,
} = require("../models/contacts");

const getAllContactsController = async (req, res) => {
  const { _id: userId } = req.user;

  const contacts = await getAllContacts(userId);
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};

const getOneContactByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  const findContact = await getOneContactById(contactId, userId);
  if (findContact) {
    return res.json({
      status: "success",
      code: 200,
      data: {
        findContact,
      },
    });
  }
  return res.json({
    status: "error",
    code: 404,
    message: `Not found contact with id '${contactId}'.`,
  });
};

const deleteOneContactByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  const result = await deleteOneContactById(contactId, userId);

  if (result) {
    return res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
  }
  return res.json({
    status: "error",
    code: 404,
    message: "Not found",
  });
};

const addOneContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const { newContact, isContact } = await addOneContact(req.body, userId);

  if (isContact) {
    return res.status(400).json({
      message: "a contact with this name is already registered.",
    });
  }

  return res.json({
    status: "success",
    code: 201,
    message: "create contact",
    data: {
      newContact,
    },
  });
};

const updateOneContactByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  const updatedContact = await updateOneContactById(
    contactId,
    req.body,
    userId
  );

  if (updatedContact) {
    return res.json({
      status: "success",
      code: 200,
      message: "contact updated",
      data: {
        updatedContact,
      },
    });
  }
  return res.status(404).json({
    message: "Not found.",
  });
};

const updateStatusContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  const updatedContact = await updateStatusContact(contactId, req.body);

  if (!updatedContact) {
    return res.status(404).json({
      message: "Not found.",
    });
  }

  return res.json({
    status: "success",
    code: 200,
    message: "contact updated",
    data: {
      updatedContact,
    },
  });
};

module.exports = {
  getAllContactsController,
  getOneContactByIdController,
  deleteOneContactByIdController,
  addOneContactController,
  updateOneContactByIdController,
  updateStatusContactController,
};
