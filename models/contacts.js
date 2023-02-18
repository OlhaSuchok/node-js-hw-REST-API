// const fs = require('fs/promises')

const crypro = require("crypto");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("./models/contacts.json");
// const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response);
    return contacts;
  } catch (error) {
    return error.message;
  }
};

const getContactById = async (contactId) => {
  try {
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response);
    const findContact = contacts.find((item) => item.id === contactId);
    return findContact;
  } catch (error) {
    return error.message;
  }
};

const removeContact = async (contactId) => {
  try {
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response);
    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
      return undefined;
    }
    contacts.splice(index, 1);
    const newContactList = JSON.stringify(contacts, null, "\t");
    fs.writeFile(contactsPath, newContactList);
    return 1;
  } catch (error) {
    return error.message;
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const newContact = { id: crypro.randomUUID(), name, email, phone };
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response);

    const isContact = contacts.find(
      (contact) => contact.name === newContact.name
    );
    const newContactList = JSON.stringify(
      [...contacts, newContact],
      null,
      "\t"
    );
    fs.writeFile(contactsPath, newContactList);
    return { newContact, isContact };
  } catch (error) {
    return error.message;
  }
};

const updateContact = async (contactId, { name, email, phone }) => {
  try {
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response);
    const updatedContact = contacts.find((item) => item.id === contactId);

    if (updatedContact) {
      updatedContact.name = name;
      updatedContact.email = email;
      updatedContact.phone = phone;

      fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"));
      return updatedContact;
    }
    return updatedContact;
  } catch (error) {
    return error.message;
  }
};

const patchContact = async (contactId, { name, email, phone }) => {
  try {
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response);
    const updatedContact = contacts.find((item) => item.id === contactId);

    if (updatedContact) {
      updatedContact.name = name;
      updatedContact.email = email;
      updatedContact.phone = phone;

      fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"));
      return updatedContact;
    }
    return updatedContact;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  patchContact,
};
