// const fs = require('fs/promises')

const crypro = require("crypto");
const fs = require("fs").promises;
const path = require("path");
// require("colors");

const contactsPath = path.join("./models/contacts.json");
// const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response);
    return contacts;
  } catch (error) {
    console.error(err.message);
  }
};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
