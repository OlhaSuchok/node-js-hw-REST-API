const Contact = require("../service/schemas/contacts");

const getAllContacts = async () => {
  return Contact.find();
};

const getOneContactById = async (contactId) => {
  return Contact.findOne({ _id: contactId });
};

const deleteOneContactById = async (contactId) => {
  return Contact.findByIdAndRemove({ _id: contactId });
};

const addOneContact = async ({ name, email, phone, favorite }) => {
  return Contact.create({ name, email, phone, favorite });
};

const updateOneContactById = async (
  contactId,
  { name, email, phone, favorite }
) => {
  return Contact.findByIdAndUpdate(
    { _id: contactId },
    { name, email, phone, favorite },
    { new: true }
  );
};

const updateStatusContact = async (contactId, { favorite }) => {
  return Contact.findByIdAndUpdate(
    { _id: contactId },
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
