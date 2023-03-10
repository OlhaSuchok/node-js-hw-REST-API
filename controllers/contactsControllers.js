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
  const { page = 1, limit = 20 } = req.query;

  const contacts = await getAllContacts(userId, { page, limit });
  res.json({
    status: "200",
    data: {
      contacts,
      limit: parseInt(limit) > 20 ? 20 : parseInt(limit),
      page: parseInt(page),
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

  const newContact = await addOneContact(req.body, userId);

  return res.json({
    status: "201",
    message: "create contact",
    newContact,
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
