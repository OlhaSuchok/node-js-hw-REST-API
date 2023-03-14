const Contact = require("../service/schemas/contacts");

const { RegistrationConflictError } = require("../helpers/errors");

const getAllContacts = async (userId, { page, limit }) => {
  return Contact.find({ userId })
    .select({
      updatedAt: 0,
    })
    .skip(page)
    .limit(limit)
    .sort("-createdAt");
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
  const isContact = await Contact.findOne({ name });

  if (isContact) {
    throw new RegistrationConflictError("This contact name is already in use");
  }

  const newContact = await Contact.create({
    name,
    email,
    phone,
    favorite,
    userId,
  });

  return newContact;
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
