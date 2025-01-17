const { ContactsApi } = require("./errors");

const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};
const errorHandler = (error, req, res, next) => {
  if (error instanceof ContactsApi) {
    return res
      .status(error.status)
      .json({ message: JSON.stringify(error.message) });
  }
  return res.status(500).json({ message: error.message });
};
module.exports = {
  asyncWrapper,
  errorHandler,
};
