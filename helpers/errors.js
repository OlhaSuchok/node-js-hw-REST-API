class Errors extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotAuthorized extends Errors {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}
class RegistrationConflictError extends Errors {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}
module.exports = {
  NotAuthorized,
  RegistrationConflictError,
};
