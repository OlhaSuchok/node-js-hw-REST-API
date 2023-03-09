const Contact = require("../service/schemas/contacts");

const { NotFound } = require("../helpers/errors");

const getAllContacts = async (userId) => {
  return Contact.find({ userId });
};

const getOneContactById = async (contactId, userId) => {
  return Contact.findOne({ _id: contactId, userId });
};

const deleteOneContactById = async (contactId, userId) => {
  return Contact.findByIdAndRemove({ _id: contactId, userId });
};

const addOneContact = async (
  { name, email, phone, favorite = false },
  userId
) => {
  return Contact.create({ name, email, phone, favorite, userId });
};

const updateOneContactById = async (
  contactId,
  { name, email, phone, favorite },
  userId
) => {
  return Contact.findByIdAndUpdate(
    { _id: contactId, userId },
    { name, email, phone, favorite },
    { new: true }
  );
};

const updateStatusContact = async (contactId, { favorite }, userId) => {
  return Contact.findByIdAndUpdate(
    { _id: contactId, userId },
    { favorite },
    { new: true }
  );
};

module.exports = {
  getAllContacts,
  getOneContactById,
  deleteOneContactById,
  addOneContact,
  updateOneContactById,
  updateStatusContact,
};
