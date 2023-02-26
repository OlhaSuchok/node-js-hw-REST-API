const Joi = require("joi");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required().messages({
        "string.base": `should be a type of string`,
        "string.empty": `must contain value`,
        "any.required": `missing required name field`,
      }),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required()
        .messages({
          "string.base": `should be a type of string`,
          "string.empty": `must contain value`,
          "any.required": `missing required email field`,
        }),
      phone: Joi.string()
        .min(7)
        .max(15)
        .pattern(
          /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
        )
        .required()
        .messages({
          "string.base": `should be a type of string`,
          "string.empty": `must contain value`,
          "any.required": `missing required phone field`,
        }),
    });

    const validationResalt = schema.validate(req.body);

    if (validationResalt.error) {
      return res.json({
        status: "error",
        code: 400,
        message: validationResalt.error.details[0].message,
      });
    }
    next();
  },

  uptateContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required().messages({
        "string.base": `should be a type of string`,
        "string.empty": `must contain value`,
        "any.required": `missing required name field`,
      }),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required()
        .messages({
          "string.base": `should be a type of string`,
          "string.empty": `must contain value`,
          "any.required": `missing required email field`,
        }),
      phone: Joi.string()
        .min(7)
        .max(15)
        .pattern(
          /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
        )
        .required()
        .messages({
          "string.base": `should be a type of string`,
          "string.empty": `must contain value`,
          "any.required": `missing required phone field`,
        }),
    });

    const validationResalt = schema.validate(req.body);

    if (validationResalt.error) {
      return res.json({
        status: "error",
        code: 400,
        message: validationResalt.error.details[0].message,
      });
    }
    next();
  },

  patchContactValidation: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.boolean().messages({
        "string.base": `should be a type of boolean`,
        "string.empty": `must contain value`,
        "any.required": `missing field favorite`,
      }),
    });

    const validationResalt = schema.validate(req.body);

    if (validationResalt.error) {
      return res.json({
        status: "error",
        code: 400,
        message: validationResalt.error.details[0].message,
      });
    }
    next();
  },
};
