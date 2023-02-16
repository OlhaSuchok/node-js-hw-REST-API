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
    console.error(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response);
    const findContact = contacts.find((item) => item.id === contactId);
    return findContact;
  } catch (error) {
    console.error(err.message);
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
    console.error(err.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const newContact = { id: crypro.randomUUID(), name, email, phone };
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response);

    const isContact = contacts.find(
      (contact) => contact.name === newContact.name
    );

    if (isContact) {
      console.log("Контакт з таким імя'м вже зареєстровнний.".red);
      return;
    } else {
      const newContactList = JSON.stringify(
        [...contacts, newContact],
        null,
        "\t"
      );
      fs.writeFile(contactsPath, newContactList);
      const newList = JSON.parse(newContactList);
      return newContact;
    }
  } catch (error) {
    console.error(err.message);
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
