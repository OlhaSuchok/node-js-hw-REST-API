const Contact = require("../service/schemas/contacts");

const listContacts = async () => {
  return Contact.find();
};

const getContactById = async (contactId) => {
  return Contact.findOne({ _id: contactId });
};

const removeContact = async (contactId) => {
  return Contact.findByIdAndRemove({ _id: contactId });
};

const addContact = async ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

const updateContact = async (contactId, { name, email, phone }) => {
  return Contact.findByIdAndUpdate(
    { _id: contactId },
    { name, email, phone },
    { new: true }
  );
};

const patchContact = async (contactId, { name, email, phone }) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  patchContact,
};
