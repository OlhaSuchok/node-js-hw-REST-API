const {
  getAllContacts,
  getOneContactById,
  deleteOneContactById,
  addOneContact,
  updateOneContactById,
  updateStatusContact,
} = require("../models/contacts");

const { NotFound } = require("../helpers/errors");

const getAllContactsController = async (req, res) => {
  const { _id: userId } = req.user;

  const contacts = await getAllContacts(userId);
  res.json({
    status: "200",
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
      status: "200",
      data: {
        findContact,
      },
    });
  }

  if (!findContact) {
    throw new NotFound(`Not found contact with id '${contactId}'.`);
  }
};

const deleteOneContactByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  const result = await deleteOneContactById(contactId, userId);

  if (result) {
    return res.json({
      status: "200",
      message: "contact deleted",
    });
  }

  if (!result) {
    throw new NotFound(`Not found contact with id '${contactId}'.`);
  }
};

const addOneContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const { newContact } = await addOneContact(req.body, userId);

  return res.json({
    status: "201",
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

  if (!updatedContact) {
    throw new NotFound(`Not found contact with id '${contactId}'.`);
  }

  return res.json({
    status: "200",
    message: "contact updated",
    data: {
      updatedContact,
    },
  });
};

const updateStatusContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  const updatedContact = await updateStatusContact(contactId, req.body, userId);

  if (!updatedContact) {
    throw new NotFound(`Not found contact with id '${contactId}'.`);
  }

  return res.json({
    status: "200",
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
