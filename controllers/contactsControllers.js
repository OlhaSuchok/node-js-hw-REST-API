// const Joi = require("joi");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  patchContact,
} = require("../models/contacts");

const getAllContacts = async (req, res, next) => {
  const contacts = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};

const getOneContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const findContact = await getContactById(contactId);
  if (findContact) {
    return res.json({
      status: "success",
      code: 200,
      data: {
        findContact,
      },
    });
  }
  return res.json({
    status: "error",
    code: 404,
    message: `Not found contact with id '${contactId}'.`,
  });
};

const deleteOneContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);

  if (result) {
    return res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
  }
  return res.json({
    status: "error",
    code: 404,
    message: "Not found",
  });
};

const addOneContact = async (req, res, next) => {
  const { newContact, isContact } = await addContact(req.body);

  const { name, email, phone } = req.body;
  // const schema = Joi.object({
  //   name: Joi.string().alphanum().min(3).max(30).required(),
  //   email: Joi.string().email({
  //     minDomainSegments: 2,
  //     tlds: { allow: ["com", "net"] },
  //   }),
  //   phone: Joi.string().min(7).max(15).required(),
  // });

  // const validationResalt = schema.validate(req.body);

  // if (validationResalt.error) {
  //   return res.json({
  //     status: "error",
  //     code: 400,
  //     message: validationResalt.error.details,
  //   });
  // }

  if (!name) {
    return res.status(400).json({
      message: "missing required name field",
    });
  }

  if (!email) {
    return res.status(400).json({
      message: "missing required email field",
    });
  }

  if (!phone) {
    return res.status(400).json({
      message: "missing required phone field",
    });
  }

  if (isContact) {
    return res.status(400).json({
      message: "a contact with this name is already registered.",
    });
  }

  return res.json({
    status: "success",
    code: 201,
    message: "create contact",
    data: {
      newContact,
    },
  });
};

// Додати перевірку, коли не знайдено id
const updateOneContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body);
  const { name, email, phone } = req.body;

  // const schema = Joi.object({
  //   name: Joi.string().alphanum().min(3).max(30).required(),
  //   email: Joi.string().email({
  //     minDomainSegments: 2,
  //     tlds: { allow: ["com", "net"] },
  //   }),
  //   phone: Joi.string().min(7).max(15).required(),
  // });

  // const validationResalt = schema.validate(req.body);

  // if (validationResalt.error) {
  //   return res.json({
  //     status: "error",
  //     code: 400,
  //     message: validationResalt.error.details,
  //   });
  // }

  if (!name && !email && !phone) {
    return res.status(400).json({
      message: "missing required fields",
    });
  }

  if (!name && !email) {
    return res.status(400).json({
      message: "missing required name and email field",
    });
  }

  if (!name && !phone) {
    return res.status(400).json({
      message: "missing required name and phone field",
    });
  }

  if (!email && !phone) {
    return res.status(400).json({
      message: "missing required email and phone field",
    });
  }

  if (!name) {
    return res.status(400).json({
      message: "missing required name field",
    });
  }

  if (!email) {
    return res.status(400).json({
      message: "missing required email field",
    });
  }

  if (!phone) {
    return res.status(400).json({
      message: "missing required phone field",
    });
  }

  if (updateContact) {
    return res.json({
      status: "success",
      code: 200,
      message: "contact updated",
      data: {
        updatedContact,
      },
    });
  }

  if (res.body.data === {}) {
    return res.status(404).json({
      message: "Not found.",
    });
  }
};

const patchContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await patchContact(contactId, req.body);
  const { name, email, phone } = req.body;

  // const schema = Joi.object({
  //   name: Joi.string().alphanum().min(3).max(30).optional(),
  //   email: Joi.string().email({
  //     minDomainSegments: 2,
  //     tlds: { allow: ["com", "net"] },
  //   }),
  //   phone: Joi.string().min(7).max(15).optional(),
  // });

  // const validationResalt = schema.validate(req.body);

  // if (validationResalt.error) {
  //   return res.json({
  //     status: "error",
  //     code: 400,
  //     message: validationResalt.error.details,
  //   });
  // }

  if (updateContact) {
    return res.json({
      status: "success",
      code: 200,
      message: "contact updated",
      data: {
        updatedContact,
      },
    });
  }

  if (res.body.data === {}) {
    return res.status(404).json({
      message: "Not found.",
    });
  }
};

module.exports = {
  getAllContacts,
  getOneContactById,
  deleteOneContactById,
  addOneContact,
  updateOneContactById,
  patchContactById,
};
