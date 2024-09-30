export class AuthenticationError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class UnauthenticatedError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class ForbiddenError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}


export class GoogleTokenError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = "GoogleTokenError";
  }
}