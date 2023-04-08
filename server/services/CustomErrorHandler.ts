class CustomErrorHandler extends Error {
  status: number;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static alreadyExists(message: string): CustomErrorHandler {
    return new CustomErrorHandler(409, message);
  }

  static wrongCredentials(
    message = "Username and Password do not match!"
  ): CustomErrorHandler {
    return new CustomErrorHandler(401, message);
  }

  static unAuthorized(message = "Unauthorized!"): CustomErrorHandler {
    return new CustomErrorHandler(401, message);
  }

  static notFound(message = "Not Found!"): CustomErrorHandler {
    return new CustomErrorHandler(404, message);
  }

  static serverError(message = "Internal Server Error!"): CustomErrorHandler {
    return new CustomErrorHandler(500, message);
  }
}

export default CustomErrorHandler;
