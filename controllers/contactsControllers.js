const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getAllContacts = async (req, res, next) => {
  const contacts = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};

const getOneContactById = async (req, res, next) => {
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
    message: "Not found",
  });
};

const deleteOneContactById = async (req, res, next) => {
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

// Не працює, розібратися
const addOneContact = async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.json({
    status: "success",
    code: 201,
    message: "create contact",
    data: {
      newContact,
    },
  });
};

const updateOneContactById = (req, res, next) => {};

module.exports = {
  getAllContacts,
  getOneContactById,
  deleteOneContactById,
  addOneContact,
  updateOneContactById,
};
