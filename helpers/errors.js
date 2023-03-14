class ContactsApi extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
class NotFound extends ContactsApi {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}
class ValidationError extends ContactsApi {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
class WrongParametersError extends ContactsApi {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
class NotAuthorizedError extends ContactsApi {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}
class RegistrationConflictError extends ContactsApi {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

module.exports = {
  ContactsApi,
  ValidationError,
  WrongParametersError,
  NotAuthorizedError,
  RegistrationConflictError,
  NotFound,
};
