const Joi = require("joi");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.string().min(7).max(15).required(),
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
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.string().min(7).max(15).required(),
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
      name: Joi.string().alphanum().min(3).max(30).optional(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.string().min(7).max(15).optional(),
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
