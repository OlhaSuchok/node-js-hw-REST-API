const { isValidObjectId } = require("mongoose");
const { NotFound } = require("../helpers/errors");

module.exports = {
  isValidId: (req, res, next) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      next(NotFound(400, `Not found contact with id '${contactId}'.`));
      //   throw new NotFound(400, `Not found contact with id '${contactId}'.`);
    }
    next();
  },
};
