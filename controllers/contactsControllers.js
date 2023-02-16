const getAllContacts = (req, res, next) => {
  res.json({ message: "GET all contact" }); // dummy function for now
};

const getOneContactById = (req, res, next) => {
  res.json({ message: "GET contact by id" }); // dummy function for now
};

const deleteOneContactById = (req, res, next) => {
  res.json({ message: "DELETE contact by id" }); // dummy function for now
};

const addOneContact = (req, res, next) => {
  res.json({ message: "POST new contact" }); // dummy function for now
};

const updateOneContactById = (req, res, next) => {
  res.json({ message: "PUT contact by id" }); // dummy function for now
};

module.exports = {
  getAllContacts,
  getOneContactById,
  deleteOneContactById,
  addOneContact,
  updateOneContactById,
};
