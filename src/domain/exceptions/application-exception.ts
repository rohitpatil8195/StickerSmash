/**
 * Base Application Exception
 * All application errors inherit from this class
 */
export class ApplicationException extends Error {
  constructor(
    public message: string,
    public code: string,
    public statusCode: number = 500,
  ) {
    super(message);
    this.name = "ApplicationException";
  }
}

/**
 * Not Found Exception - 404
 */
export class NotFoundException extends ApplicationException {
  constructor(message: string = "Resource not found") {
    super(message, "NOT_FOUND", 404);
    this.name = "NotFoundException";
  }
}

/**
 * Validation Exception - 400
 */
export class ValidationException extends ApplicationException {
  constructor(message: string = "Validation failed") {
    super(message, "VALIDATION_ERROR", 400);
    this.name = "ValidationException";
  }
}

/**
 * Unauthorized Exception - 401
 */
export class UnauthorizedException extends ApplicationException {
  constructor(message: string = "Unauthorized") {
    super(message, "UNAUTHORIZED", 401);
    this.name = "UnauthorizedException";
  }
}

/**
 * Forbidden Exception - 403
 */
export class ForbiddenException extends ApplicationException {
  constructor(message: string = "Forbidden") {
    super(message, "FORBIDDEN", 403);
    this.name = "ForbiddenException";
  }
}

/**
 * Internal Server Exception - 500
 */
export class InternalServerException extends ApplicationException {
  constructor(message: string = "Internal server error") {
    super(message, "INTERNAL_SERVER_ERROR", 500);
    this.name = "InternalServerException";
  }
}
