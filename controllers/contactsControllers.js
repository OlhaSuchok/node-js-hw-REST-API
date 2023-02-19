const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  patchContact,
} = require("../models/contacts");

const getAllContacts = async (req, res) => {
  const contacts = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};

const getOneContactById = async (req, res) => {
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

const deleteOneContactById = async (req, res) => {
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

const addOneContact = async (req, res) => {
  const { newContact, isContact } = await addContact(req.body);
  const { name, email, phone } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "missing required name field",
    });
  }

  if (!email) {
    return res.status(400).json({
      message: "missing required email field",
    });
  }

  if (!phone) {
    return res.status(400).json({
      message: "missing required phone field",
    });
  }

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

const updateOneContactById = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body);
  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    return res.status(400).json({
      message: "missing required fields",
    });
  }

  if (!name && !email) {
    return res.status(400).json({
      message: "missing required name and email field",
    });
  }

  if (!name && !phone) {
    return res.status(400).json({
      message: "missing required name and phone field",
    });
  }

  if (!email && !phone) {
    return res.status(400).json({
      message: "missing required email and phone field",
    });
  }

  if (!name) {
    return res.status(400).json({
      message: "missing required name field",
    });
  }

  if (!email) {
    return res.status(400).json({
      message: "missing required email field",
    });
  }

  if (!phone) {
    return res.status(400).json({
      message: "missing required phone field",
    });
  }

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

  if (!updatedContact) {
    return res.status(404).json({
      message: "Not found.",
    });
  }
};

const patchContactById = async (req, res) => {
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
  getAllContacts,
  getOneContactById,
  deleteOneContactById,
  addOneContact,
  updateOneContactById,
  patchContactById,
};
