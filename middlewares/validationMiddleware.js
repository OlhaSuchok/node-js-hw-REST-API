const Joi = require("joi");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.string()
        .min(7)
        .max(15)
        .pattern(
          /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
        )
        .required(),
    });

    const validationResalt = schema.validate(req.body);

    if (validationResalt.error) {
      return res.json({
        status: "error",
        code: 400,
        message: validationResalt.error.details,
      });
    }
    next();
  },

  uptateContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.string()
        .min(7)
        .max(15)
        .pattern(
          /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
        )
        .required(),
    });

    const validationResalt = schema.validate(req.body);

    if (validationResalt.error) {
      return res.json({
        status: "error",
        code: 400,
        message: validationResalt.error.details,
      });
    }
    next();
  },

  patchContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).optional(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .optional(),
      phone: Joi.string()
        .min(7)
        .max(15)
        .pattern(
          /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
        )
        .optional(),
    });

    const validationResalt = schema.validate(req.body);

    if (validationResalt.error) {
      return res.json({
        status: "error",
        code: 400,
        message: validationResalt.error.details,
      });
    }
    next();
  },
};
