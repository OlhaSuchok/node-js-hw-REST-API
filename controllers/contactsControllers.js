const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  patchContact,
} = require("../models/contacts");

const getAllContactsController = async (req, res) => {
  const contacts = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};

const getOneContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const findContact = await getContactById(contactId);
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
  const { contactId } = req.params;
  const result = await removeContact(contactId);

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
  const { newContact, isContact } = await addContact(req.body);

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
  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body);

  if (updateContact) {
    return res.json({
      status: "success",
      code: 200,
      message: "contact updated",
      data: {
        updatedContact,
      },
    });
  }
};

const patchContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await patchContact(contactId, req.body);

  if (!updateContact) {
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
  patchContactByIdController,
};
